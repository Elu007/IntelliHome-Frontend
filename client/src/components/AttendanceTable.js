import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceTable = ({ setTotalCount }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/attendances');
        setData(response.data);
        setTotalCount(response.data.length); // Update the total count
      } catch (error) {
        setError('There was an error fetching the data!');
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchData();

    // Set interval to fetch data every 15 seconds
    const intervalId = setInterval(fetchData, 10000); // 10000ms = 10s

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [setTotalCount]);

  const formatTime = (timeString) => {
    const date = new Date();
    const [hours, minutes, seconds] = timeString.split(':');
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64 mb-4"></div>
                <h2 className="text-xl font-semibold">Loading...</h2>
                <p>Please wait while we load the data.</p>
            </div>
        </div>
    );
}

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-500">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-auto w-full rounded-lg shadow-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white">
          <tr>
            <th className="w-1/12 px-4 py-2 text-left">S.No</th>
            <th className="w-3/12 px-4 py-2 text-left">Name</th>
            <th className="w-3/12 px-4 py-2 text-left">Time</th>
            <th className="w-3/12 px-4 py-2 text-left">Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2 text-center">{index + 1}</td>
              <td className="px-4 py-2 font-bold">{item.name}</td>
              <td className="px-4 py-2">{formatTime(item.Time)}</td>
              <td className="px-4 py-2 text-center">
                <img src="/images/person.png" alt="person" className="rounded-lg w-14 h-14 object-cover" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
