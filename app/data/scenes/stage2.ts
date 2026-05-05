import type { Scene } from "../../types";

export const stage2Scenes: Scene[] = [
  {
    id: "radio_room",
    stageNum: 5,
    stageTitle: "라디오를 듣는 집",
    date: "1980.05.20",
    location: "양동 주택가",
    objective: "방송에서 전해지는 말과 거리에서 본 현실을 함께 견주어 본다.",
    sceneType: "home",
    text: "라디오에서는 아까 거리에서 직접 본 장면과 어긋나는 설명이 흘러나온다. 학교 앞의 다급한 얼굴들, 금남로에서 들은 떨리는 목소리를 떠올릴수록 무엇이 실제이고 무엇이 가려지고 있는지 오히려 더 선명해진다.",
    situation:
      "집 안은 잠시 몸을 피할 수 있는 공간이지만, 바깥에서 본 일과 지금 들리는 말 사이의 간극은 더 크게 느껴진다. 그 차이를 그냥 넘길 수 없다는 생각이 든다.",
    dialogue: [
      { name: "동생", line: "밖에서 본 일들이 방송이랑 정말 다른 거야?", avatar: "youth" },
      { name: "나", line: "응. 내가 본 일과 지금 들리는 말이 너무 다르다.", avatar: "player" },
    ],
    history:
      "1980년 5월 17일, 정부는 비상 계엄의 전국 확대를 선포하였다. 그를 기점으로 일부 언론은 통제된 보도를 시작했고, 시민들은 공식적으로 전해지는 말과 자신들이 직접 보고 듣는 현실 사이의 간극을 점점 더 크게 느끼게 되었다.",
    choices: [
      {
        text: "들은 말을 방 안에서 정리한다",
        detail: "거리에서 본 일과 방송 내용을 나란히 놓고 종이 위에 다시 정리해 본다.",
        nextSceneId: "leaflet_room",
        stat: "record",
        statDelta: 1,
        collectible: "radio_note",
      },
      {
        text: "이웃에게 상황을 설명한다",
        detail: "집 안에 머무르지 않고, 직접 본 사실을 이웃에게 차분히 설명해 전한다.",
        nextSceneId: "citizen_voice",
        stat: "trust",
        statDelta: 1,
      },
    ],
  },
  {
    id: "leaflet_room",
    stageNum: 6,
    stageTitle: "종이 위의 사실",
    date: "1980.05.20",
    location: "양동 주택가",
    objective: "들은 말과 본 장면을 다시 문장으로 정리하며, 무엇을 남길지 가다듬는다.",
    sceneType: "leaflet_room",
    text: "낡은 책상 위에 종이와 연필을 펴 둔다. 거리에서 본 장면, 라디오에서 들은 말, 이웃의 반응이 머릿속에서 뒤섞이다가 한 줄씩 문장이 되기 시작한다. 어떻게 적어야 나중에도 흔들리지 않을지 한참을 고쳐 쓰게 된다.",
    situation:
      "지금 이 방은 잠시 몸을 숨기는 공간이면서 동시에 사실을 정리하는 장소가 된다. 정확하게 남겨 두고 싶다는 마음이 조심스러운 문장을 고르게 만든다.",
    dialogue: [
      { name: "동생", line: "적어 두는 게 정말 도움이 될까?", avatar: "youth" },
      { name: "나", line: "지금은 그것부터라도 해야 할 것 같다.", avatar: "player" },
    ],
    history: "시민들이 남긴 메모와 문서, 증언은 이후 5·18의 진실을 복원하는 중요한 자료가 되었다.",
    choices: [
      {
        text: "정리한 메모를 들고 현장으로 나간다",
        detail: "방 안에서 고른 문장을 들고 다시 현장으로 나가, 더 많은 사실을 붙잡아 둔다.",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
        requirements: { record: 2 },
        collectible: "leaflet",
      },
      {
        text: "사람들이 모인 곳으로 가서 직접 전한다",
        detail: "정리한 말을 머릿속에 붙들고, 도청 앞 사람들 속으로 다시 걸어 들어간다.",
        nextSceneId: "citizen_voice",
        stat: "trust",
        statDelta: 1,
      },
    ],
  },
  {
    id: "side_alley_detour",
    stageNum: 4,
    stageTitle: "옆 골목으로",
    date: "1980.05.18",
    location: "용봉동 골목",
    objective: "정문을 피해 옆 골목으로 돌며 전남대학교 앞의 긴장을 더 가까이 느껴 본다.",
    sceneType: "side_alley_detour",
    text: "정문 쪽 큰길을 피하자 좁은 골목의 정적이 먼저 다가온다. 담장 끝에서 사람들이 고개만 내밀고 학교 쪽을 살피고 있고, 멀리서는 군인의 움직임과 짧은 고함이 어렴풋이 들린다. 골목조차 안전한 곳처럼 느껴지지 않는다.",
    situation:
      "정문으로 곧장 가는 길은 막혀 있다. 눈에 덜 띄는 쪽으로 움직일수록 오히려 지금 상황의 숨막힘이 더 선명해진다.",
    dialogue: [
      { name: "시민", line: "정문 쪽은 더 험합니다. 이 길로 돌아가 보세요.", avatar: "citizen" },
      { name: "나", line: "조심해서라도 끝까지 가 봐야겠다.", avatar: "player" },
    ],
    history:
      "계엄군이 대학 진입을 막으면서 학생들과 시민들은 정문뿐 아니라 주변 공간에서도 긴장을 마주해야 했다.",
    choices: [
      {
        text: "골목 끝까지 가서 정문 앞으로 붙는다",
        detail: "사람들이 숨을 죽인 채 서 있는 골목을 지나 전남대 정문 앞 상황을 직접 확인한다.",
        nextSceneId: "university_gate",
        stat: "courage",
        statDelta: 1,
      },
      {
        text: "몸을 낮추고 더 조심스럽게 우회한다",
        detail: "서두르지 않고 담장 쪽 좁은 길을 따라 움직이며 상황을 더 침착하게 살핀다.",
        nextSceneId: "university_gate",
        stat: "safety",
        statDelta: 1,
        requirements: { safety: 1 },
      },
      {
        text: "지금 본 분위기부터 먼저 적어 둔다",
        detail: "정문으로 더 다가서기 전에, 골목에 번진 긴장과 사람들의 반응을 기록으로 남긴다.",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
      },
    ],
  },
  {
    id: "university_gate",
    stageNum: 5,
    stageTitle: "전남대 앞",
    date: "1980.05.18",
    location: "전남대학교 정문 앞",
    objective: "전남대학교 정문 앞에서 벌어지는 일을 직접 확인한다.",
    sceneType: "university",
    text: "전남대학교 정문 앞에는 학교 안으로 들어가지 못한 학생들이 모여 있다. 당황한 얼굴과 굳은 얼굴이 뒤섞여 있고, 지나가던 시민들도 발을 멈춘 채 무슨 일이 있었는지 묻고 또 듣는다. 어느새 그들 사이에 서서 학생들의 얼굴을 바라보게 된다.",
    situation:
      "이곳의 긴장은 단순한 소동처럼 보이지 않는다. 섣불리 판단하기보다, 지금 눈앞에서 벌어지는 일을 제대로 보고 들어야겠다는 생각이 든다.",
    dialogue: [
      { name: "학생", line: "우리는 학교에 들어가려 했을 뿐인데 막혔어요.", avatar: "student" },
      { name: "시민", line: "여기서 무슨 일이 벌어지는지 시민들도 알아야 해요.", avatar: "citizen" },
      { name: "나", line: "눈앞의 일을 그냥 흘려보낼 수는 없다.", avatar: "player" },
    ],
    history:
      "5월 18일 전남대학교 정문 앞에서 시작된 학생들의 항의는 계엄군의 폭력적 진압과 함께 시내 전체로 확산되었다.",
    choices: [
      {
        text: "현장을 기록한다",
        detail: "교문 앞의 분위기와 사람들의 말을 기록해 나중에 남을 증언으로 남긴다.",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "시내로 이동하는 사람들을 따라간다",
        detail: "전남대 앞의 일이 시내로 어떻게 번지는지 보기 위해 사람들의 흐름을 따라간다.",
        nextSceneId: "downtown",
        stat: "courage",
        statDelta: 1,
      },
      {
        text: "학생들에게 다가가 정보를 얻는다",
        detail: "학생들의 말로 직접 상황을 듣고, 왜 이 자리에 모였는지 더 구체적으로 이해한다.",
        nextSceneId: "talk_students",
        stat: "trust",
        statDelta: 1,
      },
    ],
  },
  {
    id: "talk_students",
    stageNum: 6,
    stageTitle: "학생들의 이야기",
    date: "1980.05.18",
    location: "전남대학교 정문 앞",
    objective: "학생들의 이야기를 듣고, 지금 이들이 왜 이 자리에 서 있는지 더 가까이 이해해 본다.",
    sceneType: "university",
    text: "학생들은 작은 원을 만들어 서로의 말을 확인하고 있다. 두려움이 없는 것은 아니지만, 지금 물러서면 아무 일도 드러나지 않을 것이라는 생각이 그 자리를 붙들고 있는 듯하다. 그 말들을 가만히 듣고 있자 마음이 더 무거워진다.",
    situation:
      "말을 들을수록 학생들이 충동적으로 움직이고 있는 것이 아니라는 사실이 분명해진다. 이들과 함께 움직일지, 아니면 이 목소리를 먼저 남길지 스스로 정해야 한다.",
    dialogue: [
      { name: "학생", line: "계속 막혀 있을 수는 없어요. 더 많은 사람이 알아야 해요.", avatar: "student" },
      { name: "청년", line: "지금 일어난 일을 밖에 알리지 않으면 아무도 모를 겁니다.", avatar: "youth" },
      { name: "나", line: "먼저 정확히 듣고, 내가 할 수 있는 일을 생각해 보자.", avatar: "player" },
    ],
    history:
      "5월 18일 학생들은 교정과 도서관 주변에 모여 상황을 논의했고, 곧 시내로 이동해 시민들에게 현실을 알리기 시작했다.",
    choices: [
      {
        text: "학생들과 함께 시내로 나간다",
        detail: "학생들과 함께 시내로 이동하며 학교 앞의 상황이 시민들에게 어떻게 전해지는지 지켜본다.",
        nextSceneId: "downtown",
        stat: "courage",
        statDelta: 1,
        collectible: "badge",
      },
      {
        text: "현장을 기록한다",
        detail: "바로 움직이기보다 학생들의 말과 현장의 공기를 기록으로 남기는 데 집중한다.",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
      },
    ],
  },
];
