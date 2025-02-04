import React, { useCallback, useState } from "react";
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
import LinearProgress from '@mui/material/LinearProgress';

const FileWindow: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [processingFiles, setProcessingFiles] = useState<Set<string>>(new Set());
  const [processedFiles, setProcessedFiles] = useState<File[]>([]);

  const handleProcessClick = async (fileToProcess: File) => {
    if (!fileToProcess) return;

    try {
      setProcessingFiles(prev => new Set(prev).add(fileToProcess.name));
      const res = await postFileToProcess(fileToProcess, "");
      console.log("chat response for file:", fileToProcess.name, res);
      setProcessedFiles(prev => [...prev, fileToProcess]);
      setUploadedFiles(prev => prev.filter(file => file !== fileToProcess));
    } catch (error) {
      console.error("Error processing file:", fileToProcess.name, error);
    } finally {
      setProcessingFiles(prev => {
        const updated = new Set(prev);
        updated.delete(fileToProcess.name);
        return updated;
      });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Accepted files:", acceptedFiles);
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const handleDeleteFile = (fileToDelete: File) => {
    setUploadedFiles(prev => prev.filter(file => file !== fileToDelete));
  };

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
      {uploadedFiles.length > 0 && (
        <div className="file-uploaded-container">
          <div className="file-uploaded-heading">UPLOADED FILES</div>
          <div className="files-uploaded-list">
            {uploadedFiles.map((uploadedFile, index) => (
              <div className="single-file-row" key={`${uploadedFile.name}-${index}`}>
                <div className="file-details-container">
                  <img src={fileUploadIcon} alt="" height={20} />
                  <div className="ml-10">
                    <div className="file-name">{uploadedFile.name}</div>
                    <div className="file-uploaded-text-1">
                      {(uploadedFile.size / 1024).toFixed(2)} Kb
                    </div>
                  </div>
                </div>
                <div className="align-items-center">
                  {processingFiles.has(uploadedFile.name) ? (
                    <div style={{ width: '100px', marginRight: '10px' }}>
                      <LinearProgress sx={{ 
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#38a3a5'
                        },
                        backgroundColor: '#38a3a580'
                      }} />
                    </div>
                  ) : (
                    <button 
                      className="process-btn"
                      onClick={() => handleProcessClick(uploadedFile)}
                    >
                      {BUTTON_LABELS.process}
                    </button>
                  )}
                  <img
                    src={Delete}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => handleDeleteFile(uploadedFile)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {processedFiles.length > 0 && (
        <div className="file-uploaded-container">
          <div className="file-uploaded-heading">PROCESSED FILES</div>
          <div className="files-uploaded-list">
            {processedFiles.map((processedFile, index) => (
              <div className="single-file-row" key={`${processedFile.name}-${index}`}>
                <div className="file-details-container">
                  <img src={fileUploadIcon} alt="" height={20} />
                  <div className="ml-10">
                    <div className="file-name">{processedFile.name}</div>
                    <div className="file-uploaded-text-1">
                      {(processedFile.size / 1024).toFixed(2)} Kb
                    </div>
                  </div>
                </div>
                <div className="align-items-center">
                  <img
                    src={Delete}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setProcessedFiles(prev => prev.filter(file => file !== processedFile))}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileWindow;
