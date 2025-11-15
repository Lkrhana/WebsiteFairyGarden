document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // === DEFAULT PRODUCTS ===
 const defaultProducts = [
    { id: "rose-harmony", name: "Rose Harmony", price: 250000, category: "mothersday", img: "https://i.pinimg.com/1200x/68/a1/48/68a14894f37c6659176c61a20a57bb0d.jpg", desc: "Rangkaian mawar merah muda segar...", sold: 90, stock: 15 },
    { id: "lily-blossom", name: "Lily Blossom", price: 275000, category: "mothersday", img: "https://i.pinimg.com/736x/99/e2/ab/99e2ab5199035c32e4a4b1f564e76d0c.jpg", desc: "Lily putih elegan dengan aroma menenangkan...", sold: 100, stock: 20 },
    { id: "tulip-delight", name: "Tulip Delight", price: 300000, category: "graduation", img: "https://i.pinimg.com/736x/bd/6a/ec/bd6aec14520f3b5763ac221063db719e.jpg", desc: "Tulip lembut berwarna pastel...", sold: 60, stock: 12 },
    { id: "peony-grace", name: "Peony Grace", price: 285000, category: "anniversary", img: "https://i.pinimg.com/736x/84/86/2b/84862b87ef673479e8487f2dd549c75e.jpg", desc: "Peony pink cantik melambangkan kasih...", sold: 110, stock: 18 },
    { id: "sunflower-joy", name: "Sunflower Joy", price: 260000, category: "birthday", img: "https://i.pinimg.com/1200x/93/ab/8c/93ab8c4747d23016d3b6cbc1194c0a63.jpg", desc: "Keceriaan bunga matahari yang hangat...", sold: 80, stock: 25 },
    { id: "daisy-charm", name: "Daisy Charm", price: 230000, category: "birthday", img: "https://i.pinimg.com/736x/1e/df/fb/1edffbba617cbfe9c3576aead8e823ee.jpg", desc: "Rangkaian bunga daisy putih yang sederhana...", sold: 95, stock: 30 },
    { id: "orchid-dream", name: "Orchid Dream", price: 350000, category: "justbecause", img: "https://i.pinimg.com/1200x/14/2f/b2/142fb23313806b79364dd24c19447b8a.jpg", desc: "Orchid elegan dengan sentuhan pastel...", sold: 30, stock: 10 },
    { id: "carnation-bliss", name: "Carnation Bliss", price: 240000, category: "mothersday", img: "https://i.pinimg.com/1200x/9e/71/1e/9e711e33e43ad8a805459c941bd8ff01.jpg", desc: "Rangkaian bunga anyelir lembut...", sold: 70, stock: 22 },
    { id: "lavender-love", name: "Lavender Love", price: 290000, category: "justbecause", img: "https://i.pinimg.com/736x/7c/ab/1c/7cab1c081e2211b0af3f765c540b3e78.jpg", desc: "Aroma lavender yang menenangkan...", sold: 50, stock: 15 },
    { id: "blossom-mist", name: "Blossom Mist", price: 320000, category: "anniversary", img: "https://i.pinimg.com/1200x/78/a3/c6/78a3c641f7d072737f7863a717dceffb.jpg", desc: "Seperti kabut bunga di pagi hari...", sold: 45, stock: 10 },
    { id: "amber-bloom", name: "Amber Bloom", price: 310000, category: "graduation", img: "https://i.pinimg.com/736x/49/9d/fb/499dfb1283be3f4302e4abcba2caa7f5.jpg", desc: "Kehangatan dalam setiap kelopak...", sold: 40, stock: 12 },
    { id: "jasmine-glow", name: "Jasmine Glow", price: 270000, category: "justbecause", img: "https://i.pinimg.com/1200x/46/46/71/4646713996cc34ab86615629f1b60289.jpg", desc: "Keharuman melati yang klasik...", sold: 60, stock: 20 },
    { id: "morning-dew", name: "Morning Dew", price: 260000, category: "birthday", img: "https://i.pinimg.com/736x/d5/6d/23/d56d2305d1527fa33896572a2b18427c.jpg", desc: "Segar seperti embun pagi...", sold: 70, stock: 18 },
    { id: "cherry-petal", name: "Cherry Petal", price: 255000, category: "justbecause", img: "https://i.pinimg.com/736x/e1/0b/ba/e10bbada0ece4c4c753717fe8b164f92.jpg", desc: "Terinspirasi kelopak sakura...", sold: 40, stock: 25 },
    { id: "garden-kiss", name: "Garden Kiss", price: 330000, category: "birthday", img: "https://i.pinimg.com/736x/1f/56/0c/1f560c0c5d32f995047c2385301f2cb9.jpg", desc: "Warna cerah seperti taman musim semi...", sold: 40, stock: 10 },
    { id: "magnolia-dream", name: "Magnolia Dream", price: 340000, category: "justbecause", img: "https://i.pinimg.com/1200x/c3/03/a4/c303a4f2e6ece3bbc1261debdff048ed.jpg", desc: "Keanggunan alami dan kemurnian hati.", sold: 50, stock: 10 },
    { id: "sweet-pea", name: "Sweet Pea", price: 265000, category: "anniversary", img: "https://i.pinimg.com/1200x/72/db/e4/72dbe498c634f83740944007f3a342eb.jpg", desc: "Manis dan menawan...", sold: 50, stock: 15 },
    { id: "spring-waltz", name: "Spring Waltz", price: 295000, category: "anniversary", img: "https://i.pinimg.com/736x/7f/ac/b2/7facb2844c9179a9cd21f651e662233f.jpg", desc: "Tarian lembut bunga musim semi.", sold: 80, stock: 12 },
    { id: "evening-charm", name: "Evening Charm", price: 310000, category: "graduation", img: "https://i.pinimg.com/1200x/7c/e7/77/7ce777fc884d61cb2bdb9b70c7e2b407.jpg", desc: "Menawan seperti senja yang hangat.", sold: 90, stock: 10 },
    { id: "peach-blossom", name: "Peach Blossom", price: 280000, category: "mothersday", img: "https://i.pinimg.com/1200x/3f/2e/13/3f2e131e40a21ee150c3dc15b1aeb0c3.jpg", desc: "Ketulusan yang manis dan elegan.", sold: 45, stock: 15 }
  ];

  // === GET ADMIN PRODUCTS ===
  const adminProducts = JSON.parse(localStorage.getItem("products")) || [];

  // === MERGE ALL ===
  const allProducts = [...defaultProducts, ...adminProducts];

  // === FIND PRODUCT ===
  const product = allProducts.find(p => p.id === id);

  if (!product) {
    document.querySelector(".product-info").innerHTML = "<h2>Produk tidak ditemukan</h2>";
    return;
  }

  // === RENDER PRODUCT ===
  document.querySelector(".product-image img").src = product.img;
  document.querySelector(".product-info h2").textContent = product.name;
  document.querySelector(".price").textContent =
    "Rp. " + product.price.toLocaleString("id-ID");
  document.querySelector(".desc").textContent = product.desc;

  // === SAVE BUYER DETAILS ===
  function saveDetails() {
    const form = document.querySelector(".delivery-form");
    const msgForm = document.querySelector(".message-form");

    const data = {
      deliveryOption: form.deliveryOption.value,
      deliveryDate: form.deliveryDate.value,
      deliveryTime: form.deliveryTime.value,
      senderName: form.senderName.value,
      senderPhone: form.senderPhone.value,
      msgFrom: msgForm.msgFrom.value,
      msgTo: msgForm.msgTo.value,
      msgText: msgForm.msgText.value
    };

    localStorage.setItem("orderDetails", JSON.stringify(data));
  }

  // === ADD TO CART ===
  const addCartBtn = document.querySelector(".add-cart");

  addCartBtn.addEventListener("click", () => {
    saveDetails();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(c => c.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} berhasil ditambahkan ke keranjang!`);
    window.location.href = "cart.html";
  });

  // === RELATED PRODUCTS ===
  const relatedContainer = document.getElementById("related-products");

  allProducts
    .filter(p => p.id !== product.id)
    .slice(0, 4)
    .forEach(p => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <a href="product-detail.html?id=${p.id}">
          <img src="${p.img}" alt="${p.name}">
          <b>${p.name}</b>
          <div>Rp. ${p.price.toLocaleString("id-ID")}</div>
        </a>`;
      relatedContainer.appendChild(card);
    });

});