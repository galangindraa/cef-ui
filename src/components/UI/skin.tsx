import { Text, Transition, Flex, Card, Stack, Title, Group, useMantineTheme, Button, Space, Container, Box, Tabs, ScrollArea, Image, Grid, SegmentedControl, Badge } from "@mantine/core";
import { Shirt, HardHat, Drama, Glasses, Backpack, X } from "lucide-react";
import { useCefEvent } from '../../hooks/useNuiEvent';
import { useAppVisibilitySkinMenu } from '../../stores/appVisibilityStore';
import { useState } from 'react';

const dataSkin = [
    {
      "Male": [
        { "id": 1, "name": "Skin 1" },
        { "id": 2, "name": "Skin 2" },
        { "id": 3, "name": "Skin 3" },
        { "id": 4, "name": "Skin 4" },
        { "id": 5, "name": "Skin 5" },
        { "id": 6, "name": "Skin 6" },
        { "id": 7, "name": "Skin 7" },
        { "id": 8, "name": "Skin 8" },
        { "id": 19, "name": "Skin 19" },
        { "id": 20, "name": "Skin 20" },
        { "id": 21, "name": "Skin 21" },
        { "id": 22, "name": "Skin 22" },
        { "id": 23, "name": "Skin 23" },
        { "id": 25, "name": "Skin 25" },
        { "id": 26, "name": "Skin 26" },
        { "id": 28, "name": "Skin 28" },
        { "id": 29, "name": "Skin 29" },
        { "id": 42, "name": "Skin 42" },
        { "id": 46, "name": "Skin 46" },  
        { "id": 47, "name": "Skin 47" },  
        { "id": 50, "name": "Skin 50" },
        { "id": 59, "name": "Skin 59" },
        { "id": 60, "name": "Skin 60" },
        { "id": 66, "name": "Skin 66" },
        { "id": 67, "name": "Skin 67" },
        { "id": 86, "name": "Skin 86" },
        { "id": 98, "name": "Skin 98" },
        { "id": 100, "name": "Skin 100" },
        { "id": 101, "name": "Skin 101" },
        { "id": 102, "name": "Skin 102" },
        { "id": 103, "name": "Skin 103" },
        { "id": 104, "name": "Skin 104" },
        { "id": 105, "name": "Skin 105" },
        { "id": 106, "name": "Skin 106" },
        { "id": 107, "name": "Skin 107" },
        { "id": 108, "name": "Skin 108" },
        { "id": 109, "name": "Skin 109" },
        { "id": 110, "name": "Skin 110" },
        { "id": 111, "name": "Skin 111" },
        { "id": 112, "name": "Skin 112" },
        { "id": 113, "name": "Skin 113" },
        { "id": 114, "name": "Skin 114" },
        { "id": 115, "name": "Skin 115" },
        { "id": 116, "name": "Skin 116" },
        { "id": 117, "name": "Skin 117" },
        { "id": 118, "name": "Skin 118" },
        { "id": 119, "name": "Skin 119" },
        { "id": 120, "name": "Skin 120" },
        { "id": 121, "name": "Skin 121" },
        { "id": 122, "name": "Skin 122" },
        { "id": 123, "name": "Skin 123" },
        { "id": 124, "name": "Skin 124" },
        { "id": 125, "name": "Skin 125" },
        { "id": 126, "name": "Skin 126" },
        { "id": 127, "name": "Skin 127" },
        { "id": 170, "name": "Skin 170" },
        { "id": 171, "name": "Skin 171" },
        { "id": 176, "name": "Skin 176" },
        { "id": 177, "name": "Skin 177" },
        { "id": 180, "name": "Skin 180" },
        { "id": 186, "name": "Skin 186" },
        { "id": 208, "name": "Skin 208" },
        { "id": 240, "name": "Skin 240" },
        { "id": 247, "name": "Skin 247" },
        { "id": 250, "name": "Skin 250" },
        { "id": 259, "name": "Skin 259" },
        { "id": 269, "name": "Skin 269" },
        { "id": 270, "name": "Skin 270" },
        { "id": 271, "name": "Skin 271" },
        { "id": 272, "name": "Skin 272" },
        { "id": 273, "name": "Skin 273" },
        { "id": 289, "name": "Skin 289" },
        { "id": 290, "name": "Skin 290" },
        { "id": 291, "name": "Skin 291" },
        { "id": 292, "name": "Skin 292" },
        { "id": 293, "name": "Skin 293" },
        { "id": 294, "name": "Skin 294" },
        { "id": 297, "name": "Skin 297" },
        { "id": 299, "name": "Skin 299" },
        { "id": 303, "name": "Skin 303" },
        { "id": 304, "name": "Skin 304" },
        { "id": 305, "name": "Skin 305" },
      ],
      "Female": [
        { "id": 11, "name": "Skin 11" },
        { "id": 12, "name": "Skin 12" },
        { "id": 13, "name": "Skin 13" },
        { "id": 40, "name": "Skin 40" },
        { "id": 41, "name": "Skin 41" },
        { "id": 56, "name": "Skin 56" },
        { "id": 65, "name": "Skin 65" },
        { "id": 69, "name": "Skin 69" },
        { "id": 76, "name": "Skin 76" },
        { "id": 91, "name": "Skin 91" },
        { "id": 93, "name": "Skin 93" },
        { "id": 150, "name": "Skin 150" },
        { "id": 169, "name": "Skin 169" },
        { "id": 172, "name": "Skin 172" },
        { "id": 190, "name": "Skin 190" },
        { "id": 191, "name": "Skin 191" },
        { "id": 192, "name": "Skin 192" },
        { "id": 193, "name": "Skin 193" },
        { "id": 194, "name": "Skin 194" },
        { "id": 195, "name": "Skin 195" },  
        { "id": 211, "name": "Skin 211" },
        { "id": 214, "name": "Skin 214" },
        { "id": 215, "name": "Skin 215" },
        { "id": 216, "name": "Skin 216" },
        { "id": 219, "name": "Skin 219" },
        { "id": 224, "name": "Skin 224" },
        { "id": 225, "name": "Skin 225" },
        { "id": 226, "name": "Skin 226" },
        { "id": 233, "name": "Skin 233" },  
        { "id": 298, "name": "Skin 298" },
      ]
    }
      
]

