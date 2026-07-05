const data = window.CEN_TABERNACLE_DATA;
let deferredPrompt = null;
let currentMode = null;
let currentSpaces = [];
let currentIndex = 0;
let activeTab = 'overview';
let lastSelectedId = null;

const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.remove('hidden');
});
installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.classList.add('hidden');
});

function renderMenu(){
  const tab = document.getElementById('tabernacleCards');
  const temples = document.getElementById('templeCards');
  data.menu.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.mode = item.id;
    card.innerHTML = `<div class="thumb"></div><div class="cardBody"><div class="icon">${item.icon}</div><div><h3>${item.title}</h3><p>${item.subtitle}</p></div><button class="arrow">›</button></div>`;
    card.addEventListener('click', () => openExplore(item.id));
    (item.group === '성막' ? tab : temples).appendChild(card);
  });
}

function openExplore(mode){
  currentMode = mode;
  currentSpaces = data.spaces[mode] || [];
  currentIndex = 0;
  const item = data.menu.find(m => m.id === mode);
  document.getElementById('viewTitle').textContent = item.title;
  document.getElementById('viewSub').textContent = item.group + ' 공간 탐험';
  document.getElementById('exploreView').classList.remove('hidden');
  document.getElementById('detailSheet').classList.remove('expanded');
  const stage = document.getElementById('stage');
  stage.classList.remove('zoomed','interior','entering','holyRoom','mostHolyRoom','veilRoom');
  stage.style.setProperty('--focus-x', '50%');
  stage.style.setProperty('--focus-y', '45%');
  stage.classList.toggle('temple', item.type === 'temple');
  stage.dataset.mode = item.id;
  renderMarkers();
  setCaption('');
  selectSpace(0, {intro:true});
  history.pushState({view:'explore'}, '', '#explore-' + mode);
}

function closeExplore(){
  document.getElementById('exploreView').classList.add('hidden');
  if (location.hash.startsWith('#explore')) history.pushState('', document.title, location.pathname + location.search);
}

function renderMarkers(){
  const wrap = document.getElementById('markers');
  wrap.innerHTML = '';
  currentSpaces.forEach((space, idx) => {
    const marker = document.createElement('button');
    marker.className = 'marker';
    marker.style.left = space.x + '%';
    marker.style.top = space.y + '%';
    marker.textContent = idx + 1;
    marker.title = space.name;
    marker.addEventListener('click', () => selectSpace(idx));
    wrap.appendChild(marker);
  });
}


