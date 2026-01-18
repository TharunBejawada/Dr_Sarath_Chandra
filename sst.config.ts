import { SSTConfig } from "sst";
import { Api, NextjsSite } from "sst/constructs";

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
      
      // 1. Create the Backend API
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

      // 2. Create the Frontend
      const site = new NextjsSite(stack, "Site", {
        path: "packages/client-web",
        
        // 👇 DISABLE IMAGE OPTIMIZATION HERE
        imageOptimization: {
          staticImageOptimization: false, 
        },
        
        environment: {
          NEXT_PUBLIC_API_URL: api.url,
        },
      });

      // 3. Output
      stack.addOutputs({
        ApiEndpoint: api.url,
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;