export const TestCategoriesAttributes = [
  {
    category_id: 'real_estate',
    attributes: [
      {
        name: 'apartment',
        collection: {
          name: 'buy_type',
          selection: 'one',
          items: [
            {
              name: 'buy',
              selection: 'many',
              variants: ['new', 'old'],
              otherFilters: [
                {
                  name: 'layout',
                  selection: 'many',
                  variants: ['studio', 'one', 'two', 'three', 'four', 'more'],
                },
              ],
            },
            {
              name: 'rent',
              selection: 'many',
              collection: [],
            },
          ],
        },
      },
    ],
  },
];

export const AttributesVariables = [
  {
    attribute_id: 1,
    variants: ['apartment', 'room', 'house', 'stead', 'garage', 'commercial'],
    selection: 'one',
  },
  {
    attribute_id: 2,
    variants: ['buy', 'rent'],
    selection: 'one',
  },
  {
    attribute_id: 3,
    variants: ['new', 'old'],
    selection: 'many',
  },
  {
    attribute_id: 4,
    variants: ['studio', 'one', 'two', 'three', 'four', 'more'],
    selection: 'many',
  },
  {
    attribute_id: 5,
    variants: ['cars', 'trucs', 'motocycle', 'water'],
    selection: 'one',
  },
  {
    attribute_id: 6,
    variants: ['buy', 'rent'],
    selection: 'one',
  },
];
