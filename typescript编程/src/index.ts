




let a:object ={
    b:"123"
}



type Age=number

type Person= {
    name:string;
    age:Age
}

type color = 'red'

let x =Math.random() < .5

if(x){
    type color ='blue'
    let b:color='blue'
}else {
    let b:color='red'
}


type cat ={
    name:string
    purrs:boolean
}

type dog ={
    name:string
    barks:boolean
    wags:boolean
}

type catOrDogOrBoth= cat | dog   //至少满足 Cat 或 Dog 的属性集 或都满足

const cat:catOrDogOrBoth ={
    purrs:true,
    name:"123",
    barks:true,
    wags:false
}

type catAndDog = cat & dog // 必须满足 Cat 和 Dog 的所有属性


const all :catAndDog ={
    barks: false, purrs: false, wags: false,
    name:"Tom"
}



const arr1:number[]=[1,2,5]
const arr2:Array<number | string>=[1,2,5,'你好呀']

let arr3=[]
function buildArray(){
    let a=[] // any[]
    a.push(1)   // number[]
    a.push("a") // (string | number)[]
    return a
}
arr3=buildArray()  //(string | number)[]
//arr3.push(true) // 所以会报错


const cc:[number]=[1]
const dd:[string,string,number]=['go','zp',20]
const ee:[string,number?]=["123"]

const ff:[string,number,...boolean[]]=["gg",123,false,true]




const demoHandler=(...num:number[])=>{
    console.log("num",num) // [1,5,5,9,10]
}
// demoHandler(1,5,5,9,10)



function* createFibonacci() {
    let a = 0
    let b = 1

    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const gen=createFibonacci() //这一步是最关键的，一定要这么用
// console.log(gen.next().value)
// console.log(gen.next().value)


let num={
    *[Symbol.iterator](){
        for (let i = 0; i < 10; i++) {
            yield i
        }

    }
}






