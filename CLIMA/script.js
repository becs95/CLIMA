// vamos a programar los botones 

// primer boton hacemos un llamado directo a la pagina con la key 
function consultarClima() {
    const ciudad = document.getElementById('ciudad').value; 
    const API_KEY = '460524d5ed00ad120cb68507999cf830'; // sacamos la key 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`; // llamamos a la pagina de la bdd de clima 

// usamos FETCH 
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la respuesta de la API');
        }
      })

// cargamos los resultado en la tabla DE ABAJO
      .then(data => {
        const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
        const fila = tabla.insertRow();
        fila.insertCell().innerHTML = data.name;
        fila.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
        fila.insertCell().innerHTML = data.weather[0].description;
      })

// parametros si la ciudad o ciudades no existen  

      .catch(error => {
        console.error('Error al consultar el clima', error);
      });
  }

//Creamos la accion para el boton numero 2 el cual puede consultar varias ciudades 
  function consultarClimas() {
    const ciudades = document.getElementById('ciudades').value.split(',').map(ciudad => ciudad.trim());
    const API_KEY = '460524d5ed00ad120cb68507999cf830'; //misma key 
    Promise.all(ciudades.map(ciudad => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`; // llamamos a la misma pagina 
        return fetch(url).then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la respuesta de la API');
          }
        });
      }))
      .then(data => {
        // Mostrar resultados en la tabla
        const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
        data.forEach(ciudad => {
          const fila = tabla.insertRow();
          fila.insertCell().innerHTML = ciudad.name;
          fila.insertCell().innerHTML = `${(ciudad.main.temp - 273.15).toFixed(1)}°C`;
          fila.insertCell().innerHTML = ciudad.weather[0].description;
        });
      })
      .catch(error => {
        console.error('Error al consultar el clima', error);
      });
    }
    
    function limpiarTabla() {
        // Mostrar resultado en la tabla
        const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody');
        for(let i = 0; i<tabla.length; i++)
        {
            tabla[i].innerHTML = "";
        }
  }

