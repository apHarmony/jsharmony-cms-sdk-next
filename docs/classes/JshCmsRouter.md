[jsharmony-cms-sdk-next](../README.md) / JshCmsRouter

# Class: JshCmsRouter

## Table of contents

### Constructors

- [constructor](JshCmsRouter.md#constructor)

### Properties

- [cmsServerUrls](JshCmsRouter.md#cmsserverurls)
- [contentUrl](JshCmsRouter.md#contenturl)
- [defaultDocument](JshCmsRouter.md#defaultdocument)
- [redirectListingPath](JshCmsRouter.md#redirectlistingpath)

### Methods

- [getEmptyPage](JshCmsRouter.md#getemptypage)
- [getMetadata](JshCmsRouter.md#getmetadata)
- [getRedirect](JshCmsRouter.md#getredirect)
- [getRedirectData](JshCmsRouter.md#getredirectdata)
- [getRedirectListingPath](JshCmsRouter.md#getredirectlistingpath)
- [getStandalonePage](JshCmsRouter.md#getstandalonepage)
- [hasPage](JshCmsRouter.md#haspage)
- [loadRedirectData](JshCmsRouter.md#loadredirectdata)
- [processRedirects](JshCmsRouter.md#processredirects)
- [serve](JshCmsRouter.md#serve)
- [matchRedirect](JshCmsRouter.md#matchredirect)
- [processRoute](JshCmsRouter.md#processroute)

## Constructors

### constructor

• **new JshCmsRouter**(`config`): [`JshCmsRouter`](JshCmsRouter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`JshCmsConfig`](../interfaces/JshCmsConfig.md) |

#### Returns

[`JshCmsRouter`](JshCmsRouter.md)

## Properties

### cmsServerUrls

• **cmsServerUrls**: `string`[] = `[]`

The CMS Server URLs that will be enabled for Page Editing (set to '*' to enable any remote CMS)
- Used by jshCmsPage.editorScriptPath, and the getEditorScriptPath function
- NOT used by jsHarmonyCmsEditor.js - the launcher instead uses accessKeys for validating the remote CMS

___

### contentUrl

• **contentUrl**: `string` = `''`

URL to published CMS content files

___

### defaultDocument

• **defaultDocument**: `string` = `'index.html'`

Default Directory Document (e.g. index.html)

___

### redirectListingPath

• **redirectListingPath**: ``null`` \| `string` = `null`

Path to redirect listing JSON file (relative to contentUrl)

## Methods

### getEmptyPage

▸ **getEmptyPage**(`pageTemplateId`): [`JshCmsPage`](JshCmsPage.md)

getEmptyPage - An empty Page object, for blank editors or initializing useState

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageTemplateId` | `string` | page template id for newly created pages |

#### Returns

[`JshCmsPage`](JshCmsPage.md)

___

### getMetadata

▸ **getMetadata**(`«destructured»`, `parent`): `Promise`\<`Metadata`\>

getMetadata - provides a basic version of a Next.js metadata function that provides CMS SEO data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`JshCmsMetadataProps`](../interfaces/JshCmsMetadataProps.md) |
| `parent` | `ResolvingMetadata` |

#### Returns

`Promise`\<`Metadata`\>

**`Remarks`**

If you application has additional metadata needs, you may wish to copy the base function into your generateMetadata function.
[https://nextjs.org/docs/app/api-reference/functions/generate-metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

___

### getRedirect

▸ **getRedirect**(`request`): `Promise`\<`undefined` \| [`JshCmsRoute`](../interfaces/JshCmsRoute.md)\>

getRedirect - Lookup the redirect for a request, if any

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `NextRequest` | Request object providing target path and origin |

#### Returns

`Promise`\<`undefined` \| [`JshCmsRoute`](../interfaces/JshCmsRoute.md)\>

Appropriate redirect, if one was found

___

### getRedirectData

▸ **getRedirectData**(`origin`): `Promise`\<[`JshCmsRedirect`](../interfaces/JshCmsRedirect.md)[]\>

getRedirectData - Get CMS Redirect Data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | `string` | http origin |

#### Returns

`Promise`\<[`JshCmsRedirect`](../interfaces/JshCmsRedirect.md)[]\>

Redirects

___

### getRedirectListingPath

▸ **getRedirectListingPath**(): `undefined` \| `string`

getRedirectListingPath - Get the configured path for the redirect listing file

#### Returns

`undefined` \| `string`

___

### getStandalonePage

▸ **getStandalonePage**(`pathname`, `params`): `Promise`\<[`JshCmsPage`](JshCmsPage.md)\>

getStandalonePage [Main Entry Point] - Get CMS Page Data for Standalone Integration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `undefined` \| `string` \| `string`[] | Root relative path being requested |
| `params` | `Object` | Request url parameters |

#### Returns

`Promise`\<[`JshCmsPage`](JshCmsPage.md)\>

Page Object, with filled properties: isInEditor, editorScriptPath, notFound

**`Remarks`**

if page is opened from CMS Editor or Not Found, an empty Page Object will be returned

___

### hasPage

▸ **hasPage**(`pathname`): `Promise`\<`boolean`\>

hasPage - Check if a page object file exists to decide if a route is available.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `string` | target path |

#### Returns

`Promise`\<`boolean`\>

___

### loadRedirectData

▸ **loadRedirectData**(`redirectListingPath`, `origin`): `Promise`\<[`JshCmsRedirect`](../interfaces/JshCmsRedirect.md)[]\>

loadRedirectData - Load and parse the redirects file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `redirectListingPath` | `string` | Path to exported CMS redirects |
| `origin` | `string` | - |

#### Returns

`Promise`\<[`JshCmsRedirect`](../interfaces/JshCmsRedirect.md)[]\>

List of redirects

___

### processRedirects

▸ **processRedirects**(`request`): `Promise`\<`undefined` \| `NextResponse`\<`unknown`\>\>

processJshCmsRedirects - Execute the redirect for a request, if any

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `NextRequest` | Request object providing target path and origin |

#### Returns

`Promise`\<`undefined` \| `NextResponse`\<`unknown`\>\>

Appropriate response, if one was found

___

### serve

▸ **serve**(`pathname`, `params`): `Promise`\<`GetServerSidePropsResult`\<\{ `jshCmsPage`: [`JshCmsPage`](JshCmsPage.md)  }\>\>

serve [Main Entry Point] - Serves CMS content for a target URL

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `undefined` \| `string` \| `string`[] | Root relative path being requested |
| `params` | `Object` | Request url parameters |

#### Returns

`Promise`\<`GetServerSidePropsResult`\<\{ `jshCmsPage`: [`JshCmsPage`](JshCmsPage.md)  }\>\>

Page Object, with filled properties: isInEditor, editorScriptPath, notFound

**`Remarks`**

if page is opened from CMS Editor or Not Found, an empty Page Object will be returned

___

### matchRedirect

▸ **matchRedirect**(`redirects`, `urlpath`): `undefined` \| [`JshCmsRoute`](../interfaces/JshCmsRoute.md)

matchRedirect - Check if URL matches redirects and return first match

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `redirects` | [`JshCmsRedirect`](../interfaces/JshCmsRedirect.md)[] | Array of CMS Redirects |
| `urlpath` | `string` | Target URL path |

#### Returns

`undefined` \| [`JshCmsRoute`](../interfaces/JshCmsRoute.md)

___

### processRoute

▸ **processRoute**(`route`, `requestUrl`): `undefined` \| `NextResponse`\<`unknown`\>

processRoute - Provides simple handling of redirects in Next.js, replace as needed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | [`JshCmsRoute`](../interfaces/JshCmsRoute.md) | Path and code of a found redirect |
| `requestUrl` | `undefined` \| `string` \| `URL` | Original request url |

#### Returns

`undefined` \| `NextResponse`\<`unknown`\>

Response, if a valid redirect was provided.
