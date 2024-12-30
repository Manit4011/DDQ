import React from "react";
import UserImg from "../../assets/images/user-img.svg";
import "./authModal.scss";
import { useNavigate } from "react-router-dom";
import {REGISTERED_MESSAGE} from '../../constants/constant';

interface AuthModalProps {
  closeModal: (state: boolean) => void;
}
const AuthModal: React.FC<AuthModalProps> = ({ closeModal }) => {
  const navigate = useNavigate();
  return (
    <div className="auth-modal-container">
      <div className="auth-modal-content">
        <div className="auth-img">
          <img src={UserImg} alt="" />
        </div>
        <div className="alert-modal-heading">Account Created!</div>
        <div className="alert-modal-text">
          {REGISTERED_MESSAGE}
        </div>
        <button
          onClick={() => {
            closeModal(false);
            navigate('/login');
          }}
          className="submit-btn"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
