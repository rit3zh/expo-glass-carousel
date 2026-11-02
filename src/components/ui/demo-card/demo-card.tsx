import { DEMO_CARD_TEXT } from "@/constants/components/demo-card.const";
import { registerComponent } from "@/utils/register-component.util";
import type { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { IDemoCard } from "./interface";

const DemoCardBase: FC<IDemoCard> = ({
  index,
  title,
  caption,
  color,
}: IDemoCard & React.ComponentProps<typeof DemoCardBase>): React.ReactNode &
  React.JSX.Element => (
  <View style={[styles.card, { backgroundColor: color }]}>
    <Text style={styles.number}>{String(index + 1).padStart(2, "0")}</Text>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.caption}>{caption}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  number: {
    color: DEMO_CARD_TEXT,
    fontSize: 15,
    fontWeight: "500",
    fontVariant: ["tabular-nums"],
    opacity: 0.8,
  },
  title: {
    color: DEMO_CARD_TEXT,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "700",
    letterSpacing: -1.2,
  },
  caption: {
    color: DEMO_CARD_TEXT,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
    opacity: 0.8,
  },
});

const DemoCard = registerComponent("DemoCard", DemoCardBase);

export { DemoCard };
