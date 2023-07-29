const Fs = require("node:fs")
const Path = require("node:path")
const logger = require("@utils/Logger")

class CommandFileReader {
    constructor(arrays = {}) {
        this.files = arrays.files || []
        this.logger = arrays.logger || logger
    }

    readDirectoryFiles(directoryPath, jsFiles = []) {
        this.loadDirectory(directoryPath, jsFiles)

        return jsFiles
    }

    loadDirectory(currentPath, jsFiles = []) {
        console.log(`\n[${logger.getDate()}] Directory: ${currentPath.split("/").pop()}`)

        try {
            // Le os arquivos de comando no caminho especificado e armazena-os no this.commands
            const files = Fs.readdirSync(currentPath)

            files.forEach((file, index) => {
                const filePath = Path.join(currentPath, file)
                const stats = Fs.statSync(filePath)

                // Caso seja um arquivo, carrega para o array
                if (stats.isFile() && file.endsWith(".js")) {
                    try {
                        const ClassFile = require(Path.join(process.cwd(), filePath))

                        jsFiles.push(ClassFile)

                        return logger.debug("[DEBUG] ::", ` (${++index}/${jsFiles.length}) Loaded ${file}.`)
                    } catch (err) {
                        console.error(err)
                        return logger.error("[FAIL] ::", `(${++index}) Fail when loading ${file}.`, false, err)
                    }
                }

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
}

module.exports = CommandFileReader
