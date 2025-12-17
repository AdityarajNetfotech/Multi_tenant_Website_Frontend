import { useEffect, useRef, useCallback } from "react";
import { emitViolation } from "../../RecruiterAdmin/api/socket.js";

const INACTIVITY_LIMIT = 10000; // 10s
const INACTIVITY_CHECK_INTERVAL = 3000;

const ActivityMonitor = ({
  questionSetId,
  candidateId,
  candidateName,
  email,
  faceEventRef,
  submitted,
  testStarted,
  onViolation,
}) => {
  const counts = useRef({
    tab_switches: 0,
    inactivities: 0,
    face_not_visible: 0,
  });

  const flushTimer = useRef(null);
  const lastActivityRef = useRef(Date.now());

  /* -------------------- FLUSH -------------------- */
  const flush = useCallback(() => {
    const payload = Object.fromEntries(
      Object.entries(counts.current).filter(([, v]) => v > 0)
    );

    if (Object.keys(payload).length > 0) {
      emitViolation({
        question_set_id: questionSetId,
        candidate_id: candidateId,
        candidate_name: candidateName,
        candidate_email: email,
        ...payload,
      });
    }

    counts.current = {
      tab_switches: 0,
      inactivities: 0,
      face_not_visible: 0,
    };

    flushTimer.current = null;
  }, [questionSetId, candidateId, candidateName, email]);

  /* -------------------- BUMP -------------------- */
  const bump = useCallback(
    (key) => {
      if (submitted) return;
      if (window.__UPLOAD_IN_PROGRESS__) return;

      counts.current[key] = (counts.current[key] || 0) + 1;

      // 🔔 notify UI immediately
      onViolation?.(key, 1);

      if (!flushTimer.current) {
        flushTimer.current = setTimeout(flush, 2000);
      }
    },
    [flush, submitted, onViolation]
  );

  /* -------------------- TAB SWITCH -------------------- */
  useEffect(() => {
    if (!testStarted || submitted) return;

    const onVisibility = () => {
      if (document.hidden) bump("tab_switches");
    };

    const onBlur = () => bump("tab_switches");

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
    };
  }, [bump, testStarted, submitted]);

  /* -------------------- INACTIVITY -------------------- */
  useEffect(() => {
    if (!testStarted || submitted) return;

    const markActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const events = [
      "mousemove",
      "keydown",
      "mousedown",
      "scroll",
      "touchstart",
    ];

    events.forEach((e) =>
      window.addEventListener(e, markActivity, { passive: true })
    );

    const interval = setInterval(() => {
      const idleFor = Date.now() - lastActivityRef.current;

      if (idleFor > INACTIVITY_LIMIT) {
        bump("inactivities");
        lastActivityRef.current = Date.now(); // prevent spam
      }
    }, INACTIVITY_CHECK_INTERVAL);

    return () => {
      events.forEach((e) =>
        window.removeEventListener(e, markActivity)
      );
      clearInterval(interval);
    };
  }, [bump, testStarted, submitted]);

  /* -------------------- FACE EVENTS -------------------- */
  useEffect(() => {
    if (faceEventRef) {
      faceEventRef.current = () => bump("face_not_visible");
    }
  }, [faceEventRef, bump]);

  /* -------------------- CLEANUP -------------------- */
  useEffect(() => {
    return () => {
      clearTimeout(flushTimer.current);
    };
  }, []);

  return null;
};

export default ActivityMonitor;
