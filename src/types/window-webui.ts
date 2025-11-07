// Ambient global augmentation for the browser Window object
// This file is compiled to a .d.ts and included via a side-effect import in src/index.ts
// so that consumers of tuber-shared automatically get the global typings.

export {};

declare global {
	interface Window {
		webui?: {
			/** Is `true` if the app is in debug mode. */
			inDebugMode?: boolean;
			/** Is `true` if the app is in development mode. */
			inDevelMode?: boolean;
		};
		// Note: this index signature widens Window considerably; keep only if intentional
		[property: string]: unknown;
	}
}
