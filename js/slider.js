$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: !0,
    margin: 10,
    autoplay: !0,
    smartSpeed: 1e3,
    autoplayTimeout: 6e3,
    dots: !0,
    responsive: {
      0: { items: 1 },
      450: { items: 1 },
      660: { items: 1 },
      1e3: { items: 1 },
    },
  });
});
