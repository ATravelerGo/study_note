import matplotlib.pyplot as plt
import numpy as np


def sigmoid(x):
    return 1 / (1 + np.exp(-x))


if __name__ == '__main__':
    x = np.arange(-5, 5, 0.1)
    y = sigmoid(x)
    plt.plot(x, y)
    plt.show()
