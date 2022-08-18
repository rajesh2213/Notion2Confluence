import { ToHtml } from '../../../../domain/use-cases/to-html';
export declare class UnknownBlockToHtml implements ToHtml {
    convert(): Promise<string>;
}
