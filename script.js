// 1) Fade in on page load
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('opacity-100');
});

// 2) Fade out on internal navigation
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');

  // skip hashes, mailto/tel, externals, blank targets
  if (
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    a.target === '_blank' ||
    (href.match(/^https?:\/\//) && !href.includes(location.host))
  ) return;

  e.preventDefault();
  document.body.classList.remove('opacity-100');
  setTimeout(() => { window.location.href = href }, 400);
});

// --- DATA ---
const services = [
    { name: "4th-6th Grade Math", description: "Fundamental math concepts for middle schoolers." },
    { name: "Pre-Algebra", description: "Preparing students for the world of algebra." },
    { name: "Algebra 1", description: "Core concepts of linear equations and functions." },
    { name: "Geometry", description: "Exploring shapes, angles, and spatial reasoning." },
    { name: "Algebra 2", description: "Advanced topics in algebra, including polynomials and matrices." },
    { name: "Coding", description: "An introduction to programming logic and Python." },
    { name: "Pre-Calculus", description: "Advanced functions, trigonometry, and more.", comingSoon: true },
    { name: "Engineering", description: "Introduction to engineering principles.", comingSoon: true },
    { name: "Competition Math", description: "Training for AMC, Mathcounts, and more.", comingSoon: true },
];

const teams = [
    {
        name: "Founders",
        members: [
            { name: "Founder Name 1", role: "Co-Founder & CEO", contact: "founder1@arctutoring.org", img: "https://placehold.co/200x200/3B82F6/FFFFFF?text=F1" },
            { name: "Founder Name 2", role: "Co-Founder & CTO", contact: "founder2@arctutoring.org", img: "https://placehold.co/200x200/3B82F6/FFFFFF?text=F2" },
        ]
    },
    {
        name: "Math Tutors",
        members: [
            { name: "Tutor Name 1", role: "Algebra Specialist", contact: "tutor1@arctutoring.org", img: "https://placehold.co/200x200/BFDBFE/1E3A8A?text=T1" },
            { name: "Tutor Name 2", role: "Geometry Expert", contact: "tutor2@arctutoring.org", img: "https://placehold.co/200x200/BFDBFE/1E3A8A?text=T2" },
            { name: "Tutor Name 3", role: "Calculus Prep", contact: "tutor3@arctutoring.org", img: "https://placehold.co/200x200/BFDBFE/1E3A8A?text=T3" },
            { name: "Tutor Name 4", role: "Middle School Math", contact: "tutor4@arctutoring.org", img: "https://placehold.co/200x200/BFDBFE/1E3A8A?text=T4" },
            { name: "Tutor Name 5", role: "Math Whiz", contact: "tutor5@arctutoring.org", img: "https://placehold.co/200x200/BFDBFE/1E3A8A?text=T5" },
        ]
    },
    {
        name: "Coding Tutors",
        members: [
            { name: "Coder Name 1", role: "Python Pro", contact: "coder1@arctutoring.org", img: "https://placehold.co/200x200/93C5FD/1E40AF?text=C1" },
            { name: "Coder Name 2", role: "Web Dev Wiz", contact: "coder2@arctutoring.org", img: "https://placehold.co/200x200/93C5FD/1E40AF?text=C2" },
            { name: "Coder Name 3", role: "Algorithm Ace", contact: "coder3@arctutoring.org", img: "https://placehold.co/200x200/93C5FD/1E40AF?text=C3" },
        ]
    }
];

// --- DYNAMIC CONTENT RENDERING ---
function renderServices() {
    const container = document.getElementById('services-grid');
    if (!container) return;
    container.innerHTML = services.map(service => `
        <div class="bg-white p-6 rounded-lg shadow-lg flex flex-col ${service.comingSoon ? 'opacity-60' : ''}">
            <h3 class="text-xl font-semibold mb-2">${service.name}</h3>
            <p class="text-gray-600 mb-4 flex-grow">${service.description}</p>
            ${service.comingSoon ? `
                <button class="w-full bg-gray-200 text-gray-500 px-4 py-2 rounded-full cursor-not-allowed">Coming Soon</button>
            ` : `
                <a href="contact.html?subject=${encodeURIComponent(service.name)}" class="w-full text-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">Request Tutoring</a>
            `}
        </div>
    `).join('');
}

function renderEmployees() {
    const container = document.getElementById('teams-container');
    if (!container) return;
    container.innerHTML = teams.map(team => `
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">${team.name}</h2>
            <div class="relative">
                <div class="carousel-container overflow-hidden">
                    <div class="carousel">
                        ${team.members.map(member => `
                            <div class="carousel-item p-4">
                                <div class="bg-white p-6 rounded-lg shadow-lg text-center h-full flex flex-col justify-center">
                                    <img src="${member.img}" alt="${member.name}" class="w-32 h-32 rounded-full mx-auto mb-4 shadow-md">
                                    <h3 class="text-xl font-semibold">${member.name}</h3>
                                    <p class="text-blue-600 font-medium">${member.role}</p>
                                    <p class="text-gray-500 text-sm mt-2">${member.contact}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>
    `).join('');
}

function populateSubjectDropdown() {
    const select = document.getElementById('subject-request');
    if (!select) return;
    const availableServices = services.filter(s => !s.comingSoon);
    select.innerHTML = '<option value="">Select a subject</option>' + availableServices.map(s => `<option value="${s.name}">${s.name}</option>`).join('');

    // Pre-select subject if it's in the URL
    const params = new URLSearchParams(window.location.search);
    const subject = params.get('subject');
    if (subject) {
        select.value = subject;
    }
}

// --- EVENT LISTENERS & INITIALIZATION ---
function setupTutoringForm() {
    const form = document.getElementById('tutoring-request-form');
    const successMessage = document.getElementById('form-success-message');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted with data:', new FormData(form));
            form.reset();
            successMessage.classList.remove('hidden');
            setTimeout(() => successMessage.classList.add('hidden'), 5000);
        });
    }
}

function setupQAForm() {
    const form = document.getElementById('qa-form');
     if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your question! We will review it shortly. In the future, this will post to a public forum.');
            form.reset();
        });
    }
}

// --- GLOBAL SCRIPT RUNNING ON ALL PAGES ---
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Set active nav link
    const navLinks = document.querySelectorAll('header .nav-link');
    let currentPage = window.location.pathname.split('/').pop();
    if (currentPage === '' || currentPage === 'index.html') {
        currentPage = 'index.html';
    }
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Page-specific initializations
    const pageName = window.location.pathname.split('/').pop();
    if (pageName === 'services.html') {
        renderServices();
    } else if (pageName === 'team.html') {
        renderEmployees();
    } else if (pageName === 'contact.html') {
        populateSubjectDropdown();
        setupTutoringForm();
    } else if (pageName === 'qa.html') {
        setupQAForm();
    }
});
