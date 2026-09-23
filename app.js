const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
const desktop3D=matchMedia("(min-width: 901px) and (pointer:fine)").matches;

/* Load WebGL only on desktop and only after the page is usable. */
if(desktop3D&&!reduced){
  const load3D=()=>import("./three-scene.js").catch(()=>{});
  if("requestIdleCallback" in window)requestIdleCallback(load3D,{timeout:1800});
  else setTimeout(load3D,800);
}

/* Lightweight desktop cursor + hero parallax. */
if(desktop3D&&!reduced){
  document.body.classList.add("cursor-ready");
  const cursor=document.createElement("div");
  cursor.className="custom-cursor";
  document.body.appendChild(cursor);

  let x=-50,y=-50,cx=x,cy=y,raf=0;
  const draw=()=>{
    raf=0;
    cx+=(x-cx)*.24;
    cy+=(y-cy)*.24;
    cursor.style.transform="translate3d("+cx+"px,"+cy+"px,0)";
    if(Math.abs(x-cx)>.1||Math.abs(y-cy)>.1)raf=requestAnimationFrame(draw);
  };
  addEventListener("pointermove",e=>{x=e.clientX;y=e.clientY;if(!raf)raf=requestAnimationFrame(draw);},{passive:true});
  document.addEventListener("pointerover",e=>{if(e.target.closest("a,button"))cursor.classList.add("active");});
  document.addEventListener("pointerout",e=>{if(e.target.closest("a,button"))cursor.classList.remove("active");});

  const hero=$(".hero");
  const visual=$(".hero-visual");
  if(hero&&visual){
    let tx=0,ty=0,pr=0;
    const paint=()=>{
      pr=0;
      $(".hero-photo").style.transform="rotateX("+(-ty*3)+"deg) rotateY("+(tx*4)+"deg) rotate(1deg)";
      $(".token-lizzie").style.translate=(tx*-9)+"px "+(ty*-7)+"px";
      $(".token-mexico").style.translate=(tx*8)+"px "+(ty*6)+"px";
      $(".token-dignity").style.translate=(tx*11)+"px "+(ty*8)+"px";
    };
    hero.addEventListener("pointermove",e=>{
      const r=hero.getBoundingClientRect();
      tx=(e.clientX-r.left)/r.width-.5;
      ty=(e.clientY-r.top)/r.height-.5;
      if(!pr)pr=requestAnimationFrame(paint);
    },{passive:true});
    hero.addEventListener("pointerleave",()=>{
      tx=ty=0;
      if(!pr)pr=requestAnimationFrame(paint);
    });
  }
}

/* News: Spotify is a facade until the user asks for the embed. */
$("[data-load-spotify]")?.addEventListener("click",e=>{
  const host=$("[data-spotify-embed]");
  if(!host||host.dataset.loaded)return;
  host.dataset.loaded="1";
  host.hidden=false;
  host.innerHTML='<iframe title="luck... or something en Spotify" src="https://open.spotify.com/embed/album/71t4M602DGtkhsy1RtNAME?utm_source=generator&theme=0" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>';
  e.currentTarget.remove();
});

