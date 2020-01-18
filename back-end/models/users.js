const { pool } = require("../config/db");

async function findOne(email) {
  try {
    let sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.query(sql, [email]);
    return rows[0];
  } catch (error) {
    return false;
  }
}

async function register(email, password) {
  try {
    let sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    const [result] = await pool.query(sql, [email, password]);
    if (result.affectedRows) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

async function findById(id) {
  try {
    let sql = "SELECT id , email FROM users WHERE id = ? ";
    const [result] = await pool.query(sql, [id]);
    return result[0];
  } catch (error) {
    console.log(error);
    return false;
  }
}

// get user position
async function getPosition(id) {
  let sql = "SELECT user_latitude, user_longitude FROM users WHERE id = ?";
  const [result] = await pool.query(sql, [id]);
  return result[0];
}

module.exports = {
  findOne,
  register,
  findById,
  getPosition
};
