$(document).ready(function(){
    var classs = "";
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
        }
    }

});

function getBoard(){
    var level = $("#level").val();

    $.ajax({
        url: "https://sudoku-api-nina.herokuapp.com/?size=9&level=" + level,
        dataType: 'JSON',
        success: doIt
    })
}

function doIt(data) {
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









