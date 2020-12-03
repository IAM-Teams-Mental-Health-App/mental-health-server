// const db = require('../../database/config');
const db = require("../../database/config");


const findById = (id) => {
  return db("users")
    .select(
      "id",
      "username",
      "email",
      "dateCreated",
    )
    .where({ id })
    .first();
};

const findByEmail = (email) => {
  return db("users").select("*").where({ email }).first();
};

const findByUsername = (username) => {
  return db("users")
    .select(
      "id",
      "username",
      "email",
      "dateCreated",
    )
    .where({ username })
    .first();
};

const insert = async (user) => {
  try {
    const [res] = await db("users").insert(user).returning("id");
    // console.log('## added USER', res);
    return findById(res);
  } catch (error) {
    console.log(error);
  }
};

const update = async (user, id) => {
  await db("users").update(user).where({ id }).select("*");
  return findById(id);
};

const remove = (id) => {
  return db("users").delete().where({ id });
};

module.exports = { findById, findByEmail, findByUsername, insert, update, remove };
