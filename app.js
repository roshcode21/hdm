const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];

const searchData=[
  {cat:"México 2027",title:"Boletos y fechas en México",desc:"12 y 13 FEB CDMX · 15 FEB GDL",keys:"boletos ticket entradas mexico cdmx guadalajara gdl",action:"#mexico"},
  {cat:"Tour",title:"Setlist actual · 22 canciones",desc:"Glasgow · 13 SEP 2026 · Live Nation",keys:"setlist canciones tour repertorio come clean wake up with love",url:"https://www.livenation.com/artist/K8vZ9175rEf/hilary-duff-events"},
  {cat:"Música",title:"luck… or something",desc:"11 canciones · 20 FEB 2026",keys:"album disco luck mature roommates future tripping weather tennis",url:"https://open.spotify.com/album/71t4M602DGtkhsy1RtNAME"},
  {cat:"Música",title:"Discografía / eras",desc:"Seis álbumes de estudio",keys:"discografia discos eras metamorphosis dignity bibo breathe",action:"#hilary"},
  {cat:"Empezar",title:"Soy nuevo con Hilary",desc:"Rutas rápidas según lo que ya conoces",keys:"nuevo empezar fan lizzie younger por donde empiezo",action:"#hilary",route:"luck"},
  {cat:"Merch",title:"Tienda oficial",desc:"Música, apparel y accesorios",keys:"merch tienda camiseta vinyl vinilo cd hoodie",url:"https://shop.hilaryduff.com/"},
  {cat:"Club",title:"HDM en Instagram",desc:"Noticias, dinámicas, stories y comentarios",keys:"instagram comunidad club redes hdm",url:"https://www.instagram.com/hilaryduffmexico/"},
  {cat:"HDM",title:"Contacto",desc:"contacto@hilaryduffmexico.com",keys:"contacto mail correo escribir",url:"mailto:contacto@hilaryduffmexico.com"},
  {cat:"Oficial",title:"HilaryDuff.com",desc:"Música, live, shop y signup",keys:"web oficial hilary live tour",url:"https://www.hilaryduff.com/"},
  {cat:"México 2027",title:"Guía del show",desc:"Horarios, accesos, merch y fan project cuando se confirme",keys:"horarios puertas acceso venue palacio telmex merch fan project",action:"#mexico"}
];

const dialog=$("[data-search-dialog]");
const input=$("[data-search-input]");
const results=$("[data-search-results]");

function normalize(v=""){
  return v.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
}
function renderSearch(query=""){
  const q=normalize(query.trim());
  const found=q
    ? searchData.filter(item=>normalize(item.cat+" "+item.title+" "+item.desc+" "+item.keys).includes(q))
    : searchData.slice(0,6);
  results.innerHTML="";
  if(!found.length){
    results.innerHTML='<div class="search-empty">No encontré eso todavía. Prueba otra palabra o escríbenos en contacto@hilaryduffmexico.com.</div>';
    return;
  }
  found.forEach(item=>{
    const b=document.createElement("button");
    b.type="button";
    b.className="search-result";
    b.innerHTML=`<small>${item.cat}</small><b>${item.title}</b><span>${item.desc}</span><em>→</em>`;
    b.addEventListener("click",()=>{
      dialog.close();
      if(item.route) setRoute(item.route);
      if(item.action) document.querySelector(item.action)?.scrollIntoView({behavior:"smooth"});
      if(item.url){
        if(item.url.startsWith("mailto:")) location.href=item.url;
        else window.open(item.url,"_blank","noopener");
      }
    });
    results.appendChild(b);
  });
}
function openSearch(query=""){
  if(!dialog.open) dialog.showModal();
  input.value=query;
  renderSearch(query);
  requestAnimationFrame(()=>input.focus());
}
$$("[data-search-open]").forEach(b=>b.addEventListener("click",()=>openSearch()));
$$("[data-search-query]").forEach(b=>b.addEventListener("click",()=>openSearch(b.dataset.searchQuery)));
input?.addEventListener("input",()=>renderSearch(input.value));
document.addEventListener("keydown",e=>{
  if(e.key==="/" && !/input|textarea/i.test(document.activeElement?.tagName||"")){
    e.preventDefault();openSearch();
  }
});
dialog?.addEventListener("click",e=>{
  const r=dialog.getBoundingClientRect();
  const inside=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
  if(!inside) dialog.close();
});
renderSearch();

