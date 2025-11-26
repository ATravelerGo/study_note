import numpy as np


def softMax(x):
    exp_x = np.exp(x)
    exp_sum = np.sum(exp_x)

    exp_x_temp = exp_x - np.max(exp_x)

    return exp_x_temp / exp_sum


if __name__ == '__main__':
    print(softMax(np.array([0.3, 2.9, 4.0])))
