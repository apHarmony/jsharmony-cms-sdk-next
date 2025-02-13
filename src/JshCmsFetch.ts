import { unstable_cache } from 'next/cache';

export interface FetchResponse {
  /** Whether the request status code was 200 */
  ok: boolean,
  /** JSON response */
  json: any, // eslint-disable-line @typescript-eslint/no-explicit-any
}

const cacheFunc = unstable_cache(
  async(url: string) => {
    const res = await fetch(url);
    const rslt = {
      ok: res.ok
    } as FetchResponse;
    try {
      rslt.json = await res.json(); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    } catch {
      /* Do nothing */
    }
    return rslt;
  },
  ['jsharmony-cms-url-cache'],
  { revalidate: 60 }
);

export async function fetchCached(url: URL){
  //return await fetch(url, { cache: 'force-cache', next: { revalidate: 30 } });
  return await cacheFunc(url.toString());
}
