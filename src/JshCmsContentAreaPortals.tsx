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
import { JshCmsPage } from './JshCmsPage';
import { JshCmsContentComponent, JshCmsContentComponentInstance } from './JshCmsContentComponent';
import { createPortal } from 'react-dom';

declare global {
  interface Window {
    jsHarmonyCMSInstance?: {
      componentManager: {
        onNotifyUpdate: ((props: { element: HTMLDivElement, componentId: string, contentAreaName: string, content?: string }) => void)[];
      };
    };
  }
}

/**
 * @internal
 */
function extractComponents(contentAreaElement: HTMLDivElement, jshCmsContentComponents: JshCmsContentComponent<any>[]): JshCmsContentComponentInstance[] { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!jshCmsContentComponents?.length) {
    return [];
  }
  const componentInstances: JshCmsContentComponentInstance[] = [];
  jshCmsContentComponents.forEach(function(jshCmsContentComponent){
    const componentConfig = jshCmsContentComponent.jshCmsComponentConfig;
    if (!componentConfig) {return;}
    const componentName = (jshCmsContentComponent.name||jshCmsContentComponent.displayName||'');
    const componentContainers = contentAreaElement?.querySelectorAll(componentConfig.selector);
    componentContainers.forEach(function(componentContainer, index) {
      if (componentConfig.onBeforeRender){
        componentConfig.onBeforeRender(componentContainer);
      }
      const componentKey = `${componentName}_${  index  }_${  Math.random().toString().substring(0, 15)  }-${  Math.random().toString().substring(0, 15)  }-${  Math.random().toString().substring(0, 15)  }-${ Math.random().toString().substring(0, 15)}`;
      if (componentConfig.render){
        const renderResult = componentConfig.render(componentContainer);
        if (renderResult){
          componentInstances.push({
            container: renderResult.container ?? componentContainer,
            element: renderResult.element,
            key: renderResult.key ?? componentKey
          });
        }
      } else {
        componentContainer.innerHTML = '';
        componentInstances.push({
          container: componentContainer,
          element: React.createElement(jshCmsContentComponent),
          key: componentKey
        });
      }
      if (componentConfig.onRender){
        componentConfig.onRender(componentContainer);
      }
    });
  });
  return componentInstances;
}

/**
 * @internal
 */
export type Props = {
  jshCmsPage?: JshCmsPage;
  contentAreaName: string;
  jshCmsContentComponents?: JshCmsContentComponent<any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
};

/**
 * @internal
 */
export const JshCmsContentAreaPortals: React.VFC<Props> = ({
  jshCmsPage,
  contentAreaName,
  jshCmsContentComponents
}) => {

  if (!jshCmsContentComponents?.length) {return <></>;}

  const [components, setComponents] = useState<JshCmsContentComponentInstance[]>([]);
  const isInit = useRef(false);

  useLayoutEffect(() => {
    if (!window.jsHarmonyCMSInstance || !jshCmsPage || !jshCmsPage.isInEditor) {return undefined;}

    const curComponents = components.slice(0);

    //Editor mode
    const updateEventHandler = (props: { element: HTMLDivElement, componentId: string, contentAreaName: string }) => {
      const componentId = props.componentId;
      if (!componentId) {return;}

      //Return if component is not in the content area
      if (props.contentAreaName !== `page.content.${contentAreaName}`) {return;}

      //Prune removed components
      for (let i=0; i<curComponents.length; i++){
        const portalContainer = curComponents[i]?.container;
        if (portalContainer && !document.contains(portalContainer)) {
          curComponents.splice(i--, 1);
        }
      }

      //Extract and initialize components
      const contentAreaElement = props.element;
      const subComponents = extractComponents(contentAreaElement, jshCmsContentComponents);
      subComponents.forEach(function(subComponent) {
        curComponents.push(subComponent);
      });
      setComponents(curComponents);
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
  }, [components]);

  //Publish mode
  useEffect(() => {
    if (isInit.current) {return;}
    isInit.current = true;
    if (!jshCmsPage?.isInEditor) {
      const newComponents = extractComponents(document.querySelector(`[cms-content-editor="page.content.${contentAreaName}"]`) as HTMLDivElement, jshCmsContentComponents);
      setComponents(newComponents);
    }
  }, []);

  return (
    <>
      {components.map(function(component) {
        return createPortal(
          component.element,
          component.container,
          component.key
        );
      })}
    </>
  );
};