/* Music. */
const albums={
  santa:{year:"2002",title:"Santa Claus Lane",monogram:"SC",copy:"El primer álbum de estudio de Hilary.",tracks:["Santa Claus Lane","Tell Me a Story","I Heard Santa on the Radio"],theme:"santa"},
  meta:{year:"2003",title:"Metamorphosis",monogram:"M",copy:"El disco que llevó la carrera pop de Hilary a otra escala y dejó “So Yesterday” y “Come Clean” al centro de esa etapa.",tracks:["So Yesterday","Come Clean","Why Not"],theme:"meta"},
  self:{year:"2004",title:"Hilary Duff",monogram:"HD",copy:"Más guitarras, un tono más directo y canciones como “Fly”, “The Getaway” y “Someone’s Watching Over Me”.",tracks:["Fly","The Getaway","Someone’s Watching Over Me"],theme:"self"},
  dignity:{year:"2007",title:"Dignity",monogram:"D",copy:"El giro electrónico de “With Love”, “Stranger” y “Play With Fire”.",tracks:["With Love","Stranger","Play With Fire"],theme:"dignity"},
  bibo:{year:"2015",title:"Breathe In. Breathe Out.",monogram:"B",copy:"El regreso de 2015 con “Sparks”, “My Kind” y la canción que da nombre al disco.",tracks:["Sparks","My Kind","Breathe In. Breathe Out."],theme:"bibo"},
  luck:{year:"2026",title:"luck… or something",monogram:"…",copy:"El regreso musical completo: nuevo álbum, nueva gira y once canciones.",tracks:["Weather For Tennis","Roommates","Future Tripping"],theme:"luck"}
};
function setAlbum(key){
  const d=albums[key],world=$("[data-music-world]");
  if(!d||!world)return;
  world.dataset.theme=d.theme;
  $("[data-album-year]").textContent=d.year;
  $("[data-album-title]").textContent=d.title;
  $("[data-album-copy]").textContent=d.copy;
  $("[data-album-monogram]").textContent=d.monogram;
  const tracks=$("[data-album-tracks]");
  tracks.innerHTML="";
  d.tracks.forEach(t=>{const b=document.createElement("button");b.type="button";b.textContent=t;tracks.appendChild(b);});
  $$("[data-album]").forEach(b=>b.classList.toggle("active",b.dataset.album===key));
}
$$("[data-album]").forEach(b=>b.addEventListener("click",()=>setAlbum(b.dataset.album)));
$$("[data-open-album]").forEach(a=>a.addEventListener("click",()=>setAlbum(a.dataset.openAlbum)));

const songs=[
  ["Come Clean","Metamorphosis · 2003"],
  ["With Love","Dignity · 2007"],
  ["Stranger","Dignity · 2007"],
  ["Fly","Hilary Duff · 2004"],
  ["Wake Up","Most Wanted · 2005"],
  ["Sparks","Breathe In. Breathe Out. · 2015"],
  ["My Kind","Breathe In. Breathe Out. · 2015"],
  ["Mature","luck… or something · 2026"],
  ["Roommates","luck… or something · 2026"],
  ["Future Tripping","luck… or something · 2026"],
  ["So Yesterday","Metamorphosis · 2003"],
  ["Why Not","Metamorphosis · 2003"]
];
let lastSong=-1;
$("[data-random-song]")?.addEventListener("click",e=>{
  let n;
  do n=Math.floor(Math.random()*songs.length); while(n===lastSong&&songs.length>1);
  lastSong=n;
  const [title,meta]=songs[n];
  $("[data-song-title]").textContent=title;
  $("[data-song-meta]").textContent=meta;
  const link=$("[data-song-link]");
  link.href="https://open.spotify.com/search/"+encodeURIComponent("Hilary Duff "+title);
  link.textContent="Escuchar "+title+" ↗";
  e.currentTarget.textContent="Otra ✦";
});

/* Screen. */
const characters={
  lizzie:{year:"2001",type:"DISNEY CHANNEL",title:"Lizzie McGuire",copy:"Lizzie, Miranda, Gordo y el alter ego animado que acompañó a toda una generación.",theme:"lizzie",tags:["Gordo","Miranda","alter ego animado"],stamp:"25",link:["Abrir especial Lizzie ↓","#lizzie"]},
  kelly:{year:"2002",type:"DISNEY CHANNEL ORIGINAL MOVIE",title:"Kelly Collins",copy:"Una adolescente llega a una academia militar y termina encontrando su lugar sin dejar de ser ella.",theme:"kelly",tags:["Cadet Kelly","Stone","Disney+"],stamp:"KC",link:["Disney+ ↗","https://www.disneyplus.com/es-mx/browse/entity-8b14e5bf-0c24-407b-b660-d6a031e05c60"]},
  natalie:{year:"2003",type:"PELÍCULA",title:"Natalie Connors",copy:"La hija de un científico queda en medio de la primera gran misión de Cody Banks.",theme:"natalie",tags:["Agent Cody Banks","2003","Natalie"],stamp:"NC",link:["Apple TV ↗","https://tv.apple.com/mx/movie/agente-cody-banks---super-espia/umc.cmc.70g4gnyfmbmqnrcolvpco1mes"]},
  isabella:{year:"2003",type:"PELÍCULA · ROMA",title:"Lizzie / Isabella",copy:"Roma, Isabella, Paolo y el cierre cinematográfico de Lizzie McGuire.",theme:"isabella",tags:["Roma","Isabella","Paolo"],stamp:"ROMA",link:["Disney+ ↗","https://www.disneyplus.com/es-mx/explore/articles/lizzie-mcguire-anniversary"]},
  lorraine:{year:"2003",type:"PELÍCULA",title:"Lorraine Baker",copy:"La hermana mayor de la familia Baker en Doce en casa.",theme:"lorraine",tags:["Cheaper by the Dozen","familia Baker","2003"],stamp:"12",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  sam:{year:"2004",type:"PELÍCULA",title:"Sam Montgomery",copy:"A Cinderella Story convirtió a Sam en uno de los personajes más recordados del cine teen de los 2000.",theme:"sam",tags:["A Cinderella Story","Austin","diner"],stamp:"SAM",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  terri:{year:"2004",type:"PELÍCULA · MÚSICA",title:"Terri Fletcher",copy:"Raise Your Voice cruza música, duelo y el salto de Terri a una escuela de verano en Los Ángeles.",theme:"terri",tags:["Raise Your Voice","música","2004"],stamp:"TF",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  holly:{year:"2005",type:"PELÍCULA",title:"Holly Hamilton",copy:"En The Perfect Man, Holly inventa un admirador secreto para su madre.",theme:"holly",tags:["The Perfect Man","Holly","2005"],stamp:"HH",link:["Apple TV ↗","https://tv.apple.com/pt/movie/o-homem-perfeito/umc.cmc.53rjoz21v2m1mn753jwdoygwe"]},
  tanzie:{year:"2006",type:"PELÍCULA",title:"Tanzie Marchetta",copy:"Material Girls reunió a Hilary y Haylie como hermanas herederas de una empresa de cosméticos.",theme:"tanzie",tags:["Material Girls","Tanzie","Haylie Duff"],stamp:"TM",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  yonica:{year:"2008",type:"WAR, INC.",title:"Yonica Babyyeah",copy:"La estrella pop exagerada y extrañísima de War, Inc., uno de los papeles más fuera de registro de Hilary.",theme:"yonica",tags:["War, Inc.","Yonica Babyyeah","pop star"],stamp:"YB",link:["IMDb ↗","https://www.imdb.com/title/tt0884224/characters/nm0240381/"]},
  olivia:{year:"2009",type:"GOSSIP GIRL",title:"Olivia Burke",copy:"Una estrella de cine que llega a NYU y se cruza con Dan Humphrey.",theme:"olivia",tags:["Gossip Girl","NYU","Olivia"],stamp:"OB",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  lane:{year:"2010",type:"PELÍCULA PARA TV",title:"Lane Daniels",copy:"En Beauty & the Briefcase, Lane se infiltra en el mundo corporativo para escribir una historia.",theme:"lane",tags:["Beauty & the Briefcase","Lane","2010"],stamp:"LD",link:["Filmografía ↗","https://www.biography.com/actor/hilary-duff"]},
  kelsey:{year:"2015",type:"YOUNGER",title:"Kelsey Peters",copy:"Editora ambiciosa y una de las piezas centrales de Younger durante siete temporadas.",theme:"kelsey",tags:["Younger","publishing","Kelsey"],stamp:"KP",link:["IMDb ↗","https://www.imdb.com/title/tt3288518/characters/nm0240381/"]},
  sophie:{year:"2022",type:"HOW I MET YOUR FATHER",title:"Sophie",copy:"La protagonista de How I Met Your Father reconstruye su historia en Nueva York.",theme:"sophie",tags:["HIMYF","NYC","Sophie"],stamp:"S",link:["Disney+ ↗","https://www.disneyplus.com/en-mx/browse/entity-42771fe9-3174-43bc-ab6a-d8c3e618b934"]}
};
function setCharacter(key){
  const d=characters[key],stage=$("[data-character-stage]");
  if(!d||!stage)return;
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
}
$$("[data-character]").forEach(b=>b.addEventListener("click",()=>setCharacter(b.dataset.character)));

/* Mexico. */
const shows={
  cdmx12:{date:"2027-02-12T20:00:00-06:00",label:"12 FEB 2027 · CDMX",venue:"Palacio de los Deportes",city:"Ciudad de México",title:"Hilary Duff - the lucky me tour · CDMX 12 Feb"},
  cdmx13:{date:"2027-02-13T20:00:00-06:00",label:"13 FEB 2027 · CDMX",venue:"Palacio de los Deportes",city:"Ciudad de México",title:"Hilary Duff - the lucky me tour · CDMX 13 Feb"},
  gdl15:{date:"2027-02-15T20:30:00-06:00",label:"15 FEB 2027 · GDL",venue:"Auditorio Telmex",city:"Guadalajara, Jalisco",title:"Hilary Duff - the lucky me tour · Guadalajara"}
};
let currentShow=localStorage.getItem("hdm-show")||"cdmx12";
const daysUntil=iso=>Math.max(0,Math.ceil((new Date(iso)-Date.now())/86400000));
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
  const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//HDM//Mexico 2027//ES","BEGIN:VEVENT","DTSTART:"+fmt(start),"DTEND:"+fmt(end),"SUMMARY:"+d.title,"LOCATION:"+d.venue+", "+d.city,"DESCRIPTION:Hilary Duff - the lucky me tour. Verifica horarios y accesos oficiales antes del evento.","END:VEVENT","END:VCALENDAR"].join("\r\n");
  const url=URL.createObjectURL(new Blob([ics],{type:"text/calendar"}));
  const a=document.createElement("a");a.href=url;a.download="HDM-"+currentShow+".ics";a.click();setTimeout(()=>URL.revokeObjectURL(url),500);
});

/* Newsletter demo. */
$("[data-newsletter-form]")?.addEventListener("submit",e=>{
  e.preventDefault();
  const email=$("#newsletter-email").value.trim();if(!email)return;
  localStorage.setItem("hdm-newsletter-demo",email);
  $("[data-newsletter-note]").textContent="Listo. En esta demo el correo sólo se guarda en tu dispositivo.";
  e.currentTarget.reset();
});

/* More sheet and mobile navigation. */
const more=$("[data-more-sheet]");
$("[data-more-open]")?.addEventListener("click",()=>more?.showModal());
$("[data-more-close]")?.addEventListener("click",()=>more?.close());
$$("[data-sheet-link]").forEach(a=>a.addEventListener("click",()=>more?.close()));
more?.addEventListener("click",e=>{if(e.target===more)more.close();});

const mobileLinks=$$(".mobile-nav a");
const moreButton=$("[data-more-open]");
const navTargets=["inicio","ahora","musica","mexico"];
const navObserver=new IntersectionObserver(entries=>{
  const hit=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!hit)return;
  const id=hit.target.id;
  mobileLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id));
  moreButton?.classList.toggle("active",!navTargets.includes(id));
},{rootMargin:"-36% 0px -56% 0px",threshold:[.01,.25,.5]});
$$("main section[id]").forEach(s=>navObserver.observe(s));

