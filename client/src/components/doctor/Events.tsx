import React from 'react';

interface EventProps {
  title: string;
  time: string;
  participants: { name: string; avatar: string }[];
  active: boolean;
}

const Event: React.FC<EventProps> = ({ title, time, participants, active }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-bold">{title}</div>
        <div className={`w-3 h-3 rounded-full ${active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
      </div>
      <div className="text-sm text-gray-500 mb-2">{time}</div>
      <div className="flex">
        {participants.map((participant, index) => (
          <div key={index} className="mr-2">
            <img
              src={participant.avatar}
              alt={participant.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        ))}
        <div className="flex items-center ml-auto">
          <i className="fas fa-redo text-gray-500 mr-2"></i>
          <i className="fas fa-share text-gray-500"></i>
        </div>
      </div>
    </div>
  );
};

const Events: React.FC = () => {
  const eventData = [
    {
      title: 'Team meeting',
      time: '11:30 - 12:30',
      participants: [
        { name: 'John Doe', avatar: 'https://via.placeholder.com/50' },
        { name: 'Jane Smith', avatar: 'https://via.placeholder.com/50' },
        { name: 'Bob Johnson', avatar: 'https://via.placeholder.com/50' },
      ],
      active: true,
    },
    {
      title: 'Nobel prize',
      time: '15:30 - 16:30',
      participants: [
        { name: 'Alice Williams', avatar: 'https://via.placeholder.com/50' },
        { name: 'Tom Davis', avatar: 'https://via.placeholder.com/50' },
        { name: 'Emily Brown', avatar: 'https://via.placeholder.com/50' },
      ],
      active: false,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="text-lg font-bold mb-4">Events</div>
      {eventData.map((event, index) => (
        <Event
          key={index}
          title={event.title}
          time={event.time}
          participants={event.participants}
          active={event.active}
        />
      ))}
    </div>
  );
};

export default Events;