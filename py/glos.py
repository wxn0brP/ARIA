from pyttsx3 import init

engine = init()

def rate(rate):
    engine.setProperty('rate', rate)
    
def speak(text):
    engine.say(text)
    engine.runAndWait()
