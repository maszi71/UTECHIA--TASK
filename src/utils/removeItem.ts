import { loadItems } from "./localstorage";

export function removeItemById(itemId: any) {
  const arr: any = loadItems();

  function recursiveRemove(items: any, itemId: any) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === itemId) {
        items.splice(i, 1);
        return true;
      } else if (items[i].children && items[i].children.length > 0) {
        if (recursiveRemove(items[i].children, itemId)) {
          return true;
        }
      }
    }
    return false;
  }

  recursiveRemove(arr, itemId);

  localStorage.setItem("items", JSON.stringify(arr));

  return arr;
}
