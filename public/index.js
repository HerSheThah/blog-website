document.addEventListener("DOMContentLoaded", function(){
  window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        document.getElementById('navbar_top').classList.add('sticky-top');
      } else {
        document.getElementById('navbar_top').classList.remove('sticky-top');
      }
  });
});
