import {useContext} from 'react';
import {RouterContext} from '../Context';

export const useLocation = () => {
  const {location, params, setLocation} = useContext(RouterContext);

  return {location, params, setLocation};
};
