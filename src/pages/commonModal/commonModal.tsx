import React from "react";
import UserImg from "../../assets/images/user-img.svg";
import DeleteImg from "../../assets/images/delete-img-modal.svg";
import "./commonModal.scss";
import { useNavigate } from "react-router-dom";

interface CommonModalProps {
  closeModal: (state: boolean) => void;
  type: "auth" | "delete"; // Define modal type
  title: string; // Modal title
  message: string; // Modal message
  onConfirm?: () => void; // Optional confirm handler for delete modal
}
const CommonModal: React.FC<CommonModalProps> = ({
  closeModal,
  type,
  title,
  message,
  onConfirm,
}) => {
  const navigate = useNavigate();
  return (
    <div className={`common-modal-container ${type == 'delete' ? "delete-transform" : ""}`}>
      <div className="common-modal-content">
        {type === "auth" && (
          <div className="auth-img">
            <img src={UserImg} alt="User" />
          </div>
        )}
        {type === "delete" && (
          <div className="auth-img">
            <img src={DeleteImg} alt="Delete" />
          </div>
        )}
        <div className="modal-heading">{title}</div>
        <div className="modal-text">{message}</div>

        {type === "auth" && (
          <button
            onClick={() => {
              closeModal(false);
              navigate("/login");
            }}
            className="submit-btn"
          >
            OK
          </button>
        )}

        {type === "delete" && (
          <div className="delete-modal-actions">
            <button
              onClick={() => {
                if (onConfirm) onConfirm();
                closeModal(false);
              }}
              className="submit-btn"
            >
              Yes
            </button>
            <button onClick={() => closeModal(false)} className="cancel-btn">
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonModal;
