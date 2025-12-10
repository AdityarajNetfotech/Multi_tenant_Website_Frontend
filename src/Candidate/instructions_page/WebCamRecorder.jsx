import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
 
const WebCamRecorder = forwardRef(
  (
    {
      question,
      candidateId,
      questionSetId,
      baseUrl = "http://127.0.0.1:5000",
    },
    ref
  ) => {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
 
    const [interviewStarted, setInterviewStarted] = useState(false);
    const [interviewEnded, setInterviewEnded] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [status, setStatus] = useState("Idle");
 
    const prompt =
      question?.prompt_text ||
      question?.question ||
      "Please answer this question.";
 
    // ---------------------------------------------------------
    // Initialize Camera + MediaRecorder
    // ---------------------------------------------------------
    useEffect(() => {
      async function init() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
 
          streamRef.current = stream;
 
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
 
          mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: "video/webm;codecs=vp8,opus",
          });
 
          mediaRecorderRef.current.ondataavailable = (e) => {
            if (e.data.size > 0) chunksRef.current.push(e.data);
          };
 
          mediaRecorderRef.current.onstop = () => {
            setInterviewEnded(true);
          };
        } catch (err) {
          console.error("Camera init failed:", err);
          alert("Camera/microphone access is required!");
        }
      }
 
      init();
 
      return () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
        }
      };
    }, []);
 
    // ---------------------------------------------------------
    // Start Recording
    // ---------------------------------------------------------
    const startInterview = () => {
      if (!question) {
        alert("Missing question data!");
        return;
      }
 
      chunksRef.current = [];
      mediaRecorderRef.current.start(1000);
 
      setInterviewStarted(true);
      setStatus("Recording...");
    };
 
    // ---------------------------------------------------------
    // Stop Recording
    // ---------------------------------------------------------
    const endInterview = () => {
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
        setStatus("Recording stopped");
      }
    };
 
    // ---------------------------------------------------------
    // Upload Recording to Backend
    // ---------------------------------------------------------
    const uploadRecording = async () => {
      if (!chunksRef.current.length) {
        alert("No video recorded!");
        return;
      }
 
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const filename = `video_${candidateId}_${Date.now()}.webm`;
 
      const file = new File([blob], filename, { type: "video/webm" });
 
      // --- Backend needs: qa_data = [ { question_id, question, answer } ]
      const qa_data = [
        {
          question_id: question?.question_id || question?.id,
          question: prompt,
          answer: currentAnswer ? currentAnswer.trim() : "",
        },
      ];
 
      const fd = new FormData();
      fd.append("file", file);
      fd.append("candidate_id", candidateId);
      fd.append("question_set_id", questionSetId);
      fd.append("qa_data", JSON.stringify(qa_data));
 
      setStatus("Uploading video...");
 
      try {
        const res = await fetch(`${baseUrl}/api/v1/upload_video`, {
          method: "POST",
          body: fd,
        });
 
        if (!res.ok) {
          const txt = await res.text();
          console.error("Upload failed:", txt);
          alert("Video upload failed!");
          setStatus("Upload failed");
          return;
        }
 
        const data = await res.json();
        console.log("Upload success:", data);
        setStatus("Video uploaded!");
        alert("Video uploaded successfully!");
 
      } catch (err) {
        console.error("Upload error:", err);
        alert("Failed to upload video!");
        setStatus("Upload failed");
      }
    };
 
    // ---------------------------------------------------------
    // Exposed methods for parent component (GiveTest.jsx)
    // ---------------------------------------------------------
    useImperativeHandle(ref, () => ({
      startInterview,
      endInterview,
      uploadRecording,
      stopAll: () => {
        try {
          endInterview();
          streamRef.current?.getTracks().forEach((t) => t.stop());
        } catch {}
      },
    }));
 
    return (
<div className="p-4 bg-white rounded shadow">
<h2 className="text-xl font-bold mb-4">Video Interview</h2>
 
        {/* Live Camera Feed */}
<video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-72 bg-black rounded"
        />
 
        {/* Question */}
<div className="mt-4">
<h3 className="font-semibold mb-2">Question:</h3>
<p className="p-3 bg-gray-100 rounded">{prompt}</p>
</div>
 
        {/* Text Answer */}
<textarea
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          className="w-full p-3 border rounded mt-4 min-h-[120px]"
          placeholder="Write your explanation / answer here..."
        />
 
        {/* Buttons */}
<div className="flex gap-3 mt-4">
          {!interviewStarted && (
<button
              onClick={startInterview}
              className="px-4 py-2 bg-green-600 text-white rounded"
>
              Start Recording
</button>
          )}
 
          {interviewStarted && !interviewEnded && (
<button
              onClick={endInterview}
              className="px-4 py-2 bg-red-600 text-white rounded"
>
              Stop Recording
</button>
          )}
 
          {interviewEnded && (
<button
              onClick={uploadRecording}
              className="px-4 py-2 bg-blue-600 text-white rounded"
>
              Upload Video
</button>
          )}
</div>
 
        {/* Status */}
<p className="text-sm text-gray-600 mt-3">Status: {status}</p>
</div>
    );
  }
);
 
export default WebCamRecorder;