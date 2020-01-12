import React from 'react';

import {useLocation} from 'react-awesome-router';

const Route3: React.FC = () => {
  const {location, params, setLocation} = useLocation();

  return (
    <div className="route">
      <div>ROUTE 3</div>
      <div>Location: '{location}'</div>
      <div>Params: '{JSON.stringify(params)}'</div>
      <button onClick={() => setLocation('/')}>Go to index</button>
    </div>
  );
};

export default Route3;
