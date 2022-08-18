"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockToInnerText = void 0;
var blockToInnerText = function (block) {
    var decorableTexts = block.decorableTexts;
    return decorableTexts ? decorableTexts.map(function (dt) { return dt.text; }).join('') : '';
};
exports.blockToInnerText = blockToInnerText;
//# sourceMappingURL=block-to-inner-text.js.map