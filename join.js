const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const form=$("[data-registration]");
const steps=$$("[data-step]");
const stepButtons=$$("[data-step-jump]");
let step=1;
let maxVisited=1;

function showStep(n){
  step=Math.max(1,Math.min(4,n));
  maxVisited=Math.max(maxVisited,step);

  steps.forEach(s=>s.classList.toggle("active",Number(s.dataset.step)===step));
  stepButtons.forEach(b=>{
    const n=Number(b.dataset.stepJump);
    b.classList.toggle("active",n===step);
    b.disabled=n>maxVisited;
  });

  $("[data-prev]").disabled=step===1;
  $("[data-next]").style.display=step===4?"none":"inline-flex";
  $("[data-join-progress]").textContent=step+" / 4";
  document.documentElement.style.setProperty("--step-progress",((step-1)/3*100)+"%");

  if(step===4)renderSummary();

  const current=stepButtons.find(b=>Number(b.dataset.stepJump)===step);
  current?.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"});
  scrollTo({top:0,behavior:"smooth"});
}

function validateCurrent(){
  const active=$("[data-step='"+step+"']");
  const required=$$("input[required],select[required],textarea[required]",active);
  for(const el of required){
    if(!el.checkValidity()){
      el.reportValidity();
      return false;
    }
  }
  return true;
}

$("[data-next]").addEventListener("click",()=>{
  if(validateCurrent())showStep(step+1);
});
$("[data-prev]").addEventListener("click",()=>showStep(step-1));
stepButtons.forEach(b=>b.addEventListener("click",()=>{
  const target=Number(b.dataset.stepJump);
  if(target<=maxVisited)showStep(target);
}));

function value(name){
  const el=form.elements[name];
  return el?.value?.trim?.()||"";
}

function renderSummary(){
  const interests=$$("input[name='interests']:checked").map(i=>i.parentElement.querySelector("b").textContent);
  const rows=[
    ["NOMBRE",value("full_name")||"—"],
    ["TE LLAMAMOS",value("preferred_name")||value("full_name")||"—"],
    ["CORREO",value("email")||"—"],
    ["UBICACIÓN",[value("city"),value("state"),value("country")].filter(Boolean).join(", ")||"—"],
    ["FAN DESDE",value("fan_since")||"—"],
    ["PUERTA DE ENTRADA",value("gateway")||"—"],
    ["ÁLBUM",value("favorite_album")||"—"],
    ["PANTALLA",value("favorite_screen")||"—"],
    ["MÉXICO 2027",value("mexico2027")||"—"],
    ["INTERESES",interests.join(" · ")||"Sólo membresía"]
  ];
  $("[data-summary]").innerHTML=rows.map(r=>"<div><span>"+r[0]+"</span><b>"+r[1]+"</b></div>").join("");
}

function saveDraft(){
  const data={};
  new FormData(form).forEach((v,k)=>{data[k]=v});
  data.interests=$$("input[name='interests']:checked").map(i=>i.value);
  data._step=step;
  localStorage.setItem("hdm-registration-draft",JSON.stringify(data));
}

function restoreDraft(){
  const raw=localStorage.getItem("hdm-registration-draft");
  if(!raw)return;
  try{
    const data=JSON.parse(raw);
    Object.entries(data).forEach(([k,v])=>{
      if(k==="interests"||k.startsWith("_"))return;
      const el=form.elements[k];
      if(el&&typeof v==="string")el.value=v;
    });
    if(Array.isArray(data.interests)){
      $$("input[name='interests']").forEach(i=>i.checked=data.interests.includes(i.value));
    }
    maxVisited=Math.max(1,Math.min(4,Number(data._step)||1));
  }catch{}
}

form.addEventListener("input",saveDraft);
form.addEventListener("change",saveDraft);

const birth=form.elements.birthdate;
birth?.addEventListener("change",()=>{
  const val=birth.value;
  let note=$(".birth-note");
  if(!note){
    note=document.createElement("small");
    note.className="birth-note";
    birth.closest("label").appendChild(note);
  }
  if(!val){note.textContent="";return;}
  const dob=new Date(val+"T00:00:00");
  const today=new Date();
  let age=today.getFullYear()-dob.getFullYear();
  const m=today.getMonth()-dob.getMonth();
  if(m<0||(m===0&&today.getDate()<dob.getDate()))age--;
  note.textContent=age<18
    ?"Si participas en actividades presenciales, podrían requerirse permisos adicionales para menores de edad."
    :"";
});

form.addEventListener("submit",e=>{
  e.preventDefault();
  if(!validateCurrent())return;

  const data=Object.fromEntries(new FormData(form).entries());
  data.interests=$$("input[name='interests']:checked").map(i=>i.value);

  localStorage.setItem("hdm-registration-demo",JSON.stringify(data));
  localStorage.removeItem("hdm-registration-draft");

  $("[data-registration-note]").textContent="Inscripción de prueba guardada sólo en este dispositivo. El registro real se conectará antes del lanzamiento.";
  $(".reg-submit").textContent="Inscripción guardada ✓";
  $(".reg-submit").disabled=true;
});

const glow=$(".join-cursor-glow");
if(glow&&matchMedia("(pointer:fine)").matches&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
  let x=innerWidth*.5,y=innerHeight*.3,cx=x,cy=y,raf=0;
  const paint=()=>{
    raf=0;
    cx+=(x-cx)*.08;cy+=(y-cy)*.08;
    glow.style.left=cx+"px";glow.style.top=cy+"px";
    if(Math.abs(x-cx)>.2||Math.abs(y-cy)>.2)raf=requestAnimationFrame(paint);
  };
  addEventListener("pointermove",e=>{x=e.clientX;y=e.clientY;if(!raf)raf=requestAnimationFrame(paint);},{passive:true});
  paint();
}

restoreDraft();
showStep(1);