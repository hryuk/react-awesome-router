import React from 'react';

import {useLocation} from 'react-awesome-router';

const Route2: React.FC = () => {
  const {location, setLocation} = useLocation();

  return (
    <div className="route">
      <div>ROUTE 2</div>
      <div>Location: '{location}'</div>
      <button onClick={() => setLocation('/')}>Go to index</button>
    </div>
  );
};

export default Route2;
