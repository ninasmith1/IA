function createTable(){
    var classs = "";
    var column = 0;
    var row = 0;
    for(var i = 0; i < 9; i++){
        $("#table").append("<tr id='y" + i + "'></tr>");

        for(var a = 0; a < 9; a++){
            if((i + 1) % 3 === 0 && (i + 1) !== 9){
                classs = "black1";
                if((a + 1) % 3 === 0 && (a + 1) !== 9){
                    classs = "black3";
                    $("#y" + i).append("<td class='" + classs + "' id='x" + i + a + "'></td>");
                }else{
                    $("#y" + i).append("<td class='" + classs + "' id='x" + i + a + "'></td>");
                }
            }else{
                if((a + 1) % 3 === 0 && (a + 1) !== 9){
                    classs = "black2";
                    $("#y" + i).append("<td class='" + classs + "' id='x" + i + a + "'></td>");
                }else {
                    $("#y" + i).append("<td id='x" + i + a + "' class='simple'></td>");
                }
            }
            $("#x" + i + a).click(function(){
                var empty = $("#buttonCont").is(":empty");
                var has = ($("#" + this.id).attr("class")).includes("set");
                if(!has && empty){
                    $("#" + this.id).attr("bgcolor", "#dddddd");

                    row = (this.id[1]);
                    column = (this.id[2]);
                    for (var n = 1; n < 10; n++) {
                        $("#buttonCont").append("<button onclick='guessNumber(" + n
                            + ", " + row + ", " + column + ")'>" + n + "</button>");
                    }
                    $("#buttonCont").append("<button id='cancelButton' onclick='cancel(" + row + ", " + column + ")'>Cancel</button>");
                    $("#buttonCont").append("<button id='removeButton' onclick='remove(" + row + ", " + column + ")'>Remove</button>");
                }
            });
        }
    }
}

function getBoard(){
    var level = $("#level").val();

    $.ajax({
        url: "https://sudoku-api-nina.herokuapp.com/?size=9&level=" + level,
        dataType: 'JSON',
        success: display
    })
}

function display(data) {
    var column = 0;
    var row = 0;
    var value = 0;
    console.log(data);
    for(var i = 0; i < data.squares.length; i++){
        column = data.squares[i].x;
        row = data.squares[i].y;
        value = data.squares[i].value;
        $("#x" + row + column).html(value);
        $("#x" + row + column).addClass("set");
    }

}

function guessNumber(number, column, row){
    $("#x" + column + row).html(number);
    $("#buttonCont").empty();
    $("#x" + column + row).attr("bgcolor", "white");
    $("#x" + column + row).css("color", "grey");
}

function cancel(row, column){
    $("#buttonCont").empty();
    $("#x" + row + column).attr("bgcolor", "white");
}

function remove(row, column){
    $("#x" + row + column).empty();
}

function check(){
    var bigArray = [];
    var val = 0;
    for(var x = 0; x < 9; x++){
        bigArray[x] = [];
        for(var y = 0; y < 9; y++){
            val = parseInt($("#x" + x + y).html());
            bigArray[x][y] = val;
        }
    }
    console.log(bigArray);

    var result = Sudoku.init(bigArray).isValid();
    console.log(result);

    if(result){
        $("#result").html("You solved it! Congratulations!");
    }else{
        $("#result").html("Sorry, you must have made a mistake. Please fix your answer and try again, or try a new game!");
    }
}

function newGame(){
    $("#table").empty();
    createTable();
    getBoard();
}

var Sudoku = ( function (){

    var _rows, _cols, _grid;

    function init(data){
        _reorganizeData(data);
        return this;
    }

    function isValid(){
        return (_validate(_rows) && _validate(_cols) && _validate(_grid));
    }

    _validate = function(data){
        for (var row = 0; row < 9; row++) {
            data[row].sort();

            for (var col = 0; col < 9; col++) {

                var value = data[row][col], next_value = data[row][col + 1];

                if (!(value && value > 0 && value < 10)){
                    return false;
                }

                if (col !== 8 && value === next_value){
                    return false;
                }
            }
        }
        return true;
    };

    _reorganizeData = function(data){
        _rows = data;
        _cols = [];
        _grid = [];

        for (var i = 0; i < 9; i++) {
            _cols.push([]);
            _grid.push([]);
        }

        for (var row = 0; row < 9; row++) {
            for (var col = 0; col < 9; col++) {
                _cols[col][row] = data[row][col];

                gridRow = Math.floor( row / 3 );
                gridCol = Math.floor( col / 3 );
                gridIndex = gridRow * 3 + gridCol;

                _grid[gridIndex].push(data[row][col]);

            }
        }
    };

    return {
        init: init,
        isValid: isValid
    };
})();




