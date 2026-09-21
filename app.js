const q=(s,p=document)=>p.querySelector(s);
const qa=(s,p=document)=>[...p.querySelectorAll(s)];

const cursor=q(".cursor");
if(cursor){
  window.addEventListener("pointermove",e=>{
    cursor.style.left=e.clientX+"px";
    cursor.style.top=e.clientY+"px";
  });
  qa("a,button").forEach(el=>{
    el.addEventListener("mouseenter",()=>document.body.classList.add("is-link"));
    el.addEventListener("mouseleave",()=>document.body.classList.remove("is-link"));
  });
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
qa(".reveal").forEach(el=>observer.observe(el));

const countdown=q("[data-countdown]");
if(countdown){
  const target=new Date(countdown.dataset.countdown).getTime();
  const render=()=>{
    const diff=Math.max(0,target-Date.now());
    const d=Math.floor(diff/86400000);
    const h=Math.floor((diff%86400000)/3600000);
    const m=Math.floor((diff%3600000)/60000);
    q("[data-days]",countdown).textContent=String(d).padStart(3,"0");
    q("[data-hours]",countdown).textContent=String(h).padStart(2,"0");
    q("[data-minutes]",countdown).textContent=String(m).padStart(2,"0");
  };
  render();
  setInterval(render,30000);
}

const menu=q(".menu-toggle");
const nav=q(".site-nav");
if(menu&&nav){
  const close=()=>{
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded","false");
  };
  menu.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    menu.setAttribute("aria-expanded",String(open));
  });
  qa("a",nav).forEach(a=>a.addEventListener("click",close));
}

const media=q(".hero-media");
const title=q(".hero-title");
if(media&&title&&matchMedia("(pointer:fine)").matches){
  window.addEventListener("pointermove",e=>{
    const x=(e.clientX/window.innerWidth-.5);
    const y=(e.clientY/window.innerHeight-.5);
    media.style.transform=`rotate(${2.2+x*2}deg) translate(${x*10}px,${y*8}px)`;
    title.style.transform=`translateX(${x*-5}px)`;
  });
}