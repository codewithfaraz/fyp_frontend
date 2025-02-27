interface ImportMetaEnv {
  VITE_SUPABASE_PROJECT_URL: string;
  VITE_SUPABASE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
