"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  sceneId: string;
  stageTitle: string;
  imageCaption: string;
  history: string;
  location: string;
  date: string;
  onClose: () => void;
};

const HISTORY_IMAGE_EXTENSIONS = ["png", "jpg", "webp", "avif"] as const;

export default function HistoryModal({
  sceneId,
  stageTitle,
  imageCaption,
  history,
  location,
  date,
  onClose,
}: Props) {
  const imageCandidates = HISTORY_IMAGE_EXTENSIONS.map(
    (ext) => `/history/${sceneId}.${ext}`,
  );
  const [imageIndex, setImageIndex] = useState(0);

  const imageSrc = imageCandidates[imageIndex];
  const imageReady = imageSrc !== undefined;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <button
        type="button"
        aria-label="역사 모달 닫기"
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.75)" }}
        onClick={onClose}
      />
      <div
        className="border-2 border-game-border-bright bg-game-panel p-4 md:p-7 max-w-4xl w-full mx-4 relative z-10 max-h-[86vh] overflow-y-auto"
        style={{
          boxShadow: "0 0 0 2px #2c3f12, 0 0 0 4px #0b1208, 0 0 0 6px #1a2a0c",
        }}
      >
        <div className="border-b border-game-border pb-4 mb-5">
          <div
            className="text-[12px] text-game-border-bright mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            ▣ 실제 역사적 사실
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span
              className="text-[13px] text-game-text"
              style={{ fontFamily: "monospace" }}
            >
              {date}
            </span>
            <span
              className="text-[13px] text-game-text-dim"
              style={{ fontFamily: "monospace" }}
            >
              · {location}
            </span>
          </div>
          <p
            className="text-[12px] text-[#6a8a30] mt-2"
            style={{ fontFamily: "monospace" }}
          >
            {stageTitle}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] mb-6">
          <div className="border border-[#1e2e0e] bg-[#090d06] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1e2e0e]">
              <div
                className="text-[10px] text-game-border-bright"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                관련 이미지
              </div>
            </div>
            <div className="relative aspect-16/10 bg-game-bg">
              {imageReady ? (
                <Image
                  src={imageSrc}
                  alt={`${stageTitle} 관련 역사 자료`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  onError={() => {
                    setImageIndex((prev) => prev + 1);
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <div>
                    <p
                      className="text-[13px] text-[#7f9440] mb-2"
                      style={{ fontFamily: "monospace" }}
                    >
                      이 씬의 역사 이미지를 준비 중입니다.
                    </p>
                    <p
                      className="text-[11px] text-[#4a6a20]"
                      style={{ fontFamily: "monospace" }}
                    >
                      `public/history/{sceneId}.png`
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-[#1e2e0e] px-4 py-3">
              <div
                className="text-[10px] text-game-border-bright mb-1"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                이미지 설명
              </div>
              <p
                className="text-[12px] text-[#7f9440] leading-relaxed"
                style={{ fontFamily: "monospace" }}
              >
                {imageCaption ||
                  "여기에 이 이미지가 무엇을 보여주는지 짧게 적으면 됩니다."}
              </p>
            </div>
          </div>

          <div className="border border-[#1e2e0e] bg-[#090d06] p-3 md:p-5">
            <div
              className="text-[10px] text-game-border-bright mb-3"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              사실 설명
            </div>
            <p
              className="text-[14px] text-[#9ab048] leading-loose"
              style={{ fontFamily: "monospace" }}
            >
              {history}
            </p>
          </div>
        </div>

        <div className="mb-5">
          <p
            className="text-[12px] text-game-text-muted"
            style={{ fontFamily: "monospace" }}
          >
            참고: 5·18기념재단 / 국가기록원 / 5·18민주화운동기록관
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full border border-game-border-bright bg-[#0d1608] hover:bg-[#162010] py-3 transition-colors cursor-pointer"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          <span className="text-[12px] text-game-text">[ 닫기 ]</span>
        </button>
      </div>
    </div>
  );
}
