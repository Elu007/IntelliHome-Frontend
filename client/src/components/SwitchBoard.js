import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SwitchBoard = () => {
  const [isLightOn, setIsLightOn] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Blynk API endpoint
  const blynkApiUrl = 'https://blr1.blynk.cloud/external/api/get?token=D7S_uucjGys3FpAsV0cc0bVhDT3pnlSD&d5';

  const fetchLightStatus = async () => {
    try {
      const response = await axios.get(blynkApiUrl);
      setIsLightOn(response.data === 1);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('There was an error fetching the light status!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataAndSetupInterval = async () => {
      await fetchLightStatus(); // Fetch initial status

      // Set interval to fetch status every 15 seconds
      const intervalId = setInterval(fetchLightStatus, 5000); // 5000ms = 5s

      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    };

    fetchDataAndSetupInterval(); // Call the function
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='grid justify-items-center'>
      <h2 className='text-2xl font-bold'> Light Mode</h2>
      <img className='mb-6' src={`/images/${isLightOn ? 'lightOn.png' : 'lightOff.png'}`} alt="Light" />
      <label className="inline-flex items-center cursor-pointer">
        <span className="mr-3 text-xl font-bold text-gray-900 dark:text-gray-900">{isLightOn ? '' : 'Off'}</span>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isLightOn}
          onChange={() => { }} // No-op to prevent uncontrolled input warning
          readOnly // Make it read-only to avoid user interaction
        />
        <div className={`relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full ${isLightOn ? 'peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:bg-blue-600' : ''}`}>
          <div className="after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600"></div>
        </div>
        <span className="ml-3 text-xl font-bold text-gray-900 dark:text-gray-900">{isLightOn ? 'On' : ''}</span>
      </label>
    </div>
  );
};

export default SwitchBoard;
