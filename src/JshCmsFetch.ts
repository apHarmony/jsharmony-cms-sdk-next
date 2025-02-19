/*!
Copyright 2025 apHarmony

This file is part of jsHarmony.

jsHarmony is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

jsHarmony is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this package.  If not, see <http://www.gnu.org/licenses/>.
*/

import { unstable_cache } from 'next/cache';

export interface FetchResponse {
  /** Whether the request status code was 200 */
  ok: boolean,
  /** JSON response */
  json: any, // eslint-disable-line @typescript-eslint/no-explicit-any
}

export async function fetchCached(reqUrl: URL, cacheDuration: number){
  const cacheFunc = unstable_cache(
    async(url: string) => {
      const res = await fetch(url);
      const rslt = {
        ok: res.ok
      } as FetchResponse;
      try {
        rslt.json = await res.json(); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
      } catch {
        rslt.ok = false;
      }
      return rslt;
    },
    ['jsharmony-cms-url-cache'],
    { revalidate: cacheDuration }
  );

  return await cacheFunc(reqUrl.toString());
}
