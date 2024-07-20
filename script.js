document.addEventListener("DOMContentLoaded", function() {
    function loadPage(page) {
        const container = document.getElementById('page-container');

        container.classList.remove('fade-in'); // transition
        container.classList.add('fade-out');

        // wait for transition
        setTimeout(() => {
            fetch(page)
                .then(response => {
                    return response.text();
                })
                .then(html => {
                    container.innerHTML = html;

                    container.classList.remove('fade-out'); 
                    container.classList.add('fade-in');
                    
                    if (page === 'contact.html') {
                        initializeFormValidation();
                    }
                })
                .catch(error => console.warn('Error loading the page', error));
        }, 300); 
    }

    document.querySelectorAll('.fixed-menu a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });

    // initial page
    loadPage('profile.html');
});

function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let valid = true;

        if (name === "") {
            alert("The field Name is required");
            valid = false;
        }

        if (email === "" || !validateEmail(email)) {
            alert("Please, entender a valid Email");
            valid = false;
        }

        if (message === "") {
            alert("The field Message is required");
            valid = false;
        }

        if (valid) {
            alert("Form submitted succesfully!");
            form.reset();
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}