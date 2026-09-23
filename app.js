const $=(selector,parent=document)=>parent.querySelector(selector);
const $$=(selector,parent=document)=>[...parent.querySelectorAll(selector)];

const heroData={
  now:{
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff en 2026",
    kicker:"AHORA · 2026",
    title:"luck… or something",
    copy:"Nuevo álbum, gira mundial y tres fechas confirmadas en México para febrero de 2027.",
    pills:["Weather For Tennis","Roommates","Future Tripping"],
    actions:[["Escuchar y ver","#actualidad"],["Tour oficial ↗","https://www.hilaryduff.com/live"]]
  },
  meta:{
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff",
    kicker:"2003",
    title:"Metamorphosis",
    copy:"So Yesterday, Come Clean y Why Not: la etapa que llevó la carrera pop de Hilary a otra escala.",
    pills:["So Yesterday","Come Clean","Why Not"],
    actions:[["Explorar música","#hilary"],["Spotify ↗","https://open.spotify.com/artist/2S9W9aSAd7e5mp8WqWxN2h"]]
  },
  dignity:{
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff",
    kicker:"2007",
    title:"Dignity",
    copy:"Electrónica, club y una etapa que sigue creciendo entre los fans: With Love, Stranger y Play With Fire.",
    pills:["With Love","Stranger","Play With Fire"],
    actions:[["Abrir discografía","#hilary"],["Spotify ↗","https://open.spotify.com/artist/2S9W9aSAd7e5mp8WqWxN2h"]]
  },
  lizzie:{
    image:"https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/FC5C3AA105E2E4F7DA0510B918269D19663591203F49676D10AE2E2C976790CB/compose?format=webp&width=1800",
    alt:"Lizzie McGuire con su alter ego animado",
    kicker:"2001 — 2026",
    title:"Lizzie McGuire · 25 años",
    copy:"Dos temporadas, 65 episodios y una película. La historia que presentó a Hilary a toda una generación.",
    pills:["Gordo","Miranda","Roma"],
    actions:[["Abrir especial","#lizzie"],["Disney+ ↗","https://www.disneyplus.com/es-mx/explore/articles/lizzie-mcguire-anniversary"]]
  },
  mexico:{
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff",
    kicker:"FEBRERO · 2027",
    title:"México",
    copy:"12 y 13 de febrero en Ciudad de México. 15 de febrero en Guadalajara.",
    pills:["12 FEB · CDMX","13 FEB · CDMX","15 FEB · GDL"],
    actions:[["Abrir guía","#mexico"],["OCESA ↗","https://www.ocesa.com.mx/todos-los-eventos/hilary-duff-boletos-ae1632382"]]
  }
};

function updateHero(key){
  const data=heroData[key];
  if(!data)return;

  const change=()=>{
    document.body.dataset.hero=key;
    const stage=$("[data-hero-stage]");
    if(stage)stage.dataset.heroStage=key;

    const img=$("[data-hero-image]");
    if(img){img.src=data.image;img.alt=data.alt;}

    $("[data-hero-kicker]").textContent=data.kicker;
    $("[data-hero-title]").textContent=data.title;
    $("[data-hero-copy]").textContent=data.copy;

    const pills=$("[data-hero-pills]");
    pills.innerHTML="";
    data.pills.forEach(label=>{
      const span=document.createElement("span");
      span.textContent=label;
      pills.appendChild(span);
    });

    const actions=$("[data-hero-actions]");
    actions.innerHTML="";
    data.actions.forEach(([label,href],index)=>{
      const a=document.createElement("a");
      a.textContent=label;
      a.href=href;
      a.className="button "+(index===0?"button-dark":"button-line");
      if(href.startsWith("http")){a.target="_blank";a.rel="noreferrer";}
      actions.appendChild(a);
    });

    $$("[data-hero-tab]").forEach(button=>{
      const active=button.dataset.heroTab===key;
      button.classList.toggle("active",active);
      button.setAttribute("aria-selected",String(active));
    });
  };

  if(document.startViewTransition&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.startViewTransition(change);
  }else change();
}
$$("[data-hero-tab]").forEach(button=>button.addEventListener("click",()=>updateHero(button.dataset.heroTab)));

