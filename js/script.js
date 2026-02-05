import { projects } from "./projects.js";

document.addEventListener('DOMContentLoaded', function() {
  console.log('██████╗ ███╗   ███╗██╗   ██╗    ███████╗██████╗  ██████╗ ███╗   ██╗████████╗██████╗  █████╗  ██████╗ ███████╗\n' +
    '██╔══██╗████╗ ████║██║   ██║    ██╔════╝██╔══██╗██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗██╔════╝ ██╔════╝\n' +
    '██████╔╝██╔████╔██║██║   ██║    █████╗  ██████╔╝██║   ██║██╔██╗ ██║   ██║   ██████╔╝███████║██║  ███╗█████╗  \n' +
    '██╔══██╗██║╚██╔╝██║╚██╗ ██╔╝    ██╔══╝  ██╔══██╗██║   ██║██║╚██╗██║   ██║   ██╔═══╝ ██╔══██║██║   ██║██╔══╝  \n' +
    '██║  ██║██║ ╚═╝ ██║ ╚████╔╝     ██║     ██║  ██║╚██████╔╝██║ ╚████║   ██║   ██║     ██║  ██║╚██████╔╝███████╗\n' +
    '╚═╝  ╚═╝╚═╝     ╚═╝  ╚═══╝      ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝\n');

  // Synchronization mechanism for project loading
  window.projectsLoadedPromise = {};
  window.projectsLoadedPromise.resolve = null;
  window.projectsLoadedPromise.promise = new Promise(resolve => {
    window.projectsLoadedPromise.resolve = resolve;
  });
  window.projectsLoaded = false;

  // smooth scroll for navigation
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // generate project
  async function loadProjects() {
    return new Promise((resolve) => {
      projects.sort((a, b) => a.pos > b.pos ? 1 : -1);
      const projectDiv = document.getElementById("project");

      if (!projectDiv) {
        console.log('Project container not found');
        resolve();
        return;
      }

      const totalProjects = projects.length;
      console.log(`Starting to load ${totalProjects} projects...`);

      projects.forEach((project, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.className = "img";
        const slashed = document.createElement("div");
        slashed.className = "slashed";
        const txtContainer = document.createElement("div");
        txtContainer.className = "txt";
        const title = document.createElement("h3");
        title.innerHTML = project.name;
        const text = document.createElement("p");
        text.innerText = project.desc;
        const link = document.createElement("a");
        link.innerText = project.actionText;
        link.href = project.actionLink;
        link.target = "_blank";
        link.rel = "noreferrer";
        if (project.img) {
          const svgElement = new DOMParser().parseFromString(project.img, 'image/svg+xml').documentElement;
          slashed.appendChild(svgElement);
        }
        imgContainer.appendChild(slashed);
        txtContainer.appendChild(title);
        txtContainer.appendChild(text);
        txtContainer.appendChild(link);
        const p = document.createElement("div");
        p.className = "project";
        p.appendChild(imgContainer);
        p.appendChild(txtContainer);
        projectDiv.appendChild(p);

        const count = document.getElementsByClassName('count');
        if (count && count.length > 0) {
          const children = count[0].children;
          if (children && children.length > 0) {
            const text = `${index + 1}/${totalProjects}`;
            setTimeout(() => { // add some timeout to get a nice ux
              const t = text;
              children[0].innerHTML = t;
            }, 150 * index)
          }
        }

        // resolve on the last project
        if (index === totalProjects - 1) {
          console.log(`All ${totalProjects} projects loaded successfully!`);
          window.projectsLoaded = true;
          window.projectsLoadedPromise.resolve();
          resolve();
        }
      });
    });
  }

  /* ******** */
  /* anime js */
  /* ******** */
  const { svg, stagger, createTimeline, onScroll, animate, splitText, utils } = anime;

  const loader = document.getElementById("loader");
  const body = document.getElementsByTagName('body')[0];
  const header = document.getElementById("header"); // h1, p
  const navLogo = document.getElementById("nav-logo");
  const navLink = document.getElementById("nav-link"); // a*

  const navLogoChars = splitText(navLogo, { chars: { wrap: 'clip' } }).chars;
  console.log(navLogo)

  const mainTimeline = createTimeline();

  function animateProjectOnScroll() {
    const projectContainers = document.getElementsByClassName('project');
    if (projectContainers && projectContainers.length > 0) {
      [...projectContainers].forEach((container) => {
        const txt = container.children[1]; //.children; // h3, p, a
        const img = container.children[0]; //.children; // slashed > svg.svanim
        const svanim = img.children[0].children[0]; // svg.svanim

        const timeline = createTimeline();

        timeline
          .add(img, {
            opacity: 1,
            duration: 320,
          })
          .add(img.children[0], {
            opacity: 1,
            duration: 320,
          }, '-=150')
          .label('slashed-end')
          .add(svanim, {
            opacity: 1,
            duration: 320,
          }, 'slashed-end')
          .add(svg.createDrawable(svanim), {
            draw: ['0 0', '0 1'],
            ease: 'inOutQuad',
            duration: 1350,
            autoplay: true
          }, 'slashed-end')
          .add(txt, {
            opacity: 1,
            duration: 320,
          }, 'slashed-end')
          .add(txt.children, {
            opacity: 1,
            duration: 800, // edit in fc of splitText?
          }, 'slashed-end')
          .add(txt.children, {
            // text animation w/ splitText()?
          })
      })
    }
  }

  // maybe not the most cleaner but the three svg allow for
  // parallel animation and a nicer filling at the end
  mainTimeline.label('start')
    .call(() => window.scrollTo(0, 0)) // reset scroll
    .call(() => { // start loading projects in parallel with logo animation
      loadProjects().catch(err => {
        console.error('Error loading projects:', err);
        // still resolve the promise to prevent timeline from hanging
        window.projectsLoaded = true;
        window.projectsLoadedPromise.resolve();
      });
    })
    .add(svg.createDrawable('.logo'), {
      draw: ['0 0', '0 .25', '.25 .5', '.5 .75', '.75 1', '1 1'],
      ease: 'linear',
      duration: 1000,
      delay: stagger(100),
    }, 'start')
    .add(svg.createDrawable('.logo-shadow'), {
      draw: ['0 0', '0 1'],
      ease: 'inOutQuad',
      duration: 900,
      delay: stagger(100),
    }, '+=200')
    .add('.logo-shadow', {display: 'none', duration: 0})
    .add('.logo', {display: 'none', duration: 0})
    .add('.logo-end', {display: 'initial', duration: 0})
    .add('.logo-end', {fill: '#e50000', duration: 600})
    .call(() => window.projectsLoadedPromise.promise) // wait for projects to be fully loaded before fading out
    .add(loader, {opacity: [1, 0], duration: 800, delay: 400}) // fade the loader (only runs after both logo animation AND project loading is complete)
    .call(() => {
      loader.style.display = 'none';
      body.style.overflow = 'initial';
    })
    .add(['.border', 'header', '.content'], { opacity: ['0', '1'], duration: 620 })
    // logo
    .add(navLogoChars, {
      y: ['100%', '0%'],
      duration: 1400,
      ease: 'inOutQuint',
      delay: stagger(50),
      loop: true,
    })
    // link link link
    // hero title
    // hero text
    // call on scroll footer timeline
    .call(() => animateProjectOnScroll(), "<-=400")

    // draw loop svg on mouse over
  ;
});

window.addEventListener('load', function() {
  const loadTime = performance.now();
  console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
  if (loadTime > 2000) {
    console.log('🐌 Results may vary, but this load time definitely needs optimization!');
  } else if (loadTime < 500) {
    console.log('🚀 Lightning fast! Results are consistently good.');
  }
});

window.addEventListener('error', function(e) {
  console.error('🐛 A wild bug appeared! But don\'t worry, we assume this is an intentional feature.');
  console.error('Error details:', e.message);
});

