import React, { useState } from "react";
import { ItemProps } from "./Item.type";
import List from "../ItemList/ItemList";
import FormComponent from "../ItemForm/ItemForm";
import { useItemList } from "@/store/ItemListContext";

const Item: React.FC<ItemProps> = ({
  item,
  onDragStart,
  onDragOver,
  onDrop,
  index,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, removeItem, editItem } = useItemList();

  const handleDelete = () => {
    removeItem(item.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editItem(item.id, newTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(item.title);
    setIsEditing(false);
  };

  const handleAdd = () => {
    setIsAdding((item) => !item);
  };

  const addNewItem = (title: string) => {
    addItem(item.id, title);
  };

  return (
    <div className="border">
      <div
        className="flex items-center justify-between p-2  rounded"
        draggable
        onDragStart={(event) => onDragStart(event, index)}
        onDragOver={(event) => onDragOver(event, index)}
        onDrop={(event) => onDrop(event, index)}
      >
        {isEditing ? (
          <input
            className="border p-1 flex-1"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          <span>{item.title}</span>
        )}
        <div className="ml-2 space-x-2">
          {isEditing ? (
            <>
              <button className="text-green-500" onClick={handleSave}>
                Save
              </button>
              <button className="text-red-500" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="text-blue-500" onClick={handleEdit}>
                Edit
              </button>
              <button className="text-red-500" onClick={handleDelete}>
                Delete
              </button>
              <button className="text-green-500" onClick={handleAdd}>
                Add
              </button>
            </>
          )}
          {isAdding && <FormComponent onSubmit={addNewItem} />}
        </div>
      </div>
      <div className="flex items-center justify-between p-2  rounded">
        {
          <List
            items={item.children}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
          />
        }
      </div>
    </div>
  );
};

export default Item;
