# API компонентов AlignUI

Источник — `design-system/components/**/*.d.ts` (типы) и `*.jsx` (реализация).
В рантайме прототипов доступны как `window.AlignUIDesignSystem_6ff166.<Name>`
после подключения `_ds_bundle.js`.

Все иконочные пропы принимают имя RemixIcon **без префикса** `ri-` (например `leadingIcon="add-line"`).

## Кнопки

### Button

```ts
/** Primary action button. Three intents × four modes × four sizes. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color intent. */
  variant?: 'primary' | 'neutral' | 'error';
  /** Visual treatment. */
  mode?: 'filled' | 'stroke' | 'lighter' | 'ghost';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  /** RemixIcon name without the `ri-` prefix, e.g. "add-line". */
  leadingIcon?: string;
  trailingIcon?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export function Button(props: ButtonProps): React.ReactElement;
```

### FancyButton

```ts
export interface FancyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'neutral' | 'error';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  leadingIcon?: string;
  trailingIcon?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

/** Raised, glossy CTA button with inset highlight + soft drop shadow. */
export function FancyButton(props: FancyButtonProps): React.ReactElement;
```

### IconButton

```ts
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** RemixIcon name without the `ri-` prefix. */
  icon: string;
  variant?: 'primary' | 'neutral' | 'error';
  mode?: 'filled' | 'stroke' | 'lighter' | 'ghost';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  disabled?: boolean;
}

/** Square, icon-only button. Same intent/mode/size system as Button. */
export function IconButton(props: IconButtonProps): React.ReactElement;
```

### LinkButton

```ts
export interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'neutral' | 'error' | 'white';
  size?: 'small' | 'medium' | 'large';
  underline?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  disabled?: boolean;
}

/** Text-only inline action / link. */
export function LinkButton(props: LinkButtonProps): React.ReactElement;
```

## Отображение данных

### Accordion

```ts
export interface AccordionProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  icon?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}
/** Collapsible disclosure panel. */
export function Accordion(props: AccordionProps): React.ReactElement;
```

### Avatar

```ts
/** Circular avatar — image, initials, or icon, with optional status dot. */
export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  color?: 'gray' | 'blue' | 'purple' | 'orange' | 'green' | 'yellow';
  size?: 20 | 24 | 32 | 40 | 48 | 56 | 64 | 80;
  status?: 'online' | 'away' | 'busy' | 'offline';
  className?: string;
  style?: React.CSSProperties;
}
export function Avatar(props: AvatarProps): React.ReactElement;
```

### AvatarGroup

```ts
import { AvatarProps } from './Avatar';
export interface AvatarGroupProps {
  items: Omit<AvatarProps, 'size'>[];
  size?: number;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
}
/** Overlapping avatar stack with +N overflow. */
export function AvatarGroup(props: AvatarGroupProps): React.ReactElement;
```

### Breadcrumbs

```ts
export interface BreadcrumbItem { label: React.ReactNode; href?: string; icon?: string; }
export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  style?: React.CSSProperties;
}
/** Breadcrumb navigation trail. */
export function Breadcrumbs(props: BreadcrumbsProps): React.ReactElement;
```

### Card

```ts
/** Surface container with hairline ring, radius and optional hover lift. */
export interface CardProps {
  children?: React.ReactNode;
  padding?: number;
  hover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): React.ReactElement;
```

### Divider

```ts
export interface DividerProps {
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
}
/** Divider line, optionally with a centered label. */
export function Divider(props: DividerProps): React.ReactElement;
```

### Modal

```ts
export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: string;
  iconColor?: 'primary' | 'success' | 'warning' | 'error';
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
  className?: string;
  style?: React.CSSProperties;
}
/** Centered modal dialog with overlay, header icon and footer slot. */
export function Modal(props: ModalProps): React.ReactElement | null;
```

### Pagination

```ts
export interface PaginationProps {
  page?: number;
  total?: number;
  onChange?: (page: number) => void;
  siblings?: number;
  className?: string;
  style?: React.CSSProperties;
}
/** Page navigation with prev/next and ellipsis. */
export function Pagination(props: PaginationProps): React.ReactElement;
```

### Rating

```ts
export interface RatingProps {
  value?: number;
  max?: number;
  size?: number;
  onChange?: (value: number) => void;
  className?: string;
  style?: React.CSSProperties;
}
/** Star rating, read-only or interactive. */
export function Rating(props: RatingProps): React.ReactElement;
```

### Tabs

```ts
export interface TabItem { value: string; label: React.ReactNode; icon?: string; badge?: React.ReactNode; }
export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: 'underline' | 'pill';
  className?: string;
  style?: React.CSSProperties;
}
/** Tab bar — underline or segmented pill style. */
export function Tabs(props: TabsProps): React.ReactElement;
```

## Обратная связь

