const request = require('supertest');
const app = require('../src/app');  // Use app without listening
const { connectDB, disconnectDB } = require('../src/config/db');  // Use the shared DB connection
const SKU = require('../src/models/SKU');
const Order = require('../src/models/Order');

// Mock API key for authorization
const apiKey = 'fkdsjgn5295nfvdnewnegsfdgrwj'; 

// Ensure connection to the test database
beforeAll(async () => {
    await connectDB();  // Use shared connectDB function
});

// Clean up the database before each test
beforeEach(async () => {
    await SKU.deleteMany();
    await Order.deleteMany();

    // Populate some initial SKUs for testing
    await SKU.insertMany([
        { skuId: 'SKU001', name: 'Apple', quantity: 50 },
        { skuId: 'SKU002', name: 'Banana', quantity: 100 },
        { skuId: 'SKU003', name: 'Orange', quantity: 75 },
    ]);
});

// Clean up after all tests
afterAll(async () => {
    // Clear all the data in all collections
    await SKU.deleteMany();
    await Order.deleteMany();
    await disconnectDB();  // Use shared disconnectDB function for cleanup
});

describe('Inventory and Order Management APIs', () => {
    
    // Test the Retrieve SKUs by Name API
    describe('GET /api/v1/sku', () => {
        it('should return SKUs starting with a specific letter', async () => {
            const res = await request(app)
                .get('/api/v1/sku?name=A')
                .set('x-api-key', apiKey);
            
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(1);  // Expecting only 1 SKU (Apple)
            expect(res.body[0].name).toBe('Apple');
        });

        it('should return an empty array if no SKUs match the name', async () => {
            const res = await request(app)
                .get('/api/v1/sku?name=Z')
                .set('x-api-key', apiKey);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(0);  // No SKUs starting with 'Z'
        });
    });

    // Test the Allocate SKU to Order API
    describe('POST /api/v1/order/allocate', () => {
        it('should allocate a SKU to an order successfully', async () => {
            const res = await request(app)
                .post('/api/v1/order/allocate')
                .set('x-api-key', apiKey)
                .send({ skuId: 'SKU001', orderNumber: 'ORD001', quantity: 5 });

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('SKU allocated successfully');
        });

        it('should fail to allocate if insufficient stock', async () => {
            const res = await request(app)
                .post('/api/v1/order/allocate')
                .set('x-api-key', apiKey)
                .send({ skuId: 'SKU001', orderNumber: 'ORD002', quantity: 100 });
            
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Insufficient stock');
        });
    });

    // Test the Add Stock to Inventory API
    describe('POST /api/v1/sku/addStock', () => {
        it('should add stock successfully to the SKU inventory', async () => {
            const res = await request(app)
                .post('/api/v1/sku/add')
                .set('x-api-key', apiKey)
                .send({ skuId: 'SKU001', quantity: 20 });
            
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Stock added successfully');

            // Check if stock was updated
            const sku = await SKU.findOne({ skuId: 'SKU001' });
            expect(sku.quantity).toBe(70);  // Original 50 + 20 added
        });
    });

    // Test the Audit API (with and without skuId)
    describe('GET /api/v1/audit', () => {
        it('should perform audit for all SKUs', async () => {
            const res = await request(app)
                .get('/api/v1/audit')
                .set('x-api-key', apiKey);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.totalInwarded).toBeGreaterThan(0);
            expect(res.body.totalAllocated).toBe(0);
            expect(res.body.availableStock).toBeGreaterThan(0);
        });

        it('should perform audit for a specific SKU', async () => {
            const res = await request(app)
                .get('/api/v1/audit?skuId=SKU001')
                .set('x-api-key', apiKey);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.skuId).toBe('SKU001');
            expect(res.body.skuName).toBe('Apple');
            expect(res.body.totalInwarded).toBe(50);  // Initial stock
            expect(res.body.totalAllocated).toBe(0);
            expect(res.body.availableStock).toBe(50);
        });
    });
});
