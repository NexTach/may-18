export type AchievementDef = {
  id: string;
  icon: string;
  title: string;
  description: string;
  hint: string;
};

export const achievementDefs: AchievementDef[] = [
  // ── 스탯 기반 ─────────────────────────────────────────────────────
  {
    id: "first_record",
    icon: "✎",
    title: "첫 기록",
    description: "기록 성향을 1 이상 쌓았다.",
    hint: "현장을 기록하거나 사실을 적어 두는 선택을 해 보자.",
  },
  {
    id: "deep_record",
    icon: "✦",
    title: "역사의 기록자",
    description: "기록 성향을 6 이상 쌓았다.",
    hint: "기록과 관련된 선택을 꾸준히 이어 가자.",
  },
  {
    id: "courageous_record",
    icon: "✜",
    title: "기록하는 용기",
    description: "기록 성향 3 이상, 용기 성향 3 이상을 동시에 달성했다.",
    hint: "현장을 직접 마주하면서도 기록을 멈추지 않는 선택을 해 보자.",
  },
  {
    id: "witness",
    icon: "◆",
    title: "목격한 사람",
    description: "용기 성향을 3 이상 쌓았다.",
    hint: "위험을 감수하고 현장 가까이 나아가는 선택을 해 보자.",
  },
  {
    id: "brave_soul",
    icon: "⚑",
    title: "두려움을 넘어",
    description: "용기 성향을 5 이상 쌓았다.",
    hint: "위험한 상황에서도 물러서지 않는 선택을 계속 해 보자.",
  },
  {
    id: "trusted_hands",
    icon: "☖",
    title: "서로의 손",
    description: "신뢰 성향을 3 이상 쌓았다.",
    hint: "사람을 돕고 연결하는 선택을 꾸준히 이어 가자.",
  },
  {
    id: "strong_trust",
    icon: "⬡",
    title: "신뢰의 뿌리",
    description: "신뢰 성향을 6 이상 쌓았다.",
    hint: "사람들 사이를 잇는 선택을 멈추지 말자.",
  },
  {
    id: "steady_steps",
    icon: "△",
    title: "신중한 발걸음",
    description: "안전 성향을 3 이상 쌓았다.",
    hint: "우회하고 살피며 움직이는 선택으로 버텨 보자.",
  },
  {
    id: "safe_keeper",
    icon: "◌",
    title: "살아남는 법",
    description: "안전 성향을 5 이상 쌓았다.",
    hint: "위험을 피하고 몸을 낮추는 선택을 꾸준히 이어 가자.",
  },
  {
    id: "balanced_eye",
    icon: "⊕",
    title: "균형 잡힌 눈",
    description: "용기, 기록, 신뢰, 안전 성향을 모두 2 이상 쌓았다.",
    hint: "한 가지 방향에만 치우치지 말고 다양한 선택을 해 보자.",
  },

  // ── 방문 기반 ─────────────────────────────────────────────────────
  {
    id: "many_paths",
    icon: "▦",
    title: "여러 갈래의 길",
    description: "12개 이상의 장소를 방문했다.",
    hint: "한쪽 분기만 따르지 말고 다양한 경로를 지나 보자.",
  },
  {
    id: "explorer",
    icon: "⬣",
    title: "길 위의 탐색자",
    description: "18개 이상의 장소를 방문했다.",
    hint: "거의 모든 갈림길을 걸어야 한다.",
  },
  {
    id: "at_the_gate",
    icon: "▷",
    title: "정문 앞에 서다",
    description: "전남대학교 정문 앞을 지나갔다.",
    hint: "대학교 방향의 분기를 선택해 보자.",
  },
  {
    id: "heard_radio",
    icon: "♫",
    title: "라디오 소리",
    description: "라디오를 통해 바깥 소식을 들었다.",
    hint: "집 안에 머물며 소식에 귀를 기울이는 선택을 해 보자.",
  },
  {
    id: "helper",
    icon: "✚",
    title: "곁에 선 사람",
    description: "다친 이들 곁에 머물렀다.",
    hint: "도움이 필요한 사람 쪽으로 발걸음을 옮겨 보자.",
  },
  {
    id: "messenger",
    icon: "↗",
    title: "밖으로 전하다",
    description: "광주 밖으로 소식을 전하러 나섰다.",
    hint: "외곽으로 나가 외부에 알리는 분기를 따라가 보자.",
  },
  {
    id: "last_witness",
    icon: "◐",
    title: "마지막 새벽",
    description: "도청의 새벽을 끝까지 지켜봤다.",
    hint: "마지막 밤을 남은 사람들과 함께 버텨 보자.",
  },

  // ── 엔딩 기반 ─────────────────────────────────────────────────────
  {
    id: "archivist",
    icon: "▣",
    title: "기록을 남긴 사람",
    description: "기록 엔딩에 도달했다.",
    hint: "사실을 남기고 전하는 흐름을 끝까지 따라가 보자.",
  },
  {
    id: "memory_keeper",
    icon: "★",
    title: "기억의 자리",
    description: "기억 엔딩에 도달했다.",
    hint: "끝까지 현장을 지켜보고 마지막 새벽을 마주해 보자.",
  },
];
