document.addEventListener('DOMContentLoaded', function() {
  console.log('██████╗ ███╗   ███╗██╗   ██╗    ███████╗██████╗  ██████╗ ███╗   ██╗████████╗██████╗  █████╗  ██████╗ ███████╗\n' +
    '██╔══██╗████╗ ████║██║   ██║    ██╔════╝██╔══██╗██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗██╔════╝ ██╔════╝\n' +
    '██████╔╝██╔████╔██║██║   ██║    █████╗  ██████╔╝██║   ██║██╔██╗ ██║   ██║   ██████╔╝███████║██║  ███╗█████╗  \n' +
    '██╔══██╗██║╚██╔╝██║╚██╗ ██╔╝    ██╔══╝  ██╔══██╗██║   ██║██║╚██╗██║   ██║   ██╔═══╝ ██╔══██║██║   ██║██╔══╝  \n' +
    '██║  ██║██║ ╚═╝ ██║ ╚████╔╝     ██║     ██║  ██║╚██████╔╝██║ ╚████║   ██║   ██║     ██║  ██║╚██████╔╝███████╗\n' +
    '╚═╝  ╚═╝╚═╝     ╚═╝  ╚═══╝      ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝\n');

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
  const projects = [
    {
      name: "Tape",
      desc: "*Just* a markdown note taking app.",
      img: "https://raw.githubusercontent.com/results-may-vary-org/tape/main/.github/assets/Screenshot_20251001_094844.png",
      actionText: "* Check / Install",
      actionLink: "https://github.com/results-may-vary-org/tape",
      pos: 3
    },
    {
      name: "Blurredwallpaper",
      desc: "A KDE wallpaper plugin that blur / dim your wallpaper when a window is active.",
      img: "https://raw.githubusercontent.com/bouteillerAlan/blurredwallpaper/main/assets/store-img.png",
      actionText: "* Check / Install",
      actionLink: "https://github.com/bouteillerAlan/blurredwallpaper",
      pos: 2
    },
    {
      name: "Postier",
      desc: "*Just* do request.",
      img: "https://raw.githubusercontent.com/results-may-vary-org/postier/refs/heads/main/build/appicon.png",
      actionText: "* Check / Install",
      actionLink: "https://github.com/results-may-vary-org/postier",
      pos: 4
    },
    {
      name: "Kuro",
      desc: "A KDE splashscreen. Also in oled version.",
      img: "https://raw.githubusercontent.com/bouteillerAlan/kuro/main/a2n.kuro/contents/splash/images/cat.gif",
      actionText: "* Check / Install",
      actionLink: "https://github.com/bouteillerAlan/kuro",
      pos: 8
    },
    {
      name: "Archupdate",
      desc: "A widget for KDE plasma that count update available.",
      img: "https://raw.githubusercontent.com/bouteillerAlan/archupdate/main/git-assets/img/allalt.png",
      actionText: "* Check / Install",
      actionLink: "https://github.com/bouteillerAlan/archupdate",
      pos: 3
    },
    {
      name: "Earbud companion",
      desc: "A widget for KDE plasma that beautiffuly show information about your earbud.",
      img: "https://raw.githubusercontent.com/results-may-vary-org/earbud-companion/main/assets/Screenshot_20250630_104921.png",
      actionText: "* Check / Install",
      actionLink: "https://github.com/results-may-vary-org/earbud-companion",
      pos: 5
    },
    {
      name: "Docker companion",
      desc: "A widget for KDE plasma that show your docker stuff in the system tray.",
      img: "https://raw.githubusercontent.com/results-may-vary-org/docker-companion/main/assets/screenshot.png",
      actionText: "* Check / Install",
      actionLink: "https://github.com/results-may-vary-org/docker-companion",
      pos: 6
    },
    {
      name: "dracut-numlock",
      desc: "A dracut module which enables numlock in the early boot.",
      img: "",
      actionText: "* Check / Install",
      actionLink: "https://github.com/bouteillerAlan/dracut-numlock",
      pos: 9
    },
    {
      name: "ttydal",
      desc: "Tidal music service in your terminal.",
      img: "https://raw.githubusercontent.com/results-may-vary-org/ttydal/main/assets/ttydalscreen.png",
      actionText: "* Check / Install",
      actionLink: "https://github.com/results-may-vary-org/ttydal",
      pos: 1
    }
  ];
  projects.sort((a, b) => a.pos > b.pos ? 1 : -1);
  const projectDiv = document.getElementById("project");
  // t > .img > .slashed > img
  // t > .txt > p + a
  if (projectDiv) {
    let flex = null;
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
        const img = document.createElement("img");
        img.src = project.img;
        img.alt = `screenshot of the ${project.name} project`;
        img.style.height = "10em";
        slashed.appendChild(img);
      } else {
        slashed.style.height = "10em";
      }
      imgContainer.appendChild(slashed);
      txtContainer.appendChild(title);
      txtContainer.appendChild(text);
      txtContainer.appendChild(link);
      const p = document.createElement("div");
      p.className = "project";
      p.appendChild(imgContainer);
      p.appendChild(txtContainer);
      if ((index+1) % 2 === 1) {
        flex = document.createElement("div");
        flex.style.display = "flex";
      }
      if (flex) { /* just in case */
        flex.appendChild(p);
      }
      if ((index+1) % 2 === 1 && flex) {
        projectDiv.appendChild(flex);
      }
    })
  }
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

