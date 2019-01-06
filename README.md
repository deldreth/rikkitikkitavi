# rikkitikkitavi

[![CircleCI](https://circleci.com/gh/deldreth/rikkitikkitavi.svg?style=svg)](https://circleci.com/gh/deldreth/rikkitikkitavi)

This is a very simple script that allows for "querying" a data store (object) for truthiness based on an object literal similar MongoDB queries. It's like validation but intended to be used for quickly determining if some object matches expectations.

It supports basic comparison and quality operators and two aggregate-like operators.

For example:

Equality, Greater than, Less than or equal to

```javascript
const store = [
  juice: 'Apple',
  boxes: 10,
  rating: 4
];

const matches = rikkitikkitavi([
  { juice: { $eq: 'Apple' } },
  { boxes: { $gt: 5 } },
  { rating: { $lte: 5 }}
], store);

// matches === true
```

## Operators

**\$eq**, strict equality check.

**$lt and $lte, $gt and $gte**, numerical comparison.

**\$between**, used to determine if a value lies between a minimum and maximum expressed as a tuple.

`{ $between: [0, 10] }`

**$some and $every**, equivalent to Array some and every.

**$in and $nin**, determine if a value exists in an array.

**\$count**, unique aggregate like operator that has two specific properties **\$items** and **\$op**. $items is an array of fields and operations and $op is some operator to check against the count.

```javascript
const store = [
  juice: 'Apple',
  boxes: 10,
  rating: 4
];

// count the number of values in the store that match boxes greater than or equal to 5 and rating less than 5. The total count should be greater than or equal to 2
const matches = rikkitikkitavi([
  {
    $count: {
      $items: [
        { boxes: { $gte: 5 }},
        { rating: { $lt: 5 }}
      ],
      $op: { $gte: 2 }
    }
  }
], store);

// matches === true
```

**\$match**, unique aggregate like operator that can be used to match groups of fields. Useful when combined with \$count where specific permutations of data are important.

```javascript
const store = [
  juice: 'Apple',
  boxes: 10,
  rating: 4
];

const matches = rikkitikkitavi([
  {
    $matches: {
      juice: { $eq: 'Apple' },
      rating: { $gte: 4 }
    }
  }
], store);

const matches = rikkitikkitavi([
  {
    $count: {
      $items: [
        { boxes: { $gte: 5 }},
        {
          $matches: {
            juice: { $eq: 'Apple' },
            rating: { $gte: 4 }
          }
        }
      ],
      $op: { $eq: 2 }
    }
  }
], store);
```
