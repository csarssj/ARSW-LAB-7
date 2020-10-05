var app1 = (function () {

    var seats = [[true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true]];
    var c,ctx;
    
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
    
    var drawSeats = function (cinemaFunction) {
        c = document.getElementById("myCanvas");
        ctx = c.getContext("2d");
        ctx.fillStyle = "#001933";
        ctx.fillRect(100, 20, 300, 80);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "40px Arial";
        ctx.fillText("Screen", 180, 70);
        var row = 5;
        var col = 0;
        for (var i = 0; i < seats.length; i++) {
            row++;
            col = 0;
            for (j = 0; j < seats[i].length; j++) {
                if (seats[i][j]) {
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

    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);

        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/buyticket', function (message) {
               alert("evento recibido");
               var theObject = JSON.parse(message.body);

            });
        });

    };
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



    return {

        init: function () {
            var can = document.getElementById("canvas");
            drawSeats();
            //websocket connection
            connectAndSubscribe();
        },

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