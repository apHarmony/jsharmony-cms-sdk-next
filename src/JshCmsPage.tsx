
import { Metadata, ResolvingMetadata } from 'next'
import Script from 'next/script'
import React from 'react'

/**
 * @public
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface JshCmsPage {
  content: { [areaId: string]: string };
  css: string;
  /** If page was opened from a CMS Editor in config.cms_server_urls, the HTML script to launch the Editor */
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
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * getJshCmsPageEmpty - An empty JshCmsPage object, for blank editors or initializing useState
 * @param pageTemplateId - page template id for newly created pages
 * @public
 */
export function getJshCmsPageEmpty(pageTemplateId: string): JshCmsPage {
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

/**
 * getJshCmsPageNotFound - An empty JshCmsPage object, with the notFound flag set
 * @param pageTemplateId - page template id for newly created pages
 * @public
 */
export function getJshCmsPageNotFound(pageTemplateId: string): JshCmsPage {
  const blank = getJshCmsPageEmpty(pageTemplateId);
  blank.notFound = true;
  return blank;
}

/**
 * @public
 */
export interface JshCmsPageRequest {
  /** CMS content export folder */
  content_path: string,
  /** CMS content origin server */
  content_url: string | undefined,
  /** default document if not in url, e.g. 'index.html' */
  default_document: string,
}
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * getJshCmsPage - Get CMS Page Data
 * @param pathname - Root-relative Page URL
 * @param pageTemplateId - Page template for new pages
 * @param config - Configuration parameters
 * @public
 */
export async function getJshCmsPage(pathname: string[] | string | undefined, pageTemplateId: string[] | string | undefined, config: JshCmsPageRequest): Promise<JshCmsPage> {
  if (typeof(pageTemplateId) !== 'string') {pageTemplateId = '';}
  if (typeof(pathname) !== 'string') {return getJshCmsPageEmpty(pageTemplateId);}
  const variations = resolveJshCmsPath(config.content_path, pathname, config.default_document);
  for (const variation of variations) {
    const url = new URL(variation, config.content_url);
    const pageResponse = await fetch(url); // next fetch is cached, so this can be shared between metadata and content
    if (pageResponse.ok) {
      const page = (await pageResponse.json() as JshCmsPage);
      return page;
    }
  }

  return getJshCmsPageNotFound(pageTemplateId);
}

/**
 * @public
 */
export interface JshCmsProps {
  params: { id: string }
  searchParams: { [key: string]: string[] | string | undefined }
}

/**
 * getJshCmsMetadata - provides a basic version of a Next.js metadata function that provides CMS SEO data.
 *
 * @remarks
 * If you application has additional metadata needs, you may wish to copy this function into your generateMetadata function.
 * {@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata}
 *
 * @param props - params and searchParams from the incoming request
 * @param parent - metadata from previous functions
 * @param config - CMS configuration parameters
 * @public
 */
export async function getJshCmsMetadata(
  { params, searchParams }: JshCmsProps, // eslint-disable-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata,
  config: JshCmsPageRequest
): Promise<Metadata> {
  const cmsPage = await getJshCmsPage(searchParams.url, searchParams.page_template_id, config);
  const pageMeta: Metadata = {};
  if (cmsPage.seo.title) {pageMeta.title = cmsPage.seo.title;}
  if (cmsPage.seo.keywords) {pageMeta.keywords = cmsPage.seo.keywords;}
  if (cmsPage.seo.metadesc) {pageMeta.description = cmsPage.seo.metadesc;}
  if (cmsPage.seo.canonical_url) {pageMeta.alternates = { canonical: cmsPage.seo.canonical_url };}
  return pageMeta;
}

/**
 * @public
 */
export interface JshCmsPropsWithPage {
  page: JshCmsPage;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * @public
 */
export interface JshCmsPropsWithPageAndContent {
  page: JshCmsPage;
  ['cms-content']: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

//================
//Tag Helpers
//================

/**
 * JshCmsContentArea - render simple content area.
 * @remarks
 * Simple React function component for including editable content area. This produces a div, but it can be trivially replaced with custom code.
 *
 * @example
 * ```
 * <JshCmsContentArea cms-content="body" page={cmsPage}>
 *   Optional Default Body Content
 * </JshCmsContentArea>
 * ```
 * @public
 */
export function JshCmsContentArea(props: JshCmsPropsWithPageAndContent) {
  const { children, page, ['cms-content']: content = 'body', ...otherProps } = props;
  if (page.content[content]) {
    return <div {...otherProps} cms-content-editor={`page.content.${content}`} dangerouslySetInnerHTML={{ __html: page.content[content] }}></div>;
  } else {
    return <div {...otherProps} cms-content-editor={`page.content.${content}`} >{children}</div>;
  }
}

/**
 * JshCmsStyle - render additional css (if any) as a style tag
 * @remarks
 * Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
 * Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.
 *
 * @example
 * ```
 * <JshCmsStyle page={cmsPage} />
 * ```
 * @public
 */
export function JshCmsStyle(props: JshCmsPropsWithPage) {
  if (props?.page.css) {
    const { page, ...otherProps } = props;
    return (
      <style {...otherProps} type='text/css' dangerouslySetInnerHTML={{ __html: page.css || '' }}></style>
    );
  } else {return undefined;}
}

/**
 * JshCmsScript - render additional javascript (if any) as a script tag
 * @remarks
 * Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
 * Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.
 *
 * @example
 * ```
 * <JshCmsScript page={cmsPage} />
 * ```
 * @public
 */
export function JshCmsScript(props: JshCmsPropsWithPage) {
  if (props?.page.js) {
    const { page, ...otherProps } = props;
    return (
      <Script {...otherProps} type='text/javascript' dangerouslySetInnerHTML={{ __html: page.js || '' }}></Script>
    );
  } else {return undefined;}
}

/**
 * JshCmsHead - render additional head tags (if any). Note that this feature in particular is questionable with the Next.js head management, and since raw text must have a container, it is rendered in a div.
 * @remarks
 * Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
 * Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.
 *
 * @example
 * ```
 * <JshCmsHead page={cmsPage} />
 * ```
 * @public
 */
export function JshCmsHead(props: JshCmsPropsWithPage) {
  if (props?.page.header) {
    const { page, ...otherProps } = props;
    return (
      <div {...otherProps} dangerouslySetInnerHTML={{ __html: page.header || '' }}></div>
    );
  } else {return undefined;}
}

/**
 * JshCsFooter - render additional footer tags (if any).
 * @remarks
 * Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
 *
 * @example
 * ```
 * <JshCmsFooter page={cmsPage} />
 * ```
 * @public
 */
export function JshCmsFooter(props: JshCmsPropsWithPage) {
  if (props?.page.footer) {
    const { page, ...otherProps } = props;
    return (
      <div {...otherProps} dangerouslySetInnerHTML={{ __html: page.footer || '' }}></div>
    );
  } else {return undefined;}
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
  content?: { [content_area_name: string]: string };
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
 * <JshCmsEditor page={cmsPage} />
 * ```
 * @public
 */
export function JshCmsEditor(props: JshCmsPropsWithPage) {
  if (props?.page.editorScriptPath) {
    const { page, ...otherProps } = props;
    return <Script {...otherProps} className='removeOnPublish' src={page.editorScriptPath||undefined}></Script>
  } else {return undefined;}
}

/**
 * getJshCmsEditorScriptPath - Generate script for CMS Editor
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
export function getJshCmsEditorScriptPath(cmsServerUrl: string, cmsServerUrls: string[]): string | null {
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
* @public
*/
/* eslint-disable @typescript-eslint/naming-convention */
export interface JshCmsStandaloneConfig {
  content_path: string,
  content_url: string | undefined,
  default_document: string,
  cms_server_urls: string[],
}
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * getJshCmsStandalone [Main Entry Point] - Get CMS Page Data for Standalone Integration
 * @remarks
 * if page is opened from CMS Editor or Not Found, an empty JshCmsPage Object will be returned
 *
 * @param pathname - Root relative path being requested
 * @param searchParams - Request url parameters
 * @param config - CMS Configuration parameters
 * @returns JshCmsPage Object, with set properties: isInEditor, editorScriptPath, notFound
 * @public
 */
export async function getJshCmsStandalone(pathname: string[] | string | undefined, searchParams: { [key: string]: string[] | string | undefined }, config: JshCmsStandaloneConfig) {
  const cmsPage = await getJshCmsPage(pathname, searchParams.page_template_id, config);
  if (searchParams?.jshcms_token && searchParams?.jshcms_url) {
    const jshcmsUrl: string = (searchParams.jshcms_url || '').toString();
    cmsPage.isInEditor = true;
    cmsPage.editorScriptPath = getJshCmsEditorScriptPath(jshcmsUrl, config.cms_server_urls);
  }
  return cmsPage;
}

/**
 * getJshCmsPath - Transform a page url into cms content file path
 * @param contentPath - CMS content export folder
 * @param pathname - Root relative path being requested
 * @returns normalized path
 * @public
 */
export function getJshCmsPath(contentPath: string, pathname: string): string {
  if (!pathname) {pathname = '';}
  //If URL is not absolute, add starting "/"
  if (pathname.indexOf('//')<0){
    if (pathname.indexOf('/') !== 0){
      if (pathname.indexOf('\\')===0) {pathname = pathname.substr(1);}
      pathname = `/${  pathname}`;
    }
  }

  return joinUrlPath(contentPath, pathname);
}

/**
 * getJshCmsPathVariations - creations variations of a cms content path to try, e.g. as provided and with index.html
 * @param pathname - Root relative path being requested
 * @param defaultDocument - default document if not in url, e.g. 'index.html'
 * @returns list of paths to try
 * @public
 */
export function getJshCmsPathVariations(pathname: string, defaultDocument: string): string[] {
  //Add trailing slash and "/index.html", if applicable
  if (pathname && ((pathname[pathname.length-1]==='/')||(pathname[pathname.length-1]==='\\'))){
    return [pathname, joinUrlPath(pathname, defaultDocument)];
  } else {
    const urlExt = getExtension(pathname);
    const defaultExt = getExtension(defaultDocument);
    if (urlExt && defaultExt && (urlExt === defaultExt)) {return [pathname];} else {
      return [pathname, joinUrlPath(pathname, defaultDocument)];
    }
  }
}

/**
 * resolveJshCmsPath - Convert URL to CMS Content Paths
 * @param contentPath - CMS content export folder
 * @param pathname - Root relative path being requested
 * @param defaultDocument - default document if not in url, e.g. 'index.html'
 * @returns list of paths to try
 * @public
 */
export function resolveJshCmsPath(contentPath: string, pathname: string, defaultDocument: string): string[] {
  pathname = getJshCmsPath(contentPath, pathname);

  return getJshCmsPathVariations(pathname, defaultDocument);
}

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
