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
  $('.form-sesion').on('submit', function (e) {
  e.preventDefault();

  const usuario = $('#usuario').val();
  const email = $('#email').val();
  const contra = $('#contra').val();
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