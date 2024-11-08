import React, { useState } from 'react';
import { useLeaderboard } from '../context/leaderboardContext';
import axios from 'axios';
import Modal from '../components/modal';
import Navbar from '../components/navbar';

const Leaderboard = () => {
  const { users } = useLeaderboard();
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('daily'); // Store the selected time range

  // Function to fetch user history based on the selected time range
  const fetchHistory = async (range) => {
    try {
      const response = await axios.get(`https://nexorand-89p4.onrender.com/api/user/v1/your-${range}-history`); // Adjust the API endpoint to fetch history by range (daily, weekly, monthly)
      if (response.data.success) {
        setHistory(response.data.data);
        // console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  // Fetch user history
  const fetchUserHistory = async (userId) => {
    try {
      const response = await axios.post(`https://nexorand-89p4.onrender.com/api/user/v1/your-history`, { userId });
      if (response.data.success) {
        setHistory(response.data.data); // Ensure the response data is correctly set
        setSelectedUser(userId);
        setIsModalOpen(true); // Open the modal
      }
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

  // Handle button clicks for time range (Daily, Weekly, Monthly)
  const handleTimeRangeClick = (range) => {
    setSelectedTimeRange(range);
    fetchHistory(range);
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div className="p-5 flex justify-around items-center">
        <button
          className={`p-1 rounded-full ${selectedTimeRange === 'daily' ? 'bg-orange-400' : 'bg-gray-400'}`}
          onClick={() => handleTimeRangeClick('daily')}
        >
          Daily
        </button>
        <button
          className={`p-1 rounded-full ${selectedTimeRange === 'weekly' ? 'bg-orange-400' : 'bg-gray-400'}`}
          onClick={() => handleTimeRangeClick('weekly')}
        >
          Weekly
        </button>
        <button
          className={`p-1 rounded-full ${selectedTimeRange === 'monthly' ? 'bg-orange-400' : 'bg-gray-400'}`}
          onClick={() => handleTimeRangeClick('monthly')}
        >
          Monthly
        </button>
      </div>
      <ul className="space-y-2">
        <li className="p-4 border rounded shadow-sm grid grid-cols-4 font-bold text-center flex justify-between items-center">
          <span>Rank</span>
          <span>Name</span>
          <span>Prize</span>
          <span>Points</span>
        </li>
        {users
          .sort((a, b) => b.Points - a.Points)
          .map((user, index) => (
            <li
              key={user._id}
              className="p-4 border rounded shadow-sm grid grid-cols-4 font-bold text-center flex justify-between items-center cursor-pointer"
              onClick={() => fetchUserHistory(user._id)}
            >
              <span className="text-gray-600">{index + 1}</span>
              <span className="text-gray-600">{user.firstName}</span>
              <span className="text-gray-600">₹ {user.Points}</span>
              <span className="text-gray-600">{user.Points} Points</span>
            </li>
          ))}
      </ul>

      {/* Modal for user history */}
      {selectedUser && isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-semibold mb-2">
            Points History for{' '}
            {users.find((user) => user._id === selectedUser)?.firstName}
          </h2>
          <ul>
            {history.map((entry, index) => (
              <li key={index} className="mb-1">
                {entry.date}: {entry.pointsAwarded} points
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default Leaderboard;
