import { Stack, Group, Flex, Button, Input } from "@mantine/core";
import { useAppVisibilityInventory } from "../../../stores/appVisibilityStore";
import { useState, useEffect } from "react";

export function InventoryMenu() {
    const { setVisibility } = useAppVisibilityInventory();
    const [draggedItem, setDraggedItem] = useState<any>(null);
    const [amount, setAmount] = useState(1);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    const handleClose = () => {
        setVisibility(false);
        (window as any).cef.emit("ui:exit");
    };

    const handleUse = () => {
        if (draggedItem) {
            const data = `${draggedItem.slot}|${amount}`;
            (window as any).cef.emit("inventory:useItem", data);
            setDraggedItem(null);
            setVisibility(false);
            (window as any).cef.emit("ui:exit");
        }
    };

    const handleGive = () => {
        if (draggedItem) {
            const data = `${draggedItem.slot}|${amount}`;
            (window as any).cef.emit("inventory:giveItem", data);
            setDraggedItem(null);
        }
    };

    // Handle drop on button when drag ends
    const handleButtonDrop = (action: 'use' | 'give') => {
        if (draggedItem && hoveredButton === action) {
            if (action === 'use') {
                handleUse();
            } else {
                handleGive();
            }
        }
    };

    useEffect(() => {
        const handleDragStart = (event: CustomEvent) => {
            setDraggedItem(event.detail);
        };

        const handleDragEnd = () => {
            if (hoveredButton === 'use') {
                handleUse();
            } else if (hoveredButton === 'give') {
                handleGive();
            }
            setDraggedItem(null);
        };

        window.addEventListener('inventory:dragStart', handleDragStart as EventListener);
        window.addEventListener('inventory:dragEnd', handleDragEnd as EventListener);

        return () => {
            window.removeEventListener('inventory:dragStart', handleDragStart as EventListener);
            window.removeEventListener('inventory:dragEnd', handleDragEnd as EventListener);
        };
    }, [hoveredButton]);

    return (
        <Stack 
            gap="xs" 
            style={{ pointerEvents: "auto" }}
        >
            <Group gap="4px" mt="22vh" align="flex-start">
                <Flex
                    mih={50}
                    gap="xl"
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap"
                >
                    <Input
                        type="number"
                        variant="unstyled"
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
                        min={1}
                        max={draggedItem ? draggedItem.amount : 1}
                        style={{
                            backgroundColor: "#3f3f47ef",
                            height: "60px",
                            borderRadius: "2px",
                            width: "100%",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "bold",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            padding: "0 10px",
                            textAlign: "center",
                            textAlignLast: "center"
                        }}
                    />
                    <Button 
                        fullWidth 
                        style={{
                            backgroundColor: hoveredButton === 'use' ? "#4f4f57ef" : "#3f3f47ef",
                            height: "60px", 
                            borderRadius: "2px",
                            opacity: 1,
                            cursor: "pointer",
                            transition: "background-color 0.2s ease",
                            border: hoveredButton === 'use' ? "2px solid #5f5f67" : "2px solid transparent"
                        }}
                        onClick={handleUse}
                        onMouseEnter={() => setHoveredButton('use')}
                        onMouseLeave={() => setHoveredButton(null)}
                        onDrop={() => handleButtonDrop('use')}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        Use
                    </Button>
                    <Button 
                        fullWidth 
                        style={{
                            backgroundColor: hoveredButton === 'give' ? "#4f4f57ef" : "#3f3f47ef",
                            height: "60px", 
                            borderRadius: "2px",
                            opacity: 1,
                            cursor: "pointer",
                            transition: "background-color 0.2s ease",
                            border: hoveredButton === 'give' ? "2px solid #5f5f67" : "2px solid transparent"
                        }}
                        onClick={handleGive}
                        onMouseEnter={() => setHoveredButton('give')}
                        onMouseLeave={() => setHoveredButton(null)}
                        onDrop={() => handleButtonDrop('give')}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        Give
                    </Button>
                    <Button fullWidth style={{backgroundColor: "#3f3f47ef", height: "60px", borderRadius: "2px"}} onClick={handleClose}>Close</Button>
                </Flex>
            </Group>
        </Stack>
    );
}