const albums={
  santa:{year:"2002",title:"Santa Claus Lane",copy:"El primer álbum de estudio de Hilary y el inicio de su catálogo discográfico.",tracks:["Santa Claus Lane","Tell Me a Story","I Heard Santa on the Radio"],theme:"santa"},
  meta:{year:"2003",title:"Metamorphosis",copy:"El disco que convirtió a Hilary en una estrella pop global y dejó canciones que siguen formando parte de sus shows.",tracks:["So Yesterday","Come Clean","Why Not"],theme:"meta"},
  self:{year:"2004",title:"Hilary Duff",copy:"Una etapa con más guitarras y canciones como Fly, The Getaway y Someone’s Watching Over Me.",tracks:["Fly","The Getaway","Someone’s Watching Over Me"],theme:"self"},
  dignity:{year:"2007",title:"Dignity",copy:"El giro electrónico: With Love, Stranger y Play With Fire. Una de las eras más celebradas por los fans.",tracks:["With Love","Stranger","Play With Fire"],theme:"dignity"},
  bibo:{year:"2015",title:"Breathe In. Breathe Out.",copy:"El regreso de 2015: Sparks, My Kind y un pop que hoy funciona como puente hacia la etapa actual.",tracks:["Sparks","My Kind","Breathe In. Breathe Out."],theme:"bibo"},
  luck:{year:"2026",title:"luck… or something",copy:"El regreso musical completo después de más de una década, acompañado por una nueva gira mundial.",tracks:["Weather For Tennis","Roommates","Future Tripping"],theme:"luck"}
};

function updateAlbum(key){
  const data=albums[key];
  const focus=$("[data-album-focus]");
  if(!data||!focus)return;

  const change=()=>{
    focus.dataset.theme=data.theme;
    $("[data-album-year]").textContent=data.year;
    $("[data-album-year-big]").textContent=data.year;
    $("[data-album-title]").textContent=data.title;
    $("[data-album-copy]").textContent=data.copy;

    const tracks=$("[data-album-tracks]");
    tracks.innerHTML="";
    data.tracks.forEach(track=>{
      const span=document.createElement("span");
      span.textContent=track;
      tracks.appendChild(span);
    });

    $$("[data-album]").forEach(button=>button.classList.toggle("active",button.dataset.album===key));
  };

  if(document.startViewTransition&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.startViewTransition(change);
  }else change();
}
$$("[data-album]").forEach(button=>button.addEventListener("click",()=>updateAlbum(button.dataset.album)));

const popData={
  lizzie:{year:"2001",type:"SERIE · DISNEY CHANNEL",title:"Lizzie McGuire",copy:"La puerta de entrada para muchísimos fans. Lizzie, Miranda, Gordo y su alter ego animado cumplen 25 años en 2026.",theme:"lizzie",words:["GORDO","MIRANDA","ETHAN"],link:["Abrir Lizzie","#lizzie"]},
  kelly:{year:"2002",type:"DISNEY CHANNEL ORIGINAL MOVIE",title:"La cadete Kelly",copy:"Kelly Collins cambia su vida cotidiana por una academia militar y termina dejando su propia marca.",theme:"kelly",words:["KELLY","CADET","STONE"],link:["Disney+ ↗","https://www.disneyplus.com/es-mx/browse/entity-8b14e5bf-0c24-407b-b660-d6a031e05c60"]},
  rome:{year:"2003",type:"PELÍCULA · ROMA",title:"Lizzie McGuire: Estrella pop",copy:"Roma, Isabella, Paolo y el cierre cinematográfico de la historia de Lizzie.",theme:"rome",words:["ISABELLA","PAOLO","ROMA"],link:["Disney+ ↗","https://www.disneyplus.com/es-mx/explore/articles/lizzie-mcguire-anniversary"]},
  sam:{year:"2004",type:"PELÍCULA",title:"A Cinderella Story",copy:"Sam Montgomery es uno de los personajes más reconocibles de la etapa cinematográfica de Hilary en los dosmiles.",theme:"sam",words:["SAM","AUSTIN","DINER"],link:["Explorar Hilary","#hilary"]},
  terri:{year:"2004",type:"PELÍCULA · MÚSICA",title:"Raise Your Voice",copy:"Terri Fletcher mezcla drama adolescente y música en una de las películas más recordadas de esa etapa.",theme:"terri",words:["TERRI","MÚSICA","2004"],link:["Explorar Hilary","#hilary"]},
  kelsey:{year:"2015",type:"SERIE · TV LAND",title:"Younger",copy:"Kelsey Peters llevó a Hilary a una nueva etapa televisiva y coincidió con su regreso musical de 2015.",theme:"kelsey",words:["KELSEY","EMPIRE","YOUNGER"],link:["Explorar Hilary","#hilary"]},
  sophie:{year:"2022",type:"SERIE · HULU",title:"How I Met Your Father",copy:"Sophie volvió a colocar a Hilary al centro de una comedia televisiva desde una etapa completamente adulta.",theme:"sophie",words:["SOPHIE","NYC","HIMYF"],link:["Explorar Hilary","#hilary"]}
};

