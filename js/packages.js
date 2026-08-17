/* WildVenture Tourist Packages - editable package catalog */
const TOURIST_PACKAGES = [
  {
    id:'tadoba-wildlife-safari',
    icon:'🐯',
    name:'Tadoba Wildlife Safari',
    location:'Tadoba Andhari Tiger Reserve, Chandrapur',
    state:'Maharashtra',
    duration:'2 Days / 1 Night',
    price:4499,
    activities:['Jeep Safari','Wildlife Photography'],
    description:'A focused wildlife escape into Tadoba’s dry deciduous forests, lakes and grasslands, designed for travelers who want guided safari time and dedicated wildlife photography opportunities.',
    highlights:['Morning & evening safari experience','Wildlife photography opportunities','Guided forest interpretation','Nature-focused stay'],
    bestTime:'October to May',
    idealFor:'Wildlife lovers, photographers & families',
    inclusions:['Accommodation','Safari coordination','Local guide support'],
    image:'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1000&q=80',
    maps:'https://www.google.com/maps/search/?api=1&query=Tadoba+Andhari+Tiger+Reserve+Chandrapur+Maharashtra'
  },
  {
    id:'mahabaleshwar-adventure',
    icon:'🏔️',
    name:'Mahabaleshwar Adventure',
    location:'Mahabaleshwar, Satara',
    state:'Maharashtra',
    duration:'3 Days / 2 Nights',
    price:5499,
    activities:['Trekking','Camping','Waterfalls'],
    description:'A refreshing Sahyadri escape with forest trails, waterfall stops, scenic viewpoints and comfortable camping for an active weekend in the hills.',
    highlights:['Guided Sahyadri trek','Waterfall exploration','Campfire evening','Panoramic valley viewpoints'],
    bestTime:'October to June',
    idealFor:'Adventure groups, couples & weekend travelers',
    inclusions:['2-night stay','Trekking support','Camp activities'],
    image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80',
    maps:'https://www.google.com/maps/search/?api=1&query=Mahabaleshwar+Satara+Maharashtra'
  },
  {
    id:'lonavala-camping',
    icon:'🌲',
    name:'Lonavala Camping',
    location:'Lonavala, Pune',
    state:'Maharashtra',
    duration:'2 Days / 1 Night',
    price:3999,
    activities:['Camping','Trekking','Sightseeing'],
    description:'Spend a relaxed night in the Sahyadris with campsite fun, easy trekking and classic Lonavala sightseeing around misty valleys and viewpoints.',
    highlights:['Scenic campsite stay','Easy-to-moderate trek','Sunset viewpoints','Local sightseeing circuit'],
    bestTime:'June to February',
    idealFor:'Friends, college groups & first-time campers',
    inclusions:['Camp stay','Trek assistance','Sightseeing plan'],
    image:'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=80',
    maps:'https://www.google.com/maps/search/?api=1&query=Lonavala+Pune+Maharashtra'
  },
  {
    id:'pench-wildlife-adventure',
    icon:'🦌',
    name:'Pench Wildlife Adventure',
    location:'Pench Tiger Reserve',
    state:'Maharashtra / Madhya Pradesh',
    duration:'3 Days / 2 Nights',
    price:6499,
    activities:['Jeep Safari','Bird Watching'],
    description:'Explore the forest landscape of Pench with jeep safari drives and dedicated bird-watching time, balancing wildlife excitement with slow nature immersion.',
    highlights:['Jeep safari drives','Birding sessions','Forest interpretation','Wildlife observation'],
    bestTime:'October to June',
    idealFor:'Wildlife enthusiasts & birders',
    inclusions:['2-night stay','Safari coordination','Nature guide support'],
    image:'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    maps:'https://www.google.com/maps/search/?api=1&query=Pench+Tiger+Reserve+Maharashtra+Madhya+Pradesh'
  },
  {
    id:'melghat-jungle-escape',
    icon:'🌿',
    name:'Melghat Jungle Escape',
    location:'Melghat Tiger Reserve, Amravati',
    state:'Maharashtra',
    duration:'3 Days / 2 Nights',
    price:5799,
    activities:['Safari','Nature Trails'],
    description:'Reconnect with the rugged Satpura landscape through safari experiences, guided nature trails and quiet time deep inside Melghat’s forest country.',
    highlights:['Forest safari','Nature trail walks','Satpura landscape views','Slow-travel experience'],
    bestTime:'October to May',
    idealFor:'Nature lovers, photographers & explorers',
    inclusions:['2-night stay','Safari support','Nature trail guide'],
    image:'https://images.unsplash.com/photo-1535338454770-8be927b5a00b?auto=format&fit=crop&w=1000&q=80',
    maps:'https://www.google.com/maps/search/?api=1&query=Melghat+Tiger+Reserve+Amravati+Maharashtra'
  },
  {
    id:'tarkarli-beach-adventure',
    icon:'🌊',
    name:'Tarkarli Beach Adventure',
    location:'Tarkarli, Sindhudurg',
    state:'Maharashtra',
    duration:'3 Days / 2 Nights',
    price:6999,
    activities:['Scuba Diving','Water Sports'],
    description:'Take the adventure to the Konkan coast with scuba diving, water sports, beach time and a chance to explore the Malvan-Tarkarli coastal landscape.',
    highlights:['Scuba diving experience','Water sports session','Beach leisure time','Konkan coastal exploration'],
    bestTime:'October to May',
    idealFor:'Beach lovers, couples & adventure seekers',
    inclusions:['2-night stay','Water-activity coordination','Local trip support'],
    image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    maps:'https://www.google.com/maps/search/?api=1&query=Tarkarli+Sindhudurg+Maharashtra'
  },
  {
    id:'lonar-crater-explorer',
    icon:'🌋',
    name:'Lonar Crater Explorer',
    location:'Lonar, Buldhana',
    state:'Maharashtra',
    duration:'2 Days / 1 Night',
    price:4299,
    activities:['Crater Lake','Nature & Heritage'],
    description:'Discover the unusual landscape around Lonar with crater-lake views, nature walks and heritage exploration that mixes geology, ecology and local history.',
    highlights:['Lonar crater lake exploration','Nature walk','Heritage sightseeing','Photography stops'],
    bestTime:'October to March',
    idealFor:'Explorers, photographers & heritage travelers',
    inclusions:['Stay','Local sightseeing support','Guided exploration'],
    image:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80',
    maps:'https://www.google.com/maps/search/?api=1&query=Lonar+Crater+Lake+Buldhana+Maharashtra'
  },
  {
    id:'bhandardara-camping',
    icon:'🏕️',
    name:'Bhandardara Camping',
    location:'Bhandardara, Ahmednagar',
    state:'Maharashtra',
    duration:'2 Days / 1 Night',
    price:3499,
    activities:['Camping','Trekking','Lake Views'],
    description:'A classic Sahyadri camping escape around Bhandardara’s lake country, combining outdoor nights, short treks and peaceful scenic viewpoints.',
    highlights:['Lake-view campsite','Sahyadri trek','Campfire & stargazing','Scenic sunrise views'],
    bestTime:'October to March',
    idealFor:'Friends, families & photography groups',
    inclusions:['Tent stay','Camping activities','Trek coordination'],
    image:'https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1000&q=80',
    maps:'https://www.google.com/maps/search/?api=1&query=Bhandardara+Ahmednagar+Maharashtra'
  },
  {
    id:'chikhaldara-hill-adventure',
    icon:'⛰️',
    name:'Chikhaldara Hill Adventure',
    location:'Chikhaldara, Amravati',
    state:'Maharashtra',
    duration:'3 Days / 2 Nights',
    price:4999,
    activities:['Trekking','Waterfalls','Wildlife'],
    description:'Enjoy a cooler hill-country getaway in Chikhaldara with forest trails, seasonal waterfalls, viewpoints and wildlife-focused experiences.',
    highlights:['Hill treks','Waterfall stops','Wildlife exploration','Panoramic viewpoints'],
    bestTime:'October to February',
    idealFor:'Trekkers, families & nature explorers',
    inclusions:['2-night stay','Trek assistance','Local sightseeing support'],
    image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80',
    maps:'https://www.google.com/maps/search/?api=1&query=Chikhaldara+Amravati+Maharashtra'
  },
  {
    id:'panchgani-escape',
    icon:'🏞️',
    name:'Panchgani Escape',
    location:'Panchgani, Satara',
    state:'Maharashtra',
    duration:'2 Days / 1 Night',
    price:4599,
    activities:['Paragliding','Table Land','Sightseeing'],
    description:'A compact hill getaway built around panoramic views, a Table Land visit, local sightseeing and an optional paragliding adventure.',
    highlights:['Paragliding experience','Table Land exploration','Hill-view sightseeing','Relaxed weekend pace'],
    bestTime:'October to May',
    idealFor:'Couples, families & adventure beginners',
    inclusions:['Stay','Sightseeing support','Adventure coordination'],
    image:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    maps:'https://www.google.com/maps/search/?api=1&query=Panchgani+Satara+Maharashtra'
  }
];

