$(document).ready(function () {
  // Mostrar modal al hacer clic
  $(document).on('click', '.crearoferta', function () {
    const modal = new bootstrap.Modal(document.getElementById('modalCrearOferta'));
    modal.show();
  });

  // Conexión al backend
  fetch('https://moira-back.vercel.app/api')
    .then(response => response.json())
    .then(data => {
      console.log('Conexión exitosa:', data);
      document.getElementById('resultado').textContent = 'Conectado con el backend';
    })
    .catch(error => {
      console.error('Error al conectar con el backend:', error);
      document.getElementById('resultado').textContent = 'Error de conexión';
    });

  // Crear usuario
  $('.form-sesion').on('submit', function (e) {
    e.preventDefault();

    const usuario = $('#usuario').val();
    const email = $('#email').val();
    const contra = $('#contra').val();
    const repiteContra = $('#repiteContra').val();

    if (contra !== repiteContra) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const fechaNacimiento = $('#fechaNacimiento').val();

    $.ajax({
      url: 'https://moira-back.vercel.app/api/registrar',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ usuario, email, contra, fechaNacimiento }),
      success: function (response) {
        alert('Usuario registrado con éxito');
        window.location.href = 'sesion.html';
      },
      error: function (xhr) {
        const errorMsg = xhr.responseJSON?.message || 'Error al registrar';
        alert(errorMsg);
      }
    });
  });
//TEMAS Y SUBTEMAS
  const temaSelect = $('#tema');
  const subtemaSelect = $('#subtema');
  let temasData = [];

  // Obtener los temas y subtemas desde la API usando jQuery AJAX
  $.ajax({
    url: 'https://moira-back.vercel.app/api/tiposOfertas',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      temasData = data;

      temaSelect.append('<option selected disabled>Selecciona un tema</option>');
      data.forEach(function (item) {
        temaSelect.append(`<option value="${item.tema}">${item.tema}</option>`);
      });
    },
    error: function (xhr, status, error) {
      console.error('Error al cargar tipos de oferta:', error);
      temaSelect.append('<option disabled>Error al cargar temas</option>');
    }
  });
  // Manejar cambio en el select de temas
  temaSelect.on('change', function () {
    const temaSeleccionado = $(this).val();
    const temaObj = temasData.find(t => t.tema === temaSeleccionado);

    subtemaSelect.empty();
    if (temaObj && Array.isArray(temaObj.subtemas)) {
      subtemaSelect.append('<option selected disabled>Selecciona un subtema</option>');
      temaObj.subtemas.forEach(function (sub) {
        subtemaSelect.append(`<option value="${sub}">${sub}</option>`);
      });
    } else {
      subtemaSelect.append('<option disabled>No hay subtemas disponibles</option>');
    }
  });
  //UBICACIONES
  const $comunidad = $('#comunidad');
  const $provincia = $('#provincia');
  const $ciudad = $('#ciudad');

  $.getJSON('https://moira-back.vercel.app/api/ubicaciones/comunidades', function (comunidades) {
    $.each(comunidades, function (_, comunidad) {
      $comunidad.append($('<option>', {
        value: comunidad,
        text: comunidad
      }));
    });
  });

  $comunidad.on('change', function () {
    const comunidad = $(this).val();
    $provincia.empty().append('<option value="">Selecciona una provincia</option>').prop('disabled', true);
    $ciudad.empty().append('<option value="">Selecciona una ciudad</option>').prop('disabled', true);

    if (comunidad) {
      $.getJSON(`https://moira-back.vercel.app/api/ubicaciones/provincias/${encodeURIComponent(comunidad)}`, function (provincias) {
        $.each(provincias, function (_, provincia) {
          $provincia.append($('<option>', {
            value: provincia,
            text: provincia
          }));
        });
        $provincia.prop('disabled', false);
      });
    }
  });

  $provincia.on('change', function () {
    const comunidad = $comunidad.val();
    const provincia = $(this).val();
    $ciudad.empty().append('<option value="">Selecciona una ciudad</option>').prop('disabled', true);

    if (comunidad && provincia) {
      $.getJSON(`https://moira-back.vercel.app/api/ubicaciones/ciudades/${encodeURIComponent(comunidad)}/${encodeURIComponent(provincia)}`, function (ciudades) {
        $.each(ciudades, function (_, ciudad) {
          $ciudad.append($('<option>', {
            value: ciudad,
            text: ciudad
          }));
        });
        $ciudad.prop('disabled', false);
      });
    }
  });
});
