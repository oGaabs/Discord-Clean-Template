const Fs = require("node:fs")
const Path = require("node:path")
const logger = require("./Logger")

class CommandFileReader {
    constructor(options = {}) {
        this.logger = options.logger || logger
    }

    readDirectoryFiles(directoryPath, jsFiles = []) {
        this.loadDirectoryFilesRecursively(directoryPath, jsFiles)

        return jsFiles
    }

    loadDirectoryFilesRecursively(currentPath, jsFiles = []) {
        console.log(`\n[${logger.getCurrentDateTime()}] Directory: ${currentPath.split("/").pop()}`)

        try {
            const files = Fs.readdirSync(currentPath)

            files.forEach((file, index) => {
                const filePath = Path.join(currentPath, file)
                const fileInfo = Fs.statSync(filePath)

                if (fileInfo.isFile() && file.endsWith(".js"))
                    this.loadClassFromFile(jsFiles, filePath, index)

                if (fileInfo.isDirectory())
                    this.loadDirectoryFilesRecursively(filePath, jsFiles)
            })

            return jsFiles
        } catch (err) {
            this.logger.error(`An error occurred while processing directory: ${currentPath}`)
            this.logger.error(err)
        }
    }

    loadClassFromFile(jsFiles, filePath, index) {
        try {
            const ClassFile = require(Path.join(process.cwd(), filePath))
            jsFiles.push(ClassFile)

            this.logger.debug("[DEBUG] ::", ` (${++index}/${jsFiles.length}) Loaded ${filePath}.`)
        } catch (err) {
            this.logger.error("[FAIL] ::", `(${++index}) Failed to load ${filePath}:`, false)
            this.logger.error(err)
        }
    }
}

module.exports = CommandFileReader
