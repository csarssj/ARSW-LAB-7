# ARSW-LAB-6
## Manual de usuario

Si se deseea hacer uso del programa lo primero que debe realizarse el clonar el repositorio almacenado en Github a través del siguiente comando:

```
git clone https://github.com/csarssj/ARSW-LAB-4.git

```
O si desea puede descargarlo como archivo zip y luego descomprimirlo en la carpeta que desee.

Una vez hecho alguno de los dos pasos anteriores, nos dirigimos a la ruta de instalación y por medio de la consola digitamos el siguiente comando para compilar:

```
mvnw package
```
y para ejecutar las dos partes ingresamos :
 
 * Con Maven:
 	```
	mvn clean compile
	$ mvn spring-boot:run
	```
## Heavy client - Cinema Book System II

### Descripción 

	![image](https://github.com/csarssj/ARSW-LAB-6/blob/master/img/1.png)
	
Se desea generar una pequeña interfaz de administrador para el sistema de gestión de compra/reserva de boletos de cine. Para efectos prácticos del ejercicio se creará un espacio en la misma pantalla destinado para esto, tal y como se ve en el mock provisto.
1. Agregue el campo de entrada para editar el horario de la función y el botón 'Save/Update'. Respetando la arquitectura de módulos actual del cliente, haga que al oprimirse el botón:
	* Se haga PUT al API, con la función actualizada, en su recurso REST correspondiente.
	* Se haga GET al recurso /cinemas/{name}/{date}, para actualizar el listado de las funciones del cine y de la fecha previamente seleccionados.
Para lo anterior tenga en cuenta:
	- jQuery no tiene funciones para peticiones PUT o DELETE, por lo que es necesario 'configurarlas' manualmente a través de su API para AJAX. Por ejemplo, para hacer una peticion PUT a un recurso /myrecurso:
	
	
	```javascript
	var updateAndSave =  function () {
			setHour(date.split(" ")[0]+" "+$("#fhour").val());
			currentCinema.date=hour;
			if (cine != ""){
				
					api.updateFunction(cine,currentCinema).then(
					function () {
						getFunctionsByCinemaAndDateAndMovie(date,movie);
					})
			}
			getFunctionsByCinemaAndDate(cine,date);
		};
	```
	```javascript
	var updateFunction= function (cinema_name,Function) {
                var put=$.ajax({
                    url:url+"/"+cinema_name,
                    type:'PUT',
                    data:JSON.stringify(Function),
                    contentType: "application/json",
                });
                return put;
        }
	```
2. Agregue el botón 'Create new function', de manera que cuando se oprima:
	* Se borre el canvas actual.
	* Se solicite el nombre y género de la película, además de la hora de la nueva función (usted decide la manera de hacerlo). Se tendrá en cuenta el nombre del cine y la fecha actualmente consultados para asociarles la función.
Esta opción debe cambiar la manera como funciona la opción 'save/update', pues en este caso, al oprimirse la primera vez (es decir cuando se va guardar la nueva función 'save') debe (igualmente, usando promesas):
	1. Hacer POST al recurso /cinemas/{name}, para crear la nueva función.
	2. Hacer GET al respectivo recurso, para actualizar el listado de funciones.
	
	```javascript
	var createFunction = function (cinema_name,Function){
                var create = $.ajax({
                    url:url+"/"+cinema_name,
                    type: 'POST',
                    data: JSON.stringify(Function),
                    contentType: "application/json",
                });
                return create;
        }
	```
	
	![image](https://github.com/csarssj/ARSW-LAB-6/blob/master/img/2.png)
3. Agregue el botón 'DELETE', de manera que (también con promesas):
	* Borre el canvas.
	* Haga DELETE de la función actualmente seleccionada.
	* Haga GET de las funciones ahora disponibles.
	
	```javascript
	var deleteFunction= function(cinema_name,cinema_date,cinema_movie){
                var deleteF = $.ajax({
                    url:url+"/"+cinema_name+"/"+cinema_date+"/"+cinema_movie,
                    type: 'DELETE',
                    data: JSON.stringify(Function),
                    contentType: "application/json",
                });
                return deleteF;
            }
	```
	![image](https://github.com/csarssj/ARSW-LAB-6/blob/master/img/3.png)
	
## Nota
Toca volver a hacer clic en Get Functions para ver los cambios realizados.	

## Authors

[César González](https://github.com/csarssj) 