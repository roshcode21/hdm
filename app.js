const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];

const portalData={
  ahora:{
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff en 2026",
    stamp:"23 SEP 2026",
    mark:"HD",
    kicker:"THE LUCKY ME TOUR",
    title:"El tour sigue creciendo.",
    copy:"La nueva etapa continúa en 2027. México tiene tres fechas confirmadas en febrero.",
    links:[["Ver actualidad ↓","#pulso"],["Tour oficial ↗","https://www.hilaryduff.com/live"]]
  },
  lizzie:{
    image:"https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/FC5C3AA105E2E4F7DA0510B918269D19663591203F49676D10AE2E2C976790CB/compose?format=webp&width=2560",
    alt:"Lizzie McGuire con su alter ego animado",
    stamp:"2001 — 2026",
    mark:"25",
    kicker:"LIZZIE McGUIRE",
    title:"Veinticinco años.",
    copy:"Dos temporadas, 65 episodios, una película y una parte enorme de la historia de Hilary.",
    links:[["Entrar a Lizzie ↓","#lizzie"],["Disney+ ↗","https://www.disneyplus.com/es-mx/series/lizzie-mcguire/3RlptgsoNczX"]]
  },
  musica:{
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff",
    stamp:"2002 — 2026",
    mark:"06",
    kicker:"MÚSICA",
    title:"Seis discos de estudio.",
    copy:"Metamorphosis, Dignity, Breathe In. Breathe Out. y una nueva era que ya vive junto al catálogo anterior.",
    links:[["Explorar música ↓","#universo"],["Spotify ↗","https://open.spotify.com/artist/2S9W9aSAd7e5mp8WqWxN2h"]]
  },
  mexico:{
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff",
    stamp:"FEB 2027",
    mark:"MX",
    kicker:"THE LUCKY ME TOUR · MÉXICO",
    title:"Tres noches en febrero.",
    copy:"12 y 13 en Ciudad de México. 15 en Guadalajara. La guía crecerá conforme se acerquen los shows.",
    links:[["México 2027 ↓","#mexico"],["OCESA ↗","https://www.ocesa.com.mx/todos-los-eventos/hilary-duff-boletos-ae1632382"]]
  }
};

function setPortal(key){
  const data=portalData[key]; if(!data)return;
  const change=()=>{
    document.body.dataset.portal=key;
    $("[data-portal-image]").src=data.image;
    $("[data-portal-image]").alt=data.alt;
    $("[data-portal-stamp]").textContent=data.stamp;
    $("[data-portal-mark]").textContent=data.mark;
    $("[data-portal-kicker]").textContent=data.kicker;
    $("[data-portal-title]").textContent=data.title;
    $("[data-portal-copy]").textContent=data.copy;
    const links=$("[data-portal-links]");
    links.innerHTML="";
    data.links.forEach(([label,href])=>{
      const a=document.createElement("a");
      a.textContent=label;a.href=href;
      if(href.startsWith("http")){a.target="_blank";a.rel="noreferrer";}
      links.appendChild(a);
    });
    $$("[data-portal-tab]").forEach(b=>{
      const active=b.dataset.portalTab===key;
      b.classList.toggle("active",active);
      b.setAttribute("aria-selected",String(active));
    });
  };
  if(document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.startViewTransition(change);
  }else change();
}
$$("[data-portal-tab]").forEach(b=>b.addEventListener("click",()=>setPortal(b.dataset.portalTab)));

