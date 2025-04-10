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

import React from 'react'
import { useJshCms } from './JshCmsContext';
import { JshCmsPage } from './JshCmsPage';
import { JshCmsContentComponent } from './JshCmsContentComponent';
import { JshCmsContentAreaBody } from './JshCmsContentAreaBody';
import { JshCmsContentAreaPortals } from './JshCmsContentAreaPortals';


/**
 * @public
 */
export interface JshCmsContentAreaProps {
  jshCmsPage?: JshCmsPage;
  jshCmsContentComponents?: JshCmsContentComponent<any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  ['cms-content']: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * JshCmsContentArea - Render content area.
 * @remarks
 * React function component for rendering content area content and associated portals for child component rendering.
 *
 * @example
 * ```
 * <JshCmsContentArea cms-content="body" jshCmsPage={jshCmsPage}>
 *   Optional Default Body Content
 * </JshCmsContentArea>
 * ```
 * @public
 */
export function JshCmsContentArea(props: JshCmsContentAreaProps) {
  const { jshCmsPage: contextJshCmsPage } = useJshCms();
  const { children, jshCmsPage: propJshCmsPage, jshCmsContentComponents, ['cms-content']: contentAreaName = 'body', ...otherProps } = props;
  const jshCmsPage = propJshCmsPage ?? contextJshCmsPage;
  if (jshCmsPage?.content[contentAreaName]) {
    return (
      <>
        <JshCmsContentAreaBody contentAreaName={contentAreaName} content={jshCmsPage.content[contentAreaName]} {...otherProps} />
        <JshCmsContentAreaPortals jshCmsPage={jshCmsPage} contentAreaName={contentAreaName} jshCmsContentComponents={jshCmsContentComponents} />
      </>
    );
  } else {
    return (
      <>
        <JshCmsContentAreaBody contentAreaName={contentAreaName} {...otherProps}>{children}</JshCmsContentAreaBody>
        <JshCmsContentAreaPortals jshCmsPage={jshCmsPage} contentAreaName={contentAreaName} jshCmsContentComponents={jshCmsContentComponents} />
      </>
    );
  }
}
