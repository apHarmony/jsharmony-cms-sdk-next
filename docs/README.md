jsharmony-cms-sdk-next

# jsharmony-cms-sdk-next

## Table of contents

### Classes

- [JshCmsContentComponent](classes/JshCmsContentComponent.md)
- [JshCmsPage](classes/JshCmsPage.md)
- [JshCmsRouter](classes/JshCmsRouter.md)

### Interfaces

- [JshCmsConfig](interfaces/JshCmsConfig.md)
- [JshCmsContentAreaProps](interfaces/JshCmsContentAreaProps.md)
- [JshCmsContentComponentConfig](interfaces/JshCmsContentComponentConfig.md)
- [JshCmsContentComponentInstance](interfaces/JshCmsContentComponentInstance.md)
- [JshCmsContentComponentProps](interfaces/JshCmsContentComponentProps.md)
- [JshCmsContentComponentRender](interfaces/JshCmsContentComponentRender.md)
- [JshCmsContextData](interfaces/JshCmsContextData.md)
- [JshCmsElementProps](interfaces/JshCmsElementProps.md)
- [JshCmsMetadataProps](interfaces/JshCmsMetadataProps.md)
- [JshCmsPageComponentProps](interfaces/JshCmsPageComponentProps.md)
- [JshCmsPageConfigDefinition](interfaces/JshCmsPageConfigDefinition.md)
- [JshCmsPageConfigProps](interfaces/JshCmsPageConfigProps.md)
- [JshCmsPageRequest](interfaces/JshCmsPageRequest.md)
- [JshCmsProps](interfaces/JshCmsProps.md)
- [JshCmsProviderProps](interfaces/JshCmsProviderProps.md)
- [JshCmsRedirect](interfaces/JshCmsRedirect.md)
- [JshCmsRoute](interfaces/JshCmsRoute.md)

### Functions

- [JshCms](README.md#jshcms)
- [JshCmsContentArea](README.md#jshcmscontentarea)
- [JshCmsEditor](README.md#jshcmseditor)
- [JshCmsFooter](README.md#jshcmsfooter)
- [JshCmsHead](README.md#jshcmshead)
- [JshCmsPageComponent](README.md#jshcmspagecomponent)
- [JshCmsPageConfig](README.md#jshcmspageconfig)
- [JshCmsProvider](README.md#jshcmsprovider)
- [JshCmsScript](README.md#jshcmsscript)
- [JshCmsStyle](README.md#jshcmsstyle)
- [useJshCms](README.md#usejshcms)
- [useJshCmsPageComponentData](README.md#usejshcmspagecomponentdata)

## Functions

### JshCms

▸ **JshCms**(`props`): `Element`

JshCms - renders head, editor, script, style, footer tags, and a container for JshCmsContentArea tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsProps`](interfaces/JshCmsProps.md) |

#### Returns

`Element`

**`Remarks`**

**`Example`**

```
<JshCms jshCmsPage={jshCmsPage} jshCmsConfig={JshCmsConfig}>
  <h1 cms-title="true">{jshCmsPage.title||'Title'}</h1>
  <JshCmsContentArea cms-content="body">Page Content</JshCmsContentArea>
</JshCms>
```

___

### JshCmsContentArea

▸ **JshCmsContentArea**(`props`): `Element`

JshCmsContentArea - Render content area.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsContentAreaProps`](interfaces/JshCmsContentAreaProps.md) |

#### Returns

`Element`

**`Remarks`**

React function component for rendering content area content and associated portals for child component rendering.

**`Example`**

```
<JshCmsContentArea cms-content="body" jshCmsPage={jshCmsPage}>
  Optional Default Body Content
</JshCmsContentArea>
```

___

### JshCmsEditor

▸ **JshCmsEditor**(`props`): `Element`

JshCmsEditor - render editor support script when page is loaded in the CMS editor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsElementProps`](interfaces/JshCmsElementProps.md) |

#### Returns

`Element`

**`Remarks`**

Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.

**`Example`**

```
<JshCmsEditor jshCmsPage={jshCmsPage} />
```

___

### JshCmsFooter

▸ **JshCmsFooter**(`props`): `Element`

JshCsFooter - render additional footer tags (if any).

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsElementProps`](interfaces/JshCmsElementProps.md) |

#### Returns

`Element`

**`Remarks`**

Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.

**`Example`**

```
<JshCmsFooter jshCmsPage={jshCmsPage} />
```

___

### JshCmsHead

▸ **JshCmsHead**(`props`): `Element`

JshCmsHead - render additional head tags (if any). Note that this feature in particular is questionable with the Next.js head management, and since raw text must have a container, it is rendered in a div.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsElementProps`](interfaces/JshCmsElementProps.md) |

#### Returns

`Element`

**`Remarks`**

Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.

**`Example`**

```
<JshCmsHead jshCmsPage={jshCmsPage} />
```

___

### JshCmsPageComponent

▸ **JshCmsPageComponent**(`props`): `Element`

JshCmsPageComponent - Page Component.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsPageComponentProps`](interfaces/JshCmsPageComponentProps.md) |

#### Returns

`Element`

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

### JshCmsProvider

▸ **JshCmsProvider**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsProviderProps`](interfaces/JshCmsProviderProps.md) |

#### Returns

`Element`

___

### JshCmsScript

▸ **JshCmsScript**(`props`): `Element`

JshCmsScript - render additional javascript (if any) as a script tag

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsElementProps`](interfaces/JshCmsElementProps.md) |

#### Returns

`Element`

**`Remarks`**

Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.

**`Example`**

```
<JshCmsScript jshCmsPage={jshCmsPage} />
```

___

### JshCmsStyle

▸ **JshCmsStyle**(`props`): `Element`

JshCmsStyle - render additional css (if any) as a style tag

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JshCmsElementProps`](interfaces/JshCmsElementProps.md) |

#### Returns

`Element`

**`Remarks`**

Simple React function component for conditionally including tags in pages. These are trivial and can be replaced with custom code as needed.
Note: CMS was designed to support additional head tags. Next.js takes full control of the head, so these must be placed elsewhere.

**`Example`**

```
<JshCmsStyle jshCmsPage={jshCmsPage} />
```

___

### useJshCms

▸ **useJshCms**(): [`JshCmsContextData`](interfaces/JshCmsContextData.md)

#### Returns

[`JshCmsContextData`](interfaces/JshCmsContextData.md)

___

### useJshCmsPageComponentData

▸ **useJshCmsPageComponentData**\<`T`\>(`props`): `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `props.componentId` | `string` |
| `props.contentAreaName?` | `string` |
| `props.jshCmsPage?` | [`JshCmsPage`](classes/JshCmsPage.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `componentData` | `T` \| ``null`` |
