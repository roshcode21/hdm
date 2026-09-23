const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

const scenes={
  now:{
    kicker:"AHORA · 23 SEP 2026",
    title:"the lucky me tour suma 32 fechas.",
    copy:"La gira se extiende en Europa, Latinoamérica y Estados Unidos. México sigue en febrero de 2027.",
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff en 2026",
    actions:[["Ver actualidad","#ahora"],["Tour oficial ↗","https://www.hilaryduff.com/live"]]
  },
  meta:{
    kicker:"2003 · METAMORPHOSIS",
    title:"Come Clean sigue encontrando gente nueva.",
    copy:"Metamorphosis llevó la carrera pop de Hilary a otra escala con So Yesterday, Come Clean y Why Not.",
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff",
    actions:[["Abrir música","#musica"],["Spotify ↗","https://open.spotify.com/artist/2S9W9aSAd7e5mp8WqWxN2h"]]
  },
  dignity:{
    kicker:"2007 · DIGNITY",
    title:"With Love. Stranger. Play With Fire.",
    copy:"La etapa electrónica de Hilary sigue ocupando un lugar enorme entre los fans y en la conversación sobre su catálogo.",
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff",
    actions:[["Abrir Dignity","#musica"],["Spotify ↗","https://open.spotify.com/artist/2S9W9aSAd7e5mp8WqWxN2h"]]
  },
  lizzie:{
    kicker:"2001 — 2026",
    title:"Lizzie McGuire cumple 25.",
    copy:"Dos temporadas, 65 episodios, una película y una parte enorme de la historia de Hilary.",
    image:"https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/FC5C3AA105E2E4F7DA0510B918269D19663591203F49676D10AE2E2C976790CB/compose?format=webp&width=1800",
    alt:"Lizzie McGuire con su alter ego animado",
    actions:[["Abrir especial","#lizzie"],["Disney+ ↗","https://www.disneyplus.com/es-mx/explore/articles/lizzie-mcguire-anniversary"]]
  },
  mexico:{
    kicker:"FEBRERO · 2027",
    title:"Tres noches en México.",
    copy:"12 y 13 en Palacio de los Deportes. 15 en Auditorio Telmex. Elige tu fecha y arma tu guía.",
    image:"https://press.atlanticrecords.com/sites/g/files/g2000014001/files/styles/artist_detail/public/2026-02/Hilary%20Duff%20Album%20Press%20Photo%201%20-%20Credit%20Alfred%20Marroquin_0.jpg?itok=d3_kRNm5",
    alt:"Hilary Duff",
    actions:[["Abrir México 2027","#mexico"],["OCESA ↗","https://www.ocesa.com.mx/todos-los-eventos/hilary-duff-boletos-ae1632382"]]
  }
};

function setScene(key){
  const d=scenes[key]; if(!d)return;
  const apply=()=>{
    const hero=$(".hero");hero.dataset.scene=key;
    $("[data-scene-kicker]").textContent=d.kicker;
    $("[data-scene-title]").textContent=d.title;
    $("[data-scene-copy]").textContent=d.copy;
    const img=$("[data-scene-image]");img.src=d.image;img.alt=d.alt;
    const host=$("[data-scene-actions]");host.innerHTML="";
    d.actions.forEach(([label,href],i)=>{
      const a=document.createElement("a");a.textContent=label;a.href=href;a.className="pill "+(i===0?"primary":"glass");
      if(href.startsWith("http")){a.target="_blank";a.rel="noreferrer";}
      host.appendChild(a);
    });
    $$("[data-scene-button]").forEach(b=>b.classList.toggle("active",b.dataset.sceneButton===key));
  };
  if(document.startViewTransition&&!reduce)document.startViewTransition(apply);else apply();
}
$$("[data-scene-button]").forEach(b=>b.addEventListener("click",()=>setScene(b.dataset.sceneButton)));

