//Making the Visual Stuff here
var svgNS = "http://www.w3.org/2000/svg";

id = 0;
function additem(node, par, radius, firstitem,len) {
    
    var svr = document.createElementNS(svgNS, "circle")
    svr.setAttributeNS(null, 'id', 'circle' + node.id)
    svr.setAttributeNS(null, 'cx', node.x);
    svr.setAttributeNS(null, 'cy', node.y);
    svr.setAttributeNS(null, 'r', radius);
    svr.setAttributeNS(null, 'fill', 'transparent');
    svr.setAttributeNS(null, 'stroke', 'black');
    svr.setAttributeNS(null,'stroke-width',2)

    var svt = document.createElementNS(svgNS, "text");

    svt.setAttributeNS(null, 'id', 'text' + node.id);
    svt.setAttributeNS(null, 'x', node.x);
    svt.setAttributeNS(null, 'y', node.y + 5);
    svt.setAttributeNS(null, 'text-anchor', 'middle');
    svt.setAttributeNS(null, 'stroke', 'black');
    if (!firstitem) {
        var svl = document.createElementNS(svgNS, "line");
        svl.setAttributeNS(null, 'id', 'line' + node.id);
        svl.setAttributeNS(null, 'x1', par.x);
        svl.setAttributeNS(null, 'y1', par.y + radius);
        if(node.level < 6){
            if (par.x < node.x) {
                svl.setAttributeNS(null, 'x2', node.x - 1.5 * radius);
            }
            else {
                svl.setAttributeNS(null, 'x2', node.x + 1.5 * radius);
            }
        }
        else{
            if (par.x < node.x) {
                svl.setAttributeNS(null, 'x2', node.x - 1.2*radius);
            }
            else {
                svl.setAttributeNS(null, 'x2', node.x + 1.2*radius);
            }
        }
        svl.setAttributeNS(null, 'y2', node.y - radius);
        svl.setAttributeNS(null, 'stroke', 'black');
        svl.setAttributeNS(null, 'stroke-width', 2);
        svl.setAttributeNS(null, 'marker-end', "url(#arrowhead)");
        document.getElementById('svg').appendChild(svl);
    }
    else {
        var head = document.createElementNS(svgNS, "text");

        head.setAttributeNS(null, 'id', 'headtext');
        head.setAttributeNS(null, 'x', node.x);
        head.setAttributeNS(null, 'y', node.y - radius);
        head.setAttributeNS(null, 'text-anchor', 'middle');
        head.setAttributeNS(null, 'stroke', 'black');
        document.getElementById('svg').appendChild(head);
        document.getElementById('headtext').innerHTML = 'Root';
    }




    document.getElementById('svg').appendChild(svr);
    document.getElementById('svg').appendChild(svt);
    document.getElementById('text' + node.id).innerHTML = node.val;
    id++;
}


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let speed = 500;
$(document).ready(function(){
    $("[type=range]").change(function(){
      speed=$(this).val();
      $('#sliderval').text(speed);
    });
});

//BST Implementation here

class Node {
    static idcounter = 0;
    constructor(val, left, right, x, y) {
        this.val = val;
        this.left = left;
        this.right = right;
        this.par = null;
        this.level = 0;
        this.x = x;
        this.y = y;
        this.id = Node.idcounter;
        Node.idcounter++;
    }
}
class BST {
    constructor(val) {
        this.root = new Node(val, null,null,($(window).width()/2),60);
        this.len = 1;
        this.height = 0;
    }

}
function displayscreenhandler(root,radius,r){
    if(root == null){
        return;
    }
    else{
        additem(root,root.par,radius,r);
        r = false;
        displayscreenhandler(root.left,radius,r,tree.len);
        displayscreenhandler(root.right,radius,r,tree.len)
    }
}
function  displayscreen(root) {
    id = 0
    var def = $('#mardef').detach();
    $('#svg').empty();
    $('#svg').append(def);
    let radius = 20;
    let r = true;
    displayscreenhandler(root,radius,r);
}


