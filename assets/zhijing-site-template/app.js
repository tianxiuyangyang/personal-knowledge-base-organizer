const $=(s,e=document)=>e.querySelector(s), $$=(s,e=document)=>[...e.querySelectorAll(s)];
const store={tasks:JSON.parse(localStorage.getItem('zj_tasks')||'null')||[{id:1,text:'写下第一条真实想法',tag:'知识库',type:'work',done:false},{id:2,text:'整理三个待澄清的输入',tag:'整理',type:'',done:false},{id:3,text:'为本周确定一个核心成果',tag:'复盘',type:'life',done:false}],inbox:JSON.parse(localStorage.getItem('zj_inbox')||'null')||['关于注意力管理的一个观察','阅读《How to Take Smart Notes》的摘录','下周要推进的网站灵感'],notes:JSON.parse(localStorage.getItem('zj_notes')||'null')||[{title:'卡片笔记法',desc:'用原子化想法构建可生长的知识网络。',symbol:'✦',date:'今天'},{title:'PARA 方法',desc:'按行动状态，而不是按主题组织信息。',symbol:'⌘',date:'昨天'},{title:'先完成，再完美',desc:'用可见的推进对抗无止境的准备。',symbol:'◒',date:'8月27日'}]};
const views={home:'知识中枢',inbox:'收件箱',daily:'每日记录',review:'周度回顾',projects:'活跃项目',areas:'长期领域',maps:'知识地图',resources:'资源库'};
const projects=[['进行中 · 72%','搭建个人知识系统','将收集、思考与行动收束到一套可持续的个人工作流。','截止：9月06日',72,'#73856a'],['进行中 · 45%','完成作品集网站','呈现能力、项目经验与个人表达的数字化名片。','截止：9月15日',45,'#bd8567'],['筹备中 · 15%','秋季深度阅读计划','围绕思考、设计与商业建立一个有输出的阅读专题。','截止：10月01日',15,'#8b86a3']];
const areas=[['◌','健康','精力、运动、睡眠','每周回顾'],['↗','职业发展','能力与长期影响力','每周回顾'],['¥','财务','现金流与长期配置','每月回顾'],['∞','关系','真诚、及时的连接','每月回顾'],['□','生活管理','空间、流程与体验','每月回顾'],['✦','学习','输入、思考与输出','每周回顾']];
const resources=[['METHOD','卡片笔记法','笔记不是仓库，而是持续生长的论证网络。每张笔记表达一个可独立理解的想法。','已连接 · 学习地图'],['SYSTEM','PARA 方法','按项目、领域、资源、归档四种行动状态组织数字信息。','已连接 · 知识地图'],['THOUGHT','先完成，再完美','用可见的推进替代无止境准备；迭代会带来比等待更好的答案。','已连接 · 每日记录'],['BOOK','How to Take Smart Notes','一套将阅读、思考和写作真正连接起来的工作方法。','待读 · 2026'],['FRAMEWORK','注意力预算','时间有限，注意力更稀缺。为重要事项预留最完整的认知带宽。','待发展'],['SKILL','高质量复盘','通过事实、感受、洞察与行动，让经验转化为下一次的优势。','已连接 · 周度回顾']];
function esc(v){let d=document.createElement('div');d.textContent=v;return d.innerHTML}function save(){localStorage.setItem('zj_tasks',JSON.stringify(store.tasks));localStorage.setItem('zj_inbox',JSON.stringify(store.inbox));localStorage.setItem('zj_notes',JSON.stringify(store.notes))}function toast(text){$('#toast span').textContent=text;$('#toast').classList.add('show');clearTimeout(window.t);window.t=setTimeout(()=>$('#toast').classList.remove('show'),2400)}
function renderTasks(){$('#tasks').innerHTML=store.tasks.map(t=>`<div class="task ${t.done?'done':''}"><input aria-label="完成任务" data-id="${t.id}" type="checkbox" ${t.done?'checked':''}><label>${esc(t.text)}</label><span class="tag ${t.type}">${t.tag}</span></div>`).join('');$$('.task input').forEach(x=>x.onchange=()=>{let t=store.tasks.find(t=>t.id===+x.dataset.id);t.done=x.checked;save();renderTasks();toast(x.checked?'任务已完成，继续保持。':'任务已恢复到行动清单')})}
function renderNotes(){$('#notes').innerHTML=store.notes.slice(0,3).map(n=>`<article class="note"><div class="noteSymbol">${n.symbol}</div><div><h3>${esc(n.title)}</h3><p>${esc(n.desc)}</p></div><time>${n.date}</time></article>`).join('')}
function renderInbox(){$('#inboxList').innerHTML=store.inbox.length?store.inbox.map((x,i)=>`<div class="inboxItem"><i></i><p>${esc(x)}</p><button data-del="${i}" aria-label="删除">×</button></div>`).join(''):'<p class="empty">收件箱已清空，心智空间也随之明朗。</p>';$('#inboxCount').textContent=`${store.inbox.length} 条`;$('#inboxBadge').textContent=store.inbox.length;$$('[data-del]').forEach(x=>x.onclick=()=>{store.inbox.splice(+x.dataset.del,1);save();renderInbox();toast('已从收件箱移除')})}
function renderCollections(){$('#projectList').innerHTML=projects.map(p=>`<article class="projectCard" style="--color:${p[5]}"><small>${p[0]}</small><h2>${p[1]}</h2><p>${p[2]}</p><footer><span>${p[3]}</span><div class="mini"><i style="width:${p[4]}%"></i></div></footer></article>`).join('');$('#areaList').innerHTML=areas.map(a=>`<article class="areaCard"><b>${a[0]}</b><h2>${a[1]}</h2><p>${a[2]}</p><small>${a[3]}</small></article>`).join('');$('#resourceList').innerHTML=resources.map(r=>`<article class="resourceCard"><small>${r[0]}</small><h2>${r[1]}</h2><p>${r[2]}</p><footer>${r[3]}</footer></article>`).join('')}
function go(page){$$('.page').forEach(x=>x.classList.remove('active'));$(`#${page}`).classList.add('active');$$('.nav').forEach(x=>x.classList.toggle('on',x.dataset.page===page));$('#crumb').textContent=views[page];$('.side').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})}
function modal(open=true){$('#shade').classList.toggle('open',open);$('#modal').classList.toggle('open',open);if(open)setTimeout(()=>$('#noteTitle').focus(),120)}function command(open=true){$('#shade').classList.toggle('open',open);$('#command').classList.toggle('open',open);if(open){renderCommands('');setTimeout(()=>$('#commandInput').focus(),120)}}function closeAll(){modal(false);command(false)}
function renderCommands(q){q=q.toLowerCase();let data=[...Object.entries(views).map(([id,name])=>({id,name,kind:'页面'})),{id:'new',name:'新建笔记',kind:'操作'},{id:'theme',name:'切换深色模式',kind:'操作'}].filter(x=>x.name.toLowerCase().includes(q));$('#results').innerHTML=data.length?data.map(x=>`<button data-command="${x.id}">${x.name}<span>${x.kind}</span></button>`).join(''):'<p class="empty">没有匹配结果</p>';$$('[data-command]').forEach(x=>x.onclick=()=>{let v=x.dataset.command;command(false);if(v==='new')modal();else if(v==='theme')$('#theme').click();else go(v)})}
renderTasks();renderNotes();renderInbox();renderCollections();
$$('.nav').forEach(x=>x.onclick=()=>go(x.dataset.page));$$('[data-goto]').forEach(x=>x.onclick=()=>go(x.dataset.goto));$('#newNote').onclick=()=>modal();$('#capture').onclick=()=>modal();$$('.close').forEach(x=>x.onclick=()=>modal(false));$('#shade').onclick=closeAll;$('#saveNote').onclick=()=>{let title=$('#noteTitle').value.trim(),desc=$('#noteContent').value.trim();if(!title){$('#noteTitle').focus();return toast('先为这个想法写一个标题')}store.notes.unshift({title,desc:desc||'刚刚捕捉的一条想法，等待进一步连接。',symbol:'✦',date:'刚刚'});save();renderNotes();$('#noteTitle').value='';$('#noteContent').value='';modal(false);toast('已保存到最近沉淀')};
$('#saveInbox').onclick=()=>{let x=$('#inboxText');if(!x.value.trim())return x.focus();store.inbox.unshift(x.value.trim());x.value='';save();renderInbox();toast('已捕捉到收件箱')};$('#inboxText').onkeydown=e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter')$('#saveInbox').click()};$('#addTask').onclick=()=>{let t=prompt('下一步行动是什么？');if(t?.trim()){store.tasks.push({id:Date.now(),text:t.trim(),tag:'新任务',type:'work',done:false});save();renderTasks();toast('已加入下一步行动')}};
$('#theme').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('zj_theme',document.body.classList.contains('dark')?'dark':'light')};if(localStorage.getItem('zj_theme')==='dark')document.body.classList.add('dark');$('#commandBtn').onclick=()=>command();$('#commandInput').oninput=e=>renderCommands(e.target.value);document.onkeydown=e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();command()}if(e.key==='Escape')closeAll()};$('#hamburger').onclick=()=>$('.side').classList.toggle('open');$('#startReview').onclick=()=>toast('复盘已开始：先写下本周高光。');

