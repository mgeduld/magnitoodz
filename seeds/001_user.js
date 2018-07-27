
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          name: 'Andy',
          email: 'andy@yay.com',
          password: 'andypw',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Bill',
          email: 'bill@yay.com',
          password: 'billpw',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Charlie',
          email: 'charlie@yay.com',
          password: 'charliepw',
          created_at: new Date(),
          updated_at: new Date()
        },
      ]);
    });
};