const dataHat = [
  {
    "id": 19098,
    "name": "CowboyHat5"
  },
  {
    "id": 19137,
    "name": "CluckinBellHat1"
  }
]

const dataGlasses = [
  {
    "id": 19033,
    "name": "Glass1"
  },
  {
    "id": 19012,
    "name": "Glass2"
  },
]

const dataMask = [
  {
    "id": 19038,
    "name": "Mask1"
  },
  {
    "id": 19036,
    "name": "Mask2"
  }
]

const dataBackpack = [
  {
    "id": 19559,
    "name": "Backpack1"
  },
  {
    "id": 1550,
    "name": "Backpack2"
  }
]

export function SkinMenu() {
  const theme = useMantineTheme();

  const { showApp, setVisibility, gender, setGender } = useAppVisibilitySkinMenu();
  
  const [selectedItems, setSelectedItems] = useState({
    skin: null as any,
    hat: null as any,
    glasses: null as any,
    mask: null as any,
    backpack: null as any
  });

  useCefEvent<string>("ui:showSkinMenu", (data) => {
    setVisibility(true);
    setGender(data);
  });

  const handleItemSelect = (tabType: string, item: any) => {
    const formattedData = `${tabType}|${item.id}`;
    (window as any).cef.emit("ui:selectSkin", formattedData);
    setSelectedItems(prev => ({
      ...prev,
      [tabType]: item
    }));
  };

  const handleApply = () => {
    const formattedData = `${selectedItems.skin?.id ?? -1}|${selectedItems.hat?.id ?? -1}|${selectedItems.glasses?.id ?? -1}|${selectedItems.mask?.id ?? -1}|${selectedItems.backpack?.id ?? -1}`;
    setSelectedItems({
        skin: null,
        hat: null,
        glasses: null,
        mask: null,
        backpack: null
    });
    (window as any).cef.emit("ui:applySkin", formattedData);
    setVisibility(false);
  };

  const handleClose = () => {
    setVisibility(false);
    setSelectedItems({
      skin: null,
      hat: null,
      glasses: null,
      mask: null,
      backpack: null
    });
    (window as any).cef.emit("ui:closeSkinMenu");
  };

  return (
    <Transition mounted={showApp} transition="fade" duration={400} timingFunction="ease">
      {(transStyles) => (
        <Flex
          pos="fixed"
          w="155vw"
          h="100vh"
          style={{
            pointerEvents: "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container size="md" style={{ pointerEvents: "auto", ...transStyles }}>
            <Card 
              radius="md" 
              withBorder 
              p="xl" 
              style={{ 
                backgroundColor: theme.colors.dark[8],
                border: `1px solid ${theme.colors.dark[4]}`,
                height: '80vh', 
                width: '750px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Group justify="space-between" mb="lg">
                <Title order={2} c="white" fw={600}>
                  Character Customization
                </Title>
                <Button
                  variant="subtle"
                  color="red"
                  size="sm"
                  onClick={handleClose}
                  style={{ borderRadius: '50%', width: 36, height: 36, padding: 0 }}
                >
                  <X size={18} />
                </Button>
              </Group>

              <Stack gap="md">
                <Tabs 
                  variant="pills" 
                  radius="md" 
                  defaultValue={"skin"}
                  color="blue"
                >
                  <Tabs.List style={{ 
                    backgroundColor: theme.colors.dark[6],
                    padding: '4px',
                    borderRadius: '8px'
                  }}>
                    <Tabs.Tab value="skin" style={{ flex: 1 }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Shirt size={16} />
                        <Text size="sm" fw={500}>Skin</Text>
                      </div>
                    </Tabs.Tab>
                    <Tabs.Tab value="hat" style={{ flex: 1 }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <HardHat size={16} />
                        <Text size="sm" fw={500}>Hat</Text>
                      </div>
                    </Tabs.Tab>
                    <Tabs.Tab value="glasses" style={{ flex: 1 }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Glasses size={16} />
                        <Text size="sm" fw={500}>Glasses</Text>
                      </div>
                    </Tabs.Tab>
                    <Tabs.Tab value="mask" style={{ flex: 1 }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Drama size={16} />
                        <Text size="sm" fw={500}>Mask</Text>
                      </div>
                    </Tabs.Tab>
                    <Tabs.Tab value="backpack" style={{ flex: 1 }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Backpack size={16} />
                        <Text size="sm" fw={500}>Backpack</Text>
                      </div>
                    </Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value="skin" pt="md">
                    <div style={{ 
                      width: '100%', 
                      height: '600px', 
                      padding: '13px',
                      backgroundColor: theme.colors.dark[7],
                      borderRadius: '8px',
                      border: `1px solid ${theme.colors.dark[5]}`,
                      overflowY: 'auto'
                    }}>
                      {dataSkin.map((category, index) => (
                        <Grid key={index} gutter="md">
                          {category[gender as keyof typeof category]?.map((item) => (
                            <Grid.Col key={item.id} span={3}>
                              <Card 
                                p="md" 
                                withBorder 
                                radius="md"
                                style={{ 
                                  display: 'flex', 
                                  flexDirection: 'column',
                                  justifyContent: 'center', 
                                  alignItems: 'center',
                                  cursor: 'pointer',
                                  backgroundColor: selectedItems.skin?.id === item.id 
                                    ? theme.colors.blue[9] 
                                    : theme.colors.dark[7],
                                  border: `1px solid ${selectedItems.skin?.id === item.id 
                                    ? theme.colors.blue[6] 
                                    : theme.colors.dark[5]}`,
                                  transition: 'all 0.2s ease',
                                  height: '180px'
                                }}
                                onMouseEnter={(e) => {
                                  if (selectedItems.skin?.id !== item.id) {
                                    e.currentTarget.style.backgroundColor = theme.colors.blue[9];
                                    e.currentTarget.style.borderColor = theme.colors.blue[6];
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (selectedItems.skin?.id !== item.id) {
                                    e.currentTarget.style.backgroundColor = theme.colors.dark[7];
                                    e.currentTarget.style.borderColor = theme.colors.dark[5];
                                  }
                                }}
                                onClick={() => {
                                  handleItemSelect('skin', item);
                                }}
                              >
                                <Image
                                  src={`https://assets.open.mp/assets/images/skins/${item.id}.png`}
                                  alt={item.name}
                                  w={170}
                                  h={170}
                                  fit="contain"
                                  fallbackSrc="https://placehold.co/130x130/666666/FFFFFF?text=?"
                                  style={{ borderRadius: '6px' }}
                                />
                                {selectedItems.skin?.id === item.id && (
                                  <Badge 
                                    color="blue" 
                                    variant="filled" 
                                    size="sm" 
                                    mt="xs"
                                  >
                                    Selected
                                  </Badge>
                                )}
                              </Card>
                            </Grid.Col>
                          ))}
                        </Grid>
                      ))}
                    </div>
                  </Tabs.Panel>

                  <Tabs.Panel value="hat" pt="md">
                    <ScrollArea h={600}>
                      <div style={{ 
                        width: '100%', 
                        height: '600px', 
                        padding: '13px',
                        backgroundColor: theme.colors.dark[7],
                        borderRadius: '8px',
                        border: `1px solid ${theme.colors.dark[5]}`,
                        overflowY: 'auto'
                      }}>
                        <Grid gutter="md">
                          {dataHat.map((item) => (
                            <Grid.Col key={item.id} span={3}>
                              <Card 
                                p="md" 
                                withBorder 
                                radius="md"
                                style={{ 
                                  display: 'flex', 
                                  flexDirection: 'column',
                                  justifyContent: 'center', 
                                  alignItems: 'center',
                                  cursor: 'pointer',
                                  backgroundColor: selectedItems.hat?.id === item.id 
                                    ? theme.colors.blue[9] 
                                    : theme.colors.dark[7],
                                  border: `1px solid ${selectedItems.hat?.id === item.id 
                                    ? theme.colors.blue[6] 
                                    : theme.colors.dark[5]}`,
                                  transition: 'all 0.2s ease',
                                  height: '180px'
                                }}
                                onMouseEnter={(e) => {
                                  if (selectedItems.hat?.id !== item.id) {
                                    e.currentTarget.style.backgroundColor = theme.colors.blue[9];
                                    e.currentTarget.style.borderColor = theme.colors.blue[6];
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (selectedItems.hat?.id !== item.id) {
                                    e.currentTarget.style.backgroundColor = theme.colors.dark[7];
                                    e.currentTarget.style.borderColor = theme.colors.dark[5];
                                  }
                                }}
                                onClick={() => {
                                  handleItemSelect('hat', { id: item.id, name: item.name });
                                }}
                              > 
                                <Image
                                  src={`https://files.prineside.com/gtasa_samp_model_id/white/${item.id}_w.jpg`}
                                  alt={item.name}
                                  w={170}
                                  h={170}
                                  fit="contain"
                                  fallbackSrc="https://placehold.co/130x130/666666/FFFFFF?text=?"
                                  style={{ 
                                    borderRadius: '6px',
                                    mixBlendMode: 'multiply',
                                    filter: 'contrast(1.1) brightness(1.1)'
                                  }}
                                />
                              </Card>
                            </Grid.Col>
                          ))}
                        </Grid>
                      </div>
                    </ScrollArea>
                  </Tabs.Panel>

                  <Tabs.Panel value="glasses" pt="md">
                    <ScrollArea h={600}>
                      <div style={{ 
                        width: '100%', 
                        height: '600px', 
                        padding: '13px',
                        backgroundColor: theme.colors.dark[7],
                        borderRadius: '8px',
                        border: `1px solid ${theme.colors.dark[5]}`,
                        overflowY: 'auto'
                      }}>
                        <Grid gutter="md">
                          {dataGlasses.map((item) => (
                            <Grid.Col key={item.id} span={3}>
                              <Card 
                                p="md" 
                                withBorder 
                                radius="md"
                                style={{ 
                                  display: 'flex', 
                                  flexDirection: 'column',
                                  justifyContent: 'center', 
                                  alignItems: 'center',
                                  cursor: 'pointer',
                                  backgroundColor: selectedItems.glasses?.id === item.id 
                                    ? theme.colors.blue[9] 
                                    : theme.colors.dark[7],
                                  border: `1px solid ${selectedItems.glasses?.id === item.id
                                    ? theme.colors.blue[6] 
                                    : theme.colors.dark[5]}`,
                                  transition: 'all 0.2s ease',
                                  height: '180px'
                                }}
                                onMouseEnter={(e) => {
                                  if (selectedItems.glasses?.id !== item.id) {
                                    e.currentTarget.style.backgroundColor = theme.colors.blue[9];
                                    e.currentTarget.style.borderColor = theme.colors.blue[6];
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (selectedItems.glasses?.id !== item.id) {
                                    e.currentTarget.style.backgroundColor = theme.colors.dark[7];
                                    e.currentTarget.style.borderColor = theme.colors.dark[5];
                                  }
                                }}
                                onClick={() => {
                                  handleItemSelect('glasses', { id: item.id, name: item.name });
                                }}
                              >
                                <Image
                                  src={`https://files.prineside.com/gtasa_samp_model_id/white/${item.id}_w.jpg`}
                                  alt={item.name}
                                  w={170}
                                  h={170}
                                  fit="contain"
                                  fallbackSrc="https://placehold.co/130x130/666666/FFFFFF?text=?"
                                  style={{ 
                                    borderRadius: '6px',
                                    mixBlendMode: 'multiply',
                                    filter: 'contrast(1.1) brightness(1.1)'
                                  }}
                                />
                              </Card>
                            </Grid.Col>
                          ))}
                        </Grid>
                      </div>
                    </ScrollArea>
                  </Tabs.Panel>

                  <Tabs.Panel value="mask" pt="md">
                    <ScrollArea h={600}>
                      <div style={{ 
                        width: '100%', 
                        height: '600px', 
                        padding: '13px',
                        backgroundColor: theme.colors.dark[7],
                        borderRadius: '8px',
                        border: `1px solid ${theme.colors.dark[5]}`,
                        overflowY: 'auto'
                      }}>
                        <Grid gutter="md">
                          {dataMask.map((item) => (
                            <Grid.Col key={item.id} span={3}>
                              <Card 
                                p="md" 
                                withBorder 
                                radius="md"
                                style={{ 
                                  display: 'flex', 
                                  flexDirection: 'column',
                                  justifyContent: 'center', 
                                  alignItems: 'center',
                                  cursor: 'pointer',
                                  backgroundColor: selectedItems.mask?.id === item.id 
                                    ? theme.colors.blue[9] 
                                    : theme.colors.dark[7],
                                  border: `1px solid ${selectedItems.mask?.id === item.id 
                                    ? theme.colors.blue[6] 
                                    : theme.colors.dark[5]}`,
                                  transition: 'all 0.2s ease',
                                  height: '180px'
                                }}
                                onMouseEnter={(e) => {
                                  if (selectedItems.mask?.id !== item.id) {
                                    e.currentTarget.style.backgroundColor = theme.colors.blue[9];
                                    e.currentTarget.style.borderColor = theme.colors.blue[6];
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (selectedItems.mask?.id !== item.id) {
                                    e.currentTarget.style.backgroundColor = theme.colors.dark[7];
                                    e.currentTarget.style.borderColor = theme.colors.dark[5];
                                  }
                                }}
                                onClick={() => {
                                  handleItemSelect('mask', { id: item.id, name: item.name });
                                }}
                              >
                                <Image
                                  src={`https://files.prineside.com/gtasa_samp_model_id/white/${item.id}_w.jpg`}
                                  alt={item.name}
                                  w={170}
                                  h={170}
                                  fit="contain"
                                  fallbackSrc="https://placehold.co/130x130/666666/FFFFFF?text=?"
                                  style={{ 
                                    borderRadius: '6px',
                                    mixBlendMode: 'multiply',
                                    filter: 'contrast(1.1) brightness(1.1)'
                                  }}
                                />
                              </Card>
                            </Grid.Col>
                          ))}
                        </Grid>
                      </div>
                    </ScrollArea>
                  </Tabs.Panel>

                  <Tabs.Panel value="backpack" pt="md">
                    <ScrollArea h={600}>
                      <div style={{ 
                        width: '100%', 
                        height: '600px', 
                        padding: '13px',
                        backgroundColor: theme.colors.dark[7],
                        borderRadius: '8px',
                        border: `1px solid ${theme.colors.dark[5]}`,
                        overflowY: 'auto'
                      }}>
                        <Grid gutter="md">
                          {dataBackpack.map((item) => (
                            <Grid.Col key={item.id} span={3}>
                              <Card 
                                p="md" 
                                withBorder 
                                radius="md"
                                style={{ 
                                  display: 'flex', 
                                  flexDirection: 'column',
                                  justifyContent: 'center', 
                                  alignItems: 'center',
                                  cursor: 'pointer',
                                  backgroundColor: selectedItems.backpack?.id === item.id 
                                    ? theme.colors.blue[9] 
                                    : theme.colors.dark[7],
                                  border: `1px solid ${selectedItems.backpack?.id === item.id 
                                    ? theme.colors.blue[6] 
                                    : theme.colors.dark[5]}`,
                                  transition: 'all 0.2s ease',
                                  height: '180px'
                                }}
                                onMouseEnter={(e) => {
                                  if (selectedItems.backpack?.id !== item.id) { 
                                    e.currentTarget.style.backgroundColor = theme.colors.blue[9];
                                    e.currentTarget.style.borderColor = theme.colors.blue[6];
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (selectedItems.backpack?.id !== item.id) {
                                    e.currentTarget.style.backgroundColor = theme.colors.dark[7];
                                    e.currentTarget.style.borderColor = theme.colors.dark[5];
                                  }
                                }}
                                onClick={() => {
                                  handleItemSelect('backpack', { id: item.id, name: item.name });
                                }}
                              >
                                <Image
                                  src={`https://files.prineside.com/gtasa_samp_model_id/white/${item.id}_w.jpg`}
                                  alt={item.name}
                                  w={170}
                                  h={170}
                                  fit="contain"
                                  fallbackSrc="https://placehold.co/130x130/666666/FFFFFF?text=?"
                                  style={{ 
                                    borderRadius: '6px',
                                    mixBlendMode: 'multiply',
                                    filter: 'contrast(1.1) brightness(1.1)'
                                  }}
                                />
                              </Card>
                            </Grid.Col>
                          ))}
                        </Grid>
                      </div>
                    </ScrollArea>
                  </Tabs.Panel>
                </Tabs>
              </Stack>
              <Button
                variant="outline"
                color="blue"
                size="xl"
                fullWidth
                mt="md"
                onClick={handleApply}
              >
                Apply
              </Button>
            </Card>
          </Container>
        </Flex>
      )}
    </Transition>
  );
}