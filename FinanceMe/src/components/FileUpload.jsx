import React from 'react'
import { useState } from 'react';
import './fileUpload.css';
import axios from "axios";
import Button from "../components/button";
import './FileUpload.css';

function FileUpload() {

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      // POST the file to your backend
      const response = await axios.post(
        'http://localhost:8000/process_pdf', 
        formData, 
        { 
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      alert('File uploaded and parsed successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Something went wrong uploading/parsing the file.');
    }
  };

  return (
    <div className="file-upload">
      <label className="file-upload__label" htmlFor="file-upload-input">New File</label>
            <input type="file" id="file-upload-input" accept="application/pdf" onChange={handleUpload} />
    </div>
  )
}

export default FileUpload