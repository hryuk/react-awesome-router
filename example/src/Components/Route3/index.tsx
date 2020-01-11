import React, {Fragment} from 'react';

import {useLocation} from 'react-awesome-router';

const Route3: React.FC = () => {
  const {location, params, setLocation} = useLocation();

  return (
    <Fragment>
      <div>ROUTE 3</div>
      <div>Location: '{location}'</div>
      <div>Params: '{JSON.stringify(params)}'</div>
      <button onClick={() => setLocation('/')}>Go to index</button>
    </Fragment>
  );
};

export default Route3;
