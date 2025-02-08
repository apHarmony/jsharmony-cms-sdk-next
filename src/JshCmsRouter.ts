import { NextResponse, NextRequest } from 'next/server'
import { Metadata, ResolvingMetadata } from 'next'
import { getJshCmsStandalone, getJshCmsMetadata, resolveJshCmsPath, getJshCmsPageEmpty, JshCmsPage, JshCmsProps } from './JshCmsPage';

/**
 * matchJshCmsRedirect - Check if URL matches redirects and return first match
 * @param redirects - Array of CMS Redirects
 * @param urlpath - Target URL path
 * @public
 */
export function matchJshCmsRedirect(redirects: JshCmsRedirect[], urlpath: string): JshCmsRoute | undefined {
  if (!urlpath || (urlpath[0] !== '/')) {urlpath = `/${  urlpath}`;}

  if (redirects?.length){
    for (let i=0; i<redirects.length; i++){
      const redirect = redirects[i];
      if (!redirect) {continue;}
      const cmpurlpath = (redirect.redirect_url||'').toString();
      let desturl = (redirect.redirect_dest||'').toString();
      if (redirect.redirect_url_type==='EXACT'){
        if (urlpath !== cmpurlpath) {continue;}
      } else if (redirect.redirect_url_type==='EXACTICASE'){
        if (urlpath.toLowerCase() !== cmpurlpath.toLowerCase()) {continue;}
      } else if (redirect.redirect_url_type==='BEGINS'){
        if (!urlpath.startsWith(cmpurlpath)) {continue;}
      } else if (redirect.redirect_url_type==='BEGINSICASE'){
        if (!urlpath.toLowerCase().startsWith(cmpurlpath.toLowerCase())) {continue;}
      } else if ((redirect.redirect_url_type==='REGEX')||(redirect.redirect_url_type==='REGEXICASE')){
        const rxMatch = urlpath.match(new RegExp(cmpurlpath, ((redirect.redirect_url_type==='REGEXICASE')?'i':'')));
        if (!rxMatch) {continue;}
        for (let j=rxMatch.length; j>=1; j--){
          desturl = replaceAll(desturl, `$${j.toString()}`, rxMatch[j]);
        }
      }
      return {
        http_code: redirect.redirect_http_code, // eslint-disable-line @typescript-eslint/naming-convention
        url: desturl
      };
    }
  }
  return undefined;
}

/**
 * A redirect loaded from the CMS data file
 * @public
 */
/* eslint-disable @typescript-eslint/naming-convention */
export interface JshCmsRedirect {
  redirect_key: number,
  redirect_url: string,
  /** 'BEGINS'|'BEGINSICASE'|'EXACT'|'EXACTICASE'|'REGEX'|'REGEXICASE' */
  redirect_url_type: string,
  redirect_dest: string,
  /** '301'|'302'|'PASSTHRU' */
  redirect_http_code: string,
}

/**
 * Resolved redirect result
 * @public
 */
export interface JshCmsRoute {
  /** '301'|'302'|'PASSTHRU' */
  http_code: string,
  url: string,
}
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * hasJshCmsPage - Check if a page object file exists to decide if a route is available.
 * @param pathname - target url path name
 * @param contentUrl - Origin url for CMS files
 * @param contentPath - Path to CMS output folder
 * @param defaultDocument - default document if not in url, e.g. 'index.html'
 * @public
 */
export async function hasJshCmsPage(pathname: string, contentUrl: string, contentPath: string, defaultDocument: string): Promise<boolean> {
  const variations = resolveJshCmsPath(contentPath, pathname, defaultDocument);

  for (const path of variations) {
    const url = new URL(path, contentUrl);
    const pageResponse = await fetch(url);
    if (pageResponse.ok) {return true;}
  }

  return false;
}

/**
 * getJshCmsRedirect - Looks up matching redirect, if any.
 * @param pathname - target path
 * @param contentUrl - Origin for exported CMS redirects
 * @param redirectListingPath - Path to exported CMS redirects
 * @returns path and code if found
 * @public
 */
export async function getJshCmsRedirect(pathname: string, contentUrl: string, redirectListingPath: string): Promise<JshCmsRoute | undefined> {
  const redirectData: JshCmsRedirect[] = await loadJshCmsRedirectData(redirectListingPath, contentUrl);

  if (redirectData && redirectData.length > 0) {
    return matchJshCmsRedirect(redirectData, pathname);
  }

  return undefined;
}

