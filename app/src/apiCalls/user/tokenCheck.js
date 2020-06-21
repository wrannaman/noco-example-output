import { maybeSetToken, call } from '../api';

export default async (token) => {
  maybeSetToken(token);
  const res = await call('GET', 'me');
  const json = await res.json();
  return json;
};
