const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

const characters={
  lizzie:{year:"2001",type:"DISNEY CHANNEL",title:"Lizzie McGuire",copy:"La puerta de entrada para toda una generación. Gordo, Miranda y su alter ego animado siguen viviendo alrededor de Hilary 25 años después.",theme:"lizzie",tags:["Gordo","Miranda","alter ego animado"],stamp:"25",link:["Abrir especial Lizzie ↓","#lizzie"]},
  kelly:{year:"2002",type:"DISNEY CHANNEL ORIGINAL MOVIE",title:"Kelly Collins",copy:"La cadete Kelly enfrenta moda, libertad y una academia militar. Kelly terminó siendo uno de los personajes más recordados de la etapa Disney.",theme:"kelly",tags:["Cadet Kelly","Stone","Disney+"],stamp:"KC",link:["Disney+ ↗","https://www.disneyplus.com/es-mx/browse/entity-8b14e5bf-0c24-407b-b660-d6a031e05c60"]},
  natalie:{year:"2003",type:"PELÍCULA",title:"Natalie Connors",copy:"La hija de un científico termina en medio de la misión de Cody Banks y forma parte del salto de Hilary hacia el cine adolescente de comienzos de los 2000.",theme:"natalie",tags:["Agent Cody Banks","2003","Natalie"],stamp:"NC",link:["Apple TV ↗","https://tv.apple.com/mx/movie/agente-cody-banks---super-espia/umc.cmc.70g4gnyfmbmqnrcolvpco1mes"]},
  isabella:{year:"2003",type:"PELÍCULA · ROMA",title:"Lizzie / Isabella",copy:"Roma, Isabella, Paolo y el final cinematográfico de Lizzie McGuire. Dos Hilarys dentro de la misma historia.",theme:"isabella",tags:["Roma","Isabella","Paolo"],stamp:"ROMA",link:["Disney+ ↗","https://www.disneyplus.com/es-mx/explore/articles/lizzie-mcguire-anniversary"]},
  lorraine:{year:"2003",type:"PELÍCULA",title:"Lorraine Baker",copy:"La hermana mayor de la familia Baker en Doce en casa, una de las películas familiares de la etapa más intensa de Hilary en cine.",theme:"lorraine",tags:["Cheaper by the Dozen","familia Baker","2003"],stamp:"12",link:["Apple TV ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  sam:{year:"2004",type:"PELÍCULA",title:"Sam Montgomery",copy:"Mesera, estudiante, teléfono perdido y un baile de máscaras: A Cinderella Story se volvió una referencia enorme del cine teen de los 2000.",theme:"sam",tags:["A Cinderella Story","Austin","diner"],stamp:"SAM",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  terri:{year:"2004",type:"PELÍCULA · MÚSICA",title:"Terri Fletcher",copy:"Raise Your Voice mezcla drama adolescente, escuela de música y una Hilary mucho más volcada al canto dentro de la propia historia.",theme:"terri",tags:["Raise Your Voice","música","2004"],stamp:"TF",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  holly:{year:"2005",type:"PELÍCULA",title:"Holly Hamilton",copy:"En The Perfect Man, Holly inventa un admirador secreto para intentar cambiar la vida amorosa de su madre.",theme:"holly",tags:["The Perfect Man","Holly","2005"],stamp:"HH",link:["Apple TV ↗","https://tv.apple.com/pt/movie/o-homem-perfeito/umc.cmc.53rjoz21v2m1mn753jwdoygwe"]},
  tanzie:{year:"2006",type:"PELÍCULA",title:"Tanzie Marchetta",copy:"Material Girls reunió a Hilary y Haylie como hermanas herederas de una empresa de cosméticos obligadas a reconstruir su vida.",theme:"tanzie",tags:["Material Girls","Tanzie","Haylie Duff"],stamp:"TM",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  yonica:{year:"2008",type:"WAR, INC. · SÁTIRA",title:"Yonica Babyyeah",copy:"Una estrella pop deliberadamente absurda y exagerada. War, Inc. fue uno de los proyectos con los que Hilary buscó romper con la imagen de sus personajes anteriores.",theme:"yonica",tags:["War, Inc.","Yonica Babyyeah","pop star"],stamp:"YB",link:["IMDb ↗","https://www.imdb.com/title/tt0884224/characters/nm0240381/"]},
  olivia:{year:"2009",type:"SERIE · GOSSIP GIRL",title:"Olivia Burke",copy:"Una estrella de cine que llega a NYU y se cruza con Dan Humphrey durante la tercera temporada de Gossip Girl.",theme:"olivia",tags:["Gossip Girl","NYU","Olivia"],stamp:"OB",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  lane:{year:"2010",type:"PELÍCULA PARA TV",title:"Lane Daniels",copy:"En Beauty & the Briefcase, Lane se infiltra en el mundo corporativo mientras busca material para una historia de revista.",theme:"lane",tags:["Beauty & the Briefcase","Lane","2010"],stamp:"LD",link:["Filmografía ↗","https://www.biography.com/actor/hilary-duff"]},
  kelsey:{year:"2015",type:"SERIE · YOUNGER",title:"Kelsey Peters",copy:"Editora ambiciosa y una de las piezas centrales de Younger durante siete temporadas. Una etapa que redefinió la carrera televisiva adulta de Hilary.",theme:"kelsey",tags:["Younger","publishing","Kelsey"],stamp:"KP",link:["IMDb ↗","https://www.imdb.com/title/tt3288518/characters/nm0240381/"]},
  sophie:{year:"2022",type:"SERIE · HULU",title:"Sophie",copy:"La protagonista de How I Met Your Father reconstruye en Nueva York la historia de cómo conoció al padre de su hijo.",theme:"sophie",tags:["HIMYF","NYC","Sophie"],stamp:"S",link:["Disney+ ↗","https://www.disneyplus.com/en-mx/browse/entity-42771fe9-3174-43bc-ab6a-d8c3e618b934"]}
};
function setCharacter(key){
  const d=characters[key];if(!d)return;
  const stage=$("[data-character-stage]");
  const apply=()=>{
    stage.dataset.theme=d.theme;
    $("[data-character-year]").textContent=d.year;
    $("[data-character-type]").textContent=d.type;
    $("[data-character-title]").textContent=d.title;
    $("[data-character-copy]").textContent=d.copy;
    $("[data-character-stamp]").textContent=d.stamp;
    const tags=$("[data-character-tags]");tags.innerHTML="";
    d.tags.forEach(t=>{const s=document.createElement("span");s.textContent=t;tags.appendChild(s);});
    const a=$("[data-character-link]");a.textContent=d.link[0];a.href=d.link[1];
    if(d.link[1].startsWith("http")){a.target="_blank";a.rel="noreferrer";}else{a.removeAttribute("target");a.removeAttribute("rel");}
    $$("[data-character]").forEach(b=>b.classList.toggle("active",b.dataset.character===key));
  };
  if(document.startViewTransition&&!reduce)document.startViewTransition(apply);else apply();
}
$$("[data-character]").forEach(b=>b.addEventListener("click",()=>setCharacter(b.dataset.character)));

const characterObserver=new IntersectionObserver(entries=>{
  const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(visible) setCharacter(visible.target.dataset.character);
},{rootMargin:"-34% 0px -48% 0px",threshold:[.15,.35,.55,.75]});
$$("[data-character]").forEach(el=>characterObserver.observe(el));

const albums={
  santa:{year:"2002",title:"Santa Claus Lane",monogram:"SC",copy:"El primer álbum de estudio de Hilary y el inicio de su catálogo discográfico.",tracks:["Santa Claus Lane","Tell Me a Story","I Heard Santa on the Radio"],theme:"santa"},
  meta:{year:"2003",title:"Metamorphosis",monogram:"M",copy:"El disco que cambió la escala de su carrera pop y dejó “So Yesterday” y “Come Clean” al centro de su historia musical.",tracks:["So Yesterday","Come Clean","Why Not"],theme:"meta"},
  self:{year:"2004",title:"Hilary Duff",monogram:"HD",copy:"Una etapa con más guitarras y canciones como Fly, The Getaway y Someone’s Watching Over Me.",tracks:["Fly","The Getaway","Someone’s Watching Over Me"],theme:"self"},
  dignity:{year:"2007",title:"Dignity",monogram:"D",copy:"El giro electrónico: With Love, Stranger y Play With Fire. Una de las eras más celebradas por los fans.",tracks:["With Love","Stranger","Play With Fire"],theme:"dignity"},
  bibo:{year:"2015",title:"Breathe In. Breathe Out.",monogram:"B",copy:"El regreso de 2015: Sparks, My Kind y una etapa que hoy funciona como puente hacia el presente.",tracks:["Sparks","My Kind","Breathe In. Breathe Out."],theme:"bibo"},
  luck:{year:"2026",title:"luck… or something",monogram:"…",copy:"Once canciones, una nueva gira mundial y el regreso musical completo después de más de una década.",tracks:["Weather For Tennis","Roommates","Future Tripping"],theme:"luck"}
};
function setAlbum(key){
  const d=albums[key];if(!d)return;
  const world=$("[data-music-world]");
  const apply=()=>{
    world.dataset.theme=d.theme;
    $("[data-album-year]").textContent=d.year;
    $("[data-album-title]").textContent=d.title;
    $("[data-album-copy]").textContent=d.copy;
    $("[data-album-monogram]").textContent=d.monogram;
    const tracks=$("[data-album-tracks]");tracks.innerHTML="";
    d.tracks.forEach(t=>{const b=document.createElement("button");b.type="button";b.textContent=t;tracks.appendChild(b);});
    $$("[data-album]").forEach(b=>b.classList.toggle("active",b.dataset.album===key));
  };
  if(document.startViewTransition&&!reduce)document.startViewTransition(apply);else apply();
}
$$("[data-album]").forEach(b=>b.addEventListener("click",()=>setAlbum(b.dataset.album)));
$$("[data-open-album]").forEach(a=>a.addEventListener("click",()=>setAlbum(a.dataset.openAlbum)));

const songs=[
  {title:"Come Clean",meta:"Metamorphosis · 2003",query:"Hilary Duff Come Clean"},
  {title:"With Love",meta:"Dignity · 2007",query:"Hilary Duff With Love"},
  {title:"Fly",meta:"Hilary Duff · 2004",query:"Hilary Duff Fly"},
  {title:"Sparks",meta:"Breathe In. Breathe Out. · 2015",query:"Hilary Duff Sparks"},
  {title:"Mature",meta:"luck… or something · 2026",query:"Hilary Duff Mature"},
  {title:"Why Not",meta:"Metamorphosis · 2003",query:"Hilary Duff Why Not"},
  {title:"Roommates",meta:"luck… or something · 2026",query:"Hilary Duff Roommates"},
  {title:"My Kind",meta:"Breathe In. Breathe Out. · 2015",query:"Hilary Duff My Kind"},
  {title:"Stranger",meta:"Dignity · 2007",query:"Hilary Duff Stranger"},
  {title:"Wake Up",meta:"Most Wanted · 2005",query:"Hilary Duff Wake Up"},
  {title:"So Yesterday",meta:"Metamorphosis · 2003",query:"Hilary Duff So Yesterday"},
  {title:"Future Tripping",meta:"luck… or something · 2026",query:"Hilary Duff Future Tripping"}
];
let lastSong=-1;
$("[data-random-song]")?.addEventListener("click",e=>{
  const btn=e.currentTarget,result=$("[data-song-result]"),world=$("[data-music-world]");
  if(btn.disabled)return;
  btn.disabled=true;world?.classList.add("song-spinning");result?.classList.add("is-picking");
  let ticks=0;
  const reel=setInterval(()=>{
    const temp=songs[Math.floor(Math.random()*songs.length)];
    $("[data-song-title]").textContent=temp.title;
    $("[data-song-meta]").textContent=temp.meta;
    ticks++;
    if(ticks<7)return;
    clearInterval(reel);
    let pick;
    do{pick=Math.floor(Math.random()*songs.length);}while(pick===lastSong&&songs.length>1);
    lastSong=pick;
    const song=songs[pick];
    $("[data-song-title]").textContent=song.title;
    $("[data-song-meta]").textContent=song.meta;
    const link=$("[data-song-link]");
    link.href="https://open.spotify.com/search/"+encodeURIComponent(song.query);
    link.textContent="Escuchar "+song.title+" ↗";
    result?.classList.remove("is-picking");
    world?.classList.remove("song-spinning");
    result?.classList.add("song-landed");
    setTimeout(()=>result?.classList.remove("song-landed"),650);
    btn.disabled=false;
  },85);
});

const shows={
  cdmx12:{date:"2027-02-12T20:00:00-06:00",label:"12 FEB 2027 · CDMX",venue:"Palacio de los Deportes",city:"Ciudad de México",title:"Hilary Duff - the lucky me tour · CDMX 12 Feb"},
  cdmx13:{date:"2027-02-13T20:00:00-06:00",label:"13 FEB 2027 · CDMX",venue:"Palacio de los Deportes",city:"Ciudad de México",title:"Hilary Duff - the lucky me tour · CDMX 13 Feb"},
  gdl15:{date:"2027-02-15T20:30:00-06:00",label:"15 FEB 2027 · GDL",venue:"Auditorio Telmex",city:"Guadalajara, Jalisco",title:"Hilary Duff - the lucky me tour · Guadalajara"}
};
let currentShow=localStorage.getItem("hdm-show")||"cdmx12";
function daysUntil(iso){return Math.max(0,Math.ceil((new Date(iso).getTime()-Date.now())/86400000));}
function restoreChecks(){
  const saved=JSON.parse(localStorage.getItem("hdm-check-"+currentShow)||"{}");
  $$("[data-check]").forEach(i=>i.checked=!!saved[i.dataset.check]);
}
function setShow(key){
  const d=shows[key];if(!d)return;
  currentShow=key;localStorage.setItem("hdm-show",key);
  $("[data-days]").textContent=daysUntil(d.date);
  $("[data-show-label]").textContent=d.label;
  $("[data-venue]").textContent=d.venue;
  $("[data-city]").textContent=d.city;
  $$("[data-show]").forEach(b=>b.classList.toggle("active",b.dataset.show===key));
  restoreChecks();
}
$$("[data-show]").forEach(b=>b.addEventListener("click",()=>setShow(b.dataset.show)));
setShow(currentShow);
setInterval(()=>setShow(currentShow),60000);
$$("[data-check]").forEach(i=>i.addEventListener("change",()=>{const state={};$$("[data-check]").forEach(x=>state[x.dataset.check]=x.checked);localStorage.setItem("hdm-check-"+currentShow,JSON.stringify(state));}));
$("[data-calendar]")?.addEventListener("click",()=>{
  const d=shows[currentShow],start=new Date(d.date),end=new Date(start.getTime()+2.5*3600000),fmt=x=>x.toISOString().replace(/[-:]/g,"").replace(/.d{3}Z/,"Z");
  const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//HDM//Mexico 2027//ES","BEGIN:VEVENT","DTSTART:"+fmt(start),"DTEND:"+fmt(end),"SUMMARY:"+d.title,"LOCATION:"+d.venue+", "+d.city,"DESCRIPTION:Hilary Duff - the lucky me tour. Verifica horarios y accesos oficiales antes del evento.","END:VEVENT","END:VCALENDAR"].join("\r\n");
  const blob=new Blob([ics],{type:"text/calendar"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="HDM-"+currentShow+".ics";a.click();setTimeout(()=>URL.revokeObjectURL(url),500);
});

$("[data-newsletter-form]")?.addEventListener("submit",e=>{
  e.preventDefault();
  const email=$("#newsletter-email").value.trim();if(!email)return;
  localStorage.setItem("hdm-newsletter-demo",email);
  $("[data-newsletter-note]").textContent="Correo guardado sólo en este dispositivo para la demo.";
  e.currentTarget.reset();toast("Suscripción de prueba guardada ✦");
});

const searchItems=[
  {cat:"PERSONAJE",title:"Yonica Babyyeah",keys:"yonica babyyeah war inc 2008",target:"#universo",action:()=>setCharacter("yonica")},
  {cat:"PERSONAJE",title:"Tanzie Marchetta",keys:"tanzie material girls",target:"#universo",action:()=>setCharacter("tanzie")},
  {cat:"PERSONAJE",title:"Kelly Collins",keys:"kelly cadete",target:"#universo",action:()=>setCharacter("kelly")},
  {cat:"PERSONAJE",title:"Sam Montgomery",keys:"sam cinderella story",target:"#universo",action:()=>setCharacter("sam")},
  {cat:"PERSONAJE",title:"Kelsey Peters",keys:"kelsey younger",target:"#universo",action:()=>setCharacter("kelsey")},
  {cat:"MÚSICA",title:"Dignity",keys:"with love stranger play with fire",target:"#musica",action:()=>setAlbum("dignity")},
  {cat:"MÚSICA",title:"Metamorphosis",keys:"come clean so yesterday why not",target:"#musica",action:()=>setAlbum("meta")},
  {cat:"MÚSICA",title:"luck… or something",keys:"mature roommates future tripping",target:"#musica",action:()=>setAlbum("luck")},
  {cat:"MÉXICO",title:"México 2027",keys:"boletos cdmx guadalajara gdl palacio telmex",target:"#mexico"},
  {cat:"HDM",title:"Únete a HDM",keys:"registro fan club",url:"./unete.html"},
  {cat:"HDM",title:"Instagram",keys:"instagram comunidad",url:"https://www.instagram.com/hilaryduffmexico/"}
];
const dialog=$("[data-search-dialog]"),input=$("[data-search-input]"),results=$("[data-search-results]");
const norm=v=>(v||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
function renderSearch(q=""){
  const query=norm(q.trim()),found=query?searchItems.filter(i=>norm(i.cat+" "+i.title+" "+i.keys).includes(query)):searchItems.slice(0,8);
  results.innerHTML="";
  if(!found.length){results.innerHTML='<div class="search-empty">No encontré eso. Prueba otra palabra.</div>';return;}
  found.forEach(item=>{
    const b=document.createElement("button");b.type="button";b.className="search-result";b.innerHTML=`<small>${item.cat}</small><b>${item.title}</b><em>→</em>`;
    b.addEventListener("click",()=>{dialog.close();item.action?.();if(item.target)setTimeout(()=>$(item.target)?.scrollIntoView({behavior:"smooth"}),80);if(item.url){if(item.url.startsWith("./"))location.href=item.url;else window.open(item.url,"_blank","noopener");}});
    results.appendChild(b);
  });
}
function openSearch(){if(!dialog.open)dialog.showModal();renderSearch("");requestAnimationFrame(()=>input.focus());}
$$("[data-search-open]").forEach(b=>b.addEventListener("click",openSearch));
input?.addEventListener("input",()=>renderSearch(input.value));
document.addEventListener("keydown",e=>{if(e.key==="/"&&!/input|textarea/i.test(document.activeElement?.tagName||"")){e.preventDefault();openSearch();}});
dialog?.addEventListener("click",e=>{const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
renderSearch("");

const randomActions=[
  ()=>{setCharacter("yonica");$("#universo").scrollIntoView({behavior:"smooth"});},
  ()=>{setAlbum("dignity");$("#musica").scrollIntoView({behavior:"smooth"});},
  ()=>{setCharacter("sam");$("#universo").scrollIntoView({behavior:"smooth"});},
  ()=>{$("#lizzie").scrollIntoView({behavior:"smooth"});},
  ()=>{$("#mexico").scrollIntoView({behavior:"smooth"});}
];
$$("[data-random]").forEach(b=>b.addEventListener("click",()=>randomActions[Math.floor(Math.random()*randomActions.length)]()));

let deferredPrompt=null;const installDialog=$("[data-install-dialog]");
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;});
$$("[data-install]").forEach(b=>b.addEventListener("click",async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;}else installDialog.showModal();}));
installDialog?.addEventListener("click",e=>{const r=installDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)installDialog.close();});

function toast(text){let t=$(".toast");if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t);}t.textContent=text;t.classList.add("show");clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove("show"),2200);}

const mobileLinks=$$(".mobile-nav a");
const navObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const id=entry.target.id;mobileLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id));});},{rootMargin:"-42% 0px -48% 0px"});
$$("section[id]").forEach(s=>navObserver.observe(s));

