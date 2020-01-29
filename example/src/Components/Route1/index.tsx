import React from 'react';

import {useLocation} from 'react-awesome-router';

const Route1: React.FC = () => {
  const {location, setLocation} = useLocation();

  return (
    <div className="route">
      <div className="Allowed">ROUTE 1</div>
      <textarea readOnly defaultValue={`Location: '${location}'`} />
      <button onClick={() => setLocation('/')}>Go to index</button>
    </div>
  );
};

export default Route1;
