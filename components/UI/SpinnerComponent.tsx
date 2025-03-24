import React from "react";

const SpinnerComponent = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner"></div>
      <style jsx>{`
        .spinner-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: white;
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #00000;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SpinnerComponent;
