"use client";

import { useEffect, useRef } from "react";

const TARGET_VOL = 0.45;
const FADE_MS = 1000;
const TICK_MS = 40;

function fade(
  audio: HTMLAudioElement,
  to: number,
  onDone?: () => void,
): ReturnType<typeof setInterval> {
  const steps = Math.round(FADE_MS / TICK_MS);
  const delta = (to - audio.volume) / steps;
  let n = 0;
  const id = setInterval(() => {
    n++;
    audio.volume = Math.min(1, Math.max(0, audio.volume + delta));
    if (n >= steps) {
      audio.volume = to;
      clearInterval(id);
      if (to === 0) audio.pause();
      onDone?.();
    }
  }, TICK_MS);
  return id;
}

type BgmState = {
  cur: HTMLAudioElement | null;
  out: HTMLAudioElement | null;
  src: string | null;
  tid: ReturnType<typeof setInterval> | null;
};

export function useBgm(src: string | null, enabled: boolean) {
  const s = useRef<BgmState>({ cur: null, out: null, src: null, tid: null });

  useEffect(() => {
    const st = s.current;

    if (st.tid != null) { clearInterval(st.tid); st.tid = null; }
    if (st.out) { st.out.pause(); st.out = null; }

    const playNew = (newSrc: string) => {
      const a = new Audio(newSrc);
      a.loop = true;
      a.volume = 0;
      st.cur = a;
      st.src = newSrc;
      void a.play().catch(() => {});
      st.tid = fade(a, TARGET_VOL, () => { st.tid = null; });
    };

    if (!enabled || !src) {
      if (st.cur && !st.cur.paused) {
        st.out = st.cur;
        st.cur = null;
        st.src = null;
        st.tid = fade(st.out, 0, () => { st.out = null; st.tid = null; });
      }
      return;
    }

    if (st.src === src && st.cur && !st.cur.paused) return;

    if (st.src === src && st.cur && st.cur.paused) {
      st.cur.volume = 0;
      void st.cur.play().catch(() => {});
      st.tid = fade(st.cur, TARGET_VOL, () => { st.tid = null; });
      return;
    }

    if (st.cur && !st.cur.paused) {
      const old = st.cur;
      st.out = old;
      st.cur = null;
      st.src = null;
      st.tid = fade(old, 0, () => { st.out = null; playNew(src); });
    } else {
      playNew(src);
    }
  }, [src, enabled]);

  useEffect(() => {
    const st = s.current;
    return () => {
      if (st.tid != null) clearInterval(st.tid);
      st.cur?.pause();
      st.out?.pause();
    };
  }, []);
}
