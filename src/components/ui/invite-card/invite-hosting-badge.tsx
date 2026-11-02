import { INVITES_FONT_FAMILY } from "@/constants/components/invites.const";
import { registerComponent } from "@/utils/register-component.util";
import { Image } from "expo-image";
import type { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const InviteHostingBadgeBase: FC = (): React.ReactNode & React.JSX.Element => (
  <View style={styles.badge}>
    <Image
      source={require("@/assets/icons/hosting.svg")}
      style={styles.icon}
      contentFit="contain"
    />
    <Text style={styles.label}>Hosting</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    height: 30,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 15,
    borderCurve: "continuous",
    backgroundColor: "rgba(255, 255, 255, 0.24)",
  },
  icon: {
    width: 17,
    height: 13,
  },
  label: {
    color: "#ffffff",
    fontFamily: INVITES_FONT_FAMILY,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
  },
});

const InviteHostingBadge = registerComponent(
  "InviteHostingBadge",
  InviteHostingBadgeBase,
);

export { InviteHostingBadge };
