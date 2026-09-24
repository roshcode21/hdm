const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const form=$("[data-registration]");
const steps=$$("[data-step]");
const stepButtons=$$("[data-step-jump]");
let step=1;
let maxVisited=1;

function value(name){
  const el=form.elements[name];
  return el?.value?.trim?.()||"";
}

function showStep(n,{scroll=true}={}){
  step=Math.max(1,Math.min(4,n));
  maxVisited=Math.max(maxVisited,step);

  steps.forEach(s=>s.classList.toggle("active",Number(s.dataset.step)===step));
  stepButtons.forEach(b=>{
    const target=Number(b.dataset.stepJump);
    b.classList.toggle("active",target===step);
    b.disabled=target>maxVisited;
  });

  $("[data-prev]").disabled=step===1;
  $("[data-next]").style.display=step===4?"none":"inline-flex";
  $("[data-join-progress]").textContent=step+" / 4";

  if(step===4)renderSummary();

  if(scroll)scrollTo({top:0,behavior:"smooth"});
}

function validateCurrent(){
  const active=$("[data-step='"+step+"']");
  for(const el of $$("input[required],select[required],textarea[required]",active)){
    if(!el.checkValidity()){
      el.reportValidity();
      return false;
    }
  }
  return true;
}

$("[data-next]").addEventListener("click",()=>{if(validateCurrent())showStep(step+1);});
$("[data-prev]").addEventListener("click",()=>showStep(step-1));
stepButtons.forEach(b=>b.addEventListener("click",()=>{
  const target=Number(b.dataset.stepJump);
  if(target<=maxVisited)showStep(target);
}));

function renderSummary(){
  const interests=$$("input[name='interests']:checked").map(i=>i.parentElement.querySelector("b").textContent);
  const rows=[
    ["NOMBRE",value("full_name")||"—"],
    ["NOMBRE / APODO",value("preferred_name")||value("full_name")||"—"],
    ["CORREO",value("email")||"—"],
    ["UBICACIÓN",[value("city"),value("state"),value("country")].filter(Boolean).join(", ")||"—"],
    ["FAN DESDE",value("fan_since")||"—"],
    ["LLEGASTE POR",value("gateway")||"—"],
    ["ÁLBUM",value("favorite_album")||"—"],
    ["PANTALLA",value("favorite_screen")||"—"],
    ["MÉXICO 2027",value("mexico2027")||"—"],
    ["INTERESES",interests.join(" · ")||"Sólo membresía"]
  ];
  const summary=$("[data-summary]");summary.textContent="";
  rows.forEach(([label,val])=>{
    const item=document.createElement("div"),caption=document.createElement("span"),value=document.createElement("b");
    caption.textContent=label;value.textContent=val;item.append(caption,value);summary.appendChild(item);
  });
}

const birth=form.elements.birthdate;
birth?.addEventListener("change",()=>{
  let note=birth.closest("label").querySelector(".birth-note");
  if(!note){
    note=document.createElement("small");
    note.className="birth-note";
    birth.closest("label").appendChild(note);
  }
  if(!birth.value){note.textContent="";return;}
  const dob=new Date(birth.value+"T00:00:00"),today=new Date();
  let age=today.getFullYear()-dob.getFullYear();
  const m=today.getMonth()-dob.getMonth();
  if(m<0||(m===0&&today.getDate()<dob.getDate()))age--;
  note.textContent=age<18?"Para algunas actividades presenciales podrían pedirse permisos adicionales.":"";
});

form.addEventListener("submit",e=>{
  e.preventDefault();
  if(!validateCurrent())return;

  $("[data-registration-note]").textContent="El formulario es una vista previa: no se han enviado ni guardado tus datos.";
  const submit=$(".reg-submit");submit.textContent="Vista previa terminada ✓";submit.disabled=true;
});

try{localStorage.removeItem("hdm-registration-draft");localStorage.removeItem("hdm-registration-demo");}catch{}
showStep(1,{scroll:false});
document.addEventListener("pointerdown",e=>{
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const aura=document.createElement("span");
  aura.className="click-aura";
  aura.style.left=e.clientX+"px";
  aura.style.top=e.clientY+"px";
  document.body.appendChild(aura);
  setTimeout(()=>aura.remove(),520);
},{passive:true});
