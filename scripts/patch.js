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
  const isPartial = basename(file).startsWith('.')

  const nextContent = isPartial
    ? applyPartialPatch(target, partialPatchToData(content))
    : content

  fs.writeFileSync(target, nextContent)
}

console.log('Source code patched!')

/**
 * Applies a partial patch to a target file by replacing specific code segments annotated with IDs.
 *
 * @param {string} target - The path to the target file to be patched.
 * @param {Array<{id: string, code: string}>} parts - An array of objects, each containing an ID and the corresponding code segment.
 * @returns {string} The patched content of the target file.
 */
function applyPartialPatch(target, parts) {
  const content = fs.readFileSync(target, { encoding: 'utf-8' })

  return parts.reduce((data, { id, code }) => {
    const match = data.match(new RegExp(`// \\[(${id})\\]`))
    if (match) {
      return data.replace(match[0], code)
    }
    return data
  }, content)
}

/**
 * Parses the content of a partial patch file and extracts code segments annotated with specific IDs.
 *
 * @param {string} content - The content of the partial patch file.
 * @returns {Array<{id: string, code: string}>} An array of objects, each containing an ID and the corresponding code segment.
 *
 * @example
 * const content = `
 * // [id1]
 * console.log('Hello, World!')
 * // [id2]
 * console.log('Goodbye, World!')
 * `
 * const result = partialPatchToData(content)
 * // result will be:
 * // [
 * //   { id: 'id1', code: 'console.log(\'Hello, World!\')\n' },
 * //   { id: 'id2', code: 'console.log(\'Goodbye, World!\')\n' }
 * // ]
 */
function partialPatchToData(content) {
  return  content.trim().split('\n').reduce((acc, line) => {
    const match = line.match(/\/\/ \[(.+?)\]/)
    if (match) {
      acc.push({ id: match[1], code: '' })
    } else if (acc.length > 0) {
      acc[acc.length - 1].code += line + '\n'
    }
    return acc
  }, [])
}
