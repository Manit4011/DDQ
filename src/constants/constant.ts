export const CHATBOT_MESSAGES = {
    heading: "What can I help you with?",
    disclaimer: "This page allows you to ask questions based on historical DDQs",
    uploadText: "Drag & Drop Excel File (only 1 file)",
    uploadDisclaimer1: "File size limit: 200MB per file",
    uploadDisclaimer2: "Format: CSV, PDF, XLSX, XLS",
    uploadedDisclaimer: "You have to delete this file, if you want to upload another file",
    dropFiles: "Drop files here",
  };
  
  export const PLACEHOLDER_TEXT = "Ask a question";
  
  export const BUTTON_LABELS = {
    send: "Send",
    upload: "Upload",
    process: "Start Processing",
    browse: "Browse File"
  };
  export interface IUserData {
    username: string;
    user_id: string;
  }
  export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  export const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  
  export const ICON_ALTS = {
    fileUpload: "Upload",
    send: "Send",
  };
  export const MAX_FILE_SIZE = 200 * 1024 * 1024;
  export const REGISTERED_MESSAGE = 'You have successfully registered. Please wait for the further confirmation to login in your account.';
  export const DELETE_MESSAGE = 'Are you sure, you want to delete this?';
  export const API_BASE_URL = "http://52.66.10.81:5004/";
  export const NO_INFO = "No Information Found! Please try again.";
  