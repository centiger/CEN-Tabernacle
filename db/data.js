window.CEN_TABERNACLE_DATA = {
  menu: [
    { id:'tabernacle', group:'성막', title:'성막', subtitle:'하나님의 임재가 임하신 이동식 성전', icon:'⛺', type:'tabernacle' },
    { id:'solomon', group:'성전', title:'솔로몬 성전', subtitle:'솔로몬이 건축한 첫 번째 성전', icon:'🏛️', type:'temple' },
    { id:'zerubbabel', group:'성전', title:'스룹바벨 성전', subtitle:'바벨론 귀환 후 재건된 성전', icon:'🏛️', type:'temple' },
    { id:'herod', group:'성전', title:'헤롯 성전', subtitle:'예수님 시대의 웅장한 성전', icon:'🏰', type:'temple' }
  ],
  spaces: {
    tabernacle: [
      {id:'entrance', name:'입구', icon:'🚪', x:33, y:70, desc:'성막으로 들어가는 유일한 문입니다.', bible:'출애굽기 27:16', meaning:'하나님께 나아가는 길은 임의가 아니라 하나님이 정하신 길을 통해 시작됩니다.'},
      {id:'altar', name:'번제단', icon:'🔥', x:43, y:58, desc:'희생 제물이 드려지는 바깥뜰의 중심 기구입니다.', bible:'출애굽기 27:1-8', meaning:'죄 사함과 헌신, 그리스도의 희생을 예표합니다.'},
      {id:'laver', name:'물두멍', icon:'💧', x:51, y:48, desc:'제사장이 성소에 들어가기 전 씻는 곳입니다.', bible:'출애굽기 30:17-21', meaning:'거룩하신 하나님 앞에 나아가기 위한 정결을 보여줍니다.'},
      {id:'holy', name:'성소', icon:'🕯️', x:59, y:39, desc:'떡상, 등잔대, 분향단이 놓인 예배 공간입니다.', bible:'출애굽기 26:33-35', meaning:'하나님과의 교제, 빛, 기도를 상징합니다.'},
      {id:'veil', name:'휘장', icon:'🧵', x:65, y:34, desc:'성소와 지성소를 구분하는 막입니다.', bible:'출애굽기 26:31-33', meaning:'거룩하신 하나님께 직접 나아갈 수 없음을 보여줍니다.'},
      {id:'ark', name:'언약궤와 속죄소', icon:'📦', x:70, y:30, desc:'지성소 안에 있는 하나님의 임재를 상징하는 중심 기구입니다.', bible:'출애굽기 25:10-22', meaning:'속죄와 언약, 하나님의 임재를 상징합니다.'}
    ],
    solomon: [
      {id:'porch', name:'낭실', icon:'🚪', x:39, y:64, desc:'성전으로 들어가는 현관 공간입니다.', bible:'열왕기상 6:3', meaning:'성전 예배로 들어가는 시작점입니다.'},
      {id:'altar', name:'번제단', icon:'🔥', x:47, y:56, desc:'성전 앞뜰의 제사 중심입니다.', bible:'역대하 4:1', meaning:'희생 제사의 중심을 보여줍니다.'},
      {id:'holy', name:'성소', icon:'🕯️', x:58, y:43, desc:'제사장이 섬기는 성전 내부 공간입니다.', bible:'열왕기상 6:17', meaning:'하나님 앞에서 드리는 지속적 예배를 상징합니다.'},
      {id:'mostholy', name:'지성소', icon:'📦', x:69, y:33, desc:'언약궤가 놓인 가장 거룩한 공간입니다.', bible:'열왕기상 6:19', meaning:'하나님의 임재와 언약의 중심입니다.'}
    ],
    zerubbabel: [
      {id:'return', name:'귀환과 재건', icon:'🧱', x:38, y:63, desc:'포로 귀환 후 다시 세워진 성전입니다.', bible:'에스라 3:8-13', meaning:'무너진 예배의 회복을 보여줍니다.'},
      {id:'altar', name:'제단 회복', icon:'🔥', x:49, y:53, desc:'성전 재건 전 먼저 제단을 세웠습니다.', bible:'에스라 3:2-6', meaning:'예배 회복은 제단 회복에서 시작됩니다.'},
      {id:'temple', name:'성전 완공', icon:'🏛️', x:62, y:40, desc:'어려움 속에서도 성전이 완공되었습니다.', bible:'에스라 6:14-16', meaning:'하나님의 약속은 역사 속에서 회복을 이룹니다.'}
    ],
    herod: [
      {id:'court', name:'성전 뜰', icon:'👥', x:34, y:65, desc:'많은 사람이 드나들던 넓은 성전 공간입니다.', bible:'누가복음 21:37', meaning:'예배와 가르침이 만나는 공적 공간입니다.'},
      {id:'gate', name:'미문', icon:'🚪', x:46, y:55, desc:'성전으로 들어가는 아름다운 문으로 알려져 있습니다.', bible:'사도행전 3:2', meaning:'회복과 복음 선포의 장소로 기억됩니다.'},
      {id:'sanctuary', name:'성전 본체', icon:'🏛️', x:62, y:39, desc:'예수님 시대의 성전 중심부입니다.', bible:'마태복음 24:1-2', meaning:'외형의 웅장함보다 참된 예배가 중요함을 보여줍니다.'}
    ]
  }
};
