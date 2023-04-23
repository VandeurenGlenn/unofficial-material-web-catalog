import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
export default [{
  input: ['./src/shell.ts'],
  output: {
    dir: './www',
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    terser(),

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
