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

import React from 'react';
import { JshCmsProvider } from './JshCmsContext';
import { JshCmsPage, JshCmsStyle, JshCmsScript, JshCmsHead, JshCmsEditor, JshCmsFooter } from './JshCmsPage';
import { JshCmsConfig } from './JshCmsRouter';
import Head from 'next/head';

/**
 * @public
 */
export interface JshCmsProps {
  jshCmsConfig: JshCmsConfig;
  jshCmsPage?: JshCmsPage;
  children?: React.ReactNode;
}

/**
 * JshCms - renders head, editor, script, style, footer tags, and a container for JshCmsContentArea tags
 * @remarks
 *
 * @example
 * ```
 * <JshCms jshCmsPage={jshCmsPage} jshCmsConfig={JshCmsConfig}>
 *   <h1 cms-title="true">{jshCmsPage.title||'Title'}</h1>
 *   <JshCmsContentArea cms-content="body">Page Content</JshCmsContentArea>
 * </JshCms>
 * ```
 * @public
 */
export function JshCms(props: JshCmsProps) {
  const { jshCmsConfig, jshCmsPage, children } = props;
  return (
    <JshCmsProvider jshCmsConfig={jshCmsConfig} jshCmsPage={jshCmsPage}>
      <JshCmsStyle />
      <JshCmsScript />
      <JshCmsHead />
      <JshCmsEditor />
      <Head>
        {jshCmsPage?.seo.title && <title>{jshCmsPage.seo.title}</title>}
        {jshCmsPage?.seo.metadesc && <meta name='description' content={jshCmsPage.seo.metadesc} key='metadesc' />}
        {jshCmsPage?.seo.keywords && <meta name='keywords' content={jshCmsPage.seo.keywords} key='keywords' />}
        {jshCmsPage?.seo.canonical_url && <link rel='canonical' href={jshCmsPage.seo.canonical_url} key='canonical_url' />}
      </Head>
      { children }
      <JshCmsFooter />
    </JshCmsProvider>
  );
}
