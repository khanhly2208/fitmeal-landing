// FitMeal - Diet Food Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // Header Scroll Effect
    // =============================================
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTop');
    const topBar = document.querySelector('.top-bar');

    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            scrollTopBtn.classList.add('visible');
            // Hide top bar when scrolled
            if (topBar) {
                topBar.style.transform = 'translateY(-100%)';
            }
        } else {
            header.classList.remove('scrolled');
            scrollTopBtn.classList.remove('visible');
            // Show top bar when at top
            if (topBar) {
                topBar.style.transform = 'translateY(0)';
            }
        }
    }

    window.addEventListener('scroll', handleScroll);

    // =============================================
    // Mobile Menu Toggle
    // =============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', function () {
        nav.classList.toggle('active');

        // Toggle hamburger animation
        const spans = this.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (nav.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            nav.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // =============================================
    // Active Nav Link on Scroll
    // =============================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // =============================================
    // Smooth Scroll
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // Scroll to Top Button
    // =============================================
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =============================================
    // Counter Animation
    // =============================================
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const heroSection = document.getElementById('home');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        if (window.scrollY + window.innerHeight > heroSection.offsetTop + 300) {
            countersAnimated = true;

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString() + (counter.parentElement.querySelector('.stat-label').textContent.includes('%') ? '' : '+');
                    }
                };

                updateCounter();
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on page load

    // =============================================
    // Product Data
    // =============================================
    const productData = {
        1: {
            title: 'Salad Gà Nướng & Bơ',
            calories: '380 kcal',
            protein: '35g protein',
            description: 'Một món salad hoàn hảo với ức gà nướng mềm mịn, kết hợp cùng bơ tươi ngậy và rau xanh organic. Sốt dầu oliu chanh giúp tăng hương vị mà không tăng calories.',
            ingredients: ['Ức gà nướng (150g)', 'Bơ tươi (1/2 quả)', 'Rau xà lách Mỹ', 'Cà chua bi', 'Dưa leo', 'Sốt dầu oliu chanh'],
            price: '159.000đ',
            image: 'images/diet_meal_1.png'
        },
        2: {
            title: 'Smoothie Bowl Berry',
            calories: '280 kcal',
            protein: '12g protein',
            description: 'Smoothie bowl thơm ngon với đủ loại berry tươi, kết hợp cùng granola giòn và hạt chia. Đây là bữa sáng hoàn hảo để bắt đầu ngày mới tràn đầy năng lượng.',
            ingredients: ['Hỗn hợp berry (dâu, việt quất, mâm xôi)', 'Chuối đông lạnh', 'Sữa hạnh nhân', 'Granola không đường', 'Hạt chia', 'Mật ong nguyên chất'],
            price: '129.000đ',
            image: 'images/diet_meal_2.png'
        },
        3: {
            title: 'Cá Hồi Áp Chảo & Quinoa',
            calories: '420 kcal',
            protein: '42g protein',
            description: 'Phi lê cá hồi Na Uy áp chảo vàng giòn, kết hợp cùng quinoa giàu protein và rau xanh hấp. Một bữa ăn premium đầy đủ dưỡng chất cho người theo đuổi lối sống healthy.',
            ingredients: ['Phi lê cá hồi Na Uy (180g)', 'Quinoa trắng', 'Rau bina (spinach)', 'Măng tây', 'Sốt chanh dây', 'Hạt mè trắng'],
            price: '229.000đ',
            image: 'images/diet_meal_3.png'
        },
        4: {
            title: 'Bò Nướng & Rau Củ',
            calories: '450 kcal',
            protein: '48g protein',
            description: 'Thịt bò Úc nướng vừa chín tới, kết hợp cùng các loại rau củ nướng như bông cải, ớt chuông và nấm. Món ăn low-carb lý tưởng cho những ai theo chế độ keto.',
            ingredients: ['Thịt bò Úc (200g)', 'Bông cải xanh', 'Ớt chuông 3 màu', 'Nấm đùi gà', 'Hành tây', 'Sốt tiêu đen'],
            price: '199.000đ',
            image: 'images/diet_meal_4.png'
        },
        5: {
            title: 'Meal Prep Box 5 Ngày',
            calories: '1500 kcal/ngày',
            protein: '100g protein/ngày',
            description: 'Combo tiết kiệm bao gồm đủ 3 bữa/ngày trong 5 ngày liên tục. Thực đơn được tính toán khoa học, đảm bảo đủ dưỡng chất và phù hợp cho mục tiêu giảm cân.',
            ingredients: ['5 bữa sáng (smoothie bowl, overnight oats, pancake)', '5 bữa trưa (salad, cơm gạo lứt)', '5 bữa tối (protein + rau củ)', 'Snack healthy', 'Nước detox mỗi ngày'],
            price: '1.199.000đ',
            image: 'images/diet_meal_5.png'
        },
        6: {
            title: 'Buddha Bowl Chay',
            calories: '350 kcal',
            protein: '18g protein',
            description: 'Buddha bowl thuần chay với đậu gà rang, khoai lang nướng mật ong, rau xanh tươi và sốt hummus. Phù hợp cho người ăn chay và những ai muốn giảm lượng thịt.',
            ingredients: ['Đậu gà rang', 'Khoai lang nướng mật ong', 'Rau xanh hỗn hợp', 'Hummus tự làm', 'Sốt tahini', 'Hạt bí ngô'],
            price: '139.000đ',
            image: 'images/diet_meal_6.png'
        },
        7: {
            title: 'Overnight Oats Berry',
            calories: '320 kcal',
            protein: '15g protein',
            description: 'Yến mạch ngâm sữa hạnh nhân qua đêm, kết hợp cùng berry tươi, hạt óc chó và mật ong. Bữa sáng tiện lợi, chỉ cần lấy từ tủ lạnh và thưởng thức.',
            ingredients: ['Yến mạch nguyên hạt', 'Sữa hạnh nhân không đường', 'Hạt óc chó', 'Berry hỗn hợp', 'Mật ong', 'Gia vị quế'],
            price: '99.000đ',
            image: 'images/diet_meal_7.png'
        },
        8: {
            title: 'Detox Green Juice',
            calories: '85 kcal',
            protein: '3g protein',
            description: 'Nước ép xanh detox với cần tây, dưa leo, cải bó xôi và táo xanh. Giúp thanh lọc cơ thể, hỗ trợ tiêu hóa và cung cấp vitamin, khoáng chất thiết yếu.',
            ingredients: ['Cần tây tươi', 'Dưa leo', 'Cải bó xôi', 'Táo xanh', 'Gừng tươi', 'Chanh'],
            price: '69.000đ',
            image: 'images/diet_meal_8.png'
        },
        9: {
            title: 'Tôm Salad Bơ Chanh',
            calories: '290 kcal',
            protein: '28g protein',
            description: 'Tôm sú tươi hấp vừa chín, kết hợp cùng bơ và rau xanh, tưới sốt chanh dây chua ngọt. Món salad hải sản nhẹ nhàng nhưng đầy đủ protein.',
            ingredients: ['Tôm sú hấp (150g)', 'Bơ tươi', 'Rau xà lách', 'Cam tươi', 'Sốt chanh dây', 'Mè rang'],
            price: '179.000đ',
            image: 'images/diet_meal_9.png'
        },
        10: {
            title: 'Trứng Chiên Rau Củ',
            calories: '250 kcal',
            protein: '22g protein',
            description: 'Trứng gà ta chiên cùng rau bina, cà chua và các loại rau mùi. Bữa sáng đơn giản nhưng giàu protein, phù hợp cho ngày bận rộn.',
            ingredients: ['Trứng gà ta (3 quả)', 'Rau bina', 'Cà chua', 'Hành tây', 'Phô mai feta', 'Rau mùi'],
            price: '89.000đ',
            image: 'images/diet_meal_10.png'
        }
    };

    // =============================================
    // Product Modal
    // =============================================
    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const quickViewBtns = document.querySelectorAll('.quick-view');

    function openModal(productId) {
        const product = productData[productId];
        if (!product) return;

        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalImage').alt = product.title;
        document.getElementById('modalTitle').textContent = product.title;
        document.getElementById('modalCalories').textContent = product.calories;
        document.getElementById('modalProtein').textContent = product.protein;
        document.getElementById('modalDescription').textContent = product.description;
        document.getElementById('modalPrice').textContent = product.price;

        const ingredientsList = document.getElementById('modalIngredients');
        ingredientsList.innerHTML = '';
        product.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product');
            openModal(productId);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // =============================================
    // Toast Notification System
    // =============================================
    function createToastContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    function showToast(title, message, type = 'success', duration = 5000) {
        const container = createToastContainer();

        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-times-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${icons[type]}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">&times;</button>
            <div class="toast-progress"></div>
        `;

        container.appendChild(toast);

        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => removeToast(toast));

        // Auto remove
        setTimeout(() => removeToast(toast), duration);

        return toast;
    }

    function removeToast(toast) {
        toast.classList.add('hiding');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }

    // =============================================
    // Success Modal with Confetti
    // =============================================
    function createSuccessModal() {
        let modal = document.getElementById('successModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'successModal';
            modal.className = 'success-modal';
            modal.innerHTML = `
                <div class="success-modal-content">
                    <div class="success-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h3>Đăng Ký Thành Công!</h3>
                    <p id="successMessage">Cảm ơn bạn đã để lại thông tin. Chúng tôi sẽ liên hệ trong thời gian sớm nhất!</p>
                    <button class="btn btn-primary" id="closeSuccessModal">
                        <i class="fas fa-thumbs-up"></i> Tuyệt Vời!
                    </button>
                </div>
            `;
            document.body.appendChild(modal);

            modal.querySelector('#closeSuccessModal').addEventListener('click', () => {
                modal.classList.remove('active');
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
        return modal;
    }

    function showSuccessModal(name, goal) {
        const modal = createSuccessModal();
        const message = document.getElementById('successMessage');

        const goalText = goal === 'lose' ? 'giảm cân' : goal === 'maintain' ? 'duy trì cân nặng' : 'tăng cơ';
        message.innerHTML = `Cảm ơn <strong>${name}</strong>! 🎉<br>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để tư vấn về mục tiêu <strong>${goalText}</strong> của bạn.`;

        modal.classList.add('active');
        createConfetti();
    }

    function createConfetti() {
        const colors = ['#22c55e', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

                document.body.appendChild(confetti);

                // Animate
                const animation = confetti.animate([
                    { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                    { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
                ], {
                    duration: Math.random() * 2000 + 2000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });

                animation.onfinish = () => confetti.remove();
            }, i * 20);
        }
    }

    // =============================================
    // Form Submission
    // =============================================
    const orderForm = document.getElementById('orderForm');

    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('customerName').value;
        const phone = document.getElementById('customerPhone').value;
        const goal = document.getElementById('customerGoal').value;

        // Validate phone number
        const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            showToast('Lỗi!', 'Vui lòng nhập số điện thoại hợp lệ.', 'error');
            return;
        }

        if (!goal) {
            showToast('Lỗi!', 'Vui lòng chọn mục tiêu của bạn.', 'warning');
            return;
        }

        // Simulate form submission
        const submitBtn = orderForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Show success modal with confetti
            showSuccessModal(name, goal);

            // Also show toast notification
            showToast(
                'Đăng ký thành công! 🎉',
                `Cảm ơn ${name}! Chúng tôi sẽ liên hệ sớm nhất.`,
                'success'
            );

            orderForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // =============================================
    // Scroll Reveal Animation
    // =============================================
    const revealElements = document.querySelectorAll('.feature-card, .product-card, .benefit-card, .testimonial-card');

    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initial styles for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on page load

    // =============================================
    // Lazy Loading Images
    // =============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // =============================================
    // Product Card Hover Effect
    // =============================================
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    console.log('FitMeal Landing Page loaded successfully! 🥗');
});
