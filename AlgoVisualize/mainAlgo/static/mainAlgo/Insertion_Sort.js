//Moving Functions
async function moverightorleft(x_axis, n, speed, color) {
    console.log('moving ' + n + ' ' + x_axis);
    $(document).ready(function() {

        $("#test" + n).css("background-color", color)
        $("#test" + n).css("border-color", color)
            .animate({ left: '+=' + x_axis + 'px' }, speed)
    });

}
async function movetoporbottum(y_axis, done, n, speed, color) {
    console.log('moving ' + n + ' ' + y_axis);
    $(document).ready(function() {

        $("#test" + n).css("background-color", color)
        $("#test" + n).css("border-color", color)
            .animate({ top: '+=' + y_axis + 'px' }, speed)
    });
    if (done) {

        $(document).ready(function() {

            $("#test" + n).css("background-color", "lightgray")
            $("#test" + n).css("border-color", "red")
        });
    }
}
//Insertion Sort
async function insertionsort(A, speed) {
    let i, key, j
    let len = A.length;
    console.log(len);
    for (i = 0; i < len; i++) {
        key = A[i];
        j = i - 1;
        movetoporbottum(50, false, key, speed, "blue");
        while (j >= 0 && key < A[j]) {


            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed * 3)
            );
            moverightorleft(-50, key, speed, "blue");
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed * 3)
            );
            movetoporbottum(-50, false, A[j], speed, "red");
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed * 3)
            );
            moverightorleft(50, A[j], speed, "red");
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed * 3)
            );
            movetoporbottum(50, true, A[j], speed, "red");
            console.log(i);
            A[j + 1] = A[j];
            j--;

        }
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, speed * 3)
        );
        movetoporbottum(-50, true, key, speed, "blue");

        A[j + 1] = key;

    }
    console.log(A);
}

function makeboxes(A) {
    let n = A.length;
    let initpos;
    if (n < 5) {
        initpos = parseInt((1 / n) * 100);
    } else {
        initpos = parseInt((1 / n) * 200);
    }
    console.log(initpos);
    for (let i = 0; i < n; i++) {
        let a = '<div id = "test' + A[i] + '" class = "test">' +
            '<p id = "p' + i + '" style="text-align: center;margin: 9px 0px;">' + A[i] + '</p>'
        '</div>';
        $('#btn').after(a);
        let xaxis = 50 * i;
        $("#test" + A[i]).css("left", initpos + "%");
        $("#test" + A[i]).css("left", "+=" + xaxis + "px");
    }
}

function resetposition(n) {
    for (let i = 0; i < n; i++) {
        let xaxis = 50 * i;
        $("#test" + i).css("left", 200 + xaxis + "px");
    }
}

function start(A) {

    insertionsort(A, 100);
}
let A = [5, 4, 3, 2, 1];
makeboxes(A);
$(document).ready(function() {
    $("#btn").click(function() {
        start(A);
    });
});