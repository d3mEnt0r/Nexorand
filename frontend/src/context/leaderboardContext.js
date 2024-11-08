import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LeaderboardContext = createContext();

export const LeaderboardProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [claimMessages, setClaimMessages] = useState([]); // Store multiple messages

  // Fetch all users to display on leaderboard and home page
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/user/v1/get-users');
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to increment points of a specific user
  const incrementPoints = async (email) => {
    try {
      const response = await axios.patch(`http://localhost:7000/api/user/v1/claim-points`, { email });
      if (response.data.success) {
        fetchUsers(); // Re-fetch the updated users list
        addClaimMessage(response.data.message + ` for ${response.data.data.firstName}`); // Add message to the queue
      }
    } catch (error) {
      console.error("Error incrementing points:", error);
      addClaimMessage('Failed to claim points.');
    }
  };

  // Add a message to the queue with a unique ID
  const addClaimMessage = (message) => {
    const id = Date.now();
    setClaimMessages((prevMessages) => [...prevMessages, { id, message }]);

    // Remove the message after 3 seconds
    setTimeout(() => {
      setClaimMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    }, 3000);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <LeaderboardContext.Provider value={{ users, incrementPoints, claimMessages }}>
      {children}
    </LeaderboardContext.Provider>
  );
};

// ********** custom hook ***************
export const useLeaderboard = () => useContext(LeaderboardContext);
