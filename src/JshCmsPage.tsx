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

import { Metadata, ResolvingMetadata } from 'next'
import Script from 'next/script'
import React from 'react'
import { fetchCached } from './JshCmsFetch';
import { useJshCms } from './JshCmsContext';

/**
 * @public
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface JshCmsPage {
  content: { [areaId: string]: string };
  css: string;
  /** If page was opened from a CMS Editor in config.cmsServerUrls, the HTML script to launch the Editor */
  editorScriptPath: string | null;
  footer: string;
  header: string;
  /** Whether the page was opened from the CMS Editor */
  isInEditor: boolean;
  js: string;
  page_template_id: string;
  properties: { [propName: string]: any };
  seo: {
    canonical_url: string;
    keywords: string;
    metadesc: string;
    /** Title for HEAD */
    title: string;
  };
  /** Title for Page Body Content */
  title: string;
  /** Whether the page was Not Found (page data will return empty) */
  notFound: boolean;
}
/* eslint-enable @typescript-eslint/naming-convention */
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * @public
 */
export class JshCmsPage implements JshCmsPage {

  /**
   * getEmptyPage - An empty JshCmsPage object, for blank editors or initializing useState
   * @param pageTemplateId - page template id for newly created pages
   * @public
   */
  /* eslint-disable @typescript-eslint/naming-convention */
  public static getEmptyPage(pageTemplateId: string): JshCmsPage {
    return {
      content: {
        body: ''
      },
      css: '',
      editorScriptPath: null,
      footer: '',
      header: '',
      isInEditor: false,
      js: '',
      notFound: false,
      page_template_id: pageTemplateId,
      properties: {},
      seo: {
        canonical_url: '',
        keywords: '',
        metadesc: '',
        title: ''
      },
      title: ''
    };
  }
  /* eslint-enable @typescript-eslint/naming-convention */

  /**
   * getNotFoundPage - An empty JshCmsPage object, with the notFound flag set
   * @param pageTemplateId - page template id for newly created pages
   * @public
   */
  public static getNotFoundPage(pageTemplateId: string): JshCmsPage {
    const blank = JshCmsPage.getEmptyPage(pageTemplateId);
    blank.notFound = true;
    return blank;
  }

  /**
   * getPage - Get CMS Page Data
   * @param pathname - Root-relative Page URL
   * @param params - Page load parameters
   * @param config - Configuration parameters
   * @public
   */
  public static async getPage(pathname: string[] | string | undefined, params: { [key: string]: string[] | string | undefined }, config: JshCmsPageRequest): Promise<JshCmsPage> {
    let pageTemplateId = '';
    if (typeof params?.page_template_id === 'string') {pageTemplateId = (params?.page_template_id);}
    if (params?.jshcms_token && params?.jshcms_url) {
      const jshCmsPage = JshCmsPage.getEmptyPage(pageTemplateId);
      const jshcmsUrl: string = (params.jshcms_url || '').toString();
      jshCmsPage.isInEditor = true;
      jshCmsPage.editorScriptPath = JshCmsPage.getEditorScriptPath(jshcmsUrl, config.cmsServerUrls);
      return jshCmsPage;
    }
    if (!pathname) {pathname = '';}
    if (Array.isArray(pathname)) {pathname = pathname.join('/');}
    const variations = JshCmsPage.resolvePath(config.contentUrl, pathname, config.defaultDocument);
    for (const variation of variations) {
      const url = new URL(variation, config.contentUrl);
      const pageResponse = await fetchCached(url, config.cacheDuration); // next fetch is cached, so this can be shared between metadata and content
      if (pageResponse.ok) {
        if (!pageResponse.json) {return JshCmsPage.getEmptyPage(pageTemplateId);}
        try {
          return (pageResponse.json as JshCmsPage);
        } catch (ex){
          return JshCmsPage.getEmptyPage(pageTemplateId);
        }
      }
    }

    return JshCmsPage.getNotFoundPage(pageTemplateId);
  }

  /**
   * getMetadata - provides a basic version of a Next.js metadata function that provides CMS SEO data.
   *
   * @remarks
   * If you application has additional metadata needs, you may wish to copy this function into your generateMetadata function.
   * {@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata}
   *
   * @param props - params from the incoming request
   * @param parent - metadata from previous functions
   * @param config - CMS configuration parameters
   * @public
   */
  public static async getMetadata(
    { params }: JshCmsMetadataProps, // eslint-disable-line @typescript-eslint/no-unused-vars
    parent: ResolvingMetadata,
    config: JshCmsPageRequest
  ): Promise<Metadata> {
    const jshCmsPage = await JshCmsPage.getPage(params.url, params, config);
    const pageMeta: Metadata = {};
    if (jshCmsPage.seo.title) {pageMeta.title = jshCmsPage.seo.title;}
    if (jshCmsPage.seo.keywords) {pageMeta.keywords = jshCmsPage.seo.keywords;}
    if (jshCmsPage.seo.metadesc) {pageMeta.description = jshCmsPage.seo.metadesc;}
    if (jshCmsPage.seo.canonical_url) {pageMeta.alternates = { canonical: jshCmsPage.seo.canonical_url };}
    return pageMeta;
  }

