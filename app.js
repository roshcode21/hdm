const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const mobileMQ=matchMedia("(max-width: 820px)");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

const characters={
  lizzie:{year:"2001",type:"DISNEY CHANNEL",title:"Lizzie McGuire",copy:"La serie que presentó a Hilary a toda una generación. Gordo, Miranda y su alter ego animado siguen siendo parte central de su historia.",theme:"lizzie",tags:["Gordo","Miranda","25 años"],stamp:"25",link:["Especial de Disney+ ↗","https://www.disneyplus.com/es-mx/explore/articles/lizzie-mcguire-anniversary"]},
  kelly:{year:"2002",type:"DISNEY CHANNEL ORIGINAL MOVIE",title:"Kelly Collins",copy:"En La cadete Kelly, Hilary interpreta a una adolescente que entra a una academia militar y termina encontrando su lugar ahí.",theme:"kelly",tags:["Cadet Kelly","Disney+","2002"],stamp:"KC",link:["Ver en Disney+ ↗","https://www.disneyplus.com/es-mx/browse/entity-8b14e5bf-0c24-407b-b660-d6a031e05c60"]},
  natalie:{year:"2003",type:"PELÍCULA",title:"Natalie Connors",copy:"Natalie es la hija del científico que Cody Banks debe proteger en Agent Cody Banks.",theme:"natalie",tags:["Agent Cody Banks","2003"],stamp:"NC",link:["Apple TV ↗","https://tv.apple.com/mx/movie/agente-cody-banks---super-espia/umc.cmc.70g4gnyfmbmqnrcolvpco1mes"]},
  isabella:{year:"2003",type:"PELÍCULA · ROMA",title:"Lizzie / Isabella",copy:"En The Lizzie McGuire Movie, Hilary interpreta a Lizzie y también a Isabella, la estrella pop con la que Paolo intenta engañarla.",theme:"isabella",tags:["Roma","Isabella","Paolo"],stamp:"ROMA",link:["Especial de Disney+ ↗","https://www.disneyplus.com/es-mx/explore/articles/lizzie-mcguire-anniversary"]},
  lorraine:{year:"2003",type:"PELÍCULA",title:"Lorraine Baker",copy:"La hermana mayor de los Baker en Doce en casa, una de las películas familiares más conocidas de esa etapa.",theme:"lorraine",tags:["Cheaper by the Dozen","2003"],stamp:"12",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  sam:{year:"2004",type:"PELÍCULA",title:"Sam Montgomery",copy:"A Cinderella Story convirtió a Sam Montgomery en uno de los personajes más recordados de Hilary fuera de Disney Channel.",theme:"sam",tags:["A Cinderella Story","Austin","2004"],stamp:"SAM",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  terri:{year:"2004",type:"PELÍCULA · MÚSICA",title:"Terri Fletcher",copy:"Raise Your Voice mezcla drama, música y escuela de artes con Hilary al centro.",theme:"terri",tags:["Raise Your Voice","2004"],stamp:"TF",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  holly:{year:"2005",type:"PELÍCULA",title:"Holly Hamilton",copy:"En The Perfect Man, Holly inventa un admirador secreto para intentar mejorar la vida amorosa de su mamá.",theme:"holly",tags:["The Perfect Man","2005"],stamp:"HH",link:["Apple TV ↗","https://tv.apple.com/pt/movie/o-homem-perfeito/umc.cmc.53rjoz21v2m1mn753jwdoygwe"]},
  tanzie:{year:"2006",type:"PELÍCULA",title:"Tanzie Marchetta",copy:"Hilary y Haylie interpretan a las hermanas Marchetta en Material Girls.",theme:"tanzie",tags:["Material Girls","Haylie Duff","2006"],stamp:"TM",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  yonica:{year:"2008",type:"WAR, INC.",title:"Yonica Babyyeah",copy:"La estrella pop exagerada de War, Inc. es uno de los papeles más extraños y deliberadamente distintos de Hilary.",theme:"yonica",tags:["War, Inc.","Yonica Babyyeah","2008"],stamp:"YB",link:["IMDb ↗","https://www.imdb.com/title/tt0884224/characters/nm0240381/"]},
  olivia:{year:"2009",type:"GOSSIP GIRL",title:"Olivia Burke",copy:"Una actriz famosa que llega a NYU y se cruza con Dan Humphrey durante la tercera temporada de Gossip Girl.",theme:"olivia",tags:["Gossip Girl","NYU","2009"],stamp:"OB",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  lane:{year:"2010",type:"PELÍCULA PARA TV",title:"Lane Daniels",copy:"En Beauty & the Briefcase, Lane se infiltra en el mundo corporativo mientras escribe una historia para una revista.",theme:"lane",tags:["Beauty & the Briefcase","2010"],stamp:"LD",link:["Filmografía ↗","https://www.biography.com/actor/hilary-duff"]},
  kelsey:{year:"2015",type:"YOUNGER",title:"Kelsey Peters",copy:"Kelsey Peters acompañó a Hilary durante las siete temporadas de Younger y marcó su regreso fuerte a la televisión adulta.",theme:"kelsey",tags:["Younger","Kelsey Peters","2015"],stamp:"KP",link:["IMDb ↗","https://www.imdb.com/title/tt3288518/characters/nm0240381/"]},
  sophie:{year:"2022",type:"HOW I MET YOUR FATHER",title:"Sophie",copy:"Sophie es la protagonista de How I Met Your Father y cuenta la historia de cómo conoció al padre de su hijo.",theme:"sophie",tags:["HIMYF","Sophie","2022"],stamp:"S",link:["Disney+ ↗","https://www.disneyplus.com/en-mx/browse/entity-42771fe9-3174-43bc-ab6a-d8c3e618b934"]}
};

function fillCharacter(target,d){
  target.dataset.theme=d.theme;
  target.querySelector("[data-character-year]").textContent=d.year;
  target.querySelector("[data-character-type]").textContent=d.type;
  target.querySelector("[data-character-title]").textContent=d.title;
  target.querySelector("[data-character-copy]").textContent=d.copy;
  target.querySelector("[data-character-stamp]").textContent=d.stamp;
  const tags=target.querySelector("[data-character-tags]");
  tags.innerHTML=d.tags.map(t=>"<span>"+t+"</span>").join("");
  const a=target.querySelector("[data-character-link]");
  a.textContent=d.link[0];a.href=d.link[1];a.target="_blank";a.rel="noreferrer";
}

function setCharacter(key,row){
  const d=characters[key];if(!d)return;
  $$("[data-character]").forEach(b=>b.classList.toggle("active",b.dataset.character===key));

  if(mobileMQ.matches){
    $(".character-inline")?.remove();
    const panel=document.createElement("div");
    panel.className="character-inline";
    panel.dataset.theme=d.theme;
    panel.innerHTML='<span class="inline-year" data-character-year></span><div><span class="inline-type" data-character-type></span><h3 data-character-title></h3><p data-character-copy></p><div class="character-tags" data-character-tags></div><a data-character-link></a></div><b data-character-stamp></b>';
    fillCharacter(panel,d);
    (row||$('[data-character="'+key+'"]'))?.insertAdjacentElement("afterend",panel);
  }else{
    fillCharacter($("[data-character-stage]"),d);
  }
}
$$("[data-character]").forEach(row=>{
  row.addEventListener("click",()=>setCharacter(row.dataset.character,row));
  row.addEventListener("pointerenter",()=>{if(!mobileMQ.matches)setCharacter(row.dataset.character,row);},{passive:true});
  row.addEventListener("focus",()=>{if(!mobileMQ.matches)setCharacter(row.dataset.character,row);});
});

const albums={
  santa:{year:"2002",title:"Santa Claus Lane",monogram:"SC",copy:"El primer álbum de estudio de Hilary.",tracks:["Santa Claus Lane","Tell Me a Story","I Heard Santa on the Radio"],theme:"santa"},
  meta:{year:"2003",title:"Metamorphosis",monogram:"M",copy:"El álbum que llevó la carrera pop de Hilary a otra escala.",tracks:["So Yesterday","Come Clean","Why Not"],theme:"meta"},
  self:{year:"2004",title:"Hilary Duff",monogram:"HD",copy:"Una etapa con más guitarras, Fly y Someone’s Watching Over Me.",tracks:["Fly","The Getaway","Someone’s Watching Over Me"],theme:"self"},
  dignity:{year:"2007",title:"Dignity",monogram:"D",copy:"El giro electrónico de With Love, Stranger y Play With Fire.",tracks:["With Love","Stranger","Play With Fire"],theme:"dignity"},
  bibo:{year:"2015",title:"Breathe In. Breathe Out.",monogram:"B",copy:"El regreso de 2015 con Sparks, My Kind y Breathe In. Breathe Out.",tracks:["Sparks","My Kind","Breathe In. Breathe Out."],theme:"bibo"},
  luck:{year:"2026",title:"luck… or something",monogram:"…",copy:"El regreso musical de 2026 y el disco que acompaña the lucky me tour.",tracks:["Weather For Tennis","Roommates","Future Tripping"],theme:"luck"}
};
function setAlbum(key){
  const d=albums[key];if(!d)return;
  const world=$("[data-music-world]");
  world.dataset.theme=d.theme;
  $("[data-album-year]").textContent=d.year;
  $("[data-album-title]").textContent=d.title;
  $("[data-album-copy]").textContent=d.copy;
  $("[data-album-monogram]").textContent=d.monogram;
  $("[data-album-tracks]").innerHTML=d.tracks.map(t=>"<button type='button'>"+t+"</button>").join("");
  $$("[data-album]").forEach(b=>b.classList.toggle("active",b.dataset.album===key));
}
$$("[data-album]").forEach(b=>b.addEventListener("click",()=>setAlbum(b.dataset.album)));
$$("[data-open-album]").forEach(a=>a.addEventListener("click",()=>setAlbum(a.dataset.openAlbum)));

const songs=[
  ["Come Clean","Metamorphosis · 2003"],["With Love","Dignity · 2007"],["Stranger","Dignity · 2007"],
  ["Fly","Hilary Duff · 2004"],["Wake Up","Most Wanted · 2005"],["Sparks","Breathe In. Breathe Out. · 2015"],
  ["My Kind","Breathe In. Breathe Out. · 2015"],["Mature","luck… or something · 2026"],
  ["Roommates","luck… or something · 2026"],["Future Tripping","luck… or something · 2026"],["So Yesterday","Metamorphosis · 2003"]
];
let lastSong=-1;
$("[data-random-song]")?.addEventListener("click",e=>{
  let pick;do{pick=Math.floor(Math.random()*songs.length)}while(pick===lastSong&&songs.length>1);lastSong=pick;
  const [title,meta]=songs[pick];
  const result=$("[data-song-result]");
  result.classList.remove("song-landed");void result.offsetWidth;
  $("[data-song-title]").textContent=title;
  $("[data-song-meta]").textContent=meta;
  const link=$("[data-song-link]");
  link.href="https://open.spotify.com/search/"+encodeURIComponent("Hilary Duff "+title);
  link.textContent="Escuchar en Spotify ↗";
  result.classList.add("song-landed");
});

const shows={
  cdmx12:{date:"2027-02-12T20:00:00-06:00",label:"12 FEB 2027 · CDMX",venue:"Palacio de los Deportes",city:"Ciudad de México",title:"Hilary Duff - the lucky me tour · CDMX 12 Feb"},
  cdmx13:{date:"2027-02-13T20:00:00-06:00",label:"13 FEB 2027 · CDMX",venue:"Palacio de los Deportes",city:"Ciudad de México",title:"Hilary Duff - the lucky me tour · CDMX 13 Feb"},
  gdl15:{date:"2027-02-15T20:30:00-06:00",label:"15 FEB 2027 · GDL",venue:"Auditorio Telmex",city:"Guadalajara, Jalisco",title:"Hilary Duff - the lucky me tour · Guadalajara"}
};
let currentShow=localStorage.getItem("hdm-show")||"cdmx12";
function daysUntil(iso){return Math.max(0,Math.ceil((new Date(iso)-Date.now())/86400000))}
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
$$("[data-check]").forEach(i=>i.addEventListener("change",()=>{
  const state={};$$("[data-check]").forEach(x=>state[x.dataset.check]=x.checked);
  localStorage.setItem("hdm-check-"+currentShow,JSON.stringify(state));
}));
$("[data-calendar]")?.addEventListener("click",()=>{
  const d=shows[currentShow],start=new Date(d.date),end=new Date(start.getTime()+2.5*3600000);
  const fmt=x=>x.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z/,"Z");
  const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//HDM//Mexico 2027//ES","BEGIN:VEVENT","DTSTART:"+fmt(start),"DTEND:"+fmt(end),"SUMMARY:"+d.title,"LOCATION:"+d.venue+", "+d.city,"DESCRIPTION:Verifica horario y accesos oficiales antes del evento.","END:VEVENT","END:VCALENDAR"].join("\r\n");
  const blob=new Blob([ics],{type:"text/calendar"}),url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="HDM-"+currentShow+".ics";a.click();setTimeout(()=>URL.revokeObjectURL(url),500);
});

$("[data-newsletter-form]")?.addEventListener("submit",e=>{
  e.preventDefault();const email=$("#newsletter-email").value.trim();if(!email)return;
  localStorage.setItem("hdm-newsletter-demo",email);
  $("[data-newsletter-note]").textContent="Correo guardado sólo en este dispositivo para la demo.";
  e.currentTarget.reset();
});

const searchItems=[
  ["PERSONAJE","Yonica Babyyeah","yonica babyyeah war inc 2008","#hilary",()=>setCharacter("yonica")],
  ["PERSONAJE","Tanzie Marchetta","tanzie material girls","#hilary",()=>setCharacter("tanzie")],
  ["PERSONAJE","Kelly Collins","kelly cadete","#hilary",()=>setCharacter("kelly")],
  ["PERSONAJE","Sam Montgomery","sam cinderella story","#hilary",()=>setCharacter("sam")],
  ["MÚSICA","Dignity","dignity with love stranger","#musica",()=>setAlbum("dignity")],
  ["MÚSICA","Metamorphosis","come clean so yesterday","#musica",()=>setAlbum("meta")],
  ["MÉXICO","México 2027","boletos cdmx guadalajara gdl palacio telmex","#mexico"],
  ["HDM","Hazte miembro de HDM","registro fan club","./unete.html"]
];
const dialog=$("[data-search-dialog]"),input=$("[data-search-input]"),results=$("[data-search-results]");
const norm=v=>(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
function renderSearch(q=""){
  const query=norm(q.trim());
  const found=query?searchItems.filter(i=>norm(i.slice(0,3).join(" ")).includes(query)):searchItems;
  results.innerHTML=found.length?"":"<div class='search-empty'>No encontré eso.</div>";
  found.forEach(item=>{
    const b=document.createElement("button");b.type="button";b.className="search-result";
    b.innerHTML="<small>"+item[0]+"</small><b>"+item[1]+"</b><em>→</em>";
    b.addEventListener("click",()=>{
      dialog.close();item[4]?.();
      if(item[3].startsWith("./"))location.href=item[3];else scrollToTarget(item[3]);
    });
    results.appendChild(b);
  });
}
function openSearch(){if(!dialog.open)dialog.showModal();input.value="";renderSearch();requestAnimationFrame(()=>input.focus())}
$$("[data-search-open]").forEach(b=>b.addEventListener("click",openSearch));
input?.addEventListener("input",()=>renderSearch(input.value));
document.addEventListener("keydown",e=>{if(e.key==="/"&&!/INPUT|TEXTAREA/.test(document.activeElement?.tagName||"")){e.preventDefault();openSearch()}});
renderSearch();

function scrollToTarget(hash){
  const target=$(hash);if(!target)return;
  const header=$(".site-header")?.offsetHeight||0;
  const top=target.getBoundingClientRect().top+scrollY-header-10;
  scrollTo({top,behavior:reduce?"auto":"smooth"});
}
$$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
  const hash=a.getAttribute("href");if(!hash||hash==="#")return;
  if($(hash)){e.preventDefault();history.replaceState(null,"",hash);scrollToTarget(hash)}
}));

const mobileLinks=$$(".mobile-nav a");
const sectionMap={inicio:"#inicio",novedades:"#novedades",hilary:"#hilary",musica:"#hilary",lizzie:"#hilary",mexico:"#mexico",hdm:"#hdm",newsletter:"#hdm"};
const navObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const hash=sectionMap[entry.target.id];
    mobileLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===hash));
  });
},{rootMargin:"-38% 0px -52% 0px",threshold:.01});
$$("section[id]").forEach(s=>navObserver.observe(s));

