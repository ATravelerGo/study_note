import numpy as np


def and_np(x1, x2):
    x = np.array([x1, x2])  # 输入值
    w = np.array([0.5, 0.5])  # 权重
    b = -0.7  # 偏置

    z = np.sum(w * x) + b
    print(z)


def AND(x1, x2):
    w1, w2, theta = 0.5, 0.5, 0.7
    temp = x1 * w1 + x2 * w2
    if temp > theta:
        return 1.0
    else:
        return 0.0


if __name__ == '__main__':
    # print(AND(1, 1))
    and_np(0, 1)
