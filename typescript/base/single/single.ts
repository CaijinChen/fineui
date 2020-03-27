import { Widget } from "../../core/widget";

export declare class Single extends Widget {
    _showToolTip(e: Event, opt?: SingleOpt): void;

    _hideTooltip(): void;

    _clearTimeOut(): void;

    enableHover(opt?: SingleOpt): void;

    disabledHover(): void;

    setTitle(title: string, opt?: SingleOpt): void;

    setWarningTitle(title: string, opt?: SingleOpt): void;

    getTipType(): string;

    isReadOnly(): boolean;

    getTitle(): string;

    getWarningTitle(): string;

    populate(..._args: any[]): void;
}

interface SingleOpt {
    container?: any, belowMouse?: boolean
}
