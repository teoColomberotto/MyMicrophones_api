const url = require('url');
const statusCodes = require('../statuscodes');
const { ApiErrorExtension } = require('./ApiErrorExtension');
/**
 * A problem document according to RFC 7807
 */
class ApiError {
    /**
     *
     * @param {Object} options
     * @param {String} [options.title]
     * @param {String} [options.detail]
     * @param {String} [options.instance]
     * @param {Number} [options.status]
     * @param {Extension} [extension]
     * @return {{type: string, title: string}}
     */
    constructor(options, extension) {
        this.detail = options.detail;
        this.instance = options.instance;
        this.title = options.title;
        this.status = options.status;
        if (this.instance) {
            url.parse(this.instance);
        }

        if (extension instanceof ApiErrorExtension) {
            this.extension = {};
            // eslint-disable-next-line no-restricted-syntax
            for (const propertyName in extension.extensionProperties) {
                // eslint-disable-next-line max-len
                // eslint-disable-next-line no-prototype-builtins
                if (extension.extensionProperties.hasOwnProperty(propertyName)) {
                    // eslint-disable-next-line max-len
                    this.extension[propertyName] = extension.extensionProperties[propertyName];
                }
            }
        }
    }

    static badRequest(options, ext) {
        return new ApiError(options, ext);
    }
}

module.exports = {
    ApiError,
};
