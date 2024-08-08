import React from 'react';
import snowbellRabbit from "../assets/images/snowbell-rabbit-error.gif"

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col items-center">
        <img 
          src={snowbellRabbit}
          alt="Cute Animal"
          className="w-[60%] mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-4">
          We're sorry, but the page you were looking for doesn't exist.
        </p>
        <button 
          className="btn-primary w-[50%]"
          onClick={() => window.location.href = '/'}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
