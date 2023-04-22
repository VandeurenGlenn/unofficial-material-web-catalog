import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default [{
  input: ['./src/shell.ts'],
  output: {
    dir: './www',
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript()
  ]
}, {
  input: ['./src/color-worker.ts'],
  output: {
    dir: './www',
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript()
  ]
}]
