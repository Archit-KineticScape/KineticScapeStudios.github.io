const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

gsap.registerPlugin(ScrollTrigger);

const slider = document.querySelector('.slider');
const sections = gsap.utils.toArray(".slider section");
const squigglies = gsap.utils.toArray(".squiggly-container img");

let tl;

function updateTimeline() {
    if (tl) {
        tl.kill();
    }

    const isMobile = window.innerWidth < 960;

    if (!isMobile) {
        const xPercentValue = -83;

        tl = gsap.timeline({
            defaults: {
                ease: "none"
            },
            scrollTrigger: {
                trigger: slider,
                pin: true,
                scrub: 2,
                end: () => "+=" + slider.offsetWidth
            }
        });

        tl.to(slider, {
            xPercent: xPercentValue
        });

        sections.forEach((stop, index) => {
            const content = stop.querySelector('.content-section');
            const video = stop.querySelector('.scroll-section-video');
            tl.from(content, {
                yPercent: -50,
                opacity: 0,
                scrollTrigger: {
                    trigger: stop,
                    start: "left center",
                    end: "center center",
                    containerAnimation: tl,
                    scrub: true,
                    markers: true,
                }
            });
            if (video) {
                tl.from(video, {
                    yPercent: 50,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: stop,
                        start: "left center",
                        end: "center center",
                        containerAnimation: tl,
                        scrub: true,
                        markers: false
                    }
                }, "<"); // "<" means the video animation starts at the same time as the content animation
            }
        });
    } else {
        sections.forEach((stop, index) => {
            const content = stop.querySelector('.content-section');
            const video = stop.querySelector('.scroll-section-video');
            gsap.from(content, {
                yPercent: -50,
                opacity: 0,
                scrollTrigger: {
                    trigger: stop,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                    markers: true,
                }
            });
            if (video) {
                gsap.from(video, {
                    yPercent: 50,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: stop,
                        start: "top center",
                        end: "bottom center",
                        scrub: true,
                        markers: false
                    }
                });
            }
        });
    }
}

squigglies.forEach((squiggly, i) => {
    gsap.from(squiggly, {
        xPercent: squiggly.dataset.distance,
        scrollTrigger: {
            scrub: 0.3
        }
    });
});

const lenis = new Lenis();

lenis.on('scroll', (e) => {
    //console.log(e)
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

menu.addEventListener('click', function () {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

window.addEventListener('resize', updateTimeline);
updateTimeline();

// Form submission logic remains unchanged
const form = document.getElementById('demoForm');

form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
        return;
    }
    Swal.fire({
        title: 'Success!',
        text: 'We will get back to you soon!',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            // Perform any action after the confirmation
        }
    });
});

function submitForm() {
    alert('Form submitted!'); // Placeholder action
}

const countrySelector = document.getElementById('country');
const phoneInput = document.getElementById('phone');

countrySelector.addEventListener('change', function () {
    const countryData = {
        'US': '+1',
        'CA': '+1',
        'GB': '+44',
        'IN': '+91'
    };
    const prefix = countryData[this.value] || '';
    phoneInput.placeholder = prefix;
});

const countryOptions = {
    'US': 'United States',
    'CA': 'Canada',
    'GB': 'United Kingdom',
    'IN': 'India'
};

for (const [code, name] of Object.entries(countryOptions)) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    countrySelector.appendChild(option);
}

function openVirtualStore() {
    var newTab = window.open('V1.0.1/index.html', '_blank');
    newTab.focus();
}