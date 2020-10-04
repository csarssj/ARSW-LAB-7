apiclient= (function () {
            var url = "http://localhost:8080/cinemas"
            var  getFunctionsByCinemaAndDate = function(cinema_name,cinema_date,callback){
                $.getJSON(url+"/"+cinema_name+"/"+cinema_date,(data)=>{
                    callback(data);
                },null)
            };
            var  getFunctionsByCinemaAndDateAndMovie = function(cine,cinema_date,cinema_movie,callback){
               $.getJSON(url+"/"+cine+"/"+cinema_date+"/"+cinema_movie,(data)=>{
                   callback(data);
               },null)
            };
            var updateFunction= function (cinema_name,Function) {
                var put=$.ajax({
                    url:url+"/"+cinema_name,
                    type:'PUT',
                    data:JSON.stringify(Function),
                    contentType: "application/json",
                });
                return put;
            }
            var createFunction = function (cinema_name,Function){
                var create = $.ajax({
                    url:url+"/"+cinema_name,
                    type: 'POST',
                    data: JSON.stringify(Function),
                    contentType: "application/json",
                });
                return create;
            }
            var deleteFunction= function(cinema_name,cinema_date,cinema_movie){
                var deleteF = $.ajax({
                    url:url+"/"+cinema_name+"/"+cinema_date+"/"+cinema_movie,
                    type: 'DELETE',
                    data: JSON.stringify(Function),
                    contentType: "application/json",
                });
                return deleteF;
            }
            return {
                getFunctionsByCinemaAndDate:getFunctionsByCinemaAndDate,
                getFunctionsByCinemaAndDateAndMovie:getFunctionsByCinemaAndDateAndMovie,
                updateFunction:updateFunction,
                createFunction:createFunction,
                deleteFunction:deleteFunction,
            }

 })();