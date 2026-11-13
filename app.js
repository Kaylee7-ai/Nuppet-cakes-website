"use strict";
const PHONE="233208337856";
const PHOTOS=[
 "https://images.unsplash.com/photo-1557979619-445218f326b9?auto=format&fit=crop&w=1200&q=85",
 "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85",
 "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1200&q=85",
 "https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&w=1200&q=85",
 "https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&w=1200&q=85",
 "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=1200&q=85",
 "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1200&q=85"
];
const GROUPS=[
 ["birthday","Birthday","A little celebration, beautifully finished."],
 ["wedding","Wedding","Elegant inspiration for a day to remember."],
 ["celebration","Celebration & anniversary","Thoughtful designs for meaningful milestones."],
 ["graduation","Graduation","A sweet way to mark the achievement."],
 ["corporate","Events & corporate","Cake inspiration for gatherings and milestones."],
 ["kids","Kids & themed","Playful ideas for little and big imaginations."],
 ["desserts","Cupcakes & desserts","Small treats for sharing and gifting."]
];
const TITLES=["The Signature","Soft Bloom","Golden Hour","The Classic"];
const PRODUCTS=GROUPS.flatMap((group,gi)=>TITLES.map((title,i)=>({
 id:group[0]+"-"+i,category:group[0],group:group[1],
 name:title+" "+group[1].split(" ")[0],description:group[2],
 image:PHOTOS[(gi+i)%PHOTOS.length]
})));
const $=selector=>document.querySelector(selector);
const collectionRoot=$("#collectionSections");
const searchInput=$("#searchInput");
const occasionFilter=$("#occasionFilter");
let basket=[];
let activeProduct=null;

function sendWhatsApp(message){
 const url="https://wa.me/"+PHONE+"?text="+encodeURIComponent(message);
 window.open(url,"_blank","noopener,noreferrer");
}
function updateCount(){ $("#basketCount").textContent=String(basket.length); }
function renderCollections(){
 const query=searchInput.value.trim().toLowerCase();
 const category=occasionFilter.value;
 const matches=PRODUCTS.filter(item=>
  (category==="all"||item.category===category) &&
  (!query||(item.name+" "+item.group+" "+item.description).toLowerCase().includes(query))
 );
 collectionRoot.innerHTML="";
 GROUPS.forEach(group=>{
  const items=matches.filter(item=>item.category===group[0]);
  if(!items.length)return;
  const section=document.createElement("section");
  section.className="collection-group";
  section.innerHTML='<div class="collection-title"><h3>'+group[1]+'</h3><span>'+String(items.length).padStart(2,"0")+' SAMPLE IDEAS</span></div><div class="design-grid"></div>';
  const grid=section.querySelector(".design-grid");
  items.forEach(item=>{
   const card=document.createElement("article");
   card.className="design-card";
   card.innerHTML='<img loading="lazy" src="'+item.image+'" alt="Illustrative '+item.group.toLowerCase()+' cake design inspiration"><div class="design-info"><small>'+item.group.toUpperCase()+' · SAMPLE DESIGN</small><h4>'+item.name+'</h4><p>'+item.description+'</p><div class="card-actions"><button type="button" data-view="'+item.id+'">Quick view ↗</button><button type="button" data-add="'+item.id+'">Add to bag +</button></div></div>';
   const img=card.querySelector("img");
   img.addEventListener("error",()=>{img.alt="Cake image unavailable; sample design placeholder";img.classList.add("image-unavailable");},{once:true});
   grid.append(card);
  });
  collectionRoot.append(section);
 });
 $("#emptyState").hidden=matches.length>0;
}
function renderBasket(){
 const root=$("#basketItems");
 if(!basket.length){
  root.innerHTML='<p class="basket-empty">Your enquiry bag is empty. Add a few designs to get started.</p>';
 }else{
  root.innerHTML=basket.map((item,index)=>
   '<div class="basket-row"><img src="'+item.image+'" alt=""><div><strong>'+item.name+'</strong><button type="button" data-remove="'+index+'">Remove</button></div></div>'
  ).join("");
 }
 updateCount();
}
function addToBasket(id){
 const item=PRODUCTS.find(product=>product.id===id);
 if(item&&!basket.some(product=>product.id===id)){basket.push(item);renderBasket();}
}
function openBasket(){
 $("#basketOverlay").hidden=false;
 $("#basketDrawer").classList.add("open");
 $("#basketDrawer").setAttribute("aria-hidden","false");
 document.body.style.overflow="hidden";
 renderBasket();
}
function closeBasket(){
 $("#basketOverlay").hidden=true;
 $("#basketDrawer").classList.remove("open");
 $("#basketDrawer").setAttribute("aria-hidden","true");
 document.body.style.overflow="";
}
function openQuickView(item){
 activeProduct=item;
 $("#quickImage").src=item.image;
 $("#quickImage").alt="Illustrative "+item.name+" cake design";
 $("#quickCategory").textContent=item.group.toUpperCase()+" · SAMPLE INSPIRATION";
 $("#quickTitle").textContent=item.name;
 $("#quickDescription").textContent=item.description;
 $("#quickModal").hidden=false;
 document.body.style.overflow="hidden";
}
function closeQuickView(){
 $("#quickModal").hidden=true;
 document.body.style.overflow="";
}

