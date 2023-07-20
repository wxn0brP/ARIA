import sys

rate=200
txt=""

if len(sys.argv) >= 2:
    txt = sys.argv[1]
else:
    print("err")
    exit()

if len(sys.argv) >= 3:
    rate=int(sys.argv[2])

import glos
glos.rate(rate)
glos.speak(txt)