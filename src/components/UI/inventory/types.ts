export enum InventorySide {
    LEFT = "left",
    RIGHT = "right"
}

export interface InventoryItem {
    id: number;
    itemId: number;
    amount: number;
    itemName: string;
    itemLabel: string;
    itemWeight: number;
    slot: number;
}

export interface InventorySlotProps {
    slotIndex: number;
    item: InventoryItem | undefined;
    isDraggedSlot: boolean;
    isDragging: boolean;
    inventorySide: InventorySide;
    onMouseEnter: (item: InventoryItem, e: React.MouseEvent) => void;
    onMouseLeave: () => void;
    onMouseDown: (item: InventoryItem, e: React.MouseEvent) => void;
    onMouseUp: (slotIndex: number) => void;
}