const albums={
  santa:{year:"2002",title:"Santa Claus Lane",text:"El primer álbum de estudio de Hilary. Una entrada muy distinta al resto de su catálogo, pero parte del inicio discográfico.",songs:["Santa Claus Lane","I Heard Santa on the Radio","Tell Me a Story"],theme:"santa"},
  meta:{year:"2003",title:"Metamorphosis",text:"El disco que convirtió a Hilary en una estrella pop global. “So Yesterday” y “Come Clean” siguen ocupando un lugar central en su repertorio.",songs:["So Yesterday","Come Clean","Why Not"],theme:"meta"},
  self:{year:"2004",title:"Hilary Duff",text:"Más guitarras y una etapa más intensa. “Fly” y “Someone’s Watching Over Me” siguen siendo referencias esenciales de esos años.",songs:["Fly","Someone’s Watching Over Me","The Getaway"],theme:"self"},
  dignity:{year:"2007",title:"Dignity",text:"El giro electrónico. Un disco que con los años se volvió una de las etapas más defendidas por los fans.",songs:["With Love","Stranger","Play With Fire"],theme:"dignity"},
  bibo:{year:"2015",title:"Breathe In. Breathe Out.",text:"El regreso de 2015. Pop luminoso, colaboraciones y canciones que hoy funcionan como puente hacia la etapa actual.",songs:["Sparks","My Kind","Breathe In. Breathe Out."],theme:"bibo"},
  luck:{year:"2026",title:"luck… or something",text:"Once canciones y el regreso completo a la música después de más de una década. El disco que sostiene la gira actual.",songs:["Weather For Tennis","Roommates","Future Tripping"],theme:"luck"}
};
function setAlbum(key){
  const a=albums[key];if(!a)return;
  const change=()=>{
    const stage=$("[data-album-stage]");
    stage.dataset.albumTheme=a.theme;
    $("[data-album-year]").textContent=a.year;
    $("[data-album-year-big]").textContent=a.year;
    $("[data-album-title]").textContent=a.title;
    $("[data-album-text]").textContent=a.text;
    const songs=$("[data-album-songs]");songs.innerHTML="";
    a.songs.forEach(s=>{const span=document.createElement("span");span.textContent=s;songs.appendChild(span);});
    $$("[data-album]").forEach(b=>b.classList.toggle("active",b.dataset.album===key));
  };
  if(document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.startViewTransition(change);
  }else change();
}
$$("[data-album]").forEach(b=>b.addEventListener("click",()=>setAlbum(b.dataset.album)));

const randomSongs=[
  ["Come Clean","Metamorphosis · 2003"],["With Love","Dignity · 2007"],
  ["My Kind","Breathe In. Breathe Out. · 2015"],["Future Tripping","luck… or something · 2026"],
  ["Fly","Hilary Duff · 2004"],["Why Not","Metamorphosis · 2003"],
  ["Mature","luck… or something · 2026"],["Someone’s Watching Over Me","Hilary Duff · 2004"]
];
$("[data-random-song]")?.addEventListener("click",()=>{
  const [song,era]=randomSongs[Math.floor(Math.random()*randomSongs.length)];
  const box=$("[data-random-song-result]");
  box.innerHTML=`<small>SELECCIÓN HDM</small><strong>${song}</strong><span>${era}</span>`;
});

