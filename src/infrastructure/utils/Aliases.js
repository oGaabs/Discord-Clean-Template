const moduleAlias = require("module-alias")
const path = require("path")

const root = process.cwd()

moduleAlias.addAliases({
    "@application": path.join(root, "src", "application"),
    "@domain": path.join(root, "src", "domain"),
    "@infrastructure": path.join(root, "src", "infrastructure"),
    "@infra": path.join(root, "src", "infrastructure"),
    "@utils": path.join(root, "src", "infrastructure", "utils"),
})
