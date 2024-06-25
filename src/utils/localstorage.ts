interface ListItem {
  id: string;
  title: string;
}

export const loadItems = (): ListItem[] => {
  const storedItems = localStorage.getItem("items");
  if (storedItems) {
    return JSON.parse(storedItems);
  }
  return [];
};

export const saveItems = (items: ListItem[]): void => {
  localStorage.setItem("items", JSON.stringify(items));
};
