import { Key } from "react";

export interface ListEnumeratorProps<T>{
  data: Array<T>
  renderItem: (props: {item: T, index: number}) => React.JSX.Element
  emptyListElement?: React.JSX.Element
  keyStractor?: (props: {item: T, index: number}) => Key
}

export default function ListEnumerator<T>({
  data, emptyListElement, keyStractor, ...props
}: ListEnumeratorProps<T>){
  if(data.length === 0){
    if(emptyListElement) return emptyListElement;
    return <></>;
  }

  function getKey(item: T, index: number){
    if(keyStractor){
      return keyStractor({
        index,
        item
      });
    }
    return index;
  }

  const elements: React.JSX.Element[] = [];

  for(let i = 0; i < data.length; ++i){
    elements.push(
      <props.renderItem
        key={getKey(data[i], i)}
        index={i}
        item={data[i]}
      />
    );
  }

  return elements;
}