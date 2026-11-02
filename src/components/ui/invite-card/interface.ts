type TInvite = {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  tint: string;
  hosting: boolean;
};
interface IInviteCard {
  invite: TInvite;
}

interface IInviteCardBackdrop {
  invite: TInvite;
  onLoad?: (id: string) => void;
}

export { type IInviteCard, type IInviteCardBackdrop, type TInvite };
