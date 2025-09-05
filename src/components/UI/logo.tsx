import { Image, Flex } from "@mantine/core";

export function Logo() {
  return (
    <Flex
        pos="fixed"
        w="auto"
        style={{
            top: -23,
            right: -30,
            pointerEvents: "none",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            padding: "16px",
            gap: 0,
        }}
    >
        <Image
            src={`/logo.png`}
            alt={"logo"}
            style={{
                width: "150px",
                height: "auto",
                objectFit: "contain",
            }}
          />
    </Flex>
  );
}