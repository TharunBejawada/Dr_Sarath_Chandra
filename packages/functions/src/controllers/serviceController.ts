import { db, TABLE_NAME_SERVICES, BUCKET_NAME, AWS_REGION } from "../db/dynamo.js";
import { PutCommand, ScanCommand, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// Initialize S3 Client
const s3 = new S3Client({ region: AWS_REGION });

// 1. ADD SERVICE
export const addService = async (req: any, res: any) => {
  try {
    const serviceId = uuidv4();
    const timestamp = new Date().toISOString();
    
    const newService = {
      serviceId,
      ...req.body,
      enabled: true,
      createdAt: timestamp
    };

    await db.send(new PutCommand({
      TableName: TABLE_NAME_SERVICES,
      Item: newService,
    }));

    res.status(201).json({ success: true, message: "Service added", service: newService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add service" });
  }
};

// 2. GET ALL
export const getAllServices = async (req: any, res: any) => {
  try {
    const result = await db.send(new ScanCommand({ TableName: TABLE_NAME_SERVICES }));
    res.status(200).json({ Items: result.Items || [] });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// 3. GET BY ID
export const getServiceById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await db.send(new GetCommand({
      TableName: TABLE_NAME_SERVICES,
      Key: { serviceId: id }
    }));
    if (!result.Item) return res.status(404).json({ error: "Service not found" });
    res.status(200).json({ Item: result.Item });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch service" });
  }
};

// 4. UPDATE
export const updateService = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const updatedService = {
      ...req.body,
      serviceId: id,
    };
    await db.send(new PutCommand({
      TableName: TABLE_NAME_SERVICES,
      Item: updatedService
    }));
    res.status(200).json({ success: true, message: "Service updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update service" });
  }
};

// 5. TOGGLE
export const toggleServiceStatus = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { enabled } = req.body;
    await db.send(new UpdateCommand({
      TableName: TABLE_NAME_SERVICES,
      Key: { serviceId: id },
      UpdateExpression: "set enabled = :e",
      ExpressionAttributeValues: { ":e": enabled }
    }));
    res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle status" });
  }
};

export const uploadServiceImage = async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const file = req.file;
    const fileExtension = file.originalname.split('.').pop();
    const key = `services/${uuidv4()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3.send(command);

    // Construct the Public URL
    const imageUrl = `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;

    res.status(200).json({ 
      success: true,
      imageUrl: imageUrl 
    });

  } catch (error) {
    console.error("S3 Upload Error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};