const heroSpace=$("[data-hero-space]");
if(heroSpace&&!reduce){
  let tx=0,ty=0,currentX=0,currentY=0,raf=0,dragging=false,startX=0,startY=0;
  const paint=()=>{
    raf=0;currentX+=(tx-currentX)*.12;currentY+=(ty-currentY)*.12;
    const cam=$(".hero-camera");
    cam?.style.setProperty("--tilt-x",currentY+"deg");
    cam?.style.setProperty("--tilt-y",currentX+"deg");
    if(Math.abs(tx-currentX)>.02||Math.abs(ty-currentY)>.02)raf=requestAnimationFrame(paint);
  };
  heroSpace.addEventListener("pointermove",e=>{
    const r=heroSpace.getBoundingClientRect();
    if(dragging){
      tx=Math.max(-10,Math.min(10,(e.clientX-startX)/18));
      ty=Math.max(-8,Math.min(8,-(e.clientY-startY)/22));
    }else if(e.pointerType==="mouse"){
      tx=((e.clientX-r.left)/r.width-.5)*8;
      ty=-((e.clientY-r.top)/r.height-.5)*6;
    }
    if(!raf)raf=requestAnimationFrame(paint);
  },{passive:true});
  heroSpace.addEventListener("pointerdown",e=>{dragging=true;startX=e.clientX;startY=e.clientY;heroSpace.setPointerCapture?.(e.pointerId);});
  heroSpace.addEventListener("pointerup",e=>{dragging=false;tx=0;ty=0;if(!raf)raf=requestAnimationFrame(paint);heroSpace.releasePointerCapture?.(e.pointerId);});
  heroSpace.addEventListener("pointerleave",()=>{if(!dragging){tx=0;ty=0;if(!raf)raf=requestAnimationFrame(paint);}});
}