$$("[data-jump]").forEach(b=>b.addEventListener("click",()=>{
  document.querySelector("#"+b.dataset.jump)?.scrollIntoView({behavior:"smooth"});
}));

const eras={
  santa:{year:"2002",title:"Santa Claus Lane",note:"El primer álbum de estudio. El comienzo discográfico antes de que Metamorphosis cambiara la escala de todo.",theme:"santa"},
  meta:{year:"2003",title:"Metamorphosis",note:"El punto de entrada para una generación. “So Yesterday” y “Come Clean” siguen siendo parte central del repertorio.",theme:"meta"},
  self:{year:"2004",title:"Hilary Duff",note:"Más guitarras, más peso en vivo y canciones que siguen apareciendo en los shows actuales, como “Fly”.",theme:"self"},
  dignity:{year:"2007",title:"Dignity",note:"El giro electrónico. “With Love”, “Play With Fire” y una etapa que hoy conecta muy fácil con el pop de club.",theme:"dignity"},
  bibo:{year:"2015",title:"Breathe In. Breathe Out.",note:"El regreso de 2015. “Sparks” volvió al setlist de the lucky me tour once años después.",theme:"bibo"},
  luck:{year:"2026",title:"luck… or something",note:"11 canciones y el regreso completo a la música. “Mature”, “Roommates”, “Weather For Tennis” y “Future Tripping” ya viven junto al catálogo anterior.",theme:"luck"}
};
function setEra(key){
  const data=eras[key];if(!data)return;
  const change=()=>{
    $("[data-era-stage]").dataset.eraTheme=data.theme;
    $("[data-era-year]").textContent=data.year;
    $("[data-era-title]").textContent=data.title;
    $("[data-era-note]").textContent=data.note;
    $$("[data-era]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.era===key)));
  };
  if(document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.startViewTransition(change);
  } else change();
}
$$("[data-era]").forEach(b=>b.addEventListener("click",()=>setEra(b.dataset.era)));

const routes={
  lizzie:"Sigue con Metamorphosis → A Cinderella Story → Dignity.",
  dignity:"Vuelve con Dignity → Breathe In. Breathe Out. → luck… or something.",
  younger:"Prueba Breathe In. Breathe Out. → Younger → luck… or something.",
  luck:"Después de luck…, ve a Dignity → Metamorphosis → Breathe In. Breathe Out."
};
function setRoute(key){
  const box=$("[data-route-answer]");
  if(!box||!routes[key])return;
  const change=()=>{
    box.innerHTML=`<span>RUTA RÁPIDA</span><p>${routes[key]}</p>`;
  };
  if(document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.startViewTransition(change);
  } else change();
}
$$("[data-route]").forEach(b=>b.addEventListener("click",()=>setRoute(b.dataset.route)));

function updateMexicoCountdown(){
  const target=new Date("2027-02-12T20:00:00-06:00").getTime();
  const now=Date.now();
  const diff=Math.max(0,target-now);
  const days=Math.ceil(diff/86400000);
  const el=$("[data-mx-days]");
  if(el)el.textContent=String(days);
  const start=new Date("2026-09-23T00:00:00-06:00").getTime();
  const total=target-start;
  const elapsed=Math.min(total,Math.max(0,now-start));
  const pct=total?elapsed/total*100:100;
  const bar=$("[data-count-progress]");
  if(bar)bar.style.width=pct+"%";
}
updateMexicoCountdown();
setInterval(updateMexicoCountdown,60000);

const tilt=$("[data-tilt]");
if(tilt && matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches){
  tilt.addEventListener("pointermove",e=>{
    const r=tilt.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    const img=$("img",tilt);
    img.style.transform=`rotateY(${x*2.8}deg) rotateX(${y*-2.8}deg) scale(1.008)`;
  });
  tilt.addEventListener("pointerleave",()=>{
    $("img",tilt).style.transform="";
  });
}
