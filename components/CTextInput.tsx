import { useMemo, useState } from "react";
import { ColorValue, StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";

export interface CTextInputProps extends TextInputProps{
  fontSize?: number
  color?: ColorValue
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
}

export default function CTextInput({
  style, fontSize, color,
  fontWeight, ...props
}: CTextInputProps){
  const style2: StyleProp<TextStyle> = {
    fontSize,
    color,
    fontWeight
  };

  return (
    <TextInput
      style={[styles.input, style2, style]}
      {...props}
    />
  );
}

export type SelfCTextInputElementProps = Omit<CTextInputProps, "value" |  "onChangeText">;

export interface SelfCTextInput{
  value: string
  Element: (props: SelfCTextInputElementProps) => React.JSX.Element
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export function useCTextInput(value: string = ""){
  const _self: SelfCTextInput = useMemo(() => {
    return {
      value,
      Element,
      setValue: () => {},
    };
  }, []);

  function Element({...props}: SelfCTextInputElementProps){
    const [value, setValue] = useState(_self.value);
    _self.value = value;
    _self.setValue = setValue;
  
    return (
      <CTextInput
        value={value}
        onChangeText={setValue}
        {...props}
      />
    );
  }

  return _self;
}

const styles = StyleSheet.create({
  input:{
    borderColor: "black",
    borderWidth: 2,
    fontSize: 20,
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
  }
});