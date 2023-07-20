from time import sleep
from keyboard import is_pressed
import speech_recognition as sr
rec = sr.Recognizer()

def getText():
    try:
        with sr.Microphone() as source:
            if is_pressed("ctrl"):
                return None
            audio = rec.record(source, duration=7)
            text = rec.recognize_google(audio, language="pl-PL")
            if text=="":
                return None
            else:
                return text
    except KeyboardInterrupt:
        exit()
    except Exception as err:
        print(err)
        return None