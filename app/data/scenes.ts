import type { Scene } from "../types";

export const scenes: Scene[] = [
  {
    id: "start",
    stageNum: 1,
    stageTitle: "시작",
    date: "1980.05.18",
    location: "광주역 앞 거리",
    objective: "전남대학교 쪽으로 이동해 학생들의 상황을 확인하자.",
    sceneType: "street",
    text: "아침부터 거리가 이상하게 조용하다. 학교 근처에는 군인들이 서 있고, 사람들은 서로 눈치를 보며 걷고 있다.",
    dialogue: [
      { name: "나", line: "오늘은 왠지 밖이 다르다.", avatar: "player" },
      {
        name: "군인",
        line: "전남대 방향 접근 금지. 모두 해산하라.",
        avatar: "soldier",
      },
      { name: "나", line: "그냥 지나칠 일이 아닌 것 같아.", avatar: "player" },
    ],
    history:
      "5월 18일, 광주에서는 비상계엄 확대에 반대하는 학생들의 움직임이 시작되었고, 이후 시민들의 참여로 확대되었다.",
    choices: [
      {
        text: "전남대 쪽으로 가본다",
        nextSceneId: "university_gate",
        stat: "courage",
        statDelta: 1,
      },
      {
        text: "가족에게 먼저 상황을 알린다",
        nextSceneId: "call_family",
        stat: "safety",
        statDelta: 1,
      },
      {
        text: "주변을 더 살펴본다",
        nextSceneId: "observe_street",
        stat: "record",
        statDelta: 1,
      },
    ],
  },
  {
    id: "observe_street",
    stageNum: 2,
    stageTitle: "거리 관찰",
    date: "1980.05.18",
    location: "광주역 앞 거리",
    objective: "상황을 파악하고 어떻게 행동할지 결정하자.",
    sceneType: "street",
    text: "거리 한쪽에는 계엄군이 도열해 있다. 시민들은 멀리서 그 광경을 지켜보며 수군거린다. 학교 쪽에서 구호 소리가 들려온다.",
    dialogue: [
      {
        name: "시민",
        line: "저쪽 학교 앞에 학생들이 엄청 모였대.",
        avatar: "citizen",
      },
      { name: "나", line: "군인들이 왜 저렇게 많지.", avatar: "player" },
      {
        name: "시민",
        line: "비상계엄이 전국으로 확대됐다고 해.",
        avatar: "citizen",
      },
    ],
    history:
      "1980년 5월 17일 자정, 신군부는 비상계엄을 전국으로 확대했다. 모든 정치활동이 금지되었고, 대학에는 계엄군이 진주했다.",
    choices: [
      {
        text: "전남대 쪽으로 간다",
        nextSceneId: "university_gate",
        stat: "courage",
        statDelta: 1,
      },
      {
        text: "집에 들어가 라디오를 듣는다",
        nextSceneId: "radio_room",
        stat: "safety",
        statDelta: 1,
      },
    ],
  },
  {
    id: "university_gate",
    stageNum: 3,
    stageTitle: "전남대 앞",
    date: "1980.05.18",
    location: "전남대학교 정문 앞",
    objective: "전남대학교 앞의 상황을 파악하자.",
    sceneType: "university",
    text: "전남대학교 정문 앞에는 들어가지 못한 학생들이 모여 있다. 누군가는 구호를 외치고, 누군가는 주변 사람들에게 상황을 설명하고 있다.",
    dialogue: [
      {
        name: "학생",
        line: "우리는 그냥 학교에 가려고 했을 뿐이야.",
        avatar: "student",
      },
      {
        name: "시민",
        line: "무슨 일이 벌어지는지 제대로 알려야 해.",
        avatar: "citizen",
      },
      { name: "나", line: "이건 기록해 둬야 할 것 같아.", avatar: "player" },
    ],
    history:
      "5월 18일 전남대학교 정문 앞에서 학생들의 항의가 시작되었다. 계엄군의 곤봉 진압으로 학생들이 부상을 입었고, 시위는 시내로 확산되었다.",
    choices: [
      {
        text: "현장을 기록한다",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "시내로 이동하는 사람들을 따라간다",
        nextSceneId: "downtown",
        stat: "courage",
        statDelta: 1,
      },
      {
        text: "학생들에게 다가가 정보를 얻는다",
        nextSceneId: "talk_students",
        stat: "trust",
        statDelta: 1,
      },
    ],
  },
  {
    id: "talk_students",
    stageNum: 4,
    stageTitle: "학생들의 이야기",
    date: "1980.05.18",
    location: "전남대학교 정문 앞",
    objective: "학생들의 상황을 파악하고 결정하자.",
    sceneType: "university",
    text: "학생들이 삼삼오오 모여 이야기를 나누고 있다. 걱정스러운 표정이지만 눈빛에는 결연함이 담겨 있다.",
    dialogue: [
      {
        name: "학생",
        line: "계속 이렇게 있을 수는 없어. 도서관 쪽으로 모이자.",
        avatar: "student",
      },
      {
        name: "청년",
        line: "아무도 돕지 않으면 누가 이 상황을 알겠어. 나가자.",
        avatar: "youth",
      },
      {
        name: "나",
        line: "일단 상황을 더 살펴보고 다음을 생각하자.",
        avatar: "player",
      },
    ],
    history:
      "5월 18일 학생들은 도서관과 교정에 모여 대책을 논의하다 시내로 진출하기 시작했다.",
    choices: [
      {
        text: "학생들과 함께 시내로 나간다",
        nextSceneId: "downtown",
        stat: "courage",
        statDelta: 1,
      },
      {
        text: "현장을 기록한다",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
      },
    ],
  },
  {
    id: "call_family",
    stageNum: 2,
    stageTitle: "가족에게 연락",
    date: "1980.05.18",
    location: "집 근처 공중전화",
    objective: "가족의 안전을 확인하고 상황을 알리자.",
    sceneType: "street",
    text: "공중전화 너머로 어머니의 목소리가 떨린다. 밖에 오래 있지 말라고 하시지만, 거리의 분위기가 심상치 않다.",
    dialogue: [
      { name: "어머니", line: "괜히 나가지 말고 집에 있어.", avatar: "mother" },
      { name: "나", line: "잠깐만 상황 보고 올게. 걱정 마.", avatar: "player" },
      { name: "어머니", line: "제발 다치지 마라.", avatar: "mother" },
    ],
    history:
      "당시 광주의 상황은 빠르게 퍼졌고, 시민들은 가족과 이웃에게 소식을 전하며 서로의 안전을 확인했다.",
    choices: [
      {
        text: "집으로 돌아가 라디오를 듣는다",
        nextSceneId: "radio_room",
        stat: "safety",
        statDelta: 1,
      },
      {
        text: "다시 거리로 나간다",
        nextSceneId: "downtown",
        stat: "courage",
        statDelta: 1,
      },
    ],
  },
  {
    id: "record_scene",
    stageNum: 5,
    stageTitle: "기록하다",
    date: "1980.05.19",
    location: "광주 시내",
    objective: "보이는 것들을 기록으로 남겨라.",
    sceneType: "street",
    text: "나는 수첩을 꺼내 보이는 것들을 적기 시작했다. 누가, 어디서, 무엇을 외쳤는지. 이 기록이 언젠가 필요할 것 같았다.",
    dialogue: [
      { name: "시민", line: "이건 기록으로 남겨야 해.", avatar: "citizen" },
      { name: "나", line: "누군가는 기억해야 하니까.", avatar: "player" },
    ],
    history:
      "5·18민주화운동의 기록들은 훗날 진상 규명과 기억의 근거가 되었다. 관련 기록 일부는 유네스코 세계기록유산으로 등재되었다.",
    choices: [
      {
        text: "사람들의 말을 더 기록한다",
        nextSceneId: "citizen_voice",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "부상자를 돕는 사람들에게 간다",
        nextSceneId: "help_people",
        stat: "trust",
        statDelta: 1,
      },
    ],
  },
  {
    id: "downtown",
    stageNum: 6,
    stageTitle: "금남로",
    date: "1980.05.20",
    location: "금남로",
    objective: "도청 앞으로 이동해 시민들의 목소리를 들어라.",
    sceneType: "downtown",
    text: "금남로에는 더 많은 시민들이 모여 있다. 서로 모르는 사람들이지만, 모두 같은 표정이다. 두려움과 분노, 그리고 물러서지 않겠다는 마음.",
    dialogue: [
      {
        name: "시민 A",
        line: "우리가 침묵하면 아무도 이 일을 모를 거야.",
        avatar: "citizen",
      },
      {
        name: "시민 B",
        line: "그래도 서로 다치지 않게 조심합시다.",
        avatar: "citizen",
      },
    ],
    history:
      "5월 20일 전후로 광주 시내의 시민 참여가 커졌고, 항쟁은 학생 중심에서 시민 전체의 움직임으로 확대되었다.",
    choices: [
      {
        text: "행렬에 함께 구호를 외친다",
        nextSceneId: "citizen_voice",
        stat: "courage",
        statDelta: 1,
      },
      {
        text: "다친 사람을 돕는다",
        nextSceneId: "help_people",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "현장을 기록한다",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
      },
    ],
  },
  {
    id: "radio_room",
    stageNum: 5,
    stageTitle: "라디오를 듣는 집",
    date: "1980.05.20",
    location: "집",
    objective: "라디오를 통해 상황을 파악하고 행동을 결정하자.",
    sceneType: "home",
    text: "라디오에서는 거리에서 본 것과 다른 말들이 흘러나온다. 나는 방금 본 사람들의 얼굴을 떠올린다.",
    dialogue: [
      {
        name: "동생",
        line: "밖에서는 정말 그런 일이 있었어?",
        avatar: "youth",
      },
      {
        name: "나",
        line: "응. 그런데 제대로 전해지지 않는 것 같아.",
        avatar: "player",
      },
    ],
    history:
      "당시 일부 언론 보도는 실제 현장의 분위기와 다르게 전달되거나 제한되었다는 비판을 받았다. 그래서 시민들의 기록과 증언은 중요한 의미를 가진다.",
    choices: [
      {
        text: "내가 본 일을 종이에 적는다",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "이웃에게 상황을 설명한다",
        nextSceneId: "citizen_voice",
        stat: "trust",
        statDelta: 1,
      },
    ],
  },
  {
    id: "citizen_voice",
    stageNum: 7,
    stageTitle: "도청 앞",
    date: "1980.05.21",
    location: "전남도청 앞",
    objective: "시민들의 목소리를 듣고 함께 결정하자.",
    sceneType: "plaza",
    text: "도청 앞 광장에는 시민들이 모여 서로의 이야기를 듣고 있다. 누군가는 마이크를 잡고, 누군가는 조용히 고개를 끄덕인다.",
    dialogue: [
      {
        name: "청년",
        line: "우리가 원하는 건 특별한 게 아닙니다. 사람답게 사는 세상입니다.",
        avatar: "youth",
      },
      {
        name: "노인",
        line: "젊은 사람들만의 일이 아니야. 이건 우리 모두의 일이야.",
        avatar: "elder",
      },
      { name: "나", line: "이 목소리는 꼭 남겨야 해.", avatar: "player" },
    ],
    history:
      "5·18민주화운동은 계엄령 철폐와 민주주의 회복을 요구한 시민들의 항쟁이었다.",
    choices: [
      {
        text: "시민들의 발언을 기록한다",
        nextSceneId: "community",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "현장에서 필요한 일을 돕는다",
        nextSceneId: "help_people",
        stat: "trust",
        statDelta: 1,
      },
    ],
  },
  {
    id: "help_people",
    stageNum: 8,
    stageTitle: "시민을 돕다",
    date: "1980.05.21",
    location: "광주 시내",
    objective: "서로를 돕고 공동체를 지켜라.",
    sceneType: "square",
    text: "사람들은 물을 나르고, 길을 안내하고, 서로의 안부를 확인한다. 누군가 앞장서지 않아도 모두가 해야 할 일을 찾고 있다.",
    dialogue: [
      {
        name: "시민",
        line: "저쪽에 도움이 필요한 사람이 있어요.",
        avatar: "citizen",
      },
      { name: "나", line: "제가 물이랑 수건을 가져올게요.", avatar: "player" },
    ],
    history:
      "항쟁 기간 동안 광주 시민들은 서로를 돕고 질서를 유지하려 노력했다. 5월 22일부터 26일까지는 시민들이 자율적으로 공동체를 유지한 시기로 평가된다.",
    choices: [
      {
        text: "공동체 활동에 참여한다",
        nextSceneId: "community",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "외부에 상황을 알릴 방법을 찾는다",
        nextSceneId: "outside_message",
        stat: "record",
        statDelta: 1,
      },
    ],
  },
  {
    id: "community",
    stageNum: 9,
    stageTitle: "공동체의 밤",
    date: "1980.05.22",
    location: "광주",
    objective: "공동체를 유지하고 다음 행동을 결정하자.",
    sceneType: "square",
    text: "도시는 불안했지만 무너지지 않았다. 사람들은 음식을 나누고, 소식을 전하고, 서로를 지켰다.",
    dialogue: [
      {
        name: "상인",
        line: "돈은 됐어요. 필요한 사람에게 먼저 주세요.",
        avatar: "merchant",
      },
      {
        name: "학생",
        line: "우리가 질서를 지켜야 해요. 그래야 진심이 전해져요.",
        avatar: "student",
      },
      { name: "나", line: "이게 우리가 버티는 방법이구나.", avatar: "player" },
    ],
    history:
      "5월 22일부터 26일까지 광주는 시민들이 자율적으로 질서를 유지한 공동체적 시기로 기억된다.",
    choices: [
      {
        text: "마지막까지 도청에 남는다",
        nextSceneId: "last_night",
        stat: "courage",
        statDelta: 1,
      },
      {
        text: "기록을 정리해 남긴다",
        nextSceneId: "archive_ending",
        stat: "record",
        statDelta: 1,
      },
    ],
  },
  {
    id: "outside_message",
    stageNum: 9,
    stageTitle: "외부에 알리다",
    date: "1980.05.23",
    location: "광주 외곽",
    objective: "사실을 그대로 세상에 알려라.",
    sceneType: "corridor",
    text: "광주 밖으로 소식을 전하는 일은 쉽지 않다. 하지만 이곳에서 벌어진 일을 아무도 모르게 둘 수는 없다.",
    dialogue: [
      {
        name: "친구",
        line: "정확하게 써야 해. 과장도, 왜곡도 없어야 해.",
        avatar: "friend",
      },
      {
        name: "나",
        line: "응. 우리가 본 것만, 사실대로 남기자.",
        avatar: "player",
      },
    ],
    history:
      "5·18민주화운동의 진실은 시민들의 증언, 사진, 문서, 국내외 기록을 통해 이후 계속 밝혀졌다.",
    choices: [
      {
        text: "증언을 모아 기록한다",
        nextSceneId: "archive_ending",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "다시 도청으로 향한다",
        nextSceneId: "last_night",
        stat: "courage",
        statDelta: 1,
      },
    ],
  },
  {
    id: "last_night",
    stageNum: 11,
    stageTitle: "도청의 새벽",
    date: "1980.05.27",
    location: "전남도청",
    objective: "이 밤을 기억하라.",
    sceneType: "plaza",
    text: "새벽 공기가 무겁다. 모두가 알고 있다. 이 밤이 쉽게 지나가지 않을 것이라는 걸. 그래도 몇몇 사람들은 남기로 한다.",
    dialogue: [
      {
        name: "시민",
        line: "우리가 여기 있었다는 걸 누군가는 기억해 주겠지.",
        avatar: "citizen",
      },
      { name: "나", line: "기억할게요. 그리고 전할게요.", avatar: "player" },
    ],
    history:
      "5월 27일 새벽, 전남도청 진압으로 항쟁은 막을 내렸다. 5·18민주화운동은 이후 한국 민주주의 역사에서 중요한 사건으로 남았다.",
    choices: [{ text: "엔딩 보기", nextSceneId: "memory_ending" }],
  },
  {
    id: "archive_ending",
    stageNum: 12,
    stageTitle: "기록을 남기다",
    date: "이후",
    location: "기록",
    objective: "",
    sceneType: "ending",
    text: "나는 그날의 말과 표정, 거리의 장면을 기록으로 남겼다. 기록은 시간이 지나도 사라지지 않는 증언이 되었다.",
    dialogue: [
      {
        name: "나",
        line: "기억은 저절로 남지 않는다. 누군가 남겨야 한다.",
        avatar: "player",
      },
    ],
    history:
      "5·18 관련 기록은 국가기록원, 5·18민주화운동기록관 등에서 보존되고 있으며, 왜곡을 막기 위한 중요한 근거가 된다.",
    isEnding: true,
    choices: [{ text: "처음으로 돌아가기", nextSceneId: "start" }],
  },
  {
    id: "memory_ending",
    stageNum: 12,
    stageTitle: "기억의 끝",
    date: "현재",
    location: "우리",
    objective: "",
    sceneType: "ending",
    text: "그날의 선택은 과거에만 머물지 않는다. 오늘 우리가 무엇을 기억하고, 무엇을 외면하지 않을지 묻고 있다.",
    dialogue: [
      {
        name: "나",
        line: "5·18은 기억해야 할 역사이고, 왜곡되어서는 안 되는 사실이다.",
        avatar: "player",
      },
    ],
    history:
      "5·18민주화운동은 민주, 인권, 평화의 가치를 상징하는 역사적 사건으로 평가된다.",
    isEnding: true,
    choices: [{ text: "다시 처음부터", nextSceneId: "start" }],
  },
];

