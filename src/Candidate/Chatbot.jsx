import React, { useRef, useState, useEffect } from "react";
import { Mic, Loader2 } from "lucide-react";

export default function Chatbot() {
  const pcRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [status, setStatus] = useState("Idle");
  const [language, setLanguage] = useState("en");
  const [isConnecting, setIsConnecting] = useState(false);
  const [candidateId, setCandidateId] = useState(null);
  const [speaking, setSpeaking] = useState(null);
  const [volume, setVolume] = useState(0);
  const volumeRef = useRef(0);
  const aiAudioRef = useRef(null);

  // Volume meter (for UI)
  const setupVolumeMeter = (stream) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = ctx.createAnalyser();
    const src = ctx.createMediaStreamSource(stream);
    src.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    const update = () => {
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      volumeRef.current = volumeRef.current * 0.8 + (avg / 256) * 0.2;
      setVolume(volumeRef.current);
      requestAnimationFrame(update);
    };
    update();
  };

  const stopCall = () => {
    mediaRecorderRef.current?.stop();
    pcRef.current?.close();
    pcRef.current = null;
    mediaRecorderRef.current = null;
    setCandidateId(null);
  };

  const startCall = async () => {
    try {
      setIsConnecting(true);
      setStatus("Starting call...");

      // Setup audio element for AI
      let audioEl =
        document.getElementById("ai-audio") || document.createElement("audio");
      audioEl.id = "ai-audio";
      audioEl.autoplay = true;
      audioEl.controls = false;
      document.body.appendChild(audioEl);
      aiAudioRef.current = audioEl;

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      pcRef.current = pc;

      let aiStream = null;
      pc.ontrack = (evt) => {
        setSpeaking("ai");
        setTimeout(() => setSpeaking(null), 3000);
        aiStream = evt.streams[0];
        aiAudioRef.current.srcObject = aiStream;
      };

      // Get microphone
      const userStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setupVolumeMeter(userStream);
      userStream.getTracks().forEach((t) => pc.addTrack(t, userStream));

      // ---- MIX AI + USER AUDIO ----
      const ctx = new AudioContext();
      const dest = ctx.createMediaStreamDestination();

      const userSrc = ctx.createMediaStreamSource(userStream);
      userSrc.connect(dest);

      const aiSrc = ctx.createMediaStreamSource(aiStream ?? ctx.createMediaStreamDestination().stream);
      aiSrc.connect(dest);

      // Record combined (AI + User)
      const mixedStream = dest.stream;
      const mediaRecorder = new MediaRecorder(mixedStream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => e.data.size && audioChunksRef.current.push(e.data);
      mediaRecorder.onstart = () => setSpeaking("user");
      mediaRecorder.onstop = () => setSpeaking(null);
      mediaRecorder.start();

      // ---- OpenAI Realtime ----
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sess = await fetch(
        `http://127.0.0.1:8000/session?language=${language}`
      ).then((r) => r.json());
      const ephemeral = sess?.client_secret?.value || sess?.client_secret;
      if (!ephemeral) throw new Error("No session key");
      setCandidateId(sess.candidate_id);

      const resp = await fetch(
        `https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ephemeral}`,
            "Content-Type": "application/sdp",
          },
          body: offer.sdp,
        }
      );
      const answerSDP = await resp.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSDP });

      setStatus("Connected — start speaking!");
    } catch (err) {
      console.error(err);
      setStatus("Error: " + err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const finishInterview = async () => {
    if (!mediaRecorderRef.current) return;
    const mediaRecorder = mediaRecorderRef.current;

    mediaRecorder.onstop = async () => {
      setSpeaking(null);
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);

      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];
        try {
          const res = await fetch("http://127.0.0.1:8000/session/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              candidate_id: candidateId,
              recording_base64: base64data,
            }),
          });
          const data = await res.json();
          console.log("Recording saved:", data);
          alert("✅ Recording saved successfully!");
        } catch (err) {
          console.error("Error saving recording:", err);
        }
      };
    };

    mediaRecorder.stop();
    stopCall();
    setStatus("Interview Ended");
  };

  useEffect(() => {
    if (candidateId) {
      stopCall();
      setStatus(`Restarting interview in ${language}...`);
      startCall();
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-[#eef5f8] flex flex-col items-center py-10">
      <style>{`
        @keyframes glowingRingAI {
          0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.6); }
          50% { box-shadow: 0 0 25px 10px rgba(16,185,129,0.3); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.6); }
        }
        @keyframes glowingRingUser {
          0% { box-shadow: 0 0 0 0 rgba(37,99,235,0.6); }
          50% { box-shadow: 0 0 25px 10px rgba(37,99,235,0.3); }
          100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.6); }
        }
        .ai-glow {
          animation: glowingRingAI 1.5s infinite;
          border-color: #10b981;
        }
        .user-glow {
          animation: glowingRingUser 1.5s infinite;
          border-color: #2563eb;
        }
      `}</style>

      <h1 className="text-3xl font-bold mb-4">🎙️ Voice Interview</h1>

      <div className="bg-white shadow-md rounded-3xl px-12 py-8 w-full max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
          🤖 AI Recruiter Interview
        </h2>

        <select
          className="p-2 border rounded-lg mb-6"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>

        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center space-y-2">
            <div
              className={`w-28 h-28 rounded-full border-8 flex items-center justify-center transition-all duration-300 ${
                speaking === "ai" ? "ai-glow" : "border-green-500"
              }`}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                alt="AI Recruiter"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <p className="text-lg font-semibold">AI Recruiter</p>
          </div>

          <div className="h-32 w-1 bg-gradient-to-b from-green-300 via-gray-300 to-blue-300 rounded-full opacity-60"></div>

          <div className="flex flex-col items-center space-y-2">
            <div
              className={`w-28 h-28 rounded-full border-8 flex items-center justify-center transition-all duration-300 ${
                (volume > 0.02 || speaking === "user")
                  ? "user-glow"
                  : "border-blue-500"
              }`}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                alt="Candidate"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <p className="text-lg font-semibold">Candidate</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={startCall}
            disabled={isConnecting}
            className={`flex items-center px-6 py-2 rounded-lg text-white ${
              isConnecting
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Connecting...
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" /> Start Interview
              </>
            )}
          </button>
          <button
            onClick={finishInterview}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Finish Interview
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-600">Status: {status}</p>
      </div>
      <audio id="ai-audio" autoPlay hidden />
    </div>
  );
}
