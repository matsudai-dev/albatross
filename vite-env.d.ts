// biome-ignore-all lint: I want to ignore the warning that says "Don't use '{}' as a type." I expect to set some kind of key in the future.

interface ViteTypeOptions {
	strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
