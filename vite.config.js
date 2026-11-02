import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const src = path.resolve(import.meta.dirname, 'src');

// src/config/<name>.js is picked per mode: dev server, production build, or tests
const configFile = {
	development: 'dev',
	production: 'dist',
	test: 'test',
};

export default defineConfig(({ mode }) => ({
	base: './',
	plugins: [react()],
	resolve: {
		alias: {
			actions: `${src}/actions`,
			components: `${src}/components`,
			containers: `${src}/containers`,
			config: `${src}/config/${configFile[mode] || 'dev'}.js`,
			images: `${src}/images`,
			sources: `${src}/sources`,
			stores: `${src}/stores`,
			styles: `${src}/styles`,
			data: `${src}/data`,
			'~': src,
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				// Bootstrap 4 predates the modern Sass module system
				silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'slash-div', 'if-function', 'abs-percent'],
			},
			sass: {
				silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'slash-div', 'if-function', 'abs-percent'],
			},
		},
	},
	server: {
		port: 8000,
		open: true,
	},
	build: {
		sourcemap: true,
	},
	test: {
		environment: 'jsdom',
		globals: true,
		include: ['test/**/*Test.{js,jsx}'],
		setupFiles: ['test/setup.js'],
		css: false,
		coverage: {
			include: ['src/**'],
		},
	},
}));
