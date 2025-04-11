




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

type catOrDogOrBoth= cat | dog

let cat:catOrDogOrBoth ={
    name:"bonkers",
    purrs:true,
}