if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));


/* V11 interaction system */
const finePointer=matchMedia("(pointer:fine)").matches;
const interactionReduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

const progress=document.createElement("div");
progress.className="scroll-progress";
progress.innerHTML="<i></i>";
document.body.appendChild(progress);

function clamp(v,min,max){return Math.min(max,Math.max(min,v));}

let scrollTick=0,lastScrollY=scrollY,scrollVelocity=0;
const parallaxMap=[
  [$(".hero-copy"),.22],
  [$(".hero-photo"),-.16],
  [$(".chip-lizzie"),.42],
  [$(".chip-mx"),-.32],
  [$(".chip-dignity"),.28],
  [$(".lead-orb"),-.22],
  [$(".character-stage-glow"),-.2],
  [$(".cd-disc"),-.24],
  [$(".cd-case"),.15],
  [$(".lp-a"),-.16],
  [$(".lp-b"),.24],
  [$(".lizzie-spark"),-.34],
  [$(".newsletter-orbit"),-.12],
  [$(".phone-shell"),.18],
  [$(".footer-title"),.08]
].filter(([el])=>el);

function updateDepth(){
  scrollTick=0;
  const max=document.documentElement.scrollHeight-innerHeight;
  const p=max>0?scrollY/max:0;
  progress.style.setProperty("--progress",p);
  scrollVelocity+=(scrollY-lastScrollY-scrollVelocity)*.18;
  lastScrollY=scrollY;
  const mobile=innerWidth<820;
  parallaxMap.forEach(([el,depth])=>{
    const r=el.getBoundingClientRect();
    const center=(r.top+r.height/2)-innerHeight/2;
    const norm=clamp(center/innerHeight,-1.4,1.4);
    const amount=(mobile?18:34)*depth;
    el.style.setProperty("--scroll-y",(norm*amount)+"px");
  });
  document.documentElement.style.setProperty("--scroll-velocity",clamp(scrollVelocity,-40,40));
}
function requestDepth(){if(!scrollTick)scrollTick=requestAnimationFrame(updateDepth);}
addEventListener("scroll",requestDepth,{passive:true});
addEventListener("resize",requestDepth,{passive:true});
requestDepth();

