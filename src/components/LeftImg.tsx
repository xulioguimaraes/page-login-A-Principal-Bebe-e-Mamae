import { Box, Flex, Heading, chakra } from "@chakra-ui/react";
import LeftIMG from "../assets/left-img.svg";
import LogoFull from "../assets/logo-full.png";

export const LeftImg = () => {
  return (
    <Flex
      bgColor={"#f91d8152"}
      justify={"center"}
      align={"center"}
      px={4}
      flexDirection={"column"}
    >
      <Flex
        flexDirection={"column"}
        bg={"#ffc4e0"}
        shadow={"base"}
        pb={4}
        overflow={"hidden"}
        borderRadius={"base"}
        mt={"4"}
        maxW={"345px"}
        align={"center"}
        position={"relative"}
      >
        <Flex pb={1} pt={3} justify={"center"} align={"center"} w={"full"}>
          <chakra.img w={"8rem"} src={LogoFull} />
        </Flex>
        <Box>
          <Heading
            mt={1}
            textAlign={"center"}
            fontSize={"lg"}
            px={2}
            color={"#7b003a"}
          >
            Estamos sempre empenhados em fornecer a você e à sua loja os
            melhores resultados.
          </Heading>

          <Heading
            mt={3}
            textAlign={"center"}
            fontSize={"lg"}
            color={"#7b003a"}
          >
            - Fé, Amor e Atitude.
          </Heading>
        </Box>
      </Flex>

      <chakra.img flex={1} maxW={"450px"} px={4} w={"100%"} src={LeftIMG} />
    </Flex>
  );
};
