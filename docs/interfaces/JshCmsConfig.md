[jsharmony-cms-sdk-next](../README.md) / JshCmsConfig

# Interface: JshCmsConfig

## Table of contents

### Properties

- [cms\_server\_urls](JshCmsConfig.md#cms_server_urls)
- [content\_path](JshCmsConfig.md#content_path)
- [content\_url](JshCmsConfig.md#content_url)
- [default\_document](JshCmsConfig.md#default_document)
- [redirect\_listing\_path](JshCmsConfig.md#redirect_listing_path)

## Properties

### cms\_server\_urls

• **cms\_server\_urls**: `string`[]

The CMS Server URLs that will be enabled for Page Editing (set to '*' to enable any remote CMS)
- Used by page.editorScriptPath, and the getCmsEditorScriptPath function
- NOT used by jsHarmonyCmsEditor.js - the launcher instead uses access_keys for validating the remote CMS

___

### content\_path

• `Optional` **content\_path**: `string`

File path to published CMS content files

___

### content\_url

• `Optional` **content\_url**: `string`

Url of the server hosting content_path, usually the same server.

___

### default\_document

• `Optional` **default\_document**: `string`

Default Directory Document (e.g. index.html)

___

### redirect\_listing\_path

• `Optional` **redirect\_listing\_path**: ``null`` \| `string`

Path to redirect listing JSON file (relative to content_path)
