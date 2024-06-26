import { Key } from "react";

export interface FuncIteratorParams<T>{
  item: T
  index: number
  count: number
}

export interface ListEnumeratorProps<T>{
  data: Array<T>
  renderItem: (props: FuncIteratorParams<T>) => React.JSX.Element
  emptyListElement?: React.JSX.Element
  keyStractor?: (props: FuncIteratorParams<T>) => Key
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
        item,
        count: data.length,
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
        count={data.length}
      />
    );
  }

  return elements;
}