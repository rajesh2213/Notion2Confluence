import { ToHtml } from '../../../../../../domain/use-cases/to-html';
export declare class UnknownDecorationToHtml implements ToHtml {
    private readonly _text;
    constructor(text: string);
    convert(): Promise<string>;
}
