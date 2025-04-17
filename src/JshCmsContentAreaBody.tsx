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

import React, { useMemo } from 'react';

/**
 * @internal
 */
export type JshCmsContentAreaBodyProps = {
  content?: string;
  contentAreaName: string;
  children?: React.ReactNode;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

/**
 * @internal
 */
export const JshCmsContentAreaBody: React.VFC<JshCmsContentAreaBodyProps> = ({
  content,
  contentAreaName,
  children,
  ...otherProps
}) => {
  const bodyMemo = useMemo(
    () => ({ __html: content || '' }),
    [content]
  );

  if (children){
    return <div {...otherProps} cms-content-editor={`page.content.${contentAreaName}`} contentEditable='true'>{ children }</div>;
  } else {
    return <div {...otherProps} cms-content-editor={`page.content.${contentAreaName}`} contentEditable='true' dangerouslySetInnerHTML={bodyMemo} />;
  }
};
