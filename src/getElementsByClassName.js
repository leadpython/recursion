// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // array to be filled with the elements with the className
  var elementsArray = [];

  // function that checks if an element contains className
  var checkClass = function(node, className) {
    var bool = false;
    each(node.classList, function(classItem) {
      bool = bool || classItem === className;
    });
    return bool;
  };

  // 
  var checkElement = function(node) {
    if (checkClass(node, className)) {
      elementsArray.push(node);
    }
  };

  var getElements = function(node) {
    checkElement(node);
    each(node.childNodes, function(node) {
      getElements(node);
    });
  };

  getElements(document.body);

  return elementsArray;
};

function each(collection, iterator) {
  if (Array.isArray(collection)) {
    for (var n = 0; n < collection.length; n++) {
      iterator(collection[n]);
    }
  } else {
    for (var key in collection) {
      iterator(collection[key]);
    }
  }
}




