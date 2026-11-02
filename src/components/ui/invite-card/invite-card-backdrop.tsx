import { registerComponent } from "@/utils/register-component.util";
import { Image } from "expo-image";
import type { FC } from "react";
import { StyleSheet, View } from "react-native";
import type { IInviteCardBackdrop } from "./interface";

const InviteCardBackdropBase: FC<IInviteCardBackdrop> = ({
  invite,
  onLoad,
}: IInviteCardBackdrop &
  React.ComponentProps<typeof InviteCardBackdropBase>): React.ReactNode &
  React.JSX.Element => (
  <View style={[styles.backdrop, { backgroundColor: invite.tint }]}>
    <Image
      source={invite.image}
      style={StyleSheet.absoluteFill}
      contentFit="cover"
      cachePolicy="memory-disk"
      transition={0}
      onLoad={() => onLoad?.(invite.id)}
    />
  </View>
);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
});

const InviteCardBackdrop = registerComponent(
  "InviteCardBackdrop",
  InviteCardBackdropBase,
);

export { InviteCardBackdrop };
