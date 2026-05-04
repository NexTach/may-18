export type CollectibleDef = {
  id: string;
  icon: string;
  name: string;
  description: string;
};

export const collectibleDefs: CollectibleDef[] = [
  {
    id: "letter",
    icon: "✉",
    name: "어머니의 편지",
    description: "가족의 안부를 확인하러 가는 길에 손에 쥔, 짧고 절박한 글귀.",
  },
  {
    id: "radio_note",
    icon: "◻",
    name: "라디오 메모지",
    description: "방송과 현실이 다르다는 사실을 손으로 옮겨 적은 낡은 종이 조각.",
  },
  {
    id: "leaflet",
    icon: "◈",
    name: "항쟁 전단지",
    description: "직접 문장을 고르고 적어 만든, 누군가에게 전할 한 장의 종이.",
  },
  {
    id: "badge",
    icon: "◆",
    name: "학생 배지",
    description: "전남대 학생들이 나눠 준 작은 배지. 그 무게가 손에 남는다.",
  },
  {
    id: "notebook",
    icon: "◉",
    name: "기자 수첩",
    description: "현장에서 쉬지 않고 사실을 적어 내려간 수첩.",
  },
  {
    id: "bandage",
    icon: "✚",
    name: "붕대 묶음",
    description: "임시 돌봄터에서 함께 손을 보탰던 흔적.",
  },
  {
    id: "bulletin",
    icon: "↗",
    name: "외부 전달 쪽지",
    description: "광주 밖으로 증언을 전하기 위해 손으로 써서 건넨 쪽지.",
  },
  {
    id: "last_memo",
    icon: "◐",
    name: "도청의 메모",
    description: "5월 27일 새벽, 마지막으로 남긴 이름들의 기록.",
  },
];
