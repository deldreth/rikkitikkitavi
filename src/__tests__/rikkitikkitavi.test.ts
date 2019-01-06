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
