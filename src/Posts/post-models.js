const db = require('../../database/config');

function fetchAllPosts() {
  return db("posts").orderBy("dateCreated", "desc");
}

function findPostsById(id) {
  return db("posts").where({ id }).first();
}

async function insertPost(postData) {
  const [postID] = await db("posts").insert(postData).returning("id");
  return findPostsById(postID);
}

async function updatePost(postData, id) {
  await db("posts").update(postData).where({ id });
  return findPostsById(id);
}

function deletePost(id) {
  return db("posts").delete().where({ id });
}

function fetchPostByUserID(id) {
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

module.exports = {
  fetchAllPosts,
  findPostsById,
  insertPost,
  updatePost,
  deletePost,
  fetchPostByUserID,
};
