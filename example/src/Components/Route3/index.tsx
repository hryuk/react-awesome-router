import React from 'react';

import {useLocation} from 'react-awesome-router';

const Route3: React.FC = () => {
  const {location, params, setLocation} = useLocation();

  return (
    <div className="route">
      <div className="Allowed">ROUTE 3</div>
      <textarea
        readOnly
        defaultValue={`Location: '${location}'\nParams: ${JSON.stringify(params)}`}
      />
      <button onClick={() => setLocation('/')}>Go to index</button>
    </div>
  );
};

export default Route3;
