import { useParams, useNavigate } from "react-router-dom";
import CameraCheck from "../Component/CameraCheck";

export default function CameraCheckWrapper() {
  const { questionSetId } = useParams();
  const navigate = useNavigate();

  // Optional: go back handler
  const handleBack = () => {
    navigate(-1); // Goes back to previous page
  };

  return <CameraCheck questionSetId={questionSetId} onBack={handleBack} />;
}