### Alert

```ts
/** Inline alert with icon, title, body and optional dismiss/action. */
export interface AlertProps {
  state?: 'info' | 'success' | 'warning' | 'error' | 'feature';
  variant?: 'filled' | 'light' | 'stroke';
  title?: React.ReactNode;
  children?: React.ReactNode;
  icon?: string;
  onClose?: () => void;
  action?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export function Alert(props: AlertProps): React.ReactElement;
```

### Badge

```ts
export type BadgeColor = 'gray' | 'blue' | 'orange' | 'red' | 'green' | 'yellow' | 'purple' | 'teal' | 'pink';
/** Compact pill for counts, labels and statuses. */
export interface BadgeProps {
  children?: React.ReactNode;
  color?: BadgeColor;
  variant?: 'filled' | 'light' | 'lighter' | 'stroke';
  size?: 'small' | 'medium';
  leadingIcon?: string;
  dot?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export function Badge(props: BadgeProps): React.ReactElement;
```

### Banner

```ts
export interface BannerProps {
  state?: 'info' | 'success' | 'warning' | 'error' | 'feature';
  variant?: 'filled' | 'light' | 'stroke';
  children?: React.ReactNode;
  icon?: string;
  action?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
/** Full-width announcement banner. */
export function Banner(props: BannerProps): React.ReactElement;
```

### ProgressBar

```ts
export interface ProgressBarProps {
  value?: number;
  color?: 'primary' | 'green' | 'orange' | 'red' | 'blue' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
/** Linear progress bar (0–100). */
export function ProgressBar(props: ProgressBarProps): React.ReactElement;
```

### StatusBadge

```ts
export interface StatusBadgeProps {
  status?: 'online' | 'away' | 'busy' | 'offline' | 'pending' | 'completed' | 'cancelled' | 'in_progress';
  children?: React.ReactNode;
  color?: string;
  variant?: 'stroke' | 'light';
  className?: string;
  style?: React.CSSProperties;
}
/** Dot + label status indicator. */
export function StatusBadge(props: StatusBadgeProps): React.ReactElement;
```

### Tag

```ts
export interface TagProps {
  children?: React.ReactNode;
  variant?: 'stroke' | 'gray';
  leadingIcon?: string;
  onDismiss?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
/** Rectangular chip/tag with optional icon and dismiss. */
export function Tag(props: TagProps): React.ReactElement;
```

### Tooltip

```ts
export interface TooltipProps {
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
/** Hover/focus tooltip bubble. */
export function Tooltip(props: TooltipProps): React.ReactElement;
```

## Формы

### Checkbox

```ts
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** Checkbox with checked / indeterminate / disabled states. */
export function Checkbox(props: CheckboxProps): React.ReactElement;
```

### Hint

```ts
export interface HintProps {
  children: React.ReactNode;
  state?: 'default' | 'error' | 'success';
  icon?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** Helper / validation message shown beneath a field. */
export function Hint(props: HintProps): React.ReactElement;
```

### Input

```ts
/** Text input with optional leading/trailing icons, focus ring and error state. */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'small' | 'medium' | 'large';
  /** RemixIcon name without `ri-`. */
  leadingIcon?: string;
  trailingIcon?: string;
  error?: boolean;
  inputStyle?: React.CSSProperties;
}
export function Input(props: InputProps): React.ReactElement;
```

### Label

```ts
export interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  sublabel?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
/** Field label with optional required asterisk and sub-label. */
export function Label(props: LabelProps): React.ReactElement;
```

### Radio

```ts
export interface RadioProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: any) => void;
  name?: string;
  value?: any;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** Single radio control. */
export function Radio(props: RadioProps): React.ReactElement;
```

### Select

```ts
export interface SelectOption { value: string; label: string; }
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'small' | 'medium' | 'large';
  leadingIcon?: string;
  error?: boolean;
  options?: SelectOption[];
  placeholder?: string;
}
/** Styled select / dropdown. Pass `options` or `<option>` children. */
export function Select(props: SelectProps): React.ReactElement;
```

### Switch

```ts
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** On/off toggle switch. */
export function Switch(props: SwitchProps): React.ReactElement;
```

### Textarea

```ts
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  showCounter?: boolean;
}
/** Multi-line text area with optional character counter. */
export function Textarea(props: TextareaProps): React.ReactElement;
```

## Композиции-референсы

- `design-system/ui_kits/medical-portal/` — собранный кабинет клиники (Login → Dashboard → Patients → Patient record) на этих же примитивах.
- `design-system/templates/clinic-portal/` — шаблон дашборда.
- `design-system/guidelines/*.card.html` — эталоны цвета, типографики, отступов, радиусов, теней, иконографики.
- `design-system/preview/Clinic Portal (standalone).html` — открыть двойным кликом, посмотреть вживую.
