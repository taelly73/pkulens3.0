// Manually define ImportMetaEnv and ImportMeta to avoid dependency on vite/client types
interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Augment the existing NodeJS namespace to include API_KEY in ProcessEnv
// This avoids redeclaring the global 'process' variable which causes conflicts
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}
