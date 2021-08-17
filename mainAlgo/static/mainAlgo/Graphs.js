//Making the Visual Stuff here
var svgNS = "http://www.w3.org/2000/svg";
let id = 0;
function addnode(node, radius) {
    var svr = document.createElementNS(svgNS, "circle")
    svr.setAttributeNS(null, 'id', 'circle' + node.id)
    svr.setAttributeNS(null, 'class', 'circle')
    svr.setAttributeNS(null, 'cx', node.x);
    svr.setAttributeNS(null, 'cy', node.y);
    svr.setAttributeNS(null, 'r', radius);
    svr.setAttributeNS(null, 'fill', 'transparent');
    svr.setAttributeNS(null, 'stroke', 'black');
    svr.setAttributeNS(null, 'stroke-width', 2)


    var svt = document.createElementNS(svgNS, "text");

    svt.setAttributeNS(null, 'id', 'text' + node.id);
    svt.setAttributeNS(null, 'x', node.x);
    svt.setAttributeNS(null, 'y', node.y + 5);
    svt.setAttributeNS(null, 'text-anchor', 'middle');
    svt.setAttributeNS(null, 'stroke', 'black');

    document.getElementById('svg').appendChild(svr);
    document.getElementById('svg').appendChild(svt);

    document.getElementById('text' + node.id).innerHTML = node.val;
    id++;
}
function addline(edge, radius) {

    var source = document.getElementById('circle' + edge.source.id)
    var dest = document.getElementById('circle' + edge.dest.id)

    let x1 = 0;
    let x2 = 0;
    let y1 = 0;
    let y2 = 0;

    let mid_x = 0;
    let mid_y = 0;
    if (Math.abs(edge.source.x - edge.dest.x) >= Math.abs(edge.source.y - edge.dest.y)) {
        y1 = edge.source.y
        y2 = edge.dest.y

        if (edge.source.x <= edge.dest.x) {
            x1 = edge.source.x + 20
            x2 = edge.dest.x - 20

            mid_x = x1 + disx(edge.source.x, edge.dest.x)

        }
        else {
            x1 = edge.source.x - 20
            x2 = edge.dest.x + 20
            mid_x = x2 + disx(edge.dest.x, edge.source.x)
        }

        if (y1 <= y2)
            mid_y = y1 + disy(y1, y2) - 5
        else
            mid_y = y2 + disy(y2, y1) + 5



    }
    else {

        x1 = edge.source.x
        x2 = edge.dest.x


        if (edge.source.y < edge.dest.y) {
            y1 = edge.source.y + 20
            y2 = edge.dest.y - 20
            mid_y = y1 + disx(edge.source.y, edge.dest.y)

        }
        else {
            y1 = edge.source.y - 20
            y2 = edge.dest.y + 20
            mid_y = y2 + disx(edge.dest.y, edge.source.y)
        }

        if (x1 <= x2)
            mid_x = x1 + disy(x1, x2) + 5
        else
            mid_x = x2 + disy(x2, x1) + 5


    }

    var svl = document.createElementNS(svgNS, "line");
    svl.setAttributeNS(null, 'id', 'line' + edge.id);
    svl.setAttributeNS(null, 'x1', x1);
    svl.setAttributeNS(null, 'y1', y1);
    svl.setAttributeNS(null, 'x2', x2);
    svl.setAttributeNS(null, 'y2', y2);
    svl.setAttributeNS(null, 'stroke', '#ffa200');
    svl.setAttributeNS(null, 'stroke-width', 2);
    svl.setAttributeNS(null, 'marker-end', "url(#arrowhead)");
    document.getElementById('svg').appendChild(svl);

    if (!(edge.weight == null)) {
        var head = document.createElementNS(svgNS, "text");

        head.setAttributeNS(null, 'id', 'edgetext' + edge.id);
        head.setAttributeNS(null, 'x', mid_x);
        head.setAttributeNS(null, 'y', mid_y);
        head.setAttributeNS(null, 'stroke', 'black');
        document.getElementById('svg').appendChild(head);
        document.getElementById('edgetext' + edge.id).innerHTML = edge.weight;
    }



}

