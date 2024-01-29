const mongoose = require('mongoose');

const connectDB = (app) => {
  const dbURI = process.env.MONGO_URI; // Use the environment variable set on the server
  mongoose.connect(dbURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected...");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
}

module.exports = connectDB;
