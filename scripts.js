 // Initialize Lucide Icons
      lucide.createIcons();

      // --- Typing Animation ---
      const typingTextElement = document.getElementById('typing-text');
      const textToType = "Hi, I'm Harsh Kumar.";
      let charIndex = 0;

      function type() {
         if (charIndex < textToType.length) {
            typingTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
         }
      }
      document.addEventListener('DOMContentLoaded', type);

      // --- Mobile Menu Toggle ---
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      mobileMenuButton.addEventListener('click', () => {
         mobileMenu.classList.toggle('hidden');
         const icon = mobileMenuButton.querySelector('i');
         icon.setAttribute('data-lucide', mobileMenu.classList.contains('hidden') ? 'menu' : 'x');
         lucide.createIcons();
      });

      // --- Close mobile menu on link click ---
      document.querySelectorAll('#mobile-menu a').forEach(link => {
         link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
         });
      });

      // --- Active Nav Link on Scroll ---
      const sections = document.querySelectorAll('main > section');
      const navLinks = document.querySelectorAll('.nav-link');
      window.addEventListener('scroll', () => {
         let current = '';
         sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
               current = section.getAttribute('id');
            }
         });

         navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
               link.classList.add('active');
            }
         });
      });

      // --- Text Scramble Animation ---
      class TextScramble {
         constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
         }
         setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
               const from = oldText[i] || '';
               const to = newText[i] || '';
               const start = Math.floor(Math.random() * 40);
               const end = start + Math.floor(Math.random() * 40);
               this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
         }
         update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
               let { from, to, start, end, char } = this.queue[i];
               if (this.frame >= end) {
                  complete++;
                  output += to;
               } else if (this.frame >= start) {
                  if (!char || Math.random() < 0.28) {
                     char = this.randomChar();
                     this.queue[i].char = char;
                  }
                  output += `<span class="text-gray-500">${char}</span>`;
               } else {
                  output += from;
               }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
               this.resolve();
            } else {
               this.frameRequest = requestAnimationFrame(this.update);
               this.frame++;
            }
         }
         randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
         }
      }

      // --- Animate elements on scroll ---
      const animatedElements = document.querySelectorAll('.fade-in-section');
      const observerOptions = { threshold: 0.15 };
      const observer = new IntersectionObserver(function (entries, observer) {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               entry.target.classList.add('is-visible');
            }
         });
      }, observerOptions);
      animatedElements.forEach(el => observer.observe(el));

      // --- Trigger Scramble on Scroll ---
      const scrambleHeaders = document.querySelectorAll('.section-heading');
      scrambleHeaders.forEach(header => {
         const target = header.querySelector('.scramble-target');
         const scrambler = new TextScramble(target);
         let originalText = target.textContent;
         let isAnimating = false;

         const scrambleObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
               if (entry.isIntersecting && !isAnimating) {
                  isAnimating = true;
                  scrambler.setText(originalText).then(() => {
                     // Continuous subtle animation
                     setInterval(() => {
                        scrambler.setText(originalText);
                     }, 4000 + Math.random() * 2000);
                  });
                  scrambleObserver.unobserve(header); // Animate only once on first view
               }
            });
         }, { threshold: 0.5 });
         scrambleObserver.observe(header);
      });

      // --- Contact Form Submission ---
      /* Change: I have commented out this entire block. 
          Because you are using Formspree now, this JavaScript is no longer needed.
          It was preventing the form from submitting correctly.
      */
      /*
      const contactForm = document.getElementById('contact-form');
      const formFeedback = document.getElementById('form-feedback');
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          formFeedback.textContent = 'Sending message...';
          setTimeout(() => {
              formFeedback.textContent = 'Message sent successfully!';
              contactForm.reset();
              setTimeout(() => { formFeedback.textContent = ''; }, 5000);
          }, 1000);
      });
      */

      // --- Matrix Background for Contact Section ---
      const canvas = document.getElementById('matrix-canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = window.innerWidth;
      canvas.height = document.getElementById('contact').offsetHeight;

      const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
      const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const nums = '01234T89';
      const alphabet = katakana + latin + nums;

      const fontSize = 16;
      const columns = canvas.width / fontSize;
      const rainDrops = [];

      for (let x = 0; x < columns; x++) {
         rainDrops[x] = 1;
      }

      const drawMatrix = () => {
         ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
         ctx.fillRect(0, 0, canvas.width, canvas.height);

         ctx.fillStyle = '#22c55e'; // Green color for the text
         ctx.font = fontSize + 'px monospace';

         for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
               rainDrops[i] = 0;
            }
            rainDrops[i]++;
         }
      };

      setInterval(drawMatrix, 30);

      window.addEventListener('resize', () => {
         canvas.width = window.innerWidth;
         canvas.height = document.getElementById('contact').offsetHeight;
      });

      // --- Load profile image from Local Storage ---
      document.addEventListener('DOMContentLoaded', () => {
         const profileImageElement = document.getElementById('profile-picture');
         const storedImage = localStorage.getItem('profileImage'); // Key name in local storage

         if (storedImage) {
            // Set the src of the img tag to the Base64 string from local storage
            profileImageElement.src = storedImage;
         }
      });