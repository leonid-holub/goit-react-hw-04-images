export function smoothScroll() {
  const height = window.innerHeight;
  window.scrollBy({
    top: height,
    behavior: 'smooth',
  });
}
