
let canvas,canvasw,canvash,canvele;
let rectgap = 10;
canvelements();

let Arr = [], temp = [] , visited = [] ;

let len = 100;

for(let i = 0; i < len ; i++){
    Arr.push(Math.round(Math.random()*300));
}

for(let i = 0; i < len ; i++){
    temp.push(0);
    visited.push(0);
}

function canvelements(){
    canvas = document.getElementById("Canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    canvasw = canvas.width;
    canvash = canvas.height;
    canvele = canvas.getContext("2d");

}
function drawbars(start,end){

    canvele.clearRect(0,0,1000,1000);

    for(let i = 0; i < len ; i++){

        canvele.fillStyle = '#0085eb';

        canvele.fillRect(rectgap*i,400-Arr[i],rectgap-2,Arr[i]);

        if(visited[i]){
            canvele.fillStyle = '#14eb00';
            canvele.fillRect(rectgap*i,400-Arr[i],rectgap-2,Arr[i]);
        }
    }

    for(i = start; i <= end; i++){
        canvele.fillStyle = 'red';
        canvele.fillRect(rectgap*i,400-Arr[i],rectgap-3,Arr[i]);
        visited[i] = 1;
    }
}



function merge(start,end){

    let mid = parseInt((start + end)/2)  //shifting right to divide the number
    let start1 = start;
    let start2 = mid + 1;
    let end1 = mid;
    let end2 = end;

    let index = start;

    while( start1 <= end1 && start2 <= end2){
        if(Arr[start1] <= Arr[start2]){
            temp[index] = Arr[start1];
            start1++;
            index++;
        }
        else{
            temp[index] = Arr[start2];
            start2++;
            index++;
        }
    }

    while(start1 <= end1){
        temp[index] = Arr[start1];
        index++;
        start1++;
    }

    while(start2 <= end2){
        temp[index] = Arr[start2];
        index++;
        start2++;
    }

    index = start;
    // Changing the original array coz perviously temp arr was changed
    while(index <= end){
        Arr[index] = temp[index];
        index++;
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let speed = 250;
async function mergeSort(start,end){
    if (start < end){
        let mid = parseInt((start + end) >> 1)
        await mergeSort(start, mid);
        await mergeSort(mid+1, end);
        await merge(start,end);
        await drawbars(start,end);

        await timeout(speed);
    }
}

async function start(){
    disable_enablebtn(true);
    await mergeSort(0, len-1);
    await drawbars();
    disable_enablebtn(false);
}

drawbars();


$(document).ready(function(){
    $("[type=range]").change(function(){
      speed=$(this).val();
      console.log(speed);
      $('#sliderval').text(speed);
    });
});

$('#generate-random').click(function() {
    location.reload();
});

function disable_enablebtn(x){
    $("#start").attr("disabled",x);
    $("#generate-random").attr("disabled",x);
}

$(document).ready(function () {
    $("#start").click(function () {
        
        start();
    });
});