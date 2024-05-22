import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 rounded-b-lg flex items-center justify-center space-x-10">
      <img src="/images/logo.png" alt="Logo" className="w-16 h-16 rounded-lg ring-2 ring-gray-700" /> 
      <h1 className="text-2xl font-bold">IntelliHome 2.0 Dashboard</h1>
    </header>
  );
}

export default Header;
