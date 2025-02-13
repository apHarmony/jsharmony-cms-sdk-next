import { NextResponse, NextRequest } from 'next/server'
import { Metadata, ResolvingMetadata, GetServerSidePropsResult } from 'next'
import { JshCmsPage, JshCmsProps } from './JshCmsPage';
import { fetchCached } from './JshCmsFetch';

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
   * - Used by page.editorScriptPath, and the getEditorScriptPath function
   * - NOT used by jsHarmonyCmsEditor.js - the launcher instead uses access_keys for validating the remote CMS
   */
  cms_server_urls: string[],
}

/**
 * @public
 */
export class JshCmsRouter {

  /** File path to published CMS content files */
  public content_path: string = '';
  /** Url of the server hosting content_path, usually the same server. */
  public content_url: string = '';
  /** Path to redirect listing JSON file (relative to content_path) */
  public redirect_listing_path: string | null = null;
  /** The CMS Server URLs that will be enabled for Page Editing (set to '*' to enable any remote CMS)
   * - Used by page.editorScriptPath, and the getEditorScriptPath function
   * - NOT used by jsHarmonyCmsEditor.js - the launcher instead uses access_keys for validating the remote CMS
   */
  public cms_server_urls: string[] = [];
  /** Default Directory Document (e.g. index.html) */
  public default_document: string = 'index.html';
  /* eslint-enable @typescript-eslint/naming-convention */

  public constructor(config: JshCmsConfig){
    extend(this, config);
    if (!this.content_path) {throw new Error('CMS Configuration Error - content_path parameter is required');}
  }

  //================
  //Public Functions
  //================

  /** getRedirectListingPath - Get the configured path for the redirect listing file */
  public getRedirectListingPath(): string | undefined {
    const redirectListingPath = this.redirect_listing_path;
    if (!redirectListingPath) {return;}
    if (redirectListingPath.charAt(0) !== '/'){
      if (this.content_path.endsWith('/')) {return this.content_path + redirectListingPath;} else {return `${this.content_path  }/${  redirectListingPath}`;}
    }
    return redirectListingPath;
  }

  /**
   * getRedirectData - Get CMS Redirect Data
   * @param origin - http origin
   * @returns Redirects
   */
  public async getRedirectData(origin: string): Promise<JshCmsRedirect[]> {
    const redirectListingPath = this.getRedirectListingPath();
    if (!redirectListingPath) {return [];}
    return await this.loadRedirectData(redirectListingPath, origin);
  }

  /**
   * getRedirect - Lookup the redirect for a request, if any
   * @param request - Request object providing target path and origin
   * @returns Appropriate redirect, if one was found
   */
  public async getRedirect(request: NextRequest): Promise<JshCmsRoute | undefined> {
    const redirectListingPath = this.getRedirectListingPath();
    if (!redirectListingPath) {return;}
    return await this.getRedirectBase(request.nextUrl.pathname, this.content_url, redirectListingPath);
  }

  /**
   * processJshCmsRedirects - Execute the redirect for a request, if any
   * @param request - Request object providing target path and origin
   * @returns Appropriate response, if one was found
   */
  public async processRedirects(request: NextRequest): Promise<NextResponse | undefined> {
    const redirect = await this.getRedirect(request);
    if (redirect) {return JshCmsRouter.processRoute(redirect, request.url);}

    return undefined;
  }

  /**
   *hasPage - Check if a page object file exists to decide if a route is available.
   * @param pathname - target path
   */
  public async hasPage(pathname: string): Promise<boolean> {
    return await this.hasPageBase(pathname, this.content_url, this.content_path, this.default_document);
  }

  /**
   * getStandalonePage [Main Entry Point] - Get CMS Page Data for Standalone Integration
   * @remarks
   * if page is opened from CMS Editor or Not Found, an empty Page Object will be returned
   *
   * @param pathname - Root relative path being requested
   * @param params - Request url parameters
   * @returns Page Object, with filled properties: isInEditor, editorScriptPath, notFound
   */
  public async getStandalonePage(pathname: string[] | string | undefined, params: { [key: string]: string[] | string | undefined }): Promise<JshCmsPage> {
    return await JshCmsPage.getStandalonePage(pathname, params, this);
  }


  /**
   * getEmptyPage - An empty Page object, for blank editors or initializing useState
   * @param pageTemplateId - page template id for newly created pages
   */
  public getEmptyPage(pageTemplateId: string): JshCmsPage {
    return JshCmsPage.getEmptyPage(pageTemplateId);
  }


