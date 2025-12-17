import React, { useEffect, useRef, useState } from 'react';
import aiAvatar from '../../img/interviewer.png';

export default function AudioInterview({
  questions = [],
  candidateId,
  questionSetId,
  baseUrl = window.REACT_APP_BASE_URL || 'http://127.0.0.1:5000',
  onComplete = () => {},
}) {
  const streamRef = useRef(null);
  const audioRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState('idle');
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const getPrompt = (q) => q?.question || q?.prompt_text || '';

  /* -------------------- MEDIA INIT -------------------- */
  useEffect(() => {
    async function initMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
      } catch (err) {
        console.error('Media error', err);
        alert('Please allow microphone access.');
      }
    }
    initMedia();
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  /* -------------------- AUDIO RECORDING -------------------- */
  const startAudioRecording = () => {
    if (!streamRef.current) return;
    audioChunksRef.current = [];
    const recorder = new MediaRecorder(streamRef.current);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };
    recorder.start(500);
    audioRecorderRef.current = recorder;
    setIsRecordingAudio(true);
    setStatus('Recording audio answer...');
  };

  const stopAudioRecording = () => {
    audioRecorderRef.current?.stop();
    setIsRecordingAudio(false);
    setStatus('Audio recorded');
  };

  /* -------------------- SPEECH TO TEXT -------------------- */
  const startSpeechRecognition = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert('Speech recognition not supported.');
      return;
    }
    if (isRecordingAudio) stopAudioRecording();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onstart = () => {
      setIsListening(true);
      setStatus('🎤 Listening...');
    };

    rec.onresult = (event) => {
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) final += event.results[i][0].transcript + ' ';
      }
      if (final.trim()) setCurrentAnswer(prev => prev + ' ' + final.trim());
    };

    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
    rec.start();
  };

  const stopSpeechRecognition = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  /* -------------------- SUBMIT ANSWER -------------------- */
  const submitCurrentAnswer = async () => {
    if (!currentAnswer.trim() && audioChunksRef.current.length === 0) {
      alert('Please provide an answer.');
      return;
    }

    let audioFile = null;
    if (audioChunksRef.current.length) {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      audioFile = new File([blob], `answer_${candidateId}_${currentIndex}.webm`, { type: 'audio/webm' });
    }

    const qa = {
      question: getPrompt(questions[currentIndex]),
      questionId: questions[currentIndex]?.id || null,
      answer: currentAnswer.trim(),
      audioFile,
      timestamp: new Date().toISOString(),
    };

    const fd = new FormData();
    fd.append('candidate_id', candidateId);
    fd.append('question_set_id', questionSetId);
    fd.append('qa_data', JSON.stringify([qa]));
    if (audioFile) fd.append('audio', audioFile);

    fetch(`${baseUrl}/api/v1/upload_audio`, { method: 'POST', body: fd }).catch(() => {});

    setCurrentAnswer('');
    audioChunksRef.current = [];
    stopSpeechRecognition();

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) setCurrentIndex(nextIndex);
    else setStatus('Interview complete');
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Audio Interview</h2>

      <div className="mb-4">
        <p className="font-semibold">Question {currentIndex + 1}:</p>
        <p className="p-2 bg-gray-100 rounded">{getPrompt(questions[currentIndex])}</p>
      </div>

      <textarea
        value={currentAnswer}
        onChange={e => setCurrentAnswer(e.target.value)}
        className="w-full p-2 border rounded min-h-[100px]"
        placeholder="Type your answer here..."
      />

      <div className="flex gap-2 mt-3">
        <button
          className="px-3 py-2 bg-green-600 text-white rounded"
          onClick={isRecordingAudio ? stopAudioRecording : startAudioRecording}
        >
          {isRecordingAudio ? 'Stop Recording' : 'Record Answer'}
        </button>

        <button
          className="px-3 py-2 bg-indigo-600 text-white rounded"
          onClick={isListening ? stopSpeechRecognition : startSpeechRecognition}
        >
          {isListening ? 'Stop STT' : 'Voice Input'}
        </button>

        <button
          className="ml-auto px-3 py-2 bg-sky-600 text-white rounded"
          onClick={submitCurrentAnswer}
        >
          {currentIndex < questions.length - 1 ? 'Next →' : 'Finish'}
        </button>
      </div>

      <p className="text-sm mt-2">Status: {status}</p>
    </div>
  );
}
