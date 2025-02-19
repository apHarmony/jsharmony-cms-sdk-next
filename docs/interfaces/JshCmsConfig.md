[jsharmony-cms-sdk-next](../README.md) / JshCmsConfig

# Interface: JshCmsConfig

## Table of contents

### Properties

- [cacheDuration](JshCmsConfig.md#cacheduration)
- [cmsServerUrls](JshCmsConfig.md#cmsserverurls)
- [contentUrl](JshCmsConfig.md#contenturl)
- [defaultDocument](JshCmsConfig.md#defaultdocument)
- [redirectListingPath](JshCmsConfig.md#redirectlistingpath)

## Properties

### cacheDuration

• **cacheDuration**: `number`

Cache duration (seconds)

___

### cmsServerUrls

• **cmsServerUrls**: `string`[]

The CMS Server URLs that will be enabled for Page Editing (set to '*' to enable any remote CMS)
- Used by jshCmsPage.editorScriptPath, and the getEditorScriptPath function
- NOT used by jsHarmonyCmsEditor.js - the launcher instead uses accessKeys for validating the remote CMS

___

### contentUrl

• `Optional` **contentUrl**: `string`

URL to published CMS content files

___

### defaultDocument

• `Optional` **defaultDocument**: `string`

Default Directory Document (e.g. index.html)

___

### redirectListingPath

• `Optional` **redirectListingPath**: ``null`` \| `string`

Path to redirect listing JSON file (relative to contentUrl)
