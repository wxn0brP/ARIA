(function(){
    const path = "http://localhost:14459";
    var script = document.createElement("script");
    script.src = path+"/sock.js"
    var
        inputEle = null,
        btnEle = null,
        ostatnie = null,
        socket = null,
        lastEle = null;
    
    var ok = ["ok", "okej", "enter"];
    var cofnij = ["cofnij"];

    script.onload = function(){
        socket = io(path);
        socket.on("msg", (data) => parseMsg(data));
    }
    function parseMsg(data){
        if(!inputEle) return;
        var tr = data.trim().toLowerCase();
        if(ok.includes(tr)){
            if(!btnEle) return;
            inputEle.value = inputEle.value.trim();
            inputEle.focus();
            inputEle.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
            lastEle = null;
            setTimeout(() => btnEle.click(), 300);
            setTimeout(() => getRes(), 1800);
        }else if(cofnij.includes(tr)){
            inputEle.value = inputEle.value.replace(ostatnie, "").trim();
        }
        else{
            ostatnie = data;
            inputEle.value += " " + data;
        }
    }
    function getRes(){
        var ele = getLastEle();
        if(ele != lastEle){
            lastEle = ele;
            setTimeout(() => getRes(), 1000);
        }else{
            setTimeout(() => czytajF(), 1000);
        }
    }
    function getTextInEle(element){
        var tekst = '';
        if(element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE){
            tekst += element.childNodes[0].textContent;
        }
        for(var i = 0; i < element.childNodes.length; i++){
            var child = element.childNodes[i];
            if(child.nodeType === Node.ELEMENT_NODE){
                tekst += getTextInEle(child);
            }
        }
        return tekst;
    }
    function getLastEle(){
        var eles = document.querySelectorAll(".markdown.prose.w-full.break-words");
        if(eles.length == 0) return null;
        return eles[eles.length - 1];
    }  
    function czytajF(){
        var txt = getTextInEle(getLastEle());
        lastText = txt;
        socket.emit("msg", txt);
    }
    function setEle(){
        inputEle = document.getElementById("prompt-textarea");
        var xpath = "/html/body/div[1]/div[1]/div[2]/div/main/div[3]/form/div/div/button";
        var result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        btnEle = result.singleNodeValue;
    }
    window.ARIA = function(){
        setEle();
        document.body.appendChild(script);
    }
    window.ARIA.set = () => setEle();
    window.ARIA.dis = () => socket.disconnect();
})()
setTimeout(function(){
    var odp = confirm("Czy chcesz uruchomić ARIA w tym oknie?");
    if(!odp) return;
    setTimeout(() => window.ARIA(), 3000);
}, 3000)