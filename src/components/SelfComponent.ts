import { useMemo, useState } from "react";

export interface SelfComponentReturn<P>{
  setProps: React.Dispatch<React.SetStateAction<P>>
  props: Readonly<P>
  Element(eProps: P): React.JSX.Element
  SetProp<PN extends keyof P>(propName: PN, value: P[PN]): void
  SetPropsAndMerge(props: P): void
}

export function SelfComponent<P extends object, C extends (props: P) => React.JSX.Element>(
  component: C
){
  const _self: SelfComponentReturn<P> = useMemo(() => {
    return {
      props: {} as never,
      Element,
      setProps: () => {},
      SetProp: () => {},
      SetPropsAndMerge: () => {}
    };
  }, []);

  function Element(eProps: P){
    const [props, setProps] = useState({
      ...eProps,
      ..._self.props
    });
    _self.props = props;
    _self.setProps = setProps;
    _self.SetProp = SetProp;
    _self.SetPropsAndMerge = SetPropsAndMerge;
    
    function SetProp<PN extends keyof P>(
      propName: PN,
      value: P[PN]
    ){
      setProps((c) => {
        c[propName] = value;
        return {...c};
      });
    }

    function SetPropsAndMerge(props: P){
      setProps((c) => {
        for(const propName in props){
          c[propName] = props[propName];
        }
        return {... c};
      });
    }

    return component(props);
  }

  return _self;
}