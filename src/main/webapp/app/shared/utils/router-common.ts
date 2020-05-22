import { generatePath } from 'react-router';

export function updatePath(pathDefine, params) {
  const path = generatePath(pathDefine, params);
  return path;
}
