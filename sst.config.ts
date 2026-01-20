import { SSTConfig } from "sst";
import { Api } from "sst/constructs"; 

export default {
  config(_input) {
    return {
      name: "dr-schandra-app",
      region: "ap-south-1",
      profile: "sc-prod",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      
      // 1. KEEP THE BACKEND API
      const api = new Api(stack, "Api", {
        defaults: {
          function: {
            handler: "packages/functions/src/index.handler",
            environment: {
                AWS_S3_BUCKET_NAME: "dr-chandra-assets", 
            },
            permissions: ["dynamodb", "s3"],
          },
        },
        routes: {
          "ANY /{proxy+}": "packages/functions/src/index.handler",
        },
      });

      // 2. DISABLE THE FRONTEND (Deployment moved to Amplify)
      /*
      const site = new NextjsSite(stack, "Site", {
        path: "packages/client-web",
        environment: {
          NEXT_PUBLIC_API_URL: api.url,
        },
      });
      */

      // 3. OUTPUT THE API URL
      stack.addOutputs({
        ApiEndpoint: api.url,
      });
    });
  },
} satisfies SSTConfig;