
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
          description: 'Hollywood makes it seem as if all dinosaurs lived at the same time, but there were many different periods in which they lived--with older species going extinct and newer ones coming into being. No T-Rex ever met a stegosaurus.',
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
          description: 'The Universe is old. Very old. We are young. Babies, in fact. Our species has only been around for 50,000 - 200,000 years, depending on what you think of as fully human.',
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
          description: 'We sometimes feel as if our culture is ancient. Some cultuers are, but America is not. Which is a sobering thought: many longer-lasting cultures no longer exist. Will America still be here 3,000 years from now?',
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
          unit: 'neurons',
          created_at: new Date(),
          updated_at: new Date(),
        }
      ]);
    });
};
