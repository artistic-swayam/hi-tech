function menu(){
  const openBtn = document.querySelector(".open");
const closeBtn = document.querySelector(".close");
const menu = document.querySelector(".menu");

openBtn.addEventListener("click",()=>{
    gsap.to(".menu",{
        y:0
    })
})

menu.addEventListener("click",()=>{
  gsap.to(menu, { 
    x: "-100%", 

    duration: 0.6, 
    ease: "power3.in",
    onComplete: () => { 
      menu.style.display = "none"; 
      closeBtn.style.display = "none"; // hide close button only after animation
      openBtn.style.display = "block"; 
    }
  });
})
}

menu();
