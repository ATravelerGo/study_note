import numpy as np
import matplotlib.pyplot as plt


def ReLU(x):
    return np.maximum(0, x)


if __name__ == '__main__':
    x = np.arange(-5.0, 5.0, 0.1)
    y = ReLU(x)
    plt.plot(x, y)
    plt.show()
