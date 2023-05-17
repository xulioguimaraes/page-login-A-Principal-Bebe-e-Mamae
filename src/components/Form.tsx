import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { PasswordField } from "./PasswordField";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Controller, useForm } from "react-hook-form";
import { LeftImg } from "./LeftImg";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { AxiosError } from "axios";
import { Toaster, toast } from "react-hot-toast";
interface BaseAvailable {
  id: string;
  name: string;
}
interface FormLogin {
  username: string;
  password: string;
  base: string;
}
interface ErrorDataResponse {
  message: string;
  statusCode: number;
}

export const Form = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormLogin>();
  const [options, setOptions] = useState([] as BaseAvailable[]);
  const [isLoading, setIsloading] = useState(false);
  const getBasesAvailable = async () => {
    const response = await api.get("base/available-bases");
    setOptions(response.data);
  };
  const onSubmit = async (data: FormLogin) => {
    setIsloading(true);
    const toastId = toast.loading(`Carregando...`);

    try {
      const response = await api.post("/login", data);
      if (response.status === 201) {
        const data = response.data;
        toast.success(`Sucesso`, {
          id: toastId,
        });

        window.open(
          `http://localhost:3000/${data.id}/${data.token}?access_token=${data.access_token}`,
          "_self"
        );
      }
    } catch (error) {
      const err = error as AxiosError<ErrorDataResponse>;

      if (err?.response?.data?.message) {
        toast.error(`Erro: ${err?.response?.data.message}`, {
          id: toastId,
        });
      } else {
        toast.error(`Erro ao fazer login`, {
          id: toastId,
        });
        console.log(error);
      }
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    getBasesAvailable();
  }, []);
  return (
    <Flex
      flexDirection={"row"}
      height={"100vh"}
      justify={"center"}
      align={"center"}
      w={"full"}
    >
      <Toaster position="bottom-center" reverseOrder={false} />

      <Stack
        spacing="0"
        direction={"row"}
        borderRadius={"lg"}
        overflow={"hidden"}
        shadow={"2xl"}
      >
        <LeftImg />
        <Stack spacing="6"></Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "white", sm: "bg-surface" }}
          as="form"
          w={"400px"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing="6">
            <Logo />

            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "xs", md: "sm" }}>
                Faça login na sua conta
              </Heading>
            </Stack>
            <Stack spacing="5">
              <FormControl isInvalid={!!errors.username?.message}>
                <FormLabel htmlFor="username">Usuário</FormLabel>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input isDisabled={isLoading} id="username" {...field} />
                  )}
                />
              </FormControl>
              <PasswordField
                isInvalid={!!errors.password?.message}
                isDisabled={isLoading}
                {...register("password", { required: true })}
              />
              <FormControl isInvalid={!!errors.base}>
                <FormLabel htmlFor="email">Base</FormLabel>
                <Select
                  placeholder="Selecione uma base"
                  isDisabled={isLoading}
                  {...register("base", { required: true })}
                >
                  {options.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Lembre me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Esqueceu sua senha?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button
                bgColor={"#f91d81"}
                color={"white"}
                type="submit"
                variant="primary"
                isLoading={isLoading}
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
          <OAuthButtonGroup />
        </Box>
      </Stack>
    </Flex>
  );
};
