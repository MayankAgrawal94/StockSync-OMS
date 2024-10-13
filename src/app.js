require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

require('./config/db.config')

const verifyApiKey = require('./middleware/authMiddleware');
const inventoryRoutes = require('./routes/inventoryRoutes');
const auditRoutes = require('./routes/auditRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.get('/health', (req, res) => {
    res.send('Welcome to E-commerce application.');
});

// Apply API Key middleware
app.use(verifyApiKey);

const ApiV1 = 'api/v1'

// Routes
app.use(`/${ApiV1}/sku`, inventoryRoutes);
app.use(`/${ApiV1}/order`, orderRoutes);
app.use(`/${ApiV1}/audit`, auditRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
