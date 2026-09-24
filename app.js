"use strict";
document.documentElement.classList.add("js");
if("IntersectionObserver" in window){const mediaObserver=new IntersectionObserver(entries=>{entries.filter(e=>e.isIntersecting).forEach(e=>{e.target.classList.add("media-ready");mediaObserver.unobserve(e.target)})},{rootMargin:"350px 0px",threshold:0});document.querySelectorAll(".era").forEach(e=>mediaObserver.observe(e));}else{document.querySelectorAll(".era").forEach(e=>e.classList.add("media-ready"));}
const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
const albums={
santa:{name:"Santa Claus Lane",pos:"0%",id:null},
meta:{name:"Metamorphosis",pos:"16.6667%",id:"2zfZe8P8jg53kZaAfCdBYs"},
self:{name:"Hilary Duff",pos:"33.3333%",id:"5Nqi3q9QlLL75JTNcN1xu0"},
wanted:{name:"Most Wanted",pos:"50%",id:"0XRK6Yiz7aFspCEtPIDhFe"},
dignity:{name:"Dignity",pos:"66.6667%",id:"2hfSsyJYp8AYAWIMePvLTI"},
bibo:{name:"Breathe In. Breathe Out.",pos:"83.3333%",id:"2hyPisCjBWeFQ90FLwhriT"},
luck:{name:"luck… or something",pos:"100%",id:"71t4M602DGtkhsy1RtNAME"}
};
const filmData=[
["2001","Lizzie McGuire","Lizzie McGuire","La estudiante, el alter ego animado y la serie que dio inicio a todo para muchísimos fans."],
["2002","Kelly Collins","La cadete Kelly","Kelly se enfrenta a una academia militar y a una vida completamente distinta de la suya."],
["2003","Natalie Connors","Agent Cody Banks","La hija de un científico termina en medio de una misión secreta."],
["2003","Lizzie e Isabella","The Lizzie McGuire Movie","Roma, una estrella pop y la historia de Paolo. Hilary interpreta a Lizzie e Isabella."],
["2003","Lorraine Baker","Cheaper by the Dozen","Lorraine es una de las integrantes mayores de la numerosa familia Baker."],
["2004","Sam Montgomery","A Cinderella Story","Trabaja en una cafetería, conoce a Austin en línea y tiene una cita muy particular en un baile."],
["2004","Terri Fletcher","Raise Your Voice","Terri llega a un programa de verano dedicado a la música."],
["2005","Holly Hamilton","The Perfect Man","Holly inventa un admirador para su madre en esta comedia romántica."],
["2006","Tanzie Marchetta","Material Girls","Hilary comparte pantalla con Haylie en una comedia sobre dos hermanas herederas."],
["2008","Yonica Babyyeah","War, Inc.","Una estrella pop deliberadamente excesiva dentro de una sátira política."],
["2009","Olivia Burke","Gossip Girl","Una actriz famosa que estudia en NYU y conoce a Dan Humphrey."],
["2010","Lane Daniels","Beauty & the Briefcase","Lane se infiltra en el mundo de las finanzas para investigar una historia."],
["2015","Kelsey Peters","Younger","Una joven editora cuya amistad y ambición acompañan siete temporadas de Younger."],
["2022","Sophie","How I Met Your Father","Cuenta cómo conoció al padre de su hijo en esta comedia situada en Nueva York."]
];
const eventData={
cdmx12:{date:"2027-02-12T19:30:00-06:00",day:"VIERNES 12 FEBRERO 2027",venue:"Palacio de los Deportes",city:"Ciudad de México",time:"19:30"},
cdmx13:{date:"2027-02-13T19:30:00-06:00",day:"SÁBADO 13 FEBRERO 2027",venue:"Palacio de los Deportes",city:"Ciudad de México",time:"19:30"},
gdl15:{date:"2027-02-15T20:30:00-06:00",day:"LUNES 15 FEBRERO 2027",venue:"Auditorio Telmex",city:"Zapopan, Jalisco",time:"20:30"}
};
// The only scroll-related work is an IntersectionObserver for active nav.
const navigation=[...$$(".header nav a[href^='#']"),...$$(".era-nav a")];
const idToNav=new Map(navigation.map(a=>[a.getAttribute("href").slice(1),a]));
if("IntersectionObserver" in window){
const sections=$$("main section[id], .era[id]");
const watcher=new IntersectionObserver(entries=>{
  entries.filter(e=>e.isIntersecting).forEach(e=>{
    const id=e.target.id;
    if(id.startsWith("era-")){
      const link=idToNav.get(id);$$(".era-nav a").forEach(a=>a.classList.toggle("active",a===link));
    }else{
      const link=idToNav.get(id);
      if(link){$$(".header nav a").forEach(a=>a.classList.toggle("current",a===link))}
    }
  });
},{rootMargin:"-24% 0px -64% 0px",threshold:0});
sections.forEach(x=>watcher.observe(x));
}
$$(".news-controls button").forEach(button=>button.addEventListener("click",()=>{
  const category=button.dataset.filter;
  $$(".news-controls button").forEach(b=>{b.classList.toggle("active",b===button);b.setAttribute("aria-pressed",String(b===button))});
  $$(".news-tile").forEach(card=>card.hidden=category!=="all"&&card.dataset.category!==category);
}));
function chooseAlbum(id){
  const album=albums[id];
  if(!album)return;
  $("#listen-select").value=id;
  $("[data-listen-title]").textContent=album.name;
  $("[data-listen-cover]").style.setProperty("--cover-pos",album.pos);
  const external=$("[data-listen-external]");
  const frame=$("[data-listen-player] iframe");
  if(album.id){
    external.href="https://open.spotify.com/album/"+album.id;
    frame.src="https://open.spotify.com/embed/album/"+album.id+"?utm_source=generator&theme=0";
    frame.title="Spotify · "+album.name;
  }else{
    external.href="https://open.spotify.com/search/Hilary%20Duff%20Santa%20Claus%20Lane";
    frame.src="https://open.spotify.com/embed/artist/2S9W9aSAd7e5mp8WqWxN2h?utm_source=generator&theme=0";
    frame.title="Spotify · Hilary Duff";
  }
}
$("#listen-select")?.addEventListener("change",e=>chooseAlbum(e.target.value));
$$("[data-listen-era]").forEach(link=>link.addEventListener("click",()=>chooseAlbum(link.dataset.listenEra)));
$$(".film-nav button").forEach(button=>button.addEventListener("click",()=>{
  const kind=button.dataset.filmFilter;
  $$(".film-nav button").forEach(b=>{b.classList.toggle("active",b===button);b.setAttribute("aria-pressed",String(b===button))});
  $$(".film-card").forEach(card=>card.hidden=kind!=="all"&&card.dataset.filmType!==kind);
  $("[data-film-detail]").hidden=true;
}));
function openFilm(index){
  const film=filmData[index];
  if(!film)return;
  const detail=$("[data-film-detail]");
  $("[data-film-year]").textContent=film[0]+" · "+film[2];
  $("[data-film-title]").textContent=film[1];
  $("[data-film-project]").textContent=film[3];
  detail.hidden=false;
  // On phones move the detail immediately after the selected card; no jumping backwards.
  if(matchMedia("(max-width:650px)").matches){
    const card=$('[data-film="'+index+'"]');
    card?.insertAdjacentElement("afterend",detail);
  }else{$(".film-grid").insertAdjacentElement("afterend",detail)}
  detail.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth",block:"nearest"});
}
$$("[data-film]").forEach(el=>el.addEventListener("click",()=>openFilm(Number(el.dataset.film))));
$("[data-film-close]")?.addEventListener("click",()=>$("[data-film-detail]").hidden=true);
const eventTabs=$$(".event-tabs button");
let selectedShow;
try{selectedShow=localStorage.getItem("hdm-show-v14")||"cdmx12"}catch{selectedShow="cdmx12"}
function updateEvent(id){
  const show=eventData[id];if(!show)return;selectedShow=id;
  eventTabs.forEach(b=>{const active=b.dataset.show===id;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))});
  $("[data-show-date]").textContent=show.day;
  $("[data-show-venue]").textContent=show.venue;
  $("[data-show-city]").textContent=show.city;
  $("[data-show-time]").textContent=show.time;
  const days=Math.max(0,Math.ceil((new Date(show.date).getTime()-Date.now())/86400000));
  $("[data-days]").textContent=days;
  try{localStorage.setItem("hdm-show-v14",id)}catch{}
}
eventTabs.forEach(b=>b.addEventListener("click",()=>updateEvent(b.dataset.show)));
updateEvent(eventData[selectedShow]?selectedShow:"cdmx12");
$("[data-calendar]")?.addEventListener("click",()=>{
  const show=eventData[selectedShow],start=new Date(show.date),end=new Date(start.getTime()+2.5*3600000);
  const stamp=x=>x.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z");
  const summary="Hilary Duff · the lucky me tour";
  const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//HDM//MX 2027//ES","BEGIN:VEVENT","DTSTART:"+stamp(start),"DTEND:"+stamp(end),"SUMMARY:"+summary,"LOCATION:"+show.venue+" - "+show.city,"DESCRIPTION:Horario anunciado. Confirma hora, acceso y detalles oficiales antes de asistir.","END:VEVENT","END:VCALENDAR"].join("\r\n");
  const url=URL.createObjectURL(new Blob([ics],{type:"text/calendar;charset=utf-8"}));
  const a=document.createElement("a");a.href=url;a.download="hilary-duff-"+selectedShow+".ics";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),600);
});
// No fake submissions, don't store someone's email in demo.
$("[data-newsletter-form]")?.addEventListener("submit",event=>{
  event.preventDefault();
  $("[data-newsletter-status]").textContent="El formulario aún no está conectado. No hemos guardado tu correo.";
});
// Normal cursor; 3 CSS rings only for real pointer/touch presses.
if(!matchMedia("(prefers-reduced-motion:reduce)").matches){
document.addEventListener("pointerdown",event=>{
  const target=event.target.closest("button,a,input,select,.news-tile");
  if(!target)return;
  const aura=document.createElement("span");aura.className="click-aura";aura.setAttribute("aria-hidden","true");aura.style.left=event.clientX+"px";aura.style.top=event.clientY+"px";
  aura.innerHTML="<i></i><i></i><i></i>";document.body.appendChild(aura);setTimeout(()=>aura.remove(),650);
},{passive:true});
}
// Stop obsolete prototype workers from serving stale UI; this static release has no app-install CTA.
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.getRegistrations().then(list=>list.forEach(r=>r.unregister())).catch(()=>{}))}
if("caches" in window){window.addEventListener("load",()=>caches.keys().then(keys=>keys.filter(k=>k.startsWith("hdm-")).forEach(k=>caches.delete(k))).catch(()=>{}))}
