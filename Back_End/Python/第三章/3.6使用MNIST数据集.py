# TensorFlow是由Google Brain团队开发的开源机器学习框架，广泛应用于模型构建与部署
import numpy as np
import tensorflow as tf
from tensorflow.keras import Sequential, Input
from tensorflow.keras.layers import Dense, Flatten

import matplotlib.pyplot as plt  # 绘制图片 and 展示图片
import PIL.Image as img

# Sequential
# 用于创建一个顺序模型（按顺序堆叠层）。输入必须是一维的数组

# Input
# 指定模型输入的形状，比如Input(shape=(28, 28))


# Dense
# 全连接层（最常用的神经网络层）

# 把 28×28 的图片变成 784 个输入，通过两个隐藏层学习特征，最后用 softmax 做 10 分类。

if __name__ == '__main__':
    # 1. 加载MNIST数据集
    (train_images, train_labels), (test_images, test_labels) = tf.keras.datasets.mnist.load_data()

    # 要让 Matplotlib 实际弹出窗口并显示图像，您必须在调用 plt.imshow() 之后，显式地调用 plt.show() 函数。
    # plt.imshow(train_images[0], cmap='gray')
    # plt.show()

    # 现在的图片是（28,28）的二维数组，我们要引入到神经网络需要一位数组

    # 2. 归一化 (将像素值缩放到 0 到 1)
    train_images = train_images.astype('float32') / 255.0
    test_images = test_images.astype('float32') / 255.0
    print("数据加载与归一化完成。")

    # 3. 定义模型架构
    model = Sequential([
        # 1. 输入层 / 展平层 （28*28->784）
        # input_shape 仅需指定图片的尺寸（28*28）
        Input(shape=(28, 28)),
        Flatten(),

        # 2. 隐藏层 （50个神经元，使用 ReLU 激活）
        Dense(50, activation='relu'),

        # 3. 隐藏层 （100 个神经元，使用 ReLU 激活）
        Dense(100, activation='relu'),

        # 4. 输出层 (10 个神经元，使用 Softmax 激活输出概率)
        Dense(10, activation='softmax')
    ])
    model.summary()  # 到现在为止，已经定义了模型结构，但是还没有训练模型，所以还没有权重。
    print("模型定义完成。现在进入训练前的最后一步，【编译模型】")
    # 编译是为了配置模型在训练时所使用的数学工具，这主要涉及三个核心组件：
    # 1. 优化器（optimizer）:决定如何调整权重和偏差
    # 2. 损失函数（loss）:决定如何衡量模型在训练过程中所犯的错误
    # 3. 评估指标（metrics）:决定如何评价模型性能

    # 4. 编译模型
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    print('模型编译完成')

    # 5. 训练模型
    history = model.fit(train_images, train_labels, epochs=5, validation_data=(test_images, test_labels))

    # 6. 保存模型
    model.save('mnist_model.h5')
