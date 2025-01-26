import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Upload, File, Trash2, AlertCircle } from "lucide-react";

function UploadDocuments() {
  const [file, setFile] = useState(null);
  const [emails, setEmails] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileChange(droppedFiles);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Store the file for submission
  };

  const removeFile = () => {
    setFile(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleUpload = async () => {
    if (!emails.trim()) {
      alert("Please provide at least one email.");
      return;
    }
    console.log(
      "Sending to emails:",
      emails.split(",").map((email) => email.trim())
    );
    if (file === null) {
      alert("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append("file", file); // Attach the file
    }
    const signerEmails = emails.split(",").map((email) => email.trim());
    formData.set("signerEmails", JSON.stringify(signerEmails));

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);
    try {
      const token = localStorage.getItem("userInfo");
      const parsedToken = JSON.parse(token);

      const response = await fetch("/api/v1/documents/upload", {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${parsedToken.accessToken}` },
      });

      if (response.ok) {
        const result = await response.json();
        alert("Files uploaded successfully!");
        console.log("Server Response:", result);
        setFile(null);
        setEmails("");
      } else {
        const errorData = await response.json();
        alert(`Upload failed: ${errorData.message}`);
        console.error("Error:", errorData);
      }
    } catch (error) {
      alert("An error occurred during the upload.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Alert>
        <AlertCircle size={20} />
        Files will be scanned for viruses before upload
      </Alert>

      <EmailInput
        type="text"
        placeholder="Enter recipient emails, separated by commas"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />

      <UploadArea
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          borderColor: isDragging ? "#1a73e8" : "#ccc",
          background: isDragging ? "#f8f9fa" : "white",
        }}
      >
        <Upload size={48} color="#666" style={{ marginBottom: "1rem" }} />
        <h3 style={{ marginBottom: "0.5rem" }}>Drag and drop files here</h3>
        <p style={{ color: "#666" }}>or click to select files</p>
        <FileInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
        />
      </UploadArea>

      {file && (
        <FileList>
          <h3 style={{ marginBottom: "1rem" }}>Selected File</h3>
          <FileItem key={file.name}>
            <FileInfo>
              <File size={20} color="#666" />
              <div>
                <FileName>{file.name}</FileName>
                <FileSize>{formatFileSize(file.size)}</FileSize>
              </div>
            </FileInfo>

            <DeleteButton onClick={() => removeFile()}>
                <Trash2 size={20} />
              </DeleteButton>
          </FileItem>
          <UploadButton
            onClick={handleUpload}
            disabled={file === null || !emails.trim()}
          >
            Upload file
          </UploadButton>
        </FileList>
      )}
    </>
  );
}

const Alert = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: #fff3cd;
  color: #856404;
  margin-bottom: 1rem;
`;

const UploadArea = styled.div`
  border: 2px dashed #ccc;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #666;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileList = styled.div`
  margin-top: 2rem;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FileName = styled.span`
  font-weight: 500;
`;

const FileSize = styled.span`
  color: #666;
  font-size: 0.875rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;

  &:hover {
    background: #ffeeee;
  }
`;

const UploadButton = styled.button`
  background: #1a73e8;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background: #1557b0;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
`;
export default UploadDocuments;
