import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace the connection string with your own)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log("Can't connect to mongoDB", err));

// Define a Schema for charComponents (Characters, weapons, and artifacts)
const charSchema = new mongoose.Schema({
    id: Number,
    name: String,
    weapon: String,
    artifacts: [String],
    // You can add other properties as needed (e.g., id, element, etc.)
});

const Character = mongoose.model('Character', charSchema);

// Route to get all characters (retrieve charComponents)
app.get('/api/characters', async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to save characters (add or update charComponents)
app.post('/api/characters', async (req, res) => {
  const { id, name, weapon, artifacts } = req.body;

  const newCharacter = new Character({
    id,
    name,
    weapon,
    artifacts,
  });

  try {
    await newCharacter.save();
    res.status(201).json(newCharacter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update character
app.put('/api/characters/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) return res.status(404).json({ message: 'Character not found' });

    const { weapon, artifacts } = req.body;

    if (weapon) character.weapon = weapon;
    if (artifacts) character.artifacts = artifacts;

    await character.save();
    res.json(character);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a character by ID
app.delete('/api/characters/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedChar = await Character.findOneAndDelete({ id });
  
      if (!deletedChar) {
        return res.status(404).json({ message: 'Character not found' });
      }
  
      res.status(200).json({ message: 'Character deleted successfully', deletedChar });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
