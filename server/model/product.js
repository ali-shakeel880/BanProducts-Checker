import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reasons: {
    type: [String],
    default: []
  },
  countries: {
    type: [String],
    default: []
  },
  categories: {
    type: [String],
    default: []
  },
  logo: {
    type: String,
    
  },
  alternatives: {
    type: [String],
    default: []
  }
});

const Product = mongoose.model('product', productSchema);
export default Product;
