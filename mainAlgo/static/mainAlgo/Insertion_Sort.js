//Moving Functions
async function moverightorleft(x_axis, n, speed, color) {
    console.log('moving ' + n + ' ' + x_axis);
    $(document).ready(function () {

        $("#test" + n).css("background-color", color)
        $("#test" + n).css("border-color", color)
            .animate({ left: '+=' + x_axis + 'px' }, speed)
    });

}
async function movetoporbottum(y_axis, done, n, speed, color) {
    console.log('moving ' + n + ' ' + y_axis);
    $(document).ready(function () {

        $("#test" + n).css("background-color", color)
        $("#test" + n).css("border-color", color)
            .animate({ top: '+=' + y_axis + 'px' }, speed)
    });
    if (done) {

        $(document).ready(function () {

            $("#test" + n).css("background-color", "transparent")
            $("#test" + n).css("border-color", "red")
        });
    }
}

let speed = 250;
$(document).ready(function(){
    $("[type=range]").change(function(){
      speed=$(this).val();
      console.log(speed);
      $('#sliderval').text(speed);
    });
});

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Insertion Sort
async function insertionsort(A) {
    let i, key, j
    let len = A.length;
    console.log(len);
    for (i = 0; i < len; i++) {
        key = A[i];
        j = i - 1;
        movetoporbottum(50, false, key, speed, "blue");
        while (j >= 0 && key < A[j]) {


            await timeout(speed*3)
            moverightorleft(-50, key, speed, "blue");
            await timeout(speed*3)
            movetoporbottum(-50, false, A[j], speed, "red");
            await timeout(speed*3)
            moverightorleft(50, A[j], speed, "red");
            await timeout(speed*3)
            movetoporbottum(50, true, A[j], speed, "red");
            console.log(i);
            A[j + 1] = A[j];
            j--;

        }
        await timeout(speed*3)
        movetoporbottum(-50, true, key, speed, "blue");

        A[j + 1] = key;

    }
    console.log(A);
}

function makeboxes(A) {
    $( ".test" ).remove();
    let n = A.length;
    let initpos;
    if (n < 5) {
        initpos = parseInt((1 / n) * 150);
    } else {
        initpos = parseInt((1 / n) * 200);
    }
    for (let i = 0; i < n; i++) {
        let a = '<div id = "test' + A[i] + '" class = "test">' +
            '<p id = "p' + i + '" style="text-align: center;margin: 9px 0px;">' + A[i] + '</p>'
        '</div>';
        $('#main-div').before(a);
        let xaxis = 50 * i;
        $("#test" + A[i]).css("left", initpos + "%");
        $("#test" + A[i]).css("left", "+=" + xaxis + "px");
    }
}

function resetposition(A) {
    for (let i = 0; i < n; i++) {
        let xaxis = 50 * i;
        $("#test" + i).css("left", 200 + xaxis + "px");
    }
}


function getinput(){
    try {
        let x = $("#inputarr").val();
        let a = x.split(',');
        var i;
        var b = [];
        for (i of a) {
            if(isNaN(parseInt(i))) throw "not an number";
            if(b.includes(parseInt(i))) throw "Don't repeat numbers"
            b.push(parseInt(i));
        }
        return b;
    }
    catch(err){
        alert(err);
    }
}



function generaterandomlist(){
    let n = Math.floor(Math.random()*17)+3;
    let A = [];
    let i = 0;
    let x;
    while(i <= n){
        x = Math.floor(Math.random()*100);
        if(!(A.includes(x))){
            A.push(x);
            i++;
        }
        
    }
    return A;
}

let list = generaterandomlist();
makeboxes(list);
$(document).ready(function () {
    $("#make-list").click(function () {
        list = getinput();
        makeboxes(list);
    });
});

$(document).ready(function () {
    $("#generate-random").click(function () {
        list = generaterandomlist();
        makeboxes(list);
    });
});

function disable_enablebtn(x){
    $("#start").attr("disabled",x);
    $("#generate-random").attr("disabled",x);
    $("#make-list").attr("disabled",x);
}

async function start(A) {
    disable_enablebtn(true);
    await insertionsort(A);
    disable_enablebtn(false);
}

$(document).ready(function () {
    $("#start").click(function () {
        start(list);
    });
});