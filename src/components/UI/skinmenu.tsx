import { Car, Upload, X, Eye, Check, Trash2, Settings, Edit } from "lucide-react";
import { Transition, Flex, Card, Title, Group, useMantineTheme, Button, Container, Text, Stack, Menu, ActionIcon, Badge, SimpleGrid, Image, Loader, Center, ScrollArea } from "@mantine/core";
import { useCefEvent } from '../../hooks/useNuiEvent';
import { useAppVisibilitySkinMenuList } from '../../stores/appVisibilityStore';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface SkinItem {
  id: number;
  name: string;
}

export function SkinMenuList() {
  const theme = useMantineTheme();
  const { showApp, setVisibility } = useAppVisibilitySkinMenuList();
  const [selectedSkin, setSelectedSkin] = useState<SkinItem | null>(null);
  const [showSkinGrid, setShowSkinGrid] = useState(false);
  const [skins, setSkins] = useState<SkinItem[]>([]);
  const [loading, setLoading] = useState(false);
  
  const fetchSkins = async (identifier: string) => {
    if (!identifier) return;
    
    setLoading(true);
    
    try {
      const response = await axios.get(`http://localhost:3001/getplayerskins`, {
        params: { identifier }
      });
      setSkins(response.data);
    } catch (err) {
      console.error('Error fetching skins:', err);
      setSkins([]);
    } finally {
      setLoading(false);
    }
  };
  
  useCefEvent<string>("ui:showSkinMenuList", (data) => {
    fetchSkins(data);
    setVisibility(true);
  });

  const handleClose = () => {
    setVisibility(false);
    setSkins([]);
    setSelectedSkin(null);
    setShowSkinGrid(false);
    (window as any).cef.emit("ui:closeSkinMenuList");
  };

  useEffect(() => {
    if (!showApp) {
      setSkins([]);
      setVisibility(false);
      setSelectedSkin(null);
      setShowSkinGrid(false);
    }
  }, [showApp]);

  const handlePreviewSkin = (skin: SkinItem) => {
    (window as any).cef.emit("ui:previewSkinList", skin.id);
  };

  const handleUpdateSkin = (skin: SkinItem) => {
    setVisibility(false);
    (window as any).cef.emit("ui:updateSkinList", skin.id);
  };

  const handleApplySkin = (skin: SkinItem) => {
    setVisibility(false);
    (window as any).cef.emit("ui:applySkinList", skin.id);
  };

  const handleDeleteSkin = (skin: SkinItem) => {
    setVisibility(false);
    (window as any).cef.emit("ui:deleteSkinList", skin.id);
  };

  const handleBuyOutfit = () => {
    setVisibility(false);
    (window as any).cef.emit("ui:buyOutfitList");
  };

  const handleSaveOutfit = () => {
    setVisibility(false);
    (window as any).cef.emit("ui:saveOutfitList");
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
          <Container size="lg" style={{ pointerEvents: "auto", ...transStyles,
            height: '80vh', 
            width: '700px',
           }}>
            <Stack gap="md">
              <Card 
                radius="md" 
                style={{ 
                  backgroundColor: theme.colors.dark[8],
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  border: `1px solid ${theme.colors.dark[6]}`,
                }}
              >
                <Group justify="space-between" align="center">
                  <Title order={2} c="white" fw={700}>
                    Character Customization
                  </Title>
                  <Button 
                    size="sm" 
                    onClick={handleClose} 
                    variant="subtle"
                    color="gray"
                    style={{
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      border: `1px solid ${theme.colors.dark[6]}`,
                    }}
                  >
                    <X size={18} />
                  </Button>
                </Group>
              </Card>

              <Card 
                radius="md" 
                style={{ 
                  backgroundColor: theme.colors.dark[8],
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  border: `1px solid ${theme.colors.dark[6]}`,
                  minHeight: showSkinGrid ? '500px' : '120px',
                  transition: 'min-height 0.3s ease',
                }}
              >
                <Stack gap="lg">
                  <Card 
                    radius="md" 
                    style={{ 
                      backgroundColor: theme.colors.dark[8],
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      border: `1px solid ${theme.colors.dark[6]}`,
                    }}
                  >
                    <Group justify="space-between" align="center">
                      <Title order={3} c="white" fw={600}>
                        Buy New Outfit
                      </Title>
                      <Button 
                        size="sm" 
                        variant="light"
                        color="green"
                        onClick={handleBuyOutfit}
                        style={{
                          borderRadius: '8px',
                          backgroundColor: 'transparent',
                          border: `1px solid ${theme.colors.green[6]}`,
                        }}
                      >
                        Buy Outfit
                      </Button>
                    </Group>
                  </Card>
                  
                  {/* Save Outfit Card */}
                  <Card 
                    radius="md" 
                    style={{ 
                      backgroundColor: theme.colors.dark[8],
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      border: `1px solid ${theme.colors.dark[6]}`,
                    }}
                  >
                    <Group justify="space-between" align="center">
                      <Title order={3} c="white" fw={600}>
                        Save Current Outfit
                      </Title>
                      <Button 
                        size="sm" 
                        variant="light"
                        color="blue"
                        onClick={handleSaveOutfit}
                        style={{
                          borderRadius: '8px',
                          backgroundColor: 'transparent',
                          border: `1px solid ${theme.colors.blue[6]}`,
                        }}
                      >
                        Save Outfit
                      </Button>
                    </Group>
                  </Card>
                  
                  <Card 
                    radius="md" 
                    style={{ 
                      backgroundColor: theme.colors.dark[8],
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      border: `1px solid ${theme.colors.dark[6]}`,
                      minHeight: showSkinGrid ? '300px' : '70px',
                      height: showSkinGrid ? 'auto' : '70px',
                      overflow: showSkinGrid ? 'visible' : 'hidden',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Stack gap="lg">
                      <Group justify="space-between" align="center">
                        <Title 
                          order={3} 
                          c="white" 
                          fw={600}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setShowSkinGrid(!showSkinGrid)}
                        >
                          Available Skins
                        </Title>
                        <Group>
                          <Badge size="xl" variant="light" color="blue">
                            {skins.length} Skins
                          </Badge>
                        </Group>
                      </Group>
                      
                      {showSkinGrid && (
                        <>
                          {loading ? (
                            <Center>
                              <Loader color="blue" />
                            </Center>
                          ) : skins.length === 0 ? (
                            <Text c="gray" ta="center">
                              No skins found for this player.
                            </Text>
                          ) : (
                            <>
                              <ScrollArea h={250}>
                                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                                    {skins.map((skin) => (
                                      <Card
                                        key={skin.id}
                                        radius="md"
                                        style={{
                                          backgroundColor: theme.colors.dark[7],
                                          border: `1px solid ${selectedSkin?.id === skin.id ? theme.colors.blue[6] : theme.colors.dark[6]}`,
                                          cursor: 'pointer',
                                          transition: 'all 0.2s ease',
                                        }}
                                        onClick={() => setSelectedSkin(skin)}
                                      >
                                        <Stack gap="xs">
                                          <Group justify="space-between" align="center">
                                            <Text size="sm" fw={500} c="white" truncate>
                                              {skin.name}
                                            </Text>
                                          </Group>
                                          
                                          <Group justify="space-between" align="center">
                                            <Badge size="xs" variant="outline" color="gray">
                                              ID: {skin.id}
                                            </Badge>
                                            
                                            <Menu shadow="md" width={200}>
                                              <Menu.Target>
                                                <ActionIcon
                                                  variant="subtle"
                                                  color="gray"
                                                  size="sm"
                                                  onClick={(e) => e.stopPropagation()}
                                                >
                                                  <Settings size={14} />
                                                </ActionIcon>
                                              </Menu.Target>

                                              <Menu.Dropdown>
                                                <Menu.Label>Actions</Menu.Label>
                                                <Menu.Item
                                                  leftSection={<Eye size={14} />}
                                                  onClick={() => handlePreviewSkin(skin)}
                                                >
                                                  Preview
                                                </Menu.Item>
                                                <Menu.Item
                                                  leftSection={<Upload size={14} />}
                                                  onClick={() => handleUpdateSkin(skin)}
                                                >
                                                  Update Skin
                                                </Menu.Item>
                                                <Menu.Item
                                                  leftSection={<Check size={14} />}
                                                  onClick={() => handleApplySkin(skin)}
                                                  disabled={selectedSkin?.id === skin.id}
                                                >
                                                  Apply Skin
                                                </Menu.Item>
                                                <Menu.Divider />
                                                <Menu.Item
                                                  leftSection={<Trash2 size={14} />}
                                                  color="red"
                                                  onClick={() => handleDeleteSkin(skin)}
                                                >
                                                  Delete
                                                </Menu.Item>
                                              </Menu.Dropdown>
                                            </Menu>
                                          </Group>
                                        </Stack>
                                      </Card>
                                    ))}
                                </SimpleGrid>
                              </ScrollArea>
                              
                              {selectedSkin && (
                                <Card
                                  radius="md"
                                  style={{
                                    backgroundColor: theme.colors.dark[7],
                                    border: `1px solid ${theme.colors.blue[6]}`,
                                  }}
                                >
                                  <Group justify="space-between" align="center">
                                    <Stack gap="xs">
                                      <Text size="lg" fw={600} c="white">
                                        {selectedSkin.name}
                                      </Text>
                                    </Stack>
                                    <Group>
                                      <Button
                                        size="sm"
                                        leftSection={<Eye size={16} />}
                                        variant="light"
                                        onClick={() => handlePreviewSkin(selectedSkin)}
                                      >
                                        Preview
                                      </Button>
                                      <Button
                                        size="sm"
                                        leftSection={<Check size={16} />}
                                        disabled={false}
                                        onClick={() => handleApplySkin(selectedSkin)}
                                      >
                                        Apply
                                      </Button>
                                    </Group>
                                  </Group>
                                </Card>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </Stack>
                  </Card>
                </Stack>
              </Card>
            </Stack>
          </Container>
        </Flex>
      )}
    </Transition>
  );
}