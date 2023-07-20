function czy_zawiera(string, slowa){
    string = string.split(" ");
    if(string.length == 0) string = string.toLowerCase();
    else string = string[0].toLowerCase();
    for(let i=0; i<slowa.length; i++){
        if(slowa[i].toLowerCase() == string) return true;
    }
    return false;
}

var wl_wyl = {
    true: "włączona",
    false: "wyłączona"
};

var config = {
    aria: false,
    chat: false,
};

var listy = {
    aria: ["aria"],
    chat: ["czat", "chat"],
    powitanie: ["cześć", "witaj", "hej"],
};

async function interpreter(input){
    var c = (l) => czy_zawiera(input, l)
    if(c(listy.aria)){
        config.aria = !config.aria;
        speak("Aria jest "+wl_wyl[config.aria]);
        return;
    }
    if(!config.aria) return;

    if(c(listy.chat)){
        config.chat = !config.chat;
        speak("funkcja czatu jest "+wl_wyl[config.chat])
    }else
    if(config.chat){
        global.socketGpt.sendToSocket(input);
        await delay(1000);
    }else
    if(c(listy.powitanie)){
        speak("Witaj");
    }
}

module.exports = {
    interpreter,
    listy,
};