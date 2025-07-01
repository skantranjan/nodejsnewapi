const pool = require('../config/db.config');

/**
 * Controller to get unique CM codes from the database
 */
async function getCMCodesController(request, reply) {
  try {
    // Query to get unique CM codes
    const query = `
      SELECT DISTINCT cm_code, cm_description 
      FROM public.sdp_cm 
      ORDER BY cm_code;
    `;
    
    const result = await pool.query(query);
    
    reply.code(200).send({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({ 
      success: false, 
      message: 'Failed to fetch CM codes', 
      error: error.message 
    });
  }
}

/**
 * Controller to get a specific CM code by code
 */
async function getCMCodeByCodeController(request, reply) {
  try {
    const { cm_code } = request.params;
    
    const query = `
      SELECT id, cm_code, cm_description, created_at, updated_at
      FROM public.sdp_cm 
      WHERE cm_code = $1;
    `;
    
    const result = await pool.query(query, [cm_code]);
    
    if (result.rows.length === 0) {
      return reply.code(404).send({ 
        success: false, 
        message: 'CM code not found' 
      });
    }
    
    reply.code(200).send({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({ 
      success: false, 
      message: 'Failed to fetch CM code', 
      error: error.message 
    });
  }
}

module.exports = { 
  getCMCodesController, 
  getCMCodeByCodeController 
}; 