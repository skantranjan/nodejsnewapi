const pool = require('../config/db.config');

/**
 * Get all unique CM codes from the database
 * @returns {Promise<Array>} Array of CM codes with descriptions
 */
async function getAllCMCodes() {
  const query = `
    SELECT DISTINCT cm_code, cm_description 
    FROM public.sdp_cm 
    ORDER BY cm_code;
  `;
  
  const result = await pool.query(query);
  return result.rows;
}

/**
 * Get a specific CM code by code
 * @param {string} cmCode - The CM code to search for
 * @returns {Promise<Object|null>} CM code data or null if not found
 */
async function getCMCodeByCode(cmCode) {
  const query = `
    SELECT id, cm_code, cm_description, created_at, updated_at
    FROM public.sdp_cm 
    WHERE cm_code = $1;
  `;
  
  const result = await pool.query(query, [cmCode]);
  return result.rows.length > 0 ? result.rows[0] : null;
}

module.exports = { 
  getAllCMCodes, 
  getCMCodeByCode 
}; 