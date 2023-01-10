# 这是一个新的编程语言

你可以尝试用他写出HelloWorld

![helloWorld](https://link.jscdn.cn/sharepoint/aHR0cHM6Ly9wODdnLW15LnNoYXJlcG9pbnQuY29tLzppOi9nL3BlcnNvbmFsL2FkcWJlcl9wODdnX29ubWljcm9zb2Z0X2NvbS9FVkg4ZHQ3bE5aVk5uMVFrUDhEbTZpZ0JOcWVrRFMzalJlTnlHLWlrcWx2UW9RP2U9eFVpekdp.png)



# \(A|U|B\) 

<!-- 0xF1|0xF2|0xF3 -->

必须在程序的头部，用于指定输出的字符编码。

- A : ASCII
- U : UTF-8
- B : Base64

# 1

<!--49 0x0-->

当前Byte的值增加1。

# 0

<!--48 [0X26,0x43,0x12,0x57,0x3E]-->

当前Byte清空，

需要注意这实际为 语法糖，编译时转换为：LX-FR-SL-JY-R，会覆写唯一独立Byte中的值

注：当指针小于0时指针将从主缓冲的末尾开始倒数

# S

<!--83 0x1-->

当前Byte的值减少1。

# L

<!--76 0x2-->

将指针向左移动一位。

# R

<!--82 0x3-->

将指针向右移动一位。

# F

<!--70 0x4-->

标记这个指令在代码中的的位置到当前Byte中。

# J

<!--74 0x5-->

如果当前Byte的下一位不为0，则跳到当前Byte值所对应的指令位置继续执行。

需要注意的是，值所指向的指令本身不会被执行。

# X

<!--88 0x6-->

缓存当前Byte的值到唯一的独立Byte中。

# Y

<!--89 0x7-->

读取独立Byte的值写到当前Byte。

# O

<!--81 0x8-->

将当前Byte的值存进A-Buffer尾部。

# C

<!--67 0x9-->

清空A-Buffer。

# I

<!--73 0xA-->

获取输入的字串，将当前Byte作为index，输入字串到B-Buffer对应位置中。

# A

<!--65 0xB-->

将当前Byte作为index，读取A-Buffer中对应的值覆盖当前Byte。

# B

<!--66 0xC-->

将当前Byte作为index，读取B-Buffer中对应的值覆盖当前Byte。

#  P

<!--80 0xD-->

将A-Buffer中的数据根据指定的字符编码一次性输出。



<!--0xE不会被运行，当数据长度出现半个Byte时会使用0xE填充-->



# /\*注释*/



| 指令  | ASCII  | 编码                           |
| :---- | :----- | ------------------------------ |
| 1     | 49     | 0x0                            |
| ~~0~~ | ~~48~~ | ~~[0X26,0x43,0x12,0x57,0x3E]~~ |
| S     | 83     | 0x1                            |
| L     | 76     | 0x2                            |
| R     | 82     | 0x3                            |
| F     | 70     | 0x4                            |
| J     | 74     | 0x5                            |
| X     | 88     | 0x6                            |
| Y     | 89     | 0x7                            |
| O     | 81     | 0x8                            |
| C     | 67     | 0x9                            |
| I     | 73     | 0xA                            |
| A     | 65     | 0xB                            |
| B     | 66     | 0xC                            |
| P     | 80     | 0xD                            |
| -     | 45     | 0xE                            |