const universePanels={
  music:()=>document.querySelector(".music-browser")?.outerHTML||"",
  screen:()=>`
    <div class="screen-panel">
      <div class="screen-grid">
        <a class="screen-card hero-screen" href="#lizzie">
          <img src="https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/FC5C3AA105E2E4F7DA0510B918269D19663591203F49676D10AE2E2C976790CB/compose?format=webp&width=2560" alt="">
          <div><small>2001–2004</small><h3>Lizzie McGuire</h3><p>Serie + película · 25 años en 2026</p></div>
        </a>
        <div class="screen-card sc-purple"><div><small>2004</small><h3>A Cinderella Story</h3><p>Sam Montgomery</p></div></div>
        <div class="screen-card sc-orange"><div><small>2004</small><h3>Raise Your Voice</h3><p>Terri Fletcher</p></div></div>
        <div class="screen-card sc-blue"><div><small>2015–2021</small><h3>Younger</h3><p>Kelsey Peters</p></div></div>
        <div class="screen-card sc-pink"><div><small>2022–2023</small><h3>How I Met Your Father</h3><p>Sophie Tompkins</p></div></div>
      </div>
    </div>`,
  live:()=>`
    <div class="live-panel">
      <div class="live-count"><small class="micro">THE LUCKY ME TOUR</small><strong>2026<br>→27</strong><span>primera gira global completa en casi dos décadas</span></div>
      <div class="live-list">
        <a href="https://www.hilaryduff.com/live" target="_blank" rel="noreferrer"><b>Ahora</b><span>Fechas internacionales</span><em>TOUR OFICIAL ↗</em></a>
        <a href="#mexico"><b>12 FEB</b><span>Ciudad de México</span><em>HDM ↓</em></a>
        <a href="#mexico"><b>13 FEB</b><span>Ciudad de México</span><em>HDM ↓</em></a>
        <a href="#mexico"><b>15 FEB</b><span>Guadalajara</span><em>HDM ↓</em></a>
      </div>
    </div>`,
  more:()=>`
    <div class="more-panel"><div class="more-grid">
      <article class="more-card mc1"><small>2026</small><h3>TIME100</h3><p>Hilary fue incluida entre los Icons de TIME100 2026.</p><a href="https://time.com/collection/100-most-influential-people/2026/" target="_blank" rel="noreferrer">TIME ↗</a></article>
      <article class="more-card mc2"><small>2026</small><h3>Reebok</h3><p>Se convirtió en embajadora de la marca en agosto.</p><a href="https://corporate.authentic.com/press-releases" target="_blank" rel="noreferrer">Ver anuncio ↗</a></article>
      <article class="more-card mc3"><small>LIBROS</small><h3>Autora</h3><p>Su trabajo también incluye ficción juvenil y libros infantiles.</p><a href="https://www.hilaryduff.com/" target="_blank" rel="noreferrer">Web oficial ↗</a></article>
      <article class="more-card mc4"><small>MODA / TOUR</small><h3>En el camino</h3><p>Vogue documentó el vestuario y la vida de gira en septiembre de 2026.</p><a href="https://www.vogue.com/slideshow/on-the-road-with-hilary-duff-lucky-me-tour" target="_blank" rel="noreferrer">Vogue ↗</a></article>
    </div></div>`
};
let musicMarkup=$(".music-browser")?.outerHTML||"";
universePanels.music=()=>musicMarkup;

function setUniverse(key){
  const panel=$("[data-universe-panel]");
  const change=()=>{
    panel.innerHTML=universePanels[key]();
    $$("[data-universe-tab]").forEach(b=>{
      const active=b.dataset.universeTab===key;
      b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));
    });
    if(key==="music"){
      $$("[data-album]",panel).forEach(b=>b.addEventListener("click",()=>setAlbumScoped(b.dataset.album,panel)));
      $("[data-random-song]",panel)?.addEventListener("click",()=>randomSongScoped(panel));
    }
  };
  if(document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) document.startViewTransition(change); else change();
}
function setAlbumScoped(key,panel){
  const a=albums[key];if(!a)return;
  const stage=$("[data-album-stage]",panel);stage.dataset.albumTheme=a.theme;
  $("[data-album-year]",panel).textContent=a.year;$("[data-album-year-big]",panel).textContent=a.year;
  $("[data-album-title]",panel).textContent=a.title;$("[data-album-text]",panel).textContent=a.text;
  const songs=$("[data-album-songs]",panel);songs.innerHTML="";a.songs.forEach(s=>{const e=document.createElement("span");e.textContent=s;songs.appendChild(e);});
  $$("[data-album]",panel).forEach(b=>b.classList.toggle("active",b.dataset.album===key));
}
function randomSongScoped(panel){
  const [song,era]=randomSongs[Math.floor(Math.random()*randomSongs.length)];
  $("[data-random-song-result]",panel).innerHTML=`<small>SELECCIÓN HDM</small><strong>${song}</strong><span>${era}</span>`;
}
$$("[data-universe-tab]").forEach(b=>b.addEventListener("click",()=>setUniverse(b.dataset.universeTab)));

function updateCountdown(){
  const target=new Date("2027-02-12T20:00:00-06:00").getTime();
  const days=Math.max(0,Math.ceil((target-Date.now())/86400000));
  const el=$("[data-days]");if(el)el.textContent=String(days);
}
updateCountdown();setInterval(updateCountdown,60000);

