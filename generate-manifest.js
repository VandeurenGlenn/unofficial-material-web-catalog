import { lstat, readdir, writeFile } from 'fs/promises'
import { join, parse } from 'path'

const manifest = {}

const root = './node_modules/@material/web/docs'
const paths = await readdir(root)

for (const path of paths) {
  if ((await lstat(join(root, path))).isDirectory()) {
    let imports = await readdir(join(root, path))
    imports = imports.filter(importee => parse(importee).ext === '.js')
    manifest[path] = {exports: imports}
  }
  
}

await writeFile('src/manifest.js', `export default ${JSON.stringify(manifest, null, '\t')}`)
