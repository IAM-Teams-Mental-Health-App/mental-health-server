
exports.up = async function(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('email').unique().notNullable();
		table.string('username').unique().notNullable();
		table.string('password').notNullable();
    table.timestamp('dateCreated').defaultTo(knex.fn.now());
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
};
