//Making the Visual Stuff here
var svgNS = "http://www.w3.org/2000/svg";

id = 0;
function additem(x, y, width, height, xgap, ygap, value,firstitem,lastitem) {

    var svr = document.createElementNS(svgNS, "rect")
    svr.setAttributeNS(null, 'id', 'rect' + id)
    svr.setAttributeNS(null, 'x', x);
    svr.setAttributeNS(null, 'y', y);
    svr.setAttributeNS(null, 'width', width);
    svr.setAttributeNS(null, 'height', height);
    svr.setAttributeNS(null, 'fill', 'transparent');
    svr.setAttributeNS(null, 'stroke', 'black');

    var svt = document.createElementNS(svgNS, "text");

    svt.setAttributeNS(null, 'id', 'text' + id);
    svt.setAttributeNS(null, 'x', x + parseInt(width / 2));
    svt.setAttributeNS(null, 'y', y + 5 + parseInt(height / 2));
    svt.setAttributeNS(null, 'text-anchor', 'middle');
    svt.setAttributeNS(null, 'stroke', 'black');
    if(!firstitem){
        var svl = document.createElementNS(svgNS, "line");
        var prevx = Math.abs(x - xgap);
        var prevy = Math.abs(y - ygap);
        svl.setAttributeNS(null, 'id', 'line' + id);
        svl.setAttributeNS(null, 'x1', prevx+width);
        svl.setAttributeNS(null, 'y1', prevy + parseInt(height / 2));
        svl.setAttributeNS(null, 'x2', x - 15);
        svl.setAttributeNS(null, 'y2', y + parseInt(height / 2));
        svl.setAttributeNS(null, 'stroke', 'red');
        svl.setAttributeNS(null, 'stroke-width', 2);
        svl.setAttributeNS(null, 'marker-end', "url(#arrowhead)");
        document.getElementById('svg').appendChild(svl);
    }
    else if(firstitem){
        var rear = document.createElementNS(svgNS, "text");

        rear.setAttributeNS(null, 'id', 'reartext');
        rear.setAttributeNS(null, 'x', x+width/2);
        rear.setAttributeNS(null, 'y', y-height/2);
        rear.setAttributeNS(null, 'text-anchor', 'middle');
        rear.setAttributeNS(null, 'stroke', 'black');
        document.getElementById('svg').appendChild(rear);
        document.getElementById('reartext').innerHTML = 'Rear';
    }
    if(lastitem){
        var front = document.createElementNS(svgNS, "text");
        console.log('here')
        front.setAttributeNS(null, 'id', 'fronttext');
        front.setAttributeNS(null, 'x', x+width/2);
        front.setAttributeNS(null, 'y', y-height/2);
        front.setAttributeNS(null, 'text-anchor', 'middle');
        front.setAttributeNS(null, 'stroke', 'black');
        document.getElementById('svg').appendChild(front);
        document.getElementById('fronttext').innerHTML = 'Front';
    }    
    
    
        
        
    document.getElementById('svg').appendChild(svr);
    document.getElementById('svg').appendChild(svt);
    document.getElementById('text' + id).innerHTML = value;
    id++;
}


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//Linked List Implementation here

class ListNode {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}
class LinkedList {
    constructor(val) {
        this.head = new ListNode(val, null);
        this.len = 1
        
    }
    insertNodeatHead(val) {
        let node = new ListNode(val, this.head);
        this.head = node;
        this.len++;
    }
    
    async deleteNodefromEnd(){
        let thead = this.head;
        if(this.len == 1){
            this.deleteNodefromStart();
        }
        else{
            while(thead.next.next != null){
                thead = thead.next;
            }
            
            thead.next = null
            this.len--;
        }
    }
    displayNode() {
        let thead = this.head;
        while (thead != null) {
            console.log(thead.val)
            thead = thead.next;
        }
    }
    displayscreen() {
        id = 0
        var def = $('#mardef').detach();
        $('#svg').empty();
        $('#svg').append(def);
        let x = 50;
        let y = 300;
        let width = 30;
        let height = 30;
        let xgap = 100;
        let f = true;
        let r = false;
        let thead = this.head;
        while (thead.next != null) {
            additem(x, y, width,height, xgap, 0, thead.val,f,r);
            f = false;
            x = x + xgap;
            thead = thead.next;
        }
        if(thead != null){
            r = true;
            additem(x, y, width,height, xgap, 0, thead.val,f,r);
            console.log('Here')
            x = x + xgap;
            thead = thead.next;
        }
    }
}



l1 = new LinkedList(1)
l1.insertNodeatHead(2)
l1.insertNodeatHead(4)
l1.insertNodeatHead(5)
l1.insertNodeatHead(10);

l1.displayNode();
l1.displayscreen();

function validateinputval(){
    try{
        let val = $('#inputval').val();
        x = parseInt(val);
        if(isNaN(x)){
            throw "Not a Number"
        }
        else if(x > 100){
            throw "Value must be less than 100"
        }
        else if(l1.len > 13){
            throw "Exceeds Max Length"
        } 
        else{
            return x
        }
    }
    catch(err){
        alert(err);
        return false
    }
}


$("#insertatHead").click(function () { 
    let val = validateinputval()
    if(val){
        l1.insertNodeatHead(val);
        l1.displayscreen();
    }    
});



$("#deletefromEnd").click(async function () { 

    l1.deleteNodefromEnd();
    l1.displayscreen();
});

