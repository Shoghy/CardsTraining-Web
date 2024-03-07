import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";

export interface BasicButtonProps extends TouchableOpacityProps{
  disabledStyle?: StyleProp<ViewStyle>
}

export default function BasicButton({disabled, style, disabledStyle, ...props}: BasicButtonProps){
  function GetStyle(): StyleProp<ViewStyle>{
    if(!disabled) return style;
    return [style, {opacity: 0.4}, disabledStyle];
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      style={GetStyle()}
      {...props}
    />
  );
}
