document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const product = await fetchProduct(productId);
  displayProductDetail(product);
});

async function fetchProduct(productId) {
  try {
    const response = await fetch(
      `https://cars-pagination.onrender.com/products/${productId}`
    );
    if (!response.ok) {
      throw new Error("Mahsulotni topishda xatolik yuz berdi.");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Mahsulotni olishda xatolik yuz berdi:", error.message);
  }
}

function displayProductDetail(product) {
  const productDetailContainer = document.getElementById(
    "product-detail-container"
  );
  if (!product) {
    productDetailContainer.innerHTML = "<p>Mahsulot topilmadi.</p>";
    return;
  }
  const discountPrice = product.newPrice * 0.9;

  productDetailContainer.innerHTML = `
  <div class="back-button-container">
    <img class="images item-detils" src="${product.image}" alt="${
    product.name
  }">
    <div class="price item-detils">
    <h3 class="item-detils" >${product.name}</h3>

    Narx: $${product.newPrice.toFixed(2)}
    <div class="discount-price item-detils">Chegirma narxi: $${discountPrice.toFixed()}
    <div class=" item-detils">Kategoriya: ${product.category}
    <div class=" item-detils">
      Reyting: ${product.star} 
      <div class=" item-detils">
        ${"★".repeat(Math.round(product.star))}
        ${"☆".repeat(5 - Math.round(product.star))}
      
    
    
    <p class="item-detils">Holat: ${product.status}</p>
    <button class="btn-detail item-detils" onclick="addToCart(${
      product.id
    })">КОРЗИНКА</button>
    </div>
    
    
  `;
}

function goToCart() {
  window.location.href = "cart.html";
}

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Mahsulot savatchaga qo'shildi!");
}
