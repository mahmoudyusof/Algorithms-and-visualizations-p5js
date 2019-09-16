import math
import random

arr = [random.randint(1, 50) for _ in range(10)]

def merge(a, b):
    res = []
    while(len(a) != 0 and len(b) != 0):
        if(a[0] >= b[0]):
            res.append(b[0])
            b.pop(0)
        else:
            res.append(a[0])
            a.pop(0)
    
    if(len(a) == 0):
        res = res + b
    elif(len(b) == 0):
        res = res + a
    
    return res



def mergeSort(ar):
    if(len(ar) == 1):
        return ar
    else:
        mid = math.floor(len(ar) / 2)
        right = mergeSort(ar[:mid])
        left = mergeSort(ar[mid:])
        return merge(right, left)


print(arr)
print(mergeSort(arr))

