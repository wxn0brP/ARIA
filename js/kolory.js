function format(k){
    return "\x1b["+k+"m";
}
var koloryObj = {
    czerwony: "31",
    zielony: "32",
    zolty: "33",
    niebieski: "34",
    magenta: "35",
    clear: "0",
};
for(var k in koloryObj){
    koloryObj[k] = format(koloryObj[k]);
}
module.exports = koloryObj;