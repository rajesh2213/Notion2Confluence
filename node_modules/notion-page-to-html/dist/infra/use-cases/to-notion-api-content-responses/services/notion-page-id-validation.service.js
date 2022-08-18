"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionPageIdValidator = void 0;
var errors_1 = require("../../../errors");
var NotionPageIdValidator = /** @class */ (function () {
    function NotionPageIdValidator() {
    }
    NotionPageIdValidator.prototype.validate = function (notionPageId) {
        if (!notionPageId || notionPageId == '')
            return new errors_1.MissingPageIdError();
        return null;
    };
    return NotionPageIdValidator;
}());
exports.NotionPageIdValidator = NotionPageIdValidator;
//# sourceMappingURL=notion-page-id-validation.service.js.map