async function insertNode(root, val,firsttime) {
    let node = new Node(val, null, null, 0, 0)

    let x = root;

    let par = null;

    while (x != null) {
        par = x;
        if(!firsttime){
            console.log('circle'+par.id);
            document.getElementById('circle'+par.id).setAttribute('fill','#00ff2f');
            await timeout(speed);
        }
        
        if (val < x.val) {
            x = x.left;
        }
        else {
            x = x.right;
        }

    }
    if (par == null) {
        node.x = $(window).width()-100;
        node.y = 60;
        par = node;
    }
    else if (par.val > val) {
        try{
            node.level = par.level + 1;
            
            if(node.level > 8){
                throw "Max Acceptable Height is 8";
            }
            if(node.level == 0){
                node.x = par.x - 200;
            }
            else if(node.level == 1){
                node.x = par.x - 250;
            }
            else if(node.level == 2){
                node.x = par.x - 200;
            }
            else if(node.level == 3){
                node.x = par.x - 80;
            }
            else if(node.level == 4){
                node.x = par.x - 60;
            }
            else if(node.level == 5){
                node.x = par.x - 50;
            }
            else if(node.level >= 6){
                node.x = par.x - 40;
            }
            node.y = par.y + 60;
            par.left = node;
            tree.len++;
            if(tree.height < node.level){
                tree.height = node.level;
            }
        }
        catch(err){
            alert(err);
        }
    }
    else {
        try{
            node.level = par.level + 1;
            
            if(node.level > 8){
                throw "Max Acceptable Height is 8";
            }
            
            if(node.level == 0){
                node.x = par.x + 300;
            }
            else if(node.level == 1){
                node.x = par.x + 250;
            }
            else if(node.level == 2){
                node.x = par.x + 200;
            }
            else if(node.level == 3){
                node.x = par.x + 60;
            }
            else if(node.level == 4){
                node.x = par.x + 50;
            }
            else if(node.level == 5){
                node.x = par.x + 45;
            }
            else if(node.level == 6){
                node.x = par.x + 40;
            }
            else if(node.level == 7){
                node.x = par.x + 35;
            }
            else if(node.level == 8){
                node.x = par.x + 30;
            }
            node.y = par.y + 60;
            par.right = node;
            tree.len++;
            if(tree.height < node.level){
                tree.height = node.level;
            }
        }
        catch(err){
            alert(err);
        }
    }
    node.par = par;
    return par
}

async function search(tree,val){
    let root = tree.root;
    while(root != null){
        
        console.log('circle'+root.id);
        document.getElementById('circle'+root.id).setAttribute('fill','#00ff2f');
        await timeout(speed);
        
        if(root.val > val){
            root = root.left;
        }
        else if(root.val < val){
            root = root.right;
        }
        else{
            console.log('circle'+root.id);
            document.getElementById('circle'+root.id).setAttribute('fill','orange');
            return;
        }
    }
}

async function minValueNode(node){
    let temp = node;

    while(temp.left != null){
        console.log('circle'+temp.id);
        document.getElementById('circle'+temp.id).setAttribute('fill','orange');
        await timeout(speed);
        temp = temp.left;
    }

    return temp.val
}

async function deleteNode(root,val){
    if(root == null){
        return;
    }
    else{
        if(root.val > val){
            document.getElementById('circle'+root.id).setAttribute('fill','#00ff2f');
            await timeout(speed);
            root.left = await deleteNode(root.left,val);
        }
        else if(root.val < val){
            document.getElementById('circle'+root.id).setAttribute('fill','#00ff2f');
            await timeout(speed);
            root.right = await deleteNode(root.right,val);
        }
        else if(root.val == val){
            document.getElementById('circle'+root.id).setAttribute('fill','red');
            await timeout(speed);

            if(root.left == null){
                
                return root.right;
            }
            else if(root.right == null){
                
                return root.left;
            }
            else{
                root.val = await minValueNode(root.right)
                root.right = await deleteNode(root.right,root.val);
            }
        }
        
    }
    return root;
}

function fixdelete(){
    let temp = []
    treelist = fixdeletehelper(tree.root,temp);
    tree = new BST(treelist[0]);
    for (let x = 1;x < treelist.length; x++){
        insertNode(tree.root,treelist[x],true);
    }
}
var treelist = []
function fixdeletehelper(root,treelistin) {
    if (root == null) {
        return;
    }
    else {
        treelistin.push(root.val);
        fixdeletehelper(root.left,treelistin);
        fixdeletehelper(root.right,treelistin);
        return treelistin;
    }
}

