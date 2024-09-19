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
Check for specific classes like:
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