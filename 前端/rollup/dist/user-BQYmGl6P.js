const username="张辰";
function add(a, b) {
    console.log(111);
    return a + b;
}
// module.exports = {
//     add,
//     username
// };

var user = {
    username,add

};

export { user as default };
