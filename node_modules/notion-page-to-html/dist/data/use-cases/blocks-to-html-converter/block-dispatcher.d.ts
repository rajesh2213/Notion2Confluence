import { Block } from '../../protocols/blocks';
import { ToHtml } from '../../../domain/use-cases/to-html';
export declare class BlockDispatcher {
    dispatch(block: Block): ToHtml;
}
