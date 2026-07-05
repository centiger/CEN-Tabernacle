const data = window.CEN_TABERNACLE_DATA;
let deferredPrompt = null;
let currentMode = null;
let currentSpaces = [];
let currentIndex = 0;
let activeTab = 'overview';

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
  stage.classList.remove('zoomed');
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

function selectSpace(idx, opts={}){
  if (!currentSpaces.length) return;
  currentIndex = (idx + currentSpaces.length) % currentSpaces.length;
  const s = currentSpaces[currentIndex];
  const stage = document.getElementById('stage');
  stage.style.setProperty('--focus-x', s.x + '%');
  stage.style.setProperty('--focus-y', s.y + '%');
  stage.classList.add('zoomed');
  document.querySelectorAll('.marker').forEach((m,i)=>m.classList.toggle('active', i===currentIndex));
  document.getElementById('detailTitle').textContent = `${s.icon} ${s.name}`;
  document.getElementById('detailDesc').textContent = s.desc;
  setCaption('');
  // 처음 진입 시에도 입구로 살짝 줌인하되, 설명지는 접힌 상태로 둔다.
  // 사용자가 마커/이전/다음으로 공간을 선택하면 배경을 가리지 않도록 미니 시트만 유지한다.
  document.getElementById('detailSheet').classList.remove('expanded');
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
  stage.classList.remove('zoomed');
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

