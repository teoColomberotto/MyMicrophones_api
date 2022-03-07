/**
 * An problem document extension according to RFC 7807
 */
class ApiErrorExtension {
    /**
     *
     * @param {Object} extension
     */
    constructor(extension) {
        this.extensionProperties = extension;
    }
}

module.exports = { ApiErrorExtension };
