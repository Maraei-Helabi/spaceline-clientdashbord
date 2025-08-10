import { defineConfig } from "orval";

const baseURL = 'https://testapi.spacelinenet.com';

const sharedConfig = {
  output: {
    mode: "tags-split",
    target: "./orval/endpoint.ts",
    schemas: "./orval/model",
    client: "react-query",
    prettier: true,
    tslint: true,
    mock: false,
    override: {
      mutator: {
        path: "./orval/mutator/custom-instance.ts",
        name: "customInstance",
      },
    },
  },
  hooks: {
    // afterAllFilesWrite: "prettier --write",
  },
} as const;


export default defineConfig({
  store: {
    ...sharedConfig,
    input: {
      target: `${baseURL}/swagger/v1/swagger.json`,
    },
  },
});
