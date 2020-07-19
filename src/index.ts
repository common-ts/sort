export interface Sortable {
  sortField: string;
  sortType: string;
  sortTarget: any;
}

export interface Sort {
  field: string;
  type: string;
}

export function handleSortEvent(event: any, com: Sortable) {
  if (event && event.target) {
    const target = event.target;
    const s = handleSort(target, com.sortTarget, com.sortField, com.sortType);
    com.sortField = s.field;
    com.sortType = s.type;
    com.sortTarget = target;
  }
}

export function handleSort(target: any, previousTarget: any, sortField: string, sortType: string): Sort {
  const type = target.getAttribute('sort-type');
  const field = toggleSortStyle(target);
  const s = sort(sortField, sortType, field, type);
  if (sortField !== field) {
    removeSortStatus(previousTarget);
  }
  return s;
}

export function sort(preField: string, preSortType: string, field: string, sortType: string): Sort {
  if (!preField || preField === '') {
    const s: Sort = {
      field,
      type: '+'
    };
    return s;
  } else if (preField !== field) {
    const s: Sort = {
      field,
      type: (!sortType ? '+' : sortType)
    };
    return s;
  } else if (preField === field) {
    const type = (preSortType === '+' ? '-' : '+');
    const s: Sort = {field, type};
    return s;
  }
}

export function removeSortStatus(target: any): void {
  if (target && target.children.length > 0) {
    target.removeChild(target.children[0]);
  }
}

export function toggleSortStyle(target: any): string {
  let field = target.getAttribute('data-field');
  if (!field) {
    field = target.parentNode.getAttribute('data-field');
  }
  if (!field || field.length === 0) {
    return '';
  }
  if (target.nodeName === 'I') {
    target = target.parentNode;
  }
  let i = null;
  if (target.children.length === 0) {
    target.innerHTML = target.innerHTML + '<i class="sort-up"></i>';
  } else {
    i = target.children[0];
    if (i.classList.contains('sort-up')) {
      i.classList.remove('sort-up');
      i.classList.add('sort-down');
    } else if (i.classList.contains('sort-down')) {
      i.classList.remove('sort-down');
      i.classList.add('sort-up');
    }
  }
  return field;
}
