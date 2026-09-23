const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];

const eras={
  lizzie:{year:"2001",title:"Lizzie McGuire",copy:"Antes de los discos, estaba Lizzie. Dos temporadas, una película y una generación completa llegando a Hilary por ahí."},
  meta:{year:"2003",title:"Metamorphosis",copy:"El disco que convirtió a Hilary en una estrella pop global. Si vienes de Lizzie, éste es el siguiente paso natural."},
  self:{year:"2004",title:"Hilary Duff",copy:"Más guitarras, más peso en vivo y canciones que siguen reapareciendo cuando Hilary vuelve al escenario."},
  dignity:{year:"2007",title:"Dignity",copy:"El giro electrónico. Con los años terminó convirtiéndose en uno de esos discos que los fans defienden con todo."},
  bibo:{year:"2015",title:"Breathe In. Breathe Out.",copy:"El regreso de 2015. Sparks, My Kind y una etapa que hoy funciona como puente perfecto hacia el pop actual."},
  luck:{year:"2026",title:"luck… or something",copy:"Once canciones, un tour mundial y Hilary haciendo música otra vez después de más de una década."}
};

const randomSongs=[
  ["Come Clean","Metamorphosis · 2003"],
  ["With Love","Dignity · 2007"],
  ["My Kind","Breathe In. Breathe Out. · 2015"],
  ["Future Tripping","luck… or something · 2026"],
  ["Fly","Hilary Duff · 2004"],
  ["Why Not","The Lizzie McGuire Movie · 2003"],
  ["Mature","luck… or something · 2026"],
  ["Someone’s Watching Over Me","Hilary Duff · 2004"]
];

function setEra(key){
  const data=eras[key]; if(!data) return;
  const change=()=>{
    $("[data-era-year]").textContent=data.year;
    $("[data-era-title]").textContent=data.title;
    $("[data-era-copy]").textContent=data.copy;
    $$("[data-era]").forEach(b=>b.classList.toggle("active",b.dataset.era===key));
  };
  if(document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.startViewTransition(change);
  }else change();
}
$$("[data-era]").forEach(b=>b.addEventListener("click",()=>setEra(b.dataset.era)));

$("[data-random]")?.addEventListener("click",()=>{
  const [song,era]=randomSongs[Math.floor(Math.random()*randomSongs.length)];
  const box=$("[data-random-result]");
  box.innerHTML=`<small>HOY TOCA</small><strong>${song}</strong><span>${era}</span>`;
});

function updateDays(){
  const target=new Date("2027-02-12T20:00:00-06:00").getTime();
  const days=Math.max(0,Math.ceil((target-Date.now())/86400000));
  const el=$("[data-days]"); if(el) el.textContent=days;
}
updateDays(); setInterval(updateDays,60000);

const searchItems=[
  {cat:"MÉXICO",title:"Boletos y fechas 2027",desc:"12 y 13 CDMX · 15 GDL",keys:"boletos tickets mexico cdmx gdl guadalajara",target:"#mexico"},
  {cat:"TOUR",title:"Setlist actual",desc:"Repertorio más reciente",keys:"setlist canciones tour repertorio",url:"https://www.livenation.com/artist/K8vZ9175rEf/hilary-duff-events"},
  {cat:"HILARY",title:"Metamorphosis",desc:"2003",keys:"metamorphosis come clean so yesterday 2003",target:"#hilary",era:"meta"},
  {cat:"HILARY",title:"Dignity",desc:"2007",keys:"dignity with love stranger play with fire 2007",target:"#hilary",era:"dignity"},
  {cat:"HILARY",title:"luck… or something",desc:"2026",keys:"luck mature roommates future tripping album disco",target:"#hilary",era:"luck"},
  {cat:"LIZZIE",title:"Lizzie McGuire · 25 años",desc:"2001–2026",keys:"lizzie gordo miranda paolo isabella disney 25",target:"#lizzie"},
  {cat:"HDM",title:"Instagram",desc:"@hilaryduffmexico",keys:"instagram club comunidad hdm",url:"https://www.instagram.com/hilaryduffmexico/"},
  {cat:"HDM",title:"Contacto",desc:"contacto@hilaryduffmexico.com",keys:"contacto mail correo",url:"mailto:contacto@hilaryduffmexico.com"},
  {cat:"MERCH",title:"Tienda oficial",desc:"HilaryDuff.com",keys:"merch tienda playera hoodie cd vinilo",url:"https://shop.hilaryduff.com/collections/merch"}
];

const dialog=$("[data-search-dialog]");
const input=$("[data-search-input]");
const results=$("[data-search-results]");
const normalize=v=>(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

function renderSearch(q=""){
  const query=normalize(q.trim());
  const found=query?searchItems.filter(i=>normalize(i.cat+" "+i.title+" "+i.desc+" "+i.keys).includes(query)):searchItems.slice(0,6);
  results.innerHTML="";
  if(!found.length){
    results.innerHTML='<div class="search-empty">No encontré eso todavía. Prueba otra palabra.</div>';return;
  }
  found.forEach(item=>{
    const b=document.createElement("button");
    b.type="button";b.className="search-result";
    b.innerHTML=`<small>${item.cat}</small><b>${item.title}</b><span>${item.desc}</span><em>→</em>`;
    b.addEventListener("click",()=>{
      dialog.close();
      if(item.era)setEra(item.era);
      if(item.target)$(item.target)?.scrollIntoView({behavior:"smooth"});
      if(item.url){
        if(item.url.startsWith("mailto:")) location.href=item.url;
        else window.open(item.url,"_blank","noopener");
      }
    });
    results.appendChild(b);
  });
}
function openSearch(query=""){
  if(!dialog.open)dialog.showModal();
  input.value=query;renderSearch(query);
  requestAnimationFrame(()=>input.focus());
}
$$("[data-search-open]").forEach(b=>b.addEventListener("click",()=>openSearch()));
$$("[data-search-query]").forEach(b=>b.addEventListener("click",()=>openSearch(b.dataset.searchQuery)));
input?.addEventListener("input",()=>renderSearch(input.value));
document.addEventListener("keydown",e=>{
  if(e.key==="/" && !/input|textarea/i.test(document.activeElement?.tagName||"")){e.preventDefault();openSearch();}
});
dialog?.addEventListener("click",e=>{
  const r=dialog.getBoundingClientRect();
  if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();
});
renderSearch();

if(matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches){
  const floats=$$("[data-float]");
  let px=0,py=0,raf=0;
  window.addEventListener("pointermove",e=>{
    px=e.clientX/innerWidth-.5;py=e.clientY/innerHeight-.5;
    if(!raf)raf=requestAnimationFrame(()=>{
      floats.forEach(el=>{
        const n=Number(el.dataset.float||5);
        el.style.translate=`${px*n}px ${py*n}px`;
      });
      raf=0;
    });
  },{passive:true});
}

const sections=$$("section[data-tone]");
const navLinks=$$(".mobile-nav a");
const obs=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      document.body.dataset.tone=entry.target.dataset.tone||"";
      const id=entry.target.id;
      navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id));
    }
  });
},{rootMargin:"-45% 0px -45% 0px"});
sections.forEach(s=>obs.observe(s));
