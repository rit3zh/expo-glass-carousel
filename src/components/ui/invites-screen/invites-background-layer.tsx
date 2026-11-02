import { INVITES_BACKGROUND_BLUR } from "@/constants/components/invites.const";
import { registerComponent } from "@/utils/register-component.util";
import { Image } from "expo-image";
import type { FC } from "react";
import { StyleSheet, type ViewStyle } from "react-native";
import Animated, {
  type AnimatedStyle,
  useAnimatedStyle,
} from "react-native-reanimated";
import type { IInvitesBackgroundLayer } from "./interface";
import { getBackgroundOpacity } from "./utils/get-background-opacity.util";

const InvitesBackgroundLayerBase: FC<IInvitesBackgroundLayer> = ({
  invite,
  position,
  count,
  scroll,
}: IInvitesBackgroundLayer &
  React.ComponentProps<typeof InvitesBackgroundLayerBase>): React.ReactNode &
  React.JSX.Element => {
  const fadeStyle: AnimatedStyle<ViewStyle> = useAnimatedStyle(() => ({
    opacity: getBackgroundOpacity(scroll.get(), position, count),
  }));

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: invite.tint },
        fadeStyle,
      ]}
    >
      <Image
        source={invite.image}
        style={styles.image}
        contentFit="cover"
        cachePolicy="memory-disk"
        blurRadius={INVITES_BACKGROUND_BLUR}
        transition={0}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFill,
    transform: [{ scale: 1.3 }],
  },
});

const InvitesBackgroundLayer = registerComponent(
  "InvitesBackgroundLayer",
  InvitesBackgroundLayerBase,
);

export { InvitesBackgroundLayer };
