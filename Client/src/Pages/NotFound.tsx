import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      {/* SVG Illustration */}
      <svg
        className="h-[40vh] w-auto mb-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
      >
        <g id="freepik--background-simple--inject-3">
          <path
            d="M55.48,273.73s2.32,72,62.43,120,143.41,51.43,210.84,56,119.23-33.62,127-91.32-43.72-74.64-71.68-140.33S358.64,130.8,299.49,90.4,147.8,74.81,99.29,144,55.48,273.73,55.48,273.73Z"
            style={{ fill: '#3B82F6' }}
          />
          <path
            d="M55.48,273.73s2.32,72,62.43,120,143.41,51.43,210.84,56,119.23-33.62,127-91.32-43.72-74.64-71.68-140.33S358.64,130.8,299.49,90.4,147.8,74.81,99.29,144,55.48,273.73,55.48,273.73Z"
            style={{ fill: '#fff', opacity: 0.7 }}
          />
        </g>
        <g id="freepik--404--inject-3">
          <path
            d="M147.68,236.37v-47.74l-52.05,47.74v-62.95h18.42v47.74l52.05-47.74v62.95Z"
            style={{
              fill: 'none',
              stroke: '#263238',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.17px',
            }}
          />
          <path
            d="M224.32,236.37v-62.95h-18.42v62.95Z"
            style={{
              fill: 'none',
              stroke: '#263238',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.17px',
            }}
          />
          <path
            d="M282.68,236.37v-47.74l-52.05,47.74v-62.95h18.42v47.74l52.05-47.74v62.95Z"
            style={{
              fill: 'none',
              stroke: '#263238',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.17px',
            }}
          />
        </g>
      </svg>

      {/* Error Message */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-lg text-gray-600">
          It might have been moved or deleted.
        </p>
        <button
          className="px-6 py-2 mt-4 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
          onClick={() => window.location.href = '/'}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;