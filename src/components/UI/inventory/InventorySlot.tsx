import { Box, Image, Text } from "@mantine/core";
import { InventorySlotProps } from "./types";

export function InventorySlot({
    slotIndex,
    item,
    isDraggedSlot,
    isDragging,
    inventorySide,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp
}: InventorySlotProps) {
    return (
        <Box
            w="5vw"
            h="5vw"
            style={{
                backgroundColor: isDraggedSlot ? "#3f3f47ef" : "#2f2f37ef",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                imageRendering: "-webkit-optimize-contrast",
                position: "relative",
                backgroundSize: "7vh",
                color: "rgba(255, 255, 255, 0.637)",
                transition: "ease 0.1s",
                cursor: isDragging ? "grabbing" : "grab",
                pointerEvents: "auto",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                opacity: isDraggedSlot ? 0.3 : 1,
            }}
            onMouseEnter={item && !isDragging ? (e) => onMouseEnter(item, e) : undefined}
            onMouseLeave={item && !isDragging ? onMouseLeave : undefined}
            onMouseDown={item ? (e) => onMouseDown(item, e) : undefined}
            onMouseUp={() => onMouseUp(slotIndex)}
        >
            {slotIndex < 6 && (
                <Box
                    style={{
                        position: "absolute",
                        top: "2px",
                        left: "2px",
                        fontSize: "0.6vw",
                        color: "rgba(0, 191, 255, 0.8)",
                        fontWeight: "bold",
                        zIndex: 1,
                    }}
                >
                    {slotIndex + 1}
                </Box>
            )}
            
            {item && !isDraggedSlot && (
                <>
                    <Box
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                        }}
                    >
                        <Image
                            src={`/images/${item.itemName}.png`}
                            alt={item.itemLabel}
                            style={{
                                width: "80%",
                                height: "80%",
                                objectFit: "contain",
                            }}
                        />
                    </Box>
                    
                    {/* Item amount indicator */}
                    <Box
                        style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            fontSize: "0.5vw",
                            color: "rgba(255, 255, 255, 0.5)",
                        }}
                    >
                        {item.amount}
                    </Box>
                </>
            )}
        </Box>
    );
}
