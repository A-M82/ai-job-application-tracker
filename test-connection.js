// test-connection.js — run with: node test-connection.js
const connectDB = require('./db');
 
async function main() {
  try {
    const db = await connectDB();
    const collections = await db.listCollections().toArray();
    console.log('Collections found:', collections.map(c => c.name));
  } catch (err) {
    console.error('Connection failed:', err.message);
  } finally {
    process.exit(0);
  }
}
 
main();
 