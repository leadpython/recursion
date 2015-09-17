// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  if (obj === null) {
    return 'null';
  } else if (obj === undefined) {
    return 'undefined';
  } else if (typeof(obj) !== 'array' && typeof(obj !== 'object')) {
    if (typeof(obj) === 'string') {
      return '"' + obj + '"';
    } else {
      return obj.toString();
    }
  } else {
    if (Array.isArray(obj)) {
      var firstKey = Object.keys(obj)[0];
      var firstProperty = obj[firstKey];

      if (obj[firstKey] === undefined) {
        return "]";
      } else {
        delete obj[firstKey];
        if (arguments[1] === undefined) {
          return ('["' + firstKey + '":' + firstProperty + stringifyJSON(obj, 1));
        } else {
          return (',"' + firstKey + '":' + firstProperty + stringifyJSON(obj, 1));
        }
      }
    } else {
      var firstKey = Object.keys(obj)[0];
      var firstProperty = obj[firstKey];

      if (obj[firstKey] === undefined) {
        return "}";
      } else {
        delete obj[firstKey];
        if (arguments[1] === undefined) {
          return ('{"' + firstKey + '":' + firstProperty + stringifyJSON(obj, 1));
        } else {
          return (',"' + firstKey + '":' + firstProperty + stringifyJSON(obj, 1));
        }
      }
    }
  }
};
