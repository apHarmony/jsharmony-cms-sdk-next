[jsharmony-cms-sdk-next](../README.md) / JshCmsRouter

# Interface: JshCmsRouter

## Table of contents

### Constructors

- [constructor](JshCmsRouter.md#constructor)

### Properties

- [cms\_server\_urls](JshCmsRouter.md#cms_server_urls)
- [content\_path](JshCmsRouter.md#content_path)
- [content\_url](JshCmsRouter.md#content_url)
- [default\_document](JshCmsRouter.md#default_document)
- [redirect\_listing\_path](JshCmsRouter.md#redirect_listing_path)

### Methods

- [getJshCmsMetadata](JshCmsRouter.md#getjshcmsmetadata)
- [getJshCmsPageEmpty](JshCmsRouter.md#getjshcmspageempty)
- [getJshCmsRedirect](JshCmsRouter.md#getjshcmsredirect)
- [getJshCmsRedirectData](JshCmsRouter.md#getjshcmsredirectdata)
- [getJshCmsRedirectListingPath](JshCmsRouter.md#getjshcmsredirectlistingpath)
- [getJshCmsStandalone](JshCmsRouter.md#getjshcmsstandalone)
- [hasJshCmsPage](JshCmsRouter.md#hasjshcmspage)
- [processJshCmsRedirects](JshCmsRouter.md#processjshcmsredirects)

## Constructors

### constructor

• **constructor**: `Object`

## Properties

### cms\_server\_urls

• **cms\_server\_urls**: `string`[]

The CMS Server URLs that will be enabled for Page Editing (set to '*' to enable any remote CMS)
- Used by page.editorScriptPath, and the getJshCmsEditorScriptPath function
- NOT used by jsHarmonyCmsEditor.js - the launcher instead uses access_keys for validating the remote CMS

___

### content\_path

• **content\_path**: `string`

File path to published CMS content files

___

### content\_url

• **content\_url**: `string`

Url of the server hosting content_path, usually the same server.

___

### default\_document

• **default\_document**: `string`

Default Directory Document (e.g. index.html)

___

### redirect\_listing\_path

• **redirect\_listing\_path**: ``null`` \| `string`

Path to redirect listing JSON file (relative to content_path)

## Methods

### getJshCmsMetadata

▸ **getJshCmsMetadata**(`«destructured»`, `parent`): `Promise`\<`Metadata`\>

getJshCmsMetadata - provides a basic version of a Next.js metadata function that provides CMS SEO data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`JshCmsProps`](JshCmsProps.md) |
| `parent` | `ResolvingMetadata` |

#### Returns

`Promise`\<`Metadata`\>

**`Remarks`**

If you application has additional metadata needs, you may wish to copy the base function into your generateMetadata function.
[https://nextjs.org/docs/app/api-reference/functions/generate-metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

___

### getJshCmsPageEmpty

▸ **getJshCmsPageEmpty**(`pageTemplateId`): [`JshCmsPage`](JshCmsPage.md)

getJshCmsPageEmpty - An empty Page object, for blank editors or initializing useState

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageTemplateId` | `string` | page template id for newly created pages |

#### Returns

[`JshCmsPage`](JshCmsPage.md)

___

### getJshCmsRedirect

▸ **getJshCmsRedirect**(`request`): `Promise`\<`undefined` \| [`JshCmsRoute`](JshCmsRoute.md)\>

getJshCmsRedirect - Lookup the redirect for a request, if any

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `NextRequest` | Request object providing target path and origin |

#### Returns

`Promise`\<`undefined` \| [`JshCmsRoute`](JshCmsRoute.md)\>

Appropriate redirect, if one was found

___

### getJshCmsRedirectData

▸ **getJshCmsRedirectData**(`origin`): `Promise`\<[`JshCmsRedirect`](JshCmsRedirect.md)[]\>

getJshCmsRedirectData - Get CMS Redirect Data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | `string` | http origin |

#### Returns

`Promise`\<[`JshCmsRedirect`](JshCmsRedirect.md)[]\>

Redirects

___

### getJshCmsRedirectListingPath

▸ **getJshCmsRedirectListingPath**(): `undefined` \| `string`

getJshCmsRedirectListingPath - Get the configured path for the redirect listing file

#### Returns

`undefined` \| `string`

___

### getJshCmsStandalone

▸ **getJshCmsStandalone**(`pathname`, `searchParams`): `Promise`\<[`JshCmsPage`](JshCmsPage.md)\>

getJshCmsStandalone [Main Entry Point] - Get CMS Page Data for Standalone Integration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `undefined` \| `string` \| `string`[] | Root relative path being requested |
| `searchParams` | `Object` | Request url parameters |

#### Returns

`Promise`\<[`JshCmsPage`](JshCmsPage.md)\>

Page Object, with filled properties: isInEditor, editorScriptPath, notFound

**`Remarks`**

if page is opened from CMS Editor or Not Found, an empty Page Object will be returned

___

### hasJshCmsPage

▸ **hasJshCmsPage**(`pathname`): `Promise`\<`boolean`\>

hasJshCmsPage - Check if a page object file exists to decide if a route is available.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `string` | target path |

#### Returns

`Promise`\<`boolean`\>

___

### processJshCmsRedirects

▸ **processJshCmsRedirects**(`request`): `Promise`\<`undefined` \| `NextResponse`\<`unknown`\>\>

processJshCmsRedirects - Execute the redirect for a request, if any

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `NextRequest` | Request object providing target path and origin |

#### Returns

`Promise`\<`undefined` \| `NextResponse`\<`unknown`\>\>

Appropriate response, if one was found
