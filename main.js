

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

function show() {
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
function card(){
  document.addEventListener("DOMContentLoaded",()=>{
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis();
    lenis.on("scroll",ScrollTrigger.update);
    gsap.ticker.add((time)=>{
      lenis.raf(time*1000);
    });
    gsap.ticker.lagSmoothing(0);
  

  const stickySection = document.querySelector(".steps");
  const stickyHeight = window.innerHeight * 2;
  const cards = document.querySelectorAll(".p-card");
  const countContainer = document.querySelector(".count-container");
  const totalCards = cards.length;

  ScrollTrigger.create({
    trigger: stickySection,
    start:"top top",
    end:`+=${stickyHeight}px`,
    pin: true,
    pinSpacing: true,
    onUpdate: (self)=>{
      positionCards(self.progress);
    },
  });

  const getRadius = ()=>{
    return window.innerWidth < 900
    ? window.innerHeight * 7.5
    : window.innerHeight * 2.5;
  };
  const arcAngle = Math.PI * 0.4;
  const startAngle = Math.PI / 2 -arcAngle / 2;

  function positionCards(progress = 0){
    const radius = getRadius();
    const totalTravel = 1 + totalCards / 7.5;
    const adjustedProgress = (progress * totalTravel -1)*0.75;

    cards.forEach((card,i)=>{
      const normalizedProgress = (totalCards-1-i)/totalCards;
      const cardProgress = normalizedProgress+adjustedProgress;
      const angle = startAngle + arcAngle * cardProgress;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotation = (angle-Math.PI/2)*(180/Math.PI);

      gsap.set(card,{
        x:x,
        y:-y+radius,
        rotation: -rotation,
        transformOrigin:"center center",
      });
    });
  }

  positionCards(0);
  let currentCardIndex = 0;

  const options = {
    root: null,
    rootMargin: "0% 0%",
    threshold:0.5
  };

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        lastScrollY = window.scrollY;
        let cardIndex = Array.from(cards).indexOf(entry.target);
        currentCardIndex = cardIndex;

        const targetY = 150 - currentCardIndex*300;
        gsap.to(countContainer,{
          y:targetY,
          duration:0.3,
          ease: "power1.out",
          overwrite:true,
          
        });
      }
    });
  },options);
  cards.forEach((card)=>{
    observer.observe(card);
  });

  window.addEventListener("resize", ()=> positionCards(0));

});


}
lenis();
menu();
about();
text();
image();
show();
card();


gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".card");

cards.forEach((card, i) => {
  gsap.to(card, {
    scale: 0.8 + 0.2 * (i / (cards.length - 1)),
    ease: "none",

    scrollTrigger: {
      trigger: card,
      start: "-50%",
      end: "bottom center",
      endTrigger: ".cards",
      scrub: true,
      pin: card,
      pinSpacing: false,
      invalidateOnRefresh: true,

    }
  })

})


