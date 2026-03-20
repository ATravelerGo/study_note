import tensorflow as tf
from tensorflow.keras import layers, models
import matplotlib.pyplot as plt


def load_data():
    # 加载 MNIST
    (train_images, train_labels), (test_images, test_labels) = tf.keras.datasets.mnist.load_data()
    train_images = train_images.astype('float32') / 255.0
    test_images = test_images.astype('float32') / 255.0

    train_images = train_images[..., tf.newaxis]  # (28,28,1)
    test_images = test_images[..., tf.newaxis]

    num_classes = 10
    train_labels = tf.keras.utils.to_categorical(train_labels, num_classes)
    test_labels = tf.keras.utils.to_categorical(test_labels, num_classes)

    return train_images, train_labels, test_images, test_labels, num_classes


def build_model(input_shape, num_classes):
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model


def plot_history(history):
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


def main():
    train_images, train_labels, test_images, test_labels, num_classes = load_data()
    model = build_model((28, 28, 1), num_classes)
    history = model.fit(
        train_images, train_labels,
        epochs=20,
        batch_size=128,
        validation_data=(test_images, test_labels),
        verbose=1
    )
    plot_history(history)


if __name__ == "__main__":
    main()
