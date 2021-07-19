let len = 100;
let canvas,canvasw,canvash,canvele;
let rectgap = 10;
let speed = 250;


let Arr = [], temp = [] , visited = [] ;



for(let i = 0; i < len ; i++){
    Arr.push(Math.round(Math.random()*300));
}

for(let i = 0; i < len ; i++){
    temp.push(0);
    visited.push(0);
}
let wid = rectgap*len;
function canvelements(){
    canvas = document.getElementById("Canvas");
    canvas.width = wid;
    canvas.height = 600;
    
    canvele = canvas.getContext("2d");

}
function drawbars(start,end,checked){

    canvele.clearRect(0,0,wid,600);

    for(let i = 0; i < len ; i++){

        canvele.fillStyle = '#0085eb';

        canvele.fillRect(rectgap*i,400-Arr[i],rectgap-2,Arr[i]);

        if(visited[i]){
            canvele.fillStyle = '#14eb00';
            canvele.fillRect(rectgap*i,400-Arr[i],rectgap-2,Arr[i]);
        }
    }
    if(!checked){
        for(i = start; i >= end; i--){
            canvele.fillStyle = 'red';
            canvele.fillRect(rectgap*i,400-Arr[i],rectgap-3,Arr[i]);
            visited[i] = 1;
        }
    }
}

async function insertionsort(start,end){
    let j , key;
    for(let i = start;i <= end; i++){
        key = Arr[i];
        j = i-1;
        while(j >= 0 && Arr[j] > key){
            Arr[j+1] = Arr[j];
            await drawbars(j+1,0,false);
            await timeout(10);
            j--;
        }
        Arr[j+1] = key;
        await drawbars(j+1,0,true);
        await timeout(speed);
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function start(){
    await insertionsort(0, len-1);
    await drawbars();
}
canvelements();
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

$(document).ready(function () {
    $("#start").click(function () {
        start();
    });
});