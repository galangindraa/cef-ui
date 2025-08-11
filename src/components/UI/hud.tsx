import { Transition, Flex, Card, useMantineTheme, Box, Progress, Text } from "@mantine/core";
import { Heart, Utensils, CupSoda, Brain } from "lucide-react";
import { useCefEvent } from '../../hooks/useNuiEvent';
import { useAppVisibilityHud } from '../../stores/appVisibilityStore';

export function HudUI() {
    const theme = useMantineTheme();
    const { showApp, setVisibility, health, hunger, thirst, mental, armor, setHealth, setHunger, setThirst, setMental, setArmor } = useAppVisibilityHud();

    useCefEvent<boolean>("ui:showhud", () => {
        setVisibility(true);
    });

    useCefEvent<any>("ui:hudsetdata", (data) => {
        const dataJ = JSON.parse(data);
        setHealth(dataJ.health);
        setHunger(dataJ.hunger);
        setThirst(dataJ.thirst);
        setMental(dataJ.stress);
        setArmor(dataJ.armor);
    });

    return (
        <Transition mounted={showApp} transition="fade" duration={400} timingFunction="ease">
            {(transStyles) => (
                <Flex
                    pos="fixed"
                    top="96.8%"
                    left="8.2%"
                    style={{
                        pointerEvents: "none",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                        transform: "translate(-50%, -50%)",
                        ...transStyles,
                    }}>
                    <Card
                        p="0.3vh"
                        style={{
                            backgroundColor: theme.colors.dark[8],
                            height: '6.2vh',
                            width: 'min(264px, 14vw)',
                            maxWidth: '300px',
                            minWidth: '200px',
                        }}
                    >
                        <Flex
                            mih="5vh"
                            gap="0.5vh"
                            justify="flex-start"
                            align="flex-start"
                            direction="row"
                            style={{ height: '100%' }}
                        >
                            {/* Health Bar */}
                            <Box style={{ position: 'relative', width: '25%', height: '100%' }}>
                                <Box
                                    bg="#2d1b1b"
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                                <Box
                                    bg="#ff4757"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '100%',
                                        height: `${health}%`
                                    }}
                                />
                                <Heart
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        color: 'white',
                                        width: 'min(20px, 2vh)',
                                        height: 'min(20px, 2vh)',
                                    }}
                                />
                            </Box>

                            {/* Hunger Bar */}
                            <Box style={{ position: 'relative', width: '25%', height: '100%' }}>
                                <Box
                                    bg="#1a2e1a"
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                                <Box
                                    bg="#2ed573"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '100%',
                                        height: `${hunger}%`
                                    }}
                                />
                                <Utensils
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        color: 'white',
                                        width: 'min(20px, 2vh)',
                                        height: 'min(20px, 2vh)',
                                    }}
                                />
                            </Box>

                            {/* Thirst Bar */}
                            <Box style={{ position: 'relative', width: '25%', height: '100%' }}>
                                <Box
                                    bg="#1a1a2e"
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                                <Box
                                    bg="#3742fa"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '100%',
                                        height: `${thirst}%`
                                    }}
                                />
                                <CupSoda
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        color: 'white',
                                        width: 'min(20px, 2vh)',
                                        height: 'min(20px, 2vh)',
                                    }}
                                />
                            </Box>

                            {/* Mental Bar */}
                            <Box style={{ position: 'relative', width: '25%', height: '100%' }}>
                                <Box
                                    bg="#2e1a2e"
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                                <Box
                                    bg="#a55eea"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '100%',
                                        height: `${mental}%`
                                    }}
                                />
                                <Brain
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        color: 'white',
                                        width: 'min(20px, 2vh)',
                                        height: 'min(20px, 2vh)',
                                    }}
                                />
                            </Box>
                        </Flex>
                        
                        {/* Progress Bar */}
                        <Progress 
                            mt="0.3vh" 
                            size="lg" 
                            color="blue" 
                            value={armor}
                            style={{ height: '0.8vh' }}
                        />
                    </Card>
                </Flex>
            )}
        </Transition>
    )
}