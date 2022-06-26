import mongoose from '../config/db.config.js'

const AmiiboSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Amiibo = mongoose.model('Amiibo', AmiiboSchema);