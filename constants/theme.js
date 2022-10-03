import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

export const COLORS = {
    primary: "#05668d",
    secondary: '#00a896',
    accent: '#f0f3bd',
    
    success: '#00C851',
    error: '#ff4444',

    black: "#171717",
    white: "#FFFFFF",
    background: "white"
}


export const SIZES = {
    base: 10,
    width,
    height
}