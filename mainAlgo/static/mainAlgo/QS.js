
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
function drawbars(start,pivot,end){
    console.log(Arr);
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
        if(i==pivot){
            canvele.fillStyle = '#eeff00';
            canvele.fillRect(rectgap*i,400-Arr[i],rectgap-3,Arr[i]);
            visited[i] = 1;
        }
        else{
            canvele.fillStyle = 'red';
            canvele.fillRect(rectgap*i,400-Arr[i],rectgap-3,Arr[i]);
            visited[i] = 1;
        }
    }
}

async function partition(start,end){
    let pivot = Arr[Math.floor((start+end)/2)];
    let i = start;
    let j = end;

    while(i <= j){
        while(Arr[i] < pivot){
            i++;
        }
        while(Arr[j] > pivot){
            j--;
        }
        if(i <= j){
            var temp = Arr[i];
            Arr[i] = Arr[j];
            Arr[j] = temp;
            i++;
            j--;
        }
    }
    return i;
    
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let speed = 250;
async function quickSort(start,end){
    let pivot;
    if (Arr.length > 1){
        pivot = await partition(start,end);
        if(start < pivot -1){
            await quickSort(start,pivot - 1)
        }
        if(pivot < end){
            await quickSort(pivot,end);
        }
        await drawbars(start,pivot,end);

        await timeout(speed);
    }
}


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

async function start(){
    disable_enablebtn(true);
    await quickSort(0, len-1);
    await drawbars();
    disable_enablebtn(false);
}

drawbars();

function disable_enablebtn(x){
    $("#start").attr("disabled",x);
    $("#generate-random").attr("disabled",x);
}

$(document).ready(function () {
    $("#start").click(function () {
        start();
    });
});