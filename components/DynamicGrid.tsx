import { useState } from "react";
import { CellRendererProps, FlatList, View, StyleSheet, ListRenderItem, ViewStyle, StyleProp, LayoutChangeEvent } from "react-native";

export interface DynamicGridProps<T>{
  data: T[]
  renderItem: ListRenderItem<T> | null | undefined
  style?: StyleProp<ViewStyle>
  gap?: number,
  cellStyle?: StyleProp<ViewStyle>
  ListEmptyComponent?: React.JSX.Element
}

export default function DynamicGrid<T>({
  data, renderItem, style, gap = 0, cellStyle,
  ListEmptyComponent
}: DynamicGridProps<T>){
  const [cellWidth, setCellWidth] = useState(1);

  function CellRenderer<T>(props: CellRendererProps<T>){
    return (
      <View
        {... props}
        style={[
          props.style,
          styles.cell,
          cellStyle,
          {width: cellWidth}
        ]}
      />
    );
  }

  function OnLayout(event: LayoutChangeEvent){
    const {width, height} = event.nativeEvent.layout;
    const aspectRatio = height/width;
    const calcWidth = Math.floor(width/Math.floor(4/aspectRatio))-gap*2;
    if(calcWidth === cellWidth) return;
    setCellWidth(calcWidth);
  }

  return (
    <FlatList
      data={data}
      style={[style]}
      contentContainerStyle={[styles.contentContainer, {gap: gap}]}
      renderItem={renderItem}
      CellRendererComponent={CellRenderer}
      onLayout={OnLayout}
      ListEmptyComponent={ListEmptyComponent}
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
    maxWidth: "100%"
  }
});