
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comparison').del()
    .then(function () {
      // Inserts seed entries
      return knex('comparison').insert([
        {
          user_id: 1,
          title: 'Title A',
          span_1_name: 'A_1',
          span_2_name: 'A_2',
          span_1_magnitude: 100,
          span_2_magnitude: 10,
          description: 'A abc def ghi',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          title: 'Title B',
          span_1_name: 'B_1',
          span_2_name: 'B_2',
          span_1_magnitude: 1000,
          span_2_magnitude: 10,
          description: 'B abc def ghi',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Title C',
          span_1_name: 'C_1',
          span_2_name: 'C_2',
          span_1_magnitude: 10000,
          span_2_magnitude: 3,
          description: 'C abc def ghi',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    });
};
