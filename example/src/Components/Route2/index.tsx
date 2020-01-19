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
      <div className="Allowed">Private Route</div>
      <textarea defaultValue={`Location: '${location}'\nContext: ${JSON.stringify(context)}`} />
      <div></div>
      <button onClick={() => setLocation('/')}>Go to index</button>
    </div>
  );
};

export default Route2;
