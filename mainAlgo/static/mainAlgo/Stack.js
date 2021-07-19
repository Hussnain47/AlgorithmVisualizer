//Making the Visual Stuff here
var svgNS = "http://www.w3.org/2000/svg";

id = 0;
function additem(x, y, width, height, xgap, ygap, value,firstitem) {

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
        svl.setAttributeNS(null, 'x1', prevx+parseInt(width/2));
        svl.setAttributeNS(null, 'y1', prevy + height);
        svl.setAttributeNS(null, 'x2', x + parseInt(width/2));
        svl.setAttributeNS(null, 'y2', y - 15 );
        svl.setAttributeNS(null, 'stroke', 'red');
        svl.setAttributeNS(null, 'stroke-width', 2);
        svl.setAttributeNS(null, 'marker-end', "url(#arrowhead)");
        document.getElementById('svg').appendChild(svl);
    }
    else{
        var head = document.createElementNS(svgNS, "text");

        head.setAttributeNS(null, 'id', 'headtext');
        head.setAttributeNS(null, 'x', x+width/2);
        head.setAttributeNS(null, 'y', y-height/2);
        head.setAttributeNS(null, 'text-anchor', 'middle');
        head.setAttributeNS(null, 'stroke', 'black');
        document.getElementById('svg').appendChild(head);
        document.getElementById('headtext').innerHTML = 'Top';
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
    
    async deleteNode(val) {
        let thead = this.head;
        let prev = null;
        
        let i = 0
        while (thead.val != val && thead != null) {
            document.getElementById("rect"+i).setAttribute('fill','#0085eb');
            await timeout(1000);
            prev = thead;
            thead = thead.next;
            i++;
        }
        document.getElementById("rect"+i).setAttribute('fill','#0085eb');
        await timeout(1000);
        prev.next = thead.next;
        this.len--;
        

    }
    deleteNodefromHead(){
        this.head = this.head.next;
        this.len--;
    }
    async deleteNodefromEnd(){
        let thead = this.head;
        if(this.len == 1){
            this.deleteNodefromStart();
        }
        else{
            let i = 0
            while(thead.next.next != null){
                document.getElementById("rect"+i).setAttribute('fill','#0085eb');
                await timeout(1000);
                thead = thead.next;
                i++;
            }
            document.getElementById("rect"+i).setAttribute('fill','#0085eb');
            await timeout(1000);
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
        let wid = $(document).width();
        let x = wid/2-100;
        let y = 90;
        let width = 100;
        let height = 30;
        let ygap = 60;
        let f = true;
        let thead = this.head;
        while (thead != null) {
            additem(x, y, width,height, 0, ygap, thead.val,f);
            f = false;
            y = y + ygap;
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
        else if(x > 1000){
            throw "Value must be less than 100"
        }
        else if(l1.len > 8){
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


$("#deletefromHead").click(async function () { 

    l1.deleteNodefromHead();
    l1.displayscreen();
});


