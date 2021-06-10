async function moverightorleft(x_axis, n,speed) {
  var x = $('#p'+n).text();
  console.log('moving '+n+' '+x_axis);
  $(document).ready(function () {

    $("#test" + n).css("background-color", "red")
    .animate({ left: '+=' + x_axis + 'px' }, speed)
  });

}

async function movetoporbottum(y_axis,done,n,speed){
  var x = $('#p'+n).text();
  console.log('moving '+n+' '+y_axis);
  $(document).ready(function () {

    $("#test" + n).css("background-color", "red")
    .animate({ top: '+=' + y_axis + 'px'}, speed)
  });
  if (done) {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1200)
    );
    $(document).ready(function () {

      $("#test" + n).css("background-color", "lightgray")
    });
  }
}

async function insertionsort(A,speed) {
  let i, key, j
  let len = A.length;
  console.log(len);
  for (i = 0; i < len; i++) {
    key = A[i];
    j = i - 1;
    movetoporbottum(50,false,i,speed);
    while (j >= 0 && key < A[j]) {
      
      A[j + 1] = A[j];
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, speed*3)
      );
      moverightorleft(-50,i,speed);
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, speed*3)
      );
      movetoporbottum(-50,false,j,speed);
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, speed*3)
      );
      moverightorleft(50,j,speed);
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, speed*3)
      );
      movetoporbottum(50,true,j,speed);
      console.log(i);
      j--;
    }
    await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, speed*3)
      );
      movetoporbottum(-50,true,i,speed);
    A[j + 1] = key;
    
  }
  console.log(A);
}
function makeboxes(A) {
  let n = A.length;
  for (let i = 0; i < n; i++) {
    let a = '<div id = "test' + i + '" class = "test">' +
      '<p id = "p' + i + '" style="text-align: center;margin: 9px 0px;">'+A[i]+'</p>'
    '</div>';
    $('#btn').after(a);
    let xaxis = 50 * i;
    $("#test" + i).css("left", 200+ xaxis + "px")
  }
}
function resetposition(n){
  for (let i = 0; i < n; i++) {
    let xaxis = 50 * i;
    $("#test" + i).css("left", 200+ xaxis + "px")
  }
}
function start(A) {
  
  insertionsort(A,100);
  console.log($("#test1").test);
}
let A = [4,5,3,2,1,6,10,0];
let n = A.length;
makeboxes(A,n);
$(document).ready(function(){
  $("#btn").click(function(){
    start(A);
  });
});





