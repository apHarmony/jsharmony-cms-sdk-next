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


import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { JshCmsPage, JshCmsComponent } from './JshCmsPage';
import { createPortal } from 'react-dom';

declare global {
  interface Window {
    jsHarmonyCMSInstance?: {
      componentManager: {
        onNotifyUpdate: ((props: { element: HTMLDivElement, componentId: string }) => void)[];
      };
    };
  }
}

/**
 * @internal
 */
export type Props = {
  jshCmsPage?: JshCmsPage;
  contentAreaName: string;
  componentExtractor?: (componentContainer: HTMLDivElement) => JshCmsComponent[];
};

/**
 * @internal
 */
export const JshCmsContentAreaPortals: React.VFC<Props> = ({
  jshCmsPage,
  contentAreaName,
  componentExtractor
}) => {

  if (!componentExtractor) {return <></>;}

  const [components, setComponents] = useState<JshCmsComponent[]>([]);
  const isInit = useRef(false);

  useLayoutEffect(() => {
    if (!window.jsHarmonyCMSInstance || !jshCmsPage || !jshCmsPage.isInEditor) {return undefined;}

    const curComponents = components.slice(0);

    //Editor mode
    const updateEventHandler = (props: { element: HTMLDivElement, componentId: string }) => {
      const componentId = props.componentId;
      if (!componentId) {return;}
      for (let i=0; i<curComponents.length; i++){
        const portalContainer = curComponents[i]?.portalContainer;
        if (portalContainer && !document.contains(portalContainer)) {
          curComponents.splice(i--, 1);
        }
      }
      const componentContainer = props.element;
      const subComponents = componentExtractor(componentContainer);
      subComponents.forEach(function(subComponent) {
        curComponents.push(subComponent);
      });
      setComponents(curComponents);
    };

    window.jsHarmonyCMSInstance.componentManager.onNotifyUpdate.push(updateEventHandler);
    return () => {
      if (!window.jsHarmonyCMSInstance) {return;}
      const eventIdx = window.jsHarmonyCMSInstance.componentManager.onNotifyUpdate.indexOf(updateEventHandler);
      if (eventIdx >= 0) {window.jsHarmonyCMSInstance.componentManager.onNotifyUpdate.splice(eventIdx, 1);}
    };
  }, [components]);

  //Publish mode
  useEffect(() => {
    if (!jshCmsPage?.isInEditor) {
      if (isInit.current) {return;}
      isInit.current = true;
      const newComponents = componentExtractor(document.querySelector(`[cms-content-editor="page.content.${contentAreaName}"]`) as HTMLDivElement);
      setComponents(newComponents);
    }
  }, []);

  return (
    <>
      {components.map(function(component) {
        return createPortal(
          component.element,
          component.portalContainer,
          component.key
        );
      })}
    </>
  );
};
