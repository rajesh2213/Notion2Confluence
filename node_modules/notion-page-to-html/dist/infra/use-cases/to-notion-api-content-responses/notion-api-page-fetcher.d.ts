import { HttpPostClient } from '../../../data/protocols/http-request';
import { NotionApiContentResponse } from '../../protocols/notion-api-content-response';
import { NotionPageIdValidator, PageRecordValidator, PageChunkValidator } from './services';
export declare class NotionApiPageFetcher {
    private readonly notionPageId;
    private readonly httpPostClient;
    private readonly notionPageIdValidator;
    private readonly pageRecordValidator;
    private readonly pageChunkValidator;
    constructor(notionPageId: string, httpPostClient: HttpPostClient, notionPageIdValidator: NotionPageIdValidator, pageRecordValidator: PageRecordValidator, pageChunkValidator: PageChunkValidator);
    getNotionPageContents(): Promise<NotionApiContentResponse[]>;
    private mapContentsIdToContent;
    private contentsNotInChunk;
    private contentsInChunk;
    private fetchRecordValues;
    private fetchPageChunk;
    private fetchRecordValuesByContentIds;
}