const TouristPackages = {
 render(){
  const grid=document.getElementById('tourist-packages-grid'); if(!grid)return;
  const query=(document.getElementById('package-search')?.value||'').toLowerCase().trim();
  const list=TOURIST_PACKAGES.filter(p=>!query||`${p.name} ${p.location} ${p.state} ${p.activities.join(' ')} ${p.highlights.join(' ')}`.toLowerCase().includes(query));
  document.getElementById('packages-results-count').textContent=`${list.length} package${list.length===1?'':'s'} available`;
  grid.innerHTML=list.map((p,i)=>`<article class="package-card"><div class="package-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="package-number">${p.icon} ${String(i+1).padStart(2,'0')}</span><span class="package-price">₹${p.price.toLocaleString()} <small>/ person</small></span></div><div class="package-body"><div class="package-location"><i class="ph ph-map-pin"></i><span>${p.location}<br>${p.state}</span></div><h3 class="package-title">${p.name}</h3><p class="package-desc">${p.description}</p><div class="package-meta"><span><i class="ph ph-calendar"></i> ${p.duration}</span><span><i class="ph ph-sparkle"></i> Best: ${p.bestTime}</span></div><div class="package-activities">${p.activities.map(a=>`<span class="activity-pill">${a}</span>`).join('')}</div><div class="package-actions"><button class="btn btn-primary btn-sm" onclick="TouristPackages.book('${p.id}')"><i class="ph ph-ticket"></i> Book Now</button><button class="btn btn-outline btn-sm" onclick="TouristPackages.openDetails('${p.id}')"><i class="ph ph-eye"></i> View Details</button><a class="btn btn-outline btn-sm package-map" href="${p.maps}" target="_blank" rel="noopener"><i class="ph ph-map-trifold"></i> View Location / Google Maps</a></div></div></article>`).join('')||`<div class="empty-state-card col-span-full"><i class="ph ph-magnifying-glass empty-icon"></i><h3>No packages found</h3><p>Try another destination, package name or activity.</p></div>`;
 },
 openDetails(id){
  const p=TOURIST_PACKAGES.find(x=>x.id===id); if(!p)return;
  const modal=document.getElementById('tourist-package-modal');
  document.getElementById('package-detail-content').innerHTML=`<div class="package-detail-grid"><div><img class="package-detail-image" src="${p.image}" alt="${p.name}"></div><div class="package-detail-copy"><span class="section-tag">${p.icon} <i class="ph ph-compass"></i> Tourist Package</span><h2>${p.name}</h2><div class="package-location"><i class="ph ph-map-pin"></i><span>${p.location}<br>${p.state}</span></div><p>${p.description}</p><div class="package-detail-facts"><div class="package-fact"><strong>Duration</strong>${p.duration}</div><div class="package-fact"><strong>Price</strong>₹${p.price.toLocaleString()} / person</div><div class="package-fact"><strong>Best Time</strong>${p.bestTime}</div><div class="package-fact"><strong>Ideal For</strong>${p.idealFor}</div></div><h4>Main Activities</h4><div class="package-detail-activities">${p.activities.map(a=>`<span class="activity-pill">${a}</span>`).join('')}</div><h4>Package Highlights</h4><ul class="package-highlights">${p.highlights.map(h=>`<li><i class="ph ph-check-circle"></i>${h}</li>`).join('')}</ul><h4>Included</h4><div class="package-detail-activities">${p.inclusions.map(a=>`<span class="activity-pill">${a}</span>`).join('')}</div><div class="package-detail-actions"><button class="btn btn-primary" onclick="TouristPackages.book('${p.id}')"><i class="ph ph-ticket"></i> Book Now</button><a class="btn btn-outline" href="${p.maps}" target="_blank" rel="noopener"><i class="ph ph-map-trifold"></i> Google Maps</a></div></div></div>`;
  modal.classList.add('active'); document.body.style.overflow='hidden';
 },
 closeDetails(){document.getElementById('tourist-package-modal')?.classList.remove('active');document.body.style.overflow='auto'},
 book(id){
  const p=TOURIST_PACKAGES.find(x=>x.id===id); if(!p)return;
  const campsite={id:`package-${p.id}`,title:p.name,location:`${p.location}, ${p.state}`,pricePerNight:p.price,amenities:p.activities,difficulty:'Moderate',altitude:'—',bestSeason:p.bestTime,availableSlots:20,tagline:p.description,coordinates:'',rating:5,reviewsCount:0,contractor:{id:'package-operator',name:'WildVenture Tourist Packages',leadGuide:'WildVenture Guide Team',phone:'+91 00000 00000',badge:'Verified Package',verified:true},image:p.image,itinerary:[{day:'Day 1',title:'Arrival & Adventure',desc:`Experience ${p.activities[0]}.`},{day:'Day 2',title:'Explore & Depart',desc:`Enjoy ${p.activities.slice(1).join(', ')} and complete your getaway.`}]};
  TouristPackages.closeDetails();
  if(window.App && typeof App.openCampsiteModal==='function'){
   const campsites=DB.get('campsites')||[];
   const withoutOld=campsites.filter(c=>c.id!==campsite.id);
   withoutOld.unshift(campsite);
   DB.set('campsites',withoutOld);
   App.openCampsiteModal(campsite.id);
  } else showToast('Booking system is unavailable. Please use the existing Campsites & Treks booking flow.','warning');
 }
};

document.addEventListener('DOMContentLoaded',()=>{const input=document.getElementById('package-search');input?.addEventListener('input',()=>TouristPackages.render());TouristPackages.render();});
window.TOURIST_PACKAGES=TOURIST_PACKAGES;window.TouristPackages=TouristPackages;
