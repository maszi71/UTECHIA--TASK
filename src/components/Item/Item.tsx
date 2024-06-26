import React, { useState } from "react";
import  {ItemProps}  from "./Item.type";
import { addItemToParent } from "@/utils/addNewItem";
import { loadItems, saveItems } from "@/utils/localstorage";
import List from "../ItemList/ItemList";
import FormComponent from "../ItemForm/ItemForm"
import { removeItemById } from "@/utils/removeItem";
import { editItemById } from "@/utils/editItem";


const Item: React.FC<ItemProps> = ({
  item,
  deleteItem,
  editItem,
  onDragStart,
  onDragOver,
  onDrop,
  index,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [isAdding, setIsAdding] = useState(false);
  

  const handleDelete = () => {
    removeItemById(item.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
   
  };

  const handleSave = () => {
    editItemById(item.id ,newTitle )
   // editItem(item.id, newTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(item.title);
    setIsEditing(false);
  };

  const handleAdd = () => {
    setIsAdding((item) => !item);
  };

  const addItem = (title: string) => {
    console.log(title, item.id);
    const x = addItemToParent(item.id, new Date().getTime().toString(), title);
    console.log(x, "xxx");
    saveItems([...x]);
    console.log(loadItems());
    // setItems((prevItems) => [...prevItems, ...x]);
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
          {isAdding && <FormComponent onSubmit={addItem} />}
        </div>
      </div>
      <div className="flex items-center justify-between p-2  rounded">
        {
          <List
            items={item.children}
            deleteItem={deleteItem}
            editItem={editItem}
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
