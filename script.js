
/* ==========================================================================
   1. FUNGSI NAVIGASI & MENU MOBILE
   ========================================================================== */
const initNavigation = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (event) => {
        if (
            nav.classList.contains('active') &&
            !nav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.focus();
        }
    });
};


/* ==========================================================================
   2. FUNGSI FAQ ACCORDION
   ========================================================================== */
const initFAQ = () => {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) return;

    faqItems.forEach((item) => {
        const questionBtn = item.querySelector('.faq-question');

        if (!questionBtn) return;

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach((otherItem) => {
                otherItem.classList.remove('active');

                const otherBtn = otherItem.querySelector('.faq-question');

                if (otherBtn) {
                    otherBtn.setAttribute('aria-expanded', 'false');
                }
            });

            if (!isActive) {
                item.classList.add('active');
                questionBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });
};


/* ==========================================================================
   3. PENANGANAN TAUTAN KOSONG (PLACEHOLDER)
   ========================================================================== */
const initPlaceholders = () => {
    const pendingLinks = document.querySelectorAll('.pending-link');

    pendingLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (
                !href ||
                href === '#' ||
                href === window.location.pathname + '#'
            ) {
                e.preventDefault();

                const info = link.getAttribute('data-info') || 'Tautan';

                alert(`[Informasi] ${info} belum tersedia.`);
            }
        });
    });
};


/* ==========================================================================
   4. RENDER KATALOG TEMPLATE DINAMIS DARI JSON
   ========================================================================== */
const initDynamicTemplates = () => {
    const templateContainer = document.getElementById('template-container');
    const emptyStateMsg = document.getElementById('empty-state-message');
    const filterButtons = document.querySelectorAll('.filter-button');

    if (!templateContainer) return;

    let allTemplates = [];


    /* ----------------------------------------------------------------------
       SISTEM KATALOG LAMA (DINONAKTIFKAN)

       Kode ini sengaja disimpan agar bisa digunakan kembali jika katalog
       template normal sudah tersedia.
       ---------------------------------------------------------------------- */

    /*
    const renderCards = (templatesToRender) => {
        const existingCards = templateContainer.querySelectorAll('.template-card');
        existingCards.forEach(card => card.remove());

        if (templatesToRender.length === 0) {
            if (emptyStateMsg) emptyStateMsg.style.display = 'block';
            return;
        }

        if (emptyStateMsg) emptyStateMsg.style.display = 'none';

        templatesToRender.forEach(tpl => {
            const card = document.createElement('div');
            card.className = 'template-card';
            card.setAttribute('data-category', tpl.kategori);

            const igLink = 'https://www.instagram.com/greeting.go?mdxt=Z242bnY5d25pdTVn';

            card.innerHTML = `
                <div class="template-image">
                    <img src="${tpl.thumbnail}" alt="${tpl.nama}">
                </div>
                <div class="template-info">
                    <h2>${tpl.nama}</h2>
                    <span>Kode: ${tpl.kode} | ${tpl.harga}</span>
                    <div style="display: flex; gap: 10px; justify-content: center; margin-top: 10px; flex-wrap: wrap;">
                        <a href="${tpl.linkPreview}" class="template-button" target="_blank">Pratinjau</a>
                        <a href="${igLink}" class="template-button" target="_blank">Pilih Template Ini</a>
                    </div>
                </div>
            `;

            templateContainer.appendChild(card);
        });
    };

    // Ambil data menggunakan Fetch API
    fetch('template.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal memuat data file template.json');
            }
            return response.json();
        })
        .then(data => {
            allTemplates = data;
            renderCards(allTemplates);
        })
        .catch(error => {
            console.error('Error fetching templates:', error);

            if (emptyStateMsg) {
                emptyStateMsg.style.display = 'block';
                emptyStateMsg.textContent = 'Gagal memuat katalog template dari server.';
            }
        });

    // Logika Filter Kategori
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                if (filterValue === 'semua') {
                    renderCards(allTemplates);
                } else {
                    const filtered = allTemplates.filter(
                        tpl => tpl.kategori === filterValue
                    );

                    renderCards(filtered);
                }
            });
        });
    }
    */


    /* ----------------------------------------------------------------------
       SISTEM KATALOG BARU: KHUSUS GAMBAR SOON
       ---------------------------------------------------------------------- */

    // Fungsi untuk membuat kartu SOON
    const renderSoonCard = (tpl) => {
        const card = document.createElement('div');
        card.className = 'template-card template-soon';

        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'template-image';

        const image = document.createElement('img');
        image.src = tpl.thumbnail;
        image.alt = tpl.nama || 'Coming Soon';

        // Menangani jika gambar gagal dimuat
        image.onerror = () => {
            console.error('Gambar gagal dimuat:', tpl.thumbnail);
            image.alt = 'Gambar SOON tidak ditemukan';
        };

        imageWrapper.appendChild(image);
        card.appendChild(imageWrapper);

        templateContainer.appendChild(card);
    };


    // Mengambil data dari file JSON
    fetch('template.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal memuat data file template.json');
            }

            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Format template.json harus berupa array.');
            }

            allTemplates = data;

            // Menghapus kartu yang sebelumnya ada
            templateContainer.querySelectorAll('.template-card')
                .forEach(card => card.remove());

            // Mengambil data yang memiliki status soon
            const soonTemplates = allTemplates.filter(
                tpl => tpl.status === 'soon'
            );

            if (soonTemplates.length === 0) {
                if (emptyStateMsg) {
                    emptyStateMsg.style.display = 'block';
                }
                return;
            }

            if (emptyStateMsg) {
                emptyStateMsg.style.display = 'none';
            }

            // Menampilkan gambar SOON saja
            soonTemplates.forEach(tpl => {
                renderSoonCard(tpl);
            });
        })
        .catch(error => {
            console.error('Error fetching templates:', error);

            if (emptyStateMsg) {
                emptyStateMsg.style.display = 'block';
                emptyStateMsg.textContent =
                    'Gagal memuat katalog template dari server.';
            }
        });
};


/* ==========================================================================
   INISIALISASI SEMUA FUNGSI (Saat DOM Siap)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFAQ();
    initPlaceholders();
    initDynamicTemplates();
});
