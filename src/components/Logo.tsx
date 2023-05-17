import { Flex, chakra } from "@chakra-ui/react";
import LogoImg from "../assets/logo.png";
export const Logo = () => (
  <Flex justify={"center"} align={"center"}>
    <chakra.img maxW={"28"} src={LogoImg} />
  </Flex>
);
