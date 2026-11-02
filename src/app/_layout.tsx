import { Stack } from "expo-router";
import type { FC } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout: FC = (): React.ReactNode & React.JSX.Element => (
  <GestureHandlerRootView style={styles.root}>
    <Stack screenOptions={{ headerShown: false }} />
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default RootLayout;
