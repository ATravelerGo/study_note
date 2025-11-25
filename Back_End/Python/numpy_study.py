import numpy as np
import matplotlib.pyplot as plt

if __name__ == '__main__':
    #   生成np数组
    x = np.array([1, 2, 3, 4, 5])
    y = np.array([1, 2, 3, 4, 5])
    # print(x + y)
    # print(x - y)
    # print(x * y)
    # print(x / y)
    # print(x / 2)

    z = np.array([[1, 2], [3, 4]])
    a = np.array([[5, 6], [7, 8]])

    b = z.flatten()
    # print(b)
    # print(b > 2)
    # print(b[b > 2])

    k = np.arange(1, 10, 0.1)
    m = np.sin(k)
    n = np.cos(k)
    plt.plot(k, m, label='sin')
    plt.show()