/* Knowledge-space network: pan, zoom, edit, connect, and persist locally. */
(()=>{
  const canvas=$('#graphCanvas'), workbench=$('#graphWorkbench'), ctx=canvas.getContext('2d');
  const types={idea:{name:'想法',color:'#c59b5c',glow:'rgba(197,155,92,.28)'},project:{name:'项目',color:'#6d8667',glow:'rgba(109,134,103,.28)'},method:{name:'方法',color:'#7e88a9',glow:'rgba(126,136,169,.26)'},area:{name:'领域',color:'#bd7d68',glow:'rgba(189,125,104,.26)'},resource:{name:'资源',color:'#6a8991',glow:'rgba(106,137,145,.26)'}};
  const defaults={nodes:[
    {id:'core',title:'知识中枢',body:'将输入、思考、行动与复盘连接在一起的个人操作系统。',type:'method',x:0,y:0,r:35},
    {id:'zettel',title:'卡片笔记法',body:'用原子化想法构建可生长的知识网络。',type:'method',x:-290,y:-145,r:27},
    {id:'para',title:'PARA 方法',body:'按项目、领域、资源、归档四种行动状态组织信息。',type:'method',x:-330,y:128,r:25},
    {id:'system',title:'个人知识系统',body:'正在推进：将收集、思考与行动收束到一套可持续的工作流。',type:'project',x:258,y:-42,r:31},
    {id:'career',title:'职业发展',body:'长期积累可迁移能力，创造可见的长期价值。',type:'area',x:428,y:-226,r:26},
    {id:'health',title:'健康',body:'稳定精力、规律作息和可持续运动。',type:'area',x:300,y:195,r:24},
    {id:'attention',title:'注意力预算',body:'时间有限，注意力更稀缺；把最完整的认知带宽留给重要事项。',type:'idea',x:-85,y:242,r:28},
    {id:'review',title:'周度回顾',body:'清空输入、审视行动、校准方向。',type:'resource',x:72,y:-245,r:25},
    {id:'portfolio',title:'作品集网站',body:'正在推进：呈现能力、项目经验与个人表达的数字化名片。',type:'project',x:542,y:54,r:24}
  ],edges:[['core','zettel'],['core','para'],['core','system'],['core','health'],['core','attention'],['core','review'],['zettel','para'],['zettel','attention'],['system','career'],['system','portfolio'],['review','attention'],['health','attention']]};
  let network=JSON.parse(localStorage.getItem('zj_network')||'null')||defaults;
  let selected=null, view={x:0,y:0,scale:1}, initialized=false, pointer=null;
  const panelEmpty=$('#nodePanelEmpty'), editor=$('#nodeEditor'), typeLabel=$('#nodeTypeLabel'), panelTitle=$('#nodePanelTitle'), titleInput=$('#graphNodeTitle'), typeInput=$('#graphNodeType'), bodyInput=$('#graphNodeBody'), linkInput=$('#graphNodeLink');
  const getNode=id=>network.nodes.find(n=>n.id===id);
  const saveNetwork=()=>localStorage.setItem('zj_network',JSON.stringify(network));
  const metrics=()=>({w:workbench.clientWidth,h:workbench.clientHeight});
  function resize(){const {w,h}=metrics();if(!w||!h)return;const ratio=window.devicePixelRatio||1;canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);canvas.style.width=`${w}px`;canvas.style.height=`${h}px`;ctx.setTransform(ratio,0,0,ratio,0,0);if(!initialized){fit();initialized=true}else draw()}
  function fit(){const {w,h}=metrics();if(!w||!h)return;const xs=network.nodes.map(n=>n.x),ys=network.nodes.map(n=>n.y);const pad=150;const minX=Math.min(...xs)-pad,maxX=Math.max(...xs)+pad,minY=Math.min(...ys)-pad,maxY=Math.max(...ys)+pad;view.scale=Math.min(1.2,Math.max(.48,Math.min(w/(maxX-minX),h/(maxY-minY))));view.x=w/2-((minX+maxX)/2)*view.scale;view.y=h/2-((minY+maxY)/2)*view.scale;draw()}
  const toScreen=n=>({x:n.x*view.scale+view.x,y:n.y*view.scale+view.y});
  const toWorld=(x,y)=>({x:(x-view.x)/view.scale,y:(y-view.y)/view.scale});
  function draw(){const {w,h}=metrics();if(!w||!h)return;ctx.clearRect(0,0,w,h);ctx.save();ctx.lineCap='round';
    network.edges.forEach(([a,b])=>{const na=getNode(a),nb=getNode(b);if(!na||!nb)return;const p=toScreen(na),q=toScreen(nb),active=selected===a||selected===b;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=active?'rgba(163,126,70,.62)':'rgba(106,117,108,.30)';ctx.lineWidth=active?1.7:1;ctx.stroke();const midX=(p.x+q.x)/2,midY=(p.y+q.y)/2;ctx.fillStyle=active?'#c59b5c':'rgba(117,128,120,.46)';ctx.beginPath();ctx.arc(midX,midY,active?2.6:1.6,0,Math.PI*2);ctx.fill()});
    network.nodes.forEach(n=>{const p=toScreen(n),t=types[n.type]||types.idea,r=Math.max(16,Math.min(48,n.r*view.scale));const isSelected=selected===n.id;ctx.save();ctx.shadowColor=t.glow;ctx.shadowBlur=isSelected?31:16;ctx.fillStyle=t.color;ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.lineWidth=isSelected?3:1.5;ctx.strokeStyle=isSelected?'#fff7e7':'rgba(255,255,255,.72)';ctx.stroke();if(isSelected){ctx.strokeStyle='rgba(197,155,92,.35)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(p.x,p.y,r+10,0,Math.PI*2);ctx.stroke()}ctx.fillStyle='#fffdf8';ctx.font=`${Math.max(10,Math.min(14,10*view.scale+2))}px ${getComputedStyle(document.body).fontFamily}`;ctx.textAlign='center';ctx.textBaseline='middle';const text=n.title.length>6?n.title.slice(0,6)+'…':n.title;ctx.fillText(text,p.x,p.y);ctx.restore();
      ctx.fillStyle=isSelected?'#5e503d':'#56615c';ctx.font=`${Math.max(10,Math.min(13,11*view.scale))}px ${getComputedStyle(document.body).fontFamily}`;ctx.textAlign='center';ctx.textBaseline='top';ctx.fillText(n.title,p.x,p.y+r+9);
    });ctx.restore()}
  function hit(x,y){const w=toWorld(x,y);return [...network.nodes].reverse().find(n=>Math.hypot(w.x-n.x,w.y-n.y)<n.r+10/view.scale)}
  function showEditor(id){selected=id;const n=getNode(id);if(!n)return;panelEmpty.hidden=true;editor.hidden=false;titleInput.value=n.title;typeInput.value=n.type;bodyInput.value=n.body||'';typeLabel.textContent=types[n.type]?.name||'知识节点';panelTitle.textContent=n.title;const linked=network.edges.filter(e=>e.includes(id)).map(e=>e[0]===id?e[1]:e[0]);linkInput.innerHTML='<option value="">不新增连接</option>'+network.nodes.filter(x=>x.id!==id).map(x=>`<option value="${x.id}" ${linked.includes(x.id)?'selected':''}>${esc(x.title)}${linked.includes(x.id)?' · 已连接':''}</option>`).join('');draw()}
  function hideEditor(){selected=null;editor.hidden=true;panelEmpty.hidden=false;draw()}
  function createNode(at){const pos=at||toWorld(metrics().w/2,metrics().h/2);const n={id:`node-${Date.now()}`,title:'未命名节点',body:'写下这条知识对你的意义。',type:'idea',x:Math.round(pos.x),y:Math.round(pos.y),r:25};network.nodes.push(n);saveNetwork();showEditor(n.id);titleInput.select();toast('已创建知识节点，开始写下它的价值。')}
  function zoom(factor,origin){const {w,h}=metrics();const o=origin||{x:w/2,y:h/2},world=toWorld(o.x,o.y);view.scale=Math.max(.35,Math.min(2.4,view.scale*factor));view.x=o.x-world.x*view.scale;view.y=o.y-world.y*view.scale;draw()}
  canvas.addEventListener('wheel',e=>{e.preventDefault();const rect=canvas.getBoundingClientRect();zoom(e.deltaY<0?1.12:.89,{x:e.clientX-rect.left,y:e.clientY-rect.top})},{passive:false});
  canvas.addEventListener('pointerdown',e=>{const rect=canvas.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top,n=hit(x,y);canvas.setPointerCapture(e.pointerId);pointer={id:e.pointerId,startX:x,startY:y,baseX:view.x,baseY:view.y,node:n?.id||null,moved:false};if(n)showEditor(n.id);else hideEditor();canvas.classList.add('dragging')});
  canvas.addEventListener('pointermove',e=>{if(!pointer||pointer.id!==e.pointerId)return;const rect=canvas.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top,dx=x-pointer.startX,dy=y-pointer.startY;if(Math.abs(dx)+Math.abs(dy)>2)pointer.moved=true;if(pointer.node){const n=getNode(pointer.node),p=toWorld(x,y);n.x=Math.round(p.x);n.y=Math.round(p.y);draw()}else{view.x=pointer.baseX+dx;view.y=pointer.baseY+dy;draw()}});
  const endPointer=e=>{if(!pointer||pointer.id!==e.pointerId)return;if(pointer.node&&pointer.moved){saveNetwork();toast('节点位置已更新')}pointer=null;canvas.classList.remove('dragging')};canvas.addEventListener('pointerup',endPointer);canvas.addEventListener('pointercancel',endPointer);
  canvas.addEventListener('dblclick',e=>{const rect=canvas.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top;if(!hit(x,y))createNode(toWorld(x,y))});
  $('#zoomIn').onclick=()=>zoom(1.15);$('#zoomOut').onclick=()=>zoom(.87);$('#fitGraph').onclick=fit;$('#createGraphNode').onclick=()=>createNode();$('#closeNodePanel').onclick=hideEditor;
  editor.addEventListener('submit',e=>{e.preventDefault();const n=getNode(selected);if(!n)return;n.title=titleInput.value.trim()||'未命名节点';n.type=typeInput.value;n.body=bodyInput.value.trim();const target=linkInput.value;if(target&&!network.edges.some(e=>(e[0]===n.id&&e[1]===target)||(e[0]===target&&e[1]===n.id)))network.edges.push([n.id,target]);saveNetwork();showEditor(n.id);toast('节点与连接已保存')});
  $('#deleteGraphNode').onclick=()=>{const n=getNode(selected);if(!n)return;if(!confirm(`确定删除「${n.title}」及其所有连接吗？`))return;network.nodes=network.nodes.filter(x=>x.id!==n.id);network.edges=network.edges.filter(e=>!e.includes(n.id));saveNetwork();hideEditor();toast('知识节点已删除')};
  const oldGo=go;go=function(page){oldGo(page);if(page==='maps')requestAnimationFrame(resize)};window.addEventListener('resize',resize);requestAnimationFrame(resize);
})();

/* Prioritize the knowledge map from the homepage and support immersive fullscreen. */
(()=>{
  const workbench=$('#graphWorkbench');
  const enter=()=>go('maps');
  const syncFullscreenLabel=()=>{
    const full=document.fullscreenElement===workbench;
    const graphButton=$('#fullscreenGraph'),homeButton=$('#launchGraphFullscreen');
    if(graphButton)graphButton.textContent=full?'↙ 退出全屏':'⛶ 全屏沉浸';
    if(homeButton)homeButton.textContent=full?'↙ 退出全屏':'⛶ 全屏漫游';
    window.dispatchEvent(new Event('resize'));
  };
  const immersive=()=>{
    if(document.fullscreenElement===workbench){document.exitFullscreen?.();return;}
    enter();
    if(!workbench.requestFullscreen){toast('当前浏览器不支持全屏模式');return;}
    workbench.requestFullscreen().catch(()=>toast('无法进入全屏模式，请检查浏览器权限'));
  };
  $('#enterKnowledgeSpace').onclick=enter;
  $('#launchGraphFullscreen').onclick=immersive;
  $('#fullscreenGraph').onclick=immersive;
  document.addEventListener('fullscreenchange',syncFullscreenLabel);
})();
