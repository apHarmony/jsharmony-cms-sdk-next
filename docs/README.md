jsharmony-cms-sdk-next

# jsharmony-cms-sdk-next

## Table of contents

### Classes

- [JshCmsPage](classes/JshCmsPage.md)
- [JshCmsRouter](classes/JshCmsRouter.md)

### Interfaces

- [JshCmsConfig](interfaces/JshCmsConfig.md)
- [JshCmsPageConfigDefinition](interfaces/JshCmsPageConfigDefinition.md)
- [JshCmsPageConfigProps](interfaces/JshCmsPageConfigProps.md)
- [JshCmsPageRequest](interfaces/JshCmsPageRequest.md)
- [JshCmsProps](interfaces/JshCmsProps.md)
- [JshCmsPropsWithPage](interfaces/JshCmsPropsWithPage.md)
- [JshCmsPropsWithPageAndContent](interfaces/JshCmsPropsWithPageAndContent.md)
- [JshCmsRedirect](interfaces/JshCmsRedirect.md)
- [JshCmsRoute](interfaces/JshCmsRoute.md)

### Functions

- [JshCmsContentArea](README.md#jshcmscontentarea)
- [JshCmsEditor](README.md#jshcmseditor)
- [JshCmsFooter](README.md#jshcmsfooter)
- [JshCmsHead](README.md#jshcmshead)
- [JshCmsPageConfig](README.md#jshcmspageconfig)
- [JshCmsScript](README.md#jshcmsscript)
- [JshCmsStyle](README.md#jshcmsstyle)

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
