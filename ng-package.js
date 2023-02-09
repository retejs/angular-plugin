

module.exports = {
  "$schema": "./node_modules/ng-packagr/ng-package.schema.json",
  "dest": process.env.DEST || "./dist",
  "lib": {
    "entryFile": "src/index.ts"
  }
}
