import {useContext} from 'react';
import {RouterContext} from '../Context';

export const useLocation = () => {
  const {location, setLocation} = useContext(RouterContext);

  return {location, setLocation};
};
