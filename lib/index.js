"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
function handleSortEvent(event, com) {
  if (event && event.target) {
    var target = event.target;
    var s = handleSort(target, com.sortTarget, com.sortField, com.sortType);
    com.sortField = s.field;
    com.sortType = s.type;
    com.sortTarget = target;
  }
}
exports.handleSortEvent = handleSortEvent;
function handleSort(target, previousTarget, sortField, sortType) {
  var type = target.getAttribute('sort-type');
  var field = toggleSortStyle(target);
  var s = sort(sortField, sortType, field, type);
  if (sortField !== field) {
    removeSortStatus(previousTarget);
  }
  return s;
}
exports.handleSort = handleSort;
function sort(preField, preSortType, field, sortType) {
  if (!preField || preField === '') {
    var s = {
      field: field,
      type: '+'
    };
    return s;
  }
  else if (preField !== field) {
    var s = {
      field: field,
      type: (!sortType ? '+' : sortType)
    };
    return s;
  }
  else if (preField === field) {
    var type = (preSortType === '+' ? '-' : '+');
    var s = { field: field, type: type };
    return s;
  }
}
exports.sort = sort;
function removeSortStatus(target) {
  if (target && target.children.length > 0) {
    target.removeChild(target.children[0]);
  }
}
exports.removeSortStatus = removeSortStatus;
function toggleSortStyle(target) {
  var field = target.getAttribute('data-field');
  if (!field) {
    field = target.parentNode.getAttribute('data-field');
  }
  if (!field || field.length === 0) {
    return '';
  }
  if (target.nodeName === 'I') {
    target = target.parentNode;
  }
  var i = null;
  if (target.children.length === 0) {
    target.innerHTML = target.innerHTML + '<i class="sort-up"></i>';
  }
  else {
    i = target.children[0];
    if (i.classList.contains('sort-up')) {
      i.classList.remove('sort-up');
      i.classList.add('sort-down');
    }
    else if (i.classList.contains('sort-down')) {
      i.classList.remove('sort-down');
      i.classList.add('sort-up');
    }
  }
  return field;
}
exports.toggleSortStyle = toggleSortStyle;
