
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          name: 'Percy',
          email: 'percy@kittehquat.com',
          password: '$2b$10$9qRc4gXEcY697OBMvsxB4.tPfDdcWRmNj9BvoG5quV733U20GfObm',
          meta: 'pw = sausageNum1!',
          created_at: new Date().toUTCString(),
          updated_at: new Date().toUTCString()
        },
        {
          name: 'Oscar',
          email: 'oscar@kittehquat.com',
          password: '$2b$10$9qRc4gXEcY697OBMvsxB4.tPfDdcWRmNj9BvoG5quV733U20GfObm',
          meta: 'pw = sausageNum1!',
          created_at: new Date().toUTCString(),
          updated_at: new Date().toUTCString()
        },
        {
          name: 'Bee',
          email: 'bee@kittehquat.com',
          password: '$2b$10$9qRc4gXEcY697OBMvsxB4.tPfDdcWRmNj9BvoG5quV733U20GfObm',
          meta: 'pw = sausageNum1!',
          created_at: new Date().toUTCString(),
          updated_at: new Date().toUTCString()
        },
      ]);
    });
};