const shows={
  cdmx12:{title:"12 FEB · CDMX",place:"Palacio de los Deportes"},
  cdmx13:{title:"13 FEB · CDMX",place:"Palacio de los Deportes"},
  gdl15:{title:"15 FEB · GDL",place:"Auditorio Telmex"}
};
function setShow(key){
  const s=shows[key];if(!s)return;
  localStorage.setItem("hdm-show",key);
  $("[data-my-show-title]").textContent=s.title;
  $("[data-my-show-place]").textContent=s.place;
  $$("[data-show]").forEach(b=>b.classList.toggle("active",b.dataset.show===key));
}
$$("[data-show]").forEach(b=>b.addEventListener("click",()=>setShow(b.dataset.show)));
const savedShow=localStorage.getItem("hdm-show");if(savedShow&&shows[savedShow])setShow(savedShow);

const searchItems=[
  {cat:"MÉXICO",title:"Boletos y fechas 2027",desc:"12 y 13 CDMX · 15 GDL",keys:"boletos tickets mexico cdmx gdl guadalajara",target:"#mexico"},
  {cat:"TOUR",title:"Setlist actual",desc:"Repertorio de the lucky me tour",keys:"setlist canciones tour repertorio",url:"https://www.livenation.com/artist/K8vZ9175rEf/hilary-duff-events"},
  {cat:"MÚSICA",title:"luck… or something",desc:"2026 · 11 canciones",keys:"luck album disco mature roommates future tripping",target:"#universo",universe:"music",album:"luck"},
  {cat:"MÚSICA",title:"Dignity",desc:"2007",keys:"dignity with love stranger play with fire 2007",target:"#universo",universe:"music",album:"dignity"},
  {cat:"MÚSICA",title:"Metamorphosis",desc:"2003",keys:"metamorphosis come clean so yesterday 2003",target:"#universo",universe:"music",album:"meta"},
  {cat:"PANTALLA",title:"Lizzie McGuire",desc:"25 años · Disney+",keys:"lizzie gordo miranda disney 25",target:"#lizzie"},
  {cat:"PANTALLA",title:"Younger",desc:"Kelsey Peters",keys:"younger kelsey serie tv",target:"#universo",universe:"screen"},
  {cat:"HDM",title:"Instagram",desc:"@hilaryduffmexico",keys:"instagram comunidad redes hdm",url:"https://www.instagram.com/hilaryduffmexico/"},
  {cat:"HDM",title:"Contacto",desc:"contacto@hilaryduffmexico.com",keys:"contacto correo mail",url:"mailto:contacto@hilaryduffmexico.com"},
  {cat:"OFICIAL",title:"HilaryDuff.com",desc:"Música, tour y tienda",keys:"oficial web shop live",url:"https://www.hilaryduff.com/"}
];
const searchDialog=$("[data-search-dialog]"),searchInput=$("[data-search-input]"),searchResults=$("[data-search-results]");
const norm=v=>(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
function renderSearch(q=""){
  const query=norm(q.trim());
  const found=query?searchItems.filter(i=>norm(i.cat+" "+i.title+" "+i.desc+" "+i.keys).includes(query)):searchItems.slice(0,7);
  searchResults.innerHTML="";
  if(!found.length){searchResults.innerHTML='<div class="search-empty">No encontré eso todavía. Prueba otra palabra.</div>';return;}
  found.forEach(item=>{
    const b=document.createElement("button");b.type="button";b.className="search-result";
    b.innerHTML=`<small>${item.cat}</small><b>${item.title}</b><span>${item.desc}</span><em>→</em>`;
    b.addEventListener("click",()=>{
      searchDialog.close();
      if(item.universe)setUniverse(item.universe);
      if(item.target)setTimeout(()=>$(item.target)?.scrollIntoView({behavior:"smooth"}),50);
      if(item.album)setTimeout(()=>{const panel=$("[data-universe-panel]");setAlbumScoped(item.album,panel)},160);
      if(item.url){if(item.url.startsWith("mailto:"))location.href=item.url;else window.open(item.url,"_blank","noopener");}
    });
    searchResults.appendChild(b);
  });
}
function openSearch(q=""){
  if(!searchDialog.open)searchDialog.showModal();
  searchInput.value=q;renderSearch(q);requestAnimationFrame(()=>searchInput.focus());
}
$$("[data-search-open]").forEach(b=>b.addEventListener("click",()=>openSearch()));
$$("[data-search-query]").forEach(b=>b.addEventListener("click",()=>openSearch(b.dataset.searchQuery)));
searchInput?.addEventListener("input",()=>renderSearch(searchInput.value));
document.addEventListener("keydown",e=>{if(e.key==="/"&&!/input|textarea/i.test(document.activeElement?.tagName||"")){e.preventDefault();openSearch();}});
searchDialog?.addEventListener("click",e=>{const r=searchDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)searchDialog.close();});
renderSearch();

