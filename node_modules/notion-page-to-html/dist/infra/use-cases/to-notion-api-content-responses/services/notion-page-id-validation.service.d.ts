import { Validation } from '../../../protocols/validation';
export declare class NotionPageIdValidator implements Validation<[string]> {
    validate(notionPageId: string): Error | null;
}
