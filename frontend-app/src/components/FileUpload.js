import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFilesSelected }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFilesSelected = useCallback((files) => {
        onFilesSelected(files); // 상위 컴포넌트로 파일 목록을 전달
    }, [onFilesSelected]);
  
    const onDrop = useCallback(acceptedFiles => {
        if (uploadedFiles.length + acceptedFiles.length <= 1) {
            setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
            onFilesSelected(acceptedFiles); // 선택한 파일을 상위 컴포넌트로 전달
        } else {
            alert('최대 1개의 파일까지 업로드할 수 있습니다.');
        }
    }, [uploadedFiles, onFilesSelected]);
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      multiple: true, // 다중 파일 업로드를 허용
    });

  const containerStyle = {
    display: 'flex', // div 요소 사이의 줄바꿈을 방지하려면 'flex'를 사용합니다.
    marginRight: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={containerStyle} {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>파일을 여기로 끌어다 놓거나 클릭하여 업로드하세요.</p>
      </div>
      <div style={containerStyle}>
        <p>업로드한 파일:</p>
        <ul style={containerStyle}>
          {uploadedFiles.map(file => (
            <li key={file.name}>
              {file.name} ({file.size} bytes)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;