function addstartendtime(vertice) {
    var head = document.createElementNS(svgNS, "text");
    head.setAttributeNS(null, 'id', 'timetext' + vertice.id);
    head.setAttributeNS(null, 'x', vertice.x - 40);
    head.setAttributeNS(null, 'y', vertice.y - 30);
    head.setAttributeNS(null, 'stroke', '#c300ff');
    document.getElementById('svg').appendChild(head);
    document.getElementById('timetext' + vertice.id).innerHTML = vertice.start + "," + vertice.end;
}

function adddis(vertice) {
    var head = document.createElementNS(svgNS, "text");
    head.setAttributeNS(null, 'id', 'distext' + vertice.id);
    head.setAttributeNS(null, 'x', vertice.x - 40);
    head.setAttributeNS(null, 'y', vertice.y - 30);
    head.setAttributeNS(null, 'stroke', '#c300ff');
    document.getElementById('svg').appendChild(head);
    document.getElementById('distext' + vertice.id).innerHTML = vertice.dis;
}

function disx(x1, x2) {
    return (Math.abs(x2 - x1) / 2)
}
function disy(y1, y2) {
    return (Math.abs(y2 - y1) / 2)
}
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

speed = 200;

$(document).ready(function(){
    $("[type=range]").change(function(){
      speed=$(this).val();
      $('#sliderval').text(speed);
    });
});

//BST Implementation here

class Vertice {
    static idcounter = 0;
    constructor(val, x, y) {
        this.val = val;
        this.x = x;
        this.y = y;
        this.id = Vertice.idcounter;
        this.Edges = [];
        this.outNeighbors = [];
        this.inNeighbors = [];
        this.par = null;
        this.dis = 0;
        this.start = 0;
        this.end = 0;
        Vertice.idcounter++;
    }
}

class Edge {
    static idcounter = 0
    constructor(vertice1, vertice2, weight = null) {
        this.id = Edge.idcounter;
        this.source = vertice1;
        this.dest = vertice2;
        this.weight = weight;
        this.color = 'white'
        Edge.idcounter++;
    }
}

class Graph {
    verticecount = 0;
    vertices = [];
    time = 0;
    async addVertice(x, y) {
        if (!(await this.checkpos(x, y))) {
            var vertice = new Vertice(this.verticecount, x, y)
            addnode(vertice, 20)
            this.verticecount++;

            this.vertices.push(vertice);
        }
        else {
            alert('Vertice Too Close')
        }
    }
    checkpos(x, y) {
        for (let i in this.vertices) {
            var vertice = document.getElementById('circle' + this.vertices[i].id)
            vertice = vertice.getBoundingClientRect();
            if (!(vertice.right < (x - 30) || vertice.left > (x + 30) || vertice.top > (y + 30) || vertice.bottom < (y - 30))) {
                return true
            }
        }

    }
    findVertice(id) {
        for (let i in this.vertices) {
            if (this.vertices[i].id == id) {
                return this.vertices[i]
            }
        }
        alert('Vertice not Found')
    }
    addEdge(id1, id2, weight) {
        let sourcevertice = this.findVertice(id1);
        let destvertice = this.findVertice(id2)
        if (sourcevertice && destvertice) {
            let edge = new Edge(sourcevertice, destvertice, weight)
            addline(edge, 20)
            sourcevertice.Edges.push(edge)
            sourcevertice.outNeighbors.push(destvertice)
            destvertice.inNeighbors.push(sourcevertice)
        }
        else {
            alert("Vertice doesn't Exist")
        }
    }

    findweight(ver1, ver2) {
        for (let e of ver1.Edges) {
            if (e.dest == ver2) {
                return e.weight;
            }
        }
    }