$("[data-newsletter-form]")?.addEventListener("submit",e=>{
  e.preventDefault();
  const email=$("#newsletter-email")?.value.trim();
  if(!email)return;
  localStorage.setItem("hdm-newsletter-interest",email);
  $("[data-newsletter-note]").textContent="Listo para la demo. Antes de lanzar el newsletter conectaremos un proveedor real para confirmar tu suscripción.";
  e.currentTarget.reset();
});

let deferredPrompt=null;
const installDialog=$("[data-install-dialog]");
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;});
$$("[data-install]").forEach(b=>b.addEventListener("click",async()=>{
  if(deferredPrompt){
    deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;
  }else installDialog?.showModal();
}));
installDialog?.addEventListener("click",e=>{const r=installDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)installDialog.close();});

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}

const sections=$$("section[id]");
const mobileLinks=$$(".mobile-nav a");
const io=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){const id=entry.target.id;mobileLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id));}});
},{rootMargin:"-42% 0px -48% 0px"});
sections.forEach(s=>io.observe(s));


const heroWorlds={
  ahora:{
    bodyClass:"",stage:"ahora",
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff en 2026",eyebrow:"AHORA · 2026",title:"luck… or something",
    copy:"Nuevo álbum, una gira mundial en marcha y tres noches confirmadas en México para febrero de 2027.",
    tags:["Weather For Tennis","Roommates","Future Tripping"],
    links:[["Escuchar y ver ↓","#pulso"],["Tour oficial ↗","https://www.hilaryduff.com/live"]]
  },
  meta:{
    bodyClass:"hero-meta",stage:"meta",
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff",eyebrow:"2003",title:"Metamorphosis",
    copy:"El disco que abrió una etapa enorme: So Yesterday, Come Clean y Why Not siguen conectando 2003 con los shows de hoy.",
    tags:["So Yesterday","Come Clean","Why Not"],
    links:[["Abrir música ↓","#universo"],["Spotify ↗","https://open.spotify.com/artist/2S9W9aSAd7e5mp8WqWxN2h"]]
  },
  dignity:{
    bodyClass:"hero-dignity",stage:"dignity",
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff",eyebrow:"2007",title:"Dignity",
    copy:"Electrónica, club y una Hilary tomando mucho más control de su sonido. Una era que no dejó de crecer con los años.",
    tags:["With Love","Stranger","Play With Fire"],
    links:[["Abrir Dignity ↓","#universo"],["Escuchar ↗","https://open.spotify.com/artist/2S9W9aSAd7e5mp8WqWxN2h"]]
  },
  lizzie:{
    bodyClass:"hero-lizzie",stage:"lizzie",
    image:"https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/FC5C3AA105E2E4F7DA0510B918269D19663591203F49676D10AE2E2C976790CB/compose?format=webp&width=2560",
    alt:"Lizzie McGuire con su alter ego animado",eyebrow:"2001 — 2026",title:"Lizzie McGuire · 25 años",
    copy:"Dos temporadas, 65 episodios, una película y el personaje que presentó a Hilary a toda una generación.",
    tags:["Gordo","Miranda","Roma"],
    links:[["Entrar a Lizzie ↓","#lizzie"],["Disney+ ↗","https://www.disneyplus.com/es-mx/series/lizzie-mcguire/3RlptgsoNczX"]]
  },
  mexico:{
    bodyClass:"hero-mexico",stage:"mexico",
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff",eyebrow:"FEBRERO · 2027",title:"México",
    copy:"12 y 13 en Ciudad de México. 15 en Guadalajara. Tres noches de the lucky me tour en el país.",
    tags:["12 FEB · CDMX","13 FEB · CDMX","15 FEB · GDL"],
    links:[["Abrir México ↓","#mexico"],["OCESA ↗","https://www.ocesa.com.mx/todos-los-eventos/hilary-duff-boletos-ae1632382"]]
  }
};

