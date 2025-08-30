

function menu() {
  const openBtn = document.querySelector(".open");
  const closeBtn = document.querySelector(".close");
  const menu = document.querySelector(".menu");

  openBtn.addEventListener("click", () => {
    menu.style.display = "block"; // show it first
    gsap.fromTo(menu,
      { y: "-100%" },
      { y: "0%", duration: .6, ease: "power3.out" }
    );
    gsap.from(closeBtn, {
      rotate: "180deg",
      duration: 1.2, ease: "power3.out"
    });
    gsap.from(openBtn, {
      rotate: "180deg",
      duration: 1.2, ease: "power3.out"
    });
  });

  // CLOSE
  closeBtn.addEventListener("click", () => {
    gsap.to(menu, {
      y: "-100%",

      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        menu.style.display = "none"; // hide after animation
      }
    });
    gsap.from(closeBtn, {
      rotate: "90deg",
      duration: 1.2, ease: "power3.out"
    })
  });


}
function about(){
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.from(".up",{
    opacity:0,
    duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".up",
          start: "top 80%", scrub:true,
          toggleActions: "play none none reverse"
        },onComplete:()=>{
          gsap.utils.toArray(".left").forEach((el) => {
    gsap.fromTo(el,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%", scrub:true,
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Animate .right
  gsap.utils.toArray(".right").forEach((el) => {
    gsap.fromTo(el,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%", scrub:true,
          toggleActions: "play none none reverse"
        }
      }
    );
  });
        }
  })

  
}

menu();
about();
