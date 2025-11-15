document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // === DATA PRODUK ===
  const products = {
     "rose-harmony": { name: "Rose Harmony", price: "Rp. 250.000", desc: "Rangkaian mawar merah muda segar...", img: "https://i.pinimg.com/1200x/68/a1/48/68a14894f37c6659176c61a20a57bb0d.jpg" },
    "lily-blossom": { name: "Lily Blossom", price: "Rp. 275.000", desc: "Lily putih elegan dengan aroma menenangkan...", img: "https://i.pinimg.com/736x/99/e2/ab/99e2ab5199035c32e4a4b1f564e76d0c.jpg" },
    "tulip-delight": { name: "Tulip Delight", price: "Rp. 300.000", desc: "Tulip lembut berwarna pastel...", img: "https://i.pinimg.com/736x/bd/6a/ec/bd6aec14520f3b5763ac221063db719e.jpg" },
    "peony-grace": { name: "Peony Grace", price: "Rp. 285.000", desc: "Peony pink cantik melambangkan kasih...", img: "https://i.pinimg.com/736x/84/86/2b/84862b87ef673479e8487f2dd549c75e.jpg" },
    "sunflower-joy": { name: "Sunflower Joy", price: "Rp. 260.000", desc: "Keceriaan bunga matahari yang hangat...", img: "https://i.pinimg.com/1200x/93/ab/8c/93ab8c4747d23016d3b6cbc1194c0a63.jpg" },
    "daisy-charm": { name: "Daisy Charm", price: "Rp. 230.000", desc: "Rangkaian bunga daisy putih yang sederhana...", img: "https://i.pinimg.com/736x/1e/df/fb/1edffbba617cbfe9c3576aead8e823ee.jpg" },
    "orchid-dream": { name: "Orchid Dream", price: "Rp. 350.000", desc: "Orchid elegan dengan sentuhan pastel...", img: "https://i.pinimg.com/1200x/14/2f/b2/142fb23313806b79364dd24c19447b8a.jpg" },
    "morning-dew": { name: "Morning Dew", price: "Rp. 260.000", desc: "Segar seperti embun pagi...", img: "https://i.pinimg.com/736x/d5/6d/23/d56d2305d1527fa33896572a2b18427c.jpg" },
    "cherry-petal": { name: "Cherry Petal", price: "Rp. 255.000", desc: "Terinspirasi kelopak sakura...", img: "https://i.pinimg.com/736x/e1/0b/ba/e10bbada0ece4c4c753717fe8b164f92.jpg" },
    "garden-kiss": { name: "Garden Kiss", price: "Rp. 330.000", desc: "Warna cerah seperti taman musim semi...", img: "https://i.pinimg.com/736x/1f/56/0c/1f560c0c5d32f995047c2385301f2cb9.jpg" },
    "magnolia-dream": { name: "Magnolia Dream", price: "Rp. 340.000", desc: "Keanggunan alami dan kemurnian hati.", img: "https://i.pinimg.com/1200x/c3/03/a4/c303a4f2e6ece3bbc1261debdff048ed.jpg" },
    "sweet-pea": { name: "Sweet Pea", price: "Rp. 265.000", desc: "Manis dan menawan...", img: "https://i.pinimg.com/1200x/72/db/e4/72dbe498c634f83740944007f3a342eb.jpg" },
    "spring-waltz": { name: "Spring Waltz", price: "Rp. 295.000", desc: "Tarian lembut bunga musim semi.", img: "https://i.pinimg.com/736x/7f/ac/b2/7facb2844c9179a9cd21f651e662233f.jpg" },
    "evening-charm": { name: "Evening Charm", price: "Rp. 310.000", desc: "Menawan seperti senja yang hangat.", img: "https://i.pinimg.com/1200x/7c/e7/77/7ce777fc884d61cb2bdb9b70c7e2b407.jpg" },
    "peach-blossom": { name: "Peach Blossom", price: "Rp. 280.000", desc: "Ketulusan yang manis dan elegan.", img: "https://i.pinimg.com/1200x/3f/2e/13/3f2e131e40a21ee150c3dc15b1aeb0c3.jpg" }
  };

  const product = products[id];
  if (!product) return;

  // === MASUKIN DATA PRODUK KE HALAMAN ===
  document.querySelector(".product-info h2").textContent = product.name;
  document.querySelector(".price").textContent = product.price;
  document.querySelector(".desc").textContent = product.desc;
  document.querySelector(".product-image img").src = product.img;

  // === SIMPAN DETAIL (GLOBAL, 1 DATA AJA) ===
  function saveDetails() {
  const form = document.querySelector(".delivery-form");
  const msgForm = document.querySelector(".message-form");
  const orderNote = document.querySelector(".notes textarea")?.value || ""; 

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

    const price = parseInt(product.price.replace(/[^\d]/g, ""));
    const img = product.img;
    const name = product.name;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ id, name, price, img, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} berhasil ditambahkan ke keranjang 🌸`);
    window.location.href = "cart.html";
  });
});