"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionUrlToPageId = void 0;
var NotionUrlToPageId = /** @class */ (function () {
    function NotionUrlToPageId(url, idNormalizer, urlValidator) {
        this.url = url;
        this.idNormalizer = idNormalizer;
        this.urlValidator = urlValidator;
    }
    NotionUrlToPageId.prototype.toPageId = function () {
        var urlError = this.urlValidator.validate(this.url);
        if (urlError)
            throw urlError;
        return this.idNormalizer.normalizeId(this.ununormalizedPageId);
    };
    Object.defineProperty(NotionUrlToPageId.prototype, "ununormalizedPageId", {
        get: function () {
            var tail = this.url.split('/').reverse()[0];
            if (tail.split('-').length === 0)
                return tail;
            return tail.split('-').reverse()[0];
        },
        enumerable: false,
        configurable: true
    });
    return NotionUrlToPageId;
}());
exports.NotionUrlToPageId = NotionUrlToPageId;
//# sourceMappingURL=notion-url-to-page-id.js.map