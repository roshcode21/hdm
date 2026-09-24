const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* lightweight click aura — desktop + touch */
document.addEventListener("pointerdown",e=>{
  if(reduce)return;
  const aura=document.createElement("span");
  aura.className="click-aura";
  aura.style.left=e.clientX+"px";
  aura.style.top=e.clientY+"px";
  document.body.appendChild(aura);
  setTimeout(()=>aura.remove(),520);
},{passive:true});

/* click-to-load media so Spotify/YouTube do not cost anything at first paint */
$("[data-load-spotify]")?.addEventListener("click",e=>{
  const host=$("[data-spotify-host]");
  if(!host||host.dataset.loaded)return;
  host.hidden=false;
  host.dataset.loaded="true";
  host.innerHTML='<iframe title="luck… or something en Spotify" src="https://open.spotify.com/embed/album/71t4M602DGtkhsy1RtNAME?utm_source=generator&theme=0" height="352" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>';
  e.currentTarget.textContent="Reproduciendo aquí";
  e.currentTarget.disabled=true;
});
$("[data-load-youtube]")?.addEventListener("click",()=>{
  const host=$("[data-youtube-host]");
  if(!host||host.dataset.loaded)return;
  host.hidden=false;
  host.dataset.loaded="true";
  host.innerHTML='<iframe title="Hilary Duff - Weather For Tennis (Official Video)" src="https://www.youtube-nocookie.com/embed/NAkaEDv8oks?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
});

/* album jump — active chapter without scroll handlers */
const albumLinks=$$(".album-jump a");
const albumSections=albumLinks.map(a=>$(a.getAttribute("href"))).filter(Boolean);
const albumObserver=new IntersectionObserver(entries=>{
  const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!visible)return;
  albumLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+visible.target.id));
},{rootMargin:"-34% 0px -55% 0px",threshold:[.01,.25,.5]});
albumSections.forEach(s=>albumObserver.observe(s));

