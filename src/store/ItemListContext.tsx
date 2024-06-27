// context/ItemListContext.tsx
import { ListItem } from "@/types/ListItem";
import { addItemToParent } from "@/utils/addNewItem";
import { editItemById } from "@/utils/editItem";
import { loadItems } from "@/utils/localstorage";
import { removeItemById } from "@/utils/removeItem";
import { reorderItem } from "@/utils/reorderItem";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ItemListContextType {
  itemList: ListItem[];
  addItem: (parentId : string | null,item: string) => void;
  editItem : (id: string, newTitle: string) => void
  removeItem: (index: string) => void;
  reOrderItem : (draggingItemIndex: number | null , draggedOverItemIndex : number) => void
}

const ItemListContext = createContext<ItemListContextType | undefined>(
  undefined
);

export const useItemList = (): ItemListContextType => {
  const context = useContext(ItemListContext);
  if (!context) {
    throw new Error("Error in ItemListProvider");
  }
  return context;
};

interface ItemListProviderProps {
  children: ReactNode;
}

export const ItemListProvider = ({ children }: ItemListProviderProps) => {
  const [itemList, setItemList] = useState<ListItem[]>(loadItems());

  const addItem = (parentId: string | null ,title: string) => {
    const items = addItemToParent(parentId, new Date().getTime().toString(), title);
    setItemList([...items]);
  };

  const removeItem = (id: string) => {
    const items = removeItemById(id);
    setItemList([...items]);
  };

  const editItem = (id: string, newTitle: string) => {
    const items = editItemById(id , newTitle);
    setItemList([...items]);
  }

  const reOrderItem = (draggingItemIndex: number | null , draggedOverItemIndex : number)=> {
    const items = reorderItem(draggingItemIndex , draggedOverItemIndex);
    setItemList([...items]);
  }

  return (
    <ItemListContext.Provider value={{ itemList, addItem, removeItem , editItem ,reOrderItem }}>
      {children}
    </ItemListContext.Provider>
  );
};
