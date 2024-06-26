import { ListItem } from "@/types/ListItem";

export interface ListProps {
    items: ListItem[];
    onDragStart: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
    onDragOver: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  }