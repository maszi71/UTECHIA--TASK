import React from 'react';
import Item from '../Item/Item';
import { ListItem } from '@/types/ListItem';



interface ListProps {
  items: ListItem[];
  deleteItem: (id: string) => void;
  editItem: (id: string, newTitle: string) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
}

const List: React.FC<ListProps> = ({ items, deleteItem, editItem ,  onDragStart, onDragOver, onDrop }) => {
  return (
    <ul className="space-y-4">
      {items.map((item , index) => (
        <Item key={item.id}  index={index}   onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop} item={item} deleteItem={deleteItem} editItem={editItem} />
      ))}
    </ul>
  );
};

export default List;

