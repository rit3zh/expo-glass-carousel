import type { TInvite } from "@/components/ui/invite-card/interface";
import type { SFSymbol } from "expo-symbols";
import type { SharedValue } from "react-native-reanimated";

interface IInvitesBackground {
  invites: readonly TInvite[];
}

interface IInvitesBackgroundLayer {
  invite: TInvite;
  position: number;
  count: number;
  scroll: SharedValue<number>;
}

interface IInvitesHeaderIcon {
  symbol: SFSymbol;
}

export {
  type IInvitesBackground,
  type IInvitesBackgroundLayer,
  type IInvitesHeaderIcon,
};
