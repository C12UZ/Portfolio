
/* Back to Top Button */
document.getElementById('backToTopjs').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* Scroll Animation */
document.addEventListener('DOMContentLoaded', function () {
  const title = document.querySelector('.page-title');
  const images = Array.from(document.querySelectorAll('.imgclass'));
  const scrollItems = [title, ...images]; // Title first, then images
  let currentIndex = 0;
  let isScrolling = false;

  function scrollToItem(index) {
    if (scrollItems[index]) {
      isScrolling = true;
      scrollItems[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => { isScrolling = false; }, 700);
    }
  }

  function getCurrentIndex() {
    let minDistance = Infinity;
    let index = 0;
    scrollItems.forEach((item, i) => {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
      if (distance < minDistance) {
        minDistance = distance;
        index = i;
      }
    });
    return index;
  }

  window.addEventListener('wheel', function (e) {
    if (isScrolling) return;
    e.preventDefault();
    currentIndex = getCurrentIndex();
    if (e.deltaY > 0 && currentIndex < scrollItems.length - 1) {
      currentIndex++;
      scrollToItem(currentIndex);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      currentIndex--;
      scrollToItem(currentIndex);
    }
  }, { passive: false });

  window.addEventListener('keydown', function (e) {
    if (isScrolling) return;
    currentIndex = getCurrentIndex();
    if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentIndex < scrollItems.length - 1) {
      e.preventDefault();
      currentIndex++;
      scrollToItem(currentIndex);
    } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentIndex > 0) {
      e.preventDefault();
      currentIndex--;
      scrollToItem(currentIndex);
    }
  });
});