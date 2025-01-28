import React, { useCallback, useState } from "react";
import { ColDef } from "ag-grid-community";
import "./fileWindow.scss";
import {
  BUTTON_LABELS,
  CHATBOT_MESSAGES,
  MAX_FILE_SIZE,
} from "../../constants/constant";
import UploadFile from "../../assets/icons/upload-file.svg";
import { useDropzone } from "react-dropzone";
import CircleIcon from "@mui/icons-material/Circle";
import fileUploadIcon from "../../assets/icons/sidenav-file-icon.svg";
import Delete from "../../assets/icons/ddq-delete.svg";
import { postFileToProcess } from "../../services/api";
import Loader from "../../components/Loader";

const FileWindow: React.FC = () => {
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const handleProcessClick = async () => {
    if (!file) {
      console.error("No file selected!");
      return;
    }
    try {
      setLoading(true);
      const res = await postFileToProcess(file, "");
      console.log("chat response: ", res);
    } catch (error) {
      console.error("Error fetching chat response:", error);
    } finally {
      setLoading(false);
    }
  };
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Accepted files:", acceptedFiles[0]);
    setFile(acceptedFiles[0]);
    setIsFileUploaded(true);
    setFileName(acceptedFiles[0].name);
    setFileSize((acceptedFiles[0].size / 1024).toFixed(2));
    // Process the files
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "text/csv": [".csv"], // CSV
      "application/pdf": [".pdf"], // PDF
      "application/vnd.ms-excel": [".xls"], // XLS
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ], // XLSX
    },
    maxSize: MAX_FILE_SIZE,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((fileRejection) => {
        const { file, errors } = fileRejection;
        errors.forEach((error) => {
          if (error.code === "file-too-large") {
            alert(`File "${file.name}" is too large. Maximum size is 200 MB.`);
          }
          if (error.code === "file-invalid-type") {
            alert(
              `File "${file.name}" has an invalid format. Allowed formats: CSV, PDF, XLSX, XLS.`
            );
          }
        });
      });
    },
  });

  return (
    <div className="file-window">
      {loading && (
        <div className="backdrop">
          <Loader type="circle" loadercolor="primary" />
        </div>
      )}
      <div className="file-input-upload mt-10" {...getRootProps()}>
        <input {...getInputProps()} className="upload-file-input" />
        {isDragActive ? (
          <div className="drop-files">{CHATBOT_MESSAGES.dropFiles}</div>
        ) : (
          <>
            <div className="upload-container-1">
              <img
                src={UploadFile}
                alt="upload-file"
                height={50}
                className="upload-file-icon"
              />
              <div>
                <div className="upload-text-1">
                  {CHATBOT_MESSAGES.uploadText}
                </div>
                <div className="upload-text-2">
                  <span className="note-text">NOTE: </span>{" "}
                  {CHATBOT_MESSAGES.uploadDisclaimer1}{" "}
                  <CircleIcon className="circle-icon" />{" "}
                  {CHATBOT_MESSAGES.uploadDisclaimer2}{" "}
                </div>
              </div>
            </div>
            <div className="upload-container-2">
              <button className="browse-file-btn" onClick={() => open()}>
                {BUTTON_LABELS.browse}
              </button>
              {/* <img
                      src={UploadCross}
                      alt=""
                      height={40}
                      onClick={handleUploadIconClick}
                      className="cursor-pointer"
                    /> */}
            </div>
          </>
        )}
      </div>
      {isFileUploaded && (
        <div className="file-uploaded-container">
          <div className="file-uploaded-heading">UPLOADED FILES</div>
          <div className="files-uploaded-list">
            <div className="single-file-row">
              <div className="file-details-container">
                <img src={fileUploadIcon} alt="" height={20} />
                <div className="ml-10">
                  <div className="file-name">{fileName}</div>
                  <div className="file-uploaded-text-1">{fileSize} Kb</div>
                </div>
              </div>
              <div className="align-items-center">
                <button className="process-btn" onClick={handleProcessClick}>
                  {BUTTON_LABELS.process}
                </button>
                <img
                  src={Delete}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => {
                    setFile(undefined);
                    setIsFileUploaded(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileWindow;
