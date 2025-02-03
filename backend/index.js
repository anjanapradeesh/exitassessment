const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const BlogModel = require("./model");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const mongoURI = "mongodb+srv://anjanapradeesh:anjanamongo123@cluster0.93gov.mongodb.net/exitassessment?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI, {
  
 
  serverSelectionTimeoutMS: 50000,
})
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });


app.post("/add", async (req, res) => {
  const { title, content, img_url } = req.body;
  if (!title || !content || !img_url) {
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }

  try {
    const newBlog = new BlogModel({ title, content, img_url });
    await newBlog.save();
    res.status(201).json({ success: true, message: "Blog added successfully!" });
  } catch (error) {
    console.error("Error saving blog:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});


app.get("/get", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.send(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch blogs." });
  }
});


app.delete("/delete/:addId", async (req, res) => {
  const { addId } = req.params;
  try {
    await BlogModel.findByIdAndDelete(addId);
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


app.put("/update/:addId", async (req, res) => {
  const { addId } = req.params;
  const { title, content, img_url } = req.body;

  if (!title || !content || !img_url) {
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }

  console.log("Updating Blog with ID:", addId);
  console.log("Request body:", { title, content, img_url });

  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      addId,
      { title, content, img_url },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, message: "Blog updated successfully!", updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});