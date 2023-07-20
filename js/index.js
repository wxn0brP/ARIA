const { spawn } = require("child_process");
const express = require("express");
const http = require("http");
const fs = require("fs");

global.lo = console.log;
global.socketGpt = require("./socketGpt");
global.delay = ms => new Promise(res => setTimeout(res, ms));
const interpreter = require("./interpreter");
const kolory = require("./kolory");

//server
const app = express();
const server = http.createServer(app);
socketGpt.start(server)

app.get("/", (req, res) => {
    res.send(fs.readFileSync("public/io.js", "utf8"));
});
app.use(express.static("public"));


server.listen(14459, function(){
    var txt = 
        kolory.niebieski + "Witaj!\n"+
        "Aby włączyć/wyłączyć ARIE powiedz: " + kolory.zielony +
        "\"ARIA\"\n" + kolory.clear;
    lo(txt);

    var polecenia = kolory.magenta + "Polecenia" + kolory.clear;
    for(var key in interpreter.listy){
        polecenia += "\n" +
            kolory.czerwony +
            key +
            kolory.clear +
            ": " +
            kolory.zolty +
            interpreter.listy[key].join(", ")
        ;
    }
    lo(polecenia+kolory.clear+"\n");
});

//python
const pythonProcess = spawn('python', ['py/main.py']);
pythonProcess.stdout.on('data', async (data) => {
    var input = data.toString().trim();
    var output = input.match(/;;([\s\S]*?);;/);
    if(!output) return;

    var result = output[1].trim();
    result = zamien_na_litery(result);
    lo("py: "+result);

    await interpreter.interpreter(result);
});

pythonProcess.stderr.on('data', (data) => console.error('Error Python:', data.toString()) );
pythonProcess.on('close', (code) => lo(`Python exited with code ${code}`) );

function zamien_na_litery(wiadomosc){
    const zamienienia = {
        "&aa-": "ą",
        "&ca-": "ć",
        "&eo-": "ę",
        "&ls-": "ł",
        "&na-": "ń",
        "&oa-": "ó",
        "&sa-": "ś",
        "&za-": "ź",
        "&zd-": "ż"
    };
    for(const kod in zamienienia){
        wiadomosc = wiadomosc.replaceAll(kod, zamienienia[kod]);
    }
    return wiadomosc;
}

global.speak = (txt) => {
    spawn('python', ['py/node.py', txt]);
}