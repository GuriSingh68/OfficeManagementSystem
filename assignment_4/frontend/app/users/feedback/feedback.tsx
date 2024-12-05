'use client'
import { getUserId } from '@/app/api/auth/auth';
import { useState, useEffect } from 'react';

// Define the Feedback interface to ensure proper type checking
interface Feedback {
  id: string;
  userId: string;
  feedbackText: string;
  rating: number;
}

export default function FeedbackPage() {
  // State hooks for feedbacks, form inputs, editing state, etc.
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');

  // Function to fetch feedbacks from the server
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:3000/feedback',{
        method:"GET",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("accessToken")}`
        }
      }
      );
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  // Fetch feedbacks on component mount
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Function to handle form submission (add or update feedback)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = getUserId() || '';

    try {
      const endpoint = isEditing
        ? `http://localhost:3000/feedback/${editId}`
        : 'http://localhost:3000/feedback/submit';
      
      const method = isEditing ? 'PATCH' : 'POST';
      
      await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          userId,
          feedbackText,
          rating,
        }),
      });
      resetForm();
      fetchFeedbacks();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  // Function to handle feedback deletion
  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/feedback/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      fetchFeedbacks();
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  // Function to handle feedback editing
  const handleEdit = (feedback: Feedback) => {
    setIsEditing(true);
    setEditId(feedback.id);
    setFeedbackText(feedback.feedbackText);
    setRating(feedback.rating);
  };

  // Function to reset the form
  const resetForm = () => {
    setIsEditing(false);
    setEditId('');
    setFeedbackText('');
    setRating(5);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">
          {isEditing ? 'Edit Feedback' : 'Submit Feedback'}
        </h1>

        {/* Feedback Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Your Feedback
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={4}
                required
                placeholder="Enter your feedback"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                {isEditing ? 'Update Feedback' : 'Submit Feedback'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Display All Feedback */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">All Feedback</h2>
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <p className="text-gray-600">{feedback.feedbackText}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">
                    Rating: {feedback.rating} star{feedback.rating !== 1 ? 's' : ''}
                  </span>
                  <div className="flex gap-2">
                  </div>
                </div>
              </div>
            ))}
            {feedbacks.length === 0 && (
              <p className="text-center text-gray-500 py-4">No feedback available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
