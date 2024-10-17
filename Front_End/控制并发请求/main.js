//控制并发请求

const mockRequest = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("响应数据");
    }, time);
  });
};

//const requestList = new Array(10).fill(mockRequest(1000));

class SuperTask {
  paralleCount = 0;
  tasks = [];
  runningCount = 0;
  constructor(paralleCount = 2) {
    this.paralleCount = paralleCount; //并发量
    this.tasks = [];
    this.runningCount = 0; //正在运行的任务量
  }

  addTask(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        //在数组里面添加异步任务
        task,
        resolve,
        reject,
      });

      this._run(); //这里this指向的是实例
    });
  }

  _run() {
    //依次运行任务
    while (this.runningCount < this.paralleCount && this.tasks.length) {
      const { task, resolve, reject } = this.tasks.shift();
      this.runningCount++;
      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this._run();
        });
    }
  }
}

const superTask = new SuperTask();
function addTask(time, name) {
  superTask
    .addTask(() => mockRequest(time))
    .then(() => console.log(`任务${name}完成`));
}

addTask(10000, 1);
addTask(2000, 2);
addTask(1000, 3);
addTask(1000, 4);
addTask(3000, 5);
addTask(2000, 6);
addTask(4000, 7);
addTask(2000, 8);
