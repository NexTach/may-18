import type { Scene } from "../../types";

export const stage1Scenes: Scene[] = [
  {
    id: "start",
    stageNum: 1,
    stageTitle: "시작",
    date: "1980.05.18",
    location: "광주역 앞 거리",
    objective: "전남대학교 쪽 상황을 직접 확인하고 거리의 분위기를 살펴본다.",
    sceneType: "station",
    text: "아침인데도 거리는 평소보다 조용하다. 장사를 준비하던 사람들도, 출근길을 재촉하던 사람들도 자꾸 걸음을 늦춘다. 시선이 자꾸 전남대학교 쪽으로 간다. 군인들이 길을 막아선 채 서 있고, 지나가는 시민들도 말을 아끼면서 계속 그쪽을 돌아본다.",
    situation:
      "무슨 일이 벌어지는지 아직 정확히 알 수는 없다. 다만 학교 앞에 평소와 다른 긴장이 감돌고 있다는 사실만은 분명하다. 그냥 지나치기보다 그 이유를 직접 확인해 보고 싶다.",
    dialogue: [
      { name: "나", line: "오늘은 거리의 공기가 평소와 다르다.", avatar: "player" },
      { name: "군인", line: "전남대 방향 접근 금지. 모두 해산하라.", avatar: "soldier" },
      { name: "나", line: "그냥 지나치기에는 마음이 걸린다.", avatar: "player" },
    ],
    history:
      "1980년 5월 18일, 전남대학교 정문 앞에서 학생들의 항의가 시작되었고 광주의 상황은 곧 시민 전체의 문제로 번져 갔다.",
    choices: [
      {
        text: "역 앞 사람들의 말을 더 들어본다",
        detail: "광주역 인근에 머무는 시민들이 무엇을 들었는지부터 차분히 확인한다.",
        nextSceneId: "station_rumor",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "가족에게 먼저 상황을 알린다",
        detail: "가족의 안부를 먼저 확인하고, 거리의 불안한 분위기를 집에도 전한다.",
        nextSceneId: "call_family",
        stat: "safety",
        statDelta: 1,
      },
      {
        text: "주변을 더 살펴본다",
        detail: "성급히 움직이기보다 거리의 표정과 들려오는 말을 모아 상황의 윤곽부터 가늠한다.",
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
    objective: "주변의 말과 분위기를 통해 지금 벌어지는 일을 더 구체적으로 파악해 본다.",
    sceneType: "station",
    text: "거리 한쪽에는 계엄군이 길게 늘어서 있고, 반대편에서는 시민들이 일정한 거리를 둔 채 그 모습을 지켜본다. 사람들 틈에 서서 귀를 기울이고 있자 학교 쪽에서 짧은 구호가 바람을 타고 들려오고, 수군거리던 목소리도 점점 또렷해진다.",
    situation:
      "멀리서 보고 듣는 것만으로도 평소와 다른 일이 벌어지고 있다는 사실은 분명하다. 더 가까이 가 볼지, 잠시 물러나 전해지는 말을 더 확인할지 가늠하게 된다.",
    dialogue: [
      { name: "시민", line: "전남대 앞에 학생들이 많이 모였다더군요.", avatar: "citizen" },
      { name: "나", line: "학교 앞에 군인이 저렇게 많은 이유가 뭘까.", avatar: "player" },
      { name: "시민", line: "비상계엄이 전국으로 확대됐다고 해.", avatar: "citizen" },
    ],
    history:
      "1980년 5월 17일 자정, 비상계엄이 전국으로 확대되면서 정치활동이 금지되고 대학에는 계엄군이 진주했다.",
    choices: [
      {
        text: "광주역 인근에서 들리는 말을 더 모은다",
        detail: "역 앞에 머무는 시민들 사이를 돌며 학교 앞 분위기가 어떻게 전해지고 있는지 살핀다.",
        nextSceneId: "station_rumor",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "집에 들어가 라디오를 듣는다",
        detail: "거리에서 느낀 긴장을 잠시 뒤로하고, 전해지는 방송 내용이 무엇인지 확인한다.",
        nextSceneId: "radio_room",
        stat: "safety",
        statDelta: 1,
      },
    ],
  },
  {
    id: "station_rumor",
    stageNum: 3,
    stageTitle: "역 앞 소문",
    date: "1980.05.18",
    location: "광주역 광장",
    objective: "역 앞에 머문 시민들의 말 속에서 상황의 윤곽을 더 또렷하게 붙잡는다.",
    sceneType: "station_rumor",
    text: "광주역 인근 상점 앞과 전봇대 아래에 삼삼오오 선 사람들이 낮은 목소리로 말을 주고받는다. 누구는 학교 앞에서 학생들이 막혔다고 하고, 누구는 이미 다친 사람이 나왔다는 말을 전한다. 아직 다들 확신은 없지만 불안만은 같은 속도로 번지고 있다.",
    situation:
      "직접 본 것보다 들은 말이 더 빨리 퍼지고 있다. 이 소문이 과장이 아니라면, 전남대학교 쪽으로 더 가까이 가 봐야 한다는 마음이 커진다.",
    dialogue: [
      { name: "상인", line: "아까부터 사람들이 학교 쪽 얘기만 합니다.", avatar: "merchant" },
      { name: "시민", line: "그냥 해산시키는 분위기가 아니래요.", avatar: "citizen" },
      { name: "나", line: "이제는 직접 가서 확인해야겠다.", avatar: "player" },
    ],
    history:
      "5월 18일 오전, 전남대학교 앞의 상황은 입에서 입으로 퍼지며 광주 시민들의 불안과 관심을 빠르게 키웠다.",
    choices: [
      {
        text: "정문 대신 옆 골목으로 향한다",
        detail: "군인들이 막은 큰길을 피해서 대학가 옆 골목으로 돌아가 본다.",
        nextSceneId: "side_alley_detour",
        stat: "safety",
        statDelta: 1,
      },
      {
        text: "가족에게도 이 소식을 전한다",
        detail: "역 앞에서 들은 말을 그냥 두지 않고 집에도 알려 두기로 한다.",
        nextSceneId: "call_family",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "공식적으로 전해지는 말을 확인한다",
        detail: "들리는 말만으로 판단하지 않기 위해 일단 집으로 돌아가 라디오를 켠다.",
        nextSceneId: "radio_room",
        stat: "safety",
        statDelta: 1,
      },
    ],
  },
  {
    id: "call_family",
    stageNum: 3,
    stageTitle: "가족에게 연락",
    date: "1980.05.18",
    location: "양동시장 인근 공중전화",
    objective: "가족의 안부를 확인하고, 거리에서 느낀 긴장을 집에도 전한다.",
    sceneType: "phonebooth",
    text: "수화기 너머 어머니의 목소리는 평소보다 낮고 급하다. 동네에도 이미 심상치 않은 소문이 돌고 있는지, 무슨 일인지는 몰라도 제발 오래 밖에 있지 말라는 당부가 몇 번이고 이어진다. 방금 본 거리의 분위기가 자꾸 떠오른다.",
    situation:
      "거리에서 느낀 불안은 개인의 일이 아니지만, 가족의 걱정 역시 가볍지 않다. 밖에서 본 일과 집 안의 불안이 한 통화 안에서 맞닿는 순간이 버겁다.",
    dialogue: [
      { name: "어머니", line: "괜히 돌아다니지 말고 조심해야 한다.", avatar: "mother" },
      { name: "나", line: "밖 상황만 조금 더 보고 들어갈게요.", avatar: "player" },
      { name: "어머니", line: "무사한 게 제일 중요하다.", avatar: "mother" },
    ],
    history:
      "민주화운동 기간 동안 무수한 시민이 실종되고 사망했다. 가족들은 사랑하는 사람의 안전을 걱정하며, 때로는 그들의 행동을 만류하기도 했다.",
    choices: [
      {
        text: "집 근처 이웃들의 반응도 살핀다",
        detail: "통화를 마치고 바로 돌아서기보다 동네 골목의 분위기까지 확인해 본다.",
        nextSceneId: "family_neighborhood",
        stat: "trust",
        statDelta: 1,
        collectible: "letter",
      },
      {
        text: "바로 시내 쪽으로 나간다",
        detail: "가족의 걱정을 뒤로하고, 지금 거리에서 무슨 일이 이어지는지 더 확인하러 나간다.",
        nextSceneId: "downtown",
        stat: "courage",
        statDelta: 1,
      },
    ],
  },
  {
    id: "family_neighborhood",
    stageNum: 4,
    stageTitle: "동네 골목",
    date: "1980.05.18",
    location: "양동 골목",
    objective: "동네 사람들의 불안과 반응을 살피며, 사적인 공간에 번진 긴장을 확인한다.",
    sceneType: "family_neighborhood",
    text: "골목 어귀에는 몇몇 이웃이 서서 학교 쪽 이야기를 주고받고 있다. 문 앞에 나와 귀를 기울이는 사람도 있고, 아이를 서둘러 집 안으로 들이는 사람도 있다. 거리의 긴장이 집 근처 생활 공간까지 그대로 스며든 것처럼 느껴진다.",
    situation:
      "전남대 앞의 일은 더 이상 먼 이야기가 아니다. 이웃들까지 불안해하는 모습을 보니, 내가 직접 본 일과 들은 말을 어떻게 전할지 더 신중해진다.",
    dialogue: [
      { name: "이웃", line: "학교 쪽 분위기가 심상치 않다던데 사실인가요?", avatar: "citizen" },
      { name: "이웃", line: "밖에서 무슨 일이 벌어지는지 몰라서 더 불안해요.", avatar: "mother" },
      { name: "나", line: "이 골목에도 불안이 그대로 번져 있다.", avatar: "player" },
    ],
    history:
      "광주의 상황은 곧 가정과 동네로 번졌고, 시민들은 가족과 이웃을 통해 소식을 공유하며 서로의 안부를 확인했다.",
    choices: [
      {
        text: "이웃들과 함께 라디오를 듣는다",
        detail: "불안만 커지지 않도록, 들려오는 방송과 실제 상황을 함께 확인해 본다.",
        nextSceneId: "radio_room",
        stat: "safety",
        statDelta: 1,
      },
      {
        text: "들은 말을 더 모아 다시 역 쪽으로 간다",
        detail: "동네의 분위기만으로 멈추지 않고, 다시 바깥으로 나가 상황의 흐름을 붙잡는다.",
        nextSceneId: "station_rumor",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "상황을 설명하며 시내로 향한다",
        detail: "이웃들에게 아는 만큼 설명한 뒤, 더 많은 사람이 모이는 시내 쪽으로 걸음을 옮긴다.",
        nextSceneId: "downtown",
        stat: "trust",
        statDelta: 1,
      },
    ],
  },
];
