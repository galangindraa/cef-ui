import { useState, useEffect } from "react";

import { Transition, Flex, Text, Image, Card, Container, Box } from "@mantine/core";
import { Heart, Utensils, CupSoda, Brain } from "lucide-react";
import { useCefEvent } from '../../../hooks/useNuiEvent';
import { useAppVisibilityInventory } from '../../../stores/appVisibilityStore';
import { LeftInventory } from "./LeftInventory";
import axios from "axios";
import { useExitListener } from "../../../hooks/useExiEvent";

export function Inventory() {
    const { showApp, setVisibility, hideOtherComponents, showOtherComponents } = useAppVisibilityInventory();
    const [inventory, setInventory] = useState<any[]>([]);
    const fetchSkins = async (identifier: string) => {
        if (!identifier) return;
        try {
          const response = await axios.get(`http://localhost:3001/getkrakterinventory`, {
            params: { identifier }
          });
          setInventory(response.data.inventory);
          setVisibility(true);
        } catch (err) {
          setInventory([]);
        }
    };

    useCefEvent<string>("openInventory", (identifier) => {
        fetchSkins(identifier);
    });

    useExitListener(setVisibility);
    
    return (
        <Transition mounted={showApp} transition="fade" duration={400} timingFunction="ease">
            {(transStyles) => (      
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: "linear-gradient(to bottom, #000000d3, #000000d3)",
                    ...transStyles,
                }}>
                    <Flex
                    pos="fixed"
                    top="6%"
                    left="10%"
                    style={{
                        pointerEvents: "auto",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        zIndex: 1000,
                    }}>
                        <LeftInventory inventory={inventory} />
                    </Flex>
                </div>
            )}
        </Transition>
    );
}