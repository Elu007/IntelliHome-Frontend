import React, { useState } from 'react';
import AttendanceTable from './AttendanceTable';

const Home = () => {
  const [totalCount, setTotalCount] = useState(0); // State to hold the total count

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 bg-gradient-to-r from-fuchsia-500 to-cyan-500">
        <h1 className="text-2xl text-white font-bold mb-4">Welcome to the Attendance Dashboard</h1>
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="w-full md:w-4/5">
            <AttendanceTable setTotalCount={setTotalCount} />
          </div>
          <div className="w-full md:w-1/5 mt-4 md:mt-0 ml-0 md:ml-4 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Scanned Person Count</h2>
            <p className="text-2xl font-bold">{totalCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
