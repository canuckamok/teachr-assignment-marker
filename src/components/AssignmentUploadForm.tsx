"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/assignment-upload.css';

export default function AssignmentUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please upload a file.');
      return;
    }

    setLoading(true);
    try {
      let studentWork = "";
      
      // If it's an image, perform OCR
      if (file.type.startsWith("image/")) {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('/api/ocr', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error("OCR processing failed");
        }
        
        const result = await response.json();
        if (result.success) {
          studentWork = result.text;
          localStorage.setItem('extractedText', studentWork);
        } else {
          throw new Error("OCR failed: " + (result.error || "Unknown error"));
        }
      } else if (file.type.startsWith("text/")) {
        // If it's a text file, read it directly
        studentWork = await file.text();
      } else {
        studentWork = "Unsupported file type. Please upload a text or image file.";
      }

      const assignmentData = localStorage.getItem('assignmentData');
      if (!assignmentData) {
        throw new Error("No assignment data found. Please create an assignment first.");
      }

      const assignmentDetails = JSON.parse(assignmentData);
      
      // Send for grading
      const gradeResponse = await fetch('/api/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignmentDetails, studentWork }),
      });
      
      if (!gradeResponse.ok) {
        throw new Error("Grading failed");
      }
      
      const gradeResult = await gradeResponse.json();
      localStorage.setItem('assignmentFeedback', gradeResult.feedback);
      
      alert('File uploaded and graded successfully!');
      router.push('/results');
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-6 text-center">Upload Assignment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Upload Assignment or Take Photo:</label>
          <input 
            type="file" 
            accept="text/*,image/*" 
            onChange={handleFileChange} 
            capture="environment"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !file}
        >
          {loading ? 'Uploading & Grading...' : 'Upload & Grade'}
        </button>
      </form>
    </div>
  );
}