import { GlassCarousel } from "@/components/glass-carousel";
import {
  InviteCard,
  InviteCardBackdrop,
  type TInvite,
} from "@/components/ui/invite-card";
import {
  INVITES,
  INVITES_CARD_ASPECT,
  INVITES_CARD_HEIGHT,
  INVITES_CARD_RADIUS,
  INVITES_PROFILE_IMAGE,
} from "@/constants/components/invites.const";
import { registerComponent } from "@/utils/register-component.util";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { type FC, useEffect, useState } from "react";
import { InvitesBackground } from "./invites-background";
import { InvitesHeader } from "./invites-header";

const InvitesScreenBase: FC = (): React.ReactNode & React.JSX.Element => {
  const [loaded, setLoaded] = useState<ReadonlySet<string>>(new Set<string>());

  useEffect((): void => {
    Image.prefetch(
      [
        ...INVITES.map((invite: TInvite): string => invite.image),
        INVITES_PROFILE_IMAGE,
      ],
      "memory-disk",
    );
  }, []);

  const markLoaded = (id: string) =>
    setLoaded(
      (current: ReadonlySet<string>): ReadonlySet<string> =>
        current.has(id) ? current : new Set<string>(current).add(id),
    );

  return (
    <GlassCarousel.Root
      aspect={INVITES_CARD_ASPECT}
      cardHeight={INVITES_CARD_HEIGHT}
      radius={INVITES_CARD_RADIUS}
      accessibilityLabel="Upcoming invites"
      background={<InvitesBackground invites={INVITES} />}
    >
      <StatusBar style="auto" />
      {INVITES.map(
        (invite: TInvite): React.JSX.Element => (
          <GlassCarousel.Item
            key={invite.id}
            label={`${invite.title}, ${invite.date}, ${invite.location}${invite.hosting ? ", hosting" : ""}`}
            ready={loaded.has(invite.id)}
            backdrop={
              <InviteCardBackdrop invite={invite} onLoad={markLoaded} />
            }
          >
            <InviteCard invite={invite} />
          </GlassCarousel.Item>
        ),
      )}
      <InvitesHeader />
    </GlassCarousel.Root>
  );
};

const InvitesScreen = registerComponent("InvitesScreen", InvitesScreenBase);

export { InvitesScreen };
