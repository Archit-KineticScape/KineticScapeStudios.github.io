



const menu = document.querySelector('#mobile-menu')

const menuLinks = document.querySelector('.navbar__menu')


menu.addEventListener('click', function () {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})

document.addEventListener('DOMContentLoaded', function () {
    let videoData = {};

    // Fetch the video data from the JSON file
    fetch('Data/showcase.json')
        .then(response => response.json())
        .then(data => {
            videoData = data;
        })
        .catch(error => {console.error('Error loading video data:', error)});

    const videoModal = document.getElementById('videoGalleryModal');
    const videoPlayer = document.getElementById('galleryVideo');
    const dotsContainer = document.querySelector('.video-indicators');
    let currentVideos = [];
    let currentVideoIndex = 0;

    // Function to create dots based on video count
    function createDots(numberOfVideos) {
        dotsContainer.innerHTML = ''; // Clear existing dots
        for (let i = 0; i < numberOfVideos; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.dataset.index = i;
            dot.addEventListener('click', function () {
                applySlideAnimation(currentVideoIndex, parseInt(this.dataset.index));
                currentVideoIndex = parseInt(this.dataset.index);
                updateVideoPlayer();
            });
            dotsContainer.appendChild(dot);
        }
    }

    // Update video player and dots
    function updateVideoPlayer() {
        videoPlayer.src = currentVideos[currentVideoIndex];
        videoPlayer.load();
        videoPlayer.play();
        updateActiveDot();
    }

    // Update active dot based on current video index
    function updateActiveDot() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentVideoIndex].classList.add('active');
    }

    // Handle clicks on service buttons
    document.querySelectorAll('.service-button').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const key = this.getAttribute('data-key');
            currentVideos = videoData[key] || [];
            if (currentVideos.length === 0) {
                console.error('No videos found for key:', key);
                document.getElementById('videoGalleryContent').style.display = 'none';
            document.getElementById('noVideosAlert').style.display = 'flex'; // Show the "Coming Soon..." message
            videoModal.style.display = 'block';

                

                return;
            }
            document.getElementById('videoGalleryContent').style.display = 'block';
            document.getElementById('noVideosAlert').style.display = 'none';
            createDots(currentVideos.length);
            currentVideoIndex = 0; // Start with the first video
            updateVideoPlayer();
            videoModal.style.display = 'block';
        });
    });

    // Close modal by clicking outside the video content
    videoModal.addEventListener('click', function (event) {
        if (event.target === this) {
            videoModal.style.display = 'none';
            videoPlayer.pause();
            videoPlayer.currentTime = 0;  // Optionally reset the video
        }
    });

    // Navigation buttons with animation
    document.querySelector('.prev-video').addEventListener('click', function () {
        changeVideo(-1);
    });

    document.querySelector('.next-video').addEventListener('click', function () {
        changeVideo(1);
    });

    function changeVideo(direction) {
        const newIndex = (currentVideoIndex + direction + currentVideos.length) % currentVideos.length;
        applySlideAnimation(currentVideoIndex, newIndex);
        currentVideoIndex = newIndex;
        updateVideoPlayer();
    }

    function applySlideAnimation(currentIndex, newIndex) {
        const animationName = newIndex > currentIndex ? 'slide-in-left' : 'slide-in-right';
        videoPlayer.classList.add(animationName);
        videoPlayer.addEventListener('animationend', () => {
            videoPlayer.classList.remove(animationName);
        }, { once: true });
    }
});

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

// document.getElementById('demoRequestForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     // Collect and log form data
//     // Close modal on successful submission
//     document.getElementById('demoModal').style.display = "none";
//     alert('Thank you for your request! We will get back to you soon.');
//     this.reset(); // Optionally clear the form
// });


// Define the steps and the current step index
const form = document.getElementById('demoForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        if(!form.checkValidity())
        {
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