/**
 * processJshCmsRoute - Provides simple handling of redirects in Next.js, replace as needed.
 * @param route - Path and code of a found redirect
 * @param requestUrl - Original request url
 * @returns Response, if a valid redirect was provided.
 * @public
 */
export function processJshCmsRoute(route: JshCmsRoute, requestUrl: URL | string | undefined): NextResponse | undefined {
  switch (route.http_code) {
    case '301': return NextResponse.redirect(new URL(route.url, requestUrl), 301);
    case '302': return NextResponse.redirect(new URL(route.url, requestUrl), 302);
    case 'PASSTHRU': return NextResponse.rewrite(new URL(route.url, requestUrl));
    default: return undefined;
  }
}

/**
 * processJshCmsRedirects - Small helper function to look up and execute redirects
 * @param request - Request object providing target path and origin
 * @param contentUrl - origin for redirect file
 * @param redirectListingPath - Path to exported CMS redirects
 * @returns Response, if a redirect was found
 * @public
 */
export async function processJshCmsRedirects(request: NextRequest, contentUrl: string, redirectListingPath: string): Promise<NextResponse | undefined> {
  const route = await getJshCmsRedirect(request.nextUrl.pathname, contentUrl, redirectListingPath);
  if (route) {return processJshCmsRoute(route, request.url);}

  return undefined;
}

/**
 * loadJshCmsRedirectData - Load and parse the redirects file
 * @param redirectListingPath - Path to exported CMS redirects
 * @returns List of redirects
 * @public
 */
export async function loadJshCmsRedirectData(redirectListingPath: string, origin: string): Promise<JshCmsRedirect[]> {
  const url = new URL(redirectListingPath, origin);

  const response = await fetch(url);
  if (response.ok) {
    return await (response.json() as Promise<JshCmsRedirect[]>) || [];
  }

  return [];
}

/**
 * @public
 */
/* eslint-disable @typescript-eslint/naming-convention */
export interface JshCmsConfig {
  /** File path to published CMS content files */
  content_path?: string,
  /** Url of the server hosting content_path, usually the same server. */
  content_url?: string,
  /** Path to redirect listing JSON file (relative to content_path) */
  redirect_listing_path?: string | null,
  /** Default Directory Document (e.g. index.html) */
  default_document?: string,
  /** The CMS Server URLs that will be enabled for Page Editing (set to '*' to enable any remote CMS)
   * - Used by page.editorScriptPath, and the getJshCmsEditorScriptPath function
   * - NOT used by jsHarmonyCmsEditor.js - the launcher instead uses access_keys for validating the remote CMS
   */
  cms_server_urls: string[],
}

/**
 * @public
 */
export interface JshCmsRouter {
  /** File path to published CMS content files */
  content_path: string,
  /** Url of the server hosting content_path, usually the same server. */
  content_url: string,
  /** Path to redirect listing JSON file (relative to content_path) */
  redirect_listing_path: string | null,
  /** The CMS Server URLs that will be enabled for Page Editing (set to '*' to enable any remote CMS)
   * - Used by page.editorScriptPath, and the getJshCmsEditorScriptPath function
   * - NOT used by jsHarmonyCmsEditor.js - the launcher instead uses access_keys for validating the remote CMS
   */
  cms_server_urls: string[],
  /** Default Directory Document (e.g. index.html) */
  default_document: string,
  /* eslint-enable @typescript-eslint/naming-convention */
  /** getJshCmsRedirectListingPath - Get the configured path for the redirect listing file */
  getJshCmsRedirectListingPath(): string | undefined,
  /**
   * getJshCmsRedirectData - Get CMS Redirect Data
   * @param origin - http origin
   * @returns Redirects
   */
  getJshCmsRedirectData(origin: string): Promise<JshCmsRedirect[]>,
  /**
   * getJshCmsRedirect - Lookup the redirect for a request, if any
   * @param request - Request object providing target path and origin
   * @returns Appropriate redirect, if one was found
   */
  getJshCmsRedirect(request: NextRequest): Promise<JshCmsRoute | undefined>,
  /**
   *processJshCmsRedirects - Execute the redirect for a request, if any
   * @param request - Request object providing target path and origin
   * @returns Appropriate response, if one was found
   */
  processJshCmsRedirects(request: NextRequest): Promise<NextResponse | undefined>,
  /**
   *hasJshCmsPage - Check if a page object file exists to decide if a route is available.
   * @param pathname - target path
   */
  hasJshCmsPage(pathname: string): Promise<boolean>,
  /**
   *getJshCmsStandalone [Main Entry Point] - Get CMS Page Data for Standalone Integration
   * @remarks
   * if page is opened from CMS Editor or Not Found, an empty Page Object will be returned
   *
   * @param pathname - Root relative path being requested
   * @param searchParams - Request url parameters
   * @returns Page Object, with filled properties: isInEditor, editorScriptPath, notFound
   */
  getJshCmsStandalone(pathname: string[] | string | undefined, searchParams: { [key: string]: string[] | string | undefined }): Promise<JshCmsPage>,
  /**
   * getJshCmsPageEmpty - An empty Page object, for blank editors or initializing useState
   * @param pageTemplateId - page template id for newly created pages
   */
  getJshCmsPageEmpty(pageTemplateId: string): JshCmsPage,
  /**
   * getJshCmsMetadata - provides a basic version of a Next.js metadata function that provides CMS SEO data.
   * @remarks
   * If you application has additional metadata needs, you may wish to copy the base function into your generateMetadata function.
   * {@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata}
   */
  getJshCmsMetadata(
    { params, searchParams }: JshCmsProps,
    parent: ResolvingMetadata
  ): Promise<Metadata>,
}