function setHeroWorld(key){
  const data=heroWorlds[key]; if(!data)return;
  const apply=()=>{
    document.body.classList.remove("hero-meta","hero-dignity","hero-lizzie","hero-mexico");
    if(data.bodyClass)document.body.classList.add(data.bodyClass);
    const stage=$(".hero-v6-stage"); if(stage)stage.dataset.heroStage=data.stage;
    const image=$("[data-hero-main-image]"); if(image){image.src=data.image;image.alt=data.alt;}
    $("[data-hero-eyebrow]").textContent=data.eyebrow;
    $("[data-hero-title]").textContent=data.title;
    $("[data-hero-copy]").textContent=data.copy;
    const tags=$("[data-hero-tags]");tags.innerHTML="";
    data.tags.forEach(t=>{const s=document.createElement("span");s.textContent=t;tags.appendChild(s);});
    const actions=$("[data-hero-actions]");actions.innerHTML="";
    data.links.forEach(([label,href])=>{const a=document.createElement("a");a.textContent=label;a.href=href;if(href.startsWith("http")){a.target="_blank";a.rel="noreferrer";}actions.appendChild(a);});
    $$("[data-hero-world]").forEach(b=>b.classList.toggle("active",b.dataset.heroWorld===key));
  };
  if(document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches)document.startViewTransition(apply);else apply();
}
$$("[data-hero-world]").forEach(b=>b.addEventListener("click",()=>setHeroWorld(b.dataset.heroWorld)));

const mailPrefs=new Set(["mexico","musica"]);
const mailLabels={mexico:"México 2027",musica:"música nueva",hdm:"actividades HDM",lizzie:"Lizzie + archivo"};
function refreshMailPreview(){
  $$("[data-mail-pref]").forEach(b=>b.classList.toggle("active",mailPrefs.has(b.dataset.mailPref)));
  const chosen=[...mailPrefs].map(k=>mailLabels[k]);
  const subject=$("[data-mail-subject]");
  if(subject)subject.textContent=chosen.length?chosen.slice(0,2).join(" + "):"Hilary Duff México";
}
$$("[data-mail-pref]").forEach(b=>b.addEventListener("click",()=>{
  const key=b.dataset.mailPref;
  if(mailPrefs.has(key))mailPrefs.delete(key);else mailPrefs.add(key);
  refreshMailPreview();
}));
refreshMailPreview();

$("[data-mail-form]")?.addEventListener("submit",e=>{
  e.preventDefault();
  const email=$("#mail-email")?.value.trim();if(!email)return;
  localStorage.setItem("hdm-mail-demo",JSON.stringify({email,prefs:[...mailPrefs]}));
  const note=$("[data-mail-note]");
  if(note)note.textContent="Preferencias guardadas en este dispositivo. La lista real todavía no está abierta.";
  e.currentTarget.reset();
});

if(matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches){
  let lastSpark=0;
  window.addEventListener("pointermove",e=>{
    const now=performance.now(); if(now-lastSpark<70)return; lastSpark=now;
    if(!e.target.closest(".hero-v6,.newsletter-v6"))return;
    const s=document.createElement("span");s.className="sparkle-trail";s.textContent=Math.random()>.5?"✦":"·";
    s.style.left=e.clientX+"px";s.style.top=e.clientY+"px";
    s.style.color=Math.random()>.5?"#ff4f9a":"#deff4a";
    document.body.appendChild(s);setTimeout(()=>s.remove(),750);
  },{passive:true});
}
