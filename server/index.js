import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "seven_days";

async function connectToMongoDB() {
  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db(dbName);
    console.log("✅ Connected to MongoDB successfully");
    console.log(`📦 Database: ${dbName}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

// API Routes

// Create a new booking
app.post("/api/bookings", async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("bookings").insertOne(bookingData);
    
    console.log(`📅 New booking created: ${result.insertedId}`);
    console.log(`   Name: ${bookingData.name}`);
    console.log(`   Email: ${bookingData.email}`);
    console.log(`   Date: ${bookingData.date} at ${bookingData.time}`);
    
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      bookingId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
});

// Get all bookings (for admin)
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await db
      .collection("bookings")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
});

// Get a single booking
app.get("/api/bookings/:id", async (req, res) => {
  try {
    const { ObjectId } = await import("mongodb");
    const booking = await db
      .collection("bookings")
      .findOne({ _id: new ObjectId(req.params.id) });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    
    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
    });
  }
});

// Update booking status
app.patch("/api/bookings/:id", async (req, res) => {
  try {
    const { ObjectId } = await import("mongodb");
    const { status } = req.body;
    
    const result = await db.collection("bookings").updateOne(
      { _id: new ObjectId(req.params.id) },
      { 
        $set: { 
          status,
          updatedAt: new Date(),
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    
    res.json({
      success: true,
      message: "Booking updated successfully",
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update booking",
    });
  }
});

// Delete a booking
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const { ObjectId } = await import("mongodb");
    const result = await db
      .collection("bookings")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    
    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
    });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ===== CONTACT FORM ENDPOINTS =====

// Create a new contact message
app.post("/api/contacts", async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      status: "unread",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("contacts").insertOne(contactData);
    
    console.log(`📩 New contact message: ${result.insertedId}`);
    console.log(`   Name: ${contactData.firstName} ${contactData.lastName}`);
    console.log(`   Email: ${contactData.email}`);
    console.log(`   Subject: ${contactData.subject}`);
    
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contactId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

// Get all contact messages (for admin)
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await db
      .collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
});

// Update contact status (mark as read/replied)
app.patch("/api/contacts/:id", async (req, res) => {
  try {
    const { ObjectId } = await import("mongodb");
    const { status } = req.body;
    
    const result = await db.collection("contacts").updateOne(
      { _id: new ObjectId(req.params.id) },
      { 
        $set: { 
          status,
          updatedAt: new Date(),
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    
    res.json({
      success: true,
      message: "Contact updated successfully",
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update contact",
    });
  }
});

// Delete a contact
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const { ObjectId } = await import("mongodb");
    const result = await db
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    
    res.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete contact",
    });
  }
});

// Start server
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📌 API endpoints:`);
    console.log(`   POST   /api/bookings     - Create new booking`);
    console.log(`   GET    /api/bookings     - Get all bookings`);
    console.log(`   GET    /api/bookings/:id - Get single booking`);
    console.log(`   PATCH  /api/bookings/:id - Update booking status`);
    console.log(`   DELETE /api/bookings/:id - Delete booking`);
    console.log(`   POST   /api/contacts     - Create new contact message`);
    console.log(`   GET    /api/contacts     - Get all contact messages`);
    console.log(`   PATCH  /api/contacts/:id - Update contact status`);
    console.log(`   DELETE /api/contacts/:id - Delete contact`);
  });
});