    removeallEdge(vertice) {

        for (let i in vertice.inNeighbors) {
            for (let edge of vertice.inNeighbors[i].Edges) {
                if (edge.dest == vertice) {
                    const index = vertice.inNeighbors[i].Edges.indexOf(edge);
                    if (index > -1) {
                        vertice.inNeighbors[i].Edges.splice(index, 1);
                        Edge.idcounter--;
                    }
                }
            }
        }
    }
    deleteVertice(id) {
        for (let i in this.vertices) {
            if (this.vertices[i].id == id) {
                this.removeallEdge(this.vertices[i])
                Edge.idcounter
                const index = this.vertices.indexOf(this.vertices[i]);
                if (index > -1) {
                    this.vertices.splice(index, 1);
                }
                Vertice.idcounter--;
                this.verticecount--;
                this.displayscreen();
                return true

            }
        }
        alert("Vertice doesn't exist")

        return false
    }
    displayscreen() {
        $('circle').remove();
        $('text').remove();
        $('line').remove();
        for (let i in this.vertices) {
            addnode(this.vertices[i], 20);
            for (let j in this.vertices[i].Edges) {
                addline(this.vertices[i].Edges[j], 20);
            }
        }
    }
    clearcolors(){
        for (let i in graph.vertices) {
            graph.vertices[i].color = 'white';
            document.getElementById("circle" + graph.vertices[i].id).setAttribute('fill', 'white');
        }
    }
}

async function BFS(graph, uid) {

    for (let i in graph.vertices) {
        graph.vertices[i].color = 'white';
        document.getElementById("circle" + graph.vertices[i].id).setAttribute('fill', 'white');
        document.getElementById("circle" + graph.vertices[i].id).setAttribute('stroke', 'black');
    }
    let u = graph.findVertice(uid)
    u.color = "blue"
    document.getElementById("circle" + u.id).setAttribute('fill', '#2196F3');
    document.getElementById("circle" + u.id).setAttribute('stroke', '#2196F3');
    await timeout(speed);
    queue = []
    queue.push(u)
    let s = null
    while (queue.length != 0) {
        s = queue.pop(u)
        let edges = s.outNeighbors;
        for (let n in edges) {
            if (edges[n].color == "white") {
                edges[n].color = "gray"
                document.getElementById("circle" + edges[n].id).setAttribute('fill', '#2196F3');
                document.getElementById("circle" + edges[n].id).setAttribute('stroke', '#2196F3');
                await timeout(speed);
                queue.push(edges[n])
            }
        }
        s.color = "green";
        document.getElementById("circle" + s.id).setAttribute('fill', '#00ff2f');
        document.getElementById("circle" + s.id).setAttribute('stroke', '#00ff2f');
        await timeout(speed);
    }
}

async function DFS(graph, uid) {
    for (let i in graph.vertices) {
        graph.vertices[i].color = 'white';
        graph.vertices[i].par = null;
        graph.vertices[i].start = null;
        graph.vertices[i].end = null;
        document.getElementById("circle" + graph.vertices[i].id).setAttribute('fill', 'white');
        document.getElementById("circle" + graph.vertices[i].id).setAttribute('stroke', 'black');
    }
    let u = graph.findVertice(uid)
    graph.time = 0;
    await DFS_helper(graph, u)
    for (vertice of graph.vertices) {
        if (vertice != u && vertice.color == 'white') {
            await DFS_helper(graph, vertice);
        }
    }

}
async function DFS_helper(graph, u) {
    graph.time += 1;
    u.start = graph.time;

    u.color = "blue";
    document.getElementById("circle" + u.id).setAttribute('fill', '#2196F3');
    document.getElementById("circle" + u.id).setAttribute('stroke', '#2196F3');
    await timeout(speed);
    for (let v of u.outNeighbors) {
        if (v.color == 'white') {
            v.par = u
            await DFS_helper(graph, v)
        }
    }
    u.color = 'green'
    document.getElementById("circle" + u.id).setAttribute('fill', '#00ff2f');
    document.getElementById("circle" + u.id).setAttribute('stroke', '#00ff2f');
    await timeout(speed);

    graph.time++;
    u.end = graph.time;
    addstartendtime(u);
}



