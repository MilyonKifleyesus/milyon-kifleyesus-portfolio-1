import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    console.log("Contact API called");
    const body = await request.json();
    const { name, email, subject, message } = body;

    console.log("Received data:", {
      name,
      email,
      subject,
      message: message?.substring(0, 50),
    });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log("Validation failed: missing fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Validation failed: invalid email format");
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    console.log("Validation passed, connecting to MongoDB...");

    // Connect to database
    const db = await getDb();
    const messagesCollection = db.collection("messages");

    // Create message document
    const messageDoc = {
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
      read: false,
      replied: false,
    };

    // Save to database
    const result = await messagesCollection.insertOne(messageDoc);
    console.log("Message saved to MongoDB:", result.insertedId);

    return NextResponse.json(
      {
        success: true,
        messageId: result.insertedId,
        message: "Message sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error: `Internal server error: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
