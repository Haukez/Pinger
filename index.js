const { ipcRenderer } = window.require("electron");
const electron = window.require('electron');
let ipc = ipcRenderer;
  
      
ipc.on('update-notify-value', function (event, arg) {       
    if (arg == 'Packetloss'){
        document.getElementById('value').innerHTML = 'Packetloss';
    } 
    else{       
         
        targetPingVal = Number(arg);
        // console.log(arg);
        document.getElementById('value').innerHTML = targetPingVal.toLocaleString('de');
    }
    wdth = document.getElementById('size').clientWidth;
    hght = document.getElementById('size').clientHeight;
    ipc.send('resize',wdth , hght);
    // console.log(wdth, hght);          
})  


 