function preordertraversal(root) {
    if (root == null) {
        return;
    }
    else {
        console.log(root.val);
        preordertraversal(root.left);
        preordertraversal(root.right);
    }
}

async function screenpreordertraversal(root){
    if (root == null){
        return;
    }
    else{
        document.getElementById('circle'+root.id).setAttribute('fill','#00ff2f');
        var x = document.getElementById('outputlist');
        var text = document.createTextNode('-'+root.val);
        x.appendChild(text);
        await timeout(speed);
        await screenpreordertraversal(root.left);
        await screenpreordertraversal(root.right);
    }
}

async function screeninordertraversal(root){
    if (root == null){
        return;
    }
    else{
        await screeninordertraversal(root.left);
        document.getElementById('circle'+root.id).setAttribute('fill','#00ff2f');
        var x = document.getElementById('outputlist');
        var text = document.createTextNode('-'+root.val);
        x.appendChild(text);
        await timeout(speed);
        await screeninordertraversal(root.right);
    }
}

async function screenpostordertraversal(root){
    if (root == null){
        return;
    }
    else{
        await screenpostordertraversal(root.left);
        await screenpostordertraversal(root.right);
        document.getElementById('circle'+root.id).setAttribute('fill','#00ff2f');
        var x = document.getElementById('outputlist');
        var text = document.createTextNode('-'+root.val);
        x.appendChild(text);
        await timeout(speed);
    }
}

let cen = ($(window).width()) / 2;
//Test cases
let tree = new BST(10);

insertNode(tree.root, 12,true);
insertNode(tree.root, 2,true);
insertNode(tree.root, 1,true);
insertNode(tree.root, 3,true);
insertNode(tree.root, 20,true);
insertNode(tree.root, 15,true);
insertNode(tree.root, 30,true);




displayscreen(tree.root);




function validateinputval() {
    try {
        let val = $('#inputval').val();
        x = parseInt(val);
        if (isNaN(x)) {
            throw "Not a Number"
        }
        else if (x > 100) {
            throw "Value must be less than 100"
        }
        
        else {
            return x
        }
    }
    catch (err) {
        alert(err);
        return false
    }
}

function disable_enablebtn(x){
    $("#insert").attr("disabled",x);
    $("#search").attr("disabled",x);
    $("#delete").attr("disabled",x);
    $("#traversaldrop").attr("disabled",x);
}

$('#insert').click(async function () { 
    if(validateinputval()){
        await disable_enablebtn(true);
        await insertNode(tree.root,validateinputval(),false);
        await displayscreen(tree.root);
        await disable_enablebtn(false);
    }
});

$('#search').click(async function () { 
    if(validateinputval()){
        disable_enablebtn(true);
        await search(tree,validateinputval());
        await timeout(speed);
        await displayscreen(tree.root);
        disable_enablebtn(false);
    }
});

$('#delete').click(async function () { 
    if(validateinputval()){
        disable_enablebtn(true);
        tree.root = await deleteNode(tree.root,validateinputval());
        fixdelete();
        await displayscreen(tree.root);
        disable_enablebtn(false);
    }
});

$('#preordertraversal').click(async function () { 
    disable_enablebtn(true);
    document.getElementById("Output").style.display = "block"; 
    document.getElementById('outputlist').innerHTML = '';
    document.getElementById("optitle").innerHTML = "Pre Order Traversal";
    await screenpreordertraversal(tree.root);
    displayscreen(tree.root);
    disable_enablebtn(false);
    
});

$('#inordertraversal').click(async function () { 
    disable_enablebtn(true);
    document.getElementById("Output").style.display = "block"; 
    document.getElementById('outputlist').innerHTML = '';
    document.getElementById("optitle").innerHTML = "In Order Traversal";
    await screeninordertraversal(tree.root);
    displayscreen(tree.root);
    disable_enablebtn(false);
});

$('#postordertraversal').click(async function () { 
    disable_enablebtn(true);
    document.getElementById("Output").style.display = "block"; 
    document.getElementById('outputlist').innerHTML = '';
    document.getElementById("optitle").innerHTML = "Post Order Traversal";
    await screenpostordertraversal(tree.root);
    displayscreen(tree.root);
    disable_enablebtn(false);
});

document.getElementById("Output").style.display = "none"; 