document.getElementById('backToTopjs').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('backToTopjs').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

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

  window.addEventListener('wheel', function (e) {
    if (isScrolling) return;
    e.preventDefault();
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

    let touchStartY = null;

  window.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
    }
  });

  window.addEventListener('touchend', function(e) {
    if (touchStartY === null || isScrolling) return;
    let touchEndY = e.changedTouches[0].clientY;
    let deltaY = touchStartY - touchEndY;
    // Threshold to prevent accidental scrolls
    if (deltaY > 40 && currentIndex < scrollItems.length - 1) {
      currentIndex++;
      scrollToItem(currentIndex);
    } else if (deltaY < -40 && currentIndex > 0) {
      currentIndex--;
      scrollToItem(currentIndex);
    }
    touchStartY = null;
  });

  // Start at the title
  scrollToItem(currentIndex);
});