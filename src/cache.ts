import NodeCache from 'node-cache';
const myCache = new NodeCache({ stdTTL: 60 }); // cache for 60 seconds

export function getCache(key: string) {
  return myCache.get(key);
}

export function setCache(key: string, value: unknown) {
  myCache.set(key, value);
}
