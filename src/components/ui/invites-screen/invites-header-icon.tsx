import { INVITES_HEADER_BUTTON_SIZE } from "@/constants/components/invites.const";
import { registerComponent } from "@/utils/register-component.util";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { SymbolView } from "expo-symbols";
import type { FC } from "react";
import { StyleSheet } from "react-native";
import type { IInvitesHeaderIcon } from "./interface";

const InvitesHeaderIconBase: FC<IInvitesHeaderIcon> = ({
  symbol,
}: IInvitesHeaderIcon &
  React.ComponentProps<typeof InvitesHeaderIconBase>): React.ReactNode &
  React.JSX.Element => (
  <GlassView
    colorScheme="dark"
    style={[styles.icon, !isLiquidGlassAvailable() && styles.fallback]}
    isInteractive
    glassEffectStyle={"clear"}
  >
    <SymbolView name={symbol} size={25} weight="semibold" tintColor="#ffffff" />
  </GlassView>
);

const styles = StyleSheet.create({
  icon: {
    width: INVITES_HEADER_BUTTON_SIZE,
    height: INVITES_HEADER_BUTTON_SIZE,
    borderRadius: INVITES_HEADER_BUTTON_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  fallback: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

const InvitesHeaderIcon = registerComponent(
  "InvitesHeaderIcon",
  InvitesHeaderIconBase,
);

export { InvitesHeaderIcon };
