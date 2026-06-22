require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/productsSchema');

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 1000;

const categories = ['electronics', 'clothing', 'home', 'books', 'sports', 'toys', 'beauty', 'groceries'];


function generateProduct() {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const price = parseFloat((Math.random() * 1000 + 1).toFixed(2));
  const now = new Date();

  return {
    name: `${category}-item-${Math.floor(Math.random() * 100000)}`,
    category,
    price,
    created_at: now,
    updated_at: now
  };
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB. Seeding...');

    
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    let inserted = 0;

    while (inserted < TOTAL_PRODUCTS) {
      const batch = [];
      const currentBatchSize = Math.min(BATCH_SIZE, TOTAL_PRODUCTS - inserted);

      for (let i = 0; i < currentBatchSize; i++) {
        batch.push(generateProduct());
      }

      await Product.insertMany(batch);
      inserted += currentBatchSize;
      console.log(`Inserted ${inserted} / ${TOTAL_PRODUCTS}`);
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();