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
  document.getElementById('stage').classList.toggle('temple', item.type === 'temple');
  renderMarkers();
  setCaption('공중 조망 중입니다. 전체 구조를 먼저 확인하세요.');
  setTimeout(() => setCaption('입구로 이동합니다. 원하는 공간을 터치하세요.'), 900);
  selectSpace(0);
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

function selectSpace(idx){
  if (!currentSpaces.length) return;
  currentIndex = (idx + currentSpaces.length) % currentSpaces.length;
  const s = currentSpaces[currentIndex];
  document.getElementById('detailTitle').textContent = `${s.icon} ${s.name}`;
  document.getElementById('detailDesc').textContent = s.desc;
  setCaption(`${s.name} 탐험 중`);
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
document.getElementById('droneBtn').addEventListener('click', () => setCaption('드론 뷰로 전체 구조를 다시 조망합니다.'));
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
