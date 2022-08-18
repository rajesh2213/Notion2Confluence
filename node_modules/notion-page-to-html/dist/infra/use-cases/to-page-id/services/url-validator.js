"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlValidator = void 0;
var errors_1 = require("../../../errors");
var UrlValidator = /** @class */ (function () {
    function UrlValidator() {
    }
    UrlValidator.prototype.validate = function (url) {
        if (!this.isNotionPargeUrl(url))
            return new errors_1.InvalidPageUrlError(url);
        return null;
    };
    UrlValidator.prototype.isNotionPargeUrl = function (url) {
        return /^http(s?):\/\/((w{3}.)?notion.so|[\w\-]*\.notion\.site)\/((\w)+?\/)?(\w|-){32,}/g.test(url);
    };
    return UrlValidator;
}());
exports.UrlValidator = UrlValidator;
//# sourceMappingURL=url-validator.js.map