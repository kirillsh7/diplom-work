import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as patch from 'path'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = patch.dirname(__filename)
// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: '0.0.0.0',
		open: true,
	},
	resolve: {
		alias: {
			'@components': patch.resolve(__dirname, 'src/components'),
			'@constants': patch.resolve(__dirname, 'src/constants'),
			'@page': patch.resolve(__dirname, 'src/page'),
			'@api': patch.resolve(__dirname, 'src/api'),
			'@provider': patch.resolve(__dirname, 'src/provider'),
			'@store': patch.resolve(__dirname, 'src/store'),
			'@layout': patch.resolve(__dirname, 'src/layout'),
			'@utils': patch.resolve(__dirname, 'src/utils'),
			'@hooks': patch.resolve(__dirname, 'src/hooks'),
			'@routes': patch.resolve(__dirname, 'src/routes'),
		},
	},
})
