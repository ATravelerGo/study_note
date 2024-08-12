var MyBundle = (function () {
    'use strict';

    var main = {};

    // export const username="张辰"
    //
    //
    // export const age=16
    const username="张辰";

    function add(a, b) {
        return a + b;
    }



    var user = {
        add,
        username
    };

    // import  {username} from './user'



    // const getName=()=>{
    //     return data
    // }
    //
    // const myName=getName()
    //
    // console.log("myName",myName)

    const data = user;

    console.log(data.add(2, 3));  // 输出: 5

    return main;

})();
