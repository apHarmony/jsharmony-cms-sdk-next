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

import { ReactElement, PropsWithChildren, WeakValidationMap, ValidationMap, createElement } from 'react'

/**
 * JshCmsContentComponent - Content Component Config.
 * @public
 */
export interface JshCmsContentComponentConfig {
  selector: string;
  onBeforeRender?: (componentContainer: Element) => void;
  onRender?: (componentContainer: Element) => void;
  render?: (componentContainer: Element) => JshCmsContentComponentRender | undefined;
}

/**
 * JshCmsContentComponent - Content Component.
 * @public
 */
export interface JshCmsContentComponent<P = {}> { // eslint-disable-line @typescript-eslint/ban-types
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null; // eslint-disable-line @typescript-eslint/no-explicit-any
  propTypes?: WeakValidationMap<P> | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
  contextTypes?: ValidationMap<any> | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
  jshCmsComponentConfig?: JshCmsContentComponentConfig | undefined;
}

/**
 * JshCmsContentComponent - Content Component.
 * @public
 */
export class JshCmsContentComponent<P = {}> implements JshCmsContentComponent<P> { // eslint-disable-line @typescript-eslint/ban-types
  public static extractChildrenAsReactElements(container: Element): ReactElement[]{
    const children = container.children;
    if (children?.length) {
      const reactElements = [];
      for (let i = 0; i < children.length; i++) {
        const item = children.item(i);
        if (!item) {
          continue;
        }
        const props: { [propName: string]: any } = { // eslint-disable-line @typescript-eslint/no-explicit-any
          dangerouslySetInnerHTML: { __html: item.innerHTML },
          key: i
        };
        for (let a = 0; a < item.attributes.length; a++) {
          const attr = item.attributes[a];
          if (!attr) {
            continue;
          }

          if (attr.name === 'class') {
            props['className'] = attr.value;
          } else {
            props[attr.name] = attr.value;
          }
        }
        const reactElement = createElement(item.nodeName.toLowerCase(), props);
        reactElements.push(reactElement);
      }
      return reactElements;
    } else {
      return [];
    }
  }
}

/**
 * JshCmsContentComponentInstance - Content Component Instance.
 * @public
 */
export interface JshCmsContentComponentInstance {
  container: Element;
  element: ReactElement;
  key: string;
}


/**
 * JshCmsContentComponentInstance - Content Component Render Parameters.
 * @public
 */
export interface JshCmsContentComponentRender {
  container?: Element;
  element: ReactElement;
  key?: string;
}
