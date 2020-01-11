import {pathToRegexp, Key} from 'path-to-regexp';

const match = (path: string, route: string): boolean => {
  return pathToRegexp(path).test(route);
};

const parse = (path: string, route: string): Array<Object> => {
  try {
    const keys: Array<Key> = [];
    const regex = pathToRegexp(path, keys);
    let params: any = {};

    regex
      .exec(route)!
      .slice(1)
      .forEach((match, i) => {
        params[keys[i].name] = match;
      });
    return params;
  } catch (e) {
    return [];
  }
};

const Path = {
  match,
  parse
};

export default Path;
