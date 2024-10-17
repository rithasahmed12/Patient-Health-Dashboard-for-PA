import React from 'react';

const Unauthorized: React.FC = () => {
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
        <g id="freepik--Padlock--inject-3">
          <path
            d="M83.61,179.69V153.92c0-18.24,15.16-33.08,33.79-33.08s33.79,14.84,33.79,33.08v25.77h13.47V153.92c0-25.51-21.2-46.27-47.26-46.27s-47.26,20.76-47.26,46.27v25.77Z"
            style={{
              fill: 'none',
              stroke: '#263238',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.17px',
            }}
          />
          <rect
            x="65.14"
            y="179.87"
            width="103.18"
            height="85.35"
            style={{
              fill: 'none',
              stroke: '#263238',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '1.17px',
            }}
          />
          <path
            d="M127.46,215.32a11.24,11.24,0,0,0-22.47,0,11,11,0,0,0,5.9,9.68L109,244.38h14.45L121.56,225A11,11,0,0,0,127.46,215.32Z"
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
        <h1 className="text-4xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-lg text-gray-600">
          You do not have permission to view this page.
        </p>
        <p className="text-lg text-gray-600">
          Please contact your administrator if you believe this is a mistake.
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

export default Unauthorized;
