import { loadItems } from "./localstorage";

export function reorderItem(draggingItemIndex: number | null , draggedOverItemIndex : number) {
  const arr: any = loadItems();
  const draggingItem = arr[draggingItemIndex!];
  arr.splice(draggingItemIndex!, 1);
  arr.splice(draggedOverItemIndex, 0, draggingItem);
  localStorage.setItem("items", JSON.stringify(arr));
  return arr;
}
