const app = require('./app');
const { connectDB } = require('./config/db');  // Import the DB connection function
const { BasicConfig } = require('./config/env.constant');

const PORT = BasicConfig.port || 3001;

// Ensure DB connection when starting the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});