const sheenTargets=$$(".surface,.character-stage,.music-world,.show-option,.countdown-panel,.show-panel,.hdm-statement,.hdm-actions a,.newsletter-mail,.phone-shell");
sheenTargets.forEach(el=>{
  if(!el.querySelector(":scope > .surface-sheen")){
    const sheen=document.createElement("span");
    sheen.className="surface-sheen";
    sheen.setAttribute("aria-hidden","true");
    el.appendChild(sheen);
  }
  el.addEventListener("pointermove",e=>{
    if(!finePointer)return;
    const r=el.getBoundingClientRect();
    el.style.setProperty("--spot-x",((e.clientX-r.left)/r.width*100)+"%");
    el.style.setProperty("--spot-y",((e.clientY-r.top)/r.height*100)+"%");
  },{passive:true});
});

if(finePointer&&!interactionReduce){
  document.body.classList.add("has-hdm-cursor");
  const cursor=document.createElement("div");
  cursor.className="hdm-cursor";
  cursor.innerHTML='<i></i><span></span>';
  document.body.appendChild(cursor);
  const label=cursor.querySelector("span");
  let x=innerWidth/2,y=innerHeight/2,cx=x,cy=y,raf=0;
  function cursorFrame(){
    raf=0;cx+=(x-cx)*.2;cy+=(y-cy)*.2;
    cursor.style.transform=`translate3d(${cx}px,${cy}px,0)`;
    if(Math.abs(x-cx)>.1||Math.abs(y-cy)>.1)raf=requestAnimationFrame(cursorFrame);
  }
  addEventListener("pointermove",e=>{x=e.clientX;y=e.clientY;if(!raf)raf=requestAnimationFrame(cursorFrame);},{passive:true});

  const cursorLabelFor=el=>{
    if(el.matches("[data-random-song]"))return"OÍR";
    if(el.matches("[data-show]"))return"ELEGIR";
    if(el.matches("[data-album]"))return"ERA";
    if(el.matches("[data-character]"))return"VER";
    if(el.matches("button"))return"";
    if(el.matches("a"))return"ABRIR";
    return"";
  };
  $$("a,button,input,.surface,.newsletter-mail").forEach(el=>{
    el.addEventListener("pointerenter",()=>{const t=cursorLabelFor(el);cursor.classList.add("is-active");label.textContent=t;cursor.classList.toggle("has-label",!!t);});
    el.addEventListener("pointerleave",()=>{cursor.classList.remove("is-active","has-label");label.textContent="";});
  });

  $$(".cta,.icon-btn,.search-btn,.hdm-actions a,.footer-bottom button,.show-option").forEach(el=>{
    el.classList.add("magnetic");
    el.addEventListener("pointermove",e=>{
      const r=el.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);
      el.style.setProperty("--mag-x",(dx*.08)+"px");
      el.style.setProperty("--mag-y",(dy*.11)+"px");
    });
    el.addEventListener("pointerleave",()=>{el.style.setProperty("--mag-x","0px");el.style.setProperty("--mag-y","0px");});
  });

  const hero=$(".hero");
  hero?.addEventListener("pointermove",e=>{
    const r=hero.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;
    hero.style.setProperty("--hero-rx",(-ny*5)+"deg");
    hero.style.setProperty("--hero-ry",(nx*7)+"deg");
    hero.style.setProperty("--hero-x",(nx*18)+"px");
    hero.style.setProperty("--hero-y",(ny*14)+"px");
    const lizzie=$(".chip-lizzie"),mxChip=$(".chip-mx"),dignity=$(".chip-dignity");
    lizzie?.style.setProperty("--chip-x",(nx*-14)+"px");
    lizzie?.style.setProperty("--chip-y",(ny*-10)+"px");
    mxChip?.style.setProperty("--chip-x",(nx*12)+"px");
    mxChip?.style.setProperty("--chip-y",(ny*9)+"px");
    dignity?.style.setProperty("--chip-x",(nx*16)+"px");
    dignity?.style.setProperty("--chip-y",(ny*12)+"px");
  },{passive:true});
  hero?.addEventListener("pointerleave",()=>{
    ["--hero-rx","--hero-ry"].forEach(v=>hero.style.setProperty(v,"0deg"));
    ["--hero-x","--hero-y"].forEach(v=>hero.style.setProperty(v,"0px"));
  });

  [$(".music-world"),$(".newsletter-orbit"),$(".phone-shell")].filter(Boolean).forEach(el=>{
    el.addEventListener("pointermove",e=>{
      const r=el.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;
      el.style.setProperty("--object-rx",(-ny*5)+"deg");
      el.style.setProperty("--object-ry",(nx*7)+"deg");
    },{passive:true});
    el.addEventListener("pointerleave",()=>{el.style.setProperty("--object-rx","0deg");el.style.setProperty("--object-ry","0deg");});
  });
}

document.addEventListener("pointerdown",e=>{
  const target=e.target.closest("a,button,.surface,.character-row,.show-option");
  if(!target||interactionReduce)return;
  const burst=document.createElement("span");
  burst.className="tap-burst";
  burst.style.left=e.clientX+"px";burst.style.top=e.clientY+"px";
  burst.innerHTML="<i></i><i></i><i></i>";
  document.body.appendChild(burst);
  setTimeout(()=>burst.remove(),700);
},{passive:true});

if(!interactionReduce){
  const mobileDepth=()=>{
    if(innerWidth>=820)return;
    const hero=$(".hero");
    if(!hero)return;
    const r=hero.getBoundingClientRect();
    const n=clamp(-r.top/Math.max(1,r.height),0,1);
    hero.style.setProperty("--mobile-depth",n);
  };
  addEventListener("scroll",mobileDepth,{passive:true});
  mobileDepth();
}
