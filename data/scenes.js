window.CEN_SCENES = [
  {
    id:'overview', order:0, icon:'🏕️', title:'성막 전체', section:'드론뷰',
    image:'scene/scene-overview.jpg', fit:'contain', minScale:1, maxScale:4,
    one:'광야 가운데 세워진 예배의 중심 공간',
    summary:'성막은 하나님께서 이스라엘 백성 가운데 거하시기 위해 세우게 하신 이동식 성소입니다. 전체 구조를 먼저 조망한 뒤 예배 동선을 따라 들어갑니다.',
    bible:'출애굽기 25:8-9, 40:34-38',
    meaning:'성막은 하나님께 나아가는 길을 공간으로 보여줍니다. 입구에서 시작해 희생, 씻음, 성소, 지성소로 이어지는 흐름이 핵심입니다.',
    hotspots:[
      {target:'altar', x:39, y:63, label:'🔥 번제단'},
      {target:'laver', x:50, y:56, label:'💧 물두멍'},
      {target:'sanctuary', x:62, y:45, label:'🕎 성소'},
      {target:'ark', x:72, y:40, label:'📦 지성소'}
    ]
  },
  {
    id:'altar', order:1, icon:'🔥', title:'번제단', section:'바깥뜰',
    image:'scene/scene-altar.jpg', fit:'cover', minScale:1, maxScale:5,
    one:'희생 제물이 드려지는 바깥뜰의 중심 기구',
    summary:'번제단은 성막에 들어와 가장 먼저 마주하는 기구입니다. 제사는 하나님께 나아가기 위한 속죄와 헌신의 출발점이었습니다.',
    bible:'출애굽기 27:1-8, 레위기 1장',
    meaning:'하나님께 나아감은 인간의 선함이 아니라 속죄의 길에서 시작됩니다.',
    hotspots:[{target:'laver', x:58, y:50, label:'💧 물두멍'}]
  },
  {
    id:'laver', order:2, icon:'💧', title:'물두멍', section:'바깥뜰',
    image:'scene/scene-laver.jpg', fit:'cover', minScale:1, maxScale:5,
    one:'제사장이 손과 발을 씻는 정결의 장소',
    summary:'물두멍은 번제단과 성소 사이에 놓였습니다. 제사장들은 성소에 들어가기 전에 손과 발을 씻어야 했습니다.',
    bible:'출애굽기 30:18-21',
    meaning:'물두멍은 하나님께 가까이 나아가는 자에게 필요한 정결을 보여줍니다.',
    hotspots:[{target:'sanctuary', x:64, y:47, label:'🕎 성소'}]
  },
  {
    id:'sanctuary', order:3, icon:'🕎', title:'성소', section:'성막 내부',
    image:'scene/scene-sanctuary.jpg', fit:'cover', minScale:1, maxScale:5,
    one:'떡상, 금 등잔대, 분향단이 있는 섬김의 공간',
    summary:'성소 안에는 떡상, 금 등잔대, 분향단이 있었습니다. 제사장의 일상적 섬김이 이루어지는 장소입니다.',
    bible:'출애굽기 25:23-40, 30:1-10',
    meaning:'성소는 하나님 앞에서 살아가는 백성의 공급, 빛, 기도를 상징적으로 보여줍니다.',
    hotspots:[{target:'ark', x:72, y:45, label:'📦 지성소'}]
  },
  {
    id:'ark', order:4, icon:'📦', title:'언약궤와 지성소', section:'지성소',
    image:'scene/scene-ark.jpg', fit:'cover', minScale:1, maxScale:5,
    one:'하나님의 임재를 상징하는 가장 거룩한 공간',
    summary:'지성소에는 언약궤와 속죄소가 있었습니다. 대제사장이 속죄일에 들어가는 가장 거룩한 장소였습니다.',
    bible:'출애굽기 25:10-22, 레위기 16장',
    meaning:'지성소는 하나님 임재와 속죄의 절정을 보여줍니다. 인간이 함부로 들어가는 공간이 아니라 하나님이 길을 여시는 공간입니다.',
    hotspots:[]
  }
];
