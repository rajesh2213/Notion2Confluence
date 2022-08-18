import { Decoration } from '../../../../../data/protocols/blocks/decoration';
import { ToHtml } from '../../../../../domain/use-cases/to-html';
export declare class DecoratorDispatcher {
    dispatch(text: string, decoration: Decoration): ToHtml;
}
