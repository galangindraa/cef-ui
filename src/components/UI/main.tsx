import { Text, Transition, Flex, Card, Stack, Title, Group, useMantineTheme, Button, Space, Container, Box, Divider } from "@mantine/core";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateKrakterFormInner } from '../comp/idenity/from';
import { createKrakterFormSchema } from '../comp/idenity/forms';
import type { createKrakterFormSchemaType } from '../comp/idenity/forms';
import { useCefEvent } from '../../hooks/useNuiEvent';
import { useAppVisibilityStore } from '../../stores/appVisibilityStore';

export function UI() {
  const theme = useMantineTheme();
  const { showApp, setVisibility } = useAppVisibilityStore();

  const form = useForm<createKrakterFormSchemaType>({
    resolver: zodResolver(createKrakterFormSchema),
  });

  const onSubmit = (data: createKrakterFormSchemaType) => {
    const formattedData = `${data.dateOfBirth}|${data.firstname}|${data.lastname}|${data.gender}`;
    (window as any).cef.emit("ui:createCharacter", formattedData);
    setVisibility(false);
    form.reset(); // Reset the form after submission
  };

  useCefEvent<boolean>("ui:showcreatecharacter", (data) => {
    setVisibility(data);
  });

  return (
    <Transition mounted={showApp} transition="fade" duration={400} timingFunction="ease">
      {(transStyles) => (
        <Flex
          pos="fixed"
          w="100vw"
          h="100vh"
          style={{
            pointerEvents: "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            pos="absolute"
            w="100%"
            h="100%"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, ${theme.colors.blue[9]}20 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, ${theme.colors.cyan[9]}20 0%, transparent 50%)`,
              opacity: 0.3,
            }}
          />
          
          <Container size="sm" style={{ pointerEvents: "auto", ...transStyles }}>
            <Card
              p="xl"
              shadow="xl"
              style={{
                backgroundColor: theme.colors.dark[8],
                borderRadius: theme.radius.lg,
                border: `1px solid ${theme.colors.dark[6]}`,
                backdropFilter: "blur(10px)",
                boxShadow: `0 25px 50px -12px ${theme.colors.dark[9]}80`,
              }}
            >
              <Stack align="center" gap="lg">
                <Group gap="md" align="center">
                  <Title 
                    order={1} 
                    c="white" 
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.blue[4]}, ${theme.colors.cyan[4]})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 700,
                    }}
                  >
                    DISTRICT ROLEPLAY
                  </Title>
                </Group>

                <Text 
                  c="dimmed" 
                  ta="center" 
                  size="lg"
                  style={{ 
                    fontWeight: 500,
                    marginBottom: "8px"
                  }}
                >
                  Buat Karakter Mu Di Sini
                </Text>
                <Box style={{ width: "100%" }}>
                  <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <CreateKrakterFormInner />
                      <Space h="lg" />
                      <Button 
                        fullWidth 
                        size="lg"
                        type="submit"
                        style={{
                          background: `linear-gradient(135deg, ${theme.colors.blue[6]}, ${theme.colors.cyan[6]})`,
                          border: "none",
                          fontWeight: 600,
                          fontSize: "16px",
                          padding: "12px 24px",
                          borderRadius: theme.radius.md,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: `0 10px 25px -5px ${theme.colors.blue[6]}40`,
                          }
                        }}
                      >
                        Buat Karakter
                      </Button>
                    </form>
                  </FormProvider>
                </Box>
              </Stack>
            </Card>
          </Container>
        </Flex>
      )}
    </Transition>
  );
}