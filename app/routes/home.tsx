import { useEffect } from "react";
import { Welcome } from "../welcome/welcome";

export function Home() {
  useEffect(() => {
    document.title = "React Movie Hooks";
  }, []);
  
  return <Welcome />;
}
