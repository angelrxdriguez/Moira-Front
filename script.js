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