export type AchievementDef = {
  id: string;
  icon: string;
  title: string;
  description: string;
  hint: string;
};

export const achievementDefs: AchievementDef[] = [
  {
    id: "first_record",
    icon: "✎",
    title: "첫 기록",
    description: "기록 성향을 1 이상 쌓았다.",
    hint: "현장을 기록하거나 사실을 적어 두는 선택을 해 보자.",
  },
  {
    id: "trusted_hands",
    icon: "☖",
    title: "서로의 손",
    description: "신뢰 성향을 3 이상 쌓았다.",
    hint: "사람을 돕고 연결하는 선택을 꾸준히 이어 가자.",
  },
  {
    id: "steady_steps",
    icon: "△",
    title: "신중한 발걸음",
    description: "안전 성향을 3 이상 쌓았다.",
    hint: "우회하고 살피며 움직이는 선택으로 버텨 보자.",
  },
  {
    id: "witness",
    icon: "◆",
    title: "목격한 사람",
    description: "용기 성향을 3 이상 쌓았다.",
    hint: "위험을 감수하고 현장 가까이 나아가는 선택을 해 보자.",
  },
  {
    id: "many_paths",
    icon: "▦",
    title: "여러 갈래의 길",
    description: "12개 이상의 장소를 방문했다.",
    hint: "한쪽 분기만 따르지 말고 다양한 경로를 지나 보자.",
  },
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
