const mockRequest = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("请求成功");
      } else {
        reject("请求失败");
      }
      // resolve("请求成功");
    }, time);
  });
};

class SuperTask {
  constructor(paralleCount = 2) {
    this.paralleCount = paralleCount; //可以并行运行的数量
    this.tasksList = []; //等待运行的接口
    this.runningCount = 0; //正在运行的接口
  }
  //传的是个回调
  addTask(task) {
    // this.tasksList.push(task);
    // this.runTask();

    return new Promise((resolve, reject) => {
      this.tasksList.push({
        task,
        resolve,
        reject,
      });
      this.runTask();
    });
  }

  runTask() {
    while (this.runningCount < this.paralleCount && this.tasksList.length) {
      //如果当前运行的任务数 小于 限制的任务数 并且任务列表里不为空 就可以执行操作
      const { task, resolve, reject } = this.tasksList.shift();
      this.runningCount++;
      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this.runTask();
        });
    }
  }
}

const superTask = new SuperTask(10);

superTask
  .addTask(() => mockRequest(300))
  .then(() => {
    console.log("任务完成");
  })
  .catch(() => {
    console.log("任务失败");
  });
superTask
  .addTask(() => mockRequest(400))
  .then(() => {
    console.log("任务完成");
  })
  .catch(() => {
    console.log("任务失败");
  });
superTask
  .addTask(() => mockRequest(500))
  .then(() => {
    console.log("任务完成");
  })
  .catch(() => {
    console.log("任务失败");
  });
superTask
  .addTask(() => mockRequest(600))
  .then(() => {
    console.log("任务完成");
  })
  .catch(() => {
    console.log("任务失败");
  });
superTask
  .addTask(() => mockRequest(700))
  .then(() => {
    console.log("任务完成");
  })
  .catch(() => {
    console.log("任务失败");
  });
superTask
  .addTask(() => mockRequest(800))
  .then(() => {
    console.log("任务完成");
  })
  .catch(() => {
    console.log("任务失败");
  });
superTask
  .addTask(() => mockRequest(800))
  .then(() => {
    console.log("任务完成");
  })
  .catch(() => {
    console.log("任务失败");
  });

superTask
  .addTask(() => mockRequest(800))
  .then(() => {
    console.log("任务完成");
  })
  .catch(() => {
    console.log("任务失败");
  });

superTask
  .addTask(() => mockRequest(800))
  .then(() => {
    console.log("任务完成");
  })
  .catch(() => {
    console.log("任务失败");
  });

superTask
  .addTask(() => mockRequest(800))
  .then(() => {
    console.log("任务完成");
  })
  .catch(() => {
    console.log("任务失败");
  });
