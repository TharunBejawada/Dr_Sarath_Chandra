import { DynamoDBClient, PutItemCommand, ScanCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const db = new DynamoDBClient({ region: "ap-south-1" });
const TABLE_NAME = "PatientTestimonials";

// --- 1. ADD TESTIMONIAL (Link Only) ---
export const addTestimonial = async (req: any, res: any) => {
  try {
    const { videoUrl, videoId } = req.body;

    if (!videoUrl || !videoId) {
      return res.status(400).json({ error: "YouTube URL is required" });
    }

    const newItem = {
      id: { S: uuidv4() },
      videoUrl: { S: videoUrl },
      videoId: { S: videoId },
      // Optional: Store a default title or fetch from YouTube API if desired later
      title: { S: "Patient Story" }, 
      createdAt: { S: new Date().toISOString() }
    };

    await db.send(new PutItemCommand({
      TableName: TABLE_NAME,
      Item: newItem
    }));

    res.status(201).json({ message: "Added successfully", item: newItem });
  } catch (error) {
    console.error("Error adding testimonial:", error);
    res.status(500).json({ error: "Failed to add testimonial" });
  }
};

// --- 2. GET ALL ---
export const getAllTestimonials = async (req: any, res: any) => {
  try {
    const result = await db.send(new ScanCommand({ TableName: TABLE_NAME }));
    
    const items = result.Items?.map((item: any) => ({
      id: item.id.S,
      videoUrl: item.videoUrl.S,
      videoId: item.videoId.S,
      title: item.title?.S || "Patient Story",
      createdAt: item.createdAt.S
    })) || [];

    // Sort newest first
    items.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};

// --- 3. DELETE ---
export const deleteTestimonial = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    await db.send(new DeleteItemCommand({
      TableName: TABLE_NAME,
      Key: { id: { S: id } }
    }));
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting:", error);
    res.status(500).json({ error: "Failed to delete" });
  }
};