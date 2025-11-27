import os
from tensorflow.keras import models
import matplotlib.pyplot as plt

import tensorflow as tf
import numpy as np

if __name__ == '__main__':
    if os.path.exists('mnist_model.h5'):
        model = models.load_model('mnist_model.h5')
        # 加载训练集
        _, (test_images, test_labels) = tf.keras.datasets.mnist.load_data()

        # 1. 归一化 (与训练时保持一致)
        test_images = test_images.astype('float32') / 255.0
        print("测试数据归一化完成。")

        # 2. 获取单张图片以及真实标签
        test_image = test_images[3]
        test_label = test_labels[3]

        # 3. 增加批次维度，（28，28）-> (1,28,28)
        # 模型总是期望输入是一个批次的图片  这是因为 model.predict() 要求输入必须是 (batch_size, height, width)，即使你只预测一张图片，也需要加上 batch 维度。
        input_data = np.expand_dims(test_image, axis=0)

        # 4. 执行预测，获取概率分布
        predictions = model.predict(input_data)

        # 5. 找出最高概率对应的索引，获取预测结果
        predicted_label = np.argmax(predictions[0])

        # 5. 显示结果
        # 解决中文乱码
        plt.rcParams['font.sans-serif'] = ['SimHei']  # 指定中文字体为黑体
        plt.rcParams['axes.unicode_minus'] = False  # 解决负号显示问题
        plt.imshow(test_image, cmap='gray')
        plt.title(f"预测图片索引: 0, 真实标签: {test_label}, 模型预测: {predicted_label}")
        plt.show()
