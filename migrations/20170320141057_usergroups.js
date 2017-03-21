
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
  	table.integer('group');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
  	table.dropColumn('group');
  });
};
