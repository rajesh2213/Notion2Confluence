import { Validation } from '../../../protocols/validation';
import { HttpResponse } from 'data/protocols/http-request';
export declare class PageRecordValidator implements Validation<[string, HttpResponse]> {
    validate(notionPageId: string, pageRecord: HttpResponse): Error | null;
}
