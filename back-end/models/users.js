const {
    pool
} = require("../config/db");

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

module.exports = {
    findOne,
    register
};