import { Text, Transition, Flex, Card, Stack, Title, Group, useMantineTheme, Button, Space, Container, Box, Tabs, ScrollArea, Image, Grid, SegmentedControl, Badge } from "@mantine/core";
import { Shirt, HardHat, Drama, Glasses, Backpack, X } from "lucide-react";
import { useCefEvent } from '../../hooks/useNuiEvent';
import { useAppVisibilitySkinMenu } from '../../stores/appVisibilityStore';
import { useState } from 'react';

const dataSkin = [
    {
        "Male": [
          { "id": 0, "name": "CJ" },
          { "id": 1, "name": "Truth" },
          { "id": 2, "name": "Maccer" },
          { "id": 7, "name": "Old Reece" },
          { "id": 20, "name": "Businessman" },
          { "id": 21, "name": "White Male" },
          { "id": 23, "name": "White Male 2" },
          { "id": 24, "name": "Beach Male 1" },
          { "id": 25, "name": "Beach Male 2" },
          { "id": 26, "name": "Biker" },
          { "id": 27, "name": "Businessman 2" },
          { "id": 30, "name": "Fisherman" },
          { "id": 31, "name": "Golfer" },
          { "id": 32, "name": "Golfer 2" },
          { "id": 34, "name": "Park Ranger" },
          { "id": 35, "name": "Pilot" },
          { "id": 36, "name": "Pizza Boy" },
          { "id": 37, "name": "Policeman LS" },
          { "id": 38, "name": "Policeman SF" },
          { "id": 39, "name": "Policeman LV" },
          { "id": 40, "name": "Security Guard" },
          { "id": 41, "name": "Sheriff" },
          { "id": 42, "name": "SWAT" },
          { "id": 43, "name": "Army" },
          { "id": 44, "name": "Black Suit" },
          { "id": 45, "name": "Blue Suit" },
          { "id": 46, "name": "Casual 1" },
          { "id": 47, "name": "Casual 2" },
          { "id": 48, "name": "Casual 3" },
          { "id": 49, "name": "Casual 4" },
          { "id": 50, "name": "Pimp" }
        ],
        "Female": [
          { "id": 55, "name": "Nurse" },
          { "id": 56, "name": "Waitress" },
          { "id": 57, "name": "Businesswoman" },
          { "id": 58, "name": "School Girl" },
          { "id": 59, "name": "Secretary" },
          { "id": 60, "name": "Lady in Red" },
          { "id": 129, "name": "Housewife 1" },
          { "id": 130, "name": "Housewife 2" },
          { "id": 141, "name": "Bank Worker" },
          { "id": 144, "name": "Female Cop" },
          { "id": 150, "name": "Airport Ground Staff" },
          { "id": 151, "name": "Female Mechanic" },
          { "id": 190, "name": "Construction Worker (Female)" },
          { "id": 191, "name": "Tourist Female" },
          { "id": 193, "name": "Farmer Female" },
          { "id": 194, "name": "Female Teacher" },
          { "id": 211, "name": "Casino Female Worker" },
          { "id": 217, "name": "Asian Female" },
          { "id": 218, "name": "Female Sweater" },
          { "id": 219, "name": "Female Hoodie" }
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

export function SkinMenu() {
  const theme = useMantineTheme();

  const { showApp, setVisibility, gender, setGender, withSkin, setWithSkin } = useAppVisibilitySkinMenu();
  
  // State untuk menyimpan item yang dipilih di setiap tab
  const [selectedItems, setSelectedItems] = useState({
    skin: null as any,
    hat: null as any,
    glasses: null as any,
    mask: null as any,
    backpack: null as any
  });

  useCefEvent<string>("ui:showSkinMenu", (data) => {
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    setVisibility(true);
    setWithSkin(parsedData.whitskin);
    setGender(parsedData.gender);
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
          {/* Debug Button - Outside the card */}
          <Box
            pos="fixed"
            top="20px"
            right="20px"
            style={{ pointerEvents: "auto", zIndex: 1000 }}
          >
            <Button
              variant="filled"
              color={withSkin ? "green" : "red"}
              size="sm"
              onClick={() => setWithSkin(!withSkin)}
              style={{
                backgroundColor: withSkin ? theme.colors.green[6] : theme.colors.red[6],
                border: `1px solid ${withSkin ? theme.colors.green[4] : theme.colors.red[4]}`,
              }}
            >
              {withSkin ? "Hide Skin Tabs" : "Show Skin Tabs"}
            </Button>
          </Box>

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
              {/* Header */}
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
                  defaultValue={withSkin ? "skin" : "hat"}
                  color="blue"
                >
                  <Tabs.List style={{ 
                    backgroundColor: theme.colors.dark[6],
                    padding: '4px',
                    borderRadius: '8px'
                  }}>
                    {withSkin && (
                      <Tabs.Tab value="skin" style={{ flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          <Shirt size={16} />
                          <Text size="sm" fw={500}>Skin</Text>
                        </div>
                      </Tabs.Tab>
                    )}
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

                  {withSkin && (
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
                  )}

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
                          {/* Sample hat items - replace with actual data */}
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
                                  backgroundColor: selectedItems.hat?.id === item 
                                    ? theme.colors.blue[9] 
                                    : theme.colors.dark[7],
                                  border: `1px solid ${selectedItems.hat?.id === item 
                                    ? theme.colors.blue[6] 
                                    : theme.colors.dark[5]}`,
                                  transition: 'all 0.2s ease',
                                  height: '180px'
                                }}
                                onMouseEnter={(e) => {
                                  if (selectedItems.hat?.id !== item) {
                                    e.currentTarget.style.backgroundColor = theme.colors.blue[9];
                                    e.currentTarget.style.borderColor = theme.colors.blue[6];
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (selectedItems.hat?.id !== item) {
                                    e.currentTarget.style.backgroundColor = theme.colors.dark[7];
                                    e.currentTarget.style.borderColor = theme.colors.dark[5];
                                  }
                                }}
                                onClick={() => {
                                  handleItemSelect('hat', { id: item.id, name: item.name });
                                }}
                              > 
                                {/* Image and slectd */  }
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
                          {/* Sample glasses items - replace with actual data */}
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <Grid.Col key={item} span={3}>
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
                                  backgroundColor: selectedItems.glasses?.id === item 
                                    ? theme.colors.blue[9] 
                                    : theme.colors.dark[7],
                                  border: `1px solid ${selectedItems.glasses?.id === item 
                                    ? theme.colors.blue[6] 
                                    : theme.colors.dark[5]}`,
                                  transition: 'all 0.2s ease',
                                  height: '180px'
                                }}
                                onMouseEnter={(e) => {
                                  if (selectedItems.glasses?.id !== item) {
                                    e.currentTarget.style.backgroundColor = theme.colors.blue[9];
                                    e.currentTarget.style.borderColor = theme.colors.blue[6];
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (selectedItems.glasses?.id !== item) {
                                    e.currentTarget.style.backgroundColor = theme.colors.dark[7];
                                    e.currentTarget.style.borderColor = theme.colors.dark[5];
                                  }
                                }}
                                onClick={() => {
                                  handleItemSelect('glasses', { id: item, name: `Glasses ${item}` });
                                }}
                              >
                                <Glasses size={80} color={theme.colors.blue[5]} />
                                <Text size="sm" mt="md" ta="center">Glasses {item}</Text>
                                {selectedItems.glasses?.id === item && (
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
                          {/* Sample mask items - replace with actual data */}
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <Grid.Col key={item} span={3}>
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
                                  backgroundColor: selectedItems.mask?.id === item 
                                    ? theme.colors.blue[9] 
                                    : theme.colors.dark[7],
                                  border: `1px solid ${selectedItems.mask?.id === item 
                                    ? theme.colors.blue[6] 
                                    : theme.colors.dark[5]}`,
                                  transition: 'all 0.2s ease',
                                  height: '180px'
                                }}
                                onMouseEnter={(e) => {
                                  if (selectedItems.mask?.id !== item) {
                                    e.currentTarget.style.backgroundColor = theme.colors.blue[9];
                                    e.currentTarget.style.borderColor = theme.colors.blue[6];
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (selectedItems.mask?.id !== item) {
                                    e.currentTarget.style.backgroundColor = theme.colors.dark[7];
                                    e.currentTarget.style.borderColor = theme.colors.dark[5];
                                  }
                                }}
                                onClick={() => {
                                  handleItemSelect('mask', { id: item, name: `Mask ${item}` });
                                }}
                              >
                                <Drama size={80} color={theme.colors.blue[5]} />
                                <Text size="sm" mt="md" ta="center">Mask {item}</Text>
                                {selectedItems.mask?.id === item && (
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
                          {/* Sample backpack items - replace with actual data */}
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <Grid.Col key={item} span={3}>
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
                                  backgroundColor: selectedItems.backpack?.id === item 
                                    ? theme.colors.blue[9] 
                                    : theme.colors.dark[7],
                                  border: `1px solid ${selectedItems.backpack?.id === item 
                                    ? theme.colors.blue[6] 
                                    : theme.colors.dark[5]}`,
                                  transition: 'all 0.2s ease',
                                  height: '180px'
                                }}
                                onMouseEnter={(e) => {
                                  if (selectedItems.backpack?.id !== item) {
                                    e.currentTarget.style.backgroundColor = theme.colors.blue[9];
                                    e.currentTarget.style.borderColor = theme.colors.blue[6];
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (selectedItems.backpack?.id !== item) {
                                    e.currentTarget.style.backgroundColor = theme.colors.dark[7];
                                    e.currentTarget.style.borderColor = theme.colors.dark[5];
                                  }
                                }}
                                onClick={() => {
                                  handleItemSelect('backpack', { id: item, name: `Backpack ${item}` });
                                }}
                              >
                                <Backpack size={80} color={theme.colors.blue[5]} />
                                <Text size="sm" mt="md" ta="center">Backpack {item}</Text>
                                {selectedItems.backpack?.id === item && (
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
                      </div>
                    </ScrollArea>
                  </Tabs.Panel>
                </Tabs>
              </Stack>
              <Button
                variant="outline"
                color="blue"
                size="md"
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