const characters={
  lizzie:{year:"2001",type:"SERIE · DISNEY CHANNEL",title:"Lizzie McGuire",copy:"La chica de 13 años que convirtió los problemas cotidianos en una conversación con toda una generación.",theme:"lizzie",tags:["Gordo","Miranda","alter ego animado"],ref:["25","años"],link:["Abrir especial Lizzie","#lizzie"]},
  kelly:{year:"2002",type:"PELÍCULA · DISNEY CHANNEL",title:"Kelly Collins",copy:"Una adolescente a la moda llega a una academia militar y termina dejando su propia marca frente a la cadete capitana Stone.",theme:"kelly",tags:["Cadet Kelly","Stone","Disney+"],ref:["2002","Kelly"],link:["Ficha Disney+ ↗","https://www.disneyplus.com/es-mx/browse/entity-8b14e5bf-0c24-407b-b660-d6a031e05c60"]},
  natalie:{year:"2003",type:"PELÍCULA",title:"Natalie Connors",copy:"La hija de un científico termina en medio de la primera misión grande de Cody Banks.",theme:"natalie",tags:["Agent Cody Banks","2003","Natalie"],ref:["CIA","? no"],link:["Ficha Apple TV ↗","https://tv.apple.com/mx/movie/agente-cody-banks---super-espia/umc.cmc.70g4gnyfmbmqnrcolvpco1mes"]},
  isabella:{year:"2003",type:"PELÍCULA · ROMA",title:"Lizzie / Isabella",copy:"Dos papeles, Roma y el final cinematográfico de Lizzie McGuire. Paolo incluido.",theme:"isabella",tags:["Roma","Isabella","Paolo"],ref:["ROME","2003"],link:["Especial Disney+ ↗","https://www.disneyplus.com/es-mx/explore/articles/lizzie-mcguire-anniversary"]},
  lorraine:{year:"2003",type:"PELÍCULA",title:"Lorraine Baker",copy:"La hermana mayor de la familia Baker en Doce en casa, uno de los éxitos familiares de la etapa más intensa de Hilary en cine.",theme:"lorraine",tags:["Cheaper by the Dozen","familia Baker","2003"],ref:["12","Baker"],link:["Filmografía Apple TV ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  sam:{year:"2004",type:"PELÍCULA",title:"Sam Montgomery",copy:"Mesera, estudiante, teléfono perdido y un baile de máscaras: uno de los personajes más reconocibles de su filmografía dosmilera.",theme:"sam",tags:["A Cinderella Story","Austin","diner"],ref:["SAM","2004"],link:["Ficha ↗","https://www.netflix.com/title/60036237"]},
  terri:{year:"2004",type:"PELÍCULA · MÚSICA",title:"Terri Fletcher",copy:"Raise Your Voice cruza drama adolescente, escuela de música y una Hilary mucho más volcada al canto dentro de la historia.",theme:"terri",tags:["Raise Your Voice","música","2004"],ref:["TERRI","VOICE"],link:["Filmografía Apple TV ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  holly:{year:"2005",type:"PELÍCULA",title:"Holly Hamilton",copy:"En The Perfect Man, Holly inventa un admirador secreto para intentar cambiar la vida amorosa de su madre.",theme:"holly",tags:["The Perfect Man","Holly","2005"],ref:["HOLLY","2005"],link:["Ficha Apple TV ↗","https://tv.apple.com/pt/movie/o-homem-perfeito/umc.cmc.53rjoz21v2m1mn753jwdoygwe"]},
  tanzie:{year:"2006",type:"PELÍCULA",title:"Tanzie Marchetta",copy:"Hilary comparte pantalla con Haylie en Material Girls como Tanzie, heredera de una empresa de cosméticos que tiene que reconstruirse desde cero.",theme:"tanzie",tags:["Material Girls","Tanzie","Haylie Duff"],ref:["TANZIE","2006"],link:["Ficha ↗","https://www.ecartelera.com.mx/peliculas/material-girls/"]},
  yonica:{year:"2008",type:"PELÍCULA · SÁTIRA",title:"Yonica Babyyeah",copy:"La estrella pop exagerada y extrañísima de War, Inc. fue uno de los papeles con los que Hilary buscó romper de forma deliberada con sus personajes anteriores.",theme:"yonica",tags:["War, Inc.","Yonica Babyyeah","pop star"],ref:["YONICA","BABYYEAH"],link:["Ficha IMDb ↗","https://www.imdb.com/title/tt0884224/characters/nm0240381/"]},
  olivia:{year:"2009",type:"SERIE · GOSSIP GIRL",title:"Olivia Burke",copy:"Una estrella de cine que llega a NYU y se cruza con Dan Humphrey durante la tercera temporada de Gossip Girl.",theme:"olivia",tags:["Gossip Girl","NYU","Olivia"],ref:["OLIVIA","BURKE"],link:["Ficha Apple TV ↗","https://tv.apple.com/mx/person/hilary-duff/umc.cpc.bw4vzg1oougsgfe1es9f54lm"]},
  lane:{year:"2010",type:"PELÍCULA PARA TV",title:"Lane Daniels",copy:"En Beauty & the Briefcase, Lane se infiltra en el mundo corporativo buscando material para una historia de revista.",theme:"lane",tags:["Beauty & the Briefcase","Lane","2010"],ref:["LANE","2010"],link:["Filmografía ↗","https://www.biography.com/actor/hilary-duff"]},
  kelsey:{year:"2015",type:"SERIE · YOUNGER",title:"Kelsey Peters",copy:"Editora ambiciosa y una de las piezas centrales de Younger durante siete temporadas.",theme:"kelsey",tags:["Younger","publishing","Kelsey"],ref:["KELSEY","PETERS"],link:["Ficha IMDb ↗","https://www.imdb.com/title/tt3288518/characters/nm0240381/"]},
  sophie:{year:"2022",type:"SERIE · HULU",title:"Sophie",copy:"La protagonista de How I Met Your Father cuenta a su hijo cómo conoció a su padre mientras reconstruimos su vida en Nueva York.",theme:"sophie",tags:["HIMYF","NYC","Sophie"],ref:["SOPHIE","2022"],link:["Disney+ ↗","https://www.disneyplus.com/en-mx/browse/entity-42771fe9-3174-43bc-ab6a-d8c3e618b934"]}
};
function setCharacter(key){
  const d=characters[key];if(!d)return;
  const apply=()=>{
    const focus=$("[data-character-focus]");focus.dataset.theme=d.theme;
    $("[data-character-year]").textContent=d.year;$("[data-character-type]").textContent=d.type;$("[data-character-title]").textContent=d.title;$("[data-character-copy]").textContent=d.copy;
    const tags=$("[data-character-tags]");tags.innerHTML="";d.tags.forEach(t=>{const s=document.createElement("span");s.textContent=t;tags.appendChild(s);});
    const ref=$("[data-character-reference]");ref.innerHTML=`<span>${d.ref[0]}</span><b>${d.ref[1]}</b>`;
    const a=$("[data-character-link]");a.textContent=d.link[0];a.href=d.link[1];if(d.link[1].startsWith("http")){a.target="_blank";a.rel="noreferrer";}else{a.removeAttribute("target");a.removeAttribute("rel");}
    $$("[data-character]").forEach(b=>b.classList.toggle("active",b.dataset.character===key));
  };
  if(document.startViewTransition&&!reduce)document.startViewTransition(apply);else apply();
}
$$("[data-character]").forEach(b=>b.addEventListener("click",()=>setCharacter(b.dataset.character)));

const albums={
  santa:{year:"2002",title:"Santa Claus Lane",short:"SC",copy:"El primer álbum de estudio de Hilary y el inicio de su catálogo discográfico.",tracks:["Santa Claus Lane","Tell Me a Story","I Heard Santa on the Radio"],theme:"santa"},
  meta:{year:"2003",title:"Metamorphosis",short:"M",copy:"El disco que llevó la carrera pop de Hilary a otra escala y dejó dos de sus canciones más reconocibles.",tracks:["So Yesterday","Come Clean","Why Not"],theme:"meta"},
  self:{year:"2004",title:"Hilary Duff",short:"HD",copy:"Una etapa con más guitarras y canciones como Fly, The Getaway y Someone’s Watching Over Me.",tracks:["Fly","The Getaway","Someone’s Watching Over Me"],theme:"self"},
  dignity:{year:"2007",title:"Dignity",short:"D",copy:"El giro electrónico: With Love, Stranger y Play With Fire. Una de las eras más celebradas por los fans.",tracks:["With Love","Stranger","Play With Fire"],theme:"dignity"},
  bibo:{year:"2015",title:"Breathe In. Breathe Out.",short:"B",copy:"El regreso de 2015: Sparks, My Kind y una etapa que hoy funciona como puente hacia el presente.",tracks:["Sparks","My Kind","Breathe In. Breathe Out."],theme:"bibo"},
  luck:{year:"2026",title:"luck… or something",short:"…",copy:"Once canciones, una nueva gira mundial y el regreso musical completo después de más de una década.",tracks:["Weather For Tennis","Roommates","Future Tripping"],theme:"luck"}
};
function setAlbum(key){
  const d=albums[key];if(!d)return;
  const world=$("[data-album-world]");
  const apply=()=>{
    world.dataset.theme=d.theme;$("[data-album-year]").textContent=d.year;$("[data-album-title]").textContent=d.title;$("[data-album-copy]").textContent=d.copy;$("[data-album-short]").textContent=d.short;
    const tracks=$("[data-album-tracks]");tracks.innerHTML="";d.tracks.forEach(t=>{const b=document.createElement("button");b.type="button";b.textContent=t;tracks.appendChild(b);});
    $$("[data-album]").forEach(b=>b.classList.toggle("active",b.dataset.album===key));
  };
  if(document.startViewTransition&&!reduce)document.startViewTransition(apply);else apply();
}
$$("[data-album]").forEach(b=>b.addEventListener("click",()=>setAlbum(b.dataset.album)));
const songs=[["Come Clean","Metamorphosis · 2003"],["With Love","Dignity · 2007"],["Fly","Hilary Duff · 2004"],["Sparks","Breathe In. Breathe Out. · 2015"],["Mature","luck… or something · 2026"],["Why Not","Metamorphosis · 2003"],["Roommates","luck… or something · 2026"],["My Kind","Breathe In. Breathe Out. · 2015"]];
$("[data-random-song]")?.addEventListener("click",()=>{const [song,era]=songs[Math.floor(Math.random()*songs.length)];$("[data-random-result]").innerHTML=`<small>SELECCIÓN HDM</small><strong>${song}</strong><span>${era}</span>`;});

const shows={
  cdmx12:{date:"2027-02-12T20:00:00-06:00",dateLabel:"12 FEB 2027 · CDMX",venue:"Palacio de los Deportes",city:"Ciudad de México",ics:"Hilary Duff - the lucky me tour · CDMX 12 Feb"},
  cdmx13:{date:"2027-02-13T20:00:00-06:00",dateLabel:"13 FEB 2027 · CDMX",venue:"Palacio de los Deportes",city:"Ciudad de México",ics:"Hilary Duff - the lucky me tour · CDMX 13 Feb"},
  gdl15:{date:"2027-02-15T20:30:00-06:00",dateLabel:"15 FEB 2027 · GDL",venue:"Auditorio Telmex",city:"Guadalajara, Jalisco",ics:"Hilary Duff - the lucky me tour · Guadalajara"}
};
let currentShow=localStorage.getItem("hdm-show")||"cdmx12";
function daysUntil(iso){return Math.max(0,Math.ceil((new Date(iso).getTime()-Date.now())/86400000));}
function setShow(key){
  const d=shows[key];if(!d)return;currentShow=key;localStorage.setItem("hdm-show",key);
  $("[data-show-days]").textContent=daysUntil(d.date);$("[data-show-date]").textContent=d.dateLabel;$("[data-show-venue]").textContent=d.venue;$("[data-show-city]").textContent=d.city;
  $$("[data-show]").forEach(b=>b.classList.toggle("active",b.dataset.show===key));
  restoreChecklist();
}
$$("[data-show]").forEach(b=>b.addEventListener("click",()=>setShow(b.dataset.show)));
setShow(currentShow);
setInterval(()=>setShow(currentShow),60000);

function restoreChecklist(){
  const saved=JSON.parse(localStorage.getItem("hdm-check-"+currentShow)||"{}");
  $$("[data-check]").forEach(i=>i.checked=!!saved[i.dataset.check]);
}
$$("[data-check]").forEach(i=>i.addEventListener("change",()=>{
  const state={};$$("[data-check]").forEach(x=>state[x.dataset.check]=x.checked);localStorage.setItem("hdm-check-"+currentShow,JSON.stringify(state));
}));
$("[data-calendar]")?.addEventListener("click",()=>{
  const d=shows[currentShow],start=new Date(d.date),end=new Date(start.getTime()+2.5*3600000);
  const fmt=x=>x.toISOString().replace(/[-:]/g,"").replace(/.d{3}Z/,"Z");
  const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//HDM//Mexico 2027//ES","BEGIN:VEVENT","DTSTART:"+fmt(start),"DTEND:"+fmt(end),"SUMMARY:"+d.ics,"LOCATION:"+d.venue+", "+d.city,"DESCRIPTION:Hilary Duff - the lucky me tour. Verifica horarios y accesos oficiales antes del evento.","END:VEVENT","END:VCALENDAR"].join("\r\n");
  const blob=new Blob([ics],{type:"text/calendar"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="HDM-"+currentShow+".ics";a.click();setTimeout(()=>URL.revokeObjectURL(url),500);
});

const joinState={era:"lizzie"};
const memberData={
  lizzie:{label:"Lizzie McGuire",year:"2001",word:"LIZZIE",theme:"lizzie"},
  meta:{label:"Metamorphosis",year:"2003",word:"COME CLEAN",theme:"meta"},
  dignity:{label:"Dignity",year:"2007",word:"WITH LOVE",theme:"dignity"},
  younger:{label:"Younger",year:"2015",word:"KELSEY",theme:"younger"},
  bibo:{label:"Breathe In. Breathe Out.",year:"2015",word:"SPARKS",theme:"bibo"},
  luck:{label:"luck… or something",year:"2026",word:"LUCK…",theme:"luck"}
};
function refreshMember(){
  const d=memberData[joinState.era],card=$("[data-member-card]");if(!d||!card)return;card.dataset.theme=d.theme;$("[data-member-era]").textContent=d.label;$("[data-member-year]").textContent=d.year;$("[data-member-word]").textContent=d.word;$$("[data-join-era]").forEach(b=>b.classList.toggle("active",b.dataset.joinEra===joinState.era));
}
$$("[data-join-era]").forEach(b=>b.addEventListener("click",()=>{joinState.era=b.dataset.joinEra;refreshMember();}));
$("[data-join-name]")?.addEventListener("input",e=>$("[data-member-name]").textContent=e.target.value.trim()||"Tu nombre");
$("[data-join-city]")?.addEventListener("input",e=>$("[data-member-city]").textContent=e.target.value.trim()||"México");
refreshMember();
$("[data-join-form]")?.addEventListener("submit",e=>{
  e.preventDefault();const name=$("[data-join-name]").value.trim(),email=$("[data-join-email]").value.trim();if(!name||!email)return;
  const data={name,email,city:$("[data-join-city]").value.trim(),instagram:$("[data-join-instagram]").value.trim(),era:joinState.era,interests:$$("[data-interest]:checked").map(i=>i.dataset.interest)};
  localStorage.setItem("hdm-join-demo",JSON.stringify(data));$("[data-join-note]").textContent="Datos guardados sólo en este dispositivo para la demo. El registro real se conectará antes del lanzamiento.";toast("Inscripción de prueba guardada ✦");
});
$("[data-newsletter-form]")?.addEventListener("submit",e=>{e.preventDefault();const email=$("#newsletter-email").value.trim();if(!email)return;localStorage.setItem("hdm-newsletter-demo",email);$("[data-newsletter-note]").textContent="Correo guardado sólo en este dispositivo para la demo.";e.currentTarget.reset();toast("Newsletter de prueba guardado ✦");});

function setupRail(rail){
  let down=false,startX=0,startScroll=0;
  rail.addEventListener("pointerdown",e=>{if(e.target.closest("a,button"))return;down=true;startX=e.clientX;startScroll=rail.scrollLeft;rail.classList.add("dragging");rail.setPointerCapture?.(e.pointerId);});
  rail.addEventListener("pointermove",e=>{if(!down)return;rail.scrollLeft=startScroll-(e.clientX-startX);});
  rail.addEventListener("pointerup",e=>{down=false;rail.classList.remove("dragging");rail.releasePointerCapture?.(e.pointerId);});
  rail.addEventListener("pointercancel",()=>{down=false;rail.classList.remove("dragging");});
  rail.addEventListener("wheel",e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){e.preventDefault();rail.scrollLeft+=e.deltaY;}},{passive:false});
  const items=[...rail.children];let frame=0;
  const paint=()=>{frame=0;const center=rail.scrollLeft+rail.clientWidth/2;items.forEach(item=>{const c=item.offsetLeft+item.offsetWidth/2,d=(c-center)/rail.clientWidth;item.style.transform=`perspective(900px) rotateY(${d*-14}deg) translateZ(${Math.max(-45,-Math.abs(d)*70)}px) scale(${1-Math.min(.08,Math.abs(d)*.08)})`;});};
  rail.addEventListener("scroll",()=>{if(!frame)frame=requestAnimationFrame(paint);},{passive:true});paint();
}
$$("[data-drag-rail]").forEach(setupRail);

if(!reduce&&matchMedia("(pointer:fine)").matches){
  $$("[data-tilt]").forEach(el=>{
    el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateX(${-y*7}deg) rotateY(${x*9}deg) translateZ(10px)`;});
    el.addEventListener("pointerleave",()=>el.style.transform="");
  });
  let last=0;document.addEventListener("pointermove",e=>{if(performance.now()-last<85)return;if(!e.target.closest(".hero,.join,.newsletter,.footer"))return;last=performance.now();const s=document.createElement("span");s.className="spark";s.textContent=Math.random()>.45?"✦":"·";s.style.left=e.clientX+"px";s.style.top=e.clientY+"px";s.style.color=["#ff72b6","#ddff4a","#7edcff","#9e84ff"][Math.floor(Math.random()*4)];document.body.appendChild(s);setTimeout(()=>s.remove(),750);},{passive:true});
}

const searchItems=[
  {cat:"PERSONAJE",title:"Yonica Babyyeah",keys:"yonica babyyeah war inc 2008",target:"#pantalla",action:()=>setCharacter("yonica")},
  {cat:"PERSONAJE",title:"Tanzie Marchetta",keys:"tanzie material girls 2006",target:"#pantalla",action:()=>setCharacter("tanzie")},
  {cat:"PERSONAJE",title:"Kelly Collins",keys:"kelly cadete 2002",target:"#pantalla",action:()=>setCharacter("kelly")},
  {cat:"PERSONAJE",title:"Sam Montgomery",keys:"sam cinderella story 2004",target:"#pantalla",action:()=>setCharacter("sam")},
  {cat:"PERSONAJE",title:"Kelsey Peters",keys:"kelsey younger 2015",target:"#pantalla",action:()=>setCharacter("kelsey")},
  {cat:"MÚSICA",title:"Dignity",keys:"dignity with love stranger play with fire",target:"#musica",action:()=>setAlbum("dignity")},
  {cat:"MÚSICA",title:"Metamorphosis",keys:"metamorphosis come clean so yesterday",target:"#musica",action:()=>setAlbum("meta")},
  {cat:"MÚSICA",title:"luck… or something",keys:"luck roommates mature future tripping",target:"#musica",action:()=>setAlbum("luck")},
  {cat:"MÉXICO",title:"México 2027",keys:"boletos cdmx guadalajara gdl palacio telmex",target:"#mexico"},
  {cat:"HDM",title:"Únete a HDM",keys:"registro fan club unete",target:"#unete"},
  {cat:"HDM",title:"Newsletter",keys:"correo noticias newsletter",target:"#newsletter"},
  {cat:"HDM",title:"Instagram",keys:"instagram comunidad",url:"https://www.instagram.com/hilaryduffmexico/"}
];
const dialog=$("[data-search-dialog]"),input=$("[data-search-input]"),results=$("[data-search-results]");
const norm=v=>(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
function renderSearch(q=""){const query=norm(q.trim()),found=query?searchItems.filter(i=>norm(i.cat+" "+i.title+" "+i.keys).includes(query)):searchItems.slice(0,8);results.innerHTML="";if(!found.length){results.innerHTML='<div class="search-empty">No encontré eso. Prueba otra palabra.</div>';return;}found.forEach(item=>{const b=document.createElement("button");b.type="button";b.className="search-result";b.innerHTML=`<small>${item.cat}</small><b>${item.title}</b><em>→</em>`;b.addEventListener("click",()=>{dialog.close();item.action?.();if(item.target)setTimeout(()=>$(item.target)?.scrollIntoView({behavior:"smooth"}),60);if(item.url)window.open(item.url,"_blank","noopener");});results.appendChild(b);});}
function openSearch(q=""){if(!dialog.open)dialog.showModal();input.value=q;renderSearch(q);requestAnimationFrame(()=>input.focus());}
$$("[data-search-open]").forEach(b=>b.addEventListener("click",()=>openSearch()));input?.addEventListener("input",()=>renderSearch(input.value));document.addEventListener("keydown",e=>{if(e.key==="/"&&!/input|textarea/i.test(document.activeElement?.tagName||"")){e.preventDefault();openSearch();}});
dialog?.addEventListener("click",e=>{const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});renderSearch();

const shuffleTargets=[
  ()=>{setScene("lizzie");$("#inicio").scrollIntoView({behavior:"smooth"});},
  ()=>{setCharacter("yonica");$("#pantalla").scrollIntoView({behavior:"smooth"});},
  ()=>{setAlbum("dignity");$("#musica").scrollIntoView({behavior:"smooth"});},
  ()=>{setCharacter("sam");$("#pantalla").scrollIntoView({behavior:"smooth"});},
  ()=>{setAlbum("luck");$("#musica").scrollIntoView({behavior:"smooth"});},
  ()=>{$("#mexico").scrollIntoView({behavior:"smooth"});}
];
$$("[data-shuffle]").forEach(b=>b.addEventListener("click",()=>shuffleTargets[Math.floor(Math.random()*shuffleTargets.length)]()));

let deferredPrompt=null;const installDialog=$("[data-install-dialog]");
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;});
$$("[data-install]").forEach(b=>b.addEventListener("click",async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;}else installDialog.showModal();}));
installDialog?.addEventListener("click",e=>{const r=installDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)installDialog.close();});

function toast(text){let t=$(".toast");if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t);}t.textContent=text;t.classList.add("show");clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove("show"),2200);}

const mobileLinks=$$(".mobile-nav a");const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const id=entry.target.id;mobileLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id));});},{rootMargin:"-42% 0px -48% 0px"});$$("section[id]").forEach(s=>observer.observe(s));

if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