  /**
   * getMetadata - provides a basic version of a Next.js metadata function that provides CMS SEO data.
   * @remarks
   * If you application has additional metadata needs, you may wish to copy the base function into your generateMetadata function.
   * {@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata}
   */
  public async getMetadata({ params }: JshCmsProps, parent: ResolvingMetadata): Promise<Metadata> {
    return await JshCmsPage.getMetadata({ params }, parent, this);
  }


  /**
   *serve [Main Entry Point] - Serves CMS content for a target URL
   * @remarks
   * if page is opened from CMS Editor or Not Found, an empty Page Object will be returned
   *
   * @param pathname - Root relative path being requested
   * @param params - Request url parameters
   * @returns Page Object, with filled properties: isInEditor, editorScriptPath, notFound
   */
  public async serve(pathname: string, params: { [key: string]: string[] | string | undefined }): Promise<GetServerSidePropsResult<{ page: JshCmsPage }>> {
    const redirectListingPath = this.getRedirectListingPath();
    if (redirectListingPath){
      const route = await this.getRedirectBase(pathname, this.content_url, redirectListingPath);
      if (route) {
        switch (route.http_code) {
          case '301': return { redirect: { destination: route.url, permanent: true } };
          case '302': return { redirect: { destination: route.url, permanent: false } };
          case 'PASSTHRU': throw new Error('Passthru routes are not supported');
          default: throw new Error('Unsupported route type');
        }
      }
    }
    const cmsPage = await JshCmsPage.getPage(pathname, params, this);
    if (!cmsPage.isInEditor && cmsPage.notFound) { return { notFound: true }; }
    return { props: { page: cmsPage } };
  }

  /**
   * loadRedirectData - Load and parse the redirects file
   * @param redirectListingPath - Path to exported CMS redirects
   * @returns List of redirects
   * @public
   */
  public async loadRedirectData(redirectListingPath: string, origin: string): Promise<JshCmsRedirect[]> {
    const url = new URL(redirectListingPath, origin);

    const response = await fetchCached(url);
    if (response.ok) {
      return response.json as JshCmsRedirect[] || [];
    }

    return [];
  }

  /**
   * processRoute - Provides simple handling of redirects in Next.js, replace as needed.
   * @param route - Path and code of a found redirect
   * @param requestUrl - Original request url
   * @returns Response, if a valid redirect was provided.
   * @public
   */
  public static processRoute(route: JshCmsRoute, requestUrl: URL | string | undefined): NextResponse | undefined {
    switch (route.http_code) {
      case '301': return NextResponse.redirect(new URL(route.url, requestUrl), 301);
      case '302': return NextResponse.redirect(new URL(route.url, requestUrl), 302);
      case 'PASSTHRU': return NextResponse.rewrite(new URL(route.url, requestUrl));
      default: return undefined;
    }
  }

  /**
   * matchRedirect - Check if URL matches redirects and return first match
   * @param redirects - Array of CMS Redirects
   * @param urlpath - Target URL path
   * @public
   */
  public static matchRedirect(redirects: JshCmsRedirect[], urlpath: string): JshCmsRoute | undefined {
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
   * getRedirectBase - Looks up matching redirect, if any.
   * @param pathname - target path
   * @param contentUrl - Origin for exported CMS redirects
   * @param redirectListingPath - Path to exported CMS redirects
   * @returns path and code if found
   */
  private async getRedirectBase(pathname: string, contentUrl: string, redirectListingPath: string): Promise<JshCmsRoute | undefined> {
    const redirectData: JshCmsRedirect[] = await this.loadRedirectData(redirectListingPath, contentUrl);

    if (redirectData && redirectData.length > 0) {
      return JshCmsRouter.matchRedirect(redirectData, pathname);
    }

    return undefined;
  }

  /**
   * hasPageBase - Check if a page object file exists to decide if a route is available.
   * @param pathname - target url path name
   * @param contentUrl - Origin url for CMS files
   * @param contentPath - Path to CMS output folder
   * @param defaultDocument - default document if not in url, e.g. 'index.html'
   */
  private async hasPageBase(pathname: string, contentUrl: string, contentPath: string, defaultDocument: string): Promise<boolean> {
    const variations = JshCmsPage.resolvePath(contentPath, pathname, defaultDocument);

    for (const path of variations) {
      const url = new URL(path, contentUrl);
      const pageResponse = await fetchCached(url);
      if (pageResponse.ok) {return true;}
    }

    return false;
  }
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