function updatePop(key){
  const data=popData[key];
  const focus=$("[data-pop-focus]");
  if(!data||!focus)return;

  focus.dataset.theme=data.theme;
  $("[data-pop-year]").textContent=data.year;
  $("[data-pop-type]").textContent=data.type;
  $("[data-pop-title]").textContent=data.title;
  $("[data-pop-copy]").textContent=data.copy;
  $("[data-pop-word-one]").textContent=data.words[0];
  $("[data-pop-word-two]").textContent=data.words[1];
  $("[data-pop-word-three]").textContent=data.words[2];

  const link=$("[data-pop-link]");
  link.textContent=data.link[0];
  link.href=data.link[1];
  if(data.link[1].startsWith("http")){link.target="_blank";link.rel="noreferrer";}
  else{link.removeAttribute("target");link.removeAttribute("rel");}

  $$("[data-pop]").forEach(button=>button.classList.toggle("active",button.dataset.pop===key));
}
$$("[data-pop]").forEach(button=>button.addEventListener("click",()=>updatePop(button.dataset.pop)));

const shows={
  cdmx12:{title:"12 FEB · CDMX",place:"Palacio de los Deportes"},
  cdmx13:{title:"13 FEB · CDMX",place:"Palacio de los Deportes"},
  gdl15:{title:"15 FEB · GDL",place:"Auditorio Telmex"}
};
function setShow(key){
  const data=shows[key];
  if(!data)return;
  localStorage.setItem("hdm-show",key);
  $("[data-my-show-title]").textContent=data.title;
  $("[data-my-show-place]").textContent=data.place;
  $$("[data-show]").forEach(button=>button.classList.toggle("active",button.dataset.show===key));
}
$$("[data-show]").forEach(button=>button.addEventListener("click",()=>setShow(button.dataset.show)));
const savedShow=localStorage.getItem("hdm-show");
if(savedShow&&shows[savedShow])setShow(savedShow);

function updateCountdown(){
  const target=new Date("2027-02-12T20:00:00-06:00").getTime();
  const days=Math.max(0,Math.ceil((target-Date.now())/86400000));
  const node=$("[data-days]");
  if(node)node.textContent=String(days);
}
updateCountdown();
setInterval(updateCountdown,60000);

const joinState={era:"lizzie"};
const joinEras={
  lizzie:{label:"Lizzie McGuire",year:"2001",word:"LIZZIE",theme:"lizzie"},
  meta:{label:"Metamorphosis",year:"2003",word:"COME CLEAN",theme:"meta"},
  dignity:{label:"Dignity",year:"2007",word:"WITH LOVE",theme:"dignity"},
  younger:{label:"Younger",year:"2015",word:"KELSEY",theme:"younger"},
  bibo:{label:"Breathe In. Breathe Out.",year:"2015",word:"SPARKS",theme:"bibo"},
  luck:{label:"luck… or something",year:"2026",word:"LUCK…",theme:"luck"}
};
function updateProfile(){
  const data=joinEras[joinState.era];
  const card=$("[data-fan-profile]");
  if(!data||!card)return;
  card.dataset.theme=data.theme;
  $("[data-profile-era]").textContent=data.label;
  $("[data-profile-year]").textContent=data.year;
  $("[data-profile-word]").textContent=data.word;
  $$("[data-join-era]").forEach(button=>button.classList.toggle("active",button.dataset.joinEra===joinState.era));
}
$$("[data-join-era]").forEach(button=>button.addEventListener("click",()=>{joinState.era=button.dataset.joinEra;updateProfile();}));
$("[data-join-name]")?.addEventListener("input",event=>{
  $("[data-profile-name]").textContent=event.target.value.trim()||"Tu nombre";
});
updateProfile();

$("[data-join-form]")?.addEventListener("submit",event=>{
  event.preventDefault();
  const name=$("[data-join-name]").value.trim();
  const email=$("[data-join-email]").value.trim();
  if(!name||!email)return;

  const interests=$$("[data-interest]:checked").map(input=>input.dataset.interest);
  localStorage.setItem("hdm-join-demo",JSON.stringify({name,email,era:joinState.era,interests}));
  $("[data-join-note]").textContent="Selección guardada en este dispositivo. El registro real todavía no está conectado.";
});

