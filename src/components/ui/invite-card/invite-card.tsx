import { INVITES_FONT_FAMILY } from "@/constants/components/invites.const";
import { hexToRgb } from "@/utils/hex-to-rgb.util";
import type { TRgb } from "@/utils/interface";
import { registerComponent } from "@/utils/register-component.util";
import type { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { IInviteCard } from "./interface";
import { InviteHostingBadge } from "./invite-hosting-badge";

const getTintGradient = <T extends string>(hex: T) => {
  const [r, g, b]: TRgb = hexToRgb(hex);
  const rgb: string = `${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}`;
  return `linear-gradient(to bottom, rgba(${rgb}, 0) 40%, rgba(${rgb}, 0.5) 64%, rgba(${rgb}, 0.92) 100%)`;
};

const InviteCardBase: FC<IInviteCard> = ({
  invite,
}: IInviteCard & React.ComponentProps<typeof InviteCardBase>): React.ReactNode &
  React.JSX.Element => (
  <View style={styles.card}>
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundImage: getTintGradient(invite.tint) },
      ]}
    />
    {invite.hosting ? <InviteHostingBadge /> : <View />}
    <View style={styles.details}>
      <Text style={styles.title} numberOfLines={2}>
        {invite.title}
      </Text>
      <Text style={styles.date} numberOfLines={1}>
        {invite.date}
      </Text>
      <Text style={styles.location} numberOfLines={1}>
        {invite.location}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  details: {
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 8,
    paddingBottom: 18,
  },
  title: {
    color: "#ffffff",
    fontFamily: INVITES_FONT_FAMILY,
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  date: {
    color: "rgba(255, 255, 255, 0.88)",
    fontFamily: INVITES_FONT_FAMILY,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  location: {
    color: "rgba(255, 255, 255, 0.72)",
    fontFamily: INVITES_FONT_FAMILY,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
    textAlign: "center",
  },
});

const InviteCard = registerComponent("InviteCard", InviteCardBase);

export { InviteCard };
