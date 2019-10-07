exports.up = function(knex) {
  return knex.schema.createTable('user_projects', tbl => {
    tbl.increments('id');
    tbl
      .integer('userId')
      .unsigned()
      .references('users.id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');
    tbl
      .integer('teamId')
      .unsigned()
      .inTable('team')
      .references('team.id')
      .onDelete('CASCADE');
    tbl.boolean('private').defaultTo(false);
    tbl.string('name').notNullable();
    tbl.text('description');
    tbl.string('figma');
    tbl.string('invision');
    tbl.text('mainImg');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_projects');
};
