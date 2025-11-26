import numpy as np

if __name__ == '__main__':
    # 一维数组
    a = np.array([1, 2, 3])
    print(a)
    print(np.ndim(a))
    print(a.shape)

    # 二维数组也成为矩阵
    b = np.array([[1, 2, 3], [4, 5, 6]])
    print(b)
    print(np.ndim(b))
    print(b.shape)  # 行，列

    # 矩阵相乘
    c = np.array([[1, 2], [3, 4]])
    d = np.array([[5, 6], [7, 8]])
    print(np.dot(c, d))
