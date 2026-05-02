import type { Scene } from "../types";

export const scenes: Scene[] = [
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
      {
        name: "나",
        line: "오늘은 거리의 공기가 평소와 다르다.",
        avatar: "player",
      },
      {
        name: "군인",
        line: "전남대 방향 접근 금지. 모두 해산하라.",
        avatar: "soldier",
      },
      {
        name: "나",
        line: "그냥 지나치기에는 마음이 걸린다.",
        avatar: "player",
      },
    ],
    history:
      "1980년 5월 18일, 전남대학교 정문 앞에서 학생들의 항의가 시작되었고 광주의 상황은 곧 시민 전체의 문제로 번져 갔다.",
    choices: [
      {
        text: "역 앞 사람들의 말을 더 들어본다",
        detail:
          "광주역 인근에 머무는 시민들이 무엇을 들었는지부터 차분히 확인한다.",
        nextSceneId: "station_rumor",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "가족에게 먼저 상황을 알린다",
        detail:
          "가족의 안부를 먼저 확인하고, 거리의 불안한 분위기를 집에도 전한다.",
        nextSceneId: "call_family",
        stat: "safety",
        statDelta: 1,
      },
      {
        text: "주변을 더 살펴본다",
        detail:
          "성급히 움직이기보다 거리의 표정과 들려오는 말을 모아 상황의 윤곽부터 가늠한다.",
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
    objective:
      "주변의 말과 분위기를 통해 지금 벌어지는 일을 더 구체적으로 파악해 본다.",
    sceneType: "station",
    text: "거리 한쪽에는 계엄군이 길게 늘어서 있고, 반대편에서는 시민들이 일정한 거리를 둔 채 그 모습을 지켜본다. 사람들 틈에 서서 귀를 기울이고 있자 학교 쪽에서 짧은 구호가 바람을 타고 들려오고, 수군거리던 목소리도 점점 또렷해진다.",
    situation:
      "멀리서 보고 듣는 것만으로도 평소와 다른 일이 벌어지고 있다는 사실은 분명하다. 더 가까이 가 볼지, 잠시 물러나 전해지는 말을 더 확인할지 가늠하게 된다.",
    dialogue: [
      {
        name: "시민",
        line: "전남대 앞에 학생들이 많이 모였다더군요.",
        avatar: "citizen",
      },
      {
        name: "나",
        line: "학교 앞에 군인이 저렇게 많은 이유가 뭘까.",
        avatar: "player",
      },
      {
        name: "시민",
        line: "비상계엄이 전국으로 확대됐다고 해.",
        avatar: "citizen",
      },
    ],
    history:
      "1980년 5월 17일 자정, 비상계엄이 전국으로 확대되면서 정치활동이 금지되고 대학에는 계엄군이 진주했다.",
    choices: [
      {
        text: "광주역 인근에서 들리는 말을 더 모은다",
        detail:
          "역 앞에 머무는 시민들 사이를 돌며 학교 앞 분위기가 어떻게 전해지고 있는지 살핀다.",
        nextSceneId: "station_rumor",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "집에 들어가 라디오를 듣는다",
        detail:
          "거리에서 느낀 긴장을 잠시 뒤로하고, 전해지는 방송 내용이 무엇인지 확인한다.",
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
    objective:
      "역 앞에 머문 시민들의 말 속에서 상황의 윤곽을 더 또렷하게 붙잡는다.",
    sceneType: "station_rumor",
    text: "광주역 인근 상점 앞과 전봇대 아래에 삼삼오오 선 사람들이 낮은 목소리로 말을 주고받는다. 누구는 학교 앞에서 학생들이 막혔다고 하고, 누구는 이미 다친 사람이 나왔다는 말을 전한다. 아직 다들 확신은 없지만 불안만은 같은 속도로 번지고 있다.",
    situation:
      "직접 본 것보다 들은 말이 더 빨리 퍼지고 있다. 이 소문이 과장이 아니라면, 전남대학교 쪽으로 더 가까이 가 봐야 한다는 마음이 커진다.",
    dialogue: [
      {
        name: "상인",
        line: "아까부터 사람들이 학교 쪽 얘기만 합니다.",
        avatar: "merchant",
      },
      {
        name: "시민",
        line: "그냥 해산시키는 분위기가 아니래요.",
        avatar: "citizen",
      },
      {
        name: "나",
        line: "이제는 직접 가서 확인해야겠다.",
        avatar: "player",
      },
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
        detail:
          "들리는 말만으로 판단하지 않기 위해 일단 집으로 돌아가 라디오를 켠다.",
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
      {
        name: "어머니",
        line: "괜히 돌아다니지 말고 조심해야 한다.",
        avatar: "mother",
      },
      {
        name: "나",
        line: "밖 상황만 조금 더 보고 들어갈게요.",
        avatar: "player",
      },
      { name: "어머니", line: "무사한 게 제일 중요하다.", avatar: "mother" },
    ],
    history:
      "당시 광주의 소식은 빠르게 퍼졌고, 시민들은 가족과 이웃의 안부를 확인하며 서로의 안전을 살폈다.",
    choices: [
      {
        text: "집 근처 이웃들의 반응도 살핀다",
        detail:
          "통화를 마치고 바로 돌아서기보다 동네 골목의 분위기까지 확인해 본다.",
        nextSceneId: "family_neighborhood",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "바로 시내 쪽으로 나간다",
        detail:
          "가족의 걱정을 뒤로하고, 지금 거리에서 무슨 일이 이어지는지 더 확인하러 나간다.",
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
    objective:
      "동네 사람들의 불안과 반응을 살피며, 사적인 공간에 번진 긴장을 확인한다.",
    sceneType: "family_neighborhood",
    text: "골목 어귀에는 몇몇 이웃이 서서 학교 쪽 이야기를 주고받고 있다. 문 앞에 나와 귀를 기울이는 사람도 있고, 아이를 서둘러 집 안으로 들이는 사람도 있다. 거리의 긴장이 집 근처 생활 공간까지 그대로 스며든 것처럼 느껴진다.",
    situation:
      "전남대 앞의 일은 더 이상 먼 이야기가 아니다. 이웃들까지 불안해하는 모습을 보니, 내가 직접 본 일과 들은 말을 어떻게 전할지 더 신중해진다.",
    dialogue: [
      {
        name: "이웃",
        line: "학교 쪽 분위기가 심상치 않다던데 사실인가요?",
        avatar: "citizen",
      },
      {
        name: "이웃",
        line: "밖에서 무슨 일이 벌어지는지 몰라서 더 불안해요.",
        avatar: "mother",
      },
      {
        name: "나",
        line: "이 골목에도 불안이 그대로 번져 있다.",
        avatar: "player",
      },
    ],
    history:
      "광주의 상황은 곧 가정과 동네로 번졌고, 시민들은 가족과 이웃을 통해 소식을 공유하며 서로의 안부를 확인했다.",
    choices: [
      {
        text: "이웃들과 함께 라디오를 듣는다",
        detail:
          "불안만 커지지 않도록, 들려오는 방송과 실제 상황을 함께 확인해 본다.",
        nextSceneId: "radio_room",
        stat: "safety",
        statDelta: 1,
      },
      {
        text: "들은 말을 더 모아 다시 역 쪽으로 간다",
        detail:
          "동네의 분위기만으로 멈추지 않고, 다시 바깥으로 나가 상황의 흐름을 붙잡는다.",
        nextSceneId: "station_rumor",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "상황을 설명하며 시내로 향한다",
        detail:
          "이웃들에게 아는 만큼 설명한 뒤, 더 많은 사람이 모이는 시내 쪽으로 걸음을 옮긴다.",
        nextSceneId: "downtown",
        stat: "trust",
        statDelta: 1,
      },
    ],
  },
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
      {
        name: "동생",
        line: "밖에서 본 일들이 방송이랑 정말 다른 거야?",
        avatar: "youth",
      },
      {
        name: "나",
        line: "응. 내가 본 일과 지금 들리는 말이 너무 다르다.",
        avatar: "player",
      },
    ],
    history:
      "당시 일부 언론 보도는 현장의 현실을 충분히 전하지 못하거나 제한된 시각으로 전달했다. 그래서 시민들의 기록과 증언은 더욱 중요해졌다.",
    choices: [
      {
        text: "들은 말을 방 안에서 정리한다",
        detail:
          "거리에서 본 일과 방송 내용을 나란히 놓고 종이 위에 다시 정리해 본다.",
        nextSceneId: "leaflet_room",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "이웃에게 상황을 설명한다",
        detail:
          "집 안에 머무르지 않고, 직접 본 사실을 이웃에게 차분히 설명해 전한다.",
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
    objective:
      "들은 말과 본 장면을 다시 문장으로 정리하며, 무엇을 남길지 가다듬는다.",
    sceneType: "leaflet_room",
    text: "낡은 책상 위에 종이와 연필을 펴 둔다. 거리에서 본 장면, 라디오에서 들은 말, 이웃의 반응이 머릿속에서 뒤섞이다가 한 줄씩 문장이 되기 시작한다. 어떻게 적어야 나중에도 흔들리지 않을지 한참을 고쳐 쓰게 된다.",
    situation:
      "지금 이 방은 잠시 몸을 숨기는 공간이면서 동시에 사실을 정리하는 장소가 된다. 정확하게 남겨 두고 싶다는 마음이 조심스러운 문장을 고르게 만든다.",
    dialogue: [
      {
        name: "동생",
        line: "적어 두는 게 정말 도움이 될까?",
        avatar: "youth",
      },
      {
        name: "나",
        line: "지금은 그것부터라도 해야 할 것 같다.",
        avatar: "player",
      },
    ],
    history:
      "시민들이 남긴 메모와 문서, 증언은 이후 5·18의 진실을 복원하는 중요한 자료가 되었다.",
    choices: [
      {
        text: "정리한 메모를 들고 현장으로 나간다",
        detail:
          "방 안에서 고른 문장을 들고 다시 현장으로 나가, 더 많은 사실을 붙잡아 둔다.",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
        requirements: { record: 2 },
      },
      {
        text: "사람들이 모인 곳으로 가서 직접 전한다",
        detail:
          "정리한 말을 머릿속에 붙들고, 도청 앞 사람들 속으로 다시 걸어 들어간다.",
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
    objective:
      "정문을 피해 옆 골목으로 돌며 전남대학교 앞의 긴장을 더 가까이 느껴 본다.",
    sceneType: "side_alley_detour",
    text: "정문 쪽 큰길을 피하자 좁은 골목의 정적이 먼저 다가온다. 담장 끝에서 사람들이 고개만 내밀고 학교 쪽을 살피고 있고, 멀리서는 군인의 움직임과 짧은 고함이 어렴풋이 들린다. 골목조차 안전한 곳처럼 느껴지지 않는다.",
    situation:
      "정문으로 곧장 가는 길은 막혀 있다. 눈에 덜 띄는 쪽으로 움직일수록 오히려 지금 상황의 숨막힘이 더 선명해진다.",
    dialogue: [
      {
        name: "시민",
        line: "정문 쪽은 더 험합니다. 이 길로 돌아가 보세요.",
        avatar: "citizen",
      },
      {
        name: "나",
        line: "조심해서라도 끝까지 가 봐야겠다.",
        avatar: "player",
      },
    ],
    history:
      "계엄군이 대학 진입을 막으면서 학생들과 시민들은 정문뿐 아니라 주변 공간에서도 긴장을 마주해야 했다.",
    choices: [
      {
        text: "골목 끝까지 가서 정문 앞으로 붙는다",
        detail:
          "사람들이 숨을 죽인 채 서 있는 골목을 지나 전남대 정문 앞 상황을 직접 확인한다.",
        nextSceneId: "university_gate",
        stat: "courage",
        statDelta: 1,
      },
      {
        text: "몸을 낮추고 더 조심스럽게 우회한다",
        detail:
          "서두르지 않고 담장 쪽 좁은 길을 따라 움직이며 상황을 더 침착하게 살핀다.",
        nextSceneId: "university_gate",
        stat: "safety",
        statDelta: 1,
        requirements: { safety: 1 },
      },
      {
        text: "지금 본 분위기부터 먼저 적어 둔다",
        detail:
          "정문으로 더 다가서기 전에, 골목에 번진 긴장과 사람들의 반응을 기록으로 남긴다.",
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
      {
        name: "학생",
        line: "우리는 학교에 들어가려 했을 뿐인데 막혔어요.",
        avatar: "student",
      },
      {
        name: "시민",
        line: "여기서 무슨 일이 벌어지는지 시민들도 알아야 해요.",
        avatar: "citizen",
      },
      {
        name: "나",
        line: "눈앞의 일을 그냥 흘려보낼 수는 없다.",
        avatar: "player",
      },
    ],
    history:
      "5월 18일 전남대학교 정문 앞에서 시작된 학생들의 항의는 계엄군의 폭력적 진압과 함께 시내 전체로 확산되었다.",
    choices: [
      {
        text: "현장을 기록한다",
        detail:
          "교문 앞의 분위기와 사람들의 말을 기록해 나중에 남을 증언으로 남긴다.",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "시내로 이동하는 사람들을 따라간다",
        detail:
          "전남대 앞의 일이 시내로 어떻게 번지는지 보기 위해 사람들의 흐름을 따라간다.",
        nextSceneId: "downtown",
        stat: "courage",
        statDelta: 1,
      },
      {
        text: "학생들에게 다가가 정보를 얻는다",
        detail:
          "학생들의 말로 직접 상황을 듣고, 왜 이 자리에 모였는지 더 구체적으로 이해한다.",
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
    objective:
      "학생들의 이야기를 듣고, 지금 이들이 왜 이 자리에 서 있는지 더 가까이 이해해 본다.",
    sceneType: "university",
    text: "학생들은 작은 원을 만들어 서로의 말을 확인하고 있다. 두려움이 없는 것은 아니지만, 지금 물러서면 아무 일도 드러나지 않을 것이라는 생각이 그 자리를 붙들고 있는 듯하다. 그 말들을 가만히 듣고 있자 마음이 더 무거워진다.",
    situation:
      "말을 들을수록 학생들이 충동적으로 움직이고 있는 것이 아니라는 사실이 분명해진다. 이들과 함께 움직일지, 아니면 이 목소리를 먼저 남길지 스스로 정해야 한다.",
    dialogue: [
      {
        name: "학생",
        line: "계속 막혀 있을 수는 없어요. 더 많은 사람이 알아야 해요.",
        avatar: "student",
      },
      {
        name: "청년",
        line: "지금 일어난 일을 밖에 알리지 않으면 아무도 모를 겁니다.",
        avatar: "youth",
      },
      {
        name: "나",
        line: "먼저 정확히 듣고, 내가 할 수 있는 일을 생각해 보자.",
        avatar: "player",
      },
    ],
    history:
      "5월 18일 학생들은 교정과 도서관 주변에 모여 상황을 논의했고, 곧 시내로 이동해 시민들에게 현실을 알리기 시작했다.",
    choices: [
      {
        text: "학생들과 함께 시내로 나간다",
        detail:
          "학생들과 함께 시내로 이동하며 학교 앞의 상황이 시민들에게 어떻게 전해지는지 지켜본다.",
        nextSceneId: "downtown",
        stat: "courage",
        statDelta: 1,
      },
      {
        text: "현장을 기록한다",
        detail:
          "바로 움직이기보다 학생들의 말과 현장의 공기를 기록으로 남기는 데 집중한다.",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
      },
    ],
  },
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
      {
        name: "시민 A",
        line: "이대로 침묵하면 밖에서는 아무 일도 없었던 것처럼 알 겁니다.",
        avatar: "citizen",
      },
      {
        name: "시민 B",
        line: "서로 흩어지지 말고, 다치지 않게 조심합시다.",
        avatar: "citizen",
      },
    ],
    history:
      "5월 20일을 전후해 광주 시내에는 더 많은 시민이 모였고, 항쟁은 학생 중심의 움직임에서 시민 전체의 참여로 확대되었다.",
    choices: [
      {
        text: "시장 쪽으로 번지는 분위기를 살핀다",
        detail:
          "금남로 인근 시장과 생활 공간까지 상황이 어떻게 번지고 있는지 확인한다.",
        nextSceneId: "market_people",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "다친 사람을 돕는다",
        detail:
          "행렬의 중심보다 그 곁에서 다친 사람과 불안한 사람을 돌보는 일을 먼저 맡는다.",
        nextSceneId: "help_people",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "현장을 기록한다",
        detail:
          "금남로에 모인 사람들의 표정과 구호, 거리의 흐름을 기록으로 남긴다.",
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
    objective:
      "학생들만의 일이 아니게 된 지금, 상인과 주민들의 목소리를 더 가까이 듣는다.",
    sceneType: "market_people",
    text: "금남로 옆 시장 골목에도 셔터를 반쯤 내린 가게와 길가 좌판 사이로 사람들이 모여 있다. 장사를 하던 손이 멈췄고, 학생들 이야기만 하던 입에서는 이제 가족과 동네, 시내 전체의 일이 함께 나온다. 일상과 긴장이 같은 자리에 겹쳐 있다.",
    situation:
      "시장에 모인 사람들의 말은 상황이 더 넓게 번졌다는 사실을 보여 준다. 이곳에서는 누가 앞장섰는가보다 모두가 어떤 표정으로 현실을 받아들이고 있는지가 더 크게 느껴진다.",
    dialogue: [
      {
        name: "상인",
        line: "학생들만의 일이라고 하기에는 벌써 너무 멀리 왔어요.",
        avatar: "merchant",
      },
      {
        name: "주민",
        line: "다들 뭘 해야 할지 몰라서 더 불안한 거죠.",
        avatar: "citizen",
      },
      {
        name: "나",
        line: "시장의 공기까지 바뀌어 버렸다.",
        avatar: "player",
      },
    ],
    history:
      "항쟁이 확산되면서 광주의 생활 공간들, 특히 시장과 도심 골목에서도 시민들의 논의와 참여가 활발해졌다.",
    choices: [
      {
        text: "사람들의 말을 모아 기록한다",
        detail:
          "시장 상인과 주민들의 반응을 더 모아 두고, 시민들의 목소리가 어떻게 넓어지는지 남긴다.",
        nextSceneId: "record_scene",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "다친 사람을 돌보는 쪽으로 간다",
        detail:
          "이야기를 더 듣기보다 당장 손이 필요한 자리로 이동해 공동체의 움직임에 합류한다.",
        nextSceneId: "street_clinic",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "도청 앞 사람들 속으로 다시 들어간다",
        detail:
          "시장까지 번진 이 분위기가 도청 앞에서는 어떻게 모이는지 확인하러 발걸음을 옮긴다.",
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
      {
        name: "시민",
        line: "지금 본 일은 꼭 남겨 두어야 합니다.",
        avatar: "citizen",
      },
      { name: "나", line: "기억이 흐려지기 전에 적어 두자.", avatar: "player" },
    ],
    history:
      "5·18민주화운동의 기록과 증언은 훗날 진상 규명과 기억의 근거가 되었고, 관련 기록은 유네스코 세계기록유산으로 등재되었다.",
    choices: [
      {
        text: "임시 돌봄터까지 가서 더 살핀다",
        detail:
          "기록만으로 멈추지 않고, 다친 사람들과 그들을 돌보는 손길이 모인 곳으로 향한다.",
        nextSceneId: "street_clinic",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "사람들의 발언을 더 모으러 간다",
        detail:
          "현장의 증언을 더 모아, 서로 다른 목소리들이 무엇을 말하고 있는지 차분히 정리한다.",
        nextSceneId: "citizen_voice",
        stat: "record",
        statDelta: 1,
      },
    ],
  },
  {
    id: "street_clinic",
    stageNum: 9,
    stageTitle: "임시 돌봄터",
    date: "1980.05.21",
    location: "수기동 골목",
    objective:
      "돌봄이 필요한 자리에서 시민들이 서로를 살피는 모습을 확인하고, 내 역할을 찾는다.",
    sceneType: "street_clinic",
    text: "건물 처마 아래와 길 가장자리에 물통과 수건, 담요가 놓여 있다. 시민들은 다친 사람의 상태를 살피고, 누군가는 길을 비켜 달라며 사람들을 정리한다. 여기서는 큰 구호보다 작은 손길이 훨씬 분주하다.",
    situation:
      "광주의 시간은 맞서는 장면만으로 이뤄지지 않는다. 이 돌봄터에서는 시민들이 서로를 어떻게 살피고 버티게 했는지가 더 분명하게 드러난다.",
    dialogue: [
      {
        name: "시민",
        line: "기록도 중요하지만 지금은 손이 더 필요합니다.",
        avatar: "citizen",
      },
      {
        name: "나",
        line: "도울 수 있는 만큼 돕고, 본 것도 잊지 말자.",
        avatar: "player",
      },
    ],
    history:
      "항쟁 기간 동안 광주 시민들은 부상자를 돌보고 서로를 보호하기 위해 여러 임시 돌봄과 지원의 자리를 만들었다.",
    choices: [
      {
        text: "돌봄의 흐름에 본격적으로 합류한다",
        detail:
          "물과 수건, 안내와 연락 등 지금 당장 필요한 일을 맡으며 공동체의 한가운데로 들어간다.",
        nextSceneId: "help_people",
        stat: "trust",
        statDelta: 1,
      },
      {
        text: "물자 전달을 맡아 더 바깥까지 움직인다",
        detail:
          "한 자리에 머무르지 않고, 필요한 물자와 소식을 다른 자리까지 이어 나른다.",
        nextSceneId: "supply_run",
        stat: "safety",
        statDelta: 1,
      },
    ],
  },
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
      "5·18민주화운동은 계엄 해제와 민주주의 회복, 시민의 존엄을 요구한 광주 시민들의 항쟁이었다.",
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
      "도청 앞과 시내 곳곳에서는 이후의 행동을 두고 시민들 사이의 다양한 논의가 이어졌다.",
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
      "항쟁 기간 광주 시민들은 서로를 돕고 스스로 질서를 지키려 애썼다. 5월 22일부터 26일까지는 시민들이 자율적으로 공동체를 유지한 시기로 기억된다.",
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
      "시민들은 자율적으로 역할을 나누며 물자와 정보, 돌봄을 이어 공동체의 질서를 유지해 나갔다.",
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
  {
    id: "checkpoint_edge",
    stageNum: 12,
    stageTitle: "외곽 검문",
    date: "1980.05.23-05.26",
    location: "지원동 길목",
    objective:
      "도시 바깥으로 사실을 전하기 전, 외곽 검문소의 긴장과 우회 가능성을 살핀다.",
    sceneType: "checkpoint_edge",
    text: "광주 외곽으로 향하는 길목에는 바리케이드와 군인의 그림자가 걸려 있다. 길은 열려 있는 듯하면서도 쉽게 지나갈 수 없고, 멀리 시내 쪽을 돌아보는 순간 다시 발걸음이 무거워진다. 이 길을 통과하는 일은 단순한 이동이 아니라 사실을 밖으로 내보내는 시도처럼 느껴진다.",
    situation:
      "밖으로 나가려면 용기만으로는 부족하다. 사람을 살피고 길을 고르고 때를 재는 신중함이 함께 필요하다는 사실이 이 검문소 앞에서 더 크게 다가온다.",
    dialogue: [
      {
        name: "친구",
        line: "큰길은 너무 눈에 띄어. 조금 더 살펴보자.",
        avatar: "friend",
      },
      {
        name: "나",
        line: "여기서 서두르면 오히려 아무것도 전하지 못할 수 있다.",
        avatar: "player",
      },
    ],
    history:
      "광주 밖으로 사실을 전하는 일은 쉽지 않았고, 시민들은 여러 방식으로 기록과 소식을 밖으로 연결하려 애썼다.",
    choices: [
      {
        text: "사람이 드문 길을 따라 더 나아간다",
        detail:
          "눈에 덜 띄는 쪽으로 움직이며 기록과 소식을 밖으로 전할 가능성을 계속 살핀다.",
        nextSceneId: "outside_message",
        stat: "safety",
        statDelta: 1,
      },
      {
        text: "우회로를 택해 더 조심스럽게 빠져나간다",
        detail:
          "한 번에 통과하려 하기보다, 더 안전한 우회로를 골라 상황을 밖으로 잇는다.",
        nextSceneId: "outside_message",
        stat: "safety",
        statDelta: 1,
        requirements: { safety: 2 },
      },
      {
        text: "다시 시내로 돌아가 공동체 쪽에 힘을 보탠다",
        detail:
          "당장 바깥으로 나가기보다, 다시 시민들 곁으로 돌아가 공동체를 지탱하는 쪽을 택한다.",
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
      {
        name: "친구",
        line: "정확하게 남겨야 해. 그래야 나중에도 흔들리지 않아.",
        avatar: "friend",
      },
      {
        name: "나",
        line: "우리가 직접 본 것과 들은 것만 사실대로 적자.",
        avatar: "player",
      },
    ],
    history:
      "5·18민주화운동의 진실은 시민들의 증언과 사진, 문서, 국내외 기록을 통해 이후에도 계속 밝혀졌다.",
    choices: [
      {
        text: "증언을 모아 기록으로 남긴다",
        detail:
          "흩어진 목격담을 한데 모아, 이후에도 사실을 증명할 자료로 정리한다.",
        nextSceneId: "archive_ending",
        stat: "record",
        statDelta: 1,
      },
      {
        text: "도청 인근의 마지막 논의 자리로 돌아간다",
        detail:
          "광주 밖으로만 시선을 두지 않고, 남아 있는 사람들의 마지막 선택을 직접 지켜보러 돌아간다.",
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
      {
        name: "상인",
        line: "값은 나중 일입니다. 필요한 사람에게 먼저 드리세요.",
        avatar: "merchant",
      },
      {
        name: "학생",
        line: "우리가 스스로 질서를 지켜야 지금의 뜻도 제대로 전해집니다.",
        avatar: "student",
      },
      {
        name: "나",
        line: "서로를 지키는 마음이 이 도시를 버티게 하고 있다.",
        avatar: "player",
      },
    ],
    history:
      "5월 22일부터 26일까지 광주는 시민들이 자율적으로 질서를 유지하고 공동체를 지켜 낸 시간으로 기억된다.",
    choices: [
      {
        text: "도청 인근의 마지막 회의로 간다",
        detail:
          "남을 사람과 기록을 맡을 사람이 어떤 말을 나누는지 끝까지 지켜보기 위해 자리를 옮긴다.",
        nextSceneId: "night_meeting",
        stat: "courage",
        statDelta: 1,
      },
      {
        text: "기록을 정리해 남긴다",
        detail:
          "지금까지 모은 말과 장면을 정리해, 이후에도 남을 기록으로 붙들어 둔다.",
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
    objective:
      "남을 사람, 떠날 사람, 기록을 맡을 사람이 마지막으로 나누는 말을 지켜본다.",
    sceneType: "night_meeting",
    text: "희미한 전등 아래 몇 사람이 둘러앉아 있다. 누군가는 끝까지 남겠다고 하고, 누군가는 적어도 밖으로 남겨야 할 말이 있다고 한다. 큰소리로 다투는 사람은 없지만 방 안 공기에는 무거운 결심이 차곡차곡 쌓여 간다.",
    situation:
      "이 회의는 단순히 찬반을 가르는 자리가 아니다. 각자 무엇을 지키고 어떤 방식으로 남기려 하는지, 마지막으로 확인하는 시간에 더 가깝게 느껴진다.",
    dialogue: [
      {
        name: "학생",
        line: "남는 일도 필요하고, 기록을 남기는 일도 필요합니다.",
        avatar: "student",
      },
      {
        name: "시민",
        line: "무엇을 하든 누군가는 기억을 맡아야 합니다.",
        avatar: "citizen",
      },
      {
        name: "나",
        line: "이 밤의 말들이 오래 남을 것 같다.",
        avatar: "player",
      },
    ],
    history:
      "항쟁의 마지막을 앞두고 시민들은 남을 것인지, 기록을 어떻게 남길 것인지에 대한 무거운 논의를 이어 갔다.",
    choices: [
      {
        text: "남아 있는 사람들과 새벽을 맞는다",
        detail:
          "위험을 알면서도 도청에 남아, 그 마지막 시간을 직접 지켜보는 쪽을 택한다.",
        nextSceneId: "last_night",
        stat: "courage",
        statDelta: 1,
        requirements: { courage: 3 },
      },
      {
        text: "들은 말을 정리해 기록으로 남긴다",
        detail:
          "이 밤의 논의가 흩어지지 않도록, 남아 있는 사람들의 말과 분위기를 정리해 둔다.",
        nextSceneId: "archive_ending",
        stat: "record",
        statDelta: 1,
        requirements: { record: 4 },
      },
      {
        text: "마지막까지 마음을 정리하며 도청으로 향한다",
        detail:
          "아직 완전히 결심이 선 것은 아니지만, 결국 그 새벽을 외면하지 않기로 한다.",
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
      {
        name: "시민",
        line: "우리가 이 자리에 있었다는 사실만은 꼭 남아야 할 겁니다.",
        avatar: "citizen",
      },
      {
        name: "나",
        line: "잊지 않겠습니다. 그리고 전하겠습니다.",
        avatar: "player",
      },
    ],
    history:
      "1980년 5월 27일 새벽, 계엄군의 전남도청 진압으로 항쟁은 막을 내렸지만 5·18민주화운동은 이후 한국 민주주의 역사에 깊이 남았다.",
    choices: [
      {
        text: "엔딩 보기",
        detail: "그날 이후에도 이어지는 기억과 기록의 의미를 돌아본다.",
        nextSceneId: "memory_ending",
      },
    ],
  },
  {
    id: "archive_ending",
    stageNum: 15,
    stageTitle: "기록을 남기다",
    date: "이후",
    location: "5·18민주화운동기록관",
    objective: "남겨 둔 기록이 어떤 의미를 갖게 되는지 돌아본다.",
    sceneType: "ending",
    text: "그날 들은 말과 본 장면을 흩어지지 않게 붙잡아 둔 기록은 시간이 흐르며 단순한 메모를 넘어 증언이 되었다. 이름과 시간, 장소와 표정을 적어 둔 문장들은 훗날 사실을 밝히고 왜곡에 맞서는 근거가 되었다.",
    situation:
      "그때는 그저 적어 두어야 한다는 마음뿐이었지만, 시간이 지나고 나니 그 기록이 얼마나 큰 의미를 갖는지 알게 된다. 남겨 둔 문장들은 5·18을 기억하는 근거가 된다.",
    dialogue: [
      {
        name: "나",
        line: "기억은 저절로 남지 않는다. 누군가가 기록하고 지켜야 한다.",
        avatar: "player",
      },
    ],
    history:
      "5·18 관련 기록은 국가기록원과 5·18민주화운동기록관 등에서 보존되고 있으며, 왜곡을 막는 중요한 근거가 되고 있다.",
    isEnding: true,
    choices: [
      {
        text: "처음으로 돌아가기",
        detail:
          "다시 처음으로 돌아가, 다른 장면과 선택의 흐름을 차분히 살펴본다.",
        nextSceneId: "start",
      },
    ],
  },
  {
    id: "memory_ending",
    stageNum: 15,
    stageTitle: "기억의 자리",
    date: "현재",
    location: "국립5·18민주묘지",
    objective: "그날 이후 오늘의 우리에게 남겨진 질문을 돌아본다.",
    sceneType: "ending",
    text: "5·18은 과거의 한 장면으로만 머물지 않는다. 누가 위험 속에서도 사실을 알리려 했고, 누가 서로를 지켰으며, 누가 기록을 남겼는가에 대한 질문은 오늘의 우리에게도 이어진다. 기억은 사건이 끝난 뒤에도 그 의미를 붙드는 사람들 속에서 계속 살아남는다.",
    situation:
      "이 이야기는 단지 지나간 장면을 보는 데서 끝나지 않는다. 5·18을 어떻게 기억하고 어떤 왜곡에 맞설 것인지, 지금도 계속 질문받고 있다.",
    dialogue: [
      {
        name: "나",
        line: "5·18은 지금도 기억되고 지켜져야 할 역사입니다.",
        avatar: "player",
      },
    ],
    history:
      "5·18민주화운동은 민주주의, 인권, 연대의 가치를 상징하는 역사적 사건으로 기억되고 있다.",
    isEnding: true,
    choices: [
      {
        text: "다시 처음부터",
        detail:
          "처음 장면으로 돌아가, 다른 흐름 속에서 5·18의 장면들을 다시 따라가 본다.",
        nextSceneId: "start",
      },
    ],
  },
];

// 실제 광주 지리 반영: 서(左)=광주역·전남대, 중=금남로, 동(右)=전남도청
// y: 위(小)=북, 아래(大)=남
export const mapNodes = [
  {
    id: "start",
    label: "광주역",
    x: 25,
    y: 62,
    connections: ["station_rumor", "call_family", "observe_street"],
  },
  {
    id: "observe_street",
    label: "거리",
    x: 42,
    y: 48,
    connections: ["station_rumor", "radio_room"],
  },
  {
    id: "station_rumor",
    label: "역광장",
    x: 56,
    y: 60,
    connections: ["side_alley_detour", "call_family", "radio_room"],
  },
  {
    id: "call_family",
    label: "양동전화",
    x: 18,
    y: 82,
    connections: ["family_neighborhood", "downtown"],
  },
  {
    id: "family_neighborhood",
    label: "양동골목",
    x: 24,
    y: 94,
    connections: ["radio_room", "station_rumor", "downtown"],
  },
  {
    id: "radio_room",
    label: "양동주택",
    x: 40,
    y: 98,
    connections: ["leaflet_room", "citizen_voice"],
  },
  {
    id: "leaflet_room",
    label: "양동방",
    x: 58,
    y: 98,
    connections: ["record_scene", "citizen_voice"],
  },
  {
    id: "side_alley_detour",
    label: "용봉골목",
    x: 70,
    y: 32,
    connections: ["university_gate", "record_scene"],
  },
  {
    id: "university_gate",
    label: "전남대",
    x: 84,
    y: 18,
    connections: ["record_scene", "downtown", "talk_students"],
  },
  {
    id: "talk_students",
    label: "학생들",
    x: 104,
    y: 10,
    connections: ["downtown", "record_scene"],
  },
  {
    id: "record_scene",
    label: "충장로",
    x: 118,
    y: 42,
    connections: ["street_clinic", "citizen_voice"],
  },
  {
    id: "downtown",
    label: "금남로",
    x: 135,
    y: 60,
    connections: ["market_people", "help_people", "record_scene"],
  },
  {
    id: "market_people",
    label: "대인시장",
    x: 148,
    y: 68,
    connections: ["record_scene", "street_clinic", "citizen_voice"],
  },
  {
    id: "street_clinic",
    label: "수기동",
    x: 136,
    y: 84,
    connections: ["help_people", "supply_run"],
  },
  {
    id: "citizen_voice",
    label: "도청앞",
    x: 158,
    y: 36,
    connections: ["citizen_debate", "help_people"],
  },
  {
    id: "citizen_debate",
    label: "YMCA앞",
    x: 172,
    y: 42,
    connections: ["community", "checkpoint_edge", "help_people"],
  },
  {
    id: "help_people",
    label: "수기일대",
    x: 152,
    y: 74,
    connections: ["supply_run", "checkpoint_edge"],
  },
  {
    id: "supply_run",
    label: "불로동",
    x: 168,
    y: 80,
    connections: ["community", "citizen_debate"],
  },
  {
    id: "checkpoint_edge",
    label: "지원동",
    x: 182,
    y: 94,
    connections: ["outside_message", "community"],
  },
  {
    id: "outside_message",
    label: "지원외곽",
    x: 196,
    y: 96,
    connections: ["archive_ending", "night_meeting"],
  },
  {
    id: "community",
    label: "금남로",
    x: 184,
    y: 56,
    connections: ["night_meeting", "archive_ending"],
  },
  {
    id: "night_meeting",
    label: "YMCA",
    x: 198,
    y: 44,
    connections: ["last_night", "archive_ending"],
  },
  {
    id: "last_night",
    label: "도청",
    x: 206,
    y: 34,
    connections: ["memory_ending"],
  },
  { id: "archive_ending", label: "기록관", x: 214, y: 80, connections: [] },
  { id: "memory_ending", label: "묘지", x: 225, y: 56, connections: [] },
];

export const TOTAL_STAGES = scenes.length;
