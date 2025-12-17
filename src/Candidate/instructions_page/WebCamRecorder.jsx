import React, { useEffect, useRef, useState } from "react";

export default function VideoInterview({
  questions = [],
  candidateId,
  questionSetId,
  baseUrl = window.REACT_APP_BASE_URL || "http://127.0.0.1:5000",
  onComplete = () => {},
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState("idle");
  const [isRecording, setIsRecording] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const currentQuestion = questions[currentIndex];
  const prompt = currentQuestion?.question || currentQuestion?.prompt_text || "";

  /* -------------------- MEDIA INIT -------------------- */
  useEffect(() => {
    async function initMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;

        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: "video/webm;codecs=vp8,opus",
        });

        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };
      } catch (err) {
        console.error("Camera init failed:", err);
        alert("Camera/microphone access is required!");
      }
    }

    initMedia();

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [currentIndex]);

  /* -------------------- RECORDING CONTROL -------------------- */
  const startRecording = () => {
    if (!mediaRecorderRef.current) return;
    chunksRef.current = [];
    mediaRecorderRef.current.start(1000);
    setIsRecording(true);
    setStatus("Recording video answer...");
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setStatus("Video recorded");
  };

  /* -------------------- SUBMIT ANSWER -------------------- */
  const submitCurrentAnswer = async () => {
    if (!currentAnswer.trim() && chunksRef.current.length === 0) {
      alert("Please provide an answer.");
      return;
    }

    let videoFile = null;
    if (chunksRef.current.length) {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      videoFile = new File([blob], `video_${candidateId}_${currentIndex}.webm`, { type: "video/webm" });
    }

    const qa = {
      question: prompt,
      questionId: currentQuestion?.id || null,
      answer: currentAnswer.trim(),
      videoFile,
      timestamp: new Date().toISOString(),
    };

    const fd = new FormData();
    fd.append("candidate_id", candidateId);
    fd.append("question_set_id", questionSetId);
    fd.append("qa_data", JSON.stringify([qa]));
    if (videoFile) fd.append("video", videoFile);

    try {
      await fetch(`${baseUrl}/api/v1/upload_video`, { method: "POST", body: fd });
    } catch (err) {
      console.error("Upload error:", err);
    }

    setCurrentAnswer("");
    chunksRef.current = [];

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) setCurrentIndex(nextIndex);
    else setStatus("Interview complete");
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Video Interview</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-72 bg-black rounded"
      />

      <div className="mt-4">
        <p className="font-semibold">Question {currentIndex + 1}:</p>
        <p className="p-2 bg-gray-100 rounded">{prompt}</p>
      </div>

      <textarea
        value={currentAnswer}
        onChange={(e) => setCurrentAnswer(e.target.value)}
        className="w-full p-2 border rounded mt-2 min-h-[100px]"
        placeholder="Write your answer here..."
      />

      <div className="flex gap-2 mt-3">
        {!isRecording && (
          <button
            onClick={startRecording}
            className="px-3 py-2 bg-green-600 text-white rounded"
          >
            Start Recording
          </button>
        )}
        {isRecording && (
          <button
            onClick={stopRecording}
            className="px-3 py-2 bg-red-600 text-white rounded"
          >
            Stop Recording
          </button>
        )}

        <button
          onClick={submitCurrentAnswer}
          className="ml-auto px-3 py-2 bg-sky-600 text-white rounded"
        >
          {currentIndex < questions.length - 1 ? "Next →" : "Finish"}
        </button>
      </div>

      <p className="text-sm mt-2">Status: {status}</p>
    </div>
  );
}
