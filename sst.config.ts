import { SSTConfig } from "sst";
import { Api, Table } from "sst/constructs"; 

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

      // 1. Create the Forms Table
      const table = new Table(stack, "Forms", {
        fields: {
          formId: "string",
        },
        primaryIndex: { partitionKey: "formId" },
      });
      
      const api = new Api(stack, "Api", {
        cors: {
          allowMethods: ["ANY"],
          allowHeaders: ["*"],
          allowOrigins: [
            "https://pginelectroniccity.com",
            "https://www.pginelectroniccity.com", 
            "http://localhost:3000", 
            "https://main.d2jyfcge0jrs7c.amplifyapp.com"
          ],
        },
        defaults: {
          function: {
            handler: "packages/functions/src/index.handler",
            bind: [table],
            environment: {
                FORM_TABLE_NAME: table.tableName,
                GMAIL_USER: "drksaratchandra@gmail.com", 
                GMAIL_PASS: "karj wepo hjcd yhuq",
                AWS_S3_BUCKET_NAME: "dr-chandra-assets", 
            },
            permissions: ["dynamodb", "s3"],
          },
        },
        routes: {
          "ANY /{proxy+}": "packages/functions/src/index.handler",
          "POST /api/submit-form": "packages/functions/src/forms.submit",
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