[jsharmony-cms-sdk-next](../README.md) / JshCmsPage

# Class: JshCmsPage

## Implements

- [`JshCmsPage`](JshCmsPage.md)

## Implemented by

- [`JshCmsPage`](JshCmsPage.md)

## Table of contents

### Constructors

- [constructor](JshCmsPage.md#constructor)

### Properties

- [content](JshCmsPage.md#content)
- [css](JshCmsPage.md#css)
- [editorScriptPath](JshCmsPage.md#editorscriptpath)
- [footer](JshCmsPage.md#footer)
- [header](JshCmsPage.md#header)
- [isInEditor](JshCmsPage.md#isineditor)
- [js](JshCmsPage.md#js)
- [notFound](JshCmsPage.md#notfound)
- [page\_template\_id](JshCmsPage.md#page_template_id)
- [properties](JshCmsPage.md#properties)
- [seo](JshCmsPage.md#seo)
- [title](JshCmsPage.md#title)

### Methods

- [getEditorScriptPath](JshCmsPage.md#geteditorscriptpath)
- [getEmptyPage](JshCmsPage.md#getemptypage)
- [getMetadata](JshCmsPage.md#getmetadata)
- [getNotFoundPage](JshCmsPage.md#getnotfoundpage)
- [getPage](JshCmsPage.md#getpage)
- [getPath](JshCmsPage.md#getpath)
- [getPathVariations](JshCmsPage.md#getpathvariations)
- [getStandalonePage](JshCmsPage.md#getstandalonepage)
- [resolvePath](JshCmsPage.md#resolvepath)

## Constructors

### constructor

• **new JshCmsPage**(): [`JshCmsPage`](JshCmsPage.md)

#### Returns

[`JshCmsPage`](JshCmsPage.md)

## Properties

### content

• **content**: `Object`

#### Index signature

▪ [areaId: `string`]: `string`

___

### css

• **css**: `string`

___

### editorScriptPath

• **editorScriptPath**: ``null`` \| `string`

If page was opened from a CMS Editor in config.cms_server_urls, the HTML script to launch the Editor

___

### footer

• **footer**: `string`

___

### header

• **header**: `string`

___

### isInEditor

• **isInEditor**: `boolean`

Whether the page was opened from the CMS Editor

___

### js

• **js**: `string`

___

### notFound

• **notFound**: `boolean`

Whether the page was Not Found (page data will return empty)

___

### page\_template\_id

• **page\_template\_id**: `string`

___

### properties

• **properties**: `Object`

#### Index signature

▪ [propName: `string`]: `any`

___

### seo

• **seo**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `canonical_url` | `string` | - |
| `keywords` | `string` | - |
| `metadesc` | `string` | - |
| `title` | `string` | Title for HEAD |

___

### title

• **title**: `string`

Title for Page Body Content

## Methods

### getEditorScriptPath

▸ **getEditorScriptPath**(`cmsServerUrl`, `cmsServerUrls`): ``null`` \| `string`

getEditorScriptPath - Generate script for CMS Editor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmsServerUrl` | `string` | URL from jshcms_url parameter |
| `cmsServerUrls` | `string`[] | list of allowed CMS editor servers |

#### Returns

``null`` \| `string`

path to the editor script

**`Remarks`**

- The provided url is validated against cmsServerUrls
- If the CMS Server is not found in cmsServerUrls, an empty element will be returned

___

### getEmptyPage

▸ **getEmptyPage**(`pageTemplateId`): [`JshCmsPage`](JshCmsPage.md)

getEmptyPage - An empty JshCmsPage object, for blank editors or initializing useState

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageTemplateId` | `string` | page template id for newly created pages |

#### Returns

[`JshCmsPage`](JshCmsPage.md)

___

### getMetadata

▸ **getMetadata**(`props`, `parent`, `config`): `Promise`\<`Metadata`\>

getMetadata - provides a basic version of a Next.js metadata function that provides CMS SEO data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`JshCmsMetadataProps`](../interfaces/JshCmsMetadataProps.md) | params from the incoming request |
| `parent` | `ResolvingMetadata` | metadata from previous functions |
| `config` | [`JshCmsPageRequest`](../interfaces/JshCmsPageRequest.md) | CMS configuration parameters |

#### Returns

`Promise`\<`Metadata`\>

**`Remarks`**

If you application has additional metadata needs, you may wish to copy this function into your generateMetadata function.
[https://nextjs.org/docs/app/api-reference/functions/generate-metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

___

### getNotFoundPage

▸ **getNotFoundPage**(`pageTemplateId`): [`JshCmsPage`](JshCmsPage.md)

getNotFoundPage - An empty JshCmsPage object, with the notFound flag set

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageTemplateId` | `string` | page template id for newly created pages |

#### Returns

[`JshCmsPage`](JshCmsPage.md)

___

### getPage

▸ **getPage**(`pathname`, `params`, `config`): `Promise`\<[`JshCmsPage`](JshCmsPage.md)\>

getPage - Get CMS Page Data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `undefined` \| `string` \| `string`[] | Root-relative Page URL |
| `params` | `Object` | Page load parameters |
| `config` | [`JshCmsPageRequest`](../interfaces/JshCmsPageRequest.md) | Configuration parameters |

#### Returns

`Promise`\<[`JshCmsPage`](JshCmsPage.md)\>

___

### getPath

▸ **getPath**(`contentPath`, `pathname`): `string`

getPath - Transform a page url into cms content file path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contentPath` | `string` | CMS content export folder |
| `pathname` | `string` | Root relative path being requested |

#### Returns

`string`

normalized path

___

### getPathVariations

▸ **getPathVariations**(`pathname`, `defaultDocument`): `string`[]

getPathVariations - creations variations of a cms content path to try, e.g. as provided and with index.html

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `string` | Root relative path being requested |
| `defaultDocument` | `string` | default document if not in url, e.g. 'index.html' |

#### Returns

`string`[]

list of paths to try

___

### getStandalonePage

▸ **getStandalonePage**(`pathname`, `params`, `config`): `Promise`\<[`JshCmsPage`](JshCmsPage.md)\>

getStandalonePage [Main Entry Point] - Get CMS Page Data for Standalone Integration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `undefined` \| `string` \| `string`[] | Root relative path being requested |
| `params` | `Object` | Request url parameters |
| `config` | [`JshCmsPageRequest`](../interfaces/JshCmsPageRequest.md) | CMS Configuration parameters |

#### Returns

`Promise`\<[`JshCmsPage`](JshCmsPage.md)\>

JshCmsPage Object, with set properties: isInEditor, editorScriptPath, notFound

**`Remarks`**

if page is opened from CMS Editor or Not Found, an empty JshCmsPage Object will be returned

___

### resolvePath

▸ **resolvePath**(`contentPath`, `pathname`, `defaultDocument`): `string`[]

resolvePath - Convert URL to CMS Content Paths

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contentPath` | `string` | CMS content export folder |
| `pathname` | `string` | Root relative path being requested |
| `defaultDocument` | `string` | default document if not in url, e.g. 'index.html' |

#### Returns

`string`[]

list of paths to try