/**
 * @public
 */
export function JshCmsRouter(this: JshCmsRouter, config: JshCmsConfig): JshCmsRouter {
  if (!this) { // eslint-disable-line no-invalid-this
    throw 'Call JshCmsRouter with new';
  }
  const _this = this; // eslint-disable-line no-invalid-this

  //==========
  //Parameters
  //==========
  /* eslint-disable @typescript-eslint/naming-convention */
  config = extend({
    cms_server_urls: [],
    content_path: '.',
    content_url: '',
    default_document: 'index.html',
    redirect_listing_path: null
  }, config) as JshCmsConfig;
  /* eslint-enable @typescript-eslint/naming-convention */

  //=================
  //Private Properties
  //=================
  extend(_this, config);
  if (!_this.content_path) {throw new Error('CMS Configuration Error - content_path parameter is required');}

  //================
  //Public Functions
  //================

  _this.getJshCmsRedirectListingPath = function(): string | undefined {
    const redirectListingPath = _this.redirect_listing_path;
    if (!redirectListingPath) {return;}
    if (redirectListingPath.charAt(0) !== '/'){
      if (_this.content_path.endsWith('/')) {return _this.content_path + redirectListingPath;} else {return `${_this.content_path  }/${  redirectListingPath}`;}
    }
    return redirectListingPath;
  }

  _this.getJshCmsRedirectData = async function(origin: string): Promise<JshCmsRedirect[]> {
    const redirectListingPath = _this.getJshCmsRedirectListingPath();
    if (!redirectListingPath) {return [];}
    return await loadJshCmsRedirectData(redirectListingPath, origin);
  }

  _this.getJshCmsRedirect = async function(request: NextRequest): Promise<JshCmsRoute | undefined> {
    const redirectListingPath = _this.getJshCmsRedirectListingPath();
    if (!redirectListingPath) {return;}
    return await getJshCmsRedirect(request.nextUrl.pathname, this.content_url, redirectListingPath);
  }

  _this.processJshCmsRedirects = async function(request: NextRequest): Promise<NextResponse | undefined> {
    const redirect = await this.getJshCmsRedirect(request);
    if (redirect) {return processJshCmsRoute(redirect, request.url);}

    return undefined;
  }

  _this.hasJshCmsPage = async function(pathname: string) {
    return await hasJshCmsPage(pathname, this.content_url, this.content_path, this.default_document);
  }

  _this.getJshCmsStandalone = async function(pathname: string[] | string | undefined, searchParams: { [key: string]: string[] | string | undefined }) {
    return await getJshCmsStandalone(pathname, searchParams, this);
  }

  _this.getJshCmsPageEmpty = getJshCmsPageEmpty;

  _this.getJshCmsMetadata = async function(
    { params, searchParams }: JshCmsProps,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    return await getJshCmsMetadata({ params, searchParams }, parent, this);
  }

  return _this;
}

/* eslint-disable */
function extend(dst: any, src: any){
  if (src){
    for (const key in src) {dst[key] = src[key];}
  }
  return dst;
}
/* eslint-enable */

function replaceAll(val: string, find: string, replace: string) { return val.split(find).join(replace); }
