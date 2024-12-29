const { execSync } = require('child_process')
const fs = require('fs')
const { basename, dirname, join } = require('path')

console.log('Patching source code...')

execSync('mkdir -p .src && cp -r ./src/* .src', { stdio: 'inherit' })

const patchFiles = execSync('find ./patch -type f').toString().split('\n').filter(Boolean)

for (const file of patchFiles) {
  const content = fs.readFileSync(file, { encoding: 'utf-8' })
  const dir = dirname(file).replace(/^\.\/patch/, './.src')
  const filename = basename(file).replace(/^\./, '')
  const target = join(dir, filename)

  const nextContent = content

  fs.writeFileSync(target, nextContent)
}

console.log('Source code patched!')

