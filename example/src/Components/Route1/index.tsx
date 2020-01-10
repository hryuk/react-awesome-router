import React, {Fragment} from 'react';

import {useLocation} from 'react-awesome-router';

const Route1: React.FC = () => {
  const {location, setLocation} = useLocation();

  return (
    <Fragment>
      <div>ROUTE 1</div>
      <div>Location: '{location}'</div>
      <button onClick={() => setLocation('/route2')}>Go to Route2</button>
    </Fragment>
  );
};

export default Route1;
