import React from 'react';

import { useLocation } from 'react-awesome-router';

const Unauthorized: React.FC = () => {
  const { location, context, setLocation } = useLocation();

  return (
    <div className="route">
      <div>UNAUTHORIZED</div>
      <div>Location: '{location}'</div>
      <div>Context: '{JSON.stringify(context)}'</div>
      <button onClick={() => setLocation('/')}>Go to index</button>
    </div>
  );
};

export default Unauthorized;
