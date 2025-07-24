const information = document.getElementById("info");
information.innerText = `本应用正在使用 Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), 和 Electron (v${window.versions.electron()})`;

// const func = async () => {
//   const response = await window.versions.ping();
//   console.log(response); // 打印 'pong'
// };
//
// func();

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");

btn1.addEventListener("click", () => {
  versions.toggle();
});
btn2.addEventListener("click", () => {
  versions.system();
});
