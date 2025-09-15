

function menu() {
  document.addEventListener("DOMContentLoaded", () => {
  const navs = document.querySelectorAll(".nav-wrap");
  const nav = navs[navs.length - 1]; // last nav only

  // don’t set display, just toggle the class
  window.addEventListener("scroll", () => {
    if (window.scrollY >= window.innerHeight) {
      nav.classList.add("visible");
    } else {
      nav.classList.remove("visible");
    }
  });
});


  const openBtn = document.querySelector(".open");
  const closeBtn = document.querySelector(".close");
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".old-nav");

  openBtn.addEventListener("click", () => {
    menu.style.display = "block";
    nav.style.display = "none";
   // show it first
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
 nav.style.display = "block";
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



function about() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".up", {

    y: -50,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".up",
      start: "top 80%", scrub: true,
      toggleActions: "play none none reverse"
    }
  })


}
function text() {
  gsap.registerPlugin(ScrollTrigger);
  const splitTypes = document.querySelectorAll(".reveal");
  splitTypes.forEach((char, i) => {

    const text = new SplitType(char, { types: "chars" });
    console.log(text);
    gsap.from(text.chars, {
      scrollTrigger: {
        trigger: char,
        start: "top 80%",
        end: "top 20%",
        scrub: true,

      },
      stagger: 0.1,
      opacity: 0.3,

    })
  })

  gsap.registerPlugin(SplitText)
  let split = SplitText.create(".split", {
  type: "words, lines",
  mask: "lines",
  linesClass: "line++"
});

gsap.from(split.lines, {
  duration: 1.2,
  y: 100,
  opacity: 0,
  stagger: 0.05
});

// All the other split texts (scroll based)
document.querySelectorAll(".split-others").forEach(el => {
  let split_others = SplitText.create(el, {
    type: "words, lines",
    mask: "lines",
    linesClass: "line++"
  });

  gsap.from(split_others.lines, {
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.08,
    scrollTrigger: {
      trigger: el, // use the individual element
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    }
  });
});


}



function image() {
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


function lenis() {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

function show(){
const btn = document.querySelector(".show-toggle");
const works = document.querySelectorAll(".w");
const workSection = document.querySelector(".work");

btn.addEventListener("click", () => {
  const isHidden = works[0].classList.contains("no-w");

  works.forEach(w => {
    w.classList.toggle("no-w", !isHidden);
  });

  // toggle the whole .work height
  workSection.classList.toggle("expanded", isHidden);

  // update button text
  btn.textContent = isHidden ? "Show Less" : "Show More";
});

}

lenis();
menu();
about();
text();
image();
show();


gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".card");

cards.forEach((card,i)=>{
  gsap.to(card,{
    scale: 0.8+0.2*(i/(cards.length-1)),
    ease:"none",

    scrollTrigger:{
      trigger:card,
      start:"-50%",
      end:"bottom center",
      endTrigger:".cards",
      scrub:true,
      pin:card,
      pinSpacing:false,
      invalidateOnRefresh:true,

    }
  })

})


const carousels = {
  w1: [
    "url('f1.jpg')",
    "url('f2.jpg')",

  ],
  w2: [
    "url('f3.jpg')",
    "url('f38.JPG')"
  ],
  w3: [
    "url('f4.JPG')",
    "url('f45.jpg')",
    "url('f46.jpg')",
    // "url('f38.JPG')"
  ],
  w4: [
    "url('f5.jpg')",
    "url('f13.jpg')"
  ],
  w5: [
    "url('f6.jpeg')",
    "url('f7.jpeg')",
    "url('f39.JPG')",
    "url('f54.jpeg')"
  ],
  w6: [
    "url('f40.JPG)",

  ],
  w7: [
    "url('f12.jpg')",
    "url('f35.JPG')",
    "url('f36.JPG')"
    //"url('f38.JPG')"
  ],
  // w8: [
  //   "url('f13.jpg')",
  //   //"url('f38.JPG')"
  // ],
  w9: [
    "url('f14.jpeg')",
    "url('f15.jpeg')",
    "url('f47.jpg')"
  ],
  w10: [
    "url('f16.jpeg')",
    "url('f17.jpeg')"
  ],
  w11: [
    "url('f18.jpg')",
    "url('f19.jpg')"
  ],
  w12: [
    "url('f20.jpg')",
    "url('f21.jpg')",
    "url('f22.jpg')",
    "url('f23.jpg')",
    "url('f24.jpg')",
    "url('f25.jpg')",
  ],
  w13: [
    "url('f26.jpg')",
    "url('f31.JPG')"
  ],
  w14: [
    "url('f29.JPG')",
    "url('f30.JPG')",
    "url('f42.jpg')",
    "url('f43.jpg')",
  ],
  w15: [
    "url('f32.JPG')",
    //"url('f38.JPG')"
  ],
   w16: [
    "url('f33.JPG')",
    "url('f44.jpg')"
  ],
   w17: [
    "url('f34.JPG')",
    //"url('f38.JPG')"
  ],
   w18: [
    //"url('f3.jpg')",
    "url('f48.jpg')"
  ],
  //  w19: [
    
  // ],
   w20: [
    "url('f27.jpg')",
    "url('f28.jpg')",
    "url('f41.jpg')",
  ],
  //  w21: [
    
    
  // ],
   w22: [
    //"url('f3.jpg')",
    "url('f49.jpg')"
  ],
   w23: [
    "url('f50.jpeg')",
    //"url('f38.JPG')"
  ],
   w24: [
    "url('f55.jpeg')",

  ],
   w25: [
    "url('f57.jpg')",
    //"url('f38.JPG')"
  ],
  //  w26: [
  //   "url('f3.jpg')",
  //   "url('f38.JPG')"
  // ],
  //  w27: [
  //   "url('f3.jpg')",
  //   "url('f38.JPG')"
  // ],
  //  w28: [
  //   "url('f3.jpg')",
  //   "url('f38.JPG')"
  // ],
  //  w29: [
  //   "url('f3.jpg')",
  //   "url('f38.JPG')"
  // ],
  wb1: [
    "url('b1.JPG')",
    //"url('f38.JPG')"
  ],
  wbi1: [
    "url('bi6.jpg')",
    "url('bi2.jpg')",
    "url('bi5.jpg')",
    //"url('f38.JPG')"
  ],
  wbi2: [
    "url('bi4.jpg')",
    //"url('f38.JPG')"
  ],
  wc1: [
    "url('c1.jpg')",
    //"url('f2.jpg')",

  ],
  wc2: [
    "url('c2.jpg')",
    "url('c6.jpg')",
    "url('c19.jpg')"
  ],
  wc3: [
    "url('c3.jpg')",
    "url('c16.jpg')",
    //"url('f46.jpg')",
    // "url('f38.JPG')"
  ],
  wc4: [
    "url('c4.jpg')",
    //"url('f13.jpg')"
  ],
  wc5: [
    "url('c5.jpg')",
    //"url('f7.jpeg')",
    //"url('f39.JPG')",
    //"url('f54.jpeg')"
  ],
  wc6: [
    "url('c7.jpg)",
    "url('c28.JPG)",    
  ],
  wc7: [
    "url('c8.jpg')",
    //"url('f35.JPG')",
    //"url('f36.JPG')"
    //"url('f38.JPG')"
  ],
   wc8: [
     "url('c9.jpg')",
     
  ],
  wc9: [
    "url('c10.jpg')",
   "url('c20.jpg')"
    //"url('f47.jpg')"
  ],
  wc10: [
    "url('c11.jpg')",
    "url('c44.jpeg')",
    
  ],
   wc11: [
    "url('c12.jpg')",
    "url('c13.jpg')",
    "url('c37.jpeg')",
  ],
   wc12: [
    "url('c14.jpg')",
    "url('c42.jpeg')",
    "url('c43.jpeg')",
  ],
   wc13: [
    "url('c15.jpg')",
    //"url('f17.jpeg')"
  ],
   wc14: [
    "url('c35.jpg')",
    "url('c36.jpg')",
    "url('c17.jpg')",
    "url('c27.JPG')",
    "url('c32.jpg')",
    "url('c34.jpg')",
  ],
   wc15: [
    "url('c18.jpg')",
    //"url('f17.jpeg')"
  ],
  //  wc16: [
  //   ,
  //   //"url('f17.jpeg')"
  // ],
   wc17: [
    "url('c21.jpg')",
    //"url('f17.jpeg')"
  ],
   wc18: [
    "url('c22.jpg')",
    //"url('f17.jpeg')"
  ],
   wc19: [
    "url('c23.jpg')",
    //"url('f17.jpeg')"
  ],
   wc20: [
    "url('c24.jpg')",
    "url('c25.jpg')"
  ],
   wc21: [
    "url('c31.jpg')",
    //"url('f17.jpeg')"
  ],
   wc22: [
    "url('c33.jpg')",
    //"url('f17.jpeg')"
  ],
   wc23: [
    "url('c39.jpeg')",
    "url('c40.jpeg')",
    "url('c41.jpeg')",
  ],
   wc24: [
    "url('c45.jpg')",
    "url('c46.jpg')"
  ],
  fl1: [
    "url('fl1.jpg')",
    "url('fl8.jpg')"
  ],
  fl2: [
    "url('fl2.jpg')",
    "url('fl9.jpg')"
  ],
  fl3: [
    "url('fl3.jpg')",
    "url('fl6.jpg')",
    "url('fl11.jpg')"
  ],
  fl4: [
    "url('fl7.jpg')",
    //"url('fl5.jpg')"
  ],
  fl5: [
    "url('fl10.jpg')",
    
  ],
  p1: [
    "url('p1.jpg')",
    "url('p26.jpg')",
    "url('p36.jpg')",
    "url('p15.jpg')"
  ],
  p2: [
    "url('p2.jpg')",
    "url('p35.jpg')"
  ],
  p3: [
    "url('p3.jpg')",
    //"url('fl9.jpg')"
  ],
  p4: [
    "url('p4.jpg')",
    "url('p22.jpg')",
    "url('p28.jpg')",
    "url('p12.jpg')"
  ],
  p5: [
    "url('p5.jpg')",
    "url('p24.jpg')",
    "url('p25.jpg')",
    "url('pl0.jpg')"
  ],
  p6: [
    "url('p6.jpg')",
    //"url('fl9.jpg')"
  ],
  p7: [
    "url('p7.jpg')",
    "url('p31.jpg')",
    "url('p33.jpg')",
    "url('p30.jpg')",
    "url('p49.jpg')",
    "url('p51.jpg')",
  ],
  p8: [
    "url('p8.jpg')",
    "url('p37.jpg')"
  ],
  p9: [
    "url('p9.jpg')",
    //"url('fl9.jpg')"
  ],
  p10: [
    "url('p11.jpg')",
    "url('p59.jpg')"
  ],
  p11: [
    "url('p13.jpg')",
    //"url('fl9.jpg')"
  ],
  p12: [
    "url('p14.jpg')",
    //8"url('fl9.jpg')"
  ],
  p13: [
    "url('p16.jpg')",
  
  ],
  p14: [
    "url('p17.jpg')",
    
  ],
  p15: [
    "url('p18.jpg')",
    
  ],
  p16: [
    "url('p19.jpg')",
    
  ],
  p17: [
    "url('p20.jpg')",
    //"url('fl9.jpg')"
  ],
  p18: [
    "url('p21.jpg')",
    //"url('fl9.jpg')"
  ],
  p19: [
    "url('p23.jpg')",
    "url('p32.jpg')",
    "url('p46.jpg')"
  ],
  p20: [
    "url('p27.jpg')",
    "url('p52.jpg')"
  ],
  p21: [
    "url('p29.jpg')",
    "url('p42.jpg')"
  ],
  p22: [
    "url('p38.jpg')",
    //"url('fl9.jpg')"
  ],
  p23: [
    "url('p39.jpg')",
    "url('p62.jpg')"
  ],
  p24: [
    "url('p43.jpg')",
    "url('p44.jpg')"
  ],
  // p25: [
  //   "url('p38.jpg')",
  //   //"url('fl9.jpg')"
  // ],
  // p26: [
  //   "url('p38.jpg')",
  //   //"url('fl9.jpg')"
  // ],
  // p27: [
  //   "url('p38.jpg')",
  //   //"url('fl9.jpg')"
  // ],
  // p28: [
  //   "url('p38.jpg')",
  //   //"url('fl9.jpg')"
  // ],
  // p29: [
  //   "url('p38.jpg')",
  //   //"url('fl9.jpg')"
  // ],
  // p30: [
  //   "url('p38.jpg')",
  //   //"url('fl9.jpg')"
  // ],
  // p31: [
  //   "url('p38.jpg')",
  //   //"url('fl9.jpg')"
  // ],
  // p32: [
  //   "url('p38.jpg')",
  //   //"url('fl9.jpg')"
  // ],
  // p33: [
  //   "url('p38.jpg')",
  //   //"url('fl9.jpg')"
  // ],
  // p34: [
  //   "url('p38.jpg')",
  //   //"url('fl9.jpg')"
  // ],
  // p35: [
  //   "url('p38.jpg')",
  //   //"url('fl9.jpg')"
  // ],
  // p36: [
  //   "url('p38.jpg')",
  //   //"url('fl9.jpg')"
  // ],
  // p37: [
  //   "url('p38.jpg')",
  //   //"url('fl9.jpg')"
  // ],
};

Object.keys(carousels).forEach(id => {
  const div = document.getElementById(id);
  let i = 0;

  setInterval(() => {
    div.style.backgroundImage = carousels[id][i];
    i = (i + 1) % carousels[id].length;
  }, 3000); // every 3 sec
});
