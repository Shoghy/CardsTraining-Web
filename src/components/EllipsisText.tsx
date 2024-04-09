import { sleep } from "@/utils/functions";
import { useEffect, useRef } from "react";

interface EllipsisTextProps extends React.HTMLAttributes<HTMLDivElement>{
  children?: string
}

export default function EllipsisText({
  children = "",
  ...props
}: EllipsisTextProps){
  const divRef = useRef<HTMLDivElement>({} as never);

  function RemoveChildren(){
    const div = divRef.current;
    if(div === null) return;
    while(div.childNodes.length > 0){
      div.childNodes[0].remove();
    }
  }

  function AddEllipsis(){
    const div = divRef.current;
    let prevSpan = div.children[div.children.length-1] as HTMLSpanElement | null;
    if(!prevSpan){
      const span = document.createElement("span");
      span.textContent = "...";
      div.appendChild(span);
      return;
    }
    const offsetTop = prevSpan.offsetTop;
    div.appendChild(document.createElement("wbr"));
    const span = document.createElement("span");
    span.textContent = "...";
    div.appendChild(span);
    while(prevSpan && span.offsetTop > offsetTop){
      prevSpan.remove();
      prevSpan = div.children[div.children.length-3] as HTMLSpanElement | null;
    }
  }

  async function AddText(){
    await sleep(1);
    const div = divRef.current;
    if(div === null) return;

    RemoveChildren();

    const testSpan = document.createElement("span");
    testSpan.textContent = "A";
    div.appendChild(testSpan);
    const grothPerLine = parseFloat(window.getComputedStyle(div).height);

    RemoveChildren();

    let previousHeight = 0;
    const units = Array.from(children);
    let prevSpan: null | HTMLSpanElement = null;
    for(let i = 0; i < units.length; ++i){
      const span = document.createElement("span");
      span.textContent = units[i];
      div.appendChild(span);

      if(span.offsetTop === prevSpan?.offsetTop) continue;

      const actualHeight = parseFloat(window.getComputedStyle(div).height);
      const heightDiff = (actualHeight - previousHeight);
      const grothDiff = Math.abs(heightDiff - grothPerLine);

      previousHeight = actualHeight;

      if(heightDiff === 0 || grothDiff > 0.001){
        span.remove();
        AddEllipsis();
        break;
      }

      prevSpan = span;
    }
    div.textContent = div.textContent as string;
  }

  useEffect(() => {
    const div = divRef.current;
    const sizeObserver = new ResizeObserver(() => AddText());
    sizeObserver.observe(div);
    AddText();
    return () => {
      sizeObserver.disconnect();
      RemoveChildren();
    };
  }, []);

  return (
    <div
      ref={divRef}
      {...props}
    >
    </div>
  );
}