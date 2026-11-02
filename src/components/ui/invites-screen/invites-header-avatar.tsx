import {
  INVITES_HEADER_BUTTON_SIZE,
  INVITES_PROFILE_IMAGE,
} from "@/constants/components/invites.const";
import { registerComponent } from "@/utils/register-component.util";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Image } from "expo-image";
import type { FC } from "react";
import { StyleSheet } from "react-native";

const InvitesHeaderAvatarBase: FC = (): React.ReactNode & React.JSX.Element => (
  <GlassView
    colorScheme="dark"
    style={[styles.avatar, !isLiquidGlassAvailable() && styles.fallback]}
    isInteractive
    glassEffectStyle="clear"
  >
    <Image
      source={INVITES_PROFILE_IMAGE}
      style={styles.image}
      contentFit="cover"
      cachePolicy="memory-disk"
    />
  </GlassView>
);

const styles = StyleSheet.create({
  avatar: {
    width: INVITES_HEADER_BUTTON_SIZE,
    height: INVITES_HEADER_BUTTON_SIZE,
    borderRadius: INVITES_HEADER_BUTTON_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  fallback: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 1000,
    overflow: "hidden",
  },
});

const InvitesHeaderAvatar = registerComponent(
  "InvitesHeaderAvatar",
  InvitesHeaderAvatarBase,
);

export { InvitesHeaderAvatar };
