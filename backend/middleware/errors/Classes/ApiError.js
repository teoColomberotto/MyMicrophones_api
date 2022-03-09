const url = require('url');
const { ApiErrorExtension } = require('./ApiErrorExtension');
const statusCodes = require('../statuscodes');
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
        this.status = options.status;
        this.title = options.title;
        this.detail = options.detail;
        this.instance = options.instance;

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
        return new ApiError(
            {
                status: 400,
                title: statusCodes[400],
                detail: options.detail,
                instance: options.instance,
            },
            ext,
        );
    }

    static unauthorized(options, ext) {
        return new ApiError(
            {
                status: 401,
                title: statusCodes[401],
                detail: options.detail,
                instance: options.instance,
            },
            ext,
        );
    }

    static forbidden(options, ext) {
        return new ApiError(
            {
                status: 403,
                title: statusCodes[403],
                detail: options.detail,
                instance: options.instance,
            },
            ext,
        );
    }

    static notfound(options, ext) {
        return new ApiError(
            {
                status: 404,
                title: statusCodes[404],
                detail: options.detail,
                instance: options.instance,
            },
            ext,
        );
    }
}

module.exports = {
    ApiError,
};
