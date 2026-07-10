import { defineConfig } from "arkos/config";

const arkosConfig = defineConfig({
  source: {
    entryPoint: "src/server.ts",
  },
  authentication: {
    mode: "dynamic",
    login: {
      allowedUsernames: ["email"],
    },
    enabled: true,
  },
  routers: {
    strict: "no-bulk",
  },
  validation: {
    resolver: "zod",
  },
  swagger: {
    mode: "zod",
    strict: false,
  },
  middlewares: {
    cors: {},
  },
});

export default arkosConfig;
