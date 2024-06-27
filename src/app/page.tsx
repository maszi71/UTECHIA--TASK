"use client";

import { useState } from "react";
import FormComponent from "../components/ItemForm/ItemForm";
import List from "../components/ItemList/ItemList";
import { useItemList } from "@/store/ItemListContext";

export default function Home() {
  const [draggingItemIndex, setDraggingItemIndex] = useState<number | null>(
    null
  );

  const { itemList, addItem, reOrderItem } = useItemList();
  const addNewItem = (title: string) => {
    addItem(null, title);
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

    reOrderItem(draggingItemIndex, draggedOverItemIndex);
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
      <FormComponent onSubmit={addNewItem} />
      <List
        items={itemList}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
      {itemList.length === 0 && <p className="mt-4">No items yet.</p>}
    </div>
  );
}
