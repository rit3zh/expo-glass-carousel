import {
  type PanGestureActiveEvent,
  type TapGesture,
  type TapGestureEvent,
  useCompetingGestures,
  usePanGesture,
  useTapGesture,
} from "react-native-gesture-handler";

import type { TGlassCarouselGesturesInput } from "../interface";
import {
  beginDrag,
  endDrag,
  releaseDrag,
  updateDrag,
} from "../utils/drag.util";
import { handleTap } from "../utils/handle-tap.util";

const useCarouselGestures = ({
  engine,
  metrics,
  notifyFocus,
}: TGlassCarouselGesturesInput) => {
  const pan = usePanGesture({
    activeOffsetX: [-6, 6],
    onBegin: (): void => {
      beginDrag(engine);
    },
    onUpdate: (event: PanGestureActiveEvent) => {
      updateDrag(engine, event.changeX, metrics.slot);
    },
    onDeactivate: (event: PanGestureActiveEvent) => {
      releaseDrag(engine, event.velocityX, metrics.slot);
    },
    onFinalize: () => {
      endDrag(engine);
    },
  });

  const tap: TapGesture = useTapGesture({
    onActivate: (event: TapGestureEvent) => {
      handleTap(engine, metrics, event.x, event.y, notifyFocus);
    },
  });

  return useCompetingGestures(pan, tap);
};

export { useCarouselGestures };
