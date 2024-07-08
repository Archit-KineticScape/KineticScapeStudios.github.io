



const menu = document.querySelector('#mobile-menu')

const menuLinks = document.querySelector('.navbar__menu')

gsap.registerPlugin(ScrollTrigger)

const slider = document.querySelector('.slider');
const sections = gsap.utils.toArray(".slider section");
const squigglies = gsap.utils.toArray(".squiggly-container img");

let tl = gsap.timeline({
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
    xPercent: -83
})

sections.forEach((stop, index) => {
    const content = stop.querySelector('.content-section');
    const video = stop.querySelector('.scroll-section-video');
    tl.from(stop.querySelector('.content-section'), {
        yPercent: -50,
        opacity: 0,
        scrollTrigger: {
            trigger: stop,
            start: "left center",
            end: "center center",
            containerAnimation: tl,
            scrub: true,
            markers: false,
            
        }
    })
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
squigglies.forEach((squiggly, i) => {
    gsap.from(squiggly, {
        xPercent: squiggly.dataset.distance,
        scrollTrigger: {
            scrub: 0.3
        }
    })
})

const lenis = new Lenis()

lenis.on('scroll', (e) => {
    //console.log(e)
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
menu.addEventListener('click', function () {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})


// document.getElementById('openModal').addEventListener('click', function() {
//     document.getElementById('demoModal').style.display = "block";
// });

// document.querySelector('.close-button').addEventListener('click', function() {
//     document.getElementById('demoModal').style.display = "none";
// });

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == document.getElementById('demoModal')) {
//         document.getElementById('demoModal').style.display = "none";
//     }
// }




//Define the steps and the current step index
const form = document.getElementById('demoForm');

form.addEventListener('submit', function (event) {
    //event.preventDefault(); // Prevent the form from submitting normally
    if (!form.checkValidity()) {
        return;
    }
    // Show a SweetAlert dialog
    Swal.fire({
        title: 'Success!',
        text: 'We will get back to you soon!',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            // Perform any action after the confirmation
            // form.submit(); // To submit the form
            // location.href = 'thankyou.html'; // Or redirect
        }
    });
});

function submitForm() {
    // Validate and submit form data
    alert('Form submitted!'); // Placeholder action
}

// Update the phone prefix based on the selected country
const countrySelector = document.getElementById('country');
const phoneInput = document.getElementById('phone');

countrySelector.addEventListener('change', function () {
    const countryData = {
        'US': '+1',
        'CA': '+1',
        'GB': '+44',
        'IN': '+91'
        // Add other countries and prefixes as needed
    };
    const prefix = countryData[this.value] || '';
    phoneInput.placeholder = prefix;
});

// Initialize country options (this can be dynamically generated or fetched from a server)
const countryOptions = {
    'US': 'United States',
    'CA': 'Canada',
    'GB': 'United Kingdom',
    'IN': 'India'
    // Add other countries as needed
};
for (const [code, name] of Object.entries(countryOptions)) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    countrySelector.appendChild(option);
}


// document.addEventListener('DOMContentLoaded', function () {
//     const sections = document.querySelectorAll('.content-section');

//     window.addEventListener('scroll', () => {
//         let currentSectionIndex = 0;

//         sections.forEach((section, index) => {
//             const sectionTop = section.offsetTop;
//             const sectionHeight = section.clientHeight;

//             if (window.scrollY >= sectionTop - sectionHeight / 3) {
//                 currentSectionIndex = index;
//             }
//         });

//         sections.forEach((section, index) => {
//             if (index === currentSectionIndex) {
//                 section.style.opacity = '1';
//                 section.style.transform = 'translateY(0)';
//             } else {
//                 section.style.opacity = '0';
//                 section.style.transform = 'translateY(100px)';
//             }
//         });
//     });
// });

function openVirtualStore() {
    window.open('V1.0.0/VirtualStore.html', '_blank', 'width=960,height=600');
}