async function Dijkstra(graph, uid) {
    for (let ver of graph.vertices) {
        ver.dis = Infinity;
        ver.color = 'white';
        document.getElementById("circle" + u.id).setAttribute('fill', 'white');
    document.getElementById("circle" + u.id).setAttribute('stroke', 'black');
        ver.par = null;
    }
    let u = graph.findVertice(uid);
    u.dis = 0;
    u.color = 'blue';
    document.getElementById("circle" + u.id).setAttribute('fill', '#2196F3');
    document.getElementById("circle" + u.id).setAttribute('stroke', '#2196F3');
    await timeout(speed);
    adddis(u);
    let queue = [];
    queue.push(u);
    while (queue.length != 0) {
        u = queue.pop();
        for (let n of u.outNeighbors) {
            
            if (n.color == 'white') {
                let tempdis = u.dis + graph.findweight(u, n);
                if (tempdis < n.dis) {
                    n.dis = tempdis;
                    adddis(n);
                }
                else{
                    adddis(n);
                }
                n.par = u;
                n.color = 'blue'
                document.getElementById("circle" + n.id).setAttribute('fill', '#2196F3');
                document.getElementById("circle" + n.id).setAttribute('stroke', '#2196F3');
                await timeout(speed);
                queue.push(n);
            }
        }
        u.color = 'green'
        document.getElementById("circle" + u.id).setAttribute('fill', '#00ff2f');
        document.getElementById("circle" + u.id).setAttribute('stroke', '#00ff2f');
        await timeout(speed);
    }

}

let graph = new Graph();

async function tempgraph() {
    await graph.addVertice(200, 200)
    await graph.addVertice(400, 200)
    await graph.addVertice(400, 400)
    await graph.addVertice(200, 400)

    await graph.addVertice(600, 200)
    await graph.addVertice(800, 200)
    await graph.addVertice(800, 400)
    await graph.addVertice(600, 400)

    await graph.addEdge(0, 1, 2)
    await graph.addEdge(1, 2, 3)
    await graph.addEdge(2, 3, 5)
    await graph.addEdge(3, 0, 6)
    await graph.addEdge(4, 5, 2)
    await graph.addEdge(4, 6, 3)
    await graph.addEdge(4, 7, 5)
    await graph.addEdge(1, 4, 6)
}


tempgraph();

function clicked(event) {
    if (document.getElementById('toggle').checked) {
        let m = oMousePosSVG(event);
        if(graph.verticecount > 20){
            alert('Max Vertice count Reached')
        }
        else{
            graph.addVertice(m.x, m.y)
        }
    }
}

svg.addEventListener("click", clicked)

function oMousePosSVG(e) {
    var p = svg.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    return p;
}
let isvalid = true;
function verifyinput(s){
    if(s === null){
        alert('Enter Valid Source Vertices')
        isvalid = false
    }
    else{
        isvalid = true
        return s
    }
}

function verifyinputs(s, d, w){
    if(s === null){
        alert('Enter Valid Source')
        isvalid = false
    }
    else if(d === null){
        alert('Enter Valid Destination')
        isvalid = false
    }
    else if(w === null){
        alert('Enter Valid Weight')
        isvalid = false
    }
    else{
        isvalid = true
        return s,d,w
    }
}

$("#addedge").click(function () {
    let s,d,w = vertifyinputs($('#sourcevertice').val(),$('#destvertice').val(),$('#weight').val())

    if(isvalid)
        graph.addEdge(s ,d ,w);
});

$("#delete").click(function () {
    let s = verifyinput($('#sourcevertice').val())
    if(isvalid)
        graph.deleteVertice(s)
});

$('#BFS').click(function () {
    let s = verifyinput($('#sourcevertice').val())
    if(isvalid)
        BFS(graph, s);
});

$('#DFS').click(function () {
    let s = verifyinput($('#sourcevertice').val())
    if(isvalid)
        DFS(graph, s);
})

$('#Dijkstra').click(function (){
    let s = verifyinput($('#sourcevertice').val())
    if(isvalid)
        Dijkstra(graph, s);
})