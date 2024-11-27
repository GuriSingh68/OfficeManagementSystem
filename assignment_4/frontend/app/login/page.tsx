import Header from "../Component/Header";
import Login from "./login";

export default function Page({children}:{children:React.ReactNode}) {
  return(
    <div>
        <Header />
        <Login />
    </div>
  );
}
