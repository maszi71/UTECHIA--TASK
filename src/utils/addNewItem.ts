import { loadItems } from "./localstorage";

export function addItemToParent(
  parentId: any,
  newChildId: any,
  newChildTitle: any
) {
  const arr: any = loadItems();
  if (!parentId) {
    arr.push({ id: newChildId, title: newChildTitle, children: [] });
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (recursiveAdd(arr[i], parentId, newChildId, newChildTitle)) {
        break;
      }
    }
  }

  function recursiveAdd(
    parent: any,
    parentId: any,
    newChildId: any,
    newChildTitle: any
  ) {
    if (parent.id === parentId) {
      parent.children.push({
        id: newChildId,
        title: newChildTitle,
        children: [],
      });
      return true;
    } else if (parent.children && parent.children.length > 0) {
      for (let i = 0; i < parent.children.length; i++) {
        if (
          recursiveAdd(parent.children[i], parentId, newChildId, newChildTitle)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  localStorage.setItem("items", JSON.stringify(arr));

  return arr;
}
