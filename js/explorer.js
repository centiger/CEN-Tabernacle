(()=>{
const places=window.CEN_PLACES; const OVERVIEW=window.CEN_OVERVIEW; const $=id=>document.getElementById(id);
const st={idx:0,mode:'far',scale:1,x:0,y:0,tab:'summary',sheet:false,ui:true,tools:false,pointers:new Map(),lastDist:0,lastCenter:null,lastTap:0,dragged:false,uiTimer:null};
const el={intro:$('intro'),start:$('startBtn'),explorer:$('explorer'),stage:$('stage'),img:$('sceneImg'),labels:$('labels'),hint:$('sceneHint'),home:$('homeBtn'),mini:$('miniBtn'),miniBox:$('miniMap'),miniClose:$('miniClose'),miniList:$('miniList'),prev:$('prevBtn'),next:$('nextBtn'),tools:$('quickTools'),toolToggle:$('toolToggle'),far:$('farBtn'),mid:$('midBtn'),near:$('nearBtn'),plus:$('plusBtn'),minus:$('minusBtn'),sheet:$('sheet'),handle:$('sheetHandle'),section:$('sectionText'),title:$('titleText'),placeIcon:$('placeIcon'),placeTitle:$('placeTitle'),placeOne:$('placeOne'),tabText:$('tabText'),path:$('pathBar')};
const place=()=>places[st.idx]; const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)); const isInterior=()=>['sanctuary','ark'].includes(place().id);
function imageFor(){return (st.mode==='far'||st.mode==='mid')?OVERVIEW:place().image;}
function baseFor(){
  if(st.mode==='far') return {s:1,x:0,y:0};
  if(st.mode==='mid'){
    const p=place();
    return {s:isInterior()?(innerWidth<700?1.04:1.02):(innerWidth<700?1.24:1.16),x:isInterior()?0:(50-p.x)*innerWidth*.007,y:isInterior()?0:(50-p.y)*innerHeight*.007};
  }
  return {s:1,x:0,y:0};
}
function maxScale(){return st.mode==='far'?2.8:st.mode==='mid'?2.4:4.6;} function minScale(){return 1;}
function apply(anim=false){
  el.stage.classList.toggle('animate',anim); st.scale=clamp(st.scale,minScale(),maxScale());
  const b=baseFor(), total=b.s*st.scale;
  const lx=(total-1)*innerWidth*.54+80, ly=(total-1)*innerHeight*.54+80;
  st.x=clamp(st.x,-lx,lx); st.y=clamp(st.y,-ly,ly);
  el.img.style.transform=`translate(calc(-50% + ${b.x+st.x}px), calc(-50% + ${b.y+st.y}px)) scale(${total})`;
  if(anim)setTimeout(()=>el.stage.classList.remove('animate'),620);
}
function setImage(){
  const src=imageFor(); if(el.img.getAttribute('src')!==src){el.img.style.opacity=.16;el.img.onload=()=>{el.img.style.opacity=1};el.img.src=src;}
  ['far','mid','near'].forEach(m=>el.stage.classList.toggle(m,st.mode===m)); el.stage.classList.toggle('interior', isInterior());
}
function modeName(){return st.mode==='far'?'전체 조망':st.mode==='mid'?'한걸음 보기':'근접 보기';}
function showUI(auto=true){
  st.ui=true; el.explorer.classList.add('ui-on');
  if(auto){clearTimeout(st.uiTimer); st.uiTimer=setTimeout(()=>{if(!st.sheet&&!st.tools&&!st.miniBox.classList.contains('hidden')) return; hideUI();},3500)}
}
function hideUI(){if(st.sheet||st.tools||!el.miniBox.classList.contains('hidden'))return; st.ui=false; el.explorer.classList.remove('ui-on');}
function flash(txt){el.hint.textContent=txt;el.hint.classList.add('show');clearTimeout(flash.t);flash.t=setTimeout(()=>el.hint.classList.remove('show'),1700);showUI(true)}
function render(){
  const p=place();
  el.section.textContent=st.mode==='far'?'전체 조망':p.section;
  el.title.textContent=st.mode==='far'?`${p.title} · 전체 속 위치`:st.mode==='mid'?`${p.title} · 한걸음 보기`:p.title;
  el.placeIcon.textContent=p.icon; el.placeTitle.textContent=p.title; el.placeOne.textContent=p.one;
  renderLabels(); renderPath(); renderMini(); renderTab();
  el.prev.style.display=st.idx>0?'block':'none'; el.next.style.display=st.idx<places.length-1?'block':'none';
  el.far.classList.toggle('active',st.mode==='far'); el.mid.classList.toggle('active',st.mode==='mid'); el.near.classList.toggle('active',st.mode==='near');
  el.tools.classList.toggle('collapsed',!st.tools);
}
function renderLabels(){ el.labels.innerHTML=''; }
function renderPath(){
  el.path.innerHTML=places.map((p,i)=>`<button class="pathItem ${i===st.idx?'active':''}" data-i="${i}"><span class="ico">${p.icon}</span><span>${p.title.replace('언약궤와 ','')}</span></button>`).join('');
  el.path.querySelectorAll('button').forEach(b=>b.onclick=e=>{e.stopPropagation();goTo(+b.dataset.i,'mid',true)});
}
function renderMini(){
  el.miniList.innerHTML=places.map((p,i)=>`<button class="${i===st.idx?'active':''}" data-i="${i}">${p.icon} ${p.title}<br><small>${p.section}</small></button>`).join('');
  el.miniList.querySelectorAll('button').forEach(b=>b.onclick=()=>{el.miniBox.classList.add('hidden');goTo(+b.dataset.i,'far',true)});
}
function renderTab(){document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===st.tab)); el.tabText.textContent=place()[st.tab]||place().summary;}
function goTo(i,mode=st.mode,toast=false){st.idx=clamp(i,0,places.length-1); st.mode=mode; st.scale=1; st.x=0; st.y=0; setImage(); render(); apply(true); if(toast)flash(`${place().icon} ${place().title} — ${modeName()}`); history.replaceState({cen:1},'');}
function toFar(){st.mode='far';st.scale=1;st.x=0;st.y=0;setImage();render();apply(true);flash('전체가 보이도록 뒤로 물러납니다.');}
function toMid(){st.mode='mid';st.scale=1;st.x=0;st.y=0;setImage();render();apply(true);flash(`${place().icon} ${place().title}에서 한걸음 뒤로 봅니다.`);}
function toNear(){st.mode='near';st.scale=1;st.x=0;st.y=0;setImage();render();apply(true);flash(`${place().icon} ${place().title} 근접 보기`);}
function backOut(){if(st.mode==='near')return toMid(); if(st.mode==='mid')return toFar(); if(st.scale>1.01){st.scale=1;st.x=0;st.y=0;apply(true);flash('한 화면에 맞췄습니다.');}}
function zoom(delta){if(delta<0&&st.scale<=1.02){backOut();return} st.scale=clamp(st.scale+delta,minScale(),maxScale());apply(true);showUI(true);}
function nav(d){goTo(st.idx+d,'mid',true)}
function distance(a,b){return Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)} function center(a,b){return{x:(a.clientX+b.clientX)/2,y:(a.clientY+b.clientY)/2}}
el.stage.addEventListener('pointerdown',e=>{el.stage.setPointerCapture(e.pointerId);st.pointers.set(e.pointerId,e);st.dragged=false;showUI(true);const now=Date.now();if(now-st.lastTap<290&&st.pointers.size===1){if(st.mode==='far')toMid();else if(st.mode==='mid')toNear();else if(st.scale<1.9){st.scale=2.2;apply(true)}else{st.scale=1;st.x=0;st.y=0;apply(true)}st.lastTap=0}else st.lastTap=now;});
el.stage.addEventListener('pointermove',e=>{if(!st.pointers.has(e.pointerId))return;const prev=st.pointers.get(e.pointerId);st.pointers.set(e.pointerId,e);const pts=[...st.pointers.values()];if(pts.length===1&&st.scale>1.01){const dx=e.clientX-prev.clientX,dy=e.clientY-prev.clientY;if(Math.abs(dx)+Math.abs(dy)>2)st.dragged=true;st.x+=dx;st.y+=dy;apply(false)}else if(pts.length>=2){const[a,b]=pts,d=distance(a,b),c=center(a,b);st.dragged=true;if(!st.lastDist){st.lastDist=d;st.lastCenter=c;return}const factor=d/st.lastDist;st.scale=clamp(st.scale*factor,minScale(),maxScale());if(st.lastCenter){st.x+=c.x-st.lastCenter.x;st.y+=c.y-st.lastCenter.y}st.lastDist=d;st.lastCenter=c;apply(false)}});
['pointerup','pointercancel','pointerleave'].forEach(ev=>el.stage.addEventListener(ev,e=>{st.pointers.delete(e.pointerId);if(st.pointers.size<2){st.lastDist=0;st.lastCenter=null}}));

