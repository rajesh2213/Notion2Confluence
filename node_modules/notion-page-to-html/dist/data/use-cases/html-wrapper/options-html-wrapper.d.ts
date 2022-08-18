import { PageProps } from 'data/protocols/page-props';
import { HtmlWrapper } from '../../../domain/use-cases/html-wrapper';
import { HtmlOptions } from '../../protocols/html-options/html-options';
export declare class OptionsHtmlWrapper implements HtmlWrapper {
    private readonly _options;
    constructor(options: HtmlOptions);
    wrapHtml(pageProps: PageProps, html: string): string;
    private _headFromTemplate;
}