let lastY=scrollY;
addEventListener("scroll",()=>{
  const nav=$(".mobile-nav");if(!nav||innerWidth>820)return;
  const y=scrollY,delta=y-lastY;
  if(y<120)nav.classList.remove("is-hidden");
  else if(delta>8)nav.classList.add("is-hidden");
  else if(delta<-8)nav.classList.remove("is-hidden");
  lastY=y;
},{passive:true});

const fine=matchMedia("(pointer:fine)").matches;
if(fine&&!reduce){
  const cursor=document.createElement("div");cursor.className="cursor-dot";document.body.appendChild(cursor);
  let x=-100,y=-100,cx=x,cy=y,raf=0;
  function paint(){raf=0;cx+=(x-cx)*.22;cy+=(y-cy)*.22;cursor.style.transform="translate3d("+cx+"px,"+cy+"px,0)";if(Math.abs(x-cx)>.2||Math.abs(y-cy)>.2)raf=requestAnimationFrame(paint)}
  addEventListener("pointermove",e=>{x=e.clientX;y=e.clientY;if(!raf)raf=requestAnimationFrame(paint)},{passive:true});
  document.addEventListener("pointerover",e=>cursor.classList.toggle("big",!!e.target.closest("a,button")));
  document.addEventListener("pointerout",e=>{if(e.target.closest("a,button"))cursor.classList.remove("big")});
}

if(!reduce){
  const hero=$(".hero");
  let scheduled=0;
  const updateHero=()=>{
    scheduled=0;if(!hero)return;
    const p=Math.max(0,Math.min(1,scrollY/Math.max(1,hero.offsetHeight)));
    hero.style.setProperty("--hero-scroll",p);
  };
  addEventListener("scroll",()=>{if(!scheduled)scheduled=requestAnimationFrame(updateHero)},{passive:true});
  updateHero();
}

function loadDesktop3D(){
  if(innerWidth<1000||!fine||reduce||navigator.connection?.saveData)return;
  const start=()=>import("./three-scene.js").catch(()=>{});
  if("requestIdleCallback" in window)requestIdleCallback(start,{timeout:1800});else setTimeout(start,800);
}
loadDesktop3D();

if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));