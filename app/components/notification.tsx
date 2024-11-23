import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
}

export function Notification({ message }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 w-96 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md z-50 transition-opacity duration-300">
      <div className="flex items-center">
        <CheckCircle className="h-5 w-5 mr-2" />
        <p className="font-bold">Success</p>
      </div>
      <p className="mt-1">{message}</p>
    </div>
  );
}