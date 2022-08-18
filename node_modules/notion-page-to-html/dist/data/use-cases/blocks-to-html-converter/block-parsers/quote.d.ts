import { Block } from '../../../protocols/blocks';
import { ToHtml } from '../../../../domain/use-cases/to-html';
export declare class QuoteBlockToHtml implements ToHtml {
    private readonly _block;
    constructor(block: Block);
    convert(): Promise<string>;
}
