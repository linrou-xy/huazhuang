const bagCount = document.querySelector(".bag-count");
const toast = document.querySelector(".toast");
let bagItems = Number(sessionStorage.getItem("lune-bag") || 0);

const updateBag = () => {
  if (bagCount) bagCount.textContent = String(bagItems);
};

document.querySelectorAll(".add-bag").forEach((button) => {
  button.addEventListener("click", () => {
    const quantity = Number(document.querySelector("#quantity")?.value || 1);
    bagItems += quantity;
    sessionStorage.setItem("lune-bag", String(bagItems));
    updateBag();
    toast?.classList.add("show");
    window.setTimeout(() => toast?.classList.remove("show"), 1800);
  });
});

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#beauty-search");
const productCards = [...document.querySelectorAll(".product-card")];
const emptyState = document.querySelector(".empty-state");

searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;
  productCards.forEach((card) => {
    const matched = card.dataset.name.toLowerCase().includes(keyword);
    card.hidden = !matched;
    if (matched) visibleCount += 1;
  });
  if (emptyState) emptyState.hidden = visibleCount !== 0;
});

document.querySelectorAll(".size-options button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".size-options button")
      .forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});

document.querySelectorAll(".quantity button").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.querySelector("#quantity");
    if (!input) return;
    const nextValue =
      button.dataset.action === "plus"
        ? Number(input.value) + 1
        : Number(input.value) - 1;
    input.value = String(Math.min(9, Math.max(1, nextValue)));
  });
});

document
  .querySelector(".newsletter form")
  ?.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector("button");
    button.textContent = "订阅成功";
  });

updateBag();
