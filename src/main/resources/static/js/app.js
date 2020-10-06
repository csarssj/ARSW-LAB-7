//var api = apimock;
var api = apiclient;
var app = (function (){
    var currentCinema = {
    movie:{
     name: null ,
     genre: null
     },
    seats:[],
    date:null}
	var cine;
	var functions =[];
	var date;
	var hour;
	var movie;
	var newf  = false;
	var c,ctx;
	var seats = [[true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true]];

    class Seat {
        constructor(row, col) {
            this.row = row;
            this.col = col;
        }
    }
    var stompClient = null;

//get the x, y positions of the mouse click relative to the canvas
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
var connectAndSubscribe = function (fun) {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/buyticket.' + fun, function (message) {
               alert("evento recibido");
               var theObject = JSON.parse(message.body);
               verifyAvailability(theObject.row,theObject.col);

            });
        });

    };
    var calcSeat = function(row,col){
        if(!(row >= 20 && row <= 480 && col >= 120 && col <= 380)){
            alert("tiene que seleccionar una silla");
        }else{
            var row1 = 5;
            var col1 = 0;
          //  var enviarX = null;
          //  var enviarY = null;
            console.log(currentCinema.seats);
            for (var i = 0; i < currentCinema.seats.length; i++) {
                row1++;
                col1=0;
                //enviarX =currentCinema.seats.indexOf(x);
                for (j = 0; j < currentCinema.seats[i].length; j++) {
                    //enviarY =x.indexOf(y);
                    if(currentCinema.seats[i][j]){
                        if(row1*20 <= col && (row1*20)+20 >= col){
                            if(((col1+1)*20<=row && ((col1+1)*20)+20) >= row){
                                //console.log(enviarX);
                                //console.log(enviarY);
                                //verifyAvailability(enviarX,enviarY);
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
    var verifyAvailability = function (row,col) {
        var st = new Seat(row, col);
        if (currentCinema.seats[row][col]===true){
            currentCinema.seats[row][col]=false;
            //seat=false;
            console.info("purchased ticket");
            stompClient.send("/app/buyticket."+cine+"."+date+"."+movie, {}, JSON.stringify(st))
        }
        else{
            console.info("Ticket not available");
        }
        //caclSeats(row,col);
        getSeats(currentCinema);
    };
	var _map = function (list){
    	return list.map(function(cinema){
    			return {name:cinema.movie.name, genre:cinema.movie.genre, date: cinema.date.split(" ")[1]}
    	})
    }
    var setCinema = function(cinema){
    	currentCinema = cinema;
    };
	var setCine = function(cinema_name){
		cine = cinema_name;
	};
	var setDate = function(cinema_date){
		date = cinema_date;
	};
	var setMovie = function(cinema_movie){
    	movie = cinema_movie;
    };
    var setHour = function(cinema_hour){
        	hour = cinema_hour;
    };

	function table(cinemas) {
	    cinemas = _map(cinemas);
	    $("#body").html("");
    	cinemas.map(function(cinema) {
    	    currentCinema.movie.name= cinema.name;
            currentCinema.movie.genre= cinema.genre;
            currentCinema.seats=cinema.seats;
    		$('#body')
    			.append(
    			  `<tr>
    				<td>`+cinema.name+`</td>
    				<td>`+cinema.genre+`</td>
    				<td>`+cinema.date+`</td>`+
    				"<td><form><button type='button' class='btn btn-primary' onclick='app.getFunctionsByCinemaAndDateAndMovie( \"" +  cinema.date +'" , "' + cinema.name +"\")'>Open</button></form></td>,"+
    				//<input type='button' class='show' value='Consult seats' onclick='app.getFunctionsByCinemaAndDate(\""+cinema.name+"\",\""+cinema.date+"\",\""+getSeats+"\")'></input>"+
    			  `</tr>`
    			);
    	});
    };


	var getFunctionsByCinemaAndDate = function(cinema_name,cinema_date) {
        setCine(cinema_name);
        setDate(cinema_date);
        if (cinema_name != "" && cinema_date != "" ) {
            $('#cinemaname').html(cinema_name);
            api.getFunctionsByCinemaAndDate(cinema_name,cinema_date,table);
        }
    };
	var getFunctionsByCinemaAndDateAndMovie =  function (cinema_date,cinema_movie) {
        console.log(cinema_date);
        setMovie(cinema_movie);
        if (cine != "" && cinema_date != "" ) {
            api.getFunctionsByCinemaAndDateAndMovie(cine,cinema_date,cinema_movie,getSeats);
            fun = cine + "." + date + "." + movie;
            connectAndSubscribe(fun);
        }
    };
    var updateAndSave =  function () {
        setHour(date.split(" ")[0]+" "+$("#fhour").val());

        currentCinema.date=hour;
        if (cine != ""){
            if(newf){
                api.createFunction(cine,currentCinema).then(
                function () {
                    createNewFunction();
                })
            }
            else{
                api.updateFunction(cine,currentCinema).then(
                function () {
                    getFunctionsByCinemaAndDateAndMovie(date,movie);
                })

            }
        }
        getFunctionsByCinemaAndDate(cine,date);
    };
    var getFunctionsByCinema =  function (cinema_name) {

    };
    var createNewFunction = function (new_name,new_genre,new_hour){
        var seats2 = [[true, true, false, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, false, false, false, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, false, true, true, false]];
        currentCinema = {
            movie:{
             name: new_name ,
             genre: new_genre
             },
            seats:seats2,
            date:date.split(" ")[0]+" "+new_hour};
         api.createFunction(cine,currentCinema);

    };
    var createFunction = function (){
    };
    var deleteFunction = function(){
        if (cine != ""){
            api.deleteFunction(cine,currentCinema.date,currentCinema.movie.name).then(
                function () {
                    getFunctionsByCinemaAndDateAndMovie(date,movie);
                })
        }
        getFunctionsByCinemaAndDate(cine,date);
    };
    var getSeats = function (func) {
            setCinema(func);
            currentCinema.seats = func.seats;
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            ctx.fillStyle = "#001933";
            ctx.fillRect(100, 20, 300, 80);
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "40px Arial";
            ctx.fillText("Screen", 180, 70);
            var row = 5;
            var col = 0;
            for (x of currentCinema.seats) {
                row++;
                col = 0;
                for (y of x) {
                    if (y==true) {
                        ctx.fillStyle = "#009900";
                    } else {
                        ctx.fillStyle = "#FF0000";
                    }
                    col++;
                    ctx.fillRect(20 * col, 20 * row, 20, 20);
                    col++;
                }
                row++;
            }
    };
    /*var getSeats =  function (func) {
        setCinema(func);
        currentCinema.seats = func.seats;
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var y1=40;
        for (x of currentCinema.seats){
            var x1=0;
            for (y of x){
                if(y==true){
                    ctx.fillStyle = "blue";
                }
                else{ctx.fillStyle = "red";}
                x1+=40;
                ctx.fillRect(x1, y1  ,30, 30);
            }
            y1  +=45;
        }

    };*/
    var fun=function(list){
        console.log(list);
        console.log(cine);
        console.log(date);
        console.log(movie);
    }
     /*api.getFunctionsByCinema("cinemaX",fun);*/
	return {
	    getSeats : getSeats,
	    getFunctionsByCinemaAndDateAndMovie : getFunctionsByCinemaAndDateAndMovie,
		getFunctionsByCinemaAndDate : getFunctionsByCinemaAndDate,
		getFunctionsByCinema :  getFunctionsByCinema,
		updateAndSave : updateAndSave,
		createFunction:createFunction,
		createNewFunction:createNewFunction,
		deleteFunction:deleteFunction,
       /* init: function () {
            //websocket connection
            connectAndSubscribe();
        },*/

        buyTicket: function (row, col) {
                    console.info("buying ticket at row: " + row + "col: " + col);
                    verifyAvailability(row,col);

                    //buy ticket
        },

        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        },
        getMousePosition:getMousePosition
	};
})();