const searchItems=[
  {cat:"MÚSICA",title:"Metamorphosis",keys:"metamorphosis come clean so yesterday 2003",target:"#hilary",action:()=>updateAlbum("meta")},
  {cat:"MÚSICA",title:"Dignity",keys:"dignity with love stranger play with fire 2007",target:"#hilary",action:()=>updateAlbum("dignity")},
  {cat:"MÚSICA",title:"luck… or something",keys:"luck mature roommates future tripping 2026",target:"#hilary",action:()=>updateAlbum("luck")},
  {cat:"LIZZIE",title:"Lizzie McGuire · 25 años",keys:"lizzie gordo miranda isabella paolo disney",target:"#lizzie"},
  {cat:"MÉXICO",title:"México 2027",keys:"mexico boletos cdmx guadalajara gdl palacio telmex",target:"#mexico"},
  {cat:"HDM",title:"Únete a HDM",keys:"unete registro correo nombre fan club",target:"#unete"},
  {cat:"HDM",title:"Instagram",keys:"instagram comunidad hdm",url:"https://www.instagram.com/hilaryduffmexico/"}
];

const searchDialog=$("[data-search-dialog]");
const searchInput=$("[data-search-input]");
const searchResults=$("[data-search-results]");
const normalize=value=>(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

function renderSearch(query=""){
  const q=normalize(query.trim());
  const found=q?searchItems.filter(item=>normalize(item.cat+" "+item.title+" "+item.keys).includes(q)):searchItems.slice(0,6);
  searchResults.innerHTML="";

  if(!found.length){
    searchResults.innerHTML='<div class="search-empty">No encontré eso. Prueba otra palabra.</div>';
    return;
  }

  found.forEach(item=>{
    const button=document.createElement("button");
    button.type="button";
    button.className="search-result";
    button.innerHTML=`<small>${item.cat}</small><b>${item.title}</b><em>→</em>`;
    button.addEventListener("click",()=>{
      searchDialog.close();
      item.action?.();
      if(item.target)setTimeout(()=>$(item.target)?.scrollIntoView({behavior:"smooth"}),50);
      if(item.url)window.open(item.url,"_blank","noopener");
    });
    searchResults.appendChild(button);
  });
}
function openSearch(query=""){
  if(!searchDialog.open)searchDialog.showModal();
  searchInput.value=query;
  renderSearch(query);
  requestAnimationFrame(()=>searchInput.focus());
}
$$("[data-search-open]").forEach(button=>button.addEventListener("click",()=>openSearch()));
searchInput?.addEventListener("input",()=>renderSearch(searchInput.value));
document.addEventListener("keydown",event=>{
  if(event.key==="/"&&!/input|textarea/i.test(document.activeElement?.tagName||"")){
    event.preventDefault();
    openSearch();
  }
});
searchDialog?.addEventListener("click",event=>{
  const box=searchDialog.getBoundingClientRect();
  if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)searchDialog.close();
});
renderSearch();

function setupCarousel(carousel){
  const items=[...carousel.children];
  if(items.length<2)return;

  const dotsHost=carousel.nextElementSibling?.matches("[data-carousel-dots]")?carousel.nextElementSibling:null;
  if(dotsHost){
    dotsHost.innerHTML="";
    items.forEach((_,index)=>{
      const dot=document.createElement("i");
      if(index===0)dot.classList.add("active");
      dotsHost.appendChild(dot);
    });
  }

  let frame=0;
  const update=()=>{
    frame=0;
    const center=carousel.scrollLeft+carousel.clientWidth/2;
    let closest=0;
    let distance=Infinity;
    items.forEach((item,index)=>{
      const itemCenter=item.offsetLeft+item.offsetWidth/2;
      const d=Math.abs(itemCenter-center);
      if(d<distance){distance=d;closest=index;}
    });
    if(dotsHost)$("i.active",dotsHost)?.classList.remove("active");
    if(dotsHost)dotsHost.children[closest]?.classList.add("active");
  };

  carousel.addEventListener("scroll",()=>{
    if(!frame)frame=requestAnimationFrame(update);
  },{passive:true});
  update();
}
$$("[data-carousel]").forEach(setupCarousel);

const mobileLinks=$$(".mobile-nav a");
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const id=entry.target.id;
    mobileLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+id));
  });
},{rootMargin:"-40% 0px -50% 0px"});
$$("section[id]").forEach(section=>sectionObserver.observe(section));

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}