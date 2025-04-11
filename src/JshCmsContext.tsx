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

import React, { createContext, useContext, useState, useEffect } from 'react';
import { JshCmsPage } from './JshCmsPage';
import { JshCmsConfig } from './JshCmsRouter';

/**
 * @internal
 */
export const JshCmsContext = createContext<JshCmsContextData>({ jshCmsConfig: undefined, jshCmsPage: undefined });

/**
 * @public
 */
export interface JshCmsContextData {
  jshCmsConfig: JshCmsConfig | undefined;
  jshCmsPage: JshCmsPage | undefined;
}

/**
 * @public
 */
export interface JshCmsProviderProps {
  jshCmsConfig?: JshCmsConfig;
  jshCmsPage?: JshCmsPage;
  children?: React.ReactNode;
}

/**
 * @public
 */
export const useJshCms = () => useContext(JshCmsContext);

/**
 * @public
 */
export function JshCmsProvider(props: JshCmsProviderProps){
  const { children, jshCmsConfig, jshCmsPage } = props;
  const [localJshCmsConfig, setJshCmsConfig] = useState<JshCmsConfig|undefined>(jshCmsConfig);
  const [localJshCmsPage, setJshCmsPage] = useState<JshCmsPage|undefined>(jshCmsPage);
  useEffect(() => { setJshCmsConfig(props.jshCmsConfig); }, [props.jshCmsConfig]);
  useEffect(() => { setJshCmsPage(props.jshCmsPage); }, [props.jshCmsPage]);

  const value = { jshCmsConfig: localJshCmsConfig, jshCmsPage: localJshCmsPage, setJshCmsConfig, setJshCmsPage };
  return <JshCmsContext.Provider value={value}>{children}</JshCmsContext.Provider>
}
