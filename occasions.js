console.log("✅ JavaScript jalan!");

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "all";

  const grid = document.getElementById("product-grid");
  const title = document.getElementById("category-title");
  const desc = document.getElementById("category-desc");
  const sortSelect = document.getElementById("sort");

  const products = [
    { name: "Sunflower Joy", price: 260000, category: "birthday", img: "https://i.pinimg.com/1200x/93/ab/8c/93ab8c4747d23016d3b6cbc1194c0a63.jpg", sold: 80 },
    { name: "Daisy Charm", price: 230000, category: "birthday", img: "https://i.pinimg.com/736x/1e/df/fb/1edffbba617cbfe9c3576aead8e823ee.jpg", sold: 95 },
    { name: "Cherry Petal", price: 255000, category: "justbecause", img: "https://i.pinimg.com/736x/e1/0b/ba/e10bbada0ece4c4c753717fe8b164f92.jpg", sold: 40 },
    { name: "Peony Grace", price: 285000, category: "anniversary", img: "https://i.pinimg.com/736x/84/86/2b/84862b87ef673479e8487f2dd549c75e.jpg", sold: 110 },
    { name: "Magnolia Dream", price: 340000, category: "graduation", img: "https://i.pinimg.com/1200x/c3/03/a4/c303a4f2e6ece3bbc1261debdff048ed.jpg", sold: 70 },
    { name: "Rose Harmony", price: 250000, category: "mothersday", img: "//i.pinimg.com/1200x/68/a1/48/68a14894f37c6659176c61a20a57bb0d.jpg", sold: 90 },
    { name: "Lily Blossom", price: 275000, category: "mothersday", img: "https://i.pinimg.com/736x/99/e2/ab/99e2ab5199035c32e4a4b1f564e76d0c.jpg", sold: 100 },
    { name: "Tulip Delight", price: 300000, category: "graduation", img: "https://i.pinimg.com/736x/bd/6a/ec/bd6aec14520f3b5763ac221063db719e.jpg", sold: 60},
    { name: "Orchid Dream", price: 350000, category:"justbecause", img: "https://i.pinimg.com/1200x/14/2f/b2/142fb23313806b79364dd24c19447b8a.jpg", sold: 30},
    { name: "Garden Kiss", price: 330000, category:"birthday", img: "https://i.pinimg.com/736x/1f/56/0c/1f560c0c5d32f995047c2385301f2cb9.jpg", sold: 40},
    { name: "Magnolia Dream", price: 340000, category:"justbecause", img: "https://i.pinimg.com/1200x/c3/03/a4/c303a4f2e6ece3bbc1261debdff048ed.jpg", sold: 50},
    { name: "Sweet Pea", price: 265000, category:"anniversary", img: "https://i.pinimg.com/1200x/72/db/e4/72dbe498c634f83740944007f3a342eb.jpg", sold: 50},
    { name: "Spring Waltz", price: 295000, category:"anniversary", img: "https://i.pinimg.com/736x/7f/ac/b2/7facb2844c9179a9cd21f651e662233f.jpg", sold: 80},
    { name: "Evening Charm", price: 310000, category:"graduation", img:"https://i.pinimg.com/1200x/7c/e7/77/7ce777fc884d61cb2bdb9b70c7e2b407.jpg", sold: 90},
    { name: "Peach Blossom", price: 280000, category:"mothersday", img:"https://i.pinimg.com/1200x/3f/2e/13/3f2e131e40a21ee150c3dc15b1aeb0c3.jpg", sold: 45}
  ];

  const categoryTexts = {
    birthday: { title: "BIRTHDAY FLOWERS", desc: "Rayakan ulang tahunmu dengan bunga cantik 🎂"},
    justbecause: { title: "JUST BECAUSE", desc: "Bunga yang dikirim tanpa alasan, tapi tetap penuh cinta 💐" },
    mothersday: { title: "MOTHER’S DAY", desc: "Bunga lembut penuh kasih untuk ibu tercinta 🌷" },
    anniversary: { title: "ANNIVERSARY", desc: "Rayakan momen cinta abadi dengan bunga spesial 💞" },
    graduation: { title: "GRADUATION", desc: "Bunga untuk merayakan pencapaian dan semangat baru 🎓" },
    all: { title: "ALL OCCASIONS", desc: "Temukan bunga terbaik untuk berbagai momen spesial 🌸" },
  };

  title.textContent = categoryTexts[category]?.title || "All Occasions";
  desc.textContent = categoryTexts[category]?.desc || "Temukan bunga terbaik untuk berbagai momen spesial 🌸";

  let filtered = category === "all" ? products : products.filter(p => p.category === category);

  function renderProducts(list) {
  grid.innerHTML = list.map(p => `
    <a href="product-detail.html?id=${encodeURIComponent(p.name.toLowerCase().replace(/\s+/g, '-'))}" class="product-card">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">Rp. ${p.price.toLocaleString("id-ID")}</p>
    </a>
  `).join("");
}

  renderProducts(filtered);

  sortSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val === "lowest") filtered.sort((a,b) => a.price - b.price);
    if (val === "highest") filtered.sort((a,b) => b.price - a.price);
    if (val === "bestselling") filtered.sort((a,b) => b.sold - a.sold);
    renderProducts(filtered);
  });
});