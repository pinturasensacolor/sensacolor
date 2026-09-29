// Sensacolor — menú móvil, carrusel de destacados y formulario a WhatsApp
(function () {
  var boton = document.getElementById('menu-boton');
  var menu = document.getElementById('menu');
  if (boton && menu) {
    boton.addEventListener('click', function () {
      var abierto = menu.classList.toggle('abierto');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { menu.classList.remove('abierto'); boton.setAttribute('aria-expanded', 'false'); }
    });
  }

  var carrusel = document.getElementById('carrusel');
  if (carrusel) {
    var pista = carrusel.querySelector('.pista');
    var total = pista.children.length;
    var actual = 0;
    var puntos = document.getElementById('puntos');
    for (var i = 0; i < total; i++) {
      var p = document.createElement('button');
      p.type = 'button';
      p.setAttribute('aria-label', 'Ir al destacado ' + (i + 1));
      p.addEventListener('click', (function (n) { return function () { ir(n); reiniciar(); }; })(i));
      puntos.appendChild(p);
    }
    function ir(n) {
      actual = (n + total) % total;
      pista.style.transform = 'translateX(-' + actual * 100 + '%)';
      Array.prototype.forEach.call(puntos.children, function (b, k) { b.setAttribute('aria-current', k === actual ? 'true' : 'false'); });
    }
    var reloj = null;
    var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function reiniciar() { if (quieto) return; clearInterval(reloj); reloj = setInterval(function () { ir(actual + 1); }, 6000); }
    carrusel.querySelector('.izq').addEventListener('click', function () { ir(actual - 1); reiniciar(); });
    carrusel.querySelector('.der').addEventListener('click', function () { ir(actual + 1); reiniciar(); });
    ir(0); reiniciar();
  }

  var form = document.getElementById('formulario');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var texto = 'Hola Sensacolor, soy ' + (d.get('nombre') || '') +
        (d.get('ciudad') ? ' (' + d.get('ciudad') + ')' : '') + '.\n' +
        'Producto: ' + d.get('producto') + '\n' +
        (d.get('mensaje') ? d.get('mensaje') : '');
      window.location.href = 'https://wa.me/573209797767?text=' + encodeURIComponent(texto);
    });
  }
})();
