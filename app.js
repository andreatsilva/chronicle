'use strict';
const FEED='https://raw.githubusercontent.com/andreatsilva/chronicle/live/';
const $=id=>document.getElementById(id);
const stages=['Research','Script','Imagery','Render','Assembly','Release'];
const phases={discovering:0,researching:0,extracting_facts:0,writing_script:1,artwork:2,prepare:2,audio_preflight:2,render:3,assembly:4,encode:4,qc:4,complete:5,uploaded:5,upload:5};
let lastSnapshot=null;
function text(id,value){$(id).textContent=value??'—'}
function imageURL(path,stamp){return /^frames\/[a-z0-9-]+\.jpg$/.test(path||'')?FEED+path+'?v='+encodeURIComponent(stamp):null}
function element(tag,value,cls){const node=document.createElement(tag);node.textContent=value;if(cls)node.className=cls;return node}
function render(data){
 lastSnapshot=data;const age=(Date.now()-Date.parse(data.updated_at))/1000;const stale=!Number.isFinite(age)||age>180;
 text('connection',stale?'● Last known production snapshot':'● Production feed connected');$('connection').classList.toggle('stale',stale);
 text('freshness',stale?'Feed delayed · showing last snapshot':'Updated '+new Date(data.updated_at).toLocaleTimeString());
 text('producing',data.counts?.producing);text('completed',data.counts?.completed);text('published',data.counts?.published);text('waiting',data.counts?.waiting);
 const current=data.current;const phase=current?.phase||'idle';const stage=phases[phase]??-1;
 text('stageNumber',stage<0?'—/06':String(stage+1).padStart(2,'0')+'/06');text('sequenceNumber',stage<0?'— / 06':String(stage+1).padStart(2,'0')+' / 06');
 text('title',current?.title||'Between stories.');text('description',current?'Actual production frames, exported from the local studio. Historical imagery may be contextual or a later depiction; AI-assisted historical claims require review.':'The studio is waiting for its next production. The last public records remain below.');
 text('style',current?.style==='original_3d'?'ORIGINAL 3D':'2.5D HISTORICAL IMAGES');text('phaseLabel',phase.replaceAll('_',' ').toUpperCase());
 const frame=imageURL(current?.frame,data.updated_at);$('mainFrame').hidden=!frame;$('placeholder').hidden=!!frame;if(frame)$('mainFrame').src=frame;else $('mainFrame').removeAttribute('src');
 text('frameLabel',frame?'RENDERED FRAME':'AWAITING FRAME');text('frameTime',new Date(data.updated_at).toLocaleTimeString());
 $('sequence').replaceChildren(...stages.map((name,i)=>element('div',name,i<stage?'done':i===stage?'active':'')));
 const count=Math.max(0,Number(current?.frame_count)||0),total=Math.max(0,Number(current?.frame_total)||0);
 text('sceneLabel',current?.scene_count?'Scene '+(current.scene_index||1)+' / '+current.scene_count+' · frames rendered':'Waiting for scene frames');text('frames',total?count+' / '+total:'—');$('progressBar').style.width=(total?Math.min(100,count/total*100):0)+'%';
 text('runState',stale?'▪ SNAPSHOT DELAYED':current?'▪ '+phase.replaceAll('_',' ').toUpperCase():'▪ STUDIO IDLE');text('sync','SYNC '+new Date(data.updated_at).toLocaleTimeString());
 $('filmstrip').replaceChildren(...Array.from({length:Math.min(8,current?.scene_count||5)},(_,i)=>{const box=document.createElement('div');const url=imageURL(current?.scenes?.[i]?.frame,data.updated_at);if(url){const im=document.createElement('img');im.src=url;im.alt='Rendered scene '+(i+1);box.append(im)}box.append(element('span',String(i+1).padStart(2,'0')+' SCENE'));return box}));
 $('recent').replaceChildren(...(data.recent||[]).map(item=>{const card=document.createElement('article');card.append(element('label',item.style==='original_3d'?'ORIGINAL 3D':'2.5D HISTORICAL IMAGES'),element('h3',item.title),element('p',item.status));if(/^https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]+$/.test(item.url||'')){const link=element('a','Watch on YouTube ↗');link.href=item.url;link.target='_blank';link.rel='noopener';card.append(link)}return card}));
}
async function refresh(){try{const response=await fetch(FEED+'snapshot.json?t='+Math.floor(Date.now()/20000),{cache:'no-store',referrerPolicy:'no-referrer'});if(!response.ok)throw Error('Feed unavailable');render(await response.json())}catch{if(lastSnapshot)render(lastSnapshot);else{text('connection','● Awaiting local sync');text('freshness','Production feed not yet available')}}}
document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>{document.querySelectorAll('nav a').forEach(a=>a.classList.remove('selected'));link.classList.add('selected')}));
refresh();setInterval(refresh,20000);
