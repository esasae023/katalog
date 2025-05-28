const products = [
  {
    title: 'KARU Cokelat',
    category: 'kesehatan',
    description: 'Susu kambing etawa rasa cokelat\nCocok untuk daya tahan tubuh',
    price: 'Rp 75.000',
    image: './assets/KARU-COKELAT.jpeg',
    wa: '6281234567890'
  },
  {
    title: 'KARU Vanila',
    category: 'kesehatan',
    description: 'Susu kambing etawa rasa vanila\nMeningkatkan kekebalan tubuh',
    price: 'Rp 75.000',
    image: './assets/KARU-VANILA.jpeg',
    wa: '6281234567891'
  },
  {
    title: 'SKE Susu Kambing Etawa',
    category: 'rumah',
    description: 'Produk susu kambing murni\nTanpa pemanis buatan',
    price: 'Rp 80.000',
    image: './assets/SKE72-SUSU-KAMBING-ETAWA.jpeg',
    wa: '6281234567892'
  }
];

function renderProducts(filter = "all", search = "") {
  const container = document.getElementById("productGrid");
  container.innerHTML = "";

  products
    .filter(p => (filter === "all" || p.category === filter) && p.title.toLowerCase().includes(search.toLowerCase()))
    .forEach((product, i) => {
      const card = document.createElement("div");
      card.className = "bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col justify-between";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-cover rounded mb-3" />
        <div>
          <h3 class="text-lg font-bold">${product.title}</h3>
          <p class="text-sm mt-1">${product.description.split('\n')[0]}</p>
          <p class="text-green-600 mt-1 font-semibold">${product.price}</p>
        </div>
        <div class="mt-4 flex gap-2">
          <button onclick="openModal(${i})" class="text-blue-600 dark:text-blue-400 underline">Detail</button>
          <a href="https://wa.me/${product.wa}?text=Apakah%20Produk%20${encodeURIComponent(product.title)}%20masih%20ada" target="_blank" class="ml-auto inline-flex items-center px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" class="w-4 h-4 mr-1" alt="WA"/>
            Pesan
          </a>
        </div>
      `;
      container.appendChild(card);
    });
}

function openModal(index) {
  const product = products[index];
  document.getElementById("modalTitle").innerText = product.title;
  document.getElementById("modalDescription").innerText = product.description;
  document.getElementById("modalPrice").innerText = product.price;
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalLink").href = `https://wa.me/${product.wa}?text=Apakah%20Produk%20${encodeURIComponent(product.title)}%20masih%20ada`;
  document.getElementById("productModal").classList.remove("hidden");
  document.getElementById("productModal").classList.add("flex");
}

function closeModal() {
  document.getElementById("productModal").classList.add("hidden");
}

document.getElementById("searchInputMobile").addEventListener("input", (e) => {
  renderProducts(currentCategory, e.target.value);
});

document.getElementById("toggleTheme").onclick = () => {
  document.documentElement.classList.toggle("dark");
};
document.getElementById("mobileToggleTheme").onclick = () => {
  document.documentElement.classList.toggle("dark");
};

document.getElementById("searchInput").addEventListener("input", (e) => {
  renderProducts(currentCategory, e.target.value);
});

let currentCategory = "all";

document.querySelectorAll('[data-category]').forEach(btn => {
  btn.onclick = () => {
    currentCategory = btn.dataset.category;
    renderProducts(currentCategory, document.getElementById("searchInput").value);
  };
});

document.getElementById("categoryToggle").onclick = () => {
  document.getElementById("categoryMenu").classList.toggle("hidden");
};
document.getElementById("mobileCategoryToggle").onclick = () => {
  document.getElementById("mobileCategoryMenu").classList.toggle("hidden");
};

const navToggle = document.getElementById("navToggle");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");

navToggle.addEventListener("click", () => {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");

  const isOpen = !menu.classList.contains("hidden");

  if (isOpen) {
    line1.style.transform = "rotate(45deg)";
    line1.style.top = "14px";

    line2.style.opacity = "0";

    line3.style.transform = "rotate(-45deg)";
    line3.style.top = "14px";
  } else {
    line1.style.transform = "rotate(0)";
    line1.style.top = "8px";

    line2.style.opacity = "1";

    line3.style.transform = "rotate(0)";
    line3.style.top = "20px";
  }
});

// PENTING: Panggil updateThemeIcon() saat halaman dimuat untuk mengatur ikon awal
function updateThemeIcon() {
  // const icon = document.getElementById("themeIcon"); // 'icon' adalah span container
  const sunSvgElement = document.getElementById("sunSvg");
  const moonSvgElement = document.getElementById("moonSvg");

  if (!sunSvgElement || !moonSvgElement) return; // Pastikan elemen SVG ada

  if (document.documentElement.classList.contains("dark")) {
    // Tema Gelap: Tampilkan Bulan, Sembunyikan Matahari
    sunSvgElement.classList.add("hidden"); // Atau sunSvgElement.style.display = "none";
    moonSvgElement.classList.remove("hidden"); // Atau moonSvgElement.style.display = "inline"; // atau "block"
  } else {
    // Tema Terang: Tampilkan Matahari, Sembunyikan Bulan
    sunSvgElement.classList.remove("hidden");
    moonSvgElement.classList.add("hidden");
  }
}

// PENTING: Panggil updateThemeIcon() saat halaman dimuat untuk mengatur ikon awal
updateThemeIcon();

document.getElementById("toggleTheme").onclick = () => {
  document.documentElement.classList.toggle("dark");
  updateThemeIcon();
};

// const mobileThemeIcon = document.getElementById("mobileThemeIcon"); // Ini adalah SPAN WADAH
// Kita akan mengambil SVG di dalamnya atau mereferensikannya langsung

const mobileSunSvgElement = document.getElementById("mobileSunSvg");
const mobileMoonSvgElement = document.getElementById("mobileMoonSvg");

// Fungsi untuk mengatur status ikon awal (PENTING agar ikon sesuai saat halaman dimuat)
function setInitialMobileIcon() {
    if (!mobileSunSvgElement || !mobileMoonSvgElement) return;

    if (document.documentElement.classList.contains("dark")) {
        mobileSunSvgElement.classList.add("hidden");
        mobileMoonSvgElement.classList.remove("hidden");
    } else {
        mobileSunSvgElement.classList.remove("hidden");
        mobileMoonSvgElement.classList.add("hidden");
    }
}

// Panggil fungsi ini sekali saat script dimuat
setInitialMobileIcon();

document.getElementById("mobileToggleTheme").onclick = () => {
    document.documentElement.classList.toggle("dark");

    // Pastikan elemen SVG ada sebelum mengubahnya
    if (!mobileSunSvgElement || !mobileMoonSvgElement) return;

    if (document.documentElement.classList.contains("dark")) {
        // Tema Gelap: Tampilkan Bulan, Sembunyikan Matahari
        mobileSunSvgElement.classList.add("hidden"); // Menggunakan kelas 'hidden' Tailwind
        mobileMoonSvgElement.classList.remove("hidden");
    } else {
        // Tema Terang: Tampilkan Matahari, Sembunyikan Bulan
        mobileSunSvgElement.classList.remove("hidden");
        mobileMoonSvgElement.classList.add("hidden");
    }
};

renderProducts();
