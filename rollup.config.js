import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import nodeResolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default [{
    input: pkg.src,
    output: { file: pkg.main, format: 'cjs', indent: false },
    external: [
        ...Object.keys(pkg.dependencies || {}),
    ],
    plugins: [babel()],
}, {
    input: pkg.src,
    output: { file: pkg.module, format: 'es', indent: false },
    external: [
        ...Object.keys(pkg.dependencies || {}),
    ],
    plugins: [babel()],
}, {
    input: pkg.src,
    output: { file: pkg.unpkg, format: 'umd', name: 'Sponsored', indent: false },
    plugins: [
        builtins(),
        nodeResolve({ module: true, browser: true }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react/index.js': [
                    'cloneElement',
                    'Fragment',
                    'createContext',
                    'Component',
                    'createElement',
                ],
                'node_modules/react-dom/index.js': ['render', 'hydrate'],
                'node_modules/react-is/index.js': [
                    'isElement',
                    'isValidElementType',
                    'ForwardRef',
                ],
            },
        }),
        globals(),
        babel({ exclude: 'node_modules/**' }),
    ],
}, {
    input: pkg.src,
    output: { file: pkg.unpkgMin, format: 'umd', name: 'Sponsored', indent: false },
    plugins:[
        builtins(),
        nodeResolve({ module: true, browser: true }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react/index.js': [
                    'cloneElement',
                    'Fragment',
                    'createContext',
                    'Component',
                    'createElement',
                ],
                'node_modules/react-dom/index.js': ['render', 'hydrate'],
                'node_modules/react-is/index.js': [
                    'isElement',
                    'isValidElementType',
                    'ForwardRef',
                ],
            },
        }),
        globals(),
        babel({ exclude: 'node_modules/**' }),
        terser({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false,
            },
        }),
    ],
}]
