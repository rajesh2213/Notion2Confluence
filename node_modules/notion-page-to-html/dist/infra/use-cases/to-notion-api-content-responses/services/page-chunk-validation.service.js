"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageChunkValidator = void 0;
var errors_1 = require("../../../../infra/errors");
var PageChunkValidator = /** @class */ (function () {
    function PageChunkValidator() {
    }
    PageChunkValidator.prototype.validate = function (notionPageId, pageChunkStatus) {
        if ([401, 403].includes(pageChunkStatus)) {
            return new errors_1.NotionPageAccessError(notionPageId);
        }
        if (pageChunkStatus === 404) {
            return new errors_1.NotionPageNotFound(notionPageId);
        }
        return null;
    };
    return PageChunkValidator;
}());
exports.PageChunkValidator = PageChunkValidator;
//# sourceMappingURL=page-chunk-validation.service.js.map