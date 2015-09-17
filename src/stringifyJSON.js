// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  // undefined and functions cannot be stringified
  if (obj === undefined || typeof(obj) === 'function') {
    // return empty string for undefined or functions
    return '';
  } else if (obj === null) {
    return 'null'; //null can be stringified
  } else if (typeof(obj) === 'object') {
    if (Array.isArray(obj)) { // THIS SECTION IS FOR RECURSIVELY STRINGIFYING ARRAYS
      // get first item of array before it is removed
      var firstItem = obj[0];

      // base case for arrays. if array.length is zero, end recursion
      if (obj.length === 0) {
        if (arguments[1] === undefined) {
          // 1 appears as a second argument on all iterations except the first
          // if second argument is undefined, that means this is the first iteration
          // and if array.length is zero, then array came in empty, so return '[]'
          return '[]'; 
        } else {
          // since second argument is not undefined, it means this is not the first
          // iteration. When array.length is finally zero, it means this is the end
          // so return the closing bracket;
          return ']';
        }
      } else {
        // remove first element of array
        obj.shift();
        if (arguments[1] === undefined) {
          // if second argument is undefined, then this is first iteration
          // add an opening bracket at the beginning
          return ('[' + stringifyJSON(firstItem) + stringifyJSON(obj, 1));
        } else {
          // for middle iterations add commas in the beginning
          (',' + stringifyJSON(firstItem) + stringifyJSON(obj, 1));
        }
      }
    } else { // THIS SECTION IS FOR RECURSIVELY STRINGIFYING OBJECTS
      // get first key of the object by getting an array of all its keys, and
      // taking only the first element
      var firstKey = Object.keys(obj)[0];
      // get value of the first property of object
      var firstValue = obj[firstValue];

      // much like arrays, check if there are still keys in object
      if (Object.keys(obj).length === 0) {
        if (arguments[1] === undefined) {
          // if this is the first iteration and object is already empty, return '{}'
          return '{}';
        } else {
          // if not, then this must be the last iteration for this object, return
          // closing bracket
          return '}';
        }
      } else {
        delete obj[firstKey];
        if (arguments[1] === undefined) {
          if (firstValue === undefined || typeof(firstValue) === 'function') {
            return ('{' + stringifyJSON(obj, 1));
          } else {
            return ('{' + stringifyJSON(firstKey) + ':' + stringifyJSON(firstValue) + stringifyJSON(obj));
          }
        } else {
          if (firstValue === undefined || typeof(firstValue) === 'function') {
            return (stringifyJSON(obj, 1));
          } else {
            return (',' + stringifyJSON(firstKey) + ':' + stringifyJSON(firstValue) + stringifyJSON(obj));
          }
        }
      }
    }
  } else if (typeof(obj) === 'string') {
    return ('"' + obj + '"');
  } else {
    return obj.toString();
  }
};
