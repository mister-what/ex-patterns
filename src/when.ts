import { match } from './pattern';
import { Pattern } from './pattern/types';
import { Match } from './match';
import { end, End } from './symbols';
import { isFunction } from './util';

type Callback = (matches?: Match, value?: any, pattern?: Pattern) => any;
type MatchClause = (pattern: Pattern | End, callback?: Callback) => any;

const _when = (value: any, done = false, result = null): MatchClause => (
  (pattern: Pattern | End, callback?: Callback): any => {
    if (pattern === end) {
      if (done) {
        return result;
      }
      throw Error('No matching clause found. ');
    }

    if (!isFunction(callback)) {
      throw Error('Expected 1 or 2 arguments of type (end) or (pattern, function).');
    }

    if (done) {
      return _when(value, true, result);
    }

    const [isMatch, matches] = match(pattern, value);
    if (isMatch) {
      return _when(value, true, callback(matches, value, pattern));
    }

    return _when(value);
  }
);

/**
 * Function that can be used as a `switch`-like control flow structure.
 *
 * The `when` function returns a function that can be invoked with a
 * `(pattern, callback)` clause. Several clauses can be chained to form
 * a `switch`-like syntax. To end the chain, pass the `end` keyword to a match
 * clause. Throws an error if no matching clause is found.
 *
 * When a matching clause is found, the corresponding callback function is
 * invoked. The return value of the `callback` function is returned by the `when`
 * structure. Callbacks are invoked with three arguments:
 *
 * 1. the `match` result (type `Object`)
 * 2. the `value` that was matched against (type `any`)
 * 3. the `pattern` that was used to perform the match (type `Pattern`)
 *
 * For example, a `callback` function may look like this:
 *
 * ```
 *      const callback = (match, value, pattern) => ...
 * ```
 * @param value: A data structure or function
 *
 * @returns Function that can be invoked with `(pattern, callback)` or `end`.
 *
 *
 * ## Examples
 * Use `when` to pattern match against `value`. The callback function that belongs
 * to the first matching pattern is invoked and the result is returned.
 * ```
 *      const value = [1, 'bar'];
 *      when(value)
 *         ([1, 1], then(() => 'foo'))    // no match [1, 1] ≠ [1, 'bar']
 *         ([1, A], then(({ A }) => A))   // match!   [1, A] = [1, 'bar'] => invoke callback!
 *         (_, then(() => 'baz'))         // fallback      _ = [1, 'bar']
 *      (end);
 *      > 'bar'
 * ```
 */
function when(value: any) {
  return _when(value);
}

/**
 * Wrapper for callback functions in `when` clauses. It's just syntactic
 * sugar; the callback function can also be passed in without `then`.
 *
 * @param callback: A callback function
 *
 * @returns The `callback` function.
 *
 *
 * ## Examples
 * Use `when` to pattern match against `value`. The callback function that belongs
 * to the first matching pattern is invoked and the result is returned.
 * ```
 *      const value = [1, 'bar'];
 *      when(value)
 *         ([1, 1], then(() => 'foo'))    // with `then`
 *         ([1, A], () => 'bar')         // without `then`
 *         (_, then(() => 'baz'))         // with `then`
 *      (end);
 *      > 'bar'
 * ```
 */
function then(func: Function) {
  return func;
}

export { when, then };
