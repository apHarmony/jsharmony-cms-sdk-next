[jsharmony-cms-sdk-next](../README.md) / JshCmsPage

# Interface: JshCmsPage

## Table of contents

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
