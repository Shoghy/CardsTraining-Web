import { useMemo, useState } from "react";

export interface SelfComponentReturn<P>{
  setProps: React.Dispatch<React.SetStateAction<P>>
  props: P
  Element(eProps: P): React.JSX.Element
  SetProp<PN extends keyof P>(propName: PN, value: P[PN]): void
  SetPropsAndMerge(props: P): void
}

export function SelfComponent<
  P extends React.JSX.IntrinsicElements[C],
  C extends keyof React.JSX.IntrinsicElements
>(component: C): SelfComponentReturn<P>;

export function SelfComponent<
  P extends object,
  C extends (props: P) => React.JSX.Element
>(component: C): SelfComponentReturn<P>;

export function SelfComponent<P, C extends (props: P) => React.JSX.Element>(
  Component: C
){
  const self: SelfComponentReturn<P> = useMemo(() => {
    function Element(eProps: P){
      const [props, setProps] = useState({
        ...eProps,
        ...self.props
      });
      self.props = props;
      self.setProps = setProps;
      self.SetProp = SetProp;
      self.SetPropsAndMerge = SetPropsAndMerge;

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

      return <Component {...props}/>;
    }

    return {
      props: {} as never,
      Element,
      setProps: () => {},
      SetProp: () => {},
      SetPropsAndMerge: () => {}
    };
  }, []);

  return self;
}