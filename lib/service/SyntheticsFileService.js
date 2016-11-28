
const path = require('path');
const logger = require('winston');

class SyntheticsFileService {
    constructor(directory, fileService) {
        this.directory = directory;
        this.fileService = fileService;
    }

    _getSyntheticsFilePath(filename) {
        return path.join(this.directory, filename);
    }

    createFile(filename, contents, callback) {
        logger.verbose('SyntheticsFileService.createFile: ' + filename);

        const fileLocation = this._getSyntheticsFilePath(filename);
        this.fileService.writeFile(fileLocation, contents, callback);
    }

    exists(filename, callback) {
        logger.verbose('SyntheticsFileService.exists: ' + filename);

        const fileLocation = this._getSyntheticsFilePath(filename);
        this.fileService.exists(fileLocation, callback);
    }

    getFileContent(filename, callback) {
        logger.verbose('SyntheticsFileService.getFileContent: ' + filename);

        const fileLocation = this._getSyntheticsFilePath(filename);
        this.fileService.getFileContent(fileLocation, callback, 45);
    }

    getBase64File(filename, callback) {
        logger.verbose('SyntheticsFileService.getBase64File: ' + filename);

        this.getFileContent(filename, function (buffer) {
            callback(buffer.toString('base64'));
        });
    }

}

module.exports = (directory, fileService) => { 
    return new SyntheticsFileService(directory, fileService) 
};