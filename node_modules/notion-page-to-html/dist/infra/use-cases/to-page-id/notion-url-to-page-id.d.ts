import { IdNormalizer, UrlValidator } from './services';
export declare class NotionUrlToPageId {
    private readonly url;
    private readonly idNormalizer;
    private readonly urlValidator;
    constructor(url: string, idNormalizer: IdNormalizer, urlValidator: UrlValidator);
    toPageId(): string;
    private get ununormalizedPageId();
}
