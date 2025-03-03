"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AssignmentCreationForm() {
  const [assignmentName, setAssignmentName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [context, setContext] = useState('');
  const [explanation, setExplanation] = useState('');
  const [rubricFile, setRubricFile] = useState<File | null>(null);
  const router = useRouter();

  const handleRubricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRubricFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignmentData = {
      assignmentName,
      gradeLevel,
      subject,
      context,
      explanation,
      rubricFileName: rubricFile ? rubricFile.name : null,
    };
    localStorage.setItem('assignmentData', JSON.stringify(assignmentData));
    router.push('/upload-assignment');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-6 text-center">Create Assignment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Assignment Name:</label>
          <input
            type="text"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Grade Level:</label>
          <input
            type="text"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Assignment Instructions:</label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-24"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">How would you like this to be assessed?:</label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-24"
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Upload Rubric (Text or Image):</label>
          <input
            type="file"
            accept="text/*,image/*"
            onChange={handleRubricChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <button type="submit" className="w-full bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition-colors uppercase">
          Create Assignment
        </button>
      </form>
    </div>
  );
}