/* films / series jukebox */
const characters={
  lizzie:{year:"2001",type:"DISNEY CHANNEL",title:"Lizzie McGuire",copy:"Lizzie, Miranda, Gordo y el alter ego animado que decía lo que ella no siempre podía. El personaje que puso a Hilary en el mapa y nunca terminó de irse.",tags:["Gordo","Miranda","25 años"],mark:"LM",color:"#a58bff",link:["Ver especial Lizzie ↓","#lizzie"]},
  kelly:{year:"2002",type:"DISNEY CHANNEL ORIGINAL MOVIE",title:"Kelly Collins",copy:"Una adolescente fashion entra a una academia militar. La película convirtió disciplina, uniformes y un drill team en parte del canon Duff.",tags:["Cadet Kelly","Disney+","Stone"],mark:"KC",color:"#dbff43",link:["Disney+ ↗","https://www.disneyplus.com/es-mx/browse/entity-8b14e5bf-0c24-407b-b660-d6a031e05c60"]},
  natalie:{year:"2003",type:"AGENT CODY BANKS",title:"Natalie Connors",copy:"La hija del científico que Cody Banks debe proteger. Espías, gadgets y una Hilary justo en el salto entre Disney Channel y el cine adolescente.",tags:["Agent Cody Banks","2003"],mark:"NC",color:"#82dcff",link:["Apple TV ↗","https://tv.apple.com/mx/movie/agente-cody-banks---super-espia/umc.cmc.70g4gnyfmbmqnrcolvpco1mes"]},
  isabella:{year:"2003",type:"THE LIZZIE McGUIRE MOVIE",title:"Lizzie / Isabella",copy:"Roma, Paolo, un doble papel y el escenario final de What Dreams Are Made Of. No hay mucho que explicar: funciona todavía.",tags:["Roma","Isabella","Paolo"],mark:"ROMA",color:"#ff7448",link:["Lizzie 25 ↓","#lizzie"]},
  lorraine:{year:"2003",type:"CHEAPER BY THE DOZEN",title:"Lorraine Baker",copy:"La hermana mayor de los Baker: teléfonos, moda y una familia de doce hijos intentando funcionar bajo el mismo techo.",tags:["Baker family","2003"],mark:"12",color:"#f1c96a",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  sam:{year:"2004",type:"A CINDERELLA STORY",title:"Sam Montgomery",copy:"Mesera, estudiante y una identidad secreta detrás de mensajes. El vestido blanco, el celular y Austin Ames hicieron el resto.",tags:["Austin","diner","2004"],mark:"SAM",color:"#ff8dc3",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  terri:{year:"2004",type:"RAISE YOUR VOICE",title:"Terri Fletcher",copy:"Una escuela de artes, duelo, música y la película en la que cantar no es adorno: es la historia.",tags:["música","Los Ángeles","2004"],mark:"TF",color:"#9bdcff",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  holly:{year:"2005",type:"THE PERFECT MAN",title:"Holly Hamilton",copy:"Holly inventa un admirador secreto para su mamá. Buena intención, pésima logística: exactamente el tipo de plan que sostiene una comedia romántica.",tags:["Holly","2005"],mark:"HH",color:"#ffd775",link:["Apple TV ↗","https://tv.apple.com/pt/movie/o-homem-perfeito/umc.cmc.53rjoz21v2m1mn753jwdoygwe"]},
  tanzie:{year:"2006",type:"MATERIAL GIRLS",title:"Tanzie Marchetta",copy:"Cosméticos, herederas, desastre financiero y Hilary con Haylie. Tanzie también nos dejó una de las piezas más útiles del archivo: una máscara sin ojos, por razones.",tags:["Haylie Duff","Marchetta","2006"],mark:"TM",color:"#f6c4dc",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"],mask:true},
  yonica:{year:"2008",type:"WAR, INC.",title:"Yonica Babyyeah",copy:"Una estrella pop deliberadamente excesiva, extraña y satírica. Yonica es justo la prueba de que la filmografía de Hilary tiene rincones mucho menos obvios.",tags:["War, Inc.","Yonica Babyyeah","2008"],mark:"YB",color:"#2a2330",dark:true,link:["IMDb ↗","https://www.imdb.com/title/tt0884224/characters/nm0240381/"]},
  olivia:{year:"2009",type:"GOSSIP GIRL",title:"Olivia Burke",copy:"Una estrella de cine llega a NYU y termina saliendo con Dan Humphrey. Nueva York hizo lo suyo.",tags:["NYU","Gossip Girl","2009"],mark:"OB",color:"#c7b7ff",link:["Filmografía ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  lane:{year:"2010",type:"BEAUTY & THE BRIEFCASE",title:"Lane Daniels",copy:"Una periodista se infiltra en el mundo corporativo mientras busca la historia perfecta y, claro, termina complicando bastante el método.",tags:["briefcase","2010"],mark:"LD",color:"#99d1ff",link:["Filmografía ↗","https://www.biography.com/actor/hilary-duff"]},
  kelsey:{year:"2015",type:"YOUNGER",title:"Kelsey Peters",copy:"Editora ambiciosa, brillante y complicada. Siete temporadas convirtieron a Kelsey en el papel adulto más largo de Hilary.",tags:["Younger","publishing","7 temporadas"],mark:"KP",color:"#f4ca67",link:["IMDb ↗","https://www.imdb.com/title/tt3288518/characters/nm0240381/"]},
  sophie:{year:"2022",type:"HOW I MET YOUR FATHER",title:"Sophie",copy:"Nueva York, citas y una historia contada desde el futuro. Sophie puso a Hilary otra vez al centro de una sitcom.",tags:["HIMYF","NYC","2022"],mark:"S",color:"#ff927c",link:["Disney+ ↗","https://www.disneyplus.com/en-mx/browse/entity-42771fe9-3174-43bc-ab6a-d8c3e618b934"]}
};
function setCharacter(key){
  const d=characters[key],stage=$("[data-character-stage]");if(!d||!stage)return;
  stage.style.setProperty("--stage",d.color);
  stage.style.color=d.dark?"#fff":"#151316";
  $("[data-character-year]").textContent=d.year;
  $("[data-character-type]").textContent=d.type;
  $("[data-character-title]").textContent=d.title;
  $("[data-character-copy]").textContent=d.copy;
  $("[data-character-tags]").innerHTML=d.tags.map(t=>"<span>"+t+"</span>").join("");
  const art=$("[data-character-art] span");art.textContent=d.mark;
  const link=$("[data-character-link]");link.textContent=d.link[0];link.href=d.link[1];
  if(d.link[1].startsWith("http")){link.target="_blank";link.rel="noreferrer"}else{link.removeAttribute("target");link.removeAttribute("rel")}
  $(".tanzie-mask").hidden=!d.mask;
  $$("[data-character]").forEach(b=>b.classList.toggle("active",b.dataset.character===key));
}
$$("[data-character]").forEach(b=>b.addEventListener("click",()=>setCharacter(b.dataset.character)));
$$("[data-film-filter]").forEach(btn=>btn.addEventListener("click",()=>{
  const filter=btn.dataset.filmFilter;
  $$("[data-film-filter]").forEach(b=>b.classList.toggle("active",b===btn));
  $$("[data-character]").forEach(row=>{
    const show=filter==="all"||row.dataset.type.split(" ").includes(filter);
    row.hidden=!show;
  });
  const first=$("[data-character]:not([hidden])");
  if(first)setCharacter(first.dataset.character);
}));

/* Mexico 2027 */
const shows={
  cdmx12:{date:"2027-02-12T20:00:00-06:00",label:"12 FEB 2027 · CDMX",venue:"Palacio de los Deportes",city:"Ciudad de México",title:"Hilary Duff - the lucky me tour · CDMX 12 Feb"},
  cdmx13:{date:"2027-02-13T20:00:00-06:00",label:"13 FEB 2027 · CDMX",venue:"Palacio de los Deportes",city:"Ciudad de México",title:"Hilary Duff - the lucky me tour · CDMX 13 Feb"},
  gdl15:{date:"2027-02-15T20:30:00-06:00",label:"15 FEB 2027 · GDL",venue:"Auditorio Telmex",city:"Guadalajara, Jalisco",title:"Hilary Duff - the lucky me tour · Guadalajara"}
};
let currentShow=localStorage.getItem("hdm-show")||"cdmx12";
function daysUntil(iso){return Math.max(0,Math.ceil((new Date(iso).getTime()-Date.now())/86400000))}
function setShow(key){
  const d=shows[key];if(!d)return;
  currentShow=key;localStorage.setItem("hdm-show",key);
  $("[data-days]").textContent=daysUntil(d.date);
  $("[data-show-label]").textContent=d.label;
  $("[data-venue]").textContent=d.venue;
  $("[data-city]").textContent=d.city;
  $$("[data-show]").forEach(b=>b.classList.toggle("active",b.dataset.show===key));
}
$$("[data-show]").forEach(b=>b.addEventListener("click",()=>setShow(b.dataset.show)));
setShow(currentShow);
$("[data-calendar]")?.addEventListener("click",()=>{
  const d=shows[currentShow],start=new Date(d.date),end=new Date(start.getTime()+2.5*3600000);
  const fmt=x=>x.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z/,"Z");
  const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//HDM//Mexico 2027//ES","BEGIN:VEVENT","DTSTART:"+fmt(start),"DTEND:"+fmt(end),"SUMMARY:"+d.title,"LOCATION:"+d.venue+", "+d.city,"DESCRIPTION:Verifica horarios y accesos oficiales antes del evento.","END:VEVENT","END:VCALENDAR"].join("\r\n");
  const blob=new Blob([ics],{type:"text/calendar"}),url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="HDM-"+currentShow+".ics";a.click();setTimeout(()=>URL.revokeObjectURL(url),500);
});

/* newsletter demo */
$("[data-newsletter-form]")?.addEventListener("submit",e=>{
  e.preventDefault();const email=$("#newsletter-email").value.trim();if(!email)return;
  localStorage.setItem("hdm-newsletter-demo",email);
  $("[data-newsletter-note]").textContent="Listo. En esta demo el correo queda guardado sólo en este dispositivo.";
  e.currentTarget.reset();
});

/* tiny Tanzie easter egg */
$("[data-tanzie]")?.addEventListener("click",()=>{
  const stage=$("[data-tanzie-stage]");if(!stage)return;
  stage.hidden=!stage.hidden;
});

/* search */
const searchItems=[
  ["MÚSICA","Metamorphosis","come clean so yesterday 2003","#metamorphosis"],
  ["MÚSICA","Dignity","with love stranger play with fire 2007","#dignity"],
  ["MÚSICA","luck… or something","weather for tennis roommates mature 2026","#luck"],
  ["FILMS","Yonica Babyyeah","war inc yonica 2008","#pantalla",()=>setCharacter("yonica")],
  ["FILMS","Tanzie Marchetta","material girls tanzie","#pantalla",()=>setCharacter("tanzie")],
  ["FILMS","Sam Montgomery","cinderella story sam","#pantalla",()=>setCharacter("sam")],
  ["LIZZIE","Lizzie 25","gordo miranda roma 25 años","#lizzie"],
  ["MÉXICO","México 2027","cdmx guadalajara palacio telmex","#mexico"],
  ["HDM","Únete a HDM","fan club registro","./unete.html"]
];
const dialog=$("[data-search-dialog]"),input=$("[data-search-input]"),results=$("[data-search-results]");
const normalize=v=>(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
function renderSearch(q=""){
  const query=normalize(q.trim());
  const found=query?searchItems.filter(i=>normalize(i.slice(0,3).join(" ")).includes(query)):searchItems;
  results.innerHTML=found.length?"":"<div class='search-empty'>No encontré eso. Prueba otra palabra.</div>";
  found.forEach(item=>{
    const b=document.createElement("button");b.type="button";b.className="search-result";
    b.innerHTML="<small>"+item[0]+"</small><b>"+item[1]+"</b><em>→</em>";
    b.addEventListener("click",()=>{
      dialog.close();item[4]?.();
      if(item[3].startsWith("./"))location.href=item[3];
      else $(item[3])?.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
    });
    results.appendChild(b);
  });
}
function openSearch(){if(!dialog.open)dialog.showModal();input.value="";renderSearch();requestAnimationFrame(()=>input.focus())}
$$("[data-search-open]").forEach(b=>b.addEventListener("click",openSearch));
input?.addEventListener("input",()=>renderSearch(input.value));
document.addEventListener("keydown",e=>{if(e.key==="/"&&!/INPUT|TEXTAREA/.test(document.activeElement?.tagName||"")){e.preventDefault();openSearch()}});
renderSearch();

/* mobile nav active state */
const mobileLinks=$$(".mobile-nav a");
const sectionMap={inicio:"#inicio",novedades:"#novedades",escuchar:"#novedades",musica:"#musica",pantalla:"#pantalla",lizzie:"#pantalla",mexico:"#mexico",hdm:"#mexico",newsletter:"#mexico"};
const navObserver=new IntersectionObserver(entries=>{
  for(const entry of entries){
    if(!entry.isIntersecting)continue;
    const hash=sectionMap[entry.target.id];
    mobileLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===hash));
  }
},{rootMargin:"-40% 0px -52% 0px",threshold:.01});
$$("section[id]").forEach(s=>navObserver.observe(s));

/* register lightweight service worker */
if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}