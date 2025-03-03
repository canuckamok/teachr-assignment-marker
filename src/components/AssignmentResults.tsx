"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LuThumbsUp, LuThumbsDown } from 'react-icons/lu';

export default function AssignmentResults() {
  const router = useRouter();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [userFeedback, setUserFeedback] = useState('');

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      const storedFeedback = localStorage.getItem('assignmentFeedback');
      const storedText = localStorage.getItem('extractedText');
      if (storedFeedback) setFeedback(storedFeedback);
      if (storedText) setExtractedText(storedText);
    }
  }, []);

  const handleThumbsDown = () => {
    setShowFeedbackInput(true);
  };

  const handleFeedbackSubmit = () => {
    console.log('User feedback:', userFeedback);
    alert('Thank you for your feedback!');
    setShowFeedbackInput(false);
    setUserFeedback('');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-6 text-center">Assignment Results</h1>
      
      {extractedText && (
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-2">Extracted Text</h3>
          <div className="bg-gray-50 p-4 rounded border border-gray-200 whitespace-pre-wrap">
            {extractedText}
          </div>
          <hr className="my-4" />
        </div>
      )}
      
      {feedback ? (
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-2">AI Feedback</h3>
          <div className="bg-gray-50 p-4 rounded border border-gray-200 whitespace-pre-wrap">
            {feedback}
          </div>
        </div>
      ) : (
        <p className="text-center py-4">Loading results...</p>
      )}
      
      <div className="flex justify-center gap-4 my-4">
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => alert('Glad you liked it!')}
        >
          <LuThumbsUp size={20} />
        </button>
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          onClick={handleThumbsDown}
        >
          <LuThumbsDown size={20} />
        </button>
      </div>
      
      {showFeedbackInput && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg w-full max-w-md animate-slide-up">
          <textarea
            value={userFeedback}
            onChange={(e) => setUserFeedback(e.target.value)}
            placeholder="Tell us what went wrong..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-24 mb-2"
          />
          <button 
            onClick={handleFeedbackSubmit} 
            className="w-full bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition-colors"
          >
            Submit Feedback
          </button>
        </div>
      )}
      
      <div className="flex gap-4 mt-6">
        <button 
          onClick={() => router.push('/upload-assignment')}
          className="flex-1 bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition-colors"
        >
          Upload Next Assignment
        </button>
        <button 
          onClick={() => router.push('/')}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}