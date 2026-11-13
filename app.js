const phone="233208337856";
const photos=[
"https://images.unsplash.com/photo-1557979619-445218f326b9?auto=format&fit=crop&w=900&q=80",
"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=900&q=80",
"https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&w=900&q=80",
"https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&w=900&q=80",
"https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=900&q=80",
"https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=900&q=80"
];
const groups=[
["birthday","Birthday","A little celebration, beautifully finished."],
["wedding","Wedding","Elegant inspiration for a day to remember."],
["celebration","Celebration & anniversary","Thoughtful designs for meaningful milestones."],
["graduation","Graduation","A sweet way to mark the achievement."],
["corporate","Events & corporate","Cake inspiration for gatherings and milestones."],
["kids","Kids & themed","Playful ideas for little and big imaginations."],
["desserts","Cupcakes & desserts","Small treats for sharing and gifting."]
];
const adjectives=["The Signature","Soft Bloom","Golden Hour","The Classic"];
const cards=groups.flatMap((g,gi)=>adjectives.map((n,i)=>({id:g[0]+"-"+i,cat:g[0],group:g[1],name:n+" "+g[1].split(" ")[0],desc:g[2],img:photos[(gi+i)%photos.length]})));
const $=s=>document.querySelector(s);
const sections=$("#collectionSections"),search=$("#searchInput"),occasion=$("#occasionFilter"),flavour=$("#flavourFilter"),size=$("#sizeFilter"),budget=$("#budgetFilter");
let basket=[],activeCard=null;
function render(){
 const q=search.value.trim().toLowerCase(),cat=occasion.value;
 const filtered=cards.filter(c=>(cat==="all"||c.cat===cat)&&(!q||(c.name+" "+c.group+" "+c.desc).toLowerCase().includes(q)));
 sections.innerHTML="";
 groups.forEach(g=>{
  const items=filtered.filter(c=>c.cat===g[0]);if(!items.length)return;
  const section=document.createElement("section");section.className="collection-group";
  section.innerHTML='<div class="collection-title"><h3>'+g[1]+'</h3><span>'+String(items.length).padStart(2,"0")+' SAMPLE IDEAS</span></div><div class="design-grid"></div>';
  const grid=section.querySelector(".design-grid");
  items.forEach(c=>{
   const card=document.createElement("article");card.className="design-card";
   card.innerHTML='<img loading="lazy" src="'+c.img+'" alt="Illustrative cake design inspiration"><div class="design-info"><small>'+c.group.toUpperCase()+' · SAMPLE DESIGN</small><h4>'+c.name+'</h4><p>'+c.desc+'</p><div class="card-actions"><button data-view="'+c.id+'">Quick view ↗</button><button data-add="'+c.id+'">Add to bag +</button></div></div>';
   grid.append(card);
  });sections.append(section);
 });
 $("#emptyState").hidden=filtered.length>0;
}
function count(){ $("#basketCount").textContent=basket.length; }
function openBasket(){ $("#basketOverlay").hidden=false;$("#basketDrawer").classList.add("open");$("#basketDrawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";renderBasket(); }
function closeBasket(){ $("#basketOverlay").hidden=true;$("#basketDrawer").classList.remove("open");$("#basketDrawer").setAttribute("aria-hidden","true");document.body.style.overflow=""; }
function renderBasket(){
 const host=$("#basketItems");
 if(!basket.length){host.innerHTML='<p class="basket-empty">Your enquiry bag is empty. Add a few designs to get started.</p>';count();return;}
 host.innerHTML=basket.map((c,i)=>'<div class="basket-row"><img src="'+c.img+'" alt=""><div><strong>'+c.name+'</strong><button data-remove="'+i+'">Remove</button></div></div>').join("");count();
}
function add(id){const c=cards.find(x=>x.id===id);if(c&&!basket.some(x=>x.id===id)){basket.push(c);renderBasket();} }
function whatsapp(message){window.open("https://wa.me/"+phone+"?text="+encodeURIComponent(message),"_blank","noopener");}
function showQuick(c){
 activeCard=c;$("#quickImage").src=c.img;$("#quickImage").alt="Illustrative "+c.name+" cake design";$("#quickCategory").textContent=c.group.toUpperCase()+" · SAMPLE INSPIRATION";$("#quickTitle").textContent=c.name;$("#quickDescription").textContent=c.desc;$("#quickModal").hidden=false;document.body.style.overflow="hidden";
}
function closeQuick(){ $("#quickModal").hidden=true;document.body.style.overflow=""; }
sections.addEventListener("click",e=>{
 const v=e.target.closest("[data-view]"),a=e.target.closest("[data-add]");
 if(v){const c=cards.find(x=>x.id===v.dataset.view);if(c)showQuick(c);}
 if(a){add(a.dataset.add);a.textContent="Added ✓";}
});
$("#quickAdd").addEventListener("click",()=>{if(activeCard)add(activeCard.id);closeQuick();openBasket();});
$("#quickModal").addEventListener("click",e=>{if(e.target.matches("[data-close-modal]"))closeQuick();});
$("#basketOpen").addEventListener("click",openBasket);$("#basketClose").addEventListener("click",closeBasket);$("#basketOverlay").addEventListener("click",closeBasket);
$("#basketItems").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(b){basket.splice(Number(b.dataset.remove),1);renderBasket();}});
$("#clearBasket").addEventListener("click",()=>{basket=[];renderBasket();});
$("#sendBasket").addEventListener("click",()=>{
 if(!basket.length)return;
 const lines=basket.map((c,i)=>(i+1)+". "+c.name+" ("+c.group+")").join("\n");
 whatsapp("Hello Nupet Cakes, I would like to enquire about these cake design inspirations:\n"+lines+"\nPlease confirm whether similar designs are possible, along with available flavours, sizes, pricing and lead time. Thank you.");
});
[search,occasion].forEach(el=>el.addEventListener("input",render));
$("#clearFilters").addEventListener("click",()=>{search.value="";occasion.value="all";render();});
const dateInput=$("#neededDate");if(dateInput){const today=new Date();const local=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);dateInput.min=local;}
$("#inspiration").addEventListener("change",e=>{$("#fileNote").textContent=e.target.files.length?"Selected: "+e.target.files[0].name+" — attach it manually after WhatsApp opens.":"If you attach an image, send it manually in WhatsApp after the message opens.";});
$("#orderForm").addEventListener("submit",e=>{
 e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;
 const d=new FormData(form),v=k=>String(d.get(k)||"Not provided");
 const message=[
 "Hello Nupet Cakes, I would like to make a cake enquiry.",
 "Name: "+v("name"),"Phone: "+v("phone"),"Occasion: "+v("occasion"),"Date needed: "+v("date"),
 "Flavour: "+v("flavour"),"Size/servings: "+v("size"),"Collection: "+v("fulfilment"),
 "Address/area: "+v("address"),"Design notes: "+v("notes"),
 "Please confirm availability, final pricing, lead time and payment/delivery arrangements. Thank you."
 ].join("\n");
 $("#formStatus").textContent="Your enquiry is ready. WhatsApp will open in a new tab; review and send the message there. Attach any inspiration image manually.";
 whatsapp(message);
});
n\nI would like to enquire about a cake.\nName: "+(d.get("name")||"") +"\nPhone: "+(d.get("phone")||"")+"\nOccasion: "+(d.get("occasion")||"") +"\nDate: "+(d.get("date")||"") +"\n\nPlease share your availability and pricing.\n\nThank you.");window.location.href="mailto:?subject="+subject+"&body="+body;});
const toggle=$("#menuToggle"),nav=$("#mainNav");toggle.addEventListener("click",()=>{const opened=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(opened));toggle.setAttribute("aria-label",opened?"Close navigation":"Open navigation");});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
$("#year").textContent=new Date().getFullYear();
render();count();

const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduceMotion && "IntersectionObserver" in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
 }),{threshold:.12});
 document.querySelectorAll(".reveal").forEach(el=>{el.classList.add("reveal-ready");observer.observe(el);});
}
if(!reduceMotion && window.matchMedia("(min-width: 900px)").matches){
 const hero=document.querySelector(".hero-image");
 window.addEventListener("scroll",()=>{const y=Math.min(window.scrollY*.16,90);hero.style.transform="scale(1.06) translateY("+y+"px)";},{passive:true});
}
