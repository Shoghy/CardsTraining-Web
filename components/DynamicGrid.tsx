import { useState } from "react";
import { CellRendererProps, FlatList, View, StyleSheet, ListRenderItem, ViewStyle, StyleProp, LayoutChangeEvent } from "react-native";

export interface DynamicGridProps<T>{
  data: T[]
  renderItem: ListRenderItem<T> | null | undefined
  style?: StyleProp<ViewStyle>
  gap?: number
}

export default function DynamicGrid<T>({
  data, renderItem, style, gap = 0
}: DynamicGridProps<T>){
  const [cellWidth, setCellWidth] = useState(1);

  function CellRenderer<T>(props: CellRendererProps<T>){
    return (
      <View
        {... props}
        style={[
          props.style,
          styles.cell,
          {width: cellWidth}
        ]}
      />
    );
  }

  function OnLayout(event: LayoutChangeEvent){
    const {width, height} = event.nativeEvent.layout;
    const aspectRatio = height/width;
    setCellWidth(Math.floor(width/Math.floor(4/aspectRatio))-gap*2);
  }

  return (
    <FlatList
      data={data}
      style={[style]}
      contentContainerStyle={[styles.contentContainer, {gap: gap}]}
      renderItem={renderItem}
      CellRendererComponent={CellRenderer}
      onLayout={OnLayout}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  cell:{
    aspectRatio: 1,
    backgroundColor: "#f00",
    maxWidth: "100%"
  }
});