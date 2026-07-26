import React from "react";
import { Composition, Still } from "remotion";
import { SilkFlow } from "./SilkFlow";
import { ProductReveal } from "./ProductReveal";
import { LookStill } from "./LookStill";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="silk-flow"
        component={SilkFlow}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still id="silk-poster" component={SilkFlow} width={1920} height={1080} />
      <Composition
        id="product-reveal"
        component={ProductReveal}
        durationInFrames={96}
        fps={30}
        width={1280}
        height={720}
      />
      <Still id="look-01" component={LookStill} width={1200} height={1500} defaultProps={{ variant: 1 }} />
      <Still id="look-02" component={LookStill} width={1200} height={1500} defaultProps={{ variant: 2 }} />
      <Still id="look-03" component={LookStill} width={1200} height={1500} defaultProps={{ variant: 3 }} />
      <Still id="look-04" component={LookStill} width={1200} height={1500} defaultProps={{ variant: 4 }} />
    </>
  );
};
