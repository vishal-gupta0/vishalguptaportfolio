/* ==========================================
   VG EDITS PORTFOLIO
   SCRIPT - FINAL VERSION
========================================== */

/* ===========================
ELEMENTS
=========================== */

const loader = document.getElementById("loader");
const header = document.getElementById("header");
const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menu-btn");
const themeToggle = document.getElementById("theme-toggle");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#navbar a");

/* ===========================
LOADER
=========================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* ===========================
HAMBURGER
=========================== */

menuBtn.addEventListener("click", () => {

    menuBtn.classList.toggle("active");

    navbar.classList.toggle("active");

});

/* ===========================
CLOSE MENU
=========================== */

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        navbar.classList.remove("active");

        menuBtn.classList.remove("active");

    });

});

/* ==========================================
   THEME (DARK IS DEFAULT, LIGHT IS OPTIONAL)
========================================== */

function setTheme(mode){

    if(mode === "light"){

        document.body.classList.add("light");

        themeToggle.textContent = "🌙";

    }else{

        document.body.classList.remove("light");

        themeToggle.textContent = "☀️";

    }

    localStorage.setItem("theme", mode);

}

const savedTheme = localStorage.getItem("theme");

if(savedTheme){

    setTheme(savedTheme);

}else{

    const systemPrefersLight =
        window.matchMedia("(prefers-color-scheme: light)").matches;

    setTheme(systemPrefersLight ? "light" : "dark");

}

themeToggle.addEventListener("click", () => {

    const isLight = document.body.classList.contains("light");

    setTheme(isLight ? "dark" : "light");

});


/* ==========================================
   HEADER HIDE / SHOW
========================================== */

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const currentScroll = window.scrollY;

    if(currentScroll > lastScroll && currentScroll > 120){

        header.classList.add("hide");

    }else{

        header.classList.remove("hide");

    }

    lastScroll = currentScroll;

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

sections.forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});


/* ==========================================
   ACTIVE NAVIGATION
========================================== */

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-120;
        const height=section.offsetHeight;

        if(window.scrollY>=top &&
           window.scrollY<top+height){

            current=section.id;

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


/* ==========================================
   SCROLL TO TOP
========================================== */

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        scrollTopBtn.style.display="flex";

    }else{

        scrollTopBtn.style.display="none";

    }

});

scrollTopBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/* ==========================================
   SKILL BAR ANIMATION
========================================== */

const skillBars = document.querySelectorAll(".fill");

const skillObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const bar = entry.target;

            const width = bar.dataset.width;

            bar.style.width = width;

        }

    });

},{
    threshold:0.4
});

skillBars.forEach(bar=>{

    bar.style.width="0";

    skillObserver.observe(bar);

});


/* ==========================================
   HERO IMAGE PARALLAX
========================================== */

const heroImage = document.querySelector(".hero-right img");

window.addEventListener("mousemove",(e)=>{

    if(window.innerWidth <= 992) return;

    const x = (window.innerWidth/2 - e.clientX)/40;
    const y = (window.innerHeight/2 - e.clientY)/40;

    heroImage.style.transform =
    `translate(${x}px, ${y}px)`;

});


/* ==========================================
   FLOATING WHATSAPP ANIMATION
========================================== */

const whatsappBtn =
document.querySelector(".whatsapp-float");

if(whatsappBtn){

    setInterval(()=>{

        whatsappBtn.animate([

            {transform:"scale(1)"},
            {transform:"scale(1.12)"},
            {transform:"scale(1)"}

        ],{

            duration:1000

        });

    },3000);

}


/* ==========================================
   VIDEO MODAL
========================================== */

const videoModal = document.getElementById("videoModal");
const videoModalInner = document.querySelector(".video-modal-inner");
const videoModalPlayer = document.getElementById("videoModalPlayer");
const videoModalClose = document.getElementById("videoModalClose");
const portfolioCards = document.querySelectorAll(".portfolio-card");

function openVideoModal(videoId, isShort){

    videoModalInner.classList.toggle("is-short", isShort);

    const embedUrl =
        `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

    videoModalPlayer.innerHTML =
        `<iframe src="${embedUrl}" title="YouTube video player" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;

    videoModal.classList.add("active");

    document.body.style.overflow = "hidden";

}

function closeVideoModal(){

    videoModal.classList.remove("active");

    videoModalPlayer.innerHTML = "";

    document.body.style.overflow = "";

}

portfolioCards.forEach(card=>{

    card.addEventListener("click",()=>{

        const videoId = card.dataset.videoId;

        const isShort = card.classList.contains("short");

        if(videoId){

            openVideoModal(videoId, isShort);

        }

    });

});

if(videoModalClose){

    videoModalClose.addEventListener("click", closeVideoModal);

}

if(videoModal){

    document.querySelector(".video-modal-overlay")
        .addEventListener("click", closeVideoModal);

}

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        closeVideoModal();

    }

});


/* ==========================================
   CARD HOVER EFFECT
========================================== */

const cards = document.querySelectorAll(
".about-card,.service-card,.portfolio-card,.contact-card"
);

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});


/* ==========================================
   WINDOW RESIZE FIX
========================================== */

window.addEventListener("resize",()=>{

    if(window.innerWidth > 768){

        navbar.classList.remove("active");

        menuBtn.classList.remove("active");

    }

});


/* ==========================================
   PAGE FADE IN
========================================== */

document.body.style.opacity="0";

window.addEventListener("load",()=>{

    document.body.style.transition="opacity .6s ease";

    document.body.style.opacity="1";

});


/* ==========================================
   ESC CLOSE MENU
========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        navbar.classList.remove("active");

        menuBtn.classList.remove("active");

    }

});


/* ==========================================
   IMAGE FADE
========================================== */

document.querySelectorAll("img").forEach(img=>{

    img.addEventListener("load",()=>{

        img.style.opacity="1";

    });

});


/* ==========================================
   BUTTON CLICK PROTECTION
========================================== */

document.querySelectorAll(".primary,.secondary").forEach(btn=>{

    btn.addEventListener("click",()=>{

        btn.style.pointerEvents="none";

        setTimeout(()=>{

            btn.style.pointerEvents="auto";

        },800);

    });

});


/* ==========================================
   SAFE ERROR HANDLER
========================================== */

window.addEventListener("error",(e)=>{

    console.warn("JavaScript:",e.message);

});


/* ==========================================
   END
========================================== */

console.log("✅ VG Edits Portfolio Loaded");