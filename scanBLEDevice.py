from bleak import BleakClient, BleakError
from bleak.backends.characteristic import BleakGATTCharacteristic
import asyncio

async def get_device_info(address):
    try:
        async with BleakClient(address) as client:
            print(f"Connected: {client.is_connected}")

            services = await client.get_services()
            for service in services:
                print(f"Service: {service.uuid}")
                for characteristic in service.characteristics:
                    # Check if the characteristic supports read, write, or notify
                    properties = characteristic.properties
                    supports = []
                    if 'read' in properties:
                        supports.append("READ")
                    if 'write' in properties:
                        supports.append("WRITE")
                    if 'notify' in properties:
                        supports.append("NOTIFY")
                    if 'indicate' in properties:
                        supports.append("INDICATE")
                    if 'write-without-response' in properties:
                        supports.append("WRITE-WITHOUT-RESPONSE")
                    print(f"    Characteristic {characteristic.uuid} supports: {'/'.join(supports)}")

    except BleakError as e:
        print(f"An error occurred: {e}")

# Replace 'address' with the actual address of the device you want to connect to
device_address = "7B:E9:39:98:65:D3"
asyncio.run(get_device_info(device_address))
