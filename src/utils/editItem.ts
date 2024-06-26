import { loadItems } from "./localstorage";

export function editItemById(itemId : string, newTitle : string) {

    const list: any = loadItems();
    function recursiveEdit(items : any, itemId : any, newTitle : any) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === itemId) {
          items[i].title = newTitle;
          return true;
        } else if (items[i].children && items[i].children.length > 0) {
          if (recursiveEdit(items[i].children, itemId, newTitle)) {
            return true;
          }
        }
      }
      return false;
    }
  
    recursiveEdit(list, itemId, newTitle);
    localStorage.setItem('items', JSON.stringify(list));
    return list;
  }
  