"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFailure = exports.sendSuccess = exports.Failure = exports.Success = void 0;
var Success = /** @class */ (function () {
    function Success(value) {
        this.value = value;
    }
    Success.prototype.isSuccess = function () {
        return true;
    };
    Success.prototype.isFailure = function () {
        return false;
    };
    return Success;
}());
exports.Success = Success;
var Failure = /** @class */ (function () {
    function Failure(value) {
        this.value = value;
    }
    Failure.prototype.isSuccess = function () {
        return false;
    };
    Failure.prototype.isFailure = function () {
        return true;
    };
    return Failure;
}());
exports.Failure = Failure;
function sendSuccess(value) {
    return new Success(value);
}
exports.sendSuccess = sendSuccess;
function sendFailure(value) {
    return new Failure(value);
}
exports.sendFailure = sendFailure;
//# sourceMappingURL=either.js.map