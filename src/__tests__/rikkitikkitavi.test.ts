import rikkitikkitavi from '../';

describe('$eq', () => {
  it('should check for  numerical equality', () => {
    expect(
      rikkitikkitavi([{ number: { $eq: 1 } }], {
        number: 1,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ number: { $eq: 1 } }], {
        number: 0,
      })
    ).toBe(false);
  });

  it('should check for string equality', () => {
    expect(
      rikkitikkitavi([{ thing: { $eq: 'one' } }], {
        thing: 'one',
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $eq: 'two' } }], {
        thing: 'Two',
      })
    ).toBe(false);
  });

  it('should check for boolean quality', () => {
    expect(
      rikkitikkitavi([{ thing: { $eq: true } }], {
        thing: true,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $eq: true } }], {
        thing: false,
      })
    ).toBe(false);
  });
});

describe('$between', () => {
  it('should check ranges', () => {
    expect(
      rikkitikkitavi([{ thing: { $between: [0, 10] } }], {
        thing: 5,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $between: [10, 100] } }], {
        thing: 76,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $between: [10, 100] } }], {
        thing: 101,
      })
    ).toBe(false);
  });
});

describe('$lt and $gt', () => {
  it('should be less than', () => {
    expect(
      rikkitikkitavi([{ thing: { $lt: 5 } }], {
        thing: 4,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $lt: 5 } }], {
        thing: 5,
      })
    ).toBe(false);

    expect(
      rikkitikkitavi([{ thing: { $lt: 5 } }], {
        thing: 6,
      })
    ).toBe(false);
  });

  it('should be greater than', () => {
    expect(
      rikkitikkitavi([{ thing: { $gt: 5 } }], {
        thing: 6,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $gt: 5 } }], {
        thing: 5,
      })
    ).toBe(false);

    expect(
      rikkitikkitavi([{ thing: { $gt: 5 } }], {
        thing: 4,
      })
    ).toBe(false);
  });
});

describe('$lte and $gte', () => {
  it('should be less than or equal to', () => {
    expect(
      rikkitikkitavi([{ thing: { $lte: 5 } }], {
        thing: 5,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $lte: 5 } }], {
        thing: 4,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $lte: 5 } }], {
        thing: 6,
      })
    ).toBe(false);
  });

  it('should be greater than or equal to', () => {
    expect(
      rikkitikkitavi([{ thing: { $gte: 5 } }], {
        thing: 5,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $gte: 5 } }], {
        thing: 5,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $gte: 5 } }], {
        thing: 4,
      })
    ).toBe(false);
  });
});

describe('$some', () => {
  it('should check for some', () => {
    expect(
      rikkitikkitavi([{ thing: { $some: ['One', 'Two', 'Three'] } }], {
        thing: ['One'],
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $some: ['One', 'Two', 'Three'] } }], {
        thing: ['None'],
      })
    ).toBe(false);
  });
});

describe('$every', () => {
  it('should check for every element', () => {
    expect(
      rikkitikkitavi([{ thing: { $every: ['One', 'Two', 'Three'] } }], {
        thing: ['One', 'Two', 'Three'],
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $every: ['One', 'Two', 'Three'] } }], {
        thing: ['One', 'Two'],
      })
    ).toBe(true);
  });
});

describe('$in', () => {
  it('should check that it contains a value', () => {
    expect(
      rikkitikkitavi([{ thing: { $in: ['One', 'Two', 'Three'] } }], {
        thing: 'One',
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $in: [1, 'Two', 'Three'] } }], {
        thing: 1,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $in: [false, 'Two', 'Three'] } }], {
        thing: false,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $in: ['One', 'Two', 'Three'] } }], {
        thing: 'Not in',
      })
    ).toBe(false);
  });
});

