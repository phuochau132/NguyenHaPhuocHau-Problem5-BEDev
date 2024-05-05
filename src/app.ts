import express from "express";
import bodyParser from "body-parser";
import { Database } from "./db";
import dotenv from "dotenv";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const db = new Database();

// Create a resource
app.post("/resources", async (req, res) => {
  const { name, description } = req.body;
  const resource = await db.createResource(name, description);
  res.json(resource);
});
const port = process.env.PORT;
console.log("port", port);

// List resources with basic filters
app.get("/resources", async (req, res) => {
  const resources = await db.getResources();
  res.json(resources);
});

// Get details of a resource
app.get("/resources/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  const resource = await db.getResourceById(id);
  if (!resource) {
    res.status(404).json({ error: "Resource not found" });
  } else {
    res.json(resource);
  }
});

// Update resource details
app.put("/resources/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updatedResource = await db.updateResource(id, name, description);
  if (!updatedResource) {
    res.status(404).json({ error: "Resource not found" });
  } else {
    res.json(updatedResource);
  }
});

// Delete a resource
app.delete("/resources/:id", async (req, res) => {
  const { id } = req.params;
  const deletedResource = await db.deleteResource(id);
  if (!deletedResource) {
    res.status(404).json({ error: "Resource not found" });
  } else {
    res.json({ message: "Resource deleted successfully" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