function isInteriorSpace(space){
  return ['holy','veil','ark','mostholy','sanctuary'].includes(space.id);
}
function interiorType(space){
  if(space.id === 'ark' || space.id === 'mostholy') return 'mostHolyRoom';
  if(space.id === 'veil') return 'veilRoom';
  if(space.id === 'holy' || space.id === 'sanctuary') return 'holyRoom';
  return '';
}
function renderInterior(space){
  const scene = document.getElementById('interiorScene');
  if(!scene) return;
  let html = '';
  if(space.id === 'holy' || space.id === 'sanctuary'){
    html = `
      <div class="roomGlow"></div>
      <div class="curtain back"></div>
      <button class="furn lamp" data-label="금 등잔대">🕎<span>금 등잔대</span></button>
      <button class="furn table" data-label="떡상">🍞<span>떡상</span></button>
      <button class="furn incense" data-label="분향단">🔥<span>분향단</span></button>
      <div class="floorLines"></div>`;
  } else if(space.id === 'veil'){
    html = `
      <div class="roomGlow"></div>
      <div class="veilCurtain"><span></span><span></span><span></span></div>
      <div class="veilText">휘장 너머 지성소</div>`;
  } else {
    html = `
      <div class="roomGlow"></div>
      <div class="arkBox"><div class="cherub left">𓅃</div><div class="mercy">속죄소</div><div class="cherub right">𓅃</div></div>
      <div class="shekinah"></div>
      <div class="veilText">언약궤와 속죄소</div>`;
  }
  scene.innerHTML = html;
  scene.querySelectorAll('.furn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const label = btn.dataset.label || '기구';
      document.getElementById('detailTitle').textContent = label;
      document.getElementById('detailDesc').textContent = label + '를 가까이 보고 있습니다.';
      const content = document.getElementById('tabContent');
      if(label.includes('등잔대')) content.textContent = '성소를 밝히는 일곱 등잔입니다. 하나님의 빛과 생명의 인도를 상징합니다.';
      else if(label.includes('떡상')) content.textContent = '진설병이 놓이는 상입니다. 하나님 앞의 교제와 공급을 보여줍니다.';
      else content.textContent = '향이 올라가는 제단입니다. 하나님께 올라가는 기도와 예배를 상징합니다.';
      document.getElementById('detailSheet').classList.add('expanded');
      scene.querySelectorAll('.furn').forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function selectSpace(idx, opts={}){
  if (!currentSpaces.length) return;
  currentIndex = (idx + currentSpaces.length) % currentSpaces.length;
  const s = currentSpaces[currentIndex];
  const stage = document.getElementById('stage');
  const enteringInterior = isInteriorSpace(s);
  stage.classList.remove('interior','entering','holyRoom','mostHolyRoom','veilRoom');
  stage.style.setProperty('--focus-x', s.x + '%');
  stage.style.setProperty('--focus-y', s.y + '%');
  stage.classList.add('zoomed','entering');
  setTimeout(()=>stage.classList.remove('entering'), 680);
  if(enteringInterior){
    renderInterior(s);
    setTimeout(()=>{
      if(currentSpaces[currentIndex] && currentSpaces[currentIndex].id === s.id){
        stage.classList.add('interior', interiorType(s));
      }
    }, 520);
  }
  document.querySelectorAll('.marker').forEach((m,i)=>m.classList.toggle('active', i===currentIndex));
  document.getElementById('detailTitle').textContent = `${s.icon} ${s.name}`;
  document.getElementById('detailDesc').textContent = s.desc;
  setCaption('');
  // 처음 진입 시에도 입구로 살짝 줌인하되, 설명지는 접힌 상태로 둔다.
  // 사용자가 마커/이전/다음으로 공간을 선택하면 배경을 가리지 않도록 미니 시트만 유지한다.
  document.getElementById('detailSheet').classList.toggle('expanded', enteringInterior);
  const hint = document.getElementById('tapHint');
  if(hint) hint.textContent = enteringInterior ? '실내 탐험 모드: 기구를 터치해 보세요' : '선택한 위치로 이동 중';
  renderTab();
}

function renderTab(){
  const s = currentSpaces[currentIndex];
  const content = document.getElementById('tabContent');
  if(activeTab === 'overview') content.textContent = s.desc;
  if(activeTab === 'bible') content.textContent = s.bible;
  if(activeTab === 'meaning') content.textContent = s.meaning;
}
function setCaption(text){ document.getElementById('stageCaption').textContent = text; }

document.getElementById('backBtn').addEventListener('click', closeExplore);
document.getElementById('droneBtn').addEventListener('click', () => {
  const stage = document.getElementById('stage');
  stage.classList.remove('zoomed','interior','entering','holyRoom','mostHolyRoom','veilRoom');
  stage.style.setProperty('--focus-x', '50%');
  stage.style.setProperty('--focus-y', '45%');
  document.getElementById('detailSheet').classList.remove('expanded');
  setCaption('');
});
document.getElementById('prevSpace').addEventListener('click', () => selectSpace(currentIndex - 1));
document.getElementById('nextSpace').addEventListener('click', () => selectSpace(currentIndex + 1));
document.querySelectorAll('.tabs button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeTab = btn.dataset.tab;
  renderTab();
}));
window.addEventListener('popstate', () => { if(!location.hash.startsWith('#explore')) document.getElementById('exploreView').classList.add('hidden'); });

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
renderMenu();


// v0.2.4: bottom sheet can be folded to keep the drone image wide.
const sheetHandle = document.querySelector('#detailSheet .handle');
if (sheetHandle) {
  sheetHandle.addEventListener('click', () => {
    document.getElementById('detailSheet').classList.toggle('expanded');
  });
}