el.stage.addEventListener('click',e=>{ if(st.dragged) return; if(st.ui && !st.sheet && !st.tools && el.miniBox.classList.contains('hidden')){ hideUI(); } else { showUI(true); } });

window.addEventListener('popstate',()=>{if(!el.miniBox.classList.contains('hidden')){el.miniBox.classList.add('hidden');history.pushState({cen:1},'');return}if(st.tools){st.tools=false;render();history.pushState({cen:1},'');return}if(st.sheet){st.sheet=false;el.sheet.classList.add('collapsed');history.pushState({cen:1},'');return}if(st.mode==='near'){toMid();history.pushState({cen:1},'');return}if(st.mode==='mid'){toFar();history.pushState({cen:1},'');return}if(st.idx!==0){goTo(0,'far');history.pushState({cen:1},'');return}el.intro.classList.remove('hidden');el.explorer.classList.add('hidden');});
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{st.tab=b.dataset.tab;renderTab();showUI(false)});
el.start.onclick=()=>{el.intro.classList.add('hidden');el.explorer.classList.remove('hidden');history.replaceState({cen:1},'');history.pushState({cen:2},'');goTo(0,'far');flash('전체 조망에서 시작합니다. 원하는 장소를 터치하세요.');};
el.home.onclick=e=>{e.stopPropagation();goTo(0,'far',true)}; el.far.onclick=e=>{e.stopPropagation();toFar()}; el.mid.onclick=e=>{e.stopPropagation();toMid()}; el.near.onclick=e=>{e.stopPropagation();toNear()}; el.plus.onclick=e=>{e.stopPropagation();zoom(.42)}; el.minus.onclick=e=>{e.stopPropagation();zoom(-.42)}; el.prev.onclick=e=>{e.stopPropagation();nav(-1)}; el.next.onclick=e=>{e.stopPropagation();nav(1)}; el.mini.onclick=e=>{e.stopPropagation();el.miniBox.classList.toggle('hidden');showUI(false)}; el.miniClose.onclick=()=>el.miniBox.classList.add('hidden'); el.toolToggle.onclick=e=>{e.stopPropagation();st.tools=!st.tools;render();showUI(false)}; el.handle.onclick=e=>{e.stopPropagation();st.sheet=!st.sheet;el.sheet.classList.toggle('collapsed',!st.sheet);showUI(false)}; addEventListener('resize',()=>apply(false));
})();
