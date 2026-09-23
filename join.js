const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const form=$("[data-registration]");
const steps=$$("[data-step]");
let step=1;

function showStep(n){
  step=Math.max(1,Math.min(4,n));
  steps.forEach(s=>s.classList.toggle("active",Number(s.dataset.step)===step));
  $("[data-prev]").disabled=step===1;
  $("[data-next]").style.display=step===4?"none":"inline-flex";
  $("[data-join-progress]").textContent=step+" / 4";
  if(step===4)renderSummary();
  scrollTo({top:0,behavior:"smooth"});
}
function validateCurrent(){
  const active=$("[data-step='"+step+"']");
  const required=$$("input[required],select[required],textarea[required]",active);
  for(const el of required){if(!el.checkValidity()){el.reportValidity();return false;}}
  return true;
}
$("[data-next]").addEventListener("click",()=>{if(validateCurrent())showStep(step+1);});
$("[data-prev]").addEventListener("click",()=>showStep(step-1));

function value(name){return form.elements[name]?.value?.trim?.()||"";}
function renderSummary(){
  const interests=$$("input[name='interests']:checked").map(i=>i.parentElement.querySelector("b").textContent);
  $("[data-summary]").innerHTML=`
    <div><span>NOMBRE</span><b>${value("first_name")} ${value("last_name")}</b></div>
    <div><span>CORREO</span><b>${value("email")}</b></div>
    <div><span>DESDE</span><b>${value("fan_since")||"—"}</b></div>
    <div><span>PUERTA DE ENTRADA</span><b>${value("gateway")}</b></div>
    <div><span>ÁLBUM</span><b>${value("favorite_album")}</b></div>
    <div><span>INTERESES</span><b>${interests.join(" · ")||"—"}</b></div>`;
}
form.addEventListener("submit",e=>{
  e.preventDefault();
  if(!validateCurrent())return;
  const data=Object.fromEntries(new FormData(form).entries());
  data.interests=$$("input[name='interests']:checked").map(i=>i.value);
  localStorage.setItem("hdm-registration-demo",JSON.stringify(data));
  $("[data-registration-note]").textContent="Inscripción de prueba guardada sólo en este dispositivo. El registro real se conectará antes del lanzamiento.";
});
showStep(1);
