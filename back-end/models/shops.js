const { pool } = require("../config/db");

async function getShops(id) {
  try {
    let sql =
      "SELECT * FROM shops_info WHERE id NOT IN (SELECT id_shop FROM disliked_shops WHERE id_user = ?)";
    const [result] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    return [];
  }
}

async function likeShop(user_id, shop_id) {
  try {
    let sql = "INSERT INTO liked_shops (id_user, id_shop) values (?, ?)";
    const [result] = await pool.query(sql, [user_id, shop_id]);
    return true;
  } catch (err) {
    return false;
  }
}

async function dislikeShop(user_id, shop_id) {
  try {
    let sql = "INSERT INTO disliked_shops (id_user, id_shop) values (?, ?)";
    const [result] = await pool.query(sql, [user_id, shop_id]);
    return true;
  } catch (err) {
    return false;
  }
}

async function likedShops(user_id) {
  try {
    let sql = "SELECT * FROM liked_shops WHERE id_user = ?";
    const [result] = await pool.query(sql, [user_id]);
    return result;
  } catch (err) {
    return [];
  }
}
module.exports = {
  getShops,
  likeShop,
  dislikeShop,
  likedShops
};
