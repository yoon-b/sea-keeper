import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

const Toast: React.FC<{ text: string; onClose: () => void }> = ({ text, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white bg-opacity-80 px-6 py-3 rounded-md shadow-lg text-xs"
      style={{ zIndex: 1000 }}
    >
      {text}
    </div>
  );
};

export const showToast = (text: string) => {
  const toastRoot = document.createElement("div");
  document.body.appendChild(toastRoot);

  const root = ReactDOM.createRoot(toastRoot);

  const removeToast = () => {
    root.unmount();
    toastRoot.remove();
  };

  root.render(<Toast text={text} onClose={removeToast} />);
};
