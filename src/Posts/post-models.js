const db = require('../../database/config');

function fetchAllProjs() {
  return db("posts");
}

function findProjectById(id) {
  return db("posts").where({ id }).first();
}

async function insertProject(postData) {
  const [postID] = await db("posts").insert(postData).returning("id");
  return findProjectById(postID);
}

async function updateProject(postData, id) {
  await db("posts").update(postData).where({ id });
  return findProjectById(id);
}

function removeProject(id) {
  return db("posts").delete().where({ id });
}

function fetchProjByUserID(id) {
  return db("posts")
    .join("users", "users.id", "=", "posts.userID")
    .where("users.id", id)
    .select(
      "posts.id as projectID",
      "posts.dateCreated",
      "posts.type",
      "posts.color",
      "posts.content",
      "users.id as userID",
      "users.username",
    );
}

export {
  fetchAllProjs,
  findProjectById,
  insertProject,
  updateProject,
  removeProject,
  fetchProjByUserID,
};
