/** Shared font stacks for the film. */
export {
  FONT_SC as fontSc,
  FONT_SC as fontSansCN,
  FONT_SERIF_SC as fontSerifCN,
  FONT_DISPLAY as fontDisplay,
  FONT_MONO as fontMono,
} from "../theme";

/** True once the composition has been mounted; text renders after this. */
export const useFontReady = (_fps: number) => true;
