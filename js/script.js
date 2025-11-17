document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. NAVBAR & HAMBURGER ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Efek Scroll Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. SISTEM MODAL (POPUP) ---
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if(modal) {
            modal.style.display = 'flex';
            setTimeout(() => { modal.classList.add('show'); }, 10);
        }
    }

    function closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
            setTimeout(() => { modal.style.display = 'none'; }, 300);
        });
    }

    // Tombol Close (X)
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Klik di luar modal untuk menutup
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal();
        }
    }

    // --- 3. LOGIKA TOMBOL ---

    // A. Tombol Gabung / Mulai -> Buka Login
    document.querySelectorAll('.join-btn, .start-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('loginModal');
        });
    });

    // B. Tombol Pilih Paket / Sidebar Promo -> Buka Payment
    document.querySelectorAll('.trigger-payment, .pricing-card button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Ambil harga (simulasi)
            let priceText = "Paket Membership";
            const card = btn.closest('.pricing-card');
            if(card) {
                const priceEl = card.querySelector('.price');
                if(priceEl) priceText = "Total: " + priceEl.innerText.split('/')[0];
            }
            const totalEl = document.getElementById('paymentTotal');
            if(totalEl) totalEl.innerText = priceText;
            
            openModal('paymentModal');
        });
    });

    // C. Tombol Jadwal / Sidebar Jadwal -> Buka Jadwal
    document.querySelectorAll('.trigger-schedule, .class-card button, .trainer-info button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('scheduleModal');
        });
    });

    // --- 4. SIMULASI INTERAKSI ---
    
    // Pilih Metode Pembayaran
    const payOptions = document.querySelectorAll('.payment-option');
    payOptions.forEach(option => {
        option.addEventListener('click', () => {
            payOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    // Submit Pembayaran
    const payForm = document.getElementById('paymentForm');
    if(payForm) {
        payForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = payForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Memproses...";
            
            setTimeout(() => {
                alert("Pembayaran Berhasil! Bukti dikirim ke WhatsApp Anda.");
                closeModal();
                btn.innerText = originalText;
            }, 1500);
        });
    }

    // Submit Login
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Login Berhasil! Selamat datang member FitZone.");
            closeModal();
        });
    }
});