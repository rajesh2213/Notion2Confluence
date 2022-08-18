import { Validation } from '../../../protocols/validation';
export declare class PageChunkValidator implements Validation<[string, number]> {
    validate(notionPageId: string, pageChunkStatus: number): Error | null;
}
