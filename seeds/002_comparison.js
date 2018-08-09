exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comparison')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('comparison').insert([
        {
          user_id: 1,
          title: 'Populations: China vs US',
          span_1_name: 'China',
          span_2_name: 'US',
          span_1_magnitude: 1415045928,
          span_2_magnitude: 326766748,
          unit: 'people',
          rating: 0,
          meta: null,
          description:
            'Source: [http://www.worldometers.info/world-population/population-by-country/](http://www.worldometers.info/world-population/population-by-country/)',
          created_at: '2018-08-08T21:59:03.000Z',
          updated_at: '2018-08-08T21:59:03.000Z'
        },
        {
          user_id: 1,
          title: 'Daily Word Count: Anne Rice vs Ernest Hemingway',
          span_1_name: 'Rice',
          span_2_name: 'Hemingway',
          span_1_magnitude: 3000,
          span_2_magnitude: 500,
          unit: 'words',
          rating: 0,
          meta: null,
          description:
            'Source: [https://writerswrite.co.za/the-daily-word-counts-of-39-famous-authors-1/](https://writerswrite.co.za/the-daily-word-counts-of-39-famous-authors-1/)',
          created_at: '2018-08-08T18:23:45.000Z',
          updated_at: '2018-08-08T18:23:45.000Z'
        },
        {
          user_id: 1,
          title: 'Kilobyes RAM: IPhone 8 vs Apple II',
          span_1_name: 'Apple II',
          span_2_name: 'IPhone 8',
          span_1_magnitude: 48,
          span_2_magnitude: 3000000,
          unit: 'kilobytes',
          rating: 0,
          meta: null,
          description: '(A high-end Apple II with 48K RAM)',
          created_at: '2018-08-08T18:10:34.000Z',
          updated_at: '2018-08-08T18:10:34.000Z'
        },
        {
          user_id: 1,
          title: 'Body Count: Marvel vs DC Movies',
          span_1_name: 'Marvel',
          span_2_name: 'DC',
          span_1_magnitude: 5002620,
          span_2_magnitude: 6015130000,
          unit: 'deaths',
          rating: 0,
          meta: null,
          description:
            'Source: [http://www.bodycounters.com/statistics.php](http://www.bodycounters.com/statistics.php)',
          created_at: '2018-08-08T18:04:35.000Z',
          updated_at: '2018-08-08T18:04:35.000Z'
        },
        {
          user_id: 1,
          title:
            'Time Between Cleopatra and the Great Pyramids vs Cleopatra and Pizza Hut',
          span_1_name: 'Timespan between Cleopatra and the Great Pyramids',
          span_2_name: 'Timespan between Cleopatra and Pizza Hut',
          span_1_magnitude: 2530,
          span_2_magnitude: 1988,
          unit: 'years',
          rating: 0,
          meta: null,
          description:
            'Cleopatra lived circa 30BC, which was X years after the building of the Great Pyramids, around 2560BC. Pizza Hut was founded in 1958.',
          created_at: '2018-08-08T17:15:31.000Z',
          updated_at: '2018-08-08T17:15:31.000Z'
        },
        {
          user_id: 1,
          title: 'Net Worth of the Average American vs Jeff Bezos',
          span_1_name: 'Bezos',
          span_2_name: 'Average 40-year-old American',
          span_1_magnitude: 143000000000,
          span_2_magnitude: 550000,
          unit: 'dollars',
          rating: 0,
          meta: null,
          description:
            "Jeff Bezos is [rich](https://www.financialsamurai.com/the-average-net-worth-for-a-40-year-old/). You're not.",
          created_at: '2018-08-08T17:08:19.000Z',
          updated_at: '2018-08-08T17:08:19.000Z'
        },
        {
          user_id: 1,
          title: 'Population of Europe Before and After the Black Death',
          span_1_name: 'Before the plague ',
          span_2_name: 'After the plague',
          span_1_magnitude: 78000000,
          span_2_magnitude: 39000000,
          unit: 'people',
          rating: 0,
          meta: null,
          description:
            'The Plague, also known as [the Black Death](https://www.historytoday.com/ole-j-benedictow/black-death-greatest-catastrophe-ever), killed more people than died World War II. During the Middle ages, it wiped out half of Europe. It took 200 years for the population to recover. ',
          created_at: '2018-08-08T16:47:48.000Z',
          updated_at: '2018-08-08T16:47:48.000Z'
        },
        {
          user_id: 1,
          title: 'Murder Rate in NYC: 1990 vs 2017',
          span_1_name: '1990',
          span_2_name: '2017',
          span_1_magnitude: 2245,
          span_2_magnitude: 290,
          unit: 'murders',
          rating: 0,
          meta: null,
          description: null,
          created_at: '2018-08-06T00:13:53.000Z',
          updated_at: '2018-08-08T16:29:57.000Z'
        },
        {
          user_id: 1,
          title: 'Average Human Height vs the Length of Human Small Intestines',
          span_1_name: 'Human',
          span_2_name: 'Intestines',
          span_1_magnitude: 5.9,
          span_2_magnitude: 20,
          unit: 'feet',
          rating: 0,
          meta: null,
          description:
            "Here's the average height of American males compared to the length of human small intestines, if removed from the body and stretched out.",
          created_at: '2018-08-05T23:54:29.000Z',
          updated_at: '2018-08-08T16:52:04.000Z'
        },
        {
          user_id: 1,
          title: "Average Vocabulary vs Shakespeare's Vocabulary",
          span_1_name: 'Average',
          span_2_name: 'Shakespeare',
          span_1_magnitude: 20000,
          span_2_magnitude: 66000,
          unit: 'words',
          rating: 0,
          meta: null,
          description: null,
          created_at: '2018-08-04T21:56:03.000Z',
          updated_at: '2018-08-04T21:56:03.000Z'
        },
        {
          user_id: 1,
          title: 'Tallest Mountain vs Deepest Ocean',
          span_1_name: 'Mount Everest',
          span_2_name: 'Marina Trench',
          span_1_magnitude: 29029,
          span_2_magnitude: 654720,
          unit: 'feet',
          rating: 0,
          meta: null,
          description:
            "Everest is the tallest mountain, and it seems really, really tall, but compared to the Marina Trench (the deepest part of the pacific ocean), it's a shorty.",
          created_at: '2018-08-04T21:35:38.000Z',
          updated_at: '2018-08-04T21:35:38.000Z'
        },
        {
          user_id: 1,
          title: 'Age of the Universe vs Age of Our Species',
          span_1_name: 'Universe',
          span_2_name: 'Humans',
          span_1_magnitude: 14000000000,
          span_2_magnitude: 200000,
          unit: 'years',
          rating: 0,
          meta: null,
          description:
            'The Universe is old. Very old. We are young. Babies, in fact. Our species has only been around for 50,000 - 200,000 years, depending on what you think of as fully human.',
          created_at: '2018-07-30T21:03:28.833Z',
          updated_at: '2018-07-30T21:03:28.833Z'
        },
        {
          user_id: 1,
          title:
            'Time Between Stegosaurus and Tyrannosaurus vs Times Between Dinos and Humans',
          span_1_name: 'Timespan between stegosaurus and Tyrannosaurus Rex',
          span_2_name: 'Timespan between Tyrannosaurus Rex and Humans',
          span_1_magnitude: 83000000,
          span_2_magnitude: 66000000,
          unit: 'years',
          rating: 0,
          meta: null,
          description:
            'Hollywood makes it seem as if all dinosaurs lived at the same time, but there were many different periods in which they lived--with older species going extinct and newer ones coming into being. No T-Rex ever met a stegosaurus.',
          created_at: '2018-07-30T21:03:28.833Z',
          updated_at: '2018-08-08T16:57:01.000Z'
        },
        {
          user_id: 1,
          title: 'Length of Existence of Ancient Egypt vs USA (so far)',
          span_1_name: 'Timespan of Ancient Egypt',
          span_2_name: 'Timespan of USA (so far)',
          span_1_magnitude: 3000,
          span_2_magnitude: 242,
          unit: 'years',
          rating: 0,
          meta: null,
          description:
            'We sometimes feel as if our culture is ancient. Some cultuers are, but America is not. Which is a sobering thought: many longer-lasting cultures no longer exist. Will America still be here 3,000 years from now?',
          created_at: '2018-07-30T21:03:28.833Z',
          updated_at: '2018-08-08T16:53:37.000Z'
        },
        {
          user_id: 1,
          title: 'Number of Human Neurons vs Number of Jellyfish Neurons',
          span_1_name: 'Humnan',
          span_2_name: 'Jellyfish',
          span_1_magnitude: 86000000000,
          span_2_magnitude: 3470,
          unit: 'neurons',
          rating: 0,
          meta: null,
          description: null,
          created_at: '2018-07-30T21:03:28.833Z',
          updated_at: '2018-07-30T21:03:28.833Z'
        }
      ])
    })
}
