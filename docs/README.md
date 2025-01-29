jsharmony-cms-sdk-next

# jsharmony-cms-sdk-next

## Table of contents

### Interfaces

- [JshCmsConfig](interfaces/JshCmsConfig.md)
- [JshCmsPage](interfaces/JshCmsPage.md)
- [JshCmsPageConfigDefinition](interfaces/JshCmsPageConfigDefinition.md)
- [JshCmsPageConfigProps](interfaces/JshCmsPageConfigProps.md)
- [JshCmsPageRequest](interfaces/JshCmsPageRequest.md)
- [JshCmsProps](interfaces/JshCmsProps.md)
- [JshCmsPropsWithPage](interfaces/JshCmsPropsWithPage.md)
- [JshCmsPropsWithPageAndContent](interfaces/JshCmsPropsWithPageAndContent.md)
- [JshCmsRedirect](interfaces/JshCmsRedirect.md)
- [JshCmsRoute](interfaces/JshCmsRoute.md)
- [JshCmsRouter](interfaces/JshCmsRouter.md)
- [JshCmsStandaloneConfig](interfaces/JshCmsStandaloneConfig.md)

### Functions

- [JshCmsContentArea](README.md#jshcmscontentarea)
- [JshCmsEditor](README.md#jshcmseditor)
- [JshCmsFooter](README.md#jshcmsfooter)
- [JshCmsHead](README.md#jshcmshead)
- [JshCmsPageConfig](README.md#jshcmspageconfig)
- [JshCmsRouter](README.md#jshcmsrouter)
- [JshCmsScript](README.md#jshcmsscript)
- [JshCmsStyle](README.md#jshcmsstyle)
- [getJshCmsEditorScriptPath](README.md#getjshcmseditorscriptpath)
- [getJshCmsMetadata](README.md#getjshcmsmetadata)
- [getJshCmsPage](README.md#getjshcmspage)
- [getJshCmsPageEmpty](README.md#getjshcmspageempty)
- [getJshCmsPageNotFound](README.md#getjshcmspagenotfound)
- [getJshCmsPath](README.md#getjshcmspath)
- [getJshCmsPathVariations](README.md#getjshcmspathvariations)
- [getJshCmsRedirect](README.md#getjshcmsredirect)
- [getJshCmsStandalone](README.md#getjshcmsstandalone)
- [hasJshCmsPage](README.md#hasjshcmspage)
- [loadJshCmsRedirectData](README.md#loadjshcmsredirectdata)
- [matchJshCmsRedirect](README.md#matchjshcmsredirect)
- [processJshCmsRedirects](README.md#processjshcmsredirects)
- [processJshCmsRoute](README.md#processjshcmsroute)
- [resolveJshCmsPath](README.md#resolvejshcmspath)

## Functions

### JshCmsContentArea

▸ **JshCmsContentArea**(`props`): `Element`

JshCmsContentArea - render simple content area.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsPropsWithPageAndContent`](interfaces/JshCmsPropsWithPageAndContent.md) |

#### Returns

`Element`

**`Remarks`**

Simple React function component for including editable content area. This produces a div, but it can be trivially replaced with custom code.

**`Example`**

```
<JshCmsContentArea cms-content="body" page={cmsPage}>
  Optional Default Body Content
</JshCmsContentArea>
```

___

### JshCmsEditor

▸ **JshCmsEditor**(`props`): `undefined` \| `Element`

JshCmsEditor - render editor support script when page is loaded in the CMS editor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsPropsWithPage`](interfaces/JshCmsPropsWithPage.md) |

#### Returns

`undefined` \| `Element`

**`Remarks`**

Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.

**`Example`**

```
<JshCmsEditor page={cmsPage} />
```

___

### JshCmsFooter

▸ **JshCmsFooter**(`props`): `undefined` \| `Element`

JshCsFooter - render additional footer tags (if any).

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsPropsWithPage`](interfaces/JshCmsPropsWithPage.md) |

#### Returns

`undefined` \| `Element`

**`Remarks`**

Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.

**`Example`**

```
<JshCmsFooter page={cmsPage} />
```

___

### JshCmsHead

▸ **JshCmsHead**(`props`): `undefined` \| `Element`

JshCmsHead - render additional head tags (if any). Note that this feature in particular is questionable with the Next.js head management, and since raw text must have a container, it is rendered in a div.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsPropsWithPage`](interfaces/JshCmsPropsWithPage.md) |

#### Returns

`undefined` \| `Element`

**`Remarks`**

Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.

**`Example`**

```
<JshCmsHead page={cmsPage} />
```

___

### JshCmsPageConfig

▸ **JshCmsPageConfig**(`props`): `undefined` \| `Element`

JshCmsPageConfig - render config settings as a script tag

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsPageConfigProps`](interfaces/JshCmsPageConfigProps.md) |

#### Returns

`undefined` \| `Element`

**`Remarks`**

Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.

**`Example`**

```
<JshCmsPageConfig cms-template="Two Column Page Template" config={{
 "content_elements": {
   "left": { "title": "Left" },
   "right": { "title": "Right" }
   }
 }} />
```

___

### JshCmsRouter

▸ **JshCmsRouter**(`this`, `config`): [`JshCmsRouter`](interfaces/JshCmsRouter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`JshCmsRouter`](interfaces/JshCmsRouter.md) |
| `config` | [`JshCmsConfig`](interfaces/JshCmsConfig.md) |

#### Returns

[`JshCmsRouter`](interfaces/JshCmsRouter.md)

___

### JshCmsScript

▸ **JshCmsScript**(`props`): `undefined` \| `Element`

JshCmsScript - render additional javascript (if any) as a script tag

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsPropsWithPage`](interfaces/JshCmsPropsWithPage.md) |

#### Returns

`undefined` \| `Element`

**`Remarks`**

Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.

**`Example`**

```
<JshCmsScript page={cmsPage} />
```

___

### JshCmsStyle

▸ **JshCmsStyle**(`props`): `undefined` \| `Element`

JshCmsStyle - render additional css (if any) as a style tag

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsPropsWithPage`](interfaces/JshCmsPropsWithPage.md) |

#### Returns

`undefined` \| `Element`

**`Remarks`**

Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.

**`Example`**

```
<JshCmsStyle page={cmsPage} />
```

___

### getJshCmsEditorScriptPath

▸ **getJshCmsEditorScriptPath**(`cmsServerUrl`, `cmsServerUrls`): `string` \| ``null``

getJshCmsEditorScriptPath - Generate script for CMS Editor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmsServerUrl` | `string` | URL from jshcms_url parameter |
| `cmsServerUrls` | `string`[] | list of allowed CMS editor servers |

#### Returns

`string` \| ``null``

path to the editor script

**`Remarks`**

- The provided url is validated against cmsServerUrls
- If the CMS Server is not found in cmsServerUrls, an empty element will be returned

___

### getJshCmsMetadata

▸ **getJshCmsMetadata**(`props`, `parent`, `config`): `Promise`\<`Metadata`\>

getJshCmsMetadata - provides a basic version of a Next.js metadata function that provides CMS SEO data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`JshCmsProps`](interfaces/JshCmsProps.md) | params and searchParams from the incoming request |
| `parent` | `ResolvingMetadata` | metadata from previous functions |
| `config` | [`JshCmsPageRequest`](interfaces/JshCmsPageRequest.md) | CMS configuration parameters |

#### Returns

`Promise`\<`Metadata`\>

**`Remarks`**

If you application has additional metadata needs, you may wish to copy this function into your generateMetadata function.
[https://nextjs.org/docs/app/api-reference/functions/generate-metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

___

### getJshCmsPage

▸ **getJshCmsPage**(`pathname`, `pageTemplateId`, `config`): `Promise`\<[`JshCmsPage`](interfaces/JshCmsPage.md)\>

getJshCmsPage - Get CMS Page Data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `undefined` \| `string` \| `string`[] | Root-relative Page URL |
| `pageTemplateId` | `undefined` \| `string` \| `string`[] | Page template for new pages |
| `config` | [`JshCmsPageRequest`](interfaces/JshCmsPageRequest.md) | Configuration parameters |

#### Returns

`Promise`\<[`JshCmsPage`](interfaces/JshCmsPage.md)\>

___

### getJshCmsPageEmpty

▸ **getJshCmsPageEmpty**(`pageTemplateId`): [`JshCmsPage`](interfaces/JshCmsPage.md)

getJshCmsPageEmpty - An empty JshCmsPage object, for blank editors or initializing useState

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageTemplateId` | `string` | page template id for newly created pages |

#### Returns

[`JshCmsPage`](interfaces/JshCmsPage.md)

___

### getJshCmsPageNotFound

▸ **getJshCmsPageNotFound**(`pageTemplateId`): [`JshCmsPage`](interfaces/JshCmsPage.md)

getJshCmsPageNotFound - An empty JshCmsPage object, with the notFound flag set

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageTemplateId` | `string` | page template id for newly created pages |

#### Returns

[`JshCmsPage`](interfaces/JshCmsPage.md)

___

### getJshCmsPath

▸ **getJshCmsPath**(`contentPath`, `pathname`): `string`

getJshCmsPath - Transform a page url into cms content file path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contentPath` | `string` | CMS content export folder |
| `pathname` | `string` | Root relative path being requested |

#### Returns

`string`

normalized path

___

### getJshCmsPathVariations

▸ **getJshCmsPathVariations**(`pathname`, `defaultDocument`): `string`[]

getJshCmsPathVariations - creations variations of a cms content path to try, e.g. as provided and with index.html

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `string` | Root relative path being requested |
| `defaultDocument` | `string` | default document if not in url, e.g. 'index.html' |

#### Returns

`string`[]

list of paths to try

___

### getJshCmsRedirect

▸ **getJshCmsRedirect**(`request`, `redirectListingPath`): `Promise`\<[`JshCmsRoute`](interfaces/JshCmsRoute.md) \| `undefined`\>

getJshCmsRedirect - Looks up matching redirect, if any.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `NextRequest` | Request object providing target path and origin |
| `redirectListingPath` | `string` | Path to exported CMS redirects |

#### Returns

`Promise`\<[`JshCmsRoute`](interfaces/JshCmsRoute.md) \| `undefined`\>

path and code if found

___

### getJshCmsStandalone

▸ **getJshCmsStandalone**(`pathname`, `searchParams`, `config`): `Promise`\<[`JshCmsPage`](interfaces/JshCmsPage.md)\>

getJshCmsStandalone [Main Entry Point] - Get CMS Page Data for Standalone Integration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `undefined` \| `string` \| `string`[] | Root relative path being requested |
| `searchParams` | `Object` | Request url parameters |
| `config` | [`JshCmsStandaloneConfig`](interfaces/JshCmsStandaloneConfig.md) | CMS Configuration parameters |

#### Returns

`Promise`\<[`JshCmsPage`](interfaces/JshCmsPage.md)\>

JshCmsPage Object, with set properties: isInEditor, editorScriptPath, notFound

**`Remarks`**

if page is opened from CMS Editor or Not Found, an empty JshCmsPage Object will be returned

___

### hasJshCmsPage

▸ **hasJshCmsPage**(`request`, `contentPath`, `defaultDocument`): `Promise`\<`boolean`\>

hasJshCmsPage - Check if a page object file exists to decide if a route is available.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `NextRequest` | Request object providing target path and origin |
| `contentPath` | `string` | Path to CMS output folder |
| `defaultDocument` | `string` | default document if not in url, e.g. 'index.html' |

#### Returns

`Promise`\<`boolean`\>

___

### loadJshCmsRedirectData

▸ **loadJshCmsRedirectData**(`redirectListingPath`, `origin`): `Promise`\<[`JshCmsRedirect`](interfaces/JshCmsRedirect.md)[]\>

loadJshCmsRedirectData - Load and parse the redirects file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `redirectListingPath` | `string` | Path to exported CMS redirects |
| `origin` | `string` | - |

#### Returns

`Promise`\<[`JshCmsRedirect`](interfaces/JshCmsRedirect.md)[]\>

List of redirects

___

### matchJshCmsRedirect

▸ **matchJshCmsRedirect**(`redirects`, `urlpath`): [`JshCmsRoute`](interfaces/JshCmsRoute.md) \| `undefined`

matchJshCmsRedirect - Check if URL matches redirects and return first match

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `redirects` | [`JshCmsRedirect`](interfaces/JshCmsRedirect.md)[] | Array of CMS Redirects |
| `urlpath` | `string` | Target URL path |

#### Returns

[`JshCmsRoute`](interfaces/JshCmsRoute.md) \| `undefined`

___

### processJshCmsRedirects

▸ **processJshCmsRedirects**(`request`, `redirectListingPath`): `Promise`\<`NextResponse` \| `undefined`\>

processJshCmsRedirects - Small helper function to look up and execute redirects

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `NextRequest` | Request object providing target path and origin |
| `redirectListingPath` | `string` | Path to exported CMS redirects |

#### Returns

`Promise`\<`NextResponse` \| `undefined`\>

Response, if a redirect was found

___

### processJshCmsRoute

▸ **processJshCmsRoute**(`route`, `requestUrl`): `NextResponse` \| `undefined`

processJshCmsRoute - Provides simple handling of redirects in Next.js, replace as needed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | [`JshCmsRoute`](interfaces/JshCmsRoute.md) | Path and code of a found redirect |
| `requestUrl` | `undefined` \| `string` \| `URL` | Original request url |

#### Returns

`NextResponse` \| `undefined`

Response, if a valid redirect was provided.

___

### resolveJshCmsPath

▸ **resolveJshCmsPath**(`contentPath`, `pathname`, `defaultDocument`): `string`[]

resolveJshCmsPath - Convert URL to CMS Content Paths

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contentPath` | `string` | CMS content export folder |
| `pathname` | `string` | Root relative path being requested |
| `defaultDocument` | `string` | default document if not in url, e.g. 'index.html' |

#### Returns

`string`[]

list of paths to try
