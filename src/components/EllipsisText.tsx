import { useEffect, useRef, useState } from "react";
import styles from "@/assets/css/components/EllipsisText.module.css";

interface EllipsisTextProps extends React.HTMLAttributes<HTMLDivElement>{
  children?: string
}

export default function EllipsisText({
  children, style,
  ...props
}: EllipsisTextProps){
  const [text, setText] = useState<string | undefined>("\xa0");
  const divRef = useRef<HTMLDivElement>({} as never);
  const lineHeight = useRef(0);

  function CalculateLineClamp(){
    const div = divRef.current;
    div.style.webkitLineClamp = "unset";

    const parent = div.parentElement! as HTMLDivElement;

    const clampTo = Math.floor(parent.clientHeight/lineHeight.current);
    div.style.webkitLineClamp = clampTo.toString();
  }

  useEffect(() => {
    const parent = divRef.current.parentElement! as HTMLDivElement;

    if(lineHeight.current === 0){
      lineHeight.current = divRef.current.clientHeight;
    }

    const sizeObserver = new ResizeObserver(() => CalculateLineClamp());

    sizeObserver.observe(parent);

    setText(children);

    //Waiting for the re-render
    setTimeout(() => {
      CalculateLineClamp();
    }, 1);
    return () => {
      sizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      {...props}
      style={{...{overflow: "hidden"}, ...style}}
    >
      <div
        ref={divRef}
        className={styles.content}
      >
        {text}
      </div>
    </div>
  );
}