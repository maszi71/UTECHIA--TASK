import React, { useState } from 'react';

interface ListItem {
  id: string;
  title: string;
}

interface ItemProps {
  item: ListItem;
  index: number;
  deleteItem: (id: string) => void;
  editItem: (id: string, newTitle: string) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
}

const Item: React.FC<ItemProps> = ({ item, deleteItem, editItem , onDragStart, onDragOver, onDrop , index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);

  const handleDelete = () => {
    deleteItem(item.id);
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

  return (
    <div className="flex items-center justify-between p-2 border rounded"  draggable
    onDragStart={(event) => onDragStart(event, index)}
    onDragOver={(event) => onDragOver(event, index)}
    onDrop={(event) => onDrop(event, index)}>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Item;