describe('$nin', () => {
  it('should check that it does not contain a value', () => {
    expect(
      rikkitikkitavi([{ thing: { $nin: ['One', 'Two', 'Three'] } }], {
        thing: 'Four',
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $nin: [1, 'Two', 'Three'] } }], {
        thing: 4,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $nin: [false, 'Two', 'Three'] } }], {
        thing: true,
      })
    ).toBe(true);

    expect(
      rikkitikkitavi([{ thing: { $nin: ['One', 'Two', 'Three'] } }], {
        thing: 'One',
      })
    ).toBe(false);
  });
});

describe('$count', () => {
  it('should check against $lte and $gte', () => {
    expect(
      rikkitikkitavi(
        [
          {
            $count: {
              $items: [{ thing1: { $eq: 10 } }, { thing2: { $gte: 50 } }],
              $op: { $gte: 2 },
            },
          },
        ],
        {
          thing1: 10,
          thing2: 50,
        }
      )
    ).toBe(true);

    expect(
      rikkitikkitavi(
        [
          {
            $count: {
              $items: [{ thing1: { $eq: 10 } }, { thing2: { $gte: 50 } }],
              $op: { $lte: 2 },
            },
          },
        ],
        {
          thing1: 9,
          thing2: 50,
        }
      )
    ).toBe(true);
  });

  it('should check for exact counts', () => {
    expect(
      rikkitikkitavi(
        [
          {
            $count: {
              $items: [{ thing1: { $eq: 10 } }, { thing2: { $gte: 50 } }],
              $op: { $eq: 2 },
            },
          },
        ],
        {
          thing1: 10,
          thing2: 50,
        }
      )
    ).toBe(true);
  });
});

describe('$match', () => {
  it('should match many', () => {
    expect(
      rikkitikkitavi(
        [
          {
            $match: {
              thing1: { $eq: 10 },
              thing2: { $gte: 50 },
            },
          },
        ],
        {
          thing1: 10,
          thing2: 50,
        }
      )
    ).toBe(true);
  });
});

// describe('utility rikkitikkitavi', () => {
//   it('should validate $count and $op is $lte', () => {
//     const data = {
//       component: 'some_component',
//       expr: [
//         {
//           $count: {
//             $items: [{ one: { $eq: 10 } }, { two: { $gte: 50 } }],
//             $op: { $lte: 1 },
//           },
//         },
//       ],
//     };

//     let user = {
//       one: 10,
//       two: 50,
//     };

//     expect(rikkitikkitavi(data.expr, user)).toBe(false);
//     user = {
//       one: 24,
//       two: 55,
//     };
//     expect(rikkitikkitavi(data.expr, user)).toBe(true);
//   });

//   it('should validate $match', () => {
//     const data = {
//       component: 'some_component',
//       expr: ,
//     };

//     let user = {
//       one: 10,
//       two: 50,
//     };

//     expect(rikkitikkitavi(data.expr, user)).toBe(true);
//     user = {
//       one: 24,
//       two: 5,
//     };
//     expect(rikkitikkitavi(data.expr, user)).toBe(false);
//   });

//   it('should validate a real use case', () => {
//     const data = {
//       component: 'some_component',
//       expr: [
//         { gender: { $eq: 'female' } },
//         {
//           $count: {
//             $items: [
//               { age: { $between: [45, 60] } },
//               {
//                 $match: {
//                   family_myself: { $eq: true },
//                   family_spouse: { $eq: false },
//                   family_significant_other: { $eq: false },
//                 },
//               },
//               { service_reasoning: { $eq: 'private' } },
//               { motivation: { $eq: 'healthier' } },
//             ],
//             $op: { $gte: 3 },
//           },
//         },
//       ],
//     };

//     const user = {
//       gender: 'female',
//       age: 51,
//       family_myself: true,
//       family_spouse: false,
//       family_significant_other: false,
//       service_reasoning: 'private',
//       motivation: 'healthier',
//     };

//     expect(rikkitikkitavi(data.expr, user)).toBe(true);
//   });
// });
