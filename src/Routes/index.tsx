import React, {useContext, Fragment} from 'react';
import {RouterContext} from '../Context';

export const Routes: React.FC = () => {
  const {component} = useContext(RouterContext);

  return <Fragment>{component}</Fragment>;
};
