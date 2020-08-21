const db = require("../database/dbConfig.js");

module.exports = {
    findBy,
    add,
    findById
};

function findBy(username) {
    return db("users")
    .where(username)
    .orderBy("id");
  }

async function add(user) {
    try {
      const [id] = await db("users").insert(user, "id");
  
      return findById(id);
    } catch (error) {
      throw error;
    }
  }

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
