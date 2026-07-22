# 87.py - doctest: inline tests in docstrings
def square(x):
    '''Return square of x.

    >>> square(3)
    9
    '''
    return x * x

if __name__ == '__main__':
    import doctest
    doctest.testmod()
