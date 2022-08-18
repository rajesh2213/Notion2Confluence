"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeBlocksToHtml = void 0;
var blocks_to_html_converter_1 = require("../../data/use-cases/blocks-to-html-converter");
var makeBlocksToHtml = function (blocks) {
    var dispatcher = new blocks_to_html_converter_1.BlockDispatcher();
    var listBlocksWrapper = new blocks_to_html_converter_1.ListBlocksWrapper();
    return new blocks_to_html_converter_1.BlocksToHTML(blocks, dispatcher, listBlocksWrapper);
};
exports.makeBlocksToHtml = makeBlocksToHtml;
//# sourceMappingURL=blocks-to-html.factory.js.map