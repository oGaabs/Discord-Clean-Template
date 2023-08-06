const Fs = require("node:fs")
const Path = require("node:path")
const logger = require("./Logger")

class CommandFileReader {
    constructor(options = {}) {
        this.files = options.files || []
        this.logger = options.logger || logger
    }

    readDirectoryFiles(directoryPath, jsFiles = []) {
        this.loadDirectory(directoryPath, jsFiles)

        return jsFiles
    }

    loadDirectory(currentPath, jsFiles = []) {
        console.log(`\n[${logger.getCurrentDateTime()}] Directory: ${currentPath.split("/").pop()}`)

        try {
            // Le os arquivos de comando no caminho especificado e armazena-os no this.commands
            const files = Fs.readdirSync(currentPath)

            files.forEach((file, index) => {
                const filePath = Path.join(currentPath, file)
                const stats = Fs.statSync(filePath)

                // Caso seja um arquivo, carrega para o array
                if (stats.isFile() && file.endsWith(".js"))
                    this.loadClassFromFile(jsFiles, filePath, index)

                // Caso se um diretorio, carrega todos os arquivos dentro dele
                if (stats.isDirectory())
                    this.loadDirectory(filePath, jsFiles)
            })

            return jsFiles
        } catch (err) {
            console.error(`An error occurred while processing directory: ${currentPath}`)
            console.error(err)
        }
    }

    loadClassFromFile(jsFiles, filePath, index) {
        try {
            const ClassFile = require(Path.join(process.cwd(), filePath))
            jsFiles.push(ClassFile)

            this.logger.debug("[DEBUG] ::", ` (${++index}/${jsFiles.length}) Loaded ${filePath}.`)
        } catch (err) {
            console.error(err)
            this.logger.error("[FAIL] ::", `(${++index}) Fail when loading ${filePath}.`, false, err)
        }
    }
}

module.exports = CommandFileReader