const carousels = {
  w1: [
    "f1.jpg",
    "f2.jpg",

  ],
  w2: [
    "f3.jpg",
    "f38.JPG"
  ],
  w3: [
    "f4.JPG",
    "f45.jpg",
    "f46.jpg",
    // "url('f38.JPG')"
  ],
  w4: [
    'f5.jpg',
    'f13.jpg'
  ],
  w5: [
    'f6.jpeg',
    'f7.jpeg',
    'f39.JPG',
    'f54.jpeg'
  ],
  w6: [
    'f40.JPG',

  ],
  w7: [
    'f12.jpg',
    'f35.JPG',
    'f36.JPG'
    //"url('f38.JPG')"
  ],
  // w8: [
  //   "url('f13.jpg')",
  //   //"url('f38.JPG')"
  // ],
  w9: [
    'f14.jpeg',
    'f15.jpeg',
    'f47.jpg'
  ],
  w10: [
    'f16.jpeg',
    'f17.jpeg'
  ],
  w11: [
    'f18.jpg',
    'f19.jpg'
  ],
  w12: [
    'f20.jpg',
    'f21.jpg',
    'f22.jpg',
    'f23.jpg',
    'f24.jpg',
    'f25.jpg',
  ],
  w13: [
    'f26.jpg',
    'f31.JPG'
  ],
  w14: [
    'f29.JPG',
    'f30.JPG',
    'f42.jpg',
    'f43.jpg',
  ],
  w15: [
    'f32.JPG',
    //"url('f38.JPG')"
  ],
  w16: [
    'f33.JPG',
    'f44.jpg'
  ],
  w17: [
    'f34.JPG',
    //"url('f38.JPG')"
  ],
  w18: [
    //"url('f3.jpg')",
    'f48.jpg'
  ],
  //  w19: [

  // ],
  w20: [
    'f27.jpg',
    'f28.jpg',
    'f41.jpg',
  ],
  //  w21: [


  // ],
  w22: [
    //"url('f3.jpg')",
    'f49.jpg'
  ],
  w23: [
    'f50.jpeg',
    //"url('f38.JPG')"
  ],
  w24: [
    'f55.jpeg',

  ],
  w25: [
    'f57.jpg',
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
    'b1.JPG',
    //"url('f38.JPG')"
  ],
  wbi1: [
    'bi6.jpg',
    'bi2.jpg',
    'bi5.jpg',
    //"url('f38.JPG')"
  ],
  wbi2: [
    'bi4.jpg',
    //"url('f38.JPG')"
  ],
  wc1: [
    'c1.jpg',
    //"url('f2.jpg')",

  ],
  wc2: [
    'c2.jpg',
    'c6.jpg',
    'c19.jpg'
  ],
  wc3: [
    'c3.jpg',
    'c16.jpg',
    //"url('f46.jpg')",
    // "url('f38.JPG')"
  ],
  wc4: [
    'c4.jpg',
    //"url('f13.jpg')"
  ],
  wc5: [
    'c5.jpg',
    //"url('f7.jpeg')",
    //"url('f39.JPG')",
    //"url('f54.jpeg')"
  ],
  wc6: [
    'c7.jpg',
    'c28.JPG',
  ],
  wc7: [
    'c8.jpg',
    //"url('f35.JPG')",
    //"url('f36.JPG')"
    //"url('f38.JPG')"
  ],
  wc8: [
    'c9.jpg',

  ],
  wc9: [
    'c10.jpg',
    'c20.jpg'
    //"url('f47.jpg')"
  ],
  wc10: [
    'c11.jpg',
    'c44.jpeg',

  ],
  wc11: [
    'c12.jpg',
    'c13.jpg',
    'c37.jpeg',
  ],
  wc12: [
    'c14.jpg',
    'c42.jpeg',
    'c43.jpeg',
  ],
  wc13: [
    'c15.jpg',
    //"url('f17.jpeg')"
  ],
  wc14: [
    'c35.jpg',
    'c36.jpg',
    'c17.jpg',
    'c27.JPG',
    'c32.jpg',
    'c34.jpg',
  ],
  wc15: [
    'c18.jpg',
    //"url('f17.jpeg')"
  ],
  //  wc16: [
  //   ,
  //   //"url('f17.jpeg')"
  // ],
  wc17: [
    'c21.jpg',
    //"url('f17.jpeg')"
  ],
  wc18: [
    'c22.jpg',
    //"url('f17.jpeg')"
  ],
  wc19: [
    'c23.jpg',
    //"url('f17.jpeg')"
  ],
  wc20: [
    'c24.jpg',
    'c25.jpg'
  ],
  wc21: [
    'c31.jpg',
    //"url('f17.jpeg')"
  ],
  wc22: [
    'c33.jpg',
    //"url('f17.jpeg')"
  ],
  wc23: [
   'c39.jpeg',
    'c40.jpeg',
    'c41.jpeg',
  ],
  wc24: [
    'c45.jpg',
    'c46.jpg'
  ],
  fl1: [
    'fl1.jpg',
    'fl8.JPG'
  ],
  fl2: [
    'fl2.jpg',
    'fl9.jpg'
  ],
  fl3: [
    'fl3.jpg',
    'fl6.JPG',
    //"url('fl11.jpg')"
  ],
  fl4: [
    'fl7.JPG',
    //"url('fl5.jpg')"
  ],
  fl5: [
    'fl10.jpg',

  ],
  p1: [
    'p1.jpg',
   'p26.jpg',
    'p36.jpeg',
    'p15.jpg'
  ],
  p2: [
    'p2.jpg',
    'p35.jpg'
  ],
  // p3: [

  //   //"url('fl9.jpg')"
  // ],
  p4: [
    'p3.jpg',
    'p4.jpg',
    'p22.jpg',
    'p28.jpg',
    'p12.jpg'
  ],
  p5: [
    'p5.jpg',
    'p24.jpg',
    'p25.jpg',
    'p10.jpg'
  ],
  p6: [
    'p6.jpg',
    //"url('fl9.jpg')"
  ],
  p7: [
    'p7.jpg',
    'p31.jpg',
    'p33.jpg',
    'p30.jpg',
    'p49.jpg',
    'p51.jpg',
  ],
  p8: [
    'p8.jpg',
    'p37.jpeg'
  ],
  p9: [
    'p9.jpg',
    //"url('fl9.jpg')"
  ],
  p10: [
    'p11.jpg',
    'p59.jpg'
  ],
  p11: [
    'p13.jpg',
    'p29.jpg',
    'p42.jpg'
    //"url('fl9.jpg')"
  ],
  p12: [
    'p14.jpg',
    //8"url('fl9.jpg')"
  ],
  p13: [
    'p16.jpg',

  ],
  p14: [
    'p17.jpg',

  ],
  p15: [
    'p18.jpg',

  ],
  p16: [
    'p19.jpg',

  ],
  p17: [
    'p20.jpg',
    //"url('fl9.jpg')"
  ],
  p18: [
    'p21.jpg',
    //"url('fl9.jpg')"
  ],
  p19: [
    'p23.jpg',
    'p32.jpeg',
    'p46.jpeg'
  ],
  p20: [
    'p27.jpg',
    //"url('p52.jpg')"
  ],
  // p21: [

  // ],
  p22: [
    'p38.jpeg',
    //"url('fl9.jpg')"
  ],
  p23: [
    'p39.jpg',
    'p62.JPG'
  ],
  p24: [
    'p43.jpeg',
    'p44.jpeg'
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
  s1: [
    's1.jpg',
  ],
  s2: [
    's2.jpeg',
  ],
  wu1: [
    // "url('w1.jpg')",
    // "url('w2.jpg')",
    'w3.JPG',
  ],
};

document.addEventListener('DOMContentLoaded', () => {
  const wrapUrl = s => (typeof s === 'string' && s.trim().startsWith('url(')) ? s : `url("${s}")`;

  Object.keys(carousels).forEach(id => {
    const container = document.getElementById(id);
    if (!container) {
      console.warn(`Carousel container not found: "${id}"`);
      return;
    }

    const imgs = carousels[id];
    if (!Array.isArray(imgs) || imgs.length === 0) {
      console.warn(`No images for carousel "${id}"`);
      return;
    }

    // make sure container can stack children
    container.style.position = container.style.position || 'relative';
    container.style.overflow = 'hidden';

    // create two crossfade layers
    const layerA = document.createElement('div');
    const layerB = document.createElement('div');
    [layerA, layerB].forEach(layer => {
      Object.assign(layer.style, {
        position: 'absolute',
        inset: '0',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'opacity 600ms ease',
        willChange: 'opacity',
        opacity: '0'
      });
      container.appendChild(layer);
    });

    // preload next images (optional but smooth)
    imgs.forEach(src => { const img = new Image(); img.src = src; });

    let i = 0;
    layerA.style.backgroundImage = wrapUrl(imgs[0]);
    layerA.style.opacity = '1';
    let visible = layerA;
    let hidden = layerB;

    setInterval(() => {
      const nextIndex = (i + 1) % imgs.length;
      hidden.style.backgroundImage = wrapUrl(imgs[nextIndex]);
      // fade-in hidden while fading out visible
      hidden.style.opacity = '1';
      visible.style.opacity = '0';

      // swap refs
      [visible, hidden] = [hidden, visible];
      i = nextIndex;
    }, 3000);
  });
});




  const categories = document.querySelectorAll(".w-categories span");
  const grids = document.querySelectorAll(".work-container > div");

  categories.forEach(btn => {
    btn.addEventListener("click", () => {
      let target = btn.getAttribute("data-target");

      // hide all
      grids.forEach(grid => grid.classList.add("none"));

      // show clicked one
      document.querySelector("." + target).classList.remove("none");

      categories.forEach(cat => cat.classList.remove("active"));

      // add active to clicked button
      btn.classList.add("active");
    });
  });
