import numpy as np


# 与 训练

class Perceptron:
    def __init__(self, input_dim, learning_rate=0.1):
        # 初始化权重W 和偏执b
        self.W = np.zeros(input_dim)  # 表示创建一个 长度为 input_num 的 1D 数组，数组里的所有元素全部是 0。
        self.b = 0.0
        self.learning_rate = learning_rate

    def predict(self, x):
        z = np.dot(x, self.W) + self.b  # x 的每个元素 × W 的对应元素，然后相加
        return np.where(z > 0, 1, 0)

    def train(self, X, y, epochs):
        # 训练模型；遍历数据并根据误差调整W和b
        print(f"开始训练...{epochs}轮")
        for epoch in range(epochs):
            total_error = 0

            # 遍历数据
            for i in range(len(X)):
                x_sample = X[i]  # 这是取训练数据中第一个样本
                target = y[i]  # 这是取训练数据中第一个样本对应的正确答案

                prediction = self.predict(x_sample)  # 这是第一次预测的

                # 计算误差
                error = target - prediction
                total_error += error

                if error != 0:
                    # 更新权重 W = W + 学习率 * 误差 * 输入
                    self.W += self.learning_rate * error * x_sample
                    # 更新偏执 b = b + 学习率 * 误差
                    self.b += self.learning_rate * error
            # 打印当前训练状态
            print(f"第 {epoch + 1} 轮 | 错误总数: {total_error} | W={self.W}, b={self.b:.2f}")

            # 如果本轮没有错误，说明模型已收敛，停止训练
            if total_error == 0:
                print(">>> 训练完成，模型已学会所有样本。")
                break


# 2. 准备 AND 逻辑数据
# 输入 X：[写作业, 洗碗]
X_train = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
# 标签 y：对应的正确答案 (AND)
y_train = np.array([0, 0, 0, 1])

# 3. 运行感知机
# 输入维度是 2 (写作业和洗碗)
model = Perceptron(input_dim=2, learning_rate=0.2)
model.train(X_train, y_train, 10)

# 4. 最终测试
print("\n--- 最终测试结果 ---")
print(f"输入 (0, 0): {model.predict(np.array([0, 0]))}")
print(f"输入 (1, 1): {model.predict(np.array([1, 1]))}")
