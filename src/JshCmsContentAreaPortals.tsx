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
import { JshCmsPage, notifyUpdateProps } from './JshCmsPage';
import { JshCmsContentComponent, JshCmsContentComponentInstance, JshCmsContentComponentProps } from './JshCmsContentComponent';
import { createPortal } from 'react-dom';

declare global {
  interface Window {
    jsHarmonyCMSInstance?: {
      componentManager: {
        onNotifyUpdate: ((props: { element: HTMLElement, componentId: string, contentAreaName: string, content?: string }) => void)[];
      };
    };
  }
}

/**
 * @internal
 */
function extractComponents(contentAreaElement: HTMLElement, jshCmsContentComponents: JshCmsContentComponent<any>[], contentComponentProps: JshCmsContentComponentProps): JshCmsContentComponentInstance[] { // eslint-disable-line @typescript-eslint/no-explicit-any
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
      let instanceProps: JshCmsContentComponentProps|null = null;
      if (componentContainer.hasAttribute('cms-component-virtual')){
        instanceProps = Object.assign({}, contentComponentProps);
        const componentData: unknown = JSON.parse(atob(componentContainer.getAttribute('data-component-data')??'')||'null');
        const componentProperties: unknown = JSON.parse(atob(componentContainer.getAttribute('data-component-properties')??'')||'null');
        if (!instanceProps.data && componentData) {instanceProps.data = componentData;}
        if (!instanceProps.properties && componentProperties) {instanceProps.properties = componentProperties;}
      }
      if (componentConfig.onBeforeRender){
        componentConfig.onBeforeRender(componentContainer, instanceProps);
      }
      const componentKey = `${componentName}_${  index  }_${  Math.random().toString().substring(0, 15)  }-${  Math.random().toString().substring(0, 15)  }-${  Math.random().toString().substring(0, 15)  }-${ Math.random().toString().substring(0, 15)}`;
      if (componentConfig.render){
        const renderResult = componentConfig.render(componentContainer, instanceProps);
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
          element: React.createElement(jshCmsContentComponent, instanceProps),
          key: componentKey
        });
      }
      if (componentConfig.onRender){
        componentConfig.onRender(componentContainer, instanceProps);
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
  const lastContent = useRef<string|null>(null);

  useLayoutEffect(() => {
    if (!window.jsHarmonyCMSInstance || !jshCmsPage || !jshCmsPage.isInEditor) {return undefined;}

    const curComponents = components.slice(0);

    //Editor mode
    const updateEventHandler = (props: notifyUpdateProps) => {
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
      const contentComponentProps = {
        data: props.data ?? null,
        isGridRowPreview: props.isGridRowPreview ?? false,
        isInComponentEditor: (props.isItemPreview ?? false) || (props.isGridRowPreview ?? false),
        isInEditor: true,
        isInPageEditor: true,
        isItemPreview: props.isItemPreview ?? false,
        properties: props.properties ?? null
      };
      const subComponents = extractComponents(contentAreaElement, jshCmsContentComponents, contentComponentProps);
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
    if (!jshCmsPage?.isInEditor) {
      const newContent = (jshCmsPage?.content[contentAreaName]??null);
      if (lastContent.current===newContent) {return;}
      lastContent.current = newContent;
      const contentComponentProps = {
        data: null,
        isGridRowPreview: false,
        isInComponentEditor: false,
        isInEditor: false,
        isInPageEditor: false,
        isItemPreview: false,
        properties: null
      };
      const newComponents = extractComponents(document.querySelector(`[cms-content-editor="page.content.${contentAreaName}"]`) as HTMLElement, jshCmsContentComponents, contentComponentProps);
      setComponents(newComponents);
    }
  }, [jshCmsPage?.content[contentAreaName]]);

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
