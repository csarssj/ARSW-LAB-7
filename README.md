# ARSW-LAB-7
## Manual de usuario

Si se deseea hacer uso del programa lo primero que debe realizarse el clonar el repositorio almacenado en Github a través del siguiente comando:

```
git clone https://github.com/csarssj/ARSW-LAB-7.git

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
## STOMP - Cinema Books

### Descripción 

Este ejercicio se basa en la documentación oficial de SpringBoot, para el manejo de WebSockets con STOMP.
En este repositorio se encuentra una aplicación SpringBoot que está configurado como Broker de mensajes, de forma similar a lo mostrado en la siguiente figura:

	![image](https://github.com/csarssj/ARSW-LAB-7/blob/master/img/1.png)
	
En este caso, el manejador de mensajes asociado a "/app" aún no está configurado, pero sí lo está el broker '/topic'. Como mensaje, se usarán localizaciones de pantalla, pues se espera que esta aplicación permita propagar eventos de compra de asientos seleccionando en el canvas el asiento deseado. Este proyecto parte como continuación a el proyecto de compra/reserva de tickets.

## Parte 1

1. Para las partes I y II, usted va a implementar una herramienta que permita integrarse al proyecto de el proyecto de compra/reserva de tickets, basada en el siguiente diagrama de actividades:
	
	
	![image](https://github.com/csarssj/ARSW-LAB-7/blob/master/img/2.png)
	
Para esto, realice lo siguiente:
1. Agregue en la parte inferior del canvas dos campos para la captura de las posiciones de los asientos a comprar (row, col), y un botón 'Buy ticket' para hacer efectiva la compra
2. Haga que la aplicación HTML5/JS al ingresarle en los campos de row y col y oprimir el botón, si el asiento está disponible, los publique en el tópico: /topic/buyticket . Para esto tenga en cuenta (1) usar el cliente STOMP creado en el módulo de JavaScript y (2) enviar la representación textual del objeto JSON (usar JSON.stringify). Por ejemplo:
	
	
	```javascript
	var verifyAvailability = function (row,col) {
        var st = new Seat(row, col);
        if (currentCinema.seats[row][col]===true){
            currentCinema.seats[row][col]=false;
            //seat=false;
            console.info("purchased ticket");
            stompClient.send("/topic/buyticket", {}, JSON.stringify(st))
        }
	}
	```
3. Dentro del módulo JavaScript modifique la función de conexión/suscripción al WebSocket, para que la aplicación se suscriba al tópico "/topic/buyticket" (en lugar del tópico /TOPICOXX). Asocie como 'callback' de este suscriptor una función que muestre en un mensaje de alerta (alert()) el evento recibido. Como se sabe que en el tópico indicado se publicarán sólo ubicaciones de asientos, extraiga el contenido enviado con el evento (objeto JavaScript en versión de texto), conviértalo en objeto JSON, y extraiga de éste sus propiedades (row y col). Para extraer el contenido del evento use la propiedad 'body' del mismo, y para convertirlo en objeto, use JSON.parse. Por ejemplo:
	
	```javascript
	var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/buyticket.', function (message) {
               alert("evento recibido");
               var theObject = JSON.parse(message.body);

            });
        });
    };
	```
4. Compile y ejecute su aplicación. Abra la aplicación en varias pestañas diferentes (para evitar problemas con el caché del navegador, use el modo 'incógnito' en cada prueba).
5. Ingrese a una función, ingrese los datos, ejecute la acción del botón, y verifique que en todas la pestañas se haya lanzado la alerta con los datos ingresados.
6. Haga commit de lo realizado, para demarcar el avance de la parte 2.
	
	![image](https://github.com/csarssj/ARSW-LAB-6/blob/master/img/3.png)
	![image](https://github.com/csarssj/ARSW-LAB-7/blob/master/img/4.png)

## Parte II

Para hacer mas útil la aplicación, en lugar de capturar las coordenadas con campos de formulario, las va a capturar a través de eventos sobre el elemento de tipo <canvas>. De la misma manera, en lugar de simplemente mostrar las coordenadas enviadas en los eventos a través de 'alertas', va a cambiar el color de dichos asientos en el canvas simulando la compra de los mismos.

1. Haga que el 'callback' asociado al tópico /topic/buyticket en lugar de mostrar una alerta, cambie de color a rojo el asiento en el canvas en la ubicación fila - columna enviadas con los eventos recibidos.
2. Haga uso del método 'getMousePosition' provisto y agregue al canvas de la página un manejador de eventos que permita capturar los 'clicks' realizados, bien sea a través del mouse, o a través de una pantalla táctil.
3. Elimine los inputs de entrada de "row" y "col" y agregue lo que haga falta en sus módulos para que cuando se capturen nuevos 'clicks' en el canvas: (si no se ha seleccionado un canvas NO se debe hacer nada):
	* Se calcule de acuerdo a las coordenadas del canvas y a la ubicación de los asientos, la fila y la columna del asiento sobre el cual se dio 'click'.
	* Cambie la funcionalidad del botón 'Buy Ticket' para que ahora cuando se oprima habilite el EventListener de los clicks sobre el canvas.
	* Utilice las coordenadas sobre las cuales el usuario dio click para identificar el asiento y, si el asiento está disponible realizar la compra del mismo y publique las ubicaciones en el tópico: /topic/buyticket, (Por ahora solo modificando los asientos del js).
	
	```javascript
	var getMousePosition = function (evt) {
        $('#myCanvas').click(function (e) {
            var rect = myCanvas.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            console.info(x);
            console.info(y);
            calcSeat(x,y);
        });
    };
	```
	
	```javascript
	var calcSeat = function(row,col){
        if(!(row >= 20 && row <= 480 && col >= 120 && col <= 380)){
            alert("tiene que seleccionar una silla");
        }else{
            var row1 = 5;
            var col1 = 0;
            var enviar = false;
            for (var i = 0; i < seats.length; i++) {
                row1++;
                col1 = 0;
                for (j = 0; j < seats[i].length; j++) {
                    if(seats[i][j]){
                        if(row1*20 <= col && (row1*20)+20 >= col){
                            if(((col1+1)*20<=row && ((col1+1)*20)+20) >= row){
                                verifyAvailability(i,j);
                            }
                        }
                        col1++;
                        col1++;
                    }
                }
                row1++;
            }

        }
    };
	```
	
	```javascript
	var verifyAvailability = function (row,col) {
        var st = new Seat(row, col);
        if (seats[row][col]===true){
            seats[row][col]=false;
            console.info("purchased ticket");
            stompClient.send("/topic/buyticket", {}, JSON.stringify(st));
            
        }
        else{
            console.info("Ticket not available");
        }  
        //caclSeats(row,col);
        drawSeats();
    };
	```
4. Ejecute su aplicación en varios navegadores (y si puede en varios computadores, accediendo a la aplicación mendiante la IP donde corre el servidor). Compruebe que a medida que selecciona un asiento (es decir realiza la compra del mismo ahora sin necesidad del botón), la compra del mismo es replicada en todas las instancias abiertas de la aplicación (el color de las sillas verdes disponibles debe cambiar a rojo).
5. Haga commit de lo realizado, para marcar el avance de la parte 2.

	
## Nota
Toca volver a hacer clic en Get Functions para ver los cambios realizados.	

## Authors

[César González](https://github.com/csarssj) 