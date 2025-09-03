

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
    
    y:-50,
    duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".up",
          start: "top 80%", scrub:true,
          toggleActions: "play none none reverse"
        }
  })

  
}
function text(){
  gsap.registerPlugin(ScrollTrigger);
const splitTypes = document.querySelectorAll(".reveal");
splitTypes.forEach((char,i)=>{

  const text = new SplitType(char,{types:"chars"});
  console.log(text);
  gsap.from(text.chars,{
    scrollTrigger:{
      trigger:char,
      start:"top 80%",
      end:"top 20%",
      scrub:true,

    },
    stagger:0.1,
    opacity:0.3,

  })
})

gsap.registerPlugin(SplitText) 
let split = SplitText.create(".split", {
  type: "words, lines", 
  mask: "lines",
  linesClass: "line++", 

});
  
function showText(){

}

gsap.from(split.lines, {
  duration: 1.2, 
  y: 100,
  
      // animate from 100px below
  opacity: 0,   // fade in from opacity: 0 and visibility: hidden
  stagger: 0.05,
    // 0.05 seconds between each
});
let split_others = SplitText.create(".split-others", {
  type: "words, lines", 
  mask: "lines",
  linesClass: "line++", 

});
gsap.from(split_others.lines, {
  duration: 1,
  y: 100,

  opacity: 0,
  stagger: 0.08,
  scrollTrigger: {
    trigger: ".split-others",
    start: "top 80%",
    toggleActions: "play reverse play reverse",
    // for debugging
  }
});

}



function image(){
  gsap.utils.toArray(".a-img").forEach(img => {
    gsap.fromTo(img, 
      { scale: 0.2 }, 
      { 
        scale: 1, 
        duration: 1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: img,
          start: "top 80%",   // when img enters viewport
          end: "top 50%",     // when img is further in
       // ties animation to scroll
          // markers: true    // uncomment for debug
        }
      }
    );
  });
}


function lenis(){
  const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
}

lenis();
menu();
about();
text();
image();
