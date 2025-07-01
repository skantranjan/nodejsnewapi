const { getCMCodesController, getCMCodeByCodeController } = require('../controllers/controller.getcmcodes');

async function cmRoutes(fastify, options) {
  // Get all unique CM codes
  fastify.get('/cm-codes', getCMCodesController);
  
  // Get specific CM code by code
  fastify.get('/cm-codes/:cm_code', getCMCodeByCodeController);
}

module.exports = cmRoutes; 