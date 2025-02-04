exports.up = function (knex) {
    return knex.schema.createTable('bookings', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
        table.date('date').notNullable();
        table.time('time').notNullable();
        table.integer('guests').notNullable();
        table.string('phone', 20);
        table.string('status', 20).defaultTo('new');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('bookings');
};