  /**
   * getEditorScriptPath - Generate script for CMS Editor
   * @remarks
   * - The provided url is validated against cmsServerUrls
   * - If the CMS Server is not found in cmsServerUrls, an empty element will be returned
   *
   * @param cmsServerUrl - URL from jshcms_url parameter
   * @param cmsServerUrls - list of allowed CMS editor servers
   * @returns path to the editor script
   *
   * @public
   */
  public static getEditorScriptPath(cmsServerUrl: string, cmsServerUrls: string[]): string | null {
    //Validate URL
    let foundMatch = false;
    const curUrl = new URL(cmsServerUrl);
    for (let i=0; i<cmsServerUrls.length; i++){
      const testUrl = (cmsServerUrls[i]||'').toString();
      if (!testUrl) {continue;}
      if (testUrl==='*'){ foundMatch = true; break; }
      try {
        const parsedUrl = new URL(testUrl);
        const strEqual = function(a: string | undefined, b: string | undefined){ return (a||'').toString().toLowerCase() === (b||'').toString().toLowerCase(); }
        const strPortEqual = function(a: string | undefined, b: string | undefined, protocolA: string, protocolB: string){
          if (!a && (protocolA==='https:')) {a = '443';}
          if (!b && (protocolB==='https:')) {b = '443';}
          if (!a && (protocolA==='http:')) {a = '80';}
          if (!b && (protocolB==='http:')) {b = '80';}
          return strEqual(a, b);
        }
        if (parsedUrl.protocol && !strEqual(curUrl.protocol, parsedUrl.protocol)) {continue;}
        if (!strEqual(curUrl.hostname, parsedUrl.hostname)) {continue;}
        if (!strPortEqual(curUrl.port, parsedUrl.port, curUrl.protocol, parsedUrl.protocol||curUrl.protocol)) {continue;}
        const parsedPath = parsedUrl.pathname || '/';
        const curPath = curUrl.pathname || '/';
        if (curPath.indexOf(parsedPath)===0){ foundMatch = true; break; }
      } catch (ex){
        // eslint-dsisable-line: no-empty
      }
    }
    if (!foundMatch) {return null;}
    return encodeURI(joinUrlPath(cmsServerUrl, 'js/jsHarmonyCMS.js'))
  }

  /**
   * getStandalonePage [Main Entry Point] - Get CMS Page Data for Standalone Integration
   * @remarks
   * if page is opened from CMS Editor or Not Found, an empty JshCmsPage Object will be returned
   *
   * @param pathname - Root relative path being requested
   * @param params - Request url parameters
   * @param config - CMS Configuration parameters
   * @returns JshCmsPage Object, with set properties: isInEditor, editorScriptPath, notFound
   * @public
   */
  public static async getStandalonePage(pathname: string[] | string | undefined, params: { [key: string]: string[] | string | undefined }, config: JshCmsPageRequest) {
    if (!pathname) {pathname = '';}
    if (Array.isArray(pathname)) {pathname = pathname.join('/');}
    pathname = new URL(pathname, 'https://localhost').pathname;
    return await JshCmsPage.getPage(pathname, params, config);
  }

  /**
   * getPath - Transform a page url into cms content file path
   * @param contentUrl - CMS content export folder
   * @param pathname - Root relative path being requested
   * @returns normalized path
   * @public
   */
  public static getPath(contentUrl: string, pathname: string): string {
    if (!pathname) {pathname = '';}
    //If URL is not absolute, add starting "/"
    if (pathname.indexOf('//')<0){
      if (pathname.indexOf('/') !== 0){
        if (pathname.indexOf('\\')===0) {pathname = pathname.substr(1);}
        pathname = `/${  pathname}`;
      }
    }

    return joinUrlPath(contentUrl, pathname);
  }

