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
            //api.getFunctionsByCinemaAndDate(cinema_name,cinema_date,fun);
            //api.getFunctionsByCinema(cinema_name,fun);
        }
    };
	var getFunctionsByCinemaAndDateAndMovie =  function (cinema_date,cinema_movie) {
        console.log(cinema_date);
        setMovie(cinema_movie);
        if (cine != "" && cinema_date != "" ) {
            api.getFunctionsByCinemaAndDateAndMovie(cine,cinema_date,cinema_movie,getSeats);
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
      //   newf = true;
        /* var wrapper = $(".container1");
             var add_button = $(".col-xl-6");
             var x= 0
             $(add_button).click(function(e) {
                 e.preventDefault();
                     if(x<1){
                     $(wrapper).append('<label for="fnewname">Edit Function :</label>');
                     $(wrapper).append('<input type="text" id="fnewname" name="fnewname" value="new name"/></br>');
                     //$(wrapper).append('<div><input type="text" name="mytext[]"/><a href="#" class="delete">Delete</a></div>');
                     $(wrapper).append('<label for="fnewgenre">Edit Function :</label>');
                     $(wrapper).append('<input type="text" id="fnewgenre" name="fnewgenre" value="new genre"/></br>');
                     //$(wrapper).append('<div><input type="text" name="mytext[]"/><a href="#" class="delete">Delete</a></div>');
                     $(wrapper).append('<label for="fnewhour">Edit Function :</label>');
                     $(wrapper).append('<input type="text" id="fnewhour" name="fnewhour" value="new hour"/></br>');
                     //$(wrapper).append('<button type="button" class="btn btn-primary" onclick="app.createNewFunction( $('#fnewname').val(),$('#fnewgenre').val(),$('#fnewhour').val())">Insert</button></div>');//add input box
                     x++;
                     }
             });

             /*$(wrapper).on("click", ".insert", function(e) {
                 e.preventDefault();
                 $(this).parent('div').remove();
                 console.log($("#fnewname").val());
                 createNewFunction ($("#fnewname").val(),$("#fnewgenre").val(),$("#fnewhour").val());

         })*/
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
    var getSeats =  function (func) {
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

    };
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
	};
})();