/* Search. */
const searchItems=[
  {cat:"PERSONAJE",title:"Yonica Babyyeah",keys:"yonica babyyeah war inc 2008",target:"#pantalla",action:()=>setCharacter("yonica")},
  {cat:"PERSONAJE",title:"Tanzie Marchetta",keys:"tanzie material girls",target:"#pantalla",action:()=>setCharacter("tanzie")},
  {cat:"PERSONAJE",title:"Kelly Collins",keys:"kelly cadete",target:"#pantalla",action:()=>setCharacter("kelly")},
  {cat:"PERSONAJE",title:"Sam Montgomery",keys:"sam cinderella story",target:"#pantalla",action:()=>setCharacter("sam")},
  {cat:"PERSONAJE",title:"Kelsey Peters",keys:"kelsey younger",target:"#pantalla",action:()=>setCharacter("kelsey")},
  {cat:"MÚSICA",title:"Dignity",keys:"with love stranger play with fire",target:"#musica",action:()=>setAlbum("dignity")},
  {cat:"MÚSICA",title:"Metamorphosis",keys:"come clean so yesterday why not",target:"#musica",action:()=>setAlbum("meta")},
  {cat:"MÚSICA",title:"luck… or something",keys:"mature roommates future tripping",target:"#musica",action:()=>setAlbum("luck")},
  {cat:"MÉXICO",title:"México 2027",keys:"boletos cdmx guadalajara gdl palacio telmex",target:"#mexico"},
  {cat:"HDM",title:"Inscríbete a HDM",keys:"registro fan club membresia",url:"./unete.html"},
  {cat:"HDM",title:"Instagram",keys:"instagram comunidad",url:"https://www.instagram.com/hilaryduffmexico/"}
];
const dialog=$("[data-search-dialog]"),input=$("[data-search-input]"),results=$("[data-search-results]");
const norm=v=>(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
function renderSearch(q=""){
  const query=norm(q.trim());
  const found=query?searchItems.filter(i=>norm(i.cat+" "+i.title+" "+i.keys).includes(query)):searchItems.slice(0,8);
  results.innerHTML="";
  if(!found.length){results.innerHTML='<div class="search-empty">No encontré eso. Prueba otra palabra.</div>';return;}
  found.forEach(item=>{
    const b=document.createElement("button");b.type="button";b.className="search-result";
    b.innerHTML="<small>"+item.cat+"</small><b>"+item.title+"</b><em>→</em>";
    b.addEventListener("click",()=>{
      dialog.close();more?.close();
      item.action?.();
      if(item.target)setTimeout(()=>$(item.target)?.scrollIntoView({behavior:"smooth"}),50);
      if(item.url){if(item.url.startsWith("./"))location.href=item.url;else window.open(item.url,"_blank","noopener");}
    });
    results.appendChild(b);
  });
}
function openSearch(){
  more?.close();
  if(!dialog.open)dialog.showModal();
  input.value="";renderSearch();requestAnimationFrame(()=>input.focus());
}
$$("[data-search-open]").forEach(b=>b.addEventListener("click",openSearch));
input?.addEventListener("input",()=>renderSearch(input.value));
document.addEventListener("keydown",e=>{if(e.key==="/"&&!/input|textarea/i.test(document.activeElement?.tagName||"")){e.preventDefault();openSearch();}});
dialog?.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
renderSearch();

/* Install: only expose when the browser can act on it or on iOS. */
let deferredPrompt=null;
const installButton=$("[data-install]");
const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
const standalone=matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
if(ios&&!standalone)installButton.hidden=false;
window.addEventListener("beforeinstallprompt",e=>{
  e.preventDefault();deferredPrompt=e;
  installButton.hidden=false;
});
installButton?.addEventListener("click",async()=>{
  more?.close();
  if(deferredPrompt){
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt=null;
    installButton.hidden=true;
  }else if(ios){
    showToast("En iPhone: Compartir → Agregar a pantalla de inicio.");
  }
});

function showToast(text){
  let t=$(".toast");
  if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t);}
  t.textContent=text;t.classList.add("show");
  clearTimeout(showToast._t);showToast._t=setTimeout(()=>t.classList.remove("show"),3000);
}

/* Service worker. */
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));