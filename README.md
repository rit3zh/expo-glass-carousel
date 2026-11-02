# expo-glass-carousel

Liquid glass carousel for React Native, with cards that bend through glass as you swipe.

https://github.com/user-attachments/assets/c5f732b8-3f3a-4367-8ab5-35e3e023ca48

---

## ⚙️ Installation

```bash
git clone https://github.com/rit3zh/expo-glass-carousel
cd expo-glass-carousel
bun install
bun start -c
```

Peer dependencies (already set up in this template):

```bash
bunx expo install @shopify/react-native-skia react-native-reanimated react-native-worklets react-native-gesture-handler expo-image
```

The component lives in [`src/components/glass-carousel`](src/components/glass-carousel). The demo invites screen is in [`src/components/ui/invites-screen`](src/components/ui/invites-screen).

---

## 🚀 Usage

Put a `GlassCarousel.Item` inside `GlassCarousel.Root` for each card. The carousel snapshots each item's content into a Skia image, then draws the cards through the glass lens shader.

```tsx
import { GlassCarousel } from "@/components/glass-carousel";

export function Gallery({ cards }: { cards: { id: string; title: string }[] }) {
  return (
    <GlassCarousel.Root onIndexChange={(index) => console.log(index)}>
      {cards.map((card) => (
        <GlassCarousel.Item key={card.id} label={card.title}>
          <Card {...card} />
        </GlassCarousel.Item>
      ))}
    </GlassCarousel.Root>
  );
}
```

Children that aren't `GlassCarousel.Item` are drawn above the carousel as overlays. This is the place for headers, buttons or a status bar:

```tsx
<GlassCarousel.Root background={<Backdrop />}>
  {items}
  <Header />
</GlassCarousel.Root>
```

If an item loads remote images, wait until they're ready before it's captured. You can also pass a `backdrop`, which is blurred in toward the bottom of the card, under the content:

```tsx
<GlassCarousel.Item
  label={invite.title}
  ready={loaded.has(invite.id)}
  backdrop={<InviteCardBackdrop invite={invite} onLoad={markLoaded} />}
>
  <InviteCard invite={invite} />
</GlassCarousel.Item>
```

Drag or flick to scroll. Tap a side card to snap to it, tap the center card to focus it, and tap again to close. VoiceOver/TalkBack can use next, previous, focus and close actions, and reduce motion is respected.

---

## 🧩 API

### `<GlassCarousel.Root>`

| Prop                 | Type                         | Default                   | Description                                |
| -------------------- | ---------------------------- | ------------------------- | ------------------------------------------ |
| `children`           | `ReactNode`                  | none                      | `GlassCarousel.Item`s, plus any overlays.  |
| `defaultIndex`       | `number`                     | `0`                       | Item the carousel starts on.               |
| `cardHeight`         | `number`                     | `450`                     | Card height (px).                          |
| `aspect`             | `number`                     | `3 / 4`                   | Card width ÷ height.                       |
| `gap`                | `number`                     | `12`                      | Space between cards (px).                  |
| `radius`             | `number`                     | `10`                      | Card corner radius (px).                   |
| `background`         | `ReactNode`                  | none                      | Rendered behind the cards.                 |
| `accessibilityLabel` | `string`                     | `"Liquid glass carousel"` | Label for the carousel.                    |
| `onIndexChange`      | `(index: number) => void`    | none                      | Called when the centered item changes.     |
| `onFocusChange`      | `(focused: boolean) => void` | none                      | Called when an item opens or closes focus. |
| `style`              | `StyleProp<ViewStyle>`       | none                      | Style for the container.                   |

### `<GlassCarousel.Item>`

| Prop         | Type               | Default      | Description                                                    |
| ------------ | ------------------ | ------------ | -------------------------------------------------------------- |
| `children`   | `ReactNode`        | none         | Card content. It is snapshotted, so it should be static.       |
| `label`      | `string`           | `"Item {n}"` | Accessibility label read for this card.                        |
| `ready`      | `boolean`          | `true`       | Hold the snapshot until content (e.g. images) has loaded.      |
| `captureKey` | `string \| number` | none         | Change it to capture the card again after its content changes. |
| `backdrop`   | `ReactNode`        | none         | Layer behind the content, blurred toward the bottom.           |

### `useGlassCarousel()`

Reads the carousel state from any component inside `GlassCarousel.Root`. It returns `index`, `focused`, `itemCount`, `reducedMotion`, and the `next()`, `previous()`, `open()` and `close()` controls. Overlays use it to build custom buttons.

### Config

Defaults live in [`glass-carousel.const.ts`](src/constants/components/glass-carousel.const.ts): card size, lens shape and dispersion, backdrop blur, focus timing, scroll physics (friction, spring stiffness, flick velocity) and the SkSL shaders.

---

## 🧱 Stack

[Expo SDK 58](https://expo.dev/changelog) · [React Native 0.88](https://reactnative.dev/) · [React Native Skia](https://shopify.github.io/react-native-skia/) · [Reanimated 4](https://docs.swmansion.com/react-native-reanimated/) · [Worklets](https://docs.swmansion.com/react-native-worklets/) · [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) · [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/) · [@expo/ui](https://docs.expo.dev/versions/latest/sdk/ui/) · [Expo Router](https://docs.expo.dev/router/introduction/)

---
