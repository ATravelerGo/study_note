# 这是一个示例 Python 脚本。

# 按 Shift+F10 执行或将其替换为您的代码。
# 按 双击 Shift 在所有地方搜索类、文件、工具窗口、操作和设置。


def print_hi(name):
    # 在下面的代码行中使用断点来调试脚本。
    print(f'Hi, {name}', type(11.12))  # 按 Ctrl+F8 切换断点。


def print_list(list):
    print(list)


class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def print_name(self):
        print(self.name)

    def print_age(self):
        print(self.age)

    
# 按装订区域中的绿色按钮以运行脚本。
if __name__ == '__main__':
    print_hi('PyCharm')
    print_list([1, 2, 3, 4, 5])

    user = User('张', 18)
    user.print_name()
    user.print_age()

# 访问 https://www.jetbrains.com/help/pycharm/ 获取 PyCharm 帮助
