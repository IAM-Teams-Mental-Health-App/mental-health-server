
exports.up = async function(knex) {
  await knex.schema.createTable('posts', (table) => {
		table.increments('id');
    table.timestamp('dateCreated').defaultTo(knex.fn.now());
    table.string('type').notNullable();
    table.string('color').notNullable();
    table.string('content').notNullable();

    table
			.integer('userID')
			.unsigned()
			.references('id')
			.inTable('users')
			.notNullable()
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('posts');
};
