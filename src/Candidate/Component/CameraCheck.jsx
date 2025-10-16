import React, { useState } from "react";
import { CheckSquare, Square } from "lucide-react";

const CameraCheck = ({ onNext, onBack }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [cameraAllowed, setCameraAllowed] = useState(false);

  const handleCheckbox = () => setIsChecked(!isChecked);

  const handleAllowCamera = () => {
    if (isChecked) {
      setCameraAllowed(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl shadow-md border border-gray-300  p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Camera Test
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="border border-gray-300 rounded-lg h-48 md:h-56 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            {cameraAllowed ? "Camera Active" : "Camera Preview"}
          </div>

          <div className="text-gray-800 text-sm md:text-base space-y-3">
            <p>
              To continue, please allow access to your device's camera. Your
              camera will be used for identity verification and AI monitoring
              during the virtual exam.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>We do not record continuously unless required for proctored exams.</li>
              <li>All video data is encrypted and securely stored.</li>
              <li>Camera access helps us maintain a fair and secure testing environment.</li>
            </ul>

            <div
              onClick={handleCheckbox}
              className="flex items-start gap-2 cursor-pointer mt-3"
            >
              {isChecked ? (
                <CheckSquare className="w-5 h-5 text-green-600" />
              ) : (
                <Square className="w-5 h-5 text-gray-400" />
              )}
              <span className="text-xs md:text-sm">
                I understand and consent to being recorded during the assessment.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button
                onClick={handleAllowCamera}
                disabled={!isChecked}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isChecked
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Allow Camera Access
              </button>
              <button
                onClick={onBack}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Cancel & Back
              </button>
            </div>
          </div>
        </div>

      </div>
      <div className="mt-8 flex justify-between w-full">
        <button
          onClick={onBack}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm md:text-base hover:bg-gray-300 transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!cameraAllowed}
          className={`px-6 py-2 rounded-lg text-sm md:text-base transition ${cameraAllowed
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Continue to Test
        </button>
      </div>
    </div>
  );
};

export default CameraCheck;