import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { GoogleIcon, InstagramIcon, YoutubeIcon } from "./ProviderIcons.tsx";

const providers = [
  { name: "Google", icon: <GoogleIcon boxSize="5" /> },
  { name: "Instagram ", icon: <InstagramIcon /> },
  { name: "Youtube", icon: <YoutubeIcon /> },
];

export const OAuthButtonGroup = () => (
  <ButtonGroup mt={4} variant="outline" spacing="4" width="full">
    {providers.map(({ name, icon }) => (
      <Button key={name} width="full">
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
);
