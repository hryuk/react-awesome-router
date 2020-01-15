import { useContext } from 'react';
import { RouterContext } from '../Context';

export const useLocation = () => {
  const { location, context, params, setLocation, setContext } = useContext(RouterContext);

  return { location, context, params, setLocation, setContext };
};
