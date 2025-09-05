import { Stack, Group, Box, Text, SimpleGrid, Image, ScrollArea, Divider } from "@mantine/core";
import { Package } from "lucide-react";
import { useState } from "react";
import React from "react";
import { InventorySlot } from "./InventorySlot";
import { InventorySide, InventoryItem } from "./types";

export function RightInventory({ inventory }: { inventory: InventoryItem[] }) {
    const slots = Array.from({ length: 42 }, (_, index) => index);
    const [hoveredItem, setHoveredItem] = useState<InventoryItem | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [draggedItem, setDraggedItem] = useState<InventoryItem | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    
    const slotItems = new Map<number, InventoryItem>();
    inventory.forEach(item => {
        slotItems.set(item.slot, item);
    });

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (item: InventoryItem, e: React.MouseEvent) => {
        if (!isDragging) {
            setHoveredItem(item);
            setMousePosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseLeave = () => {
        if (!isDragging) {
            setHoveredItem(null);
        }
    };

    const handleMouseDown = (item: InventoryItem, e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setDraggedItem(item);
        setIsDragging(true);
        setMousePosition({ x: e.clientX, y: e.clientY });
        setHoveredItem(null);
        window.dispatchEvent(new CustomEvent('inventory:dragStart', { detail: item }));
    };

    const handleMouseUp = (targetSlot: number) => {
        if (draggedItem && isDragging) {
            const data = `${draggedItem.slot}|${targetSlot}`;
            (window as any).cef.emit("inventory:swapItems", data);
            setDraggedItem(null);
            setIsDragging(false);
            setDragOffset({ x: 0, y: 0 });
            setHoveredItem(null);
        }
    };


    const handleGlobalMouseUp = (e: MouseEvent) => {
        if (isDragging && draggedItem) {
            const leftInventoryElement = document.querySelector('[data-inventory="left"]');
            if (leftInventoryElement) {
                const rect = leftInventoryElement.getBoundingClientRect();
                const isOverLeftInventory = (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                );
                
                if (isOverLeftInventory) {
                    window.dispatchEvent(new CustomEvent('inventory:crossTake'));
                    setDraggedItem(null);
                    setIsDragging(false);
                    setDragOffset({ x: 0, y: 0 });
                    setHoveredItem(null);
                    window.dispatchEvent(new CustomEvent('inventory:dragEnd'));
                    return;
                }
            }
            
            setDraggedItem(null);
            setIsDragging(false);
            setDragOffset({ x: 0, y: 0 });
            setHoveredItem(null);
            window.dispatchEvent(new CustomEvent('inventory:dragEnd'));
        }
    };

    React.useEffect(() => {
        document.addEventListener('mouseup', handleGlobalMouseUp);
        
        return () => {
            document.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging]);

    React.useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setMousePosition({ x: e.clientX, y: e.clientY });
            }
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleGlobalMouseMove);
        }

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, [isDragging]);
    
    return (
        <Stack 
            gap="xs" 
            style={{ pointerEvents: "auto" }}
            onMouseMove={!isDragging ? handleMouseMove : undefined}
            data-inventory="right"
        >
            <Group gap="10px" mt="5vh" align="flex-start">
                <Box
                    w="50px"
                    h="50px"
                    style={{
                        backgroundColor: "#1E2F39",
                        transform: "rotate(-45deg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Package
                        size={25}
                        color="rgba(0, 191, 255, 0.637)"
                        style={{
                            transform: "rotate(100deg)",
                        }}
                    />
                </Box>
                <Stack gap={0}>
                    <Text
                        fz="1.7vw"
                        mt="-0.3vw"
                        c="rgba(0, 191, 255, 0.637)"
                        p={0}
                        fw={600}
                    >
                        Inventory
                    </Text>
                    <Text
                        fz="1.7vh"
                        p={0}
                        c="rgba(255, 255, 255, 0.637)"
                        fw={500}
                    >
                        4.5 / 10 KG
                    </Text>
                </Stack>
            </Group>
            
            <Box p="md" style={{ pointerEvents: "auto" }}>
                <ScrollArea 
                    h={470} 
                    type="never"
                    scrollbarSize={8}
                    scrollHideDelay={0}
                    style={{ 
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}
                >
                    <SimpleGrid cols={6} spacing="xs" verticalSpacing="lg" p="xs">
                        {slots.map((slotIndex) => {
                            const item = slotItems.get(slotIndex);
                            const isDraggedSlot = draggedItem?.slot === slotIndex;
                            
                            return (
                                <InventorySlot
                                    key={slotIndex}
                                    slotIndex={slotIndex}
                                    item={item}
                                    isDraggedSlot={isDraggedSlot}
                                    isDragging={isDragging}
                                    inventorySide={InventorySide.RIGHT}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                />
                            );
                        })}
                    </SimpleGrid>
                </ScrollArea>
            </Box>

            {/* Dragged Item Visual */}
            {isDragging && draggedItem && (
                <Box
                    style={{
                        position: "fixed",
                        left: mousePosition.x - dragOffset.x,
                        top: mousePosition.y - dragOffset.y,
                        width: "5vw",
                        height: "5vw",
                        zIndex: 1001,
                        pointerEvents: "none",
                        transform: "scale(1.1)",
                        filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))",
                        transition: "none",
                    }}
                >
                    <Box
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            backgroundColor: "rgba(45, 45, 55, 0.9)",
                            borderRadius: "4px",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                    >
                        <Image
                            src={`/images/${draggedItem.itemName}.png`}
                            alt={draggedItem.itemLabel}
                            style={{
                                width: "80%",
                                height: "80%",
                                objectFit: "contain",
                            }}
                        />
                    </Box>
                    
                    <Box
                        style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            fontSize: "0.5vw",
                            color: "rgba(255, 255, 255, 0.8)",
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            borderRadius: "2px",
                            padding: "1px 3px",
                        }}
                    >
                        {draggedItem.amount}
                    </Box>
                </Box>
            )}

            {/* Hover Tooltip */}
            {hoveredItem && !isDragging && draggedItem === null && (
                <Box
                    style={{
                        position: "fixed",
                        left: mousePosition.x + 10,
                        top: mousePosition.y - 10,
                        backgroundColor: "#2f2f37ef",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        zIndex: 1000,
                        pointerEvents: "none",
                        minWidth: "200px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <Text
                        size="sm"
                        fw={600}
                        style={{ marginBottom: "4px" }}
                    >
                        {hoveredItem.itemLabel}
                    </Text>

                    <Divider size="md" />
                </Box>
            )}
        </Stack>
    )
}
