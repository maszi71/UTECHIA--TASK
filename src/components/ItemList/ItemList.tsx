import React from "react";
import Item from "../Item/Item";
import { ListProps } from "./ItemList.type";

const List: React.FC<ListProps> = ({
  items,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <Item
          key={item.id}
          index={index}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          item={item}
        />
      ))}
    </ul>
  );
};

export default List;