  /**
   * getPathVariations - creations variations of a cms content path to try, e.g. as provided and with index.html
   * @param pathname - Root relative path being requested
   * @param defaultDocument - default document if not in url, e.g. 'index.html'
   * @returns list of paths to try
   * @public
   */
  public static getPathVariations(pathname: string, defaultDocument: string): string[] {
    //Add trailing slash and "/index.html", if applicable
    if (pathname && ((pathname[pathname.length-1]==='/')||(pathname[pathname.length-1]==='\\'))){
      return [pathname, joinUrlPath(pathname, defaultDocument)];
    } else {
      const urlExt = getExtension(pathname);
      const defaultExt = getExtension(defaultDocument);
      if (urlExt && defaultExt && (urlExt === defaultExt)) {return [pathname];} else {
        if (urlExt && (urlExt[0]==='.') && (urlExt.length < 5)) {return [pathname, joinUrlPath(pathname, defaultDocument)];}
        return [`${pathname}/`, pathname, joinUrlPath(pathname, defaultDocument)];
      }
    }
  }

  /**
   * resolvePath - Convert URL to CMS Content Paths
   * @param contentUrl - CMS content URL
   * @param pathname - Root relative path being requested
   * @param defaultDocument - default document if not in url, e.g. 'index.html'
   * @returns list of paths to try
   * @public
   */
  public static resolvePath(contentUrl: string, pathname: string, defaultDocument: string): string[] {
    pathname = JshCmsPage.getPath(contentUrl, pathname);

    return JshCmsPage.getPathVariations(pathname, defaultDocument);
  }
}

/**
 * @public
 */
export interface JshCmsPageRequest {
  /** CMS content URL */
  contentUrl: string,
  /** default document if not in url, e.g. 'index.html' */
  defaultDocument: string,
  /** valid CMS server URLs */
  cmsServerUrls: string[],
  /** cache duration in seconds */
  cacheDuration: number,
}

/**
 * @public
 */
export interface JshCmsMetadataProps {
  params: { [key: string]: string[] | string | undefined }
}

/**
 * @public
 */
