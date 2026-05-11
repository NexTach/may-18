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

export default function HistoryModal({ sceneId, stageTitle, imageCaption, history, location, date, onClose }: Props) {
  const imageCandidates = HISTORY_IMAGE_EXTENSIONS.map((ext) => `/history/${sceneId}.${ext}`);
  const [imageIndex, setImageIndex] = useState(0);

  const imageSrc = imageCandidates[imageIndex];
  const imageReady = imageSrc !== undefined;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <button
        type="button"
        aria-label="역사 모달 닫기"
        className="absolute inset-0 bg-black/75"
        onClick={onClose}
      />
      <div
        className="border-2 border-game-border-bright bg-game-panel p-4 md:p-7 xl:p-8 max-w-4xl xl:max-w-5xl w-full mx-4 relative z-10 max-h-[85dvh] overflow-y-auto"
        style={{ boxShadow: "0 0 0 2px var(--color-game-border), 0 0 0 4px var(--color-game-panel), 0 0 0 6px #10251f" }}
      >
        <div className="border-b border-game-border pb-4 mb-5">
          <div className="text-[12px] xl:text-[13px] text-game-border-bright mb-2 font-pixel">▣ 실제 역사적 사실</div>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-[13px] xl:text-[14px] text-game-text font-mono">{date}</span>
            <span className="text-[13px] xl:text-[14px] text-game-text-dim font-mono">· {location}</span>
          </div>
          <p className="text-[12px] xl:text-[13px] text-[#6a8a30] mt-2 font-mono">{stageTitle}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] mb-6">
          <div className="border border-[#1e2e0e] bg-game-panel-dark overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1e2e0e]">
              <div className="text-[10px] xl:text-[11px] text-game-border-bright font-pixel">관련 이미지</div>
            </div>
            <div className="relative h-[160px] md:h-auto md:aspect-16/10 bg-game-bg">
              {imageReady ? (
                <Image
                  src={imageSrc}
                  alt={`${stageTitle} 관련 역사 자료`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  onError={() => setImageIndex((prev) => prev + 1)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <div>
                    <p className="text-[13px] text-[#7f9440] mb-2 font-mono">이 씬의 역사 이미지를 준비 중입니다.</p>
                    <p className="text-[11px] text-[#4a6a20] font-mono">`public/history/{sceneId}.png`</p>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-[#1e2e0e] px-4 py-3">
              <div className="text-[10px] xl:text-[11px] text-game-border-bright mb-1 font-pixel">이미지 설명</div>
              <p className="text-[12px] xl:text-[13px] text-[#7f9440] leading-relaxed font-mono">
                {imageCaption || "여기에 이 이미지가 무엇을 보여주는지 짧게 적으면 됩니다."}
              </p>
            </div>
          </div>

          <div className="border border-[#1e2e0e] bg-game-panel-dark p-3 md:p-5">
            <div className="text-[10px] xl:text-[11px] text-game-border-bright mb-3 font-pixel">사실 설명</div>
            <p className="text-[14px] xl:text-[15px] text-[#9ab048] leading-loose font-mono">{history}</p>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-[12px] text-game-text-muted font-mono">
            참고: 5·18기념재단 / 국가기록원 / 5·18민주화운동기록관
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full border border-game-border-bright bg-game-panel hover:bg-[#0f2420] py-3 transition-colors cursor-pointer font-pixel"
        >
          <span className="text-[12px] text-game-text">[ 닫기 ]</span>
        </button>
      </div>
    </div>
  );
}