collectionRoot.addEventListener("click",event=>{
 const viewButton=event.target.closest("[data-view]");
 const addButton=event.target.closest("[data-add]");
 if(viewButton){
  const item=PRODUCTS.find(product=>product.id===viewButton.dataset.view);
  if(item)openQuickView(item);
 }
 if(addButton){
  addToBasket(addButton.dataset.add);
  addButton.textContent="Added ✓";
 }
});
$("#quickAdd").addEventListener("click",()=>{
 if(activeProduct)addToBasket(activeProduct.id);
 closeQuickView();
 openBasket();
});
$("#quickModal").addEventListener("click",event=>{
 if(event.target.matches("[data-close-modal]"))closeQuickView();
});
$("#basketOpen").addEventListener("click",openBasket);
$("#basketClose").addEventListener("click",closeBasket);
$("#basketOverlay").addEventListener("click",closeBasket);
$("#basketItems").addEventListener("click",event=>{
 const button=event.target.closest("[data-remove]");
 if(button){basket.splice(Number(button.dataset.remove),1);renderBasket();}
});
$("#clearBasket").addEventListener("click",()=>{basket=[];renderBasket();});
$("#sendBasket").addEventListener("click",()=>{
 if(!basket.length)return;
 const selected=basket.map((item,index)=>(index+1)+". "+item.name+" ("+item.group+")").join("\n");
 sendWhatsApp("Hello Nupet Cakes, I would like to enquire about these cake design inspirations:\n"+selected+"\nPlease confirm whether similar designs are possible, along with available flavours, sizes, pricing and lead time. Thank you.");
});
[searchInput,occasionFilter].forEach(control=>control.addEventListener("input",renderCollections));
$("#clearFilters").addEventListener("click",()=>{
 searchInput.value="";
 occasionFilter.value="all";
 renderCollections();
});
const dateInput=$("#neededDate");
if(dateInput){
 const now=new Date();
 const localDate=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10);
 dateInput.min=localDate;
}
$("#inspiration").addEventListener("change",event=>{
 $("#fileNote").textContent=event.target.files.length
  ?"Selected: "+event.target.files[0].name+" — attach it manually after WhatsApp opens."
  :"If you attach an image, send it manually in WhatsApp after the message opens.";
});
$("#orderForm").addEventListener("submit",event=>{
 event.preventDefault();
 const form=event.currentTarget;
 if(!form.reportValidity())return;
 const data=new FormData(form);
 const value=key=>String(data.get(key)||"Not provided");
 const message=[
  "Hello Nupet Cakes, I would like to make a cake enquiry.",
  "Name: "+value("name"),
  "Phone: "+value("phone"),
  "Occasion: "+value("occasion"),
  "Date needed: "+value("date"),
  "Flavour: "+value("flavour"),
  "Size/servings: "+value("size"),
  "Collection: "+value("fulfilment"),
  "Address/area: "+value("address"),
  "Design notes: "+value("notes"),
  "Please confirm availability, final pricing, lead time and payment/delivery arrangements. Thank you."
 ].join("\n");
 $("#formStatus").textContent="Your enquiry is ready. WhatsApp will open in a new tab; review and send the message there. Attach any inspiration image manually.";
 sendWhatsApp(message);
});
const menuButton=$("#menuToggle");
const navigation=$("#mainNav");
menuButton.addEventListener("click",()=>{
 const isOpen=navigation.classList.toggle("open");
 menuButton.setAttribute("aria-expanded",String(isOpen));
 menuButton.setAttribute("aria-label",isOpen?"Close navigation":"Open navigation");
});
navigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
 navigation.classList.remove("open");
 menuButton.setAttribute("aria-expanded","false");
}));
document.addEventListener("keydown",event=>{
 if(event.key==="Escape"){closeBasket();closeQuickView();}
});
$("#year").textContent=String(new Date().getFullYear());
renderCollections();
renderBasket();

const prefersReducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!prefersReducedMotion&&"IntersectionObserver" in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
 }),{threshold:.12});
 document.querySelectorAll(".reveal").forEach(element=>{
  element.classList.add("reveal-ready");
  observer.observe(element);
 });
}
if(!prefersReducedMotion&&window.matchMedia("(min-width: 900px)").matches){
 const heroImage=document.querySelector(".hero-image");
 window.addEventListener("scroll",()=>{
  const offset=Math.min(window.scrollY*.16,90);
  heroImage.style.transform="scale(1.06) translateY("+offset+"px)";
 },{passive:true});
}
