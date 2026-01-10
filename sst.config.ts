// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "nextjs-starter-bundle",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "ap-south-1", // Forces Mumbai region
        },
      },
    };
  },
  async run() {
    new sst.aws.Nextjs("NextJS_Starter_Bundle");
  },
});
