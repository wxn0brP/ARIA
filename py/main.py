import os, sys
from rozp import getText
from time import sleep

def zamien_na_kod(wiadomosc):
    zamienienia = {
        "ą": "&aa-",
        "ć": "&ca-",
        "ę": "&eo-",
        "ł": "&ls-",
        "ń": "&na-",
        "ó": "&oa-",
        "ś": "&sa-",
        "ź": "&za-",
        "ż": "&zd-"
    }
    return "".join(zamienienia.get(znak, znak) for znak in wiadomosc)

if __name__ == "__main__":
    while True:
        sleep(1)
        odp = getText()
        if odp != None:
            odp = zamien_na_kod(odp)
            print(";;"+odp+";;")
            sys.stdout.flush()
