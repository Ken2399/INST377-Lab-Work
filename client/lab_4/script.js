let slidePosition = 0;
const slides = document.querySelectorAll('carousel__item');
const totalSlides = slides.length;

function updateSlidePosition() {
  for (const slide of slides) {
    slide.classList.remove('carousel_item--visible');
    slide.classList.add('carousel_item--hidden');
  }

  slides[slidePosition].classList.add('carousel_item--visible');
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition += 1;
  }

  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition -= 1;
  }
  updateSlidePosition();
}

document.querySelector('carousel_button--next').addEventListener('click', () => {
  moveToNextSlide();
});
document.querySelector('carousel_button--prev').addEventListener('click', () => {
  moveToPrevSlide();
});