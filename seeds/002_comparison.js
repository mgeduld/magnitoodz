
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('comparison').del()
    .then(function () {
      // Inserts seed entries
      return knex('comparison').insert([
        {
          user_id: 1,
          title: 'Dinosaurs and Humans',
          span_1_name: 'Time-span between stegosaurus and Tyrannosaurus Rex',
          span_2_name: 'Timespan between Tyrannosaurus Rex and Humans',
          span_1_magnitude: 83000000,
          span_2_magnitude: 66000000,
          unit: 'years',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          title: 'Age of the Universe vs Age of Our Species',
          span_1_name: 'Universe',
          span_2_name: 'Humans',
          span_1_magnitude: 14000000000,
          span_2_magnitude: 200000,
          unit: 'years',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Ancient Egpyt vs USA',
          span_1_name: 'Timespan of Ancient Egypt',
          span_2_name: 'Timespan of USA (so far)',
          span_1_magnitude: 3000,
          span_2_magnitude: 242,
          unit: 'years',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Number of Human Neurons vs Number of Jellyfish Neurons',
          span_1_name: 'Humnan',
          span_2_name: 'Jellyfish',
          span_1_magnitude: 86000000000,
          span_2_magnitude: 3470,
          unit: '# neurons',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          created_at: new Date(),
          updated_at: new Date(),
        }
      ]);
    });
};
