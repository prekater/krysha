import * as _ from 'lodash'
declare global {
  namespace jest {
    interface Matchers<R> {
      toContainObjects(expected: any[]): CustomMatcherResult;
    }
  }
}

function getObjectDiff(obj1, obj2) {
  const diff = Object.keys(obj1).reduce((result, key) => {
    if (!obj2.hasOwnProperty(key)) {
      result.push(key);
    } else if (_.isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key);
      result.splice(resultKeyIndex, 1);
    }
    return result;
  }, Object.keys(obj2));

  return diff;
}
export function appendContainsObjectsUtil () {

  expect.extend({
    toContainObjects(received, args: any[]) {


      let index;
      const pass = args.every( (argument, i) => {
          index = i
          return this.equals(received,
            expect.arrayContaining([
              expect.objectContaining(argument)
            ])
          )
        }
      )

      if (pass) {
        return {
          message: () => (`expected ${this.utils.printReceived(received[index])} not to contain object ${this.utils.printExpected(args[index])}`),
          pass: true
        }
      } else {

        const diff = getObjectDiff(received[index], args[index])

        console.log(diff)
        return {
          message: () => (`expected ${this.utils.printReceived(received[index])} to contain object ${this.utils.printExpected(args[index])}`),
          pass: false
        }
      }
    }
  })
}

