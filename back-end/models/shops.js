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
async function getFavorite(id) {
  try {
    let sql =
      "SELECT t2.* FROM liked_shops t1 INNER JOIN shops_info t2 on t1.id_shop = t2.id WHERE t1.id_user = ?";
    const [result] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    console.log(error);
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

async function removeShop(user_id, shop_id) {
  try {
    let sql = "DELETE FROM liked_shops WHERE id_user = ? AND id_shop = ?";
    const [result] = await pool.query(sql, [user_id, shop_id]);
    return true;
  } catch (err) {
    return false;
  }
}
module.exports = {
  getShops,
  likeShop,
  dislikeShop,
  likedShops,
  getFavorite,
  removeShop
};