export const mapNodes = [
  {
    id: "start",
    label: "광주역",
    x: 30,
    y: 70,
    connections: ["university_gate", "call_family", "observe_street"],
  },
  {
    id: "observe_street",
    label: "거리",
    x: 60,
    y: 50,
    connections: ["university_gate", "radio_room"],
  },
  {
    id: "university_gate",
    label: "전남대",
    x: 80,
    y: 30,
    connections: ["record_scene", "downtown", "talk_students"],
  },
  {
    id: "talk_students",
    label: "학생들",
    x: 110,
    y: 20,
    connections: ["downtown", "record_scene"],
  },
  {
    id: "call_family",
    label: "공중전화",
    x: 60,
    y: 95,
    connections: ["radio_room", "downtown"],
  },
  {
    id: "radio_room",
    label: "집",
    x: 90,
    y: 80,
    connections: ["record_scene", "citizen_voice"],
  },
  {
    id: "record_scene",
    label: "기록",
    x: 130,
    y: 45,
    connections: ["citizen_voice", "help_people"],
  },
  {
    id: "downtown",
    label: "금남로",
    x: 140,
    y: 65,
    connections: ["citizen_voice", "help_people", "record_scene"],
  },
  {
    id: "citizen_voice",
    label: "도청앞",
    x: 165,
    y: 40,
    connections: ["community", "help_people"],
  },
  {
    id: "help_people",
    label: "시내",
    x: 165,
    y: 75,
    connections: ["community", "outside_message"],
  },
  {
    id: "community",
    label: "공동체",
    x: 190,
    y: 55,
    connections: ["last_night", "archive_ending"],
  },
  {
    id: "outside_message",
    label: "외곽",
    x: 190,
    y: 85,
    connections: ["archive_ending", "last_night"],
  },
  {
    id: "last_night",
    label: "도청",
    x: 215,
    y: 45,
    connections: ["memory_ending"],
  },
  { id: "archive_ending", label: "기록관", x: 215, y: 75, connections: [] },
  { id: "memory_ending", label: "현재", x: 240, y: 60, connections: [] },
];

export const TOTAL_STAGES = 12;