export interface JshCmsElementProps {
  jshCmsPage?: JshCmsPage;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

//================
//Tag Helpers
//================

/**
 * JshCmsStyle - render additional css (if any) as a style tag
 * @remarks
 * Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
 * Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.
 *
 * @example
 * ```
 * <JshCmsStyle jshCmsPage={jshCmsPage} />
 * ```
 * @public
 */
export function JshCmsStyle(props: JshCmsElementProps) {
  const { jshCmsPage: contextJshCmsPage } = useJshCms();
  const { jshCmsPage: propJshCmsPage, ...otherProps } = props;
  const jshCmsPage = propJshCmsPage ?? contextJshCmsPage;
  if (jshCmsPage?.css) {
    return (
      <style {...otherProps} type='text/css' dangerouslySetInnerHTML={{ __html: jshCmsPage.css || '' }}></style>
    );
  } else {return <></>;}
}

/**
 * JshCmsScript - render additional javascript (if any) as a script tag
 * @remarks
 * Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
 * Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.
 *
 * @example
 * ```
 * <JshCmsScript jshCmsPage={jshCmsPage} />
 * ```
 * @public
 */
export function JshCmsScript(props: JshCmsElementProps) {
  const { jshCmsPage: contextJshCmsPage } = useJshCms();
  const { jshCmsPage: propJshCmsPage, ...otherProps } = props;
  const jshCmsPage = propJshCmsPage ?? contextJshCmsPage;
  if (jshCmsPage?.js) {
    return (
      <Script {...otherProps} type='text/javascript' dangerouslySetInnerHTML={{ __html: jshCmsPage.js || '' }}></Script>
    );
  } else {return <></>;}
}

/**
 * JshCmsHead - render additional head tags (if any). Note that this feature in particular is questionable with the Next.js head management, and since raw text must have a container, it is rendered in a div.
 * @remarks
 * Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
 * Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.
 *
 * @example
 * ```
 * <JshCmsHead jshCmsPage={jshCmsPage} />
 * ```
 * @public
 */
export function JshCmsHead(props: JshCmsElementProps) {
  const { jshCmsPage: contextJshCmsPage } = useJshCms();
  const { jshCmsPage: propJshCmsPage, ...otherProps } = props;
  const jshCmsPage = propJshCmsPage ?? contextJshCmsPage;
  if (jshCmsPage?.header) {
    return (
      <div {...otherProps} dangerouslySetInnerHTML={{ __html: jshCmsPage.header || '' }}></div>
    );
  } else {return <></>;}
}

/**
 * JshCsFooter - render additional footer tags (if any).
 * @remarks
 * Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
 *
 * @example
 * ```
 * <JshCmsFooter jshCmsPage={jshCmsPage} />
 * ```
 * @public
 */
export function JshCmsFooter(props: JshCmsElementProps) {
  const { jshCmsPage: contextJshCmsPage } = useJshCms();
  const { jshCmsPage: propJshCmsPage, ...otherProps } = props;
  const jshCmsPage = propJshCmsPage ?? contextJshCmsPage;
  if (jshCmsPage?.footer) {
    return (
      <div {...otherProps} dangerouslySetInnerHTML={{ __html: jshCmsPage.footer || '' }}></div>
    );
  } else {return <></>;}
}

/**
 * JshCmsPageConfig - render config settings as a script tag
 * @remarks
 * Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
 * Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.
 *
 * @example
 * ```
<JshCmsPageConfig cms-template="Two Column Page Template" config={{
  "content_elements": {
    "left": { "title": "Left" },
    "right": { "title": "Right" }
    }
  }} />
 * ```
 * @public
 */
export function JshCmsPageConfig(props: JshCmsPageConfigProps) {
  if (props?.config) {
    const { config, ...otherProps } = props;
    return (
      <script {...otherProps} type='text/cms-page-config' dangerouslySetInnerHTML={{ __html: JSON.stringify(config) }}></script>
    );
  } else {return undefined;}
}


/* eslint-disable @typescript-eslint/naming-convention */
/**
 * @public
 */
export interface JshCmsPageConfigDefinition {
  title?: string;
  /**
   * Each editable content area has one entry in
   * content_elements. If no content areas are defined,
   * a default content area named "body" will be added.
   */
  content_elements?: {
    [content_area_name: string]: {
      title?: string;
      editor_toolbar?: {
        /** Dock position for the Editor Menu and Toolbar. Defaults to 'auto'. */
        dock?: 'auto' | 'bottom' | 'top_offset' | 'top';
        /** Whether to display the editor menu. Defaults to true. */
        show_menu?: boolean;
        /** Whether to display the editor toolbar. Defaults to true. */
        show_toolbar?: boolean;
      };
      /** Editable area type. Defaults to 'htmleditor' */
      type?: 'htmleditor' | 'text';
    }
  };
  /**
   * Default value for each content area.  If omitted,
   * the HTML content will be used.
   */
  default_content?: { [content_area_name: string]: string };
  /** Page Properties fields */
  properties?: {
    fields: unknown[];
  };
  options?: {
    /**  If set to false, no cms-title element required on the page. Defaults to true. */
    title_element_required?: boolean;
    /** Page toolbar dock position. Defaults to 'top_offset'. */
    dock?: 'bottom' | 'top_offset' | 'top';
  };
  /** SYSTEM - Hard-coded content element content. */
  content?: {
    [content_area_name: string]: string | {
      title?: string;
    };
  };
}
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * @public
 */
export interface JshCmsPageConfigProps {
  config?: JshCmsPageConfigDefinition;
}

/**
 * JshCmsEditor - render editor support script when page is loaded in the CMS editor.
 * @remarks
 * Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
 * Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.
 *
 * @example
 * ```
 * <JshCmsEditor jshCmsPage={jshCmsPage} />
 * ```
 * @public
 */
export function JshCmsEditor(props: JshCmsElementProps) {
  const { jshCmsPage: contextJshCmsPage } = useJshCms();
  const { jshCmsPage: propJshCmsPage, ...otherProps } = props;
  const jshCmsPage = propJshCmsPage ?? contextJshCmsPage;
  if (jshCmsPage?.editorScriptPath) {
    return <Script {...otherProps} className='removeOnPublish' strategy='beforeInteractive' src={jshCmsPage.editorScriptPath||undefined}></Script>
  } else {return <></>;}
}

//==================
// Utility Functions
//==================

function getExtension(path: string): string {
  if (!path) {return '';}
  let lastSlash = 0;
  for (let i=path.length-1; i>=0; i--){
    if ((path[i]==='/')||(path[i]==='\\')){ lastSlash = i+1; break; }
  }
  path = path.substr(lastSlash);
  if (!path) {return '';}
  const lastDot = path.lastIndexOf('.');
  if (lastDot >= 0) {path = path.substr(lastDot);}
  return path;
}

function joinUrlPath(a: string | undefined, b: string | undefined){
  if (!a) {return b||'';}
  if (!b) {return a||'';}
  let aEnd = a[a.length-1];
  let bStart = b[0];
  while (a.length && ((aEnd==='/')||(aEnd==='\\'))){ a = a.substr(0, a.length-1); if (a.length) {aEnd=a[a.length-1];} }
  while (b.length && ((bStart==='/')||(bStart==='\\'))){ b = b.substr(1); if (b.length) {bStart=b[0];} }
  return `${a  }/${  b}`;
}
