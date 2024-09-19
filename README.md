# Apk reversing

## Tools

### ADB
- Start server: `sudo adb start-server`
- Stop server: `sudo adb kill-server`
- Interactive shell: `adb shell`
- Log 1: `adb logcat --pid=P -s TAG`
- Log 2: `adb logcat --pid=P *:E`

### Frida
- Firda server location: `/data/local/temp`
- Stop frida server: `ps -e | grep frida-server`,`kill -9 pid`
- Connect to USB device: `frida -U`
- Listen to target by name: `frida -U -f com.*`
- Load a script: `frida -U -l script.js -f com.*`
- Output to file: `frida -U -l script.js -f com.* | tee frida.log`

## Bluetooth

### Check for specific classes like:
- `com.lib.blueUtils.BLESPPUtils`
- `com.lib.blueUtils.BluetoothUtils`
- `com.lib.blueUtils.PrinterModel`
- `com.lib.blueUtils.PrinterModelUtils`
- `com.lib.blueUtils.PrintDataUtils`
- `com.activity.PrintPreviewActivity`
- `cn.com.heaton.blelibrary.ble.BluetoothLeService`
- `cn.com.heaton.blelibrary.spp.BluetoothSPPService`
- `androidx.core.app.SharedElementCallback`
- `androidx.constraintlayout.solver.widgets.Rectangle`
- `androidx.print.PrintHelper`
- `androidx.core.graphics.BitmapCompat`

### Find uuids
UUIDS normaly start with `0000` and you can easily search for them.  
You can also use the `scanBLEDevice.py` to scan a specific bluetooth device. All you need is its MAC address.  
Find a `WRITE-WITHOUT-RESPONSE`. Those are the most important. Other not so much.

### Check TarConstants
Sometimes the printers use `TarConstants`. In there you can find some variables that are used to construct CMD commands for Bluetooth devices.  

### Check for possible variables
If you're reversing a printer check for `paper`, `print_img`, `print_text`, `getDevId`, etc.

### How to print
Sometimes printing isn't that straight forward. You can check some existing reversed bluetooth thermal printers here to get a general understanding of how the data is sent.  
- https://github.com/WerWolv/PythonCatPrinter
- https://github.com/lisp3r/bluetooth-thermal-printer