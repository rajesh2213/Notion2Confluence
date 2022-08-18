"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotionUrlToPageId = void 0;
var to_page_id_1 = require("../../infra/use-cases/to-page-id");
var services_1 = require("../../infra/use-cases/to-page-id/services");
var createNotionUrlToPageId = function (url) {
    var idNormalizer = new services_1.IdNormalizer();
    var urlValidator = new services_1.UrlValidator();
    return new to_page_id_1.NotionUrlToPageId(url, idNormalizer, urlValidator);
};
exports.createNotionUrlToPageId = createNotionUrlToPageId;
//# sourceMappingURL=notion-url-to-page-id.factory.js.map