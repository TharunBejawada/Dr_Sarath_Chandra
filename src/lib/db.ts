// src/lib/db.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// 1. Initialize the low-level client
const connection = new DynamoDBClient({
  region: "ap-south-1", // Or your preferred region
});

// 2. Wrap it with the Document Client (handles JSON translation automatically)
export const db = DynamoDBDocumentClient.from(connection, {
  marshallOptions: {
    removeUndefinedValues: true, // Prevents errors when saving objects with undefined fields
    convertClassInstanceToMap: true,
  },
});

// 3. Helper for Table Names (keeps your code clean)
import { Resource } from "sst";
export const TableName = Resource.MyTable.name;