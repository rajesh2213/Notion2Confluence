import { Block } from '../../../../protocols/blocks';
import { ToHtml } from '../../../../../domain/use-cases/to-html';
export declare class ListItemToHtml implements ToHtml {
    private _block;
    constructor(block: Block);
    convert(): Promise<string>;
}
