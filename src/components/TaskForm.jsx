import React, { useState } from 'react';
import { toast } from 'react-toastify';
import usePost from '../hooks/usePost';

const TaskForm = ({ onSuccess }) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do'); // default status

  const { postData, loading } = usePost(`${apiUrl}/tasks/tasks`, () => {
    setTitle('');
    setDescription('');
    setStatus('To Do');
    toast.success('Task added!');
    onSuccess && onSuccess(); // refetch task list
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      return toast.error('Title is required');
    }

    if (!description.trim()) {
        return toast.error('Title is required');
      }

    postData({ title, description, status });
    console.log (title)
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="max-w-3xl mx-auto px-6 py-8 bg-white rounded-xl shadow-md"
>
  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
    📝 Add New Task
  </h2>

  <input
    type="text"
    placeholder="Task Title"
    value={title}
    className="block w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-secondary transition"
    onChange={(e) => setTitle(e.target.value)}
  />

  <textarea
    placeholder="Task Description"
    value={description}
    rows={4}
    className="block w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-secondary transition resize-none"
    onChange={(e) => setDescription(e.target.value)}
  ></textarea>

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="block w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-secondary transition"
  >
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Done">Done</option>
  </select>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-secondary hover:bg-secondary-100 cursor-pointer text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
  >
    {loading ? 'Adding...' : 'Add Task'}
  </button>
</form>
  );
};

export default TaskForm;