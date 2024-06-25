"use client";

import { useState, useEffect } from "react";
import List from "../components/ItemList/ItemList";
import FormComponent from "../components/ItemForm/ItemForm";
import { loadItems, saveItems } from "@/utils/localstorage";
import { ListItem } from "@/types/ListItem";



export default function Home() {
  const [items, setItems] = useState<ListItem[]>(loadItems());
  const [draggingItemIndex, setDraggingItemIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    setItems(loadItems());
  }, []);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const addItem = (title: string) => {
    const newItem: ListItem = {
      id: new Date().getTime().toString(),
      title,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const editItem = (id: string, newTitle: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    );
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDraggingItemIndex(index);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    const draggedOverItemIndex = index;

    if (draggingItemIndex === draggedOverItemIndex) return;

    const itemsCopy = [...items];
    const draggingItem = itemsCopy[draggingItemIndex!];
    itemsCopy.splice(draggingItemIndex!, 1);
    itemsCopy.splice(draggedOverItemIndex, 0, draggingItem);

    setDraggingItemIndex(draggedOverItemIndex);
    setItems(itemsCopy);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDraggingItemIndex(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Item List</h1>
      <FormComponent onSubmit={addItem} />
      <List
        items={items}
        deleteItem={deleteItem}
        editItem={editItem}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
      {items.length === 0 && <p className="mt-4">No items yet.</p>}
    </div>
  );
}
