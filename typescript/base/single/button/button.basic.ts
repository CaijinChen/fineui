import { Single } from "../single";

export declare class BasicButton extends Single {
    _createShadow(): void;

    bindEvent(): void;

    _trigger(e: Event): void;

    _doClick(e: Event): void;

    beforeClick(): void;

    doClick(): void;

    handle(): BasicButton;

    hover(): void;

    dishover(): void;

    setSelected(b: boolean): void;

    isSelected(): boolean;

    isOnce(): boolean;

    isForceSelected(): boolean;

    isForceNotSelected(): boolean;

    isDisableSelected(): boolean;

    setText(v: string): void;

    getText(): string;

    static EVENT_CHANGE: string;
}
