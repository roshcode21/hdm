const shows={
  cdmx12:{label:"12 FEB · CDMX",venue:"Palacio de los Deportes",date:"2027-02-12T20:00:00-06:00"},
  cdmx13:{label:"13 FEB · CDMX",venue:"Palacio de los Deportes",date:"2027-02-13T20:00:00-06:00"},
  gdl15:{label:"15 FEB · GDL",venue:"Auditorio Telmex",date:"2027-02-15T20:00:00-06:00"}
};

const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const night=$("[data-your-night]");
let timer=null;

function renderCountdown(key){
  if(timer) clearInterval(timer);
  if(!shows[key]) return;
  const target=new Date(shows[key].date).getTime();
  const tick=()=>{
    const diff=Math.max(0,target-Date.now());
    const days=Math.floor(diff/86400000);
    const hours=Math.floor((diff%86400000)/3600000);
    const minutes=Math.floor((diff%3600000)/60000);
    $("[data-days]").textContent=String(days).padStart(3,"0");
    $("[data-hours]").textContent=String(hours).padStart(2,"0");
    $("[data-minutes]").textContent=String(minutes).padStart(2,"0");
  };
  tick();
  timer=setInterval(tick,30000);
}

function chooseDate(key,scroll=false){
  $$("[data-date]").forEach(b=>b.classList.toggle("active",b.dataset.date===key));
  if(key==="none"){
    localStorage.removeItem("hdm-show");
    night.hidden=true;
    return;
  }
  const show=shows[key];
  if(!show) return;
  localStorage.setItem("hdm-show",key);
  $("[data-selected-date]").textContent=show.label;
  $("[data-selected-venue]").textContent=show.venue;
  night.hidden=false;
  renderCountdown(key);
  if(scroll) night.scrollIntoView({behavior:"smooth",block:"nearest"});
}

$$("[data-date]").forEach(button=>{
  button.addEventListener("click",()=>chooseDate(button.dataset.date,true));
});

$$("[data-select-show]").forEach(button=>{
  button.addEventListener("click",()=>chooseDate(button.dataset.selectShow,true));
});

$("[data-change-date]")?.addEventListener("click",()=>{
  $("#inicio").scrollIntoView({behavior:"smooth"});
});

const saved=localStorage.getItem("hdm-show");
if(saved && shows[saved]) chooseDate(saved);

const menuButton=$(".menu-button");
const mobileMenu=$(".mobile-menu");
menuButton?.addEventListener("click",()=>{
  const open=mobileMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",String(open));
});
$$(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>{
  mobileMenu.classList.remove("open");
  menuButton?.setAttribute("aria-expanded","false");
}));
