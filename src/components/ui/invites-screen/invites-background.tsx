import {
  type IGlassCarouselContext,
  useGlassCarousel,
} from "@/components/glass-carousel";
import type { TInvite } from "@/components/ui/invite-card/interface";
import { INVITES_BACKGROUND_DIM } from "@/constants/components/invites.const";
import { registerComponent } from "@/utils/register-component.util";
import type { FC } from "react";
import { StyleSheet, View } from "react-native";
import type { IInvitesBackground } from "./interface";
import { InvitesBackgroundLayer } from "./invites-background-layer";
const InvitesBackgroundBase: FC<IInvitesBackground> = ({
  invites,
}: IInvitesBackground &
  React.ComponentProps<typeof InvitesBackgroundBase>): React.ReactNode &
  React.JSX.Element => {
  const { engine }: IGlassCarouselContext = useGlassCarousel();

  return (
    <View
      style={[StyleSheet.absoluteFill, styles.background]}
      pointerEvents="none"
    >
      {invites.map(
        (invite: TInvite, position: number): React.JSX.Element => (
          <InvitesBackgroundLayer
            key={invite.id}
            invite={invite}
            position={position}
            count={invites.length}
            scroll={engine.scroll}
          />
        ),
      )}
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: INVITES_BACKGROUND_DIM },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    overflow: "hidden",
    backgroundColor: "#000000",
  },
});

const InvitesBackground = registerComponent(
  "InvitesBackground",
  InvitesBackgroundBase,
);

export { InvitesBackground };
