
exports.seed = async function(knex) {
  await knex("posts").insert([
    {
      type: 'circle',
      color: 'FFC47E',
      userID: 1,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui consectetur enim eligendi laboriosam, dolor tempora debitis distinctio quisquam et unde, ipsam perferendis soluta obcaecati facilis omnis vitae inventore saepe deserunt!',
    },
    {
      type: 'square',
      color: '395185',
      userID: 2,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui consectetur enim eligendi laboriosam, dolor tempora debitis distinctio quisquam et unde, ipsam perferendis soluta obcaecati facilis omnis vitae inventore saepe deserunt!',
    },
    {
      type: 'circle',
      color: 'EE4444',
      userID: 1,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui consectetur enim eligendi laboriosam, dolor tempora debitis distinctio quisquam et unde, ipsam perferendis soluta obcaecati facilis omnis vitae inventore saepe deserunt!',
    },
  ]);
};
