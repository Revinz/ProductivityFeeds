"use strict";
// Taken from and modified
// https://stackoverflow.com/questions/45838986/how-do-i-run-a-jasmine-test-for-a-specific-browser
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserDetection = void 0;
var BrowserDetection = /** @class */ (function () {
    function BrowserDetection() {
    }
    BrowserDetection.isGoogleChrome = function () {
        return this.isBrowser("chrome");
    };
    BrowserDetection.isFirefox = function () {
        return this.isBrowser("firefox");
    };
    /**
     *
     * @param browserString Browserstring as it is found in the useragent string.
     * @returns {boolean} Returns true if there is a match for the browserstring.
     */
    BrowserDetection.isBrowser = function (browserString) {
        var userAgent = window.navigator.userAgent;
        return userAgent.indexOf(browserString) >= 0;
    };
    return BrowserDetection;
}());
exports.BrowserDetection = BrowserDetection;
