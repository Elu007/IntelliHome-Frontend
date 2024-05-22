const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = 'mongodb+srv://rupakchowdhury144:1234@rup11.66iibjt.mongodb.net/attendance_db';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
  const attendanceCollection = connection.collection('entries');  
});

// Schema and Model
const attendanceSchema = new mongoose.Schema({
  name: String,
  time: String,
},{ collection: 'entries' });

const Attendance = mongoose.model('Attendance', attendanceSchema);

// Routes
app.get('/attendances', async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.json(attendances);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
