const n=document.querySelector('.nav');
if(n){const f=()=>n.classList.toggle('scrolled',scrollY>20);addEventListener('scroll',f,{passive:true});f()}
