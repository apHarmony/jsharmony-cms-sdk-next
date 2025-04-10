[jsharmony-cms-sdk-next](../README.md) / JshCmsContentComponent

# Class: JshCmsContentComponent\<P\>

JshCmsContentComponent - Content Component.

## Type parameters

| Name | Type |
| :------ | :------ |
| `P` | {} |

## Implements

- [`JshCmsContentComponent`](JshCmsContentComponent.md)\<`P`\>

## Implemented by

- [`JshCmsContentComponent`](JshCmsContentComponent.md)

## Callable

### JshCmsContentComponent

▸ **JshCmsContentComponent**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`\<`P`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

## Table of contents

### Constructors

- [constructor](JshCmsContentComponent.md#constructor)

### Properties

- [contextTypes](JshCmsContentComponent.md#contexttypes)
- [defaultProps](JshCmsContentComponent.md#defaultprops)
- [displayName](JshCmsContentComponent.md#displayname)
- [jshCmsComponentConfig](JshCmsContentComponent.md#jshcmscomponentconfig)
- [propTypes](JshCmsContentComponent.md#proptypes)

### Methods

- [extractChildrenAsReactElements](JshCmsContentComponent.md#extractchildrenasreactelements)

## Constructors

### constructor

• **new JshCmsContentComponent**\<`P`\>(): [`JshCmsContentComponent`](JshCmsContentComponent.md)\<`P`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | {} |

#### Returns

[`JshCmsContentComponent`](JshCmsContentComponent.md)\<`P`\>

## Properties

### contextTypes

• `Optional` **contextTypes**: `ValidationMap`\<`any`\>

___

### defaultProps

• `Optional` **defaultProps**: `Partial`\<`P`\>

___

### displayName

• `Optional` **displayName**: `string`

___

### jshCmsComponentConfig

• `Optional` **jshCmsComponentConfig**: [`JshCmsContentComponentConfig`](../interfaces/JshCmsContentComponentConfig.md)

___

### propTypes

• `Optional` **propTypes**: `WeakValidationMap`\<`P`\>

## Methods

### extractChildrenAsReactElements

▸ **extractChildrenAsReactElements**(`container`): `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `Element` |

#### Returns

`ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>[]
