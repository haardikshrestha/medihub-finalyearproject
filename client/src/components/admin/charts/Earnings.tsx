import React from 'react';
import { Bar } from 'react-chartjs-2';

const EarningChart: React.FC = () => {
  const todayEarnings = 1500;
  const yesterdayEarnings = 1200;

  const data = {
    labels: ['Yesterday', 'Today'],
    datasets: [
      {
        label: 'Earnings',
        backgroundColor: ['#FF5733', '#4CAF50'],
        data: [yesterdayEarnings, todayEarnings],
      },
    ],
  };

  return (
    <div style={{ height: '100%' }}>
      <Bar data={data} />
    </div>
  );
};

export default EarningChart;
