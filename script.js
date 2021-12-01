
import { heap } from './heap.js';
const left = document.getElementById('left1');
const right = document.getElementById('right1');

const options = {
    edges: {
        arrows: {
            to: true
        },
        selectionWidth: function (width) {return width*10;} ,
        labelHighlightBold: true,
        font: {
            size: 25
        },
        color:  '#000000' ,
    },
    nodes: {
        font: '12px arial red',
        scaling: {
            label: true
        },
        shape: 'icon',
        icon: {
            face: 'FontAwesome',
            code: '\uf183',
            size: 50,
            color: '#991133',
        },
        font: {
            size : 25,
        },
    }
};
 
let network = new vis.Network( left , {"physics": {"barnesHut": {"springLength":100, "springConstant": 0.04}}});
network.setOptions(options);
let network2 = new vis.Network(right);
network2.setOptions(options);

let check = new Set();
let nodes = [] ;
let edges = [];
function create_data(from , to , val)
{
     if(!check.has(from)) 
     {
         check.add(from);
         nodes.push({id : from, label : from})

     }
     if(!check.has(to))
     { 
         check.add(to) ;
         nodes.push({id : to , label : to})
     }
     if(from != to)
     edges.push({from : from , to : to , label: val , length:200});
     console.log(edges);
    let data = {
    nodes: nodes,
    edges: edges 
    }

    return data ;
};
     
x.onclick = function () {



    let fromm = document.getElementById('from').value;
    let too = document.getElementById('to').value;
    let rupeee = document.getElementById('val').value;
    let data = create_data(fromm , too , rupeee) ;
    document.getElementById('from').value = '';
    document.getElementById('to').value='';
    document.getElementById('val').value='';
    network.setData(data) ;
   
}

y.onclick = function () {

    let data = solve();
    document.getElementsByClassName('l2').display = 
    network2.setData(data) ;

}
function solve() {


    let bal = new Map();
    for (let i = 0; i < edges.length; i++) {



        let x = parseInt(edges[i].label) ;
        if (!bal.has(edges[i].from))
            bal.set(edges[i].from, 0);


        let v = bal.get(edges[i].from);
        bal.set(edges[i].from, v - x );




        if (!bal.has(edges[i].to))
            bal.set(edges[i].to, 0);

        v = bal.get(edges[i].to);
        bal.set(edges[i].to, v +  x);


    }
    let neg = new heap();
    let pos = new heap();
    let ans = [];

    bal.forEach((val, key) => {


        if (val > 0)
            pos.insert([key, val]);
        else if (val < 0)
            neg.insert([key, -val]);
        
    })

    console.log(pos) ;
    console.log(neg) ;

    while (pos.size() && neg.size()) {
        let take = pos.extractMPop();
        let give = neg.extractMPop();

        if (take[1] > give[1]) {
            pos.insert([take[0], take[1] - give[1]]);
            ans.push({ from: give[0], to: take[0], label: give[1] ,length:200})
        }

        else if (take[1] < give[1]) {
            neg.insert([give[0], give[1] - take[1]]);
            ans.push({ from: give[0], to: take[0], label: take[1] , length:200})

        }
        else
            ans.push({ from: give[0], to: take[0], label: take[1] ,length:200})


    }
    for(let i = 0 ; i < ans.length ; i ++ ) 
          ans[i].label = ans[i].label.toString();
    console.log(ans);
    let data = {

        nodes: nodes,
        edges: ans
    };
    return data;
}

