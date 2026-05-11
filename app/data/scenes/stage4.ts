import type { Scene } from "../../types";

export const stage4Scenes: Scene[] = [
  {
    id: "citizen_voice",
    stageNum: 10,
    stageTitle: "도청 앞",
    date: "1980.05.21",
    location: "전남도청 앞",
    objective: "전남도청 앞에 모인 시민들의 발언과 분위기를 지켜본다.",
    sceneType: "plaza",
    text: "도청 앞 광장에서는 분노만이 아니라 설명과 설득, 확인의 말이 함께 오간다. 마이크를 잡은 사람의 목소리에는 절박함이 묻어나고, 뒤쪽에서는 처음 나온 시민들이 서로 상황을 다시 확인하며 고개를 끄덕인다. 그 한가운데 서서 사람들의 말을 하나씩 받아들이게 된다.",
    situation:
      "혼란 속에서도 시민들은 스스로 질서를 만들고 서로의 말을 확인하고 있다. 이 자리에서는 한 사람의 용기보다 함께 모인 목소리와 필요한 일을 붙드는 일이 더 중요하게 느껴진다.",
    dialogue: [
      {
        name: "청년",
        line: "우리가 바라는 건 거창한 게 아닙니다. 사람답게 살 수 있는 세상입니다.",
        avatar: "youth",
      },
      {
        name: "노인",
        line: "이건 젊은 사람들만의 일이 아닙니다. 우리 모두의 일입니다.",
        avatar: "elder",
      },
      {
        name: "나",
        line: "여기 모인 목소리를 흩어지게 두면 안 된다.",
        avatar: "player",
      },
    ],
    history:
      "1980년 5월 21일 오후, 전남도청 앞 광장에 모인 시민들을 향해 계엄군이 집단 발포를 개시했다. 이 발포로 다수의 시민이 현장에서 목숨을 잃었으며, 이를 계기로 시민들은 자위 무장에 나서기 시작했다. 누가 발포 명령을 내렸는지는 아직까지 완전히 규명되지 않은 역사적 과제로 남아 있으며, 진상 규명에 대한 요구는 오늘날까지도 계속되고 있다.",
    choices: [
      {
        text: "광장 한켠의 논의 자리에 더 다가간다",
        detail:
          "사람들이 남을지 알릴지 조용히 토론하는 자리로 가서 말을 더 들여다본다.",
        nextSceneId: "citizen_debate",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "현장에서 필요한 일을 돕는다",
        detail:
          "생수와 연락, 안내처럼 현장에서 실제로 필요한 일을 맡아 사람들 사이를 잇는다.",
        nextSceneId: "help_people",
        stat: "trust",
        statDelta: 1,
      },
    ],
  },
  {
    id: "citizen_debate",
    stageNum: 11,
    stageTitle: "광장의 의논",
    date: "1980.05.21-05.22",
    location: "광주 YMCA 앞",
    objective:
      "시민들이 남을지, 알릴지, 도울지 의논하는 자리에서 선택의 무게를 더 가까이 느낀다.",
    sceneType: "citizen_debate",
    text: "광장 한켠에서는 시민들이 작은 원을 만들고 조용히 의견을 나누고 있다. 더 남아야 한다는 말도, 바깥에 사실을 전할 사람도 필요하다는 말도 나온다. 누구의 말도 가볍지 않다. 서로 다른 판단이 모두 같은 현실에서 나왔다는 것이 더 선명하게 다가온다.",
    situation:
      "여기서는 누구 하나가 정답을 말하지 않는다. 남는 일, 돕는 일, 알리는 일이 모두 필요하다는 사실이 동시에 들려오고, 그만큼 선택의 무게도 더 커진다.",
    dialogue: [
      {
        name: "시민",
        line: "광주 안을 지키는 일도 중요하고, 밖으로 알리는 일도 중요합니다.",
        avatar: "citizen",
      },
      {
        name: "청년",
        line: "무엇을 하든 정확하게 남겨야 합니다.",
        avatar: "youth",
      },
      {
        name: "나",
        line: "어느 쪽이든 가볍게 고를 수는 없다.",
        avatar: "player",
      },
    ],
    history:
      "항쟁이 확산되면서 '시민수습대책위원회'와 '학생수습대책위원회'가 구성되어 계엄 당국과의 협상을 시도했다. 무기 반납과 평화적 해결을 논의했으나 강경 진압 방침을 고수한 계엄 당국과 끝내 합의에 이르지 못했다. 극한의 상황에서도 시민들이 대화와 논의를 통해 방향을 찾으려 했다는 사실은, 5·18 항쟁이 단순한 저항이 아닌 민주적 공론 과정을 포함하고 있었음을 보여 준다.",
    choices: [
      {
        text: "논의된 내용을 묶어 기록한다",
        detail:
          "사람들의 말을 흩어 두지 않고, 핵심 발언과 분위기를 더 또렷한 기록으로 남긴다.",
        nextSceneId: "community",
        stat: "record",
        statDelta: 1,
        requirements: { record: 3 },
      },
      {
        text: "광주 밖으로 전할 사람을 찾아 나선다",
        detail:
          "도청 앞의 말들을 바깥으로 잇기 위해 외곽으로 나갈 전달 경로를 찾기 시작한다.",
        nextSceneId: "checkpoint_edge",
        stat: "trust",
        statDelta: 1,
        requirements: { trust: 2 },
      },
      {
        text: "우선 사람들 곁에서 필요한 일을 맡는다",
        detail:
          "큰 방향을 정하기보다, 지금 곁에 있는 사람들을 돕는 일부터 계속 이어 간다.",
        nextSceneId: "help_people",
        stat: "trust",
        statDelta: 1,
      },
    ],
  },
  {
    id: "help_people",
    stageNum: 10,
    stageTitle: "서로를 돕다",
    date: "1980.05.21-05.26",
    location: "수기동 일대",
    objective:
      "서로를 돌보는 시민들의 움직임 속에서 내가 할 수 있는 일을 찾는다.",
    sceneType: "square",
    text: "누군가는 물을 나르고, 누군가는 다친 사람의 손을 붙든다. 큰 구호가 들리지 않는 자리에서도 시민들은 스스로 필요한 일을 찾아 움직인다. 그 사이를 오가다 보니, 이 질서가 명령이 아니라 서로를 살피려는 마음에서 나온다는 것이 더 분명해진다.",
    situation:
      "지금 눈앞의 5·18은 맞서는 장면만이 아니다. 서로를 돌보고 버티게 하는 손길들이야말로 이 시간을 지탱하고 있다는 사실이 더 선명해진다.",
    dialogue: [
      {
        name: "시민",
        line: "저쪽에 물하고 수건이 더 필요합니다.",
        avatar: "citizen",
      },
      {
        name: "나",
        line: "제가 가져다드릴게요. 어디로 가면 되나요?",
        avatar: "player",
      },
    ],
    history:
      "계엄군이 외곽으로 물러난 5월 22일부터 26일까지, 광주는 '해방 광주'라 불리는 시민 자치의 시간을 보냈다. 시민군은 도청과 주요 거점을 지키고 시민들은 자체적으로 치안을 유지하며 음식과 물자를 나눴다. 이 기간에 광범위한 약탈이나 폭력이 거의 발생하지 않았다는 사실은, 항쟁 참여자들의 높은 시민 의식과 공동체 정신을 보여 주는 역사적 증거로 오늘날도 인용된다.",
    choices: [
      {
        text: "물자와 소식을 직접 나른다",
        detail:
          "한자리에서 돕는 것을 넘어, 필요한 물건과 말을 다른 자리로 이어 주는 역할을 맡는다.",
        nextSceneId: "supply_run",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "외곽으로 나갈 길을 알아본다",
        detail:
          "광주 안의 목소리가 고립되지 않도록, 바깥으로 상황을 전할 방법을 모색한다.",
        nextSceneId: "checkpoint_edge",
        stat: "record",
        statDelta: 1,
      },
    ],
  },
  {
    id: "supply_run",
    stageNum: 11,
    stageTitle: "물자 전달",
    date: "1980.05.22-05.26",
    location: "불로동 골목",
    objective:
      "물과 수건, 소식이 오가는 동선을 따라 움직이며 공동체가 유지되는 방식을 체감한다.",
    sceneType: "supply_run",
    text: "골목과 광장 사이를 오가는 사람들의 손에는 물통과 상자, 수건과 짧은 쪽지가 들려 있다. 한 사람의 힘으로 버티는 것이 아니라, 필요한 것이 필요한 자리로 닿도록 서로 동선을 나누는 방식으로 도시가 유지되고 있다. 뛰어다니는 발걸음 속에도 이상한 질서가 있다.",
    situation:
      "사람들을 버티게 하는 것은 거창한 구호만이 아니다. 물자와 소식이 끊기지 않게 잇는 일 또한 이 시간을 지키는 중요한 축이라는 사실이 또렷해진다.",
    dialogue: [
      {
        name: "시민",
        line: "이 물은 광장 쪽으로, 수건은 골목 끝으로 보내 주세요.",
        avatar: "citizen",
      },
      {
        name: "나",
        line: "누가 어디에 필요한지 이제 조금씩 보인다.",
        avatar: "player",
      },
    ],
    history:
      "해방 광주 기간 동안 시민들은 식량, 의약품 등의 물자를 자체적으로 조달하고 분배하는 체계를 만들어 냈다. 광주 외곽이 계엄군에 의해 봉쇄된 상황에서 이러한 자체 물류 체계는 공동체의 생존을 가능하게 했으며, 이 시기 시민 자치의 경험은 이후 '광주 코뮌'이라는 개념으로 학술 연구에서 다뤄지기도 한다. 명령이 아닌 자발적 연대로 도시를 운영해 낸 것이, 이 시기의 광주가 역사에 남긴 또 하나의 증거다.",
    choices: [
      {
        text: "정리된 동선으로 더 넓게 이어 본다",
        detail:
          "사람들의 움직임을 한 번 더 정돈해, 공동체가 더 오래 버틸 수 있도록 손을 보탠다.",
        nextSceneId: "community",
        stat: "trust",
        statDelta: 1,
        requirements: { trust: 3 },
      },
      {
        text: "광장으로 돌아가 사람들의 논의를 다시 듣는다",
        detail:
          "물자 전달을 마치고, 도청 앞에서 시민들이 어떤 결정을 논의하는지 다시 확인한다.",
        nextSceneId: "citizen_debate",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "공동체 곁에 남아 일을 이어 간다",
        detail:
          "특별한 결정을 서두르기보다, 시민들이 만든 흐름을 따라 공동체 한가운데에 남는다.",
        nextSceneId: "community",
        stat: "trust",
        statDelta: 1,
      },
    ],
  },
];
