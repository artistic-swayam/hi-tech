

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

lenis();
menu();
about();
text();
image();

gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".cards .card");

cards.forEach((card, i) => {
  gsap.to(card, {
    y: -i * 180, // overlap amount (adjust 80px to taste)
    zIndex: i + 1, // make each next card on top
    scrollTrigger: {
      trigger: ".card",
      start: "top center",
      end: "+=600",
      scrub: true,
    }
  });
});
