import React from 'react';

const UserCard = ({ friend, onClaimPoints }) => {
  return (
    <div
      className="p-4 bg-white rounded shadow-md cursor-pointer hover:bg-gray-50"
      onClick={onClaimPoints}
    >
      <h3 className="text-lg font-semibold">{friend.firstName} {friend.lastName}</h3>
      <p className="text-sm text-gray-600">@{friend.username}</p>
      <p className="mt-2 font-bold">Points: {friend.points}</p>
    </div>
  );
};

export default UserCard;