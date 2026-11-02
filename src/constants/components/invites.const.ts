import { Platform } from "react-native";

import type { TInvite } from "@/components/ui/invite-card/interface";

const INVITES: readonly TInvite[] = [
  {
    id: "sunrise-yoga",
    title: "Sunrise Yoga",
    date: "Sat, November 8, 7:00 AM",
    location: "Dolores Park, San Francisco",
    image:
      "https://i.pinimg.com/1200x/1b/5d/d6/1b5dd636c54dfe1c762e8b61a129bcda.jpg",
    tint: "#0b4a6a",
    hosting: true,
  },
  {
    id: "friends-night-out",
    title: "Friends Night Out",
    date: "Fri, November 14, 8:30 PM",
    location: "Williamsburg, Brooklyn",
    image:
      "https://i.pinimg.com/1200x/3b/d2/55/3bd2553f866e4f5eef6e51f56b7af68c.jpg",
    tint: "#7a3416",
    hosting: true,
  },
  {
    id: "mayas-birthday",
    title: "Maya’s Birthday",
    date: "Sun, November 23, 6:00 PM",
    location: "Silver Lake, Los Angeles",
    image:
      "https://i.pinimg.com/1200x/2b/0c/75/2b0c757b1dec6db469215aa0619a786b.jpg",
    tint: "#4b3428",
    hosting: false,
  },
];

const INVITES_FONT_FAMILY: string | undefined = Platform.select<
  string | undefined
>({
  ios: "ui-rounded",
  default: undefined,
});

const INVITES_CARD_ASPECT: number = 0.6;
const INVITES_CARD_HEIGHT: number = 680;
const INVITES_CARD_RADIUS: number = 36;
const INVITES_BACKGROUND_BLUR: number = 60;
const INVITES_BACKGROUND_DIM: string = "rgba(0, 0, 0, 0.3)";
const INVITES_HEADER_BUTTON_SIZE: number = 42;
const INVITES_HEADER_AVATAR_INSET: number = 3;
const INVITES_PROFILE_IMAGE: string =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvdh7-vAeIube0rUOWRp8EXrj7zrBfyXZIf7Y5szRO5_WXRpotmWmEa1o7&s=10";

export {
  INVITES,
  INVITES_BACKGROUND_BLUR,
  INVITES_BACKGROUND_DIM,
  INVITES_CARD_ASPECT,
  INVITES_CARD_HEIGHT,
  INVITES_CARD_RADIUS,
  INVITES_FONT_FAMILY,
  INVITES_HEADER_AVATAR_INSET,
  INVITES_HEADER_BUTTON_SIZE,
  INVITES_PROFILE_IMAGE,
};
