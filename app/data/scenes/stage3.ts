import type { Scene } from "../../types";

export const stage3Scenes: Scene[] = [
  {
    id: "downtown",
    stageNum: 7,
    stageTitle: "금남로",
    date: "1980.05.20",
    location: "금남로",
    objective: "금남로로 모여드는 시민들의 목소리와 움직임을 지켜본다.",
    sceneType: "downtown",
    text: "금남로에 이르자 상황의 규모가 완전히 달라진다. 학생들만의 일처럼 보이던 긴장은 이제 상인과 노동자, 학생과 부모의 얼굴에도 함께 드리워져 있다. 사람들 사이를 지나며, 서로 이름을 모르면서도 이 일을 그냥 넘길 수 없다는 마음이 번져 가는 것을 느낀다.",
    situation:
      "전남대 앞의 일은 이제 광주 전체의 문제로 번지고 있다. 이 거리에서 시민들이 서로를 확인하고 연대하는 모습이 또렷하게 보인다.",
    dialogue: [
      { name: "시민 A", line: "이대로 침묵하면 밖에서는 아무 일도 없었던 것처럼 알 겁니다.", avatar: "citizen" },
      { name: "시민 B", line: "서로 흩어지지 말고, 다치지 않게 조심합시다.", avatar: "citizen" },
    ],
    history:
      "5월 20일 오후, 금남로에서는 택시·버스 기사 200여 명이 차량을 동원해 전남도청 쪽으로 전진하는 시위를 벌이며 항쟁의 성격이 크게 바뀌었다. 학생만의 운동이 아니라 노동자·상인·일반 시민이 자발적으로 참여하면서 5·18은 계층과 세대를 아우르는 광주 시민 전체의 항쟁으로 확산되었다. 이처럼 다양한 시민이 거리로 나온 것은 계엄군의 폭력에 대한 분노가 광주 사회 전체에 퍼져 있었음을 보여 준다.",
    choices: [
      {
        text: "시장 쪽으로 번지는 분위기를 살핀다",
        detail: "금남로 인근 시장과 생활 공간까지 상황이 어떻게 번지고 있는지 확인한다.",
        nextSceneId: "market_people",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "다친 사람을 돕는다",
        detail: "행렬의 중심보다 그 곁에서 다친 사람과 불안한 사람을 돌보는 일을 먼저 맡는다.",
        nextSceneId: "help_people",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "현장을 기록한다",
        detail: "금남로에 모인 사람들의 표정과 구호, 거리의 흐름을 기록으로 남긴다.",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
      },
    ],
  },
  {
    id: "market_people",
    stageNum: 8,
    stageTitle: "시장 사람들",
    date: "1980.05.20",
    location: "대인시장",
    objective: "학생들만의 일이 아니게 된 지금, 상인과 주민들의 목소리를 더 가까이 듣는다.",
    sceneType: "market_people",
    text: "금남로 옆 시장 골목에도 셔터를 반쯤 내린 가게와 길가 좌판 사이로 사람들이 모여 있다. 장사를 하던 손이 멈췄고, 학생들 이야기만 하던 입에서는 이제 가족과 동네, 시내 전체의 일이 함께 나온다. 일상과 긴장이 같은 자리에 겹쳐 있다.",
    situation:
      "시장에 모인 사람들의 말은 상황이 더 넓게 번졌다는 사실을 보여 준다. 이곳에서는 누가 앞장섰는가보다 모두가 어떤 표정으로 현실을 받아들이고 있는지가 더 크게 느껴진다.",
    dialogue: [
      { name: "상인", line: "학생들만의 일이라고 하기에는 벌써 너무 멀리 왔어요.", avatar: "merchant" },
      { name: "주민", line: "다들 뭘 해야 할지 몰라서 더 불안한 거죠.", avatar: "citizen" },
      { name: "나", line: "시장의 공기까지 바뀌어 버렸다.", avatar: "player" },
    ],
    history:
      "5·18 당시 대인시장을 비롯한 광주 시내 상인들은 시위대와 부상자를 위해 음식과 물자를 무상으로 제공했다. 특히 주먹밥을 만들어 나눠 주는 여성들의 모습은 5·18을 상징하는 장면 중 하나로 기록되어 있다. 이처럼 일상의 생활 공간이 연대와 돌봄의 거점으로 전환된 것은, 5·18이 단순한 시위가 아니라 공동체 전체가 함께한 항쟁이었음을 보여 주는 역사적 증거다.",
    choices: [
      {
        text: "사람들의 말을 모아 기록한다",
        detail: "시장 상인과 주민들의 반응을 더 모아 두고, 시민들의 목소리가 어떻게 넓어지는지 남긴다.",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "다친 사람을 돌보는 쪽으로 간다",
        detail: "이야기를 더 듣기보다 당장 손이 필요한 자리로 이동해 공동체의 움직임에 합류한다.",
        nextSceneId: "street_clinic",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "도청 앞 사람들 속으로 다시 들어간다",
        detail: "시장까지 번진 이 분위기가 도청 앞에서는 어떻게 모이는지 확인하러 발걸음을 옮긴다.",
        nextSceneId: "citizen_voice",
        stat: "courage",
        statDelta: 1,
      },
    ],
  },
  {
    id: "record_scene",
    stageNum: 8,
    stageTitle: "기록하다",
    date: "1980.05.19-05.21",
    location: "충장로 골목",
    objective: "눈앞의 장면과 사람들의 말을 기록으로 남긴다.",
    sceneType: "notebook",
    text: "수첩을 펴고 나서야 눈앞의 장면이 얼마나 빠르게 흩어질 수 있는지 실감한다. 누가 어디서 다쳤는지, 누가 어떤 말을 전했는지, 어떤 표정으로 서로를 붙들었는지를 적어 내려간다. 거리의 순간들이 조금씩 사라지지 않을 문장이 되어 간다.",
    situation:
      "기록이 당장 상황을 멈추게 하지는 못한다. 그래도 지금 남기지 않으면 훗날 사실을 제대로 전하기 어려울지 모른다는 생각이 손을 재촉한다.",
    dialogue: [
      { name: "시민", line: "지금 본 일은 꼭 남겨 두어야 합니다.", avatar: "citizen" },
      { name: "나", line: "기억이 흐려지기 전에 적어 두자.", avatar: "player" },
    ],
    history:
      "5·18 관련 기록은 사진, 영상, 문서, 시민 증언 등 방대한 양이 남아 있으며, 훗날 사망자 추정, 진압 경위 규명, 공식 사과 요구의 핵심 근거가 되었다. 독일 ARD 방송 기자 위르겐 힌츠페터는 광주에 잠입해 촬영한 영상을 세계에 알렸고, 이 필름은 국제 사회에 5·18의 실상을 처음으로 전한 중요한 자료다. 이 모든 기록물은 2011년 유네스코 세계기록유산으로 등재되어 인류 공동의 유산으로 보존되고 있다.",
    choices: [
      {
        text: "임시 돌봄터까지 가서 더 살핀다",
        detail: "기록만으로 멈추지 않고, 다친 사람들과 그들을 돌보는 손길이 모인 곳으로 향한다.",
        nextSceneId: "street_clinic",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "사람들의 발언을 더 모으러 간다",
        detail: "현장의 증언을 더 모아, 서로 다른 목소리들이 무엇을 말하고 있는지 차분히 정리한다.",
        nextSceneId: "citizen_voice",
        stat: "record",
        statDelta: 1,
        collectible: "notebook",
      },
    ],
  },
  {
    id: "street_clinic",
    stageNum: 9,
    stageTitle: "임시 돌봄터",
    date: "1980.05.21",
    location: "수기동 골목",
    objective: "돌봄이 필요한 자리에서 시민들이 서로를 살피는 모습을 확인하고, 내 역할을 찾는다.",
    sceneType: "street_clinic",
    text: "건물 처마 아래와 길 가장자리에 물통과 수건, 담요가 놓여 있다. 시민들은 다친 사람의 상태를 살피고, 누군가는 길을 비켜 달라며 사람들을 정리한다. 여기서는 큰 구호보다 작은 손길이 훨씬 분주하다.",
    situation:
      "광주의 시간은 맞서는 장면만으로 이뤄지지 않는다. 이 돌봄터에서는 시민들이 서로를 어떻게 살피고 버티게 했는지가 더 분명하게 드러난다.",
    dialogue: [
      { name: "시민", line: "기록도 중요하지만 지금은 손이 더 필요합니다.", avatar: "citizen" },
      { name: "나", line: "도울 수 있는 만큼 돕고, 본 것도 잊지 말자.", avatar: "player" },
    ],
    history:
      "5월 21일 계엄군의 집단 발포 이후 부상자가 급증하면서 광주기독병원·전남대병원 등에 환자들이 밀려들었다. 의사·간호사들이 밤새 자원해 수술을 이어가는 한편, 일반 시민들도 헌혈과 물자 지원에 나섰다. 의약품과 혈액이 부족한 상황에서도 이어진 이 의료 연대는, 공동체가 극한 상황에서 서로를 살피며 버텨 내는 방식이 어떤 것인지를 5·18의 역사 속에 또렷이 남겼다.",
    choices: [
      {
        text: "돌봄의 흐름에 본격적으로 합류한다",
        detail: "물과 수건, 안내와 연락 등 지금 당장 필요한 일을 맡으며 공동체의 한가운데로 들어간다.",
        nextSceneId: "help_people",
        stat: "trust",
        statDelta: 1,
        collectible: "bandage",
      },
      {
        text: "물자 전달을 맡아 더 바깥까지 움직인다",
        detail: "한 자리에 머무르지 않고, 필요한 물자와 소식을 다른 자리까지 이어 나른다.",
        nextSceneId: "supply_run",
        stat: "safety",
        statDelta: 1,
      },
    ],
  },
];
