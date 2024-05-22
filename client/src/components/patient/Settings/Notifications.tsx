import React from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  isUnread: boolean;
}

const PatientNotifications: React.FC = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  React.useEffect(() => {
    // Fetch notifications from an API or data source
    // and update the `notifications` state
    const fetchedNotifications: Notification[] = [
      {
        id: '1',
        title: 'Appointment Reminder',
        message: 'You have an upcoming appointment on May 25th, 2024.',
        isUnread: true,
      },
      {
        id: '2',
        title: 'Prescription Refill',
        message: 'Your prescription for Lisinopril has been refilled.',
        isUnread: false,
      },
      {
        id: '3',
        title: 'Test Results',
        message: 'Your recent blood test results are available for review.',
        isUnread: true,
      },
      {
        id: '4',
        title: 'Payment Due',
        message: 'Your payment for the last appointment is past due.',
        isUnread: false,
      },
    ];
    setNotifications(fetchedNotifications);
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-6 rounded-lg shadow-md mb-4 bg-white flex justify-between items-center ${
            notification.isUnread ? 'border-l-4 border-[#7da466]' : ''
          }`}
        >
          <div>
            <h2 className="text-2xl font-bold text-[#91BF77]">
              {notification.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{notification.message}</p>
          </div>
          {notification.isUnread && (
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientNotifications;