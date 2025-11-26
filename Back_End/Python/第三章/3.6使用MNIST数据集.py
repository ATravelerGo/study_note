# TensorFlow是由Google Brain团队开发的开源机器学习框架，广泛应用于模型构建与部署
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt  # 绘制图片 and 展示图片
import PIL.Image as img

if __name__ == '__main__':
    # 1. 加载MNIST数据集
    (train_images, train_labels), (test_images, test_labels) = tf.keras.datasets.mnist.load_data()

    # 要让 Matplotlib 实际弹出窗口并显示图像，您必须在调用 plt.imshow() 之后，显式地调用 plt.show() 函数。
    plt.imshow(train_images[0], cmap='gray')
    plt.show()
