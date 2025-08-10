// Select elements
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterButtons = document.querySelectorAll('.filter-btn');

// All gallery items
let galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

let currentIndex = 0;

// Show lightbox with image at given index
function showLightbox(index) {
  currentIndex = index;
  const img = galleryItems[currentIndex].querySelector('img');
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
  lightbox.classList.add('active');
}

// Hide lightbox
function hideLightbox() {
  lightbox.classList.remove('active');
}

// Show next image
function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  showLightbox(currentIndex);
}

// Show previous image
function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  showLightbox(currentIndex);
}

// Click on gallery item opens lightbox
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    showLightbox(index);
  });
});

// Event listeners for lightbox buttons
closeBtn.addEventListener('click', hideLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Close lightbox on clicking outside image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    hideLightbox();
  }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'Escape') hideLightbox();
});

// Filtering images by category
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all buttons
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    if (filter === 'all') {
      galleryItems.forEach(item => item.style.display = 'block');
    } else {
      galleryItems.forEach(item => {
        if (item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }

    // Refresh galleryItems array to only visible items for lightbox navigation
    galleryItems = Array.from(document.querySelectorAll('.gallery-item')).filter(item => item.style.display !== 'none');
  });
});
