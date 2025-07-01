// Load environment variables
require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const skuRoutes = require('./routes/sku.routes');
const cmRoutes = require('./routes/cm.routes');
const jwtMiddleware = require('./middleware/middleware.jwt');
const pool = require('./config/db.config');

// Sample route
fastify.get('/health', async (request, reply) => {
  return { status: 'ok' };
});

// Register SKU routes
fastify.register(skuRoutes);

// Register CM routes
fastify.register(cmRoutes);

// Add JWT middleware globally
//fastify.addHook('preHandler', jwtMiddleware);

// Test database connection
fastify.get('/db-test', async (request, reply) => {
  try {
    const result = await pool.query('SELECT NOW()');
    return { 
      status: 'Database connected successfully', 
      timestamp: result.rows[0].now 
    };
  } catch (error) {
    fastify.log.error('Database connection failed:', error);
    return reply.code(500).send({ 
      status: 'Database connection failed', 
      error: error.message 
    });
  }
});

// Start server
const start = async () => {
  try {
    // Test database connection on startup
    await pool.query('SELECT NOW()');
    fastify.log.info('Database connected successfully');
    
    await fastify.listen({ port: process.env.PORT || 5000, host: '0.0.0.0' });
    fastify.log.info(`Server running on port ${process.env.PORT || 5000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start(); 