import type { Scene } from "../../types";

export const stage6Scenes: Scene[] = [
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
      { name: "나", line: "기억은 저절로 남지 않는다. 누군가가 기록하고 지켜야 한다.", avatar: "player" },
    ],
    history:
      "5·18 관련 기록은 국가기록원과 5·18민주화운동기록관 등에서 보존되고 있으며, 왜곡을 막는 중요한 근거가 되고 있다.",
    isEnding: true,
    choices: [
      {
        text: "처음으로 돌아가기",
        detail: "다시 처음으로 돌아가, 다른 장면과 선택의 흐름을 차분히 살펴본다.",
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
      { name: "나", line: "5·18은 지금도 기억되고 지켜져야 할 역사입니다.", avatar: "player" },
    ],
    history:
      "5·18민주화운동은 민주주의, 인권, 연대의 가치를 상징하는 역사적 사건으로 기억되고 있다.",
    isEnding: true,
    choices: [
      {
        text: "다시 처음부터",
        detail: "처음 장면으로 돌아가, 다른 흐름 속에서 5·18의 장면들을 다시 따라가 본다.",
        nextSceneId: "start",
      },
    ],
  },
];
