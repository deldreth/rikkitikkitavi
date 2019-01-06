interface IEq {
  $eq: string | number | boolean;
}

interface IBetween {
  $between: number[];
}

interface ILessThan {
  $lt: number;
}

interface ILessThanEq {
  $lte: number;
}

interface IGreaterThan {
  $gt: number;
}

interface IGreatThanEq {
  $gte: number;
}

interface ICount {
  $count: Countable;
}

interface IMatch extends FieldOperation {}

type StoredArray = Array<string | number | boolean>;
interface ISome {
  $some: StoredArray;
}

interface IEvery {
  $every: StoredArray;
}

interface IIn {
  $in: StoredArray;
}

interface INin {
  $nin: StoredArray;
}

type Operator =
  | IEq
  | IBetween
  | ILessThan
  | ILessThanEq
  | IGreaterThan
  | IGreatThanEq
  | ICount
  | IMatch
  | ISome
  | IEvery
  | IIn
  | INin;

interface FieldOperation {
  [field: string]: Operator;
}

interface Store {
  [key: string]: any;
}

interface Countable {
  $items: FieldOperation[];
  $op: Operator;
}

const functions = {
  operate(obj: Store, key: string, operator: Operator): boolean {
    return this[Object.keys(operator)[0]](obj, key, Object.values(operator)[0]);
  },
  $eq(obj: Store, key: string, val: string | number | boolean): boolean {
    return obj[key] === val;
  },
  $between(obj: Store, key: string, range: number[]): boolean {
    return obj[key] >= range[0] && obj[key] <= range[1];
  },
  $lt(obj: Store, key: string, val: number): boolean {
    return obj[key] < val;
  },
  $lte(obj: Store, key: string, val: number): boolean {
    return obj[key] <= val;
  },
  $gt(obj: Store, key: string, val: number): boolean {
    return obj[key] > val;
  },
  $gte(obj: Store, key: string, val: number): boolean {
    return obj[key] >= val;
  },
  $count(obj: Store, countable: Countable) {
    let count = 0;
    countable.$items.forEach(item => {
      Object.keys(item).forEach(key => {
        if (this.operate(obj, key, item[key])) {
          count++;
        }
      });
    });

    return this.operate({ count }, 'count', countable.$op);
  },
  $match(obj: Store, matches: FieldOperation) {
    let result = false;
    Object.keys(matches).forEach(field => {
      result = this.operate(obj, field, matches[field]);
    });

    return result;
  },
  $some(obj: Store, key: string, arr: StoredArray) {
    return obj[key].some(
      (entry: string | number | boolean) => arr.indexOf(entry) >= 0
    );
  },
  $every(obj: Store, key: string, arr: StoredArray) {
    return obj[key].every(
      (entry: string | number | boolean) => arr.indexOf(entry) >= 0
    );
  },
  $in(obj: Store, key: string, arr: StoredArray) {
    return arr.includes(obj[key]);
  },
  $nin(obj: Store, key: string, arr: StoredArray) {
    return !arr.includes(obj[key]);
  },
};

export default function(
  expression: Array<FieldOperation | ICount>,
  obj: Store
): boolean {
  const results: boolean[] = [];
  expression.forEach(op => {
    const field = Object.keys(op)[0];
    const func = Object.values(op)[0];

    switch (field) {
      case '$count':
        return results.push(functions.$count(obj, func));
      case '$match':
        return results.push(functions.$match(obj, func));
      default:
        return results.push(functions.operate(obj, field, func));
    }
  });

  return results.every(result => result === true);
}
