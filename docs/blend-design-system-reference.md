# Blend Design System — Component Reference

Reference for **@juspay/blend-design-system** components, props, enums, and example data. Use with `ThemeProvider` from the same package (see [Context](#context--theming) at the end).

---

## Table of Contents

1. [Button](#1-button)
2. [ButtonGroup](#2-buttongroup)
3. [Tabs](#3-tabs)
4. [SplitTag](#4-splittag)
5. [Alert](#5-alert)
6. [Tags](#6-tags)
7. [Breadcrumb](#7-breadcrumb)
8. [Avatar](#8-avatar)
9. [AvatarGroup](#9-avatargroup)
10. [Modal](#10-modal)
11. [Tooltip](#11-tooltip)
12. [Accordion](#12-accordion)
13. [Snackbar](#13-snackbar)
14. [Popover](#14-popover)
15. [Checkbox & Radio & Switch](#15-checkbox--radio--switch)
16. [Charts](#16-charts)
17. [DateRangePicker](#17-daterangepicker)
18. [StatCard](#18-statcard)
19. [Card](#19-card)
20. [Inputs](#20-inputs)
21. [Menu](#21-menu)
22. [DataTable](#22-datatable)
23. [Sidebar](#23-sidebar)
24. [Directory](#24-directory)
25. [SingleSelect](#25-singleselect)
26. [MultiSelect](#26-multiselect)
27. [Slider](#27-slider)
28. [ProgressBar](#28-progressbar)
29. [Drawer](#29-drawer)
30. [Stepper](#30-stepper)
31. [Skeleton](#31-skeleton)
32. [KeyValuePair](#32-keyvaluepair)
33. [VirtualList](#33-virtuallist)
34. [Upload](#34-upload)
35. [ChatInput](#35-chatinput)
36. [CodeBlock & CodeEditor](#36-codeblock--codeeditor)
37. [Context & Theming](#37-context--theming)

---

## 1. Button

**Import:** `Button`, `ButtonType`, `ButtonSize`, `ButtonSubType`, `ButtonState` from `@juspay/blend-design-system`

### Enums
| Enum | Values | Description |
|------|--------|-------------|
| **ButtonType** | `PRIMARY` \| `SECONDARY` \| `DANGER` \| `SUCCESS` | Visual style of the button. |
| **ButtonSize** | `SMALL` ("sm") \| `MEDIUM` ("md") \| `LARGE` ("lg") | Size of the button. |
| **ButtonSubType** | `DEFAULT` \| `ICON_ONLY` \| `INLINE` | Layout variant (default, icon-only, or inline). |
| **ButtonState** | `DEFAULT` \| `HOVER` \| `ACTIVE` \| `DISABLED` | Visual state (used for styling). |

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| buttonType | `ButtonType` | No | Visual variant (primary, secondary, danger, success). |
| size | `ButtonSize` | No | Button size (sm, md, lg). |
| subType | `ButtonSubType` | No | Sub-type: default, icon-only, or inline. |
| text | `string` | No | Button label; can also use children. |
| leadingIcon | `React.ReactNode` | No | Icon or element rendered before the label. |
| trailingIcon | `React.ReactNode` | No | Icon or element rendered after the label. |
| disabled | `boolean` | No | When true, button is disabled and not clickable. |
| onClick | `(event?: React.MouseEvent<HTMLButtonElement>) => void` | No | Called when the button is clicked. |
| loading | `boolean` | No | When true, shows loading state (e.g. spinner). |
| showSkeleton | `boolean` | No | When true, shows skeleton placeholder. |
| skeletonVariant | `SkeletonVariant` | No | Skeleton animation variant (pulse, wave, shimmer). |
| buttonGroupPosition | `'center' \| 'left' \| 'right'` | No | Position when used inside ButtonGroup. |
| fullWidth | `boolean` | No | When true, button stretches to full width of container. |
| width | `string \| number` | No | Custom width (CSS value or number). |
| justifyContent | `CSSObject['justifyContent']` | No | Flexbox justify-content for content alignment. |
| state | `ButtonState` | No | Override visual state (default, hover, active, disabled). |
| *inherited* | `React.ButtonHTMLAttributes<HTMLButtonElement>` | — | All native button props except `style` and `className`. |

### Example
```tsx
import { Button, ButtonType, ButtonSize } from '@juspay/blend-design-system';

<Button buttonType={ButtonType.PRIMARY} size={ButtonSize.MEDIUM} onClick={() => {}}>
  Save
</Button>
<Button buttonType={ButtonType.SECONDARY} size={ButtonSize.SMALL} loading>
  Loading…
</Button>
```

---

## 2. ButtonGroup

**Import:** `ButtonGroup` from `@juspay/blend-design-system`

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| stacked | `boolean` | No | When true, buttons are laid out vertically; otherwise horizontal. |
| children | `ReactElement<ButtonProps> \| ReactElement<ButtonProps>[]` | Yes | One or more Button components to group together. |

### Example
```tsx
import { ButtonGroup, Button, ButtonType, ButtonSize } from '@juspay/blend-design-system';

<ButtonGroup stacked={false}>
  <Button buttonType={ButtonType.PRIMARY} size={ButtonSize.MEDIUM}>Submit</Button>
  <Button buttonType={ButtonType.SECONDARY} size={ButtonSize.MEDIUM}>Cancel</Button>
</ButtonGroup>
```

---

## 3. Tabs

**Import:** `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `TabsVariant`, `TabsSize`, `TabItem` from `@juspay/blend-design-system`

### Enums
| Enum | Values | Description |
|------|--------|-------------|
| **TabsVariant** | `BOXED` \| `FLOATING` \| `UNDERLINE` \| `PILLS` | Visual style of the tab list. |
| **TabsSize** | `MD` \| `LG` | Size of tab triggers. |

### TabItem (data shape for `items` prop)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| value | `string` | Yes | Unique identifier for the tab. |
| label | `string` | Yes | Text shown on the tab trigger. |
| content | `ReactNode` | Yes | Content rendered when the tab is active. |
| disable | `boolean` | No | When true, tab is disabled. |
| showSkeleton | `boolean` | No | When true, shows skeleton in place of content. |
| skeletonVariant | `SkeletonVariant` | No | Skeleton animation variant. |
| leftSlot | `ReactNode` | No | Optional content before the label. |
| rightSlot | `ReactNode` | No | Optional content after the label. |
| newItem | `boolean` | No | Visual indicator for a new/added tab. |

### Tabs (root) – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| variant | `TabsVariant` | No | Visual variant of the tab list. |
| size | `TabsSize` | No | Size of tab triggers. |
| expanded | `boolean` | No | When true, tab list expands to full width. |
| fitContent | `boolean` | No | When true, tab list width fits content. |
| items | `TabItem[]` | No | Declarative list of tabs (value, label, content). |
| onTabClose | `(value: string) => void` | No | Called when a closable tab is closed. |
| onTabAdd | `() => void` | No | Called when add button is clicked. |
| showDropdown | `boolean` | No | When true, overflow tabs appear in a dropdown. |
| showAddButton | `boolean` | No | When true, shows an add-tab button. |
| dropdownTooltip | `string` | No | Tooltip text for the overflow dropdown. |
| addButtonTooltip | `string` | No | Tooltip text for the add button. |
| disable | `boolean` | No | When true, all tabs are disabled. |
| showSkeleton | `boolean` | No | When true, shows skeleton for the tab list. |
| skeletonVariant | `SkeletonVariant` | No | Skeleton animation variant. |
| stickyHeader | `boolean` | No | When true, tab list sticks on scroll. |
| offsetTop | `number` | No | Top offset (px) for sticky positioning. |
| *Radix Tabs.Root* | `ComponentPropsWithoutRef<TabsPrimitive.Root>` | — | defaultValue, value, onValueChange, etc. |

### Example dataset
```ts
const tabItems: TabItem[] = [
  { value: 'overview', label: 'Overview', content: <OverviewPanel /> },
  { value: 'analytics', label: 'Analytics', content: <AnalyticsPanel />, disable: false },
  { value: 'settings', label: 'Settings', content: <SettingsPanel /> },
];
```

```tsx
<Tabs defaultValue="overview" variant={TabsVariant.UNDERLINE} size={TabsSize.MD} items={tabItems} />
```

---

## 4. SplitTag

**Import:** `SplitTag`, `TagProps`, `TagSize`, `TagShape` from `@juspay/blend-design-system`

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| primaryTag | `Omit<TagProps, 'splitTagPosition' \| 'size' \| 'shape'>` | Yes | Config for the primary (main) tag: text, variant, color, leftSlot, rightSlot, etc. |
| secondaryTag | `Omit<TagProps, 'splitTagPosition' \| 'size' \| 'shape'>` | No | Config for the secondary tag (e.g. count or badge). |
| size | `TagSize` | No | Size applied to both tags (xs, sm, md, lg). |
| shape | `TagShape` | No | Shape applied to both tags (rounded, squarical). |

### Example
```tsx
import { SplitTag, TagVariant, TagColor } from '@juspay/blend-design-system';

<SplitTag
  primaryTag={{ text: 'Active', variant: TagVariant.SUBTLE, color: TagColor.SUCCESS }}
  secondaryTag={{ text: '12', variant: TagVariant.NO_FILL, color: TagColor.NEUTRAL }}
  size={TagSize.MD}
/>
```

---

## 5. Alert

**Import:** `Alert`, `AlertVariant`, `AlertStyle`, `AlertActionPlacement`, `AlertAction` from `@juspay/blend-design-system`

### Enums
| Enum | Values | Description |
|------|--------|-------------|
| **AlertVariant** | `PRIMARY` \| `SUCCESS` \| `WARNING` \| `ERROR` \| `PURPLE` \| `ORANGE` \| `NEUTRAL` | Semantic color of the alert. |
| **AlertStyle** | `SUBTLE` \| `NO_FILL` | Visual style (subtle background or no fill). |
| **AlertActionPlacement** | `BOTTOM` \| `RIGHT` | Where action buttons are placed relative to text. |

### AlertAction (for primaryAction / secondaryAction)
| Field | Type | Description |
|-------|------|-------------|
| label | `string` | Button label. |
| onClick | `() => void` | Called when the action is clicked. |

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| heading | `string` | Yes | Main heading text of the alert. |
| description | `string` | Yes | Body/description text. |
| variant | `AlertVariant` | No | Semantic variant (e.g. success, error, warning). |
| style | `AlertStyle` | No | Visual style (subtle or no fill). |
| primaryAction | `AlertAction` | No | Primary action button (label + onClick). |
| secondaryAction | `AlertAction` | No | Secondary action button (label + onClick). |
| onClose | `() => void` | No | Called when the close control is used. |
| icon | `ReactNode` | No | Optional custom icon. |
| actionPlacement | `AlertActionPlacement` | No | Placement of actions: bottom or right. |
| maxWidth | `string` | No | Maximum width (CSS value). |
| minWidth | `string` | No | Minimum width (CSS value). |
| width | `string` | No | Fixed width (CSS value). |

### Example
```tsx
<Alert
  heading="Success"
  description="Your changes have been saved."
  variant={AlertVariant.SUCCESS}
  primaryAction={{ label: 'View', onClick: () => {} }}
  onClose={() => {}}
/>
```

---

## 6. Tags

**Import:** `Tag`, `TagVariant`, `TagColor`, `TagSize`, `TagShape` from `@juspay/blend-design-system`

### Enums
| Enum | Values | Description |
|------|--------|-------------|
| **TagVariant** | `NO_FILL` \| `ATTENTIVE` \| `SUBTLE` | Fill style of the tag. |
| **TagColor** | `NEUTRAL` \| `PRIMARY` \| `SUCCESS` \| `ERROR` \| `WARNING` \| `PURPLE` | Color theme of the tag. |
| **TagSize** | `XS` \| `SM` \| `MD` \| `LG` | Size of the tag. |
| **TagShape** | `ROUNDED` \| `SQUARICAL` | Border radius shape. |

### Props (Tag)
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| text | `string` | Yes | Label text displayed in the tag. |
| variant | `TagVariant` | No | Visual variant (no fill, attentive, subtle). |
| color | `TagColor` | No | Semantic color. |
| size | `TagSize` | No | Size (xs, sm, md, lg). |
| shape | `TagShape` | No | Shape (rounded or squarical). |
| leftSlot | `ReactNode` | No | Content rendered before the text. |
| rightSlot | `ReactNode` | No | Content rendered after the text. |
| maxWidth | `CSSObject['maxWidth']` | No | Maximum width (CSS value). |
| width | `CSSObject['width']` | No | Width (CSS value). |
| *BlockProps* | `Omit<BlockProps, 'children'>` | — | Layout/padding props from Block primitive. |

### Example
```tsx
<Tag text="Paid" variant={TagVariant.SUBTLE} color={TagColor.SUCCESS} size={TagSize.MD} />
```

---

## 7. Breadcrumb

**Import:** `Breadcrumb` from `@juspay/blend-design-system`

### BreadcrumbItemType (data shape for `items`)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| label | `string` | Yes | Text shown for the breadcrumb link. |
| href | `string` | Yes | URL for the link. |
| leftSlot | `ReactNode` | No | Optional content before the label. |
| rightSlot | `ReactNode` | No | Optional content after the label. |
| onClick | `(event: React.MouseEvent<HTMLAnchorElement>) => void` | No | Optional click handler for client-side routing; prevents default when set. |
| skeleton | `BreadcrumbSkeletonProps` | No | When provided, shows skeleton for this item (show, variant). |

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `BreadcrumbItemType[]` | Yes | List of breadcrumb items (label, href, optional slots and onClick). |
| skeleton | `BreadcrumbSkeletonProps` | No | When set (show: true, variant), shows skeleton for the breadcrumb. |

### Example dataset & usage
```ts
const breadcrumbItems: BreadcrumbItemType[] = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Reports', href: '/dashboard/reports' },
];
```

```tsx
<Breadcrumb items={breadcrumbItems} />
// With client-side routing: pass onClick on each item to prevent default and navigate
```

---

## 8. Avatar

**Import:** `Avatar`, `AvatarSize`, `AvatarShape`, `AvatarOnlinePosition` from `@juspay/blend-design-system`

### Enums
| Enum | Values | Description |
|------|--------|-------------|
| **AvatarSize** | `SM` \| `REGULAR` \| `MD` \| `LG` \| `XL` | Size of the avatar. |
| **AvatarShape** | `CIRCULAR` \| `ROUNDED` | Shape (circle or rounded square). |
| **AvatarOnlinePosition** | `TOP` \| `BOTTOM` | Position of the online indicator dot. |

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| src | `string` | No | Image URL for the avatar. |
| alt | `string` | No | Alt text for the image. |
| fallback | `React.ReactNode` | No | Content shown when no image or when image fails to load. |
| size | `AvatarSize` | No | Size of the avatar. |
| shape | `AvatarShape` | No | Shape (circular or rounded). |
| online | `boolean` | No | When true, shows an online status indicator. |
| onlinePosition | `AvatarOnlinePosition` | No | Position of the online indicator (top or bottom). |
| leadingSlot | `React.ReactNode` | No | Content rendered before the avatar. |
| trailingSlot | `React.ReactNode` | No | Content rendered after the avatar. |
| skeleton | `{ show: boolean; variant?: SkeletonVariant }` | No | When show is true, displays skeleton placeholder. |
| *inherited* | `HTMLAttributes<HTMLDivElement>` | — | Native div props except children. |

### Example
```tsx
<Avatar src="/user.jpg" alt="User" size={AvatarSize.MD} shape={AvatarShape.CIRCULAR} online />
```

---

## 9. AvatarGroup

**Import:** `AvatarGroup`, `AvatarData` from `@juspay/blend-design-system`

### AvatarData (data shape for `avatars`)
Extends Avatar props with required `id`. Each item: `id`, `src?`, `alt?`, `fallback?`, `size?`, `shape?`, `online?`, `onlinePosition?`, `leadingSlot?`, `trailingSlot?` (no className/id).

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| avatars | `AvatarData[]` | Yes | List of avatar items (each must have id; rest same as Avatar). |
| maxCount | `number` | No | Max avatars shown; rest appear as overflow count (e.g. "+3"). |
| size | `AvatarSize` | No | Size applied to all avatars in the group. |
| shape | `AvatarShape` | No | Shape applied to all avatars. |
| selectedAvatarIds | `(string \| number)[]` | No | IDs of avatars that are selected (for selection UI). |
| onSelectionChange | `(selectedIds: (string \| number)[]) => void` | No | Called when selection changes. |
| skeleton | `{ show: boolean; variant?: SkeletonVariant }` | No | When show is true, displays skeleton for the group. |
| *inherited* | `HTMLAttributes<HTMLDivElement>` | — | Native div props except children. |

### Example dataset
```ts
const avatars: AvatarData[] = [
  { id: '1', src: '/a.jpg', alt: 'Alice' },
  { id: '2', src: '/b.jpg', alt: 'Bob' },
  { id: '3', fallback: 'C', alt: 'Carol' },
];
```

```tsx
<AvatarGroup avatars={avatars} maxCount={3} size={AvatarSize.MD} />
```

---

## 10. Modal

**Import:** `Modal` from `@juspay/blend-design-system`. Actions use Button-like props (text, buttonType, size, onClick, etc.; no buttonGroupPosition).

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| isOpen | `boolean` | Yes | Controls visibility of the modal. |
| onClose | `() => void` | Yes | Called when the modal should close (e.g. backdrop click, close button). |
| title | `string` | No | Header title text. |
| subtitle | `string` | No | Optional subtitle below the title. |
| children | `ReactNode` | Yes | Body content of the modal. |
| primaryAction | `ModalButtonAction` | No | Primary button (Button props minus buttonGroupPosition). |
| secondaryAction | `ModalButtonAction` | No | Secondary button (same shape). |
| showCloseButton | `boolean` | No | When true, shows a close button in the header. |
| showHeader | `boolean` | No | When true, header (title/subtitle) is visible. |
| showFooter | `boolean` | No | When true, footer with actions is visible. |
| closeOnBackdropClick | `boolean` | No | When true, clicking backdrop closes the modal. |
| customHeader | `ReactNode` | No | Replaces default header when provided. |
| customFooter | `ReactNode` | No | Replaces default footer when provided. |
| headerRightSlot | `ReactNode` | No | Content on the right side of the header. |
| showDivider | `boolean` | No | When true, shows divider below header. |
| minWidth | `string` | No | Minimum width (CSS value). |
| maxWidth | `string` | No | Maximum width (CSS value). |
| maxHeight | `string` | No | Maximum height (CSS value). |
| minHeight | `string` | No | Minimum height (CSS value). |
| useDrawerOnMobile | `boolean` | No | When true, renders as drawer on mobile. |
| isCustom | `boolean` | No | When true, uses custom layout (e.g. customHeader/customFooter). |
| skeleton | `ModalSkeletonProps` | No | show, variant, and optional bodySkeletonProps for loading state. |

### Example
```tsx
<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm"
  subtitle="This action cannot be undone."
  primaryAction={{ text: 'Confirm', buttonType: ButtonType.PRIMARY, onClick: handleConfirm }}
  secondaryAction={{ text: 'Cancel', buttonType: ButtonType.SECONDARY, onClick: () => setOpen(false) }}
>
  <p>Modal body content.</p>
</Modal>
```

---

## 11. Tooltip

**Import:** `Tooltip`, `TooltipSide`, `TooltipAlign`, `TooltipSize`, `TooltipSlotDirection` from `@juspay/blend-design-system`

### Enums
| Enum | Values | Description |
|------|--------|-------------|
| **TooltipSide** | `TOP` \| `RIGHT` \| `LEFT` \| `BOTTOM` | Side of the trigger where tooltip appears. |
| **TooltipAlign** | `START` \| `END` \| `CENTER` | Alignment along that side. |
| **TooltipSize** | `SMALL` ("sm") \| `LARGE` ("lg") | Size of the tooltip content. |
| **TooltipSlotDirection** | `LEFT` \| `RIGHT` | Direction of the optional slot relative to content. |

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | Yes | Trigger element (hover/focus shows tooltip). |
| content | `ReactNode \| string` | Yes | Content shown inside the tooltip. |
| open | `boolean` | No | Controlled open state. |
| side | `TooltipSide` | No | Preferred side (top, right, left, bottom). |
| align | `TooltipAlign` | No | Alignment (start, end, center). |
| showArrow | `boolean` | No | When true, shows arrow pointing to trigger. |
| size | `TooltipSize` | No | Size of the tooltip (sm or lg). |
| slot | `ReactNode` | No | Optional extra content (icon, etc.). |
| slotDirection | `TooltipSlotDirection` | No | Position of slot (left or right of content). |
| delayDuration | `number` | No | Delay (ms) before showing tooltip. |
| offset | `number` | No | Distance (px) between trigger and tooltip. |
| maxWidth | `string` | No | Maximum width (CSS value). |
| fullWidth | `boolean` | No | When true, tooltip can take full width of trigger. |
| disableInteractive | `boolean` | No | When true, tooltip may not stay open when hovering over it. |

### Example
```tsx
<Tooltip content="Save your changes" side={TooltipSide.TOP} align={TooltipAlign.CENTER}>
  <Button>Save</Button>
</Tooltip>
```

---

## 12. Accordion

**Import:** `Accordion`, `AccordionItem`, `AccordionType`, `AccordionChevronPosition` from `@juspay/blend-design-system`

### Enums
| Enum | Values | Description |
|------|--------|-------------|
| **AccordionType** | `BORDER` \| `NO_BORDER` | Whether items have borders. |
| **AccordionChevronPosition** | `LEFT` \| `RIGHT` | Position of the expand/collapse chevron. |

### Accordion (root) – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | Yes | One or more AccordionItem components. |
| accordionType | `AccordionType` | No | Visual type (border or no border). |
| defaultValue | `string \| string[]` | No | Initially expanded value(s) (uncontrolled). |
| value | `string \| string[]` | No | Controlled expanded value(s). |
| isMultiple | `boolean` | No | When true, multiple items can be expanded. |
| onValueChange | `(value: string \| string[]) => void` | No | Called when expanded value(s) change. |

### AccordionItem – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Unique value for this item. |
| title | `string` | Yes | Label shown in the trigger. |
| children | `ReactNode` | Yes | Content shown when expanded. |
| subtext | `string` | No | Optional text below the title. |
| leftSlot | `ReactNode` | No | Content before the title. |
| rightSlot | `ReactNode` | No | Content after the title (e.g. badge). |
| subtextSlot | `ReactNode` | No | Custom content in place of subtext. |
| triggerSlot | `ReactNode \| (props: SlotRenderProps) => ReactNode` | No | Custom trigger content or render function. |
| triggerSlotWidth | `string \| number` | No | Width for the trigger slot. |
| isDisabled | `boolean` | No | When true, item cannot be expanded. |
| chevronPosition | `AccordionChevronPosition` | No | Chevron position (left or right). |

### Example
```tsx
<Accordion accordionType={AccordionType.BORDER} defaultValue="a1">
  <AccordionItem value="a1" title="Section 1" subtext="Optional subtext">
    Content for section 1.
  </AccordionItem>
  <AccordionItem value="a2" title="Section 2">Content for section 2.</AccordionItem>
</Accordion>
```

---

## 13. Snackbar

**Import:** `Snackbar`, `addSnackbar`, `SnackbarVariant`, `SnackbarPosition` from `@juspay/blend-design-system`

### Enums
| Enum | Values | Description |
|------|--------|-------------|
| **SnackbarVariant** | `INFO` \| `SUCCESS` \| `WARNING` \| `ERROR` | Semantic variant (icon and color). |
| **SnackbarPosition** | `TOP_LEFT` \| `TOP_RIGHT` \| `BOTTOM_LEFT` \| `BOTTOM_RIGHT` \| `TOP_CENTER` \| `BOTTOM_CENTER` | Position of toasts on screen. |

### Snackbar (provider) – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| position | `SnackbarPosition` | No | Where toasts are stacked. |
| dismissOnClickAway | `boolean` | No | When true, clicking outside dismisses the toast. |

### AddToastOptions (for addSnackbar)
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| header | `string` | Yes | Main title of the toast. |
| description | `string` | No | Optional body text. |
| variant | `SnackbarVariant` | No | Semantic variant (info, success, warning, error). |
| onClose | `() => void` | No | Called when the toast is closed. |
| actionButton | `{ label: string; onClick: () => void; autoDismiss?: boolean }` | No | Optional action button; autoDismiss closes toast after click. |
| duration | `number` | No | Time (ms) before auto-dismiss. |
| position | `SnackbarPosition` | No | Override container position for this toast. |

### Example
```tsx
// Wrap app (or page) with Snackbar once
<Snackbar position={SnackbarPosition.BOTTOM_RIGHT} />

// Then anywhere:
import { addSnackbar } from '@juspay/blend-design-system';

addSnackbar({
  header: 'Saved',
  description: 'Your profile was updated.',
  variant: SnackbarVariant.SUCCESS,
  actionButton: { label: 'Undo', onClick: () => {} },
  duration: 5000,
});
```

---

## 14. Popover

**Import:** `Popover`, `PopoverSize` from `@juspay/blend-design-system`. Actions use Button-like props (no buttonGroupPosition or subType).

### Enums
| Enum | Values | Description |
|------|--------|-------------|
| **PopoverSize** | `SMALL` \| `MEDIUM` | Size of the popover content area. |

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| trigger | `React.ReactNode` | Yes | Element that opens the popover when clicked. |
| children | `React.ReactNode` | Yes | Content inside the popover. |
| heading | `string` | No | Optional heading text. |
| description | `string` | No | Optional description text. |
| showCloseButton | `boolean` | No | When true, shows a close button. |
| open | `boolean` | No | Controlled open state. |
| onOpenChange | `(open: boolean) => void` | No | Called when open state changes. |
| asModal | `boolean` | No | When true, behavior is modal (focus trap, etc.). |
| primaryAction | `PopoverActionType` | No | Primary button (Button props minus buttonGroupPosition, subType). |
| secondaryAction | `PopoverActionType` | No | Secondary button (same shape). |
| sideOffset | `number` | No | Distance (px) from trigger along side. |
| side | `'top' \| 'right' \| 'bottom' \| 'left'` | No | Preferred side of the trigger. |
| align | `'start' \| 'center' \| 'end'` | No | Alignment along that side. |
| alignOffset | `number` | No | Offset (px) along the align axis. |
| width | `number` | No | Fixed width (px). |
| minWidth | `number` | No | Minimum width (px). |
| maxWidth | `number` | No | Maximum width (px). |
| height | `number` | No | Fixed height (px). |
| minHeight | `number` | No | Minimum height (px). |
| maxHeight | `number` | No | Maximum height (px). |
| zIndex | `number` | No | z-index of the popover. |
| size | `PopoverSize` | No | Size variant (small or medium). |
| onClose | `() => void` | No | Called when popover closes. |
| shadow | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | No | Shadow size. |
| useDrawerOnMobile | `boolean` | No | When true, uses drawer on mobile. |
| avoidCollisions | `boolean` | No | When true, flips to stay in viewport. |
| skeleton | `PopoverSkeletonProps` | No | show, variant, bodySkeletonProps for loading state. |

### Example
```tsx
<Popover
  trigger={<Button>Open</Button>}
  heading="Info"
  description="Additional context here."
  side="bottom"
  align="start"
>
  <p>Popover body.</p>
</Popover>
```

---

## 15. Checkbox, Radio, Switch

### Checkbox
**Import:** `Checkbox`, `CheckboxSize`, `CheckboxCheckedState`, `CheckboxInteractionState` from `@juspay/blend-design-system`

#### Checkbox – Enums
| Enum | Values | Description |
|------|--------|-------------|
| **CheckboxSize** | `SMALL` \| `MEDIUM` | Size of the checkbox. |
| **CheckboxCheckedState** | `CHECKED` \| `UNCHECKED` \| `INDETERMINATE` | Checked state. |
| **CheckboxInteractionState** | `DEFAULT` \| `HOVER` \| `DISABLED` \| `ERROR` | Interaction state for styling. |

#### Checkbox – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| label | `string` | No | Label text next to the checkbox. |
| id | `string` | No | Id for the input (for label association). |
| name | `string` | No | Name attribute. |
| checked | `boolean \| 'indeterminate'` | No | Controlled checked state. |
| defaultChecked | `boolean` | No | Initial checked state (uncontrolled). |
| onCheckedChange | `(checked: boolean \| 'indeterminate') => void` | No | Called when checked state changes. |
| disabled | `boolean` | No | When true, checkbox is disabled. |
| required | `boolean` | No | When true, marks as required. |
| error | `boolean` | No | When true, shows error styling. |
| size | `CheckboxSize` | No | Size (sm or md). |
| children | `ReactNode` | No | Alternative to label (custom content). |
| subtext | `string` | No | Helper text below the label. |
| slot | `ReactNode` | No | Optional slot (e.g. icon). |
| maxLength | `{ label?: number; subtext?: number }` | No | Max character lengths for label/subtext truncation. |

### Radio & RadioGroup
**Import:** `Radio`, `RadioGroup`, `RadioSize` from `@juspay/blend-design-system`

#### Radio – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| id | `string` | No | Id for the input. |
| value | `string` | No | Value when selected. |
| checked | `boolean` | No | Controlled checked state. |
| defaultChecked | `boolean` | No | Initial checked state. |
| onChange | `(e: React.ChangeEvent<HTMLInputElement>) => void` | No | Called when selection changes. |
| disabled | `boolean` | No | When true, radio is disabled. |
| required | `boolean` | No | When true, marks as required. |
| error | `boolean` | No | When true, shows error styling. |
| size | `RadioSize` | No | Size (sm or md). |
| children | `ReactNode` | No | Label content. |
| subtext | `string` | No | Helper text. |
| slot | `ReactNode` | No | Optional slot. |
| name | `string` | No | Name (usually set by RadioGroup). |
| maxLength | `{ label?: number; subtext?: number }` | No | Max lengths for truncation. |

#### RadioGroup – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| id | `string` | No | Id for the group. |
| label | `string` | No | Group label. |
| name | `string` | Yes | Name shared by all radios. |
| defaultValue | `string` | No | Initial selected value (uncontrolled). |
| value | `string` | No | Controlled selected value. |
| children | `ReactNode` | Yes | One or more Radio components. |
| onChange | `(value: string) => void` | No | Called when selection changes. |
| disabled | `boolean` | No | When true, all radios disabled. |
| required | `boolean` | No | When true, one selection required. |
| error | `boolean` | No | When true, shows error styling. |

### Switch & SwitchGroup
**Import:** `Switch`, `SwitchGroup`, `SwitchSize` from `@juspay/blend-design-system`

#### Switch – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| id | `string` | No | Id for the input. |
| checked | `boolean` | No | Controlled checked state. |
| defaultChecked | `boolean` | No | Initial state (uncontrolled). |
| onChange | `(checked: boolean) => void` | No | Called when toggled. |
| disabled | `boolean` | No | When true, switch is disabled. |
| required | `boolean` | No | When true, marks as required. |
| error | `boolean` | No | When true, shows error styling. |
| size | `SwitchSize` | No | Size (sm or md). |
| label | `string` | No | Label text. |
| subtext | `string` | No | Helper text. |
| slot | `ReactNode` | No | Optional slot. |
| name | `string` | No | Name attribute. |
| value | `string` | No | Value when on. |
| maxLength | `{ label?: number; subtext?: number }` | No | Max lengths for truncation. |

#### SwitchGroup – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| id | `string` | No | Id for the group. |
| label | `string` | No | Group label. |
| name | `string` | No | Name for the group. |
| children | `ReactNode` | Yes | One or more Switch components. |
| disabled | `boolean` | No | When true, all switches disabled. |
| value | `string[]` | No | Controlled array of on-values. |
| defaultValue | `string[]` | No | Initial on-values (uncontrolled). |
| onChange | `(value: string[]) => void` | No | Called when any switch toggles. |

### Example
```tsx
<Checkbox label="Accept terms" checked={checked} onCheckedChange={setChecked} size={CheckboxSize.MEDIUM} />

<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <Radio value="free" /> Free
  <Radio value="pro" /> Pro
</RadioGroup>

<Switch label="Enable" checked={on} onChange={setOn} size={SwitchSize.MEDIUM} />
```

---

## 16. Charts

**Import:** `Charts`, `ChartType`, `ChartLegendPosition`, `AxisType`, `AxisIntervalType`, `LegendsChangeType` from `@juspay/blend-design-system`

### Enums
| Enum | Values | Description |
|------|--------|-------------|
| **ChartType** | `LINE` \| `BAR` \| `PIE` \| `SCATTER` \| `AREA` \| `SANKEY` | Type of chart. |
| **ChartLegendPosition** | `TOP` \| `RIGHT` | Position of the legend. |
| **AxisType** | `DATE_TIME` \| `CURRENCY` \| `PERCENTAGE` \| `NUMBER` | Format/type of axis values. |
| **AxisIntervalType** | `PRESERVE_START` \| `PRESERVE_END` \| `PRESERVE_START_END` | How axis intervals are preserved. |
| **LegendsChangeType** | `INCREASE` \| `DECREASE` | Change direction for stacked legends. |

### Data shape: NewNestedDataPoint
```ts
type DataPoint = {
  primary: { label: string; val: number };
  aux?: { label: string; val: number; type?: AxisType; dateOnly?: boolean; smart?: boolean; timeZone?: string; hour12?: boolean }[];
  error?: { title: string; errorData?: { label: string; value: string }[] };
};

type NewNestedDataPoint = {
  name: string;  // series name
  data: { [key: string]: DataPoint };  // key = x-axis value (e.g. date)
};
```

### Example dataset
```ts
const chartData: NewNestedDataPoint[] = [
  {
    name: 'Revenue',
    data: {
      'Jan': { primary: { label: 'Jan', val: 4000 } },
      'Feb': { primary: { label: 'Feb', val: 3000 } },
      'Mar': { primary: { label: 'Mar', val: 5000 } },
    },
  },
  {
    name: 'Expenses',
    data: {
      'Jan': { primary: { label: 'Jan', val: 2400 } },
      'Feb': { primary: { label: 'Feb', val: 1398 } },
      'Mar': { primary: { label: 'Mar', val: 3800 } },
    },
  },
];

const colors = [
  { key: 'Revenue', color: '#2B7FFF' },
  { key: 'Expenses', color: '#FF6B6B' },
];
```

### Charts – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| chartType | `ChartType` | No | Type of chart (line, bar, pie, scatter, area, sankey). |
| data | `NewNestedDataPoint[]` | Yes | Chart data: array of { name, data: { [xKey]: DataPoint } }. |
| colors | `{ key: string; color: string }[]` | No | Map of series key to color. |
| slot1 | `ReactNode` | No | Header slot 1. |
| slot2 | `ReactNode` | No | Header slot 2. |
| slot3 | `ReactNode` | No | Header slot 3. |
| chartHeaderSlot | `ReactNode` | Yes | Main chart header content. |
| legendPosition | `ChartLegendPosition` | No | Position of legend (top or right). |
| stackedLegends | `boolean` | No | When true, legends use stacked layout. |
| stackedLegendsData | `StackedLegendsDataPoint[]` | No | Data for stacked legend (value, delta, changeType). |
| barsize | `number` | No | Bar width for bar charts. |
| xAxis | `XAxisConfig` | No | X-axis config (label, type, tickFormatter, etc.). |
| yAxis | `YAxisConfig` | No | Y-axis config (same shape). |
| tooltip | `TooltipConfig` | No | Tooltip position and behavior. |
| noData | `NoDataProps` | No | Title, subtitle, slot, button when there is no data. |
| height | `number` | No | Chart height (px). |
| showHeader | `boolean` | No | When true, header is visible. |
| showCollapseIcon | `boolean` | No | When true, shows expand/collapse icon. |
| isExpanded | `boolean` | No | Controlled expanded state. |
| onExpandedChange | `(isExpanded: boolean) => void` | No | Called when expanded state changes. |
| chartName | `string` | No | Name used for accessibility/labels. |
| skeleton | `ChartsSkeletonProps` | No | show and variant for loading state. |
| legends | `{ title: string; total?: string }[]` | No | Legend items with optional total. |
| CustomizedDot | `(props: DotItemDotProps) => ReactElement<SVGElement>` | No | Custom dot component for line/area charts. |

### Example
```tsx
<Charts
  chartType={ChartType.LINE}
  data={chartData}
  colors={colors}
  chartHeaderSlot={<span>Monthly comparison</span>}
  legendPosition={ChartLegendPosition.TOP}
  xAxis={{ type: AxisType.NUMBER }}
  yAxis={{ type: AxisType.NUMBER }}
/>
```

---

## 17. DateRangePicker

**Import:** `DateRangePicker`, `DateRange`, `DateRangePreset`, `DateRangePickerSize`, `DateFormatPreset`, `PresetsConfig`, etc. from `@juspay/blend-design-system`

### Enums
| Enum | Values | Description |
|------|--------|-------------|
| **DateRangePreset** | `CUSTOM`, `TODAY`, `YESTERDAY`, `LAST_7_DAYS`, `LAST_30_DAYS`, `THIS_MONTH`, `LAST_MONTH`, and more | Predefined range options. |
| **DateRangePickerSize** | `SMALL` \| `MEDIUM` \| `LARGE` | Size of the trigger/picker. |
| **DateFormatPreset** | `SHORT_RANGE`, `MEDIUM_RANGE`, `LONG_RANGE`, `SHORT_SINGLE`, `ISO_RANGE`, `US_RANGE`, `CUSTOM` | How the range is formatted. |

### DateRange type
```ts
type DateRange = {
  startDate: Date;
  endDate?: Date;
  showTimePicker?: boolean;
};
```

### DateRangePicker – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `DateRange` | No | Selected range (controlled). |
| onChange | `(range: DateRange) => void` | No | Called when range changes. |
| onPresetSelection | `(data: PresetSelectionData) => void` | No | Called when a preset is selected. |
| showDateTimePicker | `boolean` | No | When true, shows time picker. |
| showPresets | `boolean` | No | When true, shows preset options. |
| customPresets | `PresetsConfig` | No | Presets to show (DateRangePreset[], or custom config/definitions). |
| placeholder | `string` | No | Placeholder when no range selected. |
| isDisabled | `boolean` | No | When true, picker is disabled. |
| icon | `ReactNode` | No | Optional icon in trigger. |
| minDate | `Date` | No | Minimum selectable date. |
| maxDate | `Date` | No | Maximum selectable date. |
| dateFormat | `string` | No | Date format string. |
| allowSingleDateSelection | `boolean` | No | When true, allows selecting a single date. |
| isSingleDatePicker | `boolean` | No | When true, only single date (no range). |
| disableFutureDates | `boolean` | No | When true, future dates disabled. |
| disablePastDates | `boolean` | No | When true, past dates disabled. |
| hideFutureDates | `boolean` | No | When true, future dates hidden. |
| hidePastDates | `boolean` | No | When true, past dates hidden. |
| customDisableDates | `(date: Date) => boolean` | No | Custom function to disable specific dates. |
| customRangeConfig | `CustomRangeConfig` | No | Custom range calculation (fixed days, reference range, etc.). |
| triggerElement | `ReactNode` | No | Custom trigger element. |
| useDrawerOnMobile | `boolean` | No | When true, uses drawer on mobile. |
| skipQuickFiltersOnMobile | `boolean` | No | When true, skips quick filters on mobile. |
| size | `DateRangePickerSize` | No | Size (sm, md, lg). |
| formatConfig | `DateFormatConfig` | No | Preset or custom format (preset, customFormat, includeTime, etc.). |
| triggerConfig | `TriggerConfig` | No | Custom trigger (element, placeholder, renderTrigger, etc.). |
| maxMenuHeight | `number` | No | Max height of the dropdown (px). |
| showPreset | `boolean` | No | When true, shows preset section. |
| timezone | `string` | No | IANA timezone (e.g. "America/New_York") for all date/time. |

### Example
```tsx
const [range, setRange] = useState<DateRange | undefined>();

<DateRangePicker
  value={range}
  onChange={setRange}
  placeholder="Select date range"
  showPresets
  customPresets={[DateRangePreset.LAST_7_DAYS, DateRangePreset.LAST_30_DAYS]}
  size={DateRangePickerSize.MEDIUM}
/>
```

---

## 18. StatCard

**Import:** `StatCard`, `StatCardVariant`, `ChangeType`, `StatCardArrowDirection`, `StatCardDirection` from `@juspay/blend-design-system`

### Enums
| Enum | Values | Description |
|------|--------|-------------|
| **StatCardVariant** | `LINE` \| `PROGRESS_BAR` \| `BAR` \| `NUMBER` | How the stat is displayed (chart, progress, or number). |
| **ChangeType** | `INCREASE` \| `DECREASE` | Direction of change indicator. |
| **StatCardArrowDirection** | `UP` \| `DOWN` | Arrow direction for change. |
| **StatCardDirection** | `VERTICAL` \| `HORIZONTAL` | Layout direction of the card. |

### StatCard – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | `string` | Yes | Card title. |
| value | `string \| number` | Yes | Main value (e.g. "$12,450"). |
| valueTooltip | `ReactNode` | No | Tooltip content for the value. |
| change | `StatCardChange \| null \| undefined` | No | Change indicator: value, valueType (increase/decrease), arrowDirection?, tooltip?. |
| subtitle | `string` | No | Subtitle below value. |
| variant | `StatCardVariant` | Yes | Variant: line, progress bar, bar, or number. |
| chartData | `ChartDataPoint[]` | No | Data for line/bar: { value, name }[]. |
| progressValue | `number` | No | Progress 0–100 for progress variant. |
| titleIcon | `ReactNode` | No | Icon next to title. |
| actionIcon | `ReactNode` | No | Action icon (e.g. dropdown). |
| helpIconText | `string` | No | Tooltip for help icon. |
| dropdownProps | `SingleSelectProps` | No | Props for dropdown when using actionIcon. |
| maxWidth | `string` | No | Max width (CSS). |
| minWidth | `string` | No | Min width (CSS). |
| xAxis | `StatCardAxisConfig` | No | X-axis config for chart. |
| yAxis | `StatCardAxisConfig` | No | Y-axis config for chart. |
| valueFormatter | `AxisType` | No | Format type for value. |
| height | `string` | No | Card height (CSS). |
| direction | `StatCardDirection` | No | Layout direction (vertical or horizontal). |
| skeleton | `StatCardSkeletonProps` | No | show, variant, height, maxWidth, minWidth for loading. |
| dataDisplay | `boolean` | No | When true, shows data display mode. |
| showBorder | `boolean` | No | When true, shows border. |

### Example dataset
```ts
const chartData = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 65 },
  { name: 'Wed', value: 52 },
];
```

```tsx
<StatCard
  title="Total Revenue"
  value="$12,450"
  change={{ value: 12.5, valueType: ChangeType.INCREASE, arrowDirection: StatCardArrowDirection.UP }}
  variant={StatCardVariant.LINE}
  chartData={chartData}
  direction={StatCardDirection.VERTICAL}
/>
```

---

## 19. Card

**Import:** `Card`, `CardVariant`, `CardAlignment`, `ButtonProps` from `@juspay/blend-design-system`

### Enums
- **CardVariant:** `DEFAULT` \| `ALIGNED` \| `CUSTOM`
- **CardAlignment:** `VERTICAL` \| `HORIZONTAL`

### Card – Props (union by variant)
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| maxWidth | `string` | No | Maximum width (CSS). |
| maxHeight | `string` | No | Maximum height (CSS). |
| minHeight | `string` | No | Minimum height (CSS). |
| skeleton | `CardSkeletonProps` | No | variant, show, height?, width? for loading state. |
| **Default variant** | | | |
| variant | `CardVariant.DEFAULT` | No | Omit or use DEFAULT. |
| headerSlot1 | `ReactNode` | No | Left header slot. |
| headerTitle | `string` | No | Header title. |
| headerTag | `ReactNode` | No | Tag/badge in header. |
| headerSlot2 | `ReactNode` | No | Right header slot. |
| subHeader | `string` | No | Subheader text. |
| bodySlot1 | `ReactNode` | No | Left body slot. |
| bodyTitle | `string` | No | Body section title. |
| content | `ReactNode` | No | Main body content. |
| bodySlot2 | `ReactNode` | No | Right body slot. |
| actionButton | `ButtonProps` | No | Footer action button. |
| **Aligned variant** | | | |
| variant | `CardVariant.ALIGNED` | Yes | Use ALIGNED. |
| alignment | `CardAlignment` | Yes | Vertical or horizontal layout. |
| centerAlign | `boolean` | No | When true, content is center-aligned. |
| cardSlot | `ReactNode` | No | Main slot for aligned content. |
| headerTitle, headerTag, headerSlot2, subHeader, bodySlot1, bodyTitle, content, actionButton | (same as above) | No | Same as default. |
| **Custom variant** | | | |
| variant | `CardVariant.CUSTOM` | Yes | Use CUSTOM. |
| children | `ReactNode` | Yes | Custom content. |

### Example
```tsx
<Card
  headerTitle="Card title"
  subHeader="Optional subheader"
  content={<p>Body content.</p>}
  actionButton={{ text: 'Action', buttonType: ButtonType.PRIMARY, onClick: () => {} }}
/>
```

---

## 20. Inputs

**Import from** `@juspay/blend-design-system`: `TextInput`, `NumberInput`, `TextArea`, `SearchInput`, `OTPInput`, `DropdownInput`, `UnitInput`, `MultiValueInput`, plus size/state enums per component.

### TextInput – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| label | `string` | No | Label above the input. |
| sublabel | `string` | No | Secondary label. |
| hintText | `string` | No | Helper text below. |
| helpIconHintText | `string` | No | Tooltip for help icon. |
| error | `boolean` | No | When true, shows error state. |
| errorMessage | `string` | No | Error message text. |
| size | `TextInputSize` | No | Size (sm, md, lg). |
| leftSlot | `ReactNode` | No | Content before input. |
| rightSlot | `ReactNode` | No | Content after input. |
| value | `string` | Yes | Controlled value. |
| onChange | `(e: React.ChangeEvent<HTMLInputElement>) => void` | Yes | Called when value changes. |
| onBlur | `(e: React.FocusEvent<HTMLInputElement>) => void` | No | Blur handler. |
| onFocus | `(e: React.FocusEvent<HTMLInputElement>) => void` | No | Focus handler. |
| cursor | `'text' \| 'pointer' \| 'default' \| 'not-allowed'` | No | Cursor style. |
| passwordToggle | `boolean` | No | When true, shows show/hide password toggle. |
| textInputGroupPosition | `TextInputGroupPosition` | No | Position when in a group (center, left, right). |
| *inherited* | `React.InputHTMLAttributes` (omit size, style, className, onBlur, onFocus) | — | placeholder, disabled, etc. |

### NumberInput – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `number \| null` | Yes | Controlled value. |
| onChange | `(e: React.ChangeEvent<HTMLInputElement>) => void` | Yes | Called when value changes. |
| step | `number` | No | Step for increment/decrement. |
| error | `boolean` | No | When true, shows error state. |
| errorMessage | `string` | No | Error message. |
| size | `NumberInputSize` | No | Size (md or lg). |
| label | `string` | No | Label. |
| sublabel | `string` | No | Sublabel. |
| helpIconHintText | `string` | No | Help icon tooltip. |
| hintText | `string` | No | Helper text. |
| preventNegative | `boolean` | No | When true, disallows negative values. |
| onBlur | `(e: React.FocusEvent<HTMLInputElement>) => void` | No | Blur handler. |
| onFocus | `(e: React.FocusEvent<HTMLInputElement>) => void` | No | Focus handler. |
| *inherited* | `React.InputHTMLAttributes` (omit size, style, className, value, onBlur, onFocus) | — | min, max, disabled, etc. |

### TextArea – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Controlled value. |
| placeholder | `string` | Yes | Placeholder text. |
| onChange | `(e: React.ChangeEvent<HTMLTextAreaElement>) => void` | Yes | Called when value changes. |
| onFocus | `(e: React.FocusEvent<HTMLTextAreaElement>) => void` | No | Focus handler. |
| onBlur | `(e: React.FocusEvent<HTMLTextAreaElement>) => void` | No | Blur handler. |
| rows | `number` | No | Number of visible rows. |
| cols | `number` | No | Number of columns. |
| label | `string` | No | Label. |
| sublabel | `string` | No | Sublabel. |
| hintText | `string` | No | Helper text. |
| helpIconHintText | `string` | No | Help icon tooltip. |
| helpIconText | `string` | No | Help text. |
| required | `boolean` | No | When true, marks as required. |
| error | `boolean` | No | Error state. |
| errorMessage | `string` | No | Error message. |
| resize | `'none' \| 'both' \| 'horizontal' \| 'vertical' \| 'block' \| 'inline'` | No | Resize behavior. |
| wrap | `CSSObject['whiteSpace']` | No | White-space/wrap behavior. |
| disabled | `boolean` | No | When true, textarea is disabled. |
| autoFocus | `boolean` | No | When true, focuses on mount. |
| *inherited* | `React.TextareaHTMLAttributes` (omit size, style, className, onFocus, onBlur) | — | Other textarea props. |

### SearchInput – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| leftSlot | `ReactNode` | No | Content before input. |
| rightSlot | `ReactNode` | No | Content after input. |
| value | `string` | No | Controlled value. |
| onChange | `(e: React.ChangeEvent<HTMLInputElement>) => void` | No | Called when value changes. |
| error | `boolean` | No | Error state. |
| allowClear | `boolean` | No | When true, shows clear button. |
| onClear | `() => void` | No | Called when clear is clicked. |
| clearIcon | `ReactNode` | No | Custom clear icon. |
| *inherited* | `React.InputHTMLAttributes` (omit size, style, className) | — | placeholder, disabled, etc. |

### OTPInput – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| label | `string` | No | Label. |
| sublabel | `string` | No | Sublabel. |
| helpIconHintText | `string` | No | Help icon tooltip. |
| error | `boolean` | No | Error state. |
| errorMessage | `string` | No | Error message. |
| hintText | `string` | No | Helper text. |
| value | `string` | No | OTP value (controlled). |
| length | `number` | No | Number of OTP digits. |
| autoFocus | `boolean` | No | When true, focuses on mount. |
| onChange | `(value: string) => void` | No | Called when OTP value changes. |
| form | `string` | No | Form id. |
| placeholder | `string` | No | Placeholder. |
| *inherited* | `React.InputHTMLAttributes` (omit size, style, className, onChange) | — | Other input props. |

### DropdownInput – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| label | `string` | No | Label. |
| sublabel | `string` | No | Sublabel. |
| helpIconHintText | `string` | No | Help icon tooltip. |
| error | `boolean` | No | Error state. |
| errorMessage | `string` | No | Error message. |
| hintText | `string` | No | Helper text. |
| value | `string` | No | Text input value. |
| onChange | `(e: React.ChangeEvent<HTMLInputElement>) => void` | No | Text input change handler. |
| slot | `ReactNode` | No | Optional slot. |
| size | `TextInputSize` | No | Size (sm, md, lg). |
| dropDownValue | `string` | No | Selected dropdown value (display). |
| onDropDownChange | `(value: string) => void` | No | Called when dropdown selection changes. |
| dropDownItems | `SelectMenuGroupType[]` | Yes | Options (same shape as SingleSelect groups). |
| dropdownName | `string` | No | Name for dropdown. |
| onDropdownOpen | `() => void` | No | Called when dropdown opens. |
| onDropdownClose | `() => void` | No | Called when dropdown closes. |
| dropdownPosition | `DropdownPosition` | No | Left or right. |
| maxMenuHeight | `number` | No | Max dropdown height (px). |
| minMenuWidth | `number` | No | Min dropdown width (px). |
| maxMenuWidth | `number` | No | Max dropdown width (px). |
| onBlur | `(e: React.FocusEvent<HTMLInputElement>) => void` | No | Blur handler. |
| onFocus | `(e: React.FocusEvent<HTMLInputElement>) => void` | No | Focus handler. |
| *inherited* | `React.InputHTMLAttributes` (omit size, style, className, onBlur, onFocus, slot) | — | Other input props. |

### Example (TextInput)
```tsx
<TextInput
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  size={TextInputSize.MEDIUM}
  error={!!errors.email}
  errorMessage={errors.email}
/>
```

---

## 21. Menu

**Import:** `Menu`, `MenuAlignment`, `MenuSide`, `MenuItemVariant`, `MenuItemActionType`, `MenuGroupType`, `MenuItemType` from `@juspay/blend-design-system`

### Enums
- **MenuAlignment:** `START` \| `CENTER` \| `END`
- **MenuSide:** `TOP` \| `LEFT` \| `RIGHT` \| `BOTTOM`
- **MenuItemVariant:** `DEFAULT` \| `ACTION`
- **MenuItemActionType:** `PRIMARY` \| `DANGER`

### MenuItemType
```ts
type MenuItemType = {
  label: string;
  subLabel?: string;
  slot1?–slot4?: ReactNode;
  variant?: MenuItemVariant;
  actionType?: MenuItemActionType;
  disabled?: boolean;
  onClick?: () => void;
  subMenu?: MenuItemType[];
  enableSubMenuSearch?: boolean;
  subMenuSearchPlaceholder?: string;
  tooltip?: string | ReactNode;
  tooltipProps?: { side?, align?, size?, showArrow?, delayDuration?, offset? };
  enableSubMenuVirtualScrolling?: boolean;
  subMenuVirtualItemHeight?: number;
  subMenuVirtualOverscan?: number;
  subMenuVirtualScrollThreshold?: number;
};

type MenuGroupType = { label?: string; items: MenuItemType[]; showSeparator?: boolean };
```

### Example dataset
```ts
const menuItems: MenuGroupType[] = [
  {
    label: 'Actions',
    items: [
      { label: 'Edit', onClick: () => {} },
      { label: 'Duplicate', subLabel: 'Copy this item', onClick: () => {} },
      { label: 'Delete', variant: MenuItemVariant.ACTION, actionType: MenuItemActionType.DANGER, onClick: () => {} },
    ],
    showSeparator: true,
  },
];
```

### Menu – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| trigger | `React.ReactNode` | Yes | Element that opens the menu (e.g. Button). |
| items | `MenuGroupType[]` | No | Groups of menu items (label?, items, showSeparator?). |
| maxHeight | `number` | No | Max height of menu (px). |
| minHeight | `number` | No | Min height (px). |
| maxWidth | `number` | No | Max width (px). |
| minWidth | `number` | No | Min width (px). |
| enableSearch | `boolean` | No | When true, shows search inside menu. |
| searchPlaceholder | `string` | No | Placeholder for search input. |
| enableVirtualScrolling | `boolean` | No | When true, virtualizes long lists. |
| virtualItemHeight | `number \| ((item: MenuItemType, index: number) => number)` | No | Height per item (or function). |
| virtualOverscan | `number` | No | Overscan count for virtualization. |
| virtualScrollThreshold | `number` | No | Threshold to enable virtual scroll. |
| open | `boolean` | No | Controlled open state. |
| onOpenChange | `(open: boolean) => void` | No | Called when open state changes. |
| asModal | `boolean` | No | When true, menu is modal. |
| alignment | `MenuAlignment` | No | Alignment (start, center, end). |
| side | `MenuSide` | No | Side of trigger (top, left, right, bottom). |
| sideOffset | `number` | No | Distance from trigger (px). |
| alignOffset | `number` | No | Offset along align axis (px). |
| collisonBoundaryRef | `Element \| null \| Array<Element \| null>` | No | Boundary for collision detection. |
| skeleton | `MenuSkeletonProps` | No | count?, show?, variant? for loading state. |

```tsx
<Menu trigger={<Button>Open menu</Button>} items={menuItems} side={MenuSide.BOTTOM} />
```

---

## 22. DataTable

**Import:** `DataTable`, `ColumnType`, `SortDirection`, `FilterType`, `ColumnDefinition`, `SortConfig`, `PaginationConfig`, `RowActionsConfig`, etc. from `@juspay/blend-design-system`

### Enums
| Enum | Values | Description |
|------|--------|-------------|
| **ColumnType** | `TEXT`, `NUMBER`, `AVATAR`, `TAG`, `PROGRESS`, `DROPDOWN`, `REACT_ELEMENT`, `SELECT`, `MULTISELECT`, `DATE`, `DATE_RANGE`, `SLIDER`, `CUSTOM` | Cell type and rendering. |
| **SortDirection** | `NONE`, `ASCENDING`, `DESCENDING` | Sort direction. |
| **FilterType** | `TEXT`, `NUMBER`, `SELECT`, `MULTISELECT`, `DATE`, `BOOLEAN`, `SLIDER` | Filter input type for column. |

### Row type (generic)
- **data:** T[] where T extends Record<string, unknown>
- **columns:** ColumnDefinition<T>[]
- **idField:** keyof T (unique row id)

### Column definitions (examples)
- **TEXT:** type: ColumnType.TEXT, field, header, renderCell?: (value, row, index) => ReactNode
- **NUMBER:** type: ColumnType.NUMBER, field, header, format?: 'integer'|'decimal'|'currency'|'percentage', precision?, renderCell?
- **AVATAR:** type: ColumnType.AVATAR, field (value: AvatarColumnProps), header, renderCell?
- **TAG:** type: ColumnType.TAG, field (value: TagColumnProps), header, renderCell?
- **PROGRESS:** type: ColumnType.PROGRESS, field (value: ProgressColumnProps), header, renderCell?
- **DATE:** type: ColumnType.DATE, field (value: DateColumnProps), header, dateFormat?, showTime?, renderCell?
- **REACT_ELEMENT:** type: ColumnType.REACT_ELEMENT, renderCell (required), isSortable: false

Base column: **field**, **header**, **headerSubtext?**, **minWidth?**, **maxWidth?**, **width?**, **isVisible?**, **isSortable?**, **isEditable?**, **filterOptions?**, **canHide?**, **frozen?**, **filterType?**, **getSortField?**, **isDeltaSortable?**, **sortValueFormatter?**

### Example dataset and columns
```ts
type Row = { id: string; name: string; email: string; role: string; amount: number };

const data: Row[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Admin', amount: 1200 },
  { id: '2', name: 'Bob', email: 'bob@example.com', role: 'User', amount: 800 },
];

const columns: ColumnDefinition<Row>[] = [
  { field: 'name', header: 'Name', type: ColumnType.TEXT },
  { field: 'email', header: 'Email', type: ColumnType.TEXT },
  { field: 'role', header: 'Role', type: ColumnType.TEXT },
  { field: 'amount', header: 'Amount', type: ColumnType.NUMBER, format: 'currency' },
];
```

### DataTable – Props (generic T extends Record<string, unknown>)
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| data | `T[]` | Yes | Array of row data. |
| columns | `ColumnDefinition<T>[]` | Yes | Column definitions (field, header, type, etc.). |
| idField | `keyof T` | Yes | Field name that uniquely identifies each row. |
| title | `string` | No | Table title. |
| description | `string` | No | Table description. |
| descriptionTooltipProps | `{ side?, align?, size?, showArrow?, delayDuration?, offset? }` | No | Tooltip props for description. |
| className | `string` | No | CSS class for the table container. |
| isHoverable | `boolean` | No | When true, rows show hover state. |
| defaultSort | `SortConfig` | No | Initial sort (field, direction, sortType?). |
| onSortChange | `(sortConfig: SortConfig) => void` | No | Called when sort changes. |
| enableSearch | `boolean` | No | When true, shows search. |
| searchPlaceholder | `string` | No | Search input placeholder. |
| serverSideSearch | `boolean` | No | When true, search is handled server-side. |
| onSearchChange | `(searchConfig: SearchConfig) => void` | No | Called when search changes. |
| enableFiltering | `boolean` | No | When true, enables column filters. |
| enableAdvancedFilter | `boolean` | No | When true, shows advanced filter UI. |
| advancedFilterComponent | `ComponentType<AdvancedFilterProps>` | No | Custom advanced filter component. |
| advancedFilters | `unknown[]` | No | Advanced filter values. |
| serverSideFiltering | `boolean` | No | When true, filtering is server-side. |
| onFilterChange | `(filters: ColumnFilter[]) => void` | No | Called when column filters change. |
| onAdvancedFiltersChange | `(filters: unknown[]) => void` | No | Called when advanced filters change. |
| columnFreeze | `number` | No | Number of columns to freeze (left). |
| enableColumnManager | `boolean` | No | When true, user can show/hide columns. |
| enableColumnReordering | `boolean` | No | When true, columns can be reordered. |
| onColumnReorder | `(columns: ColumnDefinition<T>[]) => void` | No | Called when column order changes. |
| columnManagerMaxSelections | `number` | No | Max columns selectable in manager. |
| columnManagerAlwaysSelected | `(keyof T)[]` | No | Columns that cannot be hidden. |
| columnManagerPrimaryAction | `{ text, onClick, disabled?, loading? }` | No | Primary action in column manager. |
| columnManagerSecondaryAction | `{ text, onClick, disabled?, loading? }` | No | Secondary action. |
| columnManagerWidth | `number` | No | Width of column manager (px). |
| pagination | `PaginationConfig` | No | currentPage, pageSize, totalRows, pageSizeOptions?. |
| serverSidePagination | `boolean` | No | When true, pagination is server-side. |
| onPageChange | `(page: number) => void` | No | Called when page changes. |
| onPageSizeChange | `(pageSize: number) => void` | No | Called when page size changes. |
| isLoading | `boolean` | No | When true, shows loading state. |
| showSkeleton | `boolean` | No | When true, shows skeleton. |
| skeletonVariant | `SkeletonVariant` | No | Skeleton variant. |
| isRowLoading | `(row: T, index: number) => boolean` | No | Per-row loading indicator. |
| showHeader | `boolean` | No | When true, table header is visible. |
| showToolbar | `boolean` | No | When true, toolbar (search, etc.) is visible. |
| showSettings | `boolean` | No | When true, settings (e.g. column manager) visible. |
| showFooter | `boolean` | No | When true, footer (e.g. pagination) visible. |
| headerSlot1 | `ReactNode` | No | Extra header slot 1. |
| headerSlot2 | `ReactNode` | No | Extra header slot 2. |
| enableInlineEdit | `boolean` | No | When true, cells are editable inline. |
| onRowSave | `(rowId: unknown, updatedRow: T) => void` | No | Called when inline edit is saved. |
| onRowCancel | `(rowId: unknown) => void` | No | Called when inline edit is cancelled. |
| onRowClick | `(row: T, index: number) => void` | No | Called when a row is clicked. |
| onFieldChange | `(rowId: unknown, fieldName: keyof T, value: unknown) => void` | No | Called when a field value changes (inline edit). |
| enableRowExpansion | `boolean` | No | When true, rows can expand. |
| renderExpandedRow | `(props: { row, index, isExpanded, toggleExpansion }) => ReactNode` | No | Renders expanded content. |
| isRowExpandable | `(row: T, index: number) => boolean` | No | Whether a row can expand. |
| onRowExpansionChange | `(rowId: unknown, isExpanded: boolean, rowData: T) => void` | No | Called when expansion toggles. |
| enableRowSelection | `boolean` | No | When true, rows can be selected. |
| onRowSelectionChange | `(selectedRowIds: string[], isSelected: boolean, rowId: string, rowData: T) => void` | No | Called when selection changes. |
| bulkActions | `BulkActionsConfig` | No | showSelectAll?, showDeselectAll?, onSelectAll?, onDeselectAll?, customActions?, showExport?. |
| rowActions | `RowActionsConfig<T>` | No | showEditAction?, slot1?, slot2? (per-row action buttons). |
| getRowStyle | `(row: T, index: number) => React.CSSProperties` | No | Custom style per row. |
| tableBodyHeight | `string \| number` | No | Height of table body (CSS or px). |
| mobileColumnsToShow | `number` | No | Number of columns to show on mobile. |

### Example
```tsx
<DataTable
  data={data}
  columns={columns}
  idField="id"
  title="Users"
  enableSearch
  pagination={{ currentPage: 1, pageSize: 10, totalRows: data.length }}
/>
```

---

## 23. Sidebar

**Import:** `Sidebar`, `LeftPanelInfo`, `DirectoryData`, `SidebarMerchantInfo` from `@juspay/blend-design-system`

**Topbar:** The `topbar` prop accepts any `ReactNode`. You can pass a custom header (e.g. a simple `<header>` with logo and title). The package also includes a `Topbar` component (in `components/Topbar`); it is not re-exported from the main entry, so use the `topbar` prop with your own header for simplicity.

### Sidebar – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | Yes | Main content (e.g. page content). |
| data | `DirectoryData[]` | Yes | Navigation data (same shape as Directory). |
| topbar | `ReactNode` | Yes | Top bar component. |
| showLeftPanel | `boolean` | No | When true, shows left panel (e.g. tenant switcher). |
| leftPanel | `LeftPanelInfo` | No | items, selected, onSelect, tenantSlot1?, tenantSlot2?, tenantFooter?. |
| footer | `ReactNode` | No | Footer content. |
| sidebarTopSlot | `ReactNode` | No | Slot at top of sidebar. |
| sidebarCollapseKey | `string` | No | Storage key for collapse state. |
| merchantInfo | `SidebarMerchantInfo` | No | Merchant/tenant info for panel. |
| rightActions | `ReactNode` | No | Actions on the right of topbar. |
| enableTopbarAutoHide | `boolean` | No | When true, topbar auto-hides on scroll. |
| isTopbarVisible | `boolean` | No | Controlled topbar visibility. |
| onTopbarVisibilityChange | `(isVisible: boolean) => void` | No | Called when topbar visibility changes. |
| defaultIsTopbarVisible | `boolean` | No | Initial topbar visibility. |
| isExpanded | `boolean` | No | Controlled sidebar expanded state. |
| onExpandedChange | `(isExpanded: boolean) => void` | No | Called when expanded state changes. |
| onSidebarStateChange | `(state: 'collapsed' \| 'expanded' \| 'intermediate') => void` | No | Called when sidebar state changes. |
| defaultIsExpanded | `boolean` | No | Initial expanded state. |
| panelOnlyMode | `boolean` | No | When true, only left panel is shown (no nav). |
| disableIntermediateState | `boolean` | No | When true, no intermediate width state. |
| iconOnlyMode | `boolean` | No | When true, sidebar shows only icons. |
| hideOnIconOnlyToggle | `boolean` | No | When true, hides sidebar on icon-only toggle. |
| showPrimaryActionButton | `boolean` | No | When true, shows primary action button. |
| primaryActionButtonProps | `React.ButtonHTMLAttributes<HTMLButtonElement>` (omit type) | No | Props for primary action button. |
| activeItem | `string \| null` | No | Controlled active nav item. |
| onActiveItemChange | `(item: string \| null) => void` | No | Called when active item changes. |
| defaultActiveItem | `string \| null` | No | Initial active item. |
| onHoveringChange | `(isHovering: boolean) => void` | No | Called when hover state changes. |

### Next.js App Router integration

- **Client-only:** Blend Sidebar (and ThemeProvider) should run only on the client to avoid SSR errors. Use a client component that loads the Sidebar with `dynamic(..., { ssr: false })` so the layout stays a server component.
- **Layout structure:** In the root layout, wrap `{children}` with a client wrapper (e.g. `AppShell`) that dynamically imports a `SidebarLayout` component. Inside `SidebarLayout`, wrap with `ThemeProvider`, then render `<Sidebar data={...} topbar={...}>{children}</Sidebar>`.
- **Navigation data:** Build `DirectoryData[]` from your routes. Set `href` on each `NavbarItem` and `isSelected: pathname === href`. Use `defaultActiveItem={pathname}` (or `activeItem` + `onActiveItemChange`) so the active nav item matches the current route.
- **Client-side navigation:** `NavbarItem.onClick` is `() => void`. To use Next.js client-side navigation, pass `onClick: () => router.push(href)` so clicks navigate without a full reload. Still set `href` for accessibility and fallback.

### LeftPanelInfo (for leftPanel)
```ts
type LeftPanelItem = { label: string; icon: ReactNode; value?: string; showInPanel?: boolean };
type LeftPanelInfo = {
  items: LeftPanelItem[];
  selected: string;
  onSelect: (value: string) => void;
  tenantSlot1?, tenantSlot2?, tenantFooter?;
};
```

### Topbar (optional; for topbar prop)

The package includes a `Topbar` component (not re-exported from the main entry). If you need its API for a custom build, the types are:

| Prop | Type | Description |
|------|------|-------------|
| children | `ReactNode` | No | Custom content. |
| isExpanded | `boolean` | No | Sidebar expansion state. |
| onToggleExpansion | `() => void` | No | Toggle sidebar expand/collapse. |
| showToggleButton | `boolean` | No | Show sidebar toggle button. |
| panelOnlyMode | `boolean` | No | When true, hides toggle (panel only mode). |
| isVisible | `boolean` | No | Controlled topbar visibility. |
| onVisibilityChange | `(visible: boolean) => void` | No | Called when visibility changes. |
| defaultIsVisible | `boolean` | No | Initial visibility (default true). |
| topbar | `ReactNode` | No | Custom topbar content. |
| leftAction | `ReactNode` | No | Left-side action. |
| rightActions | `ReactNode` | No | Right-side actions. |
| showBackButton | `boolean` | No | Show back button. |
| onBackClick | `() => void` | No | Back button click handler. |
| leftPanel | `LeftPanelInfo` | No | Left panel config. |
| merchantInfo | `MerchantInfo` | No | Merchant/tenant info. |
| ariaControls | `string` | No | ARIA controls ID for sidebar nav. |

For most apps, passing a simple custom `ReactNode` (e.g. `<header>...</header>`) as the Sidebar `topbar` prop is enough.

---

## 24. Directory

**Import:** `Directory`, `DirectoryData`, `NavbarItem` from `@juspay/blend-design-system`

### Data types
```ts
type NavbarItem = {
  label: string;
  items?: NavbarItem[];
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onClick?: () => void;   // no event arg; use for client-side nav e.g. () => router.push(href)
  href?: string;
  isSelected?: boolean;
  showOnMobile?: boolean; // when true, item appears in Sidebar mobile nav drawer
};

type DirectoryData = {
  label?: string;
  items?: NavbarItem[];
  isCollapsible?: boolean;
  defaultOpen?: boolean;
};
```

### Example dataset
```ts
const directoryData: DirectoryData[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Analytics', href: '/analytics', items: [{ label: 'Reports', href: '/analytics/reports' }] },
    ],
    defaultOpen: true,
  },
];
```

### Directory – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| directoryData | `DirectoryData[]` | Yes | Navigation tree (label?, items?, isCollapsible?, defaultOpen?). |
| idPrefix | `string` | No | Prefix for generated ids (accessibility). |
| activeItem | `string \| null` | No | Controlled active item value. |
| onActiveItemChange | `(item: string \| null) => void` | No | Called when active item changes. |
| defaultActiveItem | `string \| null` | No | Initial active item. |
| iconOnlyMode | `boolean` | No | When true, shows only icons (e.g. in collapsed sidebar). |

---

## 25. SingleSelect

**Import:** `SingleSelect`, `SelectMenuSize`, `SelectMenuVariant`, `SelectMenuAlignment`, `SelectMenuSide`, `SelectMenuGroupType`, `SelectMenuItemType` from `@juspay/blend-design-system`

### Data types
```ts
type SelectMenuItemType = {
  label: string;
  value: string;
  checked?: boolean;
  subLabel?: string;
  slot1?–slot4?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  subMenu?: SelectMenuItemType[];
  tooltip?: string | ReactNode;
  tooltipProps?: { side?, align?, size?, showArrow?, delayDuration?, offset? };
  disableTruncation?: boolean;
};

type SelectMenuGroupType = { groupLabel?: string; items: SelectMenuItemType[]; showSeparator?: boolean };
```

### Example dataset
```ts
const selectItems: SelectMenuGroupType[] = [
  { groupLabel: 'Options', items: [{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }] },
];
```

### SingleSelect – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| placeholder | `string` | Yes | Placeholder when nothing selected. |
| items | `SelectMenuGroupType[]` | Yes | Options (groupLabel?, items, showSeparator?). |
| selected | `string` | Yes | Currently selected value. |
| onSelect | `(value: string) => void` | Yes | Called when selection changes. |
| label | `string` | No | Label above the select. |
| sublabel | `string` | No | Sublabel. |
| hintText | `string` | No | Helper text. |
| required | `boolean` | No | When true, marks as required. |
| helpIconText | `string` | No | Help icon tooltip. |
| size | `SelectMenuSize` | No | Size (sm, md, lg). |
| variant | `SelectMenuVariant` | No | Container or no-container. |
| enableSearch | `boolean` | No | When true, menu has search. |
| searchPlaceholder | `string` | No | Search input placeholder. |
| slot | `ReactNode` | No | Optional slot. |
| disabled | `boolean` | No | When true, select is disabled. |
| name | `string` | No | Form name. |
| customTrigger | `ReactNode` | No | Custom trigger element. |
| useDrawerOnMobile | `boolean` | No | When true, uses drawer on mobile. |
| alignment | `SelectMenuAlignment` | No | Menu alignment (start, center, end). |
| side | `SelectMenuSide` | No | Menu side (top, left, right, bottom). |
| sideOffset | `number` | No | Distance from trigger (px). |
| alignOffset | `number` | No | Align offset (px). |
| minMenuWidth | `number` | No | Min menu width (px). |
| maxMenuWidth | `number` | No | Max menu width (px). |
| maxMenuHeight | `number` | No | Max menu height (px). |
| inline | `boolean` | No | When true, inline layout. |
| onBlur | `() => void` | No | Blur handler. |
| onFocus | `() => void` | No | Focus handler. |
| error | `boolean` | No | Error state. |
| errorMessage | `string` | No | Error message. |
| fullWidth | `boolean` | No | When true, trigger is full width. |
| enableVirtualization | `boolean` | No | When true, virtualizes list. |
| virtualListItemHeight | `number` | No | Item height for virtualization. |
| virtualListOverscan | `number` | No | Overscan count. |
| onEndReached | `() => void` | No | Called when list end is reached (infinite load). |
| endReachedThreshold | `number` | No | Threshold for onEndReached. |
| hasMore | `boolean` | No | Whether more items can be loaded. |
| loadingComponent | `ReactNode` | No | Shown when loading more. |
| skeleton | `SingleSelectSkeletonProps` | No | count?, show?, variant? for loading. |
| maxTriggerWidth | `number` | No | Max trigger width (px). |
| minTriggerWidth | `number` | No | Min trigger width (px). |
| allowCustomValue | `boolean` | No | When true, user can enter custom value. |
| customValueLabel | `string` | No | Label for custom value option. |
| allowDeselect | `boolean` | No | When true, selection can be cleared. |
| singleSelectGroupPosition | `'center' \| 'left' \| 'right'` | No | Position of the select group. |

```tsx
<SingleSelect
  placeholder="Choose one"
  items={selectItems}
  selected={selected}
  onSelect={setSelected}
  size={SelectMenuSize.MEDIUM}
/>
```

---

## 26. MultiSelect

**Import:** `MultiSelect`, `MultiSelectVariant`, `MultiSelectMenuSize`, `MultiSelectMenuAlignment`, `MultiSelectMenuSide`, `MultiSelectSelectionTagType`, `MultiSelectMenuGroupType`, `MultiSelectMenuItemType` from `@juspay/blend-design-system`

### Data types
Same idea as SingleSelect: **MultiSelectMenuItemType** (label, value, checked?, subLabel?, slot1–4?, disabled?, subMenu?, tooltip?, etc.), **MultiSelectMenuGroupType** (groupLabel?, items, showSeparator?).

### MultiSelect – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| label | `string` | Yes | Label above the select. |
| placeholder | `string` | Yes | Placeholder when nothing selected. |
| items | `MultiSelectMenuGroupType[]` | Yes | Options (groupLabel?, items, showSeparator?). |
| selectedValues | `string[]` | Yes | Currently selected values. |
| onChange | `(selectedValue: string) => void` | Yes | Toggles one value (add/remove from selection). |
| sublabel | `string` | No | Sublabel. |
| disabled | `boolean` | No | When true, select is disabled. |
| helpIconHintText | `string` | No | Help icon tooltip. |
| name | `string` | No | Form name. |
| required | `boolean` | No | When true, marks as required. |
| variant | `MultiSelectVariant` | No | Container or no-container. |
| selectionTagType | `MultiSelectSelectionTagType` | No | How to show selection (count or text). |
| slot | `ReactNode` | No | Optional slot. |
| hintText | `string` | No | Helper text. |
| size | `MultiSelectMenuSize` | No | Size (sm, md, lg). |
| enableSearch | `boolean` | No | When true, menu has search. |
| searchPlaceholder | `string` | No | Search placeholder. |
| enableSelectAll | `boolean` | No | When true, shows select all. |
| selectAllText | `string` | No | Label for select all. |
| maxSelections | `number` | No | Maximum number of selections. |
| customTrigger | `ReactNode` | No | Custom trigger. |
| useDrawerOnMobile | `boolean` | No | When true, uses drawer on mobile. |
| maxTriggerWidth | `number` | No | Max trigger width (px). |
| minTriggerWidth | `number` | No | Min trigger width (px). |
| minMenuWidth | `number` | No | Min menu width (px). |
| maxMenuWidth | `number` | No | Max menu width (px). |
| maxMenuHeight | `number` | No | Max menu height (px). |
| alignment | `MultiSelectMenuAlignment` | No | Menu alignment. |
| side | `MultiSelectMenuSide` | No | Menu side. |
| sideOffset | `number` | No | Distance from trigger (px). |
| alignOffset | `number` | No | Align offset (px). |
| inline | `boolean` | No | Inline layout. |
| onBlur | `() => void` | No | Blur handler. |
| onFocus | `() => void` | No | Focus handler. |
| onOpenChange | `(open: boolean) => void` | No | Called when menu open state changes. |
| error | `boolean` | No | Error state. |
| errorMessage | `string` | No | Error message. |
| showActionButtons | `boolean` | No | When true, shows Apply/Cancel etc. in menu. |
| primaryAction | `{ text, onClick, disabled?, loading? }` | No | Primary action in menu. |
| secondaryAction | `{ text, onClick, disabled?, loading? }` | No | Secondary action. |
| showItemDividers | `boolean` | No | When true, shows dividers between items. |
| showHeaderBorder | `boolean` | No | When true, header has border. |
| fullWidth | `boolean` | No | Full width trigger. |
| enableVirtualization | `boolean` | No | Virtualize long lists. |
| virtualListItemHeight | `number` | No | Item height for virtualization. |
| virtualListOverscan | `number` | No | Overscan count. |
| itemsToRender | `number` | No | Number of items to render (virtualization). |
| onEndReached | `() => void` | No | Called when list end reached. |
| endReachedThreshold | `number` | No | Threshold for onEndReached. |
| hasMore | `boolean` | No | Whether more items can be loaded. |
| loadingComponent | `ReactNode` | No | Shown when loading. |
| skeleton | `MultiSelectSkeletonProps` | No | count?, show?, variant? for loading. |
| allowCustomValue | `boolean` | No | Allow user to add custom value. |
| customValueLabel | `string` | No | Label for custom value. |
| showClearButton | `boolean` | No | When true, shows clear selection button. |
| onClearAllClick | `() => void` | No | Called when clear is clicked. |
| height | `number` | No | Height of trigger/container (px). |
| multiSelectGroupPosition | `'center' \| 'left' \| 'right'` | No | Position of the select group. |

### Example dataset
```ts
const multiItems: MultiSelectMenuGroupType[] = [
  { items: [{ label: 'Tag 1', value: 't1' }, { label: 'Tag 2', value: 't2' }] },
];
```

```tsx
<MultiSelect
  label="Tags"
  placeholder="Select tags"
  items={multiItems}
  selectedValues={selected}
  onChange={(v) => setSelected(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])}
/>
```

---

## 27. Slider

**Import:** `Slider`, `SliderVariant`, `SliderSize`, `SliderValueType`, `SliderValueFormatConfig`, `SliderLabelPosition` from `@juspay/blend-design-system`

### Enums
- **SliderVariant:** `PRIMARY` \| `SECONDARY`
- **SliderSize:** `SMALL` \| `MEDIUM` \| `LARGE`
- **SliderValueType:** `NUMBER` \| `PERCENTAGE` \| `DECIMAL`

### Slider – Props
Extends native range input; supports value, min, max, step, onChange, etc.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| variant | `SliderVariant` | No | Primary or secondary style. |
| size | `SliderSize` | No | Size (sm, md, lg). |
| valueFormat | `SliderValueFormatConfig` | No | type (number/percentage/decimal), decimalPlaces?, prefix?, suffix?, showLabels?, formatter?. |
| showValueLabels | `boolean` | No | When true, shows value labels. |
| labelPosition | `'top' \| 'bottom' \| 'inline'` | No | Where value/labels appear. |

### Example
```tsx
<Slider
  variant={SliderVariant.PRIMARY}
  size={SliderSize.MEDIUM}
  valueFormat={{ type: SliderValueType.PERCENTAGE, suffix: '%' }}
  min={0}
  max={100}
  value={value}
  onChange={(e) => setValue(Number(e.target.value))}
/>
```

---

## 28. ProgressBar

**Import:** `ProgressBar`, `ProgressBarSize`, `ProgressBarVariant`, `ProgressBarType` from `@juspay/blend-design-system`

### Enums
- **ProgressBarSize:** `SMALL` \| `MEDIUM` \| `LARGE`
- **ProgressBarVariant:** `SOLID` \| `SEGMENTED` \| `CIRCULAR`
- **ProgressBarType:** `SOLID` \| `SEGMENTED`

### ProgressBar – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `number` | Yes | Current progress value (typically 0–100). |
| size | `ProgressBarSize` | No | Size (sm, md, lg). |
| variant | `ProgressBarVariant` | No | Solid, segmented, or circular. |
| type | `ProgressBarType` | No | Solid or segmented (for bar variant). |
| showLabel | `boolean` | No | When true, shows value label. |
| min | `number` | No | Minimum value (default 0). |
| max | `number` | No | Maximum value (default 100). |

### Example
```tsx
<ProgressBar value={65} size={ProgressBarSize.MEDIUM} variant={ProgressBarVariant.SOLID} showLabel />
```

---

## 29. Drawer

**Import:** `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerFooter`, `DrawerClose`, `StatusDrawer`, `SelectDrawer`, `SelectDrawerGroup`, `SelectDrawerItem` from `@juspay/blend-design-system`

### Drawer (root) – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| open | `boolean` | No | Controlled open state. |
| onOpenChange | `(open: boolean) => void` | No | Called when open state changes. |
| direction | `'top' \| 'bottom' \| 'left' \| 'right'` | No | Direction drawer slides in (default bottom). |
| modal | `boolean` | No | When true, drawer is modal with overlay (default true). |
| dismissible | `boolean` | No | When true, can dismiss by clicking outside (default true). |
| showHandle | `boolean` | No | When true, shows drag handle (bottom/top only, default true). |
| handle | `ReactNode` | No | Custom handle element. |
| nested | `boolean` | No | When true, drawer is nested (stacking). |
| snapPoints | `(string \| number)[]` | No | Snap points for bottom/top drawers. |
| activeSnapPoint | `number \| string \| null` | No | Current snap point (controlled). |
| onSnapPointChange | `(activeSnapPoint: number \| string \| null) => void` | No | Called when snap point changes. |
| fadeFromIndex | `number` | No | Index from which to fade content. |
| snapToSequentialPoint | `boolean` | No | When true, only sequential snap navigation (default false). |
| disableDrag | `boolean` | No | When true, dragging is disabled. |
| mobileOffset | `{ top?, bottom?, left?, right? }` | No | Custom offsets (CSS) on mobile. |
| children | `ReactNode` | Yes | Drawer content (use DrawerContent, DrawerHeader, etc.). |

### StatusDrawer – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| open | `boolean` | No | Open state. |
| onOpenChange | `(open: boolean) => void` | No | Called when open state changes. |
| heading | `string` | Yes | Heading text. |
| description | `string` | Yes | Description text. |
| primaryButtonProps | `ButtonProps` | Yes | Primary action button. |
| secondaryButtonProps | `ButtonProps` | No | Secondary action button. |
| slot | `ReactNode` | Yes | 56×56px slot (e.g. icon). |
| direction | `DrawerDirection` | No | Slide direction (default bottom). |
| modal | `boolean` | No | Modal behavior (default true). |
| dismissible | `boolean` | No | Dismiss on outside click (default true). |
| mobileOffset | `{ top?, bottom?, left?, right? }` | No | Mobile offsets. |
| className | `string` | No | Class for content. |
| style | `React.CSSProperties` | No | Inline styles for content. |

### SelectDrawer – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| open | `boolean` | No | Open state. |
| onOpenChange | `(open: boolean) => void` | No | Called when open state changes. |
| heading | `string` | Yes | Heading text. |
| description | `string` | No | Description text. |
| rightSlot | `ReactNode` | No | 14×14px slot (e.g. icon). |
| items | `SelectDrawerGroup[]` | Yes | Groups (groupLabel?, items, showSeparator?). |
| selectedValues | `string[]` | No | Selected values (multi-select). |
| selectedValue | `string` | No | Selected value (single-select). |
| onSelectionChange | `(selectedValues: string[]) => void` | No | Multi-select change. |
| onValueChange | `(value: string) => void` | No | Single-select change. |
| enableSearch | `boolean` | No | When true, shows search (default true). |
| searchPlaceholder | `string` | No | Search placeholder (default "Search"). |
| multiSelect | `boolean` | No | When true, multi-select (default true). |
| cancelText | `string` | No | Cancel button text (default "Clear All"). |
| confirmText | `string` | No | Confirm button text (default "Done"). |
| onCancel | `() => void` | No | Cancel handler. |
| onConfirm | `() => void` | No | Confirm handler. |
| showCancelButton | `boolean` | No | When true, shows cancel (default true). |
| direction | `DrawerDirection` | No | Slide direction. |
| modal | `boolean` | No | Modal behavior. |
| dismissible | `boolean` | No | Dismiss on outside click. |
| mobileOffset | `object` | No | Mobile offsets. |
| className | `string` | No | Class for content. |
| style | `React.CSSProperties` | No | Inline styles. |

### SelectDrawerItem – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Unique value. |
| label | `string` | Yes | Display label. |
| subLabel | `string` | No | Subtitle. |
| slot1 | `ReactNode` | No | Left slot (e.g. icon). |
| disabled | `boolean` | No | When true, item is disabled. |

### Example (StatusDrawer)
```tsx
<StatusDrawer
  open={open}
  onOpenChange={setOpen}
  heading="Delete item?"
  description="This cannot be undone."
  slot={<Icon />}
  primaryButtonProps={{ text: 'Delete', buttonType: ButtonType.DANGER, onClick: handleDelete }}
  secondaryButtonProps={{ text: 'Cancel', buttonType: ButtonType.SECONDARY, onClick: () => setOpen(false) }}
/>
```

---

## 30. Stepper

**Import:** `Stepper`, `Step`, `SubStep`, `StepState`, `StepperType` from `@juspay/blend-design-system`

### Enums
- **StepState:** `COMPLETED` \| `CURRENT` \| `PENDING` \| `DISABLED` \| `SKIPPED`
- **StepperType:** `HORIZONTAL` \| `VERTICAL`

### Data types
```ts
type SubStep = { id: number; title: string; status?: StepState; disabled?: boolean };

type Step = {
  id: number;
  title: string;
  status?: StepState;
  disabled?: boolean;
  description?: string;
  icon?: ReactNode;
  substeps?: SubStep[];
  isExpandable?: boolean;
  isExpanded?: boolean;
};
```

### Example dataset
```ts
const steps: Step[] = [
  { id: 1, title: 'Details', status: StepState.COMPLETED, description: 'Enter details' },
  { id: 2, title: 'Review', status: StepState.CURRENT, description: 'Review and submit' },
  { id: 3, title: 'Done', status: StepState.PENDING },
];
```

### Stepper – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| steps | `Step[]` | Yes | Array of steps (id, title, status?, disabled?, description?, icon?, substeps?, isExpandable?, isExpanded?). |
| onStepClick | `(stepIndex: number) => void` | No | Called when a step is clicked. |
| onSubstepClick | `(stepId: number, substepIndex: number) => void` | No | Called when a substep is clicked. |
| clickable | `boolean` | No | When true, steps are clickable. |
| stepperType | `StepperType` | No | Horizontal or vertical layout. |

```tsx
<Stepper steps={steps} stepperType={StepperType.HORIZONTAL} onStepClick={(i) => {}} />
```

---

## 31. Skeleton

**Import:** `Skeleton`, `SkeletonAvatar`, `SkeletonCard`, `SkeletonVariant`, `SkeletonShape` from `@juspay/blend-design-system`

### Types
- **SkeletonVariant:** 'pulse' \| 'wave' \| 'shimmer'
- **SkeletonShape:** 'rectangle' \| 'circle' \| 'rounded'

### Skeleton – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| variant | `SkeletonVariant` | No | Animation variant (pulse, wave, shimmer). |
| loading | `boolean` | No | When true, shows skeleton (hides children). |
| animate | `boolean` | No | When true, animation is enabled. |
| width | `string \| number` | No | Width (CSS or number). |
| height | `string \| number` | No | Height (CSS or number). |
| maxHeight | `string \| number` | No | Max height. |
| minHeight | `string \| number` | No | Min height. |
| maxWidth | `string \| number` | No | Max width. |
| minWidth | `string \| number` | No | Min width. |
| shape | `SkeletonShape` | No | rectangle, circle, or rounded. |
| children | `ReactNode` | No | Content shown when not loading. |
| *BlockProps* | (omit children) | — | Layout props from Block. |

### SkeletonAvatar – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | No | Avatar size. |
| shape | `'circle' \| 'square'` | No | Shape. |
| variant | `SkeletonVariant` | No | Animation variant. |
| loading | `boolean` | No | When true, shows skeleton. |

### SkeletonCard – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | No | Content when not loading. |
| padding | `string \| number` | No | Card padding. |
| variant | `SkeletonVariant` | No | Animation variant. |
| loading | `boolean` | No | When true, shows skeleton. |

### Example
```tsx
<Skeleton width={200} height={24} variant="wave" />
<SkeletonAvatar size="md" shape="circle" />
```

---

## 32. KeyValuePair

**Import:** `KeyValuePair`, `KeyValuePairSize`, `KeyValuePairStateType`, `TextOverflowMode` from `@juspay/blend-design-system`

### Enums
- **KeyValuePairSize:** `SMALL` \| `MEDIUM` \| `LARGE`
- **KeyValuePairStateType:** vertical (0) \| horizontal (1)

### KeyValuePair – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| keyString | `string` | Yes | Label/key text. |
| value | `string` | No | Value text. |
| size | `KeyValuePairSize` | No | Size (sm, md, lg). |
| keySlot | `ReactNode` | No | Custom content for key. |
| valueLeftSlot | `ReactNode` | No | Content before value. |
| valueRightSlot | `ReactNode` | No | Content after value. |
| keyValuePairState | `KeyValuePairStateType` | No | vertical (0) or horizontal (1) layout. |
| maxWidth | `string` | No | Max width (CSS). |
| textOverflow | `'truncate' \| 'wrap' \| 'wrap-clamp'` | No | How text overflows (default truncate). |
| maxLines | `number` | No | Max lines when textOverflow is wrap-clamp (default 2). |
| showTooltipOnTruncate | `boolean` | No | When true, show tooltip when truncated (default true). |

### Example
```tsx
<KeyValuePair keyString="Email" value="user@example.com" size={KeyValuePairSize.MEDIUM} />
```

---

## 33. VirtualList

**Import:** `VirtualList`, `VirtualListItem`, `VirtualListRenderParams`, `VirtualListRef` from `@juspay/blend-design-system`

### Data type
- **VirtualListItem:** { id: string | number; [key: string]: unknown }
- Items array: T[] where T has at least **id**

### VirtualList – Props (generic T)
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `T[]` | Yes | Array of items (each must have id if VirtualListItem). |
| renderItem | `(params: { item: T; index: number }) => ReactNode` | Yes | Renders each item. |
| height | `number \| string` | No | Height of the scroll container. |
| itemHeight | `number` | No | Height of each item (px) for virtualization. |
| overscan | `number` | No | Number of items to render outside viewport. |
| onScroll | `(scrollTop: number) => void` | No | Called when scroll position changes. |
| onEndReached | `() => void` | No | Called when user scrolls near end. |
| endReachedThreshold | `number` | No | Distance from end to trigger onEndReached. |
| isLoading | `boolean` | No | When true, shows loading state. |
| hasMore | `boolean` | No | Whether more items can be loaded. |
| className | `string` | No | CSS class for container. |
| style | `React.CSSProperties` | No | Inline styles for container. |

### Example dataset
```ts
const items = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
];
```

```tsx
<VirtualList
  items={items}
  renderItem={({ item }) => <div>{item.name}</div>}
  height={400}
  itemHeight={48}
  onEndReached={() => loadMore()}
  hasMore={hasMore}
/>
```

---

## 34. Upload

**Import:** `Upload`, `UploadState`, `UploadFile`, `UploadedFileWithStatus`, `FileRejection`, `UploadFormValue` from `@juspay/blend-design-system`

### Enums / types
- **UploadState:** `IDLE` \| `UPLOADING` \| `SUCCESS` \| `ERROR`
- **UploadFormValue:** File | File[] | null
- **UploadFile:** { file: File; progress: number; status: UploadState; id: string; error?: string }
- **UploadedFileWithStatus:** { file: File; id: string; status: 'success'|'error'; error?: string }
- **FileRejection:** { file: File; errors: { code: string; message: string }[] }

### Upload – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| multiple | `boolean` | No | When true, allows multiple files. |
| accept | `string[]` | No | Accepted file types (e.g. ['.pdf', 'image/*']). |
| maxSize | `number` | No | Max file size in bytes. |
| maxFiles | `number` | No | Max number of files (when multiple). |
| disabled | `boolean` | No | When true, upload is disabled. |
| required | `boolean` | No | When true, marks as required. |
| label | `string` | No | Label above the upload. |
| sublabel | `string` | No | Sublabel. |
| helpIconHintText | `string` | No | Help icon tooltip. |
| children | `ReactNode` | No | Custom drop zone content. |
| description | `string` | No | Description text. |
| className | `string` | No | CSS class. |
| errorText | `string` | No | Error message. |
| state | `UploadState` | No | Override state (idle, uploading, success, error). |
| uploadingFiles | `UploadFile[]` | No | Files currently uploading. |
| uploadedFiles | `UploadedFileWithStatus[]` | No | Successfully uploaded files. |
| failedFiles | `UploadedFileWithStatus[]` | No | Files that failed. |
| enforceFileTypeConsistency | `boolean` | No | When true, enforces same type for all files. |
| progressSpeed | `number` | No | Simulated progress speed. |
| value | `File \| File[] \| null` | No | Controlled value. |
| onChange | `(value: UploadFormValue) => void` | No | Called when value changes. |
| onDrop | `(acceptedFiles: File[], fileRejections: FileRejection[]) => void` | No | Called when files are dropped. |
| onDropAccepted | `(files: File[]) => void` | No | Called with accepted files only. |
| onDropRejected | `(fileRejections: FileRejection[]) => void` | No | Called with rejected files. |
| onFileRemove | `(fileId: string) => void` | No | Called when a file is removed. |
| onReplaceFile | `() => void` | No | Called when file is replaced (single mode). |
| onStateChange | `(stateInfo: { state, hasError, hasSuccess, hasUploading, errorFiles, successfulFiles }) => void` | No | Called when upload state changes. |
| isDragActive | `boolean` | No | Controlled drag-active state. |
| isDragAccept | `boolean` | No | Controlled drag-accept state. |
| isDragReject | `boolean` | No | Controlled drag-reject state. |
| validator | `(file: File) => FileRejection['errors'][0] \| null` | No | Custom file validation. |
| actionSlot | `ReactNode` | No | Slot for action (e.g. button). |
| *inherited* | `React.HTMLAttributes<HTMLDivElement>` (omit onDrop, onDragOver, onDragLeave, onChange) | — | Other div props. |

### Example
```tsx
<Upload
  label="Document"
  multiple
  accept={['.pdf', '.doc']}
  maxSize={5 * 1024 * 1024}
  value={files}
  onChange={setFiles}
  onDropAccepted={(files) => console.log('Accepted', files)}
/>
```

---

## 35. ChatInput

**Import:** `ChatInput`, `AttachedFile`, `TopQuery` from `@juspay/blend-design-system`

### Data types
```ts
type AttachedFile = { id: string; name: string; type: 'image'|'pdf'|'csv'|'text'|'other'; size?: number; url?: string; preview?: string };
type TopQuery = { id: string; text: string };
```

### ChatInput – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | No | Controlled message value. |
| onChange | `(value: string) => void` | No | Called when message text changes. |
| onSend | `(message: string, files: AttachedFile[]) => void` | No | Called when send is triggered. |
| onAttachFiles | `(files: File[]) => void` | No | Called when files are attached. |
| onFileRemove | `(fileId: string) => void` | No | Called when attached file is removed. |
| onFileClick | `(file: AttachedFile) => void` | No | Called when attached file is clicked. |
| placeholder | `string` | No | Placeholder for textarea. |
| disabled | `boolean` | No | When true, input is disabled. |
| maxLength | `number` | No | Max character length. |
| autoResize | `boolean` | No | When true, textarea auto-resizes. |
| attachedFiles | `AttachedFile[]` | No | Currently attached files. |
| topQueries | `TopQuery[]` | No | Suggested queries shown above input. |
| onTopQuerySelect | `(query: TopQuery) => void` | No | Called when a top query is selected. |
| topQueriesMaxHeight | `number` | No | Max height for top queries list. |
| slot1 | `ReactNode` | No | Optional slot. |
| attachButtonIcon | `ReactNode` | No | Custom attach button icon. |
| voiceButtonIcon | `ReactNode` | No | Custom voice button icon. |
| sendButtonIcon | `ReactNode` | No | Custom send button icon. |
| overflowMenuProps | `Partial<MenuProps>` | No | Props for overflow menu. |
| *inherited* | `React.TextareaHTMLAttributes` (omit onChange, value) | — | rows, etc. |

### Example dataset (topQueries)
```ts
const topQueries: TopQuery[] = [
  { id: '1', text: 'What is my balance?' },
  { id: '2', text: 'Recent transactions' },
];
```

```tsx
<ChatInput
  value={message}
  onChange={setMessage}
  onSend={(msg, files) => {}}
  placeholder="Type a message..."
  topQueries={topQueries}
  onTopQuerySelect={(q) => setMessage(q.text)}
/>
```

---

## 36. CodeBlock & CodeEditor

### CodeBlock
**Import:** `CodeBlock`, `CodeBlockVariant`, `DiffLineType`, `DiffLine`, `SupportedLanguage` from `@juspay/blend-design-system`

**SupportedLanguage:** 'javascript'|'typescript'|'jsx'|'tsx'|'json'|'css'|'html'|'markdown'|'yaml'|'python'|'rust'|'haskell'

### CodeBlock – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| code | `string` | Yes | Code string to display. |
| variant | `CodeBlockVariant` | No | default, no-gutter, or diff. |
| showLineNumbers | `boolean` | No | When true, shows line numbers. |
| showHeader | `boolean` | No | When true, shows header. |
| header | `string` | No | Header text. |
| headerLeftSlot | `ReactNode` | No | Content before header text. |
| headerRightSlot | `ReactNode` | No | Content after header text. |
| diffLines | `DiffLine[]` | No | For diff variant: { content, type: ADDED \| REMOVED \| UNCHANGED }[]. |
| showCopyButton | `boolean` | No | When true, shows copy button. |
| autoFormat | `boolean` | No | When true, auto-formats code. |
| language | `SupportedLanguage` | No | Language for syntax highlighting. |

**DiffLine:** `{ content: string; type: DiffLineType.ADDED | REMOVED | UNCHANGED }`

```tsx
<CodeBlock code="const x = 1;" language="typescript" showLineNumbers showCopyButton />
```

### CodeEditor
**Import:** `CodeEditor`, `CodeEditorVariant` from `@juspay/blend-design-system`

### CodeEditor – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Code value (controlled). |
| onChange | `(value: string) => void` | No | Called when value changes. |
| variant | `CodeEditorVariant` | No | default or no-gutter. |
| showLineNumbers | `boolean` | No | When true, shows line numbers. |
| showHeader | `boolean` | No | When true, shows header. |
| header | `string` | No | Header text. |
| headerLeftSlot | `ReactNode` | No | Content before header text. |
| headerRightSlot | `ReactNode` | No | Content after header text. |
| showLeftIcon | `boolean` | No | When true, shows default left icon (default true). |
| showCopyButton | `boolean` | No | When true, shows copy button. |
| language | `SupportedLanguage` | No | Language for syntax highlighting. |
| placeholder | `string` | No | Placeholder when empty. |
| readOnly | `boolean` | No | When true, editor is read-only. |
| disabled | `boolean` | No | When true, editor is disabled. |
| minHeight | `string \| number` | No | Min height (CSS or number). |
| maxHeight | `string \| number` | No | Max height. |
| height | `string \| number` | No | Fixed height. |
| className | `string` | No | CSS class. |
| onBlur | `() => void` | No | Blur handler. |
| onFocus | `() => void` | No | Focus handler. |
| autoFocus | `boolean` | No | When true, focuses on mount (default false). |

```tsx
<CodeEditor value={code} onChange={setCode} language="json" minHeight={200} />
```

---

## 37. Context & Theming

**Import:** `ThemeProvider`, `createTheme`, `useTheme`, `Theme`, `foundationToken`, `FOUNDATION_THEME` from `@juspay/blend-design-system`

### ThemeProvider – Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `React.ReactNode` | Yes | App or subtree that uses Blend components. |
| foundationTokens | `ThemeType` | No | Override foundation design tokens (colors, spacing, etc.). |
| componentTokens | `ComponentTokenType` | No | Override component-level tokens. |
| breakpoints | `BreakpointType` | No | Custom breakpoints for responsive behavior. |
| theme | `Theme \| string` | No | Theme name or custom theme identifier. |

### Usage
- Wrap your app (or the part that uses Blend) in **ThemeProvider**.
- Use **createTheme** to override foundation/component tokens and pass to **ThemeProvider**.
- **useTheme()** returns the current theme context.
- **foundationToken** / **FOUNDATION_THEME** — design tokens (colors, spacing, typography, etc.).

### Example
```tsx
import { ThemeProvider, Button, ButtonType, ButtonSize } from '@juspay/blend-design-system';

function App() {
  return (
    <ThemeProvider>
      <Button buttonType={ButtonType.PRIMARY} size={ButtonSize.MEDIUM}>Click</Button>
    </ThemeProvider>
  );
}
```

### Next.js note
This library uses styled-components and can trigger SSR issues. Prefer:
- Wrapping only client components that use Blend in **ThemeProvider**.
- Loading Blend-heavy UI with `dynamic(..., { ssr: false })` inside a client component when needed.

---

*Reference generated from @juspay/blend-design-system package types. For the latest API, refer to the package’s TypeScript definitions and official docs.*
