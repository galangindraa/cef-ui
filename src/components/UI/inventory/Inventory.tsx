import { useState } from "react";

import { Transition, Flex } from "@mantine/core";
import { useCefEvent } from '../../../hooks/useNuiEvent';
import { useAppVisibilityInventory } from '../../../stores/appVisibilityStore';
import { LeftInventory } from "./LeftInventory";
import axios from "axios";
import { useExitListener } from "../../../hooks/useExiEvent";
import { RightInventory } from "./RightInventory";
import { InventoryMenu } from "./menu";

export function Inventory() {
    const { showApp, setVisibility } = useAppVisibilityInventory();
    const [inventory, setInventory] = useState<any[]>([]);
    const [inventoryright, setInventoryRight] = useState<any[]>([]);
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

    const fetchSkins2 = async (x: any, y:any, z:any, identifier: string) => {
      if (!identifier) return;
      try {
        const response = await axios.get(`http://localhost:3001/getkrakterinventorydrop`, {
          params: { x, y, z, identifier }
        });
        console.log(response.data.inventory)
        setInventoryRight(response.data.inventory);
        setVisibility(true);
      } catch (err) {
        setInventoryRight([]);
      }
  };

    const updateInventory = async (identifier: string) => {
      if (!identifier) return;
      try {
        const response = await axios.get(`http://localhost:3001/getkrakterinventory`, {
          params: { identifier }
        });
        setInventory(response.data.inventory);
      } catch (err) {
        setInventory([]);
      }
    };

    useCefEvent<string>("openInventory", (identifier) => {
      fetchSkins(identifier);
    });

    useCefEvent<any>('openInventoryRight', (dataJ) => {
      const data = JSON.parse(dataJ);
      if(data?.type == "drop")
      {
        fetchSkins2(data?.x, data?.y, data?.z, data?.identifier)
      }
    });

    useCefEvent<string>("inventory:updateInventory", (identifier) => {
      updateInventory(identifier);        
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
                        <InventoryMenu />
                        <RightInventory inventory={inventoryright} />
                    </Flex>
                </div>
            )}
        </Transition>
    );
}