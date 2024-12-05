import React, { useRef, useState } from 'react';
import './sideNavBar.scss';

interface SideNavBarProps {
  onFileUpload: (file: File | null) => void;
}

const SideNavBar: React.FC<SideNavBarProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUploadClick = () => {
    if (!uploadedFile) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadedFile(file);
      onFileUpload(file);
    }
  };

  const handleRemoveFile = () => {
    setFileName('');
    setUploadedFile(null);
    onFileUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="side-nav-bar">
      <div className="upload-file">
        <h2>Upload Questionnaire Excel</h2>
        <div className="file-upload-box" onClick={handleFileUploadClick}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".pdf, .xlsx, .csv, .docx"
          />
          {uploadedFile ? (
            <div className="file-info">
              <span className="file-name">{fileName}</span>
              <button className="remove-file-button" onClick={handleRemoveFile}>
                ✖
              </button>
            </div>
          ) : (
            <label htmlFor="file-input" className="file-input-label">
              <div className="upload-icon">📁</div>
              <span>Drag and drop a file here or click to browse</span>
              <p className="limit">Limit 200MB per file • PDF, XLSX, CSV, DOCX</p>
            </label>
          )}
        </div>
        {!uploadedFile && (
          <button className="upload-button" onClick={handleFileUploadClick}>
            Upload File
          </button>
        )}
      </div>
    </div>
  );
};

export default SideNavBar;
