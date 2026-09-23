const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const form=$("[data-registration]");
const steps=$$("[data-step]");
const stepButtons=$$("[data-step-jump]");
let step=1;
let maxVisited=1;
let saveTimer=0;

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
  queueDraft();

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
  $("[data-summary]").innerHTML=rows.map(([label,text])=>"<div><span>"+label+"</span><b>"+text+"</b></div>").join("");
}

function saveDraft(){
  saveTimer=0;
  const data={};
  new FormData(form).forEach((v,k)=>{data[k]=v;});
  data.interests=$$("input[name='interests']:checked").map(i=>i.value);
  data._step=step;
  data._maxVisited=maxVisited;
  localStorage.setItem("hdm-registration-draft",JSON.stringify(data));
}

function queueDraft(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(saveDraft,300);
}
form.addEventListener("input",queueDraft);
form.addEventListener("change",queueDraft);

function restoreDraft(){
  const raw=localStorage.getItem("hdm-registration-draft");
  if(!raw)return 1;
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
    maxVisited=Math.max(1,Math.min(4,Number(data._maxVisited)||1));
    return Math.max(1,Math.min(4,Number(data._step)||1));
  }catch{
    return 1;
  }
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

  const data=Object.fromEntries(new FormData(form).entries());
  data.interests=$$("input[name='interests']:checked").map(i=>i.value);

  localStorage.setItem("hdm-registration-demo",JSON.stringify(data));
  localStorage.removeItem("hdm-registration-draft");

  $("[data-registration-note]").textContent="Inscripción de prueba guardada sólo en este dispositivo. El registro real se conectará antes del lanzamiento.";
  const submit=$(".reg-submit");
  submit.textContent="Inscripción guardada ✓";
  submit.disabled=true;
});

const initial=restoreDraft();
showStep(initial,{scroll:false});