import type { Scene } from "../../types";

export const stage5Scenes: Scene[] = [
  {
    id: "checkpoint_edge",
    stageNum: 12,
    stageTitle: "외곽 검문",
    date: "1980.05.23-05.26",
    location: "지원동 길목",
    objective: "도시 바깥으로 사실을 전하기 전, 외곽 검문소의 긴장과 우회 가능성을 살핀다.",
    sceneType: "checkpoint_edge",
    text: "광주 외곽으로 향하는 길목에는 바리케이드와 군인의 그림자가 걸려 있다. 길은 열려 있는 듯하면서도 쉽게 지나갈 수 없고, 멀리 시내 쪽을 돌아보는 순간 다시 발걸음이 무거워진다. 이 길을 통과하는 일은 단순한 이동이 아니라 사실을 밖으로 내보내는 시도처럼 느껴진다.",
    situation:
      "밖으로 나가려면 용기만으로는 부족하다. 사람을 살피고 길을 고르고 때를 재는 신중함이 함께 필요하다는 사실이 이 검문소 앞에서 더 크게 다가온다.",
    dialogue: [
      { name: "친구", line: "큰길은 너무 눈에 띄어. 조금 더 살펴보자.", avatar: "friend" },
      { name: "나", line: "여기서 서두르면 오히려 아무것도 전하지 못할 수 있다.", avatar: "player" },
    ],
    history:
      "광주 밖으로 사실을 전하는 일은 쉽지 않았고, 시민들은 여러 방식으로 기록과 소식을 밖으로 연결하려 애썼다.",
    choices: [
      {
        text: "사람이 드문 길을 따라 더 나아간다",
        detail: "눈에 덜 띄는 쪽으로 움직이며 기록과 소식을 밖으로 전할 가능성을 계속 살핀다.",
        nextSceneId: "outside_message",
        stat: "safety",
        statDelta: 1,
      },
      {
        text: "우회로를 택해 더 조심스럽게 빠져나간다",
        detail: "한 번에 통과하려 하기보다, 더 안전한 우회로를 골라 상황을 밖으로 잇는다.",
        nextSceneId: "outside_message",
        stat: "safety",
        statDelta: 1,
        requirements: { safety: 2 },
      },
      {
        text: "다시 시내로 돌아가 공동체 쪽에 힘을 보탠다",
        detail: "당장 바깥으로 나가기보다, 다시 시민들 곁으로 돌아가 공동체를 지탱하는 쪽을 택한다.",
        nextSceneId: "community",
        stat: "trust",
        statDelta: 1,
      },
    ],
  },
  {
    id: "outside_message",
    stageNum: 13,
    stageTitle: "외부에 알리다",
    date: "1980.05.23-05.26",
    location: "지원동 외곽",
    objective: "광주 바깥으로 사실을 전할 방법을 끝까지 붙든다.",
    sceneType: "corridor",
    text: "광주 바깥으로 향하는 길은 생각보다 멀고 조심스럽다. 누구에게 무엇을 어떻게 전해야 할지 하나하나 가늠하게 된다. 그래도 이 도시 안에서 벌어진 일을 여기서 끊어 둘 수는 없다는 마음이 발걸음을 밀어낸다.",
    situation:
      "광주의 진실이 고립되지 않으려면 사실을 정확히 남기고 전하는 일이 필요하다. 지금은 기록과 전달 역시 끝까지 버티는 일의 한 방식처럼 느껴진다.",
    dialogue: [
      { name: "친구", line: "정확하게 남겨야 해. 그래야 나중에도 흔들리지 않아.", avatar: "friend" },
      { name: "나", line: "우리가 직접 본 것과 들은 것만 사실대로 적자.", avatar: "player" },
    ],
    history: "5·18민주화운동의 진실은 시민들의 증언과 사진, 문서, 국내외 기록을 통해 이후에도 계속 밝혀졌다.",
    choices: [
      {
        text: "증언을 모아 기록으로 남긴다",
        detail: "흩어진 목격담을 한데 모아, 이후에도 사실을 증명할 자료로 정리한다.",
        nextSceneId: "archive_ending",
        stat: "record",
        statDelta: 1,
        collectible: "bulletin",
      },
      {
        text: "도청 인근의 마지막 논의 자리로 돌아간다",
        detail: "광주 밖으로만 시선을 두지 않고, 남아 있는 사람들의 마지막 선택을 직접 지켜보러 돌아간다.",
        nextSceneId: "night_meeting",
        stat: "courage",
        statDelta: 1,
      },
    ],
  },
  {
    id: "community",
    stageNum: 12,
    stageTitle: "공동체의 밤",
    date: "1980.05.22-05.26",
    location: "금남로 일대",
    objective: "시민들이 함께 유지한 공동체의 시간을 끝까지 지켜본다.",
    sceneType: "square",
    text: "도시는 여전히 불안하지만 쉽게 무너지지 않는다. 사람들은 음식을 나누고, 늦게 도착한 사람에게 상황을 설명하고, 누구도 혼자 남지 않게 서로의 곁을 지킨다. 두려움 한가운데에서도 공동체가 스스로를 지탱하고 있는 모습이 보인다.",
    situation:
      "이 시기의 광주는 혼란만으로 설명할 수 없다. 시민들이 서로를 돌보고 스스로 질서를 세우며 버텨 내는 시간이 이 자리에서 또렷하게 드러난다.",
    dialogue: [
      { name: "상인", line: "값은 나중 일입니다. 필요한 사람에게 먼저 드리세요.", avatar: "merchant" },
      { name: "학생", line: "우리가 스스로 질서를 지켜야 지금의 뜻도 제대로 전해집니다.", avatar: "student" },
      { name: "나", line: "서로를 지키는 마음이 이 도시를 버티게 하고 있다.", avatar: "player" },
    ],
    history:
      "5월 22일부터 26일까지 광주는 시민들이 자율적으로 질서를 유지하고 공동체를 지켜 낸 시간으로 기억된다.",
    choices: [
      {
        text: "도청 인근의 마지막 회의로 간다",
        detail: "남을 사람과 기록을 맡을 사람이 어떤 말을 나누는지 끝까지 지켜보기 위해 자리를 옮긴다.",
        nextSceneId: "night_meeting",
        stat: "courage",
        statDelta: 1,
      },
      {
        text: "기록을 정리해 남긴다",
        detail: "지금까지 모은 말과 장면을 정리해, 이후에도 남을 기록으로 붙들어 둔다.",
        nextSceneId: "archive_ending",
        stat: "record",
        statDelta: 1,
      },
    ],
  },
  {
    id: "night_meeting",
    stageNum: 13,
    stageTitle: "밤의 논의",
    date: "1980.05.26",
    location: "광주 YMCA",
    objective: "남을 사람, 떠날 사람, 기록을 맡을 사람이 마지막으로 나누는 말을 지켜본다.",
    sceneType: "night_meeting",
    text: "희미한 전등 아래 몇 사람이 둘러앉아 있다. 누군가는 끝까지 남겠다고 하고, 누군가는 적어도 밖으로 남겨야 할 말이 있다고 한다. 큰소리로 다투는 사람은 없지만 방 안 공기에는 무거운 결심이 차곡차곡 쌓여 간다.",
    situation:
      "이 회의는 단순히 찬반을 가르는 자리가 아니다. 각자 무엇을 지키고 어떤 방식으로 남기려 하는지, 마지막으로 확인하는 시간에 더 가깝게 느껴진다.",
    dialogue: [
      { name: "학생", line: "남는 일도 필요하고, 기록을 남기는 일도 필요합니다.", avatar: "student" },
      { name: "시민", line: "무엇을 하든 누군가는 기억을 맡아야 합니다.", avatar: "citizen" },
      { name: "나", line: "이 밤의 말들이 오래 남을 것 같다.", avatar: "player" },
    ],
    history: "항쟁의 마지막을 앞두고 시민들은 남을 것인지, 기록을 어떻게 남길 것인지에 대한 무거운 논의를 이어 갔다.",
    choices: [
      {
        text: "남아 있는 사람들과 새벽을 맞는다",
        detail: "위험을 알면서도 도청에 남아, 그 마지막 시간을 직접 지켜보는 쪽을 택한다.",
        nextSceneId: "last_night",
        stat: "courage",
        statDelta: 1,
        requirements: { courage: 3 },
      },
      {
        text: "들은 말을 정리해 기록으로 남긴다",
        detail: "이 밤의 논의가 흩어지지 않도록, 남아 있는 사람들의 말과 분위기를 정리해 둔다.",
        nextSceneId: "archive_ending",
        stat: "record",
        statDelta: 1,
        requirements: { record: 4 },
      },
      {
        text: "마지막까지 마음을 정리하며 도청으로 향한다",
        detail: "아직 완전히 결심이 선 것은 아니지만, 결국 그 새벽을 외면하지 않기로 한다.",
        nextSceneId: "last_night",
        stat: "courage",
        statDelta: 1,
      },
    ],
  },
  {
    id: "last_night",
    stageNum: 14,
    stageTitle: "도청의 새벽",
    date: "1980.05.27",
    location: "전남도청",
    objective: "전남도청에 남은 이들의 마지막 시간을 끝까지 지켜본다.",
    sceneType: "plaza_night",
    text: "새벽 공기는 차갑고 말수는 줄어들었지만, 남아 있는 사람들의 얼굴에는 이미 각자의 결심이 서려 있다. 이 밤이 쉽게 지나가지 않으리라는 사실을 모두가 알고 있다. 이 자리에 어떤 사람들이 남아 있었는지를 잊지 말아야 한다는 마음으로 그 얼굴들을 바라보게 된다.",
    situation:
      "5월 27일 새벽의 도청은 5·18의 마지막 장면 가운데 하나다. 이 순간을 영웅담처럼 바라보기보다, 남아 있던 사람들이 어떤 마음으로 이 시간을 맞고 있는지 기억하려 한다.",
    dialogue: [
      { name: "시민", line: "우리가 이 자리에 있었다는 사실만은 꼭 남아야 할 겁니다.", avatar: "citizen" },
      { name: "나", line: "잊지 않겠습니다. 그리고 전하겠습니다.", avatar: "player" },
    ],
    history:
      "1980년 5월 27일 새벽, 계엄군의 전남도청 진압으로 항쟁은 막을 내렸지만 5·18민주화운동은 이후 한국 민주주의 역사에 깊이 남았다.",
    choices: [
      {
        text: "엔딩 보기",
        detail: "그날 이후에도 이어지는 기억과 기록의 의미를 돌아본다.",
        nextSceneId: "memory_ending",
        collectible: "last_memo",
      },
    ],
  },
];
