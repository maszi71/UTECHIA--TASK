import { loadItems } from "./localstorage";

// Function to edit an item by its id in the nested structure
export function editItemById(itemId : any, newTitle : any) {
    // Retrieve items from localStorage
    const arr: any = loadItems();
  
    function recursiveEdit(items : any, itemId : any, newTitle : any) {
      // Iterate through the array to find the item with the matching id
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === itemId) {
          // Edit the item's title
          items[i].title = newTitle;
          return true;
        } else if (items[i].children && items[i].children.length > 0) {
          // Recursively search in children
          if (recursiveEdit(items[i].children, itemId, newTitle)) {
            return true;
          }
        }
      }
      return false;
    }
  
    // Try to edit the item
    recursiveEdit(arr, itemId, newTitle);
  
    // Update localStorage with the updated items list
    localStorage.setItem('items', JSON.stringify(arr));
  
    // Return the updated items list
    return arr;
  }
  
  // Example: Edit an item with id: 3 and change its title to 'Updated Title'
  const updatedItems = editItemById(3, 'Updated Title');
  console.log(updatedItems);
  