const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/webteamdb');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('DB Connection Failed:', error);
  }
}
connectDB();

const StudentModel = mongoose.model('Student', {
  name: String,
  email: String,
  course: String
});

app.post('/add-student', async (req, res) => {
  const data = req.body;
  const newStudent = new StudentModel(data);
  try {
    await newStudent.save();
    res.status(200).send('Student added successfully');
  } catch (err) {
    res.status(400).send('Failed to add student');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});