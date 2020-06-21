import {
  call
} from '../api';

export default async (id) => {
  try {
    const res = await call('DELETE', `company/${id}?id=${id}`);
    return res.json();
  } catch (e) {
    if (e) return e;
    return {
      error: 'Unknown Error'
    };
  }
};