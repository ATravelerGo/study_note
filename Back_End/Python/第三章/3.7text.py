# 完整 MNIST 数字识别训练 + 可视化示例

import tensorflow as tf
from tensorflow.keras import layers, models
import matplotlib.pyplot as plt

# 1️⃣ 加载 MNIST 数据集
(train_images, train_labels), (test_images, test_labels) = tf.keras.datasets.mnist.load_data()

# 归一化到 [0,1]
train_images = train_images.astype('float32') / 255.0
test_images = test_images.astype('float32') / 255.0

# 扩展通道维度 (28,28) -> (28,28,1)
train_images = train_images[..., tf.newaxis]
test_images = test_images[..., tf.newaxis]

# 标签 one-hot 编码
num_classes = 10
train_labels = tf.keras.utils.to_categorical(train_labels, num_classes)
test_labels = tf.keras.utils.to_categorical(test_labels, num_classes)

# 2️⃣ 搭建 CNN 模型
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(num_classes, activation='softmax')
])

# 3️⃣ 编译模型
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# 4️⃣ 训练模型并记录历史
history = model.fit(
    train_images,
    train_labels,
    epochs=20,  # 可以调整轮数
    batch_size=128,
    validation_data=(test_images, test_labels),
    verbose=1
)

# 5️⃣ 绘制训练 & 验证准确率和损失曲线
plt.figure(figsize=(12, 5))

# 准确率
plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Training Accuracy', marker='o')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy', marker='x')
plt.title('Model Accuracy During Training')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True)

# 损失
plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Training Loss', marker='o')
plt.plot(history.history['val_loss'], label='Validation Loss', marker='x')
plt.title('Model Loss During Training')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.show()
