document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: "morning-dew", name: "Morning Dew", price: 260000, img: "https://i.pinimg.com/736x/d5/6d/23/d56d2305d1527fa33896572a2b18427c.jpg" },
    { id: "cherry-petal", name: "Cherry Petal", price: 255000, img: "https://i.pinimg.com/736x/e1/0b/ba/e10bbada0ece4c4c753717fe8b164f92.jpg" },
    { id: "garden-kiss", name: "Garden Kiss", price: 300000, img: "https://i.pinimg.com/736x/1f/56/0c/1f560c0c5d32f995047c2385301f2cb9.jpg" },
    { id: "magnolia-dream", name: "Magnolia Dream", price: 340000, img: "https://i.pinimg.com/1200x/c3/03/a4/c303a4f2e6ece3bbc1261debdff048ed.jpg" },
    { id: "sweet-pea", name: "Sweet Pea", price: 265000, img: "https://i.pinimg.com/1200x/72/db/e4/72dbe498c634f83740944007f3a342eb.jpg" },
    { id: "spring-waltz", name: "Spring Waltz", price: 295000, img: "https://i.pinimg.com/736x/7f/ac/b2/7facb2844c9179a9cd21f651e662233f.jpg" },
    { id: "evening-charm", name: "Evening Charm", price: 310000, img: "https://i.pinimg.com/1200x/7c/e7/77/7ce777fc884d61cb2bdb9b70c7e2b407.jpg" },
    { id: "peach-blossom", name: "Peach Blossom", price: 280000, img: "https://i.pinimg.com/1200x/3f/2e/13/3f2e131e40a21ee150c3dc15b1aeb0c3.jpg" },
    { id: "rose-harmony", name: "Rose Harmony",price: 250.000, img: "https://i.pinimg.com/1200x/68/a1/48/68a14894f37c6659176c61a20a57bb0d.jpg" },
    { id: "lily-bloom", name: "Lily Bloom", price: 275.0000, img: "https://i.pinimg.com/736x/99/e2/ab/99e2ab5199035c32e4a4b1f564e76d0c.jpg" },
    { id: "tulip-delight", name: "Tulip Delight", price: 300.000, img: "https://i.pinimg.com/736x/bd/6a/ec/bd6aec14520f3b5763ac221063db719e.jpg" },
    { id: "peony-grace", name: "Peony Grace", price: 285.000, img: "https://i.pinimg.com/736x/84/86/2b/84862b87ef673479e8487f2dd549c75e.jpg" },
    { id: "sunflower-joy", name: "Sunflower Joy", price: 260.000, img: "https://i.pinimg.com/1200x/93/ab/8c/93ab8c4747d23016d3b6cbc1194c0a63.jpg" },
    { id: "daisy-charm", name: "Daisy Charm", price: 230.000, img: "https://i.pinimg.com/736x/1e/df/fb/1edffbba617cbfe9c3576aead8e823ee.jpg"},
    { id: "orchid-dream", name: "Orchid Dream", price: 350.000, img: "https://i.pinimg.com/1200x/14/2f/b2/142fb23313806b79364dd24c19447b8a.jpg"}
  ];

  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q")?.toLowerCase().trim() || "";
  const searchTitle = document.getElementById("searchTitle");
  const searchGrid = document.getElementById("searchGrid");

  const results = products.filter(p =>
    (p.name + " " + p.id).toLowerCase().includes(query)
  );

  if (query) {
    searchTitle.textContent = `${results.length} Results for "${query}"`;
  } else {
    searchTitle.textContent = "No keyword entered.";
  }

  if (results.length > 0) {
    searchGrid.innerHTML = results.map(p => `
      <a href="product-detail.html?id=${p.id}" class="product-card">
        <div class="product-box">
          <img src="${p.img}" alt="${p.name}">
        </div>
        <b>${p.name}</b>
        <div>Rp. ${p.price.toLocaleString("id-ID")}</div>
      </a>
    `).join("");
  } else {
    searchGrid.innerHTML = `<p style="grid-column: 1 / -1;">No results found for "${query}".</p>`;
  }

  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const keyword = searchInput.value.trim();
      if (keyword) {
        window.location.href = `search.html?q=${encodeURIComponent(keyword)}`;
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const keyword = searchInput.value.trim();
        if (keyword) {
          window.location.href = `search.html?q=${encodeURIComponent(keyword)}`;
        }
      }
    });
  }
});