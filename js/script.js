import { projects } from "./projects.js";

document.addEventListener('DOMContentLoaded', function() {
  console.log('██████╗ ███╗   ███╗██╗   ██╗    ███████╗██████╗  ██████╗ ███╗   ██╗████████╗██████╗  █████╗  ██████╗ ███████╗\n' +
    '██╔══██╗████╗ ████║██║   ██║    ██╔════╝██╔══██╗██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗██╔════╝ ██╔════╝\n' +
    '██████╔╝██╔████╔██║██║   ██║    █████╗  ██████╔╝██║   ██║██╔██╗ ██║   ██║   ██████╔╝███████║██║  ███╗█████╗  \n' +
    '██╔══██╗██║╚██╔╝██║╚██╗ ██╔╝    ██╔══╝  ██╔══██╗██║   ██║██║╚██╗██║   ██║   ██╔═══╝ ██╔══██║██║   ██║██╔══╝  \n' +
    '██║  ██║██║ ╚═╝ ██║ ╚████╔╝     ██║     ██║  ██║╚██████╔╝██║ ╚████║   ██║   ██║     ██║  ██║╚██████╔╝███████╗\n' +
    '╚═╝  ╚═╝╚═╝     ╚═╝  ╚═══╝      ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝\n');
  /**
    --pri-color: #000000; text
    --sec-color: #E1DFDD; bck
    --ter-color: #787878; sec text
    --grid-color: rgba(0, 0, 0, 0.1); grid
    **/
  const colors = [
    ['#F8955B', '#58356E', '#8B634B', 'rgba(248,149,91,0.1)', '#F8955B'],
    ['#F4BF3C', '#286360', '#b69e62', 'rgba(244,191,60,0.1)', '#F4BF3C'],
    ['#105099', '#FFE9F3', '#6799D2', 'rgba(16,80,153,0.1)', '#105099'],
    ['#fdf0e7', '#0b0b0b', '#fdf0e780', '#fdf0e74d', '#e50000'], /* initial value */
  ];

  const vars = ['--base-color', '--back-color', '--base-color-dim', '--base-color-border', '--red-color'];

  let init = 0;

  const trigger = document.getElementById('nav-logo');
  const body = document.body;

  trigger.addEventListener('click', () => {
    vars.forEach((vari, i) => {
      body.style.setProperty(vari, colors[init][i]);
    })
    init = init === colors.length-1 ? 0 : init+1;
  })

  // Synchronization mechanism for project loading
  window.projectsLoadedPromise = {};
  window.projectsLoadedPromise.resolve = null;
  window.projectsLoadedPromise.promise = new Promise(resolve => {
    window.projectsLoadedPromise.resolve = resolve;
  });
  window.projectsLoaded = false;

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
        title.style.opacity = '0';
        title.innerHTML = project.name;
        const text = document.createElement("p");
        text.innerText = project.desc;
        text.style.opacity = '0';
        const link = document.createElement("a");
        link.innerText = project.actionText;
        link.href = project.actionLink;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.style.opacity = '0';
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
  const { animate, svg, stagger, createTimeline, splitText, utils } = anime;

  const loader = document.getElementById("loader");

  const header = document.getElementById("header"); // h1, p
  const navLogo = document.getElementById("nav-logo");
  const navLink = document.getElementById("nav-link"); // a*

  const headerTitleWords = splitText(header.children[0], { words: { wrap: 'clip' } });
  const headerTextWords = splitText(header.children[1], { words: { wrap: 'clip' } });
  const navLogoChars = splitText(navLogo, { chars: { wrap: 'clip' } });
  const navLinkWords = splitText(navLink, { words: { wrap: 'clip' } });

  utils.set(
    [
      navLogoChars.chars,
      navLinkWords.words,
      headerTitleWords.words,
      headerTextWords.words,
    ],
    { y: '100%' },
  );

  utils.set(body, { '--a-opacity': '0', '--a-width': '0' })

  const mainTimeline = createTimeline();

  function animateProjectOnScroll() {
    const pause = {};
    const projectContainers = document.getElementsByClassName('project');
    if (projectContainers && projectContainers.length > 0) {
      [...projectContainers].forEach((container, index) => {
        pause[`${index}`] = 0;
        const txt = container.children[1]; //.children >> h3, p, a
        const img = container.children[0]; //.children >> slashed > svg.svanim
        const svanim = img.children[0].children[0]; // svg.svanim

        // project h3
        const projectTitle = splitText(txt.children[0], {
          words: { wrap: 'clip' },
        });
        const projectText = splitText(txt.children[1], {
          words: { wrap: 'clip' },
        });
        const projectLink = splitText(txt.children[2], {
          words: { wrap: 'clip' },
        });
        utils.set([projectTitle.words, projectText.words, projectLink.words], {
          y: '100%',
        });

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
          .add([projectTitle.$target, projectText.$target, projectLink.$target], {
            opacity: 1,
            duration: 320,
          }, 'slashed-end')
          .add([projectTitle.words, projectText.words, projectLink.words], {
            y: ['100%', '0%'],
            duration: 600,
            ease: 'out(3)',
            delay: stagger(80),
          }, 'slashed-end');

        let animateLink = null;
        txt.children[2].addEventListener('mouseenter', () => {
          pause[`${index}`] = 1;
          animateLink = animate(svg.createDrawable(svanim), {
            draw: ['0 0', '0 1'],
            ease: 'inOutQuad',
            duration: 1200,
            delay: stagger(300),
            loop: false,
            // onLoop: () => {
            //   if (pause[`${index}`] === 0) {
            //     animateLink.pause();
            //     animate(svg.createDrawable(svanim), {
            //       draw: ['0 0', '0 1'],
            //       duration: 2900 / 2,
            //       loop: false
            //     })
            //   }
            // }
          });
        });
        // txt.children[2].addEventListener('mouseleave', () => {
        //   pause[`${index}`] = 0;
        // });

      }); // end for
    }
  }

  // maybe not the most cleaner but the three svg allow for
  // parallel animation and a nicer filling at the end
  mainTimeline
    .call(() => {
      document.styleSheets[0].insertRule("a::after { content: ''; position: absolute; bottom: -0.2em; left: 0; width: var(--a-width); height: 0.1em; background: var(--base-color-dim); opacity: var(--a-opacity); transition: width 120ms;}", 0);
    })
    .label('start')
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
    .call(async () => await window.projectsLoadedPromise.promise) // wait for projects to be fully loaded before fading out
    .add(loader, {opacity: [1, 0], duration: 800, delay: 400}) // fade the loader (only runs after both logo animation AND project loading is complete)
    .call(() => {
      loader.style.display = 'none';
      body.style.overflow = 'initial';
    })
    .add(['.border', 'header', '.content'], { opacity: ['0', '1'], duration: 620 })
    .label('content')
    .add(navLogo, {
      opacity: 1,
      duration: 320
    }, 'content')
    .add(navLogoChars.chars, {
      y: ['100%', '0%'],
      duration: 1400,
      ease: 'out(3)',
      delay: stagger(50),
    }, 'content')
    .add(navLink, {
      opacity: 1,
      duration: 320
    }, 'content')
    .add(navLinkWords.words, {
      y: ['100%', '0%'],
      duration: 1400,
      ease: 'out(3)',
      delay: stagger(50),
    }, 'content')
    .add(headerTitleWords.$target, {
      opacity: 1,
      duration: 320
    }, 'content')
    .add(headerTitleWords.words, {
      y: ['100%', '0%'],
      duration: 700,
      ease: 'out(3)',
      delay: stagger(30),
    }, 'content')
    .add(headerTextWords.$target, {
      opacity: 1,
      duration: 320
    }, 'content')
    .add(headerTextWords.words, {
      y: ['100%', '0%'],
      duration: 320,
      ease: 'inOutQuad',
      delay: stagger(15),
    }, 'content')
    .call(() => animateProjectOnScroll(), 'content')
    .add(body, {
      '--a-opacity': '1',
      '--a-width': '100%',
    }, '+=230')
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

