interface ImportMetaEnv {
  readonly VITE_RESTAPI_URL: string;
  readonly VITE_HLS_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
