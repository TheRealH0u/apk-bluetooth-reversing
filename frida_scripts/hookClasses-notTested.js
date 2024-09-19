/*
This one is not tested yet. You can tell me if it works
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
                                const result = arr.map(el => {
                                        if (typeof el === 'string') {
                                            return `str: '${el}'`; // Wrap strings in single quotes and label
                                        } else if (Number.isInteger(el)) {
                                            return `int: ${el}`; // Label integers
                                        } else if (Array.isArray(el)) {
                                            return `arr: ${JSON.stringify(el)}`; // Convert array to JSON string and label
                                        } else if (typeof el === 'object') {
                                            return `obj: ${JSON.stringify(el)}`; // Convert object to JSON string and label
                                        } else {
                                            return `${typeof el}: ${el.name}`; // Default case for other types
                                        }
                                    })
                                    .join(', ');
                                console.log("           Arguments: (" + result + ")");
                            }
                            console.log("           Returned: " + returnValue);
                            console.log("------");

                            return returnValue; // Return the original value
                        };
                    });
                } catch (e) {
                    console.log("[!] Error hooking overloaded method: " + methodName + " -> " + e);
                }
            });
        } catch (e) {
            console.log("[!] Error hooking class: " + className + " -> " + e);
        }
    });

    console.log("[*] Finished hooking all specified classes");
});