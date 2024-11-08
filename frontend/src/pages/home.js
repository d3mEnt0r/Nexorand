import React from 'react';
import { useLeaderboard } from '../context/leaderboardContext';
import Navbar from '../components/navbar';

const Home = () => {
  const { users, incrementPoints, claimMessages } = useLeaderboard();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Friends List</h1>
      <Navbar />

      {/* Claim Points Popup Notifications */}
      <div className="fixed top-10 right-4 space-y-2">
        {claimMessages.map(({ id, message }) => (
          <div
            key={id}
            className="bg-green-500 text-white p-2 rounded shadow-md transition-transform duration-300 transform"
          >
            {message}
          </div>
        ))}
      </div>

      <ul className="space-y-2 p-4">
        <li className="p-4 border rounded shadow-sm grid grid-cols-3 font-bold text-center flex justify-between items-center">
            <span>S.No</span>
            <span>Name</span>
            <span>Points</span>
        </li>
        {users.map((user, index) => (
          <li
            key={user._id}
            className="p-4 border rounded shadow-sm grid grid-cols-3 text-center flex justify-between items-center cursor-pointer"
            onClick={() => incrementPoints(user.email)}
          >
            <span>{index + 1}</span>
            <span>{user.firstName}</span>
            <span>{user.Points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;