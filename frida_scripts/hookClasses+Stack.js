/*
This will probably sometimes not work. I don't know why but I guess it's because I trigger an error.  
In that case use the hookClasses.js
*/
const classesToMonitor = [
    'com.lib.blueUtils.BLESPPUtils',
    'com.lib.blueUtils.BluetoothUtils',
    'com.lib.blueUtils.PrinterModel',
    'com.lib.blueUtils.PrinterModelUtils',
    'com.lib.blueUtils.PrintDataUtils',
    'com.activity.PrintPreviewActivity',
    'cn.com.heaton.blelibrary.ble.BluetoothLeService',
    'cn.com.heaton.blelibrary.spp.BluetoothSPPService',
    'androidx.core.app.SharedElementCallback',
    'androidx.constraintlayout.solver.widgets.Rectangle',
    'androidx.print.PrintHelper',
    'androidx.core.graphics.BitmapCompat'
];

Java.perform(function() {
    console.log("[*] Starting to monitor specific classes");

    // Use the Java Exception class to capture the stack trace
    var Exception = Java.use("java.lang.Exception");

    // Iterate through the classes you want to monitor
    classesToMonitor.forEach(function(className) {
        try {
            // Get the class object using Frida's Java API
            var clazz = Java.use(className);
            console.log("[*] Hooking class: " + className);

            // Hook each method with overloads considered
            clazz.class.getDeclaredMethods().forEach(function(method) {
                var methodName = method.getName();
                var methodSignature = method.toGenericString(); // Unique signature including parameter types
                console.log("[*] Hooking method: " + methodName + " in " + className + " with signature: " + methodSignature);

                // If the method is overloaded, we need to hook the specific overload based on argument types
                try {
                    var overloads = clazz[methodName].overloads;

                    overloads.forEach(function(overload) {
                        overload.implementation = function() {
                            // Call the original method and get its return value
                            var returnValue = overload.apply(this, arguments);

                            // Log everything
                            console.log("------");
                            console.log("   [#] Class " + className + "." + methodName);
                            console.log("           Signature: " + overload.methodName);

                            // Get the arguments
                            if (arguments.length === 0) {
                                console.log("           Arguments: ()");
                            } else {
                                console.log("           Arguments: (" + Array.from(arguments).join(",") + ")");
                            }

                            // Get the stack trace
                            var stackTrace = Exception.$new().getStackTrace();
                            console.log("           Stack Trace: ");
                            for (var i = 0; i < stackTrace.length; i++) {
                                console.log("                at " + stackTrace[i].toString());
                            }

                            console.log("           Returned: " + returnValue);
                            console.log("------");

                            return returnValue; // Return the original value
                        };
                    });
                } catch (e) {
                    console.log("[!] Error hooking overloaded method: " + methodName + " -> " + e);
                    return returnValue;
                }
            });
        } catch (e) {
            console.log("[!] Error hooking class: " + className + " -> " + e);
        }
    });

    console.log("[*] Finished hooking all specified classes");
});