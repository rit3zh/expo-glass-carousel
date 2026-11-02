import { INVITES_FONT_FAMILY } from "@/constants/components/invites.const";
import { registerComponent } from "@/utils/register-component.util";
import { GlassContainer } from "expo-glass-effect";
import { SymbolView } from "expo-symbols";
import type { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  type EdgeInsets,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { InvitesHeaderAvatar } from "./invites-header-avatar";
import { InvitesHeaderIcon } from "./invites-header-icon";

const InvitesHeaderBase: FC = (): React.ReactNode & React.JSX.Element => {
  const insets: EdgeInsets = useSafeAreaInsets();

  return (
    <View
      style={[styles.header, { paddingTop: insets.top + 8 }]}
      pointerEvents="box-none"
    >
      <View
        style={styles.title}
        accessible
        accessibilityRole="header"
        accessibilityLabel="Upcoming"
      >
        <Text style={styles.titleLabel}>Upcoming</Text>
        <SymbolView
          name={{ ios: "chevron.down", android: "expand_more" }}
          size={20}
          weight="medium"
          tintColor="rgba(255, 255, 255, 0.7)"
        />
      </View>
      <GlassContainer
        style={styles.actions}
        spacing={12}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <InvitesHeaderIcon symbol="plus" />
        <InvitesHeaderAvatar />
      </GlassContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  titleLabel: {
    color: "#ffffff",
    fontFamily: INVITES_FONT_FAMILY,

    fontSize: 37,
    lineHeight: 38,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
});

const InvitesHeader = registerComponent("InvitesHeader", InvitesHeaderBase);

export { InvitesHeader };
