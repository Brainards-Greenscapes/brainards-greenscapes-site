// Before / After compare slider
(function () {
  const compare = document.querySelector("#about-compare-500 .cs-compare");
  if (!compare) return;

  const range = compare.querySelector(".cs-compare-range");
  if (!range) return;

  function update(val) {
    compare.style.setProperty("--pos", val + "%");
  }

  range.addEventListener("input", function () {
    update(this.value);
  });

  // Touch support
  let dragging = false;
  compare.addEventListener("pointerdown", function (e) {
    if (e.target === range) return;
    dragging = true;
    move(e);
  });
  document.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    move(e);
  });
  document.addEventListener("pointerup", function () {
    dragging = false;
  });

  function move(e) {
    const rect = compare.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    x = Math.max(0, Math.min(100, x));
    range.value = x;
    update(x);
  }
})();
