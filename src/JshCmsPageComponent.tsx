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

import { useJshCms } from './JshCmsContext';
import { JshCmsPage, notifyUpdateProps } from './JshCmsPage';
import React, { useLayoutEffect, useState, useEffect } from 'react'

/**
 * @public
 */
export function useJshCmsPageComponentData<T>(props: { jshCmsPage?: JshCmsPage; componentId: string; contentAreaName?: string; }): { componentData: (T|null) }{
  const { componentId } = props;
  const contentAreaName = props.contentAreaName ?? componentId;
  const { jshCmsPage: contextJshCmsPage } = useJshCms();
  const jshCmsPage = props.jshCmsPage ?? contextJshCmsPage;

  const [strData, setStrData] = useState(jshCmsPage?.content[contentAreaName] || '');

  if (typeof(window) !== 'undefined') {
    useLayoutEffect(() => {
      if (!window.jsHarmonyCMSInstance || !jshCmsPage || !jshCmsPage.isInEditor) {return undefined;}

      // Editor mode
      const updateEventHandler = (eventProps: notifyUpdateProps) => {
        if (eventProps.componentId !== componentId) {return;}

        // Return if component is not in the content area
        if (eventProps.contentAreaName) {return;}

        setStrData(eventProps.content ?? '');
      };

      let bindTimer: number | null = null;
      function bindEventHandler(){
        bindTimer = null;
        if (window.jsHarmonyCMSInstance?.componentManager?.onNotifyUpdate){
          window.jsHarmonyCMSInstance.componentManager.onNotifyUpdate.push(updateEventHandler);
        } else {
          bindTimer = window.setTimeout(bindEventHandler, 10);
        }
      }
      bindEventHandler();
      return () => {
        if (bindTimer) {window.clearTimeout(bindTimer);}
        if (!window.jsHarmonyCMSInstance?.componentManager) {return;}
        const eventIdx = window.jsHarmonyCMSInstance.componentManager.onNotifyUpdate.indexOf(updateEventHandler);
        if (eventIdx >= 0) {window.jsHarmonyCMSInstance.componentManager.onNotifyUpdate.splice(eventIdx, 1);}
      };
    }, [setStrData, jshCmsPage, componentId]);
  }

  useEffect(() => { setStrData(jshCmsPage?.content[contentAreaName] || ''); }, [jshCmsPage?.content[contentAreaName]]);

  let componentData: (T|null) = null;
  try {
    componentData = JSON.parse(strData) as (T|null);
  } catch {
    /* Do nothing */
  }
  return { componentData };
}

/**
 * @public
 */
export interface JshCmsPageComponentProps {
  componentId: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}


/**
 * JshCmsPageComponent - Page Component.
 * @public
 */
export function JshCmsPageComponent(props: JshCmsPageComponentProps){
  const { children, componentId, ...otherProps } = props;
  return (
      <div cms-component-virtual='true' cms-component={componentId} {...otherProps}>
        {children}
      </div>
    );
}
