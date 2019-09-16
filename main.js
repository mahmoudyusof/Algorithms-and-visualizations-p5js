
function createRandomArray(l, inc) {
    let arr = new Array(l);
    for(let i=1; i<=l; i++){
        arr[i-1] = inc * i;
    }
    return shuffle(arr);
}

let res = 20;
let arr;
let l;
let h;
let state = [];
let inc;
let c = 0;
let wave;

function setup() {
    createCanvas(1280, 600);
    l = floor((width / res));
    h = height - 10;
    inc = h / l;
    for(let i=0; i<l; i++){
        state.push(0);
    }
    arr = createRandomArray(l, inc);
    wave = new p5.Oscillator();
    wave.setType('sine');
    wave.amp(1);
}

async function keyPressed(){
    if(keyCode == 65 || keyCode == 97){
        await asyncMergeSort(arr, 0);
        console.log(c);
        c = 0;
    }else if(keyCode == 83 || keyCode == 115){
        await syncMergeSort(arr, 0);
        console.log(c);
        c = 0;
    }else if(keyCode == 32){
        arr = createRandomArray(l, inc);
        for(let i=0; i<l; i++){
            state[i] = 0;
            console.log(l);
        }
    }
}

function draw() {
    background(0);
    // noStroke();
    stroke(0);
    for(let i=0; i<l; i++){
        if(state[i] == 0){
            fill(255);
        }else if(state[i] == 1){
            fill(100, 255, 100);
        }else if(state[i] == 2){
            fill(255, 0, 0);
        }
        rect(i*res, height-arr[i], res, arr[i]);
    }
}

async function syncMergeSort(ar, start){
    if(ar.length == 1){
        return ar;
    }else{
        let mid = floor(ar.length / 2);
        let s;
        let l;
        let r;
        for(let i=start; i<start+ar.length; i++){
            state[i] = 0;
        }
        return Promise.all([syncMergeSort(ar.slice(0, mid), start), syncMergeSort(ar.slice(mid), mid+start)]).then(vals => {
            let l = vals[0];
            let r = vals[1]
            return Promise.all([merge(l, r, start, mid+start)]);
        }).then(val => {
            s = val[0]
            return populate(s, start);
        }).then(() => {
            for(let i=start; i<start+ar.length; i++){
                state[i] = 1;
            }
            return s;
        })
    }
}

async function asyncMergeSort(ar, start){
    if(ar.length == 1){
        return ar;
    }else{
        let mid = floor(ar.length / 2);
        let left = await asyncMergeSort(ar.slice(0, mid), start);
        let right = await asyncMergeSort(ar.slice(mid), mid+start);
        for(let i=0; i<l; i++){
            if(i >= start && i<start+ar.length){
                state[i] = 1;
            }else{
                state[i] = 0;
            }
        }
        let s = await merge(left, right, start, mid+start);
        await populate(s, start);
        return s;
    }
}

async function merge(a, b, start, mid){
    let res = [];
    let i = 0;
    let j = 0;
    while(a.length && b.length){
        let s1 = state[start+i];
        let s2 = state[mid+j];
        state[start+i] = 2;
        state[mid+j] = 2;
        c++;
        if(a[0] >= b[0]){
            wave.freq(500 + b[0]);
            wave.start();
            wave.stop();
            res.push(b[0]);
            b.shift();
            state[start+i] = s1;
            state[mid+j] = s2;
            j++;
        }else{
            wave.freq(500 + a[0]);
            wave.start();
            wave.stop();
            res.push(a[0]);
            a.shift();
            state[start+i] = s1;
            state[mid+j] = s2;
            i++;
        }
    }
    if(!a.length){
        res = res.concat(b);
        c += b.length;
    }else if(!b.length){
        res = res.concat(a);
        c += a.length
    }
    return res;
}

async function populate(ar, start){
    for(let i=0; i<ar.length; i++){
        let s = state[start+i];
        state[start+i] = 2;
        await sleep(10);
        arr[start+i] = ar[i];
        state[start+i] = s;
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
