import { Platform, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";
let isiPad = DeviceInfo.getModel().includes("iPad");
let isTablet = DeviceInfo.isTablet();
export const globalStyles = StyleSheet.create({
    
    containerAuth: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    container: {
        paddingHorizontal: 24,
        paddingVertical:isiPad? 40:80,
     

 
      
    },
})