import React, { useEffect } from 'react';

import { useLocation } from 'react-awesome-router';

const Route2: React.FC = () => {
  const { location, context, setLocation } = useLocation();

  useEffect(() => {
    if (!context?.auth?.logued) {
      alert('Logued out!');
      setLocation('/');
    }
  }, [context, setLocation]);

  return (
    <div className="route">
      <div>Private Route</div>
      <div>Location: '{location}'</div>
      <div>Context: '{JSON.stringify(context)}'</div>
      <button onClick={() => setLocation('/')}>Go to index</button>
    </div>
  );
};

export default Route2;
