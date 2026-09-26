"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => <div className="scene-loading" aria-hidden="true" />,
});

export function SceneLayer() {
  return <Scene />;
}
