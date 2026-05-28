// Reviews carousel – horizontal scroll with arrow controls
(function () {
  const section = document.getElementById("testimonials-515");
  if (!section) return;

  const track = section.querySelector(".cs-card-group");
  const prev = section.querySelector(".cs-arrow-prev");
  const next = section.querySelector(".cs-arrow-next");
  if (!track) return;

  function getScrollAmount() {
    const card = track.querySelector(".cs-item");
    if (!card) return 300;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 20;
    return card.offsetWidth + gap;
  }

  function updateButtons() {
    if (!prev || !next) return;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft + track.offsetWidth >= track.scrollWidth - 1;
  }

  if (prev) {
    prev.addEventListener("click", function () {
      track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });
  }
  if (next) {
    next.addEventListener("click", function () {
      track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });
  }

  track.addEventListener("scroll", updateButtons, { passive: true });
  updateButtons();
})();
