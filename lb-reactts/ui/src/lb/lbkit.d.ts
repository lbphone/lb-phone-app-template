declare module '@lbphone/components' {
    import type { FC, ReactNode, ComponentType } from 'react';

    export type ButtonVariant = 'plain' | 'gray' | 'filled' | 'destructive';
    export type TextTone = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'destructive';

    export const Button: FC<{ children?: ReactNode; variant?: ButtonVariant; onClick?: () => void; disabled?: boolean; fullWidth?: boolean; className?: string }>;

    export const InsetGroup: FC<{ children?: ReactNode; last?: boolean; className?: string }>;
    export const GroupHeader: FC<{ children?: ReactNode; className?: string }>;

    type SlotProps = { children?: ReactNode; className?: string };

    interface RowComponent extends FC<{ children?: ReactNode; onClick?: () => void; clickable?: boolean; disabled?: boolean; className?: string }> {
        Leading: FC<SlotProps>;
        Content: FC<SlotProps>;
        Title: FC<SlotProps & { tone?: TextTone; bold?: boolean }>;
        Subtitle: FC<SlotProps>;
        Description: FC<SlotProps>;
        Trailing: FC<SlotProps>;
        Value: FC<SlotProps>;
        Chevron: FC<{ className?: string }>;
        Badge: FC<SlotProps>;
    }

    export const Row: RowComponent;

    export const Toggle: FC<{ checked?: boolean; defaultChecked?: boolean; disabled?: boolean; theme?: 'light' | 'dark'; onChange?: () => void }>;
    export const Selectable: FC<{ leading?: ReactNode; title?: ReactNode; description?: ReactNode; selected?: boolean; onSelect?: () => void; disabled?: boolean; checkmarkSide?: 'leading' | 'trailing'; className?: string }>;
    export const Field: FC<{ value?: string; defaultValue?: string; placeholder?: string; maxLength?: number; onChange?: (e: any) => void; onBlur?: () => void; className?: string }>;

    export type TabSwitcherOption = { id: string; label: ReactNode };
    export const TabSwitcher: FC<{ options: TabSwitcherOption[]; value: string; onChange: (id: string) => void; className?: string }>;

    export const Sheet: FC<{ open: boolean; onClose: () => void; children?: ReactNode; dismissable?: boolean; showHandle?: boolean; className?: string; containerClassName?: string }>;

    export type ActionSheetAction = { label: string; destructive?: boolean; disabled?: boolean; onPress?: () => void };
    export const ActionSheet: FC<{ open: boolean; onClose: () => void; title?: ReactNode; actions: ActionSheetAction[]; cancelLabel?: string; className?: string }>;

    export const Text: ComponentType<any>;
    export const IconTile: ComponentType<any>;
    export const Avatar: ComponentType<any>;
    export const Badge: ComponentType<any>;
    export const ProfileRow: ComponentType<any>;
    export const Card: ComponentType<any>;
    export const NavBar: ComponentType<any>;
    export const SearchField: ComponentType<any>;
    export const Slider: ComponentType<any>;
    export const AuthForm: ComponentType<any>;
    export const Modal: ComponentType<any>;
    export const Alert: ComponentType<any>;
    export const PageSheet: ComponentType<any>;
    export const TabBar: ComponentType<any>;
    export const List: ComponentType<any>;
    export const InsetList: ComponentType<any>;
    export const VirtualGrid: ComponentType<any>;
    export const ChatList: ComponentType<any>;
    export const ChatBubble: ComponentType<any>;
    export const ChatComposer: ComponentType<any>;
    export const ChatComposerButton: ComponentType<any>;
    export const ChatHeader: ComponentType<any>;
    export const AvatarGroup: ComponentType<any>;
    export const ImageGallery: ComponentType<any>;
    export const DialPad: ComponentType<any>;
    export const ActionButton: ComponentType<any>;
    export const ThemeScope: ComponentType<{ theme: 'light' | 'dark'; children?: ReactNode; className?: string }>;

    export const createNavigation: (...args: any[]) => any;
    export const Pages: ComponentType<any>;
    export const useNavigation: () => any;
    export const useOptionalNavigation: () => any;
    export const NavigationContext: any;

    export const React: typeof import('react');
    export const ReactDOM: typeof import('react-dom/client');
    export const version: string;

    export type LBKitMountNode = { component: string; props?: Record<string, unknown>; children?: LBKitMountChild };
    export type LBKitMountChild = string | number | LBKitMountNode | Array<string | number | LBKitMountNode | null | undefined> | null | undefined;
    export const mount: (host: Element, node: LBKitMountNode) => { update: (next: LBKitMountNode) => void; unmount: () => void };
}

interface Window {
    LBKit?: typeof import('@lbphone/components');
}
