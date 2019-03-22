$(document).ready(function(){
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
                    $("#y" + i).append("<td id='x" + i + a + "'></td>");
                }
            }
            $("#x" + i + a).click(function(){
                $("#" + this.id).attr("bgcolor", "#dddddd");

                row = (this.id[1]);
                column = (this.id[2]);
                for(var n = 1; n < 10; n++){
                    $("#buttonCont").append("<button onclick='guessNumber(" + n
                        + ", " + row + ", " + column + ")'>" + n + "</button>");
                }
                $("#buttonCont").append("<button id='cancelButton' onclick='cancel(" + row + ", " + column + ")'>cancel</button>");
            });
        }
    }
});

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

function check(){
    var bigArray = [];
    var val = 0;
    for(var x = 0; x < 9; x++){
        bigArray[x] = [];
        for(var y = 0; y < 9; y++){
            val = parseInt($("#x" + x + y).html());
            console.log(val);
            bigArray[x][y] = val;
        }

    }
    console.log(bigArray);
}









