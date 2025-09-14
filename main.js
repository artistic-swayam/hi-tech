

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
    "url('f13.JPG')"
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
};

Object.keys(carousels).forEach(id => {
  const div = document.getElementById(id);
  let i = 0;

  setInterval(() => {
    div.style.backgroundImage = carousels[id][i];
    i = (i + 1) % carousels[id].length;
  }, 3000); // every 3 sec
});
