import {useEffect, useRef} from "react"
import {listenRoute} from "./router"


const usePageEnterAndLeave = () => {
  const lastPath = useRef<string>();

  useEffect(() => {
    listenRoute((path) => {
      if(path !== lastPath.current){
        if(lastPath.current){
          console.log("离开的页面：", lastPath.current);
        }
        lastPath.current = path;
        console.log("进入的页面：", path);
      }
    });
  }, []);
};

export default usePageEnterAndLeave;
