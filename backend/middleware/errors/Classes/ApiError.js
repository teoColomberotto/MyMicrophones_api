const url = require('url');
const Extension = require('./ApiErrorExtension');
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
        const { detail } = options.detail;
        const { instance } = options.instance;
        const { title } = options.title;
        const { status } = options.status;

        if (instance) {
            url.parse(instance);
        }

        const result = {
            title,
            detail,
            instance,
            status,
        };

        if (extension) {
            // eslint-disable-next-line no-restricted-syntax
            for (const propertyName in extension.extensionProperties) {
                // eslint-disable-next-line max-len
                // eslint-disable-next-line no-prototype-builtins
                if (extension.extensionProperties.hasOwnProperty(propertyName)) {
                    // eslint-disable-next-line max-len
                    result[propertyName] = extension.extensionProperties[propertyName];
                }
            }
        }

        // eslint-disable-next-line no-constructor-return
        return result;
    }
}

const BadRequestProblem = function () {
    return new ApiError({ status: 400 });
};

const UnauthorizedProblem = function () {
    return new ApiError({ status: 401 });
};

const ForbiddenProblem = function () {
    return new ApiError({ status: 403 });
};

const NotFoundProblem = function () {
    return new ApiError({ status: 404 });
};

const InternalServerErrorProblem = function () {
    return new ApiError({ status: 500 });
};

module.exports = {
    ApiError,
    StatusCodeProblems: {
        BadRequestProblem,
        UnauthorizedProblem,
        ForbiddenProblem,
        NotFoundProblem,
        InternalServerErrorProblem,
    },
};
