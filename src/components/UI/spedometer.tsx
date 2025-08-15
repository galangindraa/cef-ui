import { Transition, Flex, Card, useMantineTheme, Box, Progress, Text } from "@mantine/core";
import { Gauge, Fuel, Shield, ShieldOff, Group } from "lucide-react";
import { useCefEvent } from '../../hooks/useNuiEvent';
import { useAppVisibilitySpeedometer } from '../../stores/appVisibilityStore';
import { useState, useEffect } from 'react';

export function HudUISpeedometer() {
    const theme = useMantineTheme();
    const { showApp, setVisibility } = useAppVisibilitySpeedometer();
    const [speed, setSpeed] = useState(0);
    const [animatedSpeed, setAnimatedSpeed] = useState(0);
    const [fuel, setFuel] = useState(100);
    const [seatbeltOn, setSeatbeltOn] = useState(false);

    useCefEvent('ui:showSpeedometer', () => {
        setVisibility(true);
    });

    useCefEvent('ui:hideSpeedometer', () => {
        setVisibility(false);
        setSeatbeltOn(false);
    });

    useCefEvent<any>('ui:updateSpedoData', (data) => {
        const dataJ = JSON.parse(data);
        setSpeed(dataJ.speed);
        setFuel(dataJ.fuel);
    });

    useCefEvent<boolean>('ui:toggleSeatbelt', (data) => {
        setSeatbeltOn(data);
    });

    useCefEvent('ui:setSeatbelt', (data) => {
        const dataJ = JSON.parse(data);
        setSeatbeltOn(dataJ.seatbelt);
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedSpeed(speed);
        }, 50);
        return () => clearTimeout(timer);
    }, [speed]);

    const getSpeedColor = () => {
        return '#00b4d8';
    };

    const getFuelColor = (fuelLevel: number) => {
        if (fuelLevel > 50) return '#00b4d8';
        if (fuelLevel > 20) return '#0077b6';
        return '#023e8a'
    };

    const getSeatbeltColor = () => {
        return seatbeltOn ? '#00b4d8' : '#ff6b6b';
    };

    return (
        <Transition mounted={showApp} transition="fade" duration={400} timingFunction="ease">
            {(transStyles) => (
                <Flex
                    pos="fixed"
                    top="90%"
                    left="23%"
                    direction="column"
                    gap="sm"
                    style={{
                        pointerEvents: "none",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                        transform: "translate(-50%, -50%)",
                        ...transStyles,
                    }}>
                    
                    {/* Fuel Bar */}
                    <Card
                        shadow="lg"
                        radius={0}
                        p="md"
                        style={{
                            backgroundColor: theme.colors.dark[8],
                            minWidth: '220px',
                        }}
                    >
                        <Flex align="center" gap="sm">
                            <Box
                                style={{
                                    background: 'rgba(0,180,216,0.1)',
                                    borderRadius: '50%',
                                    padding: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Fuel 
                                    size={16} 
                                    color={getFuelColor(fuel)}
                                />
                            </Box>
                            <Text
                                size="sm"
                                fw={700}
                                style={{
                                    color: 'rgba(255,255,255,0.9)',
                                    minWidth: '40px',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                FUEL
                            </Text>
                            <Box style={{ flex: 1 }}>
                                <Progress
                                    value={fuel}
                                    size="md"
                                    radius={0}
                                    styles={{
                                        root: {
                                            background: 'rgba(0,0,0,0.4)',
                                            border: '1px solid rgba(0,180,216,0.2)',
                                        },
                                        section: {
                                            background: getFuelColor(fuel),
                                            transition: 'width 0.3s ease',
                                            boxShadow: `0 0 10px ${getFuelColor(fuel)}40`,
                                        }
                                    }}
                                />
                            </Box>
                            <Text
                                size="sm"
                                fw={700}
                                style={{
                                    color: getFuelColor(fuel),
                                    fontFamily: 'monospace',
                                    minWidth: '35px',
                                    textAlign: 'right',
                                }}
                            >
                                {fuel.toFixed(0)}%
                            </Text>
                        </Flex>
                    </Card>
                        {/* Speedometer */}
                    <Card
                        shadow="lg"
                        radius={0}
                        p="md"
                        style={{
                            backgroundColor: theme.colors.dark[8],
                            minWidth: '240px',
                        }}
                    >
                        <Flex direction="column" gap="md" align="center">
                            <Flex align="center" gap="sm">
                                <Box
                                    style={{
                                        background: 'rgba(0,180,216,0.1)',
                                        borderRadius: '50%',
                                        padding: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Gauge 
                                        size={20} 
                                        color={getSpeedColor()}
                                    />
                                </Box>
                                <Text
                                    size="3xl"
                                    fw={800}
                                    style={{
                                        color: '#fff',
                                        fontFamily: 'monospace',
                                        textShadow: `0 0 15px ${getSpeedColor()}`,
                                        letterSpacing: '1px',
                                        minWidth: '30px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {animatedSpeed.toFixed(0)}
                                </Text>
                                <Flex align="center" gap="xs">
                                    <Text
                                        size="sm"
                                        fw={600}
                                        style={{
                                            color: 'rgba(255,255,255,0.8)',
                                            alignSelf: 'flex-end',
                                            marginBottom: '0px',
                                            letterSpacing: '0.5px',
                                        }}
                                    >
                                        KM/H
                                    </Text>
                                </Flex>

                                <Box
                                    style={{
                                        color: getSeatbeltColor(),
                                        backgroundColor: seatbeltOn ? 'rgba(0,180,216,0.15)' : 'rgba(255,107,107,0.15)',
                                        borderRadius: '8px',
                                        pointerEvents: "none",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '20px',
                                        height: '20px',
                                    }}
                                >
                                    {seatbeltOn ? (
                                        <Shield size={20} style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                                    ) : (
                                        <ShieldOff size={20} style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                                    )}
                                </Box>
                            </Flex>

                            {/* Speed Progress Bar */}
                            <Box w="100%">
                                <Progress
                                    value={(animatedSpeed / 200) * 100}
                                    size="md"
                                    radius={0}
                                    styles={{
                                        root: {
                                            background: 'rgba(0,0,0,0.4)',
                                            border: '1px solid rgba(0,180,216,0.2)',
                                        },
                                        section: {
                                            background: getSpeedColor(),
                                            transition: 'width 0.3s ease',
                                            boxShadow: `0 0 15px ${getSpeedColor()}40`,
                                        }
                                    }}
                                />
                            </Box>
                        </Flex>
                    </Card>
                </Flex>
            )}
        </Transition>
    )
}