import React from 'react';

import { useLocation } from 'react-awesome-router';

const Unauthorized: React.FC = () => {
  const { location, context, setLocation } = useLocation();

  return (
    <div className="route">
      <div className="NotAllowed">UNAUTHORIZED</div>
      <textarea value={`Location: '${location}'\nContext: ${JSON.stringify(context)}`} />
      <button onClick={() => setLocation('/')}>Go to index</button>
    </div>
  );
};

export default Unauthorized;
