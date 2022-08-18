import { Validation } from '../../../protocols/validation';
export declare class UrlValidator implements Validation<[string]> {
    validate(url: string): Error | null;
    private isNotionPargeUrl;
}
