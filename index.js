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
    ipc.send('resize', document.getElementById('size').clientWidth, document.getElementById('size').clientHeight);
    console.log(document.getElementById('size').clientWidth, document.getElementById('size').clientHeight);
                
})  


 