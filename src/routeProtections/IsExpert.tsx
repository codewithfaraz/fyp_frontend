import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function IsExpert({ children }: { children: any }) {
  const user = useSelector((state: any) => state.user.user);
  if (user.role != undefined && user.role.includes("expert")) {
    return <>{children}</>;
  }
  return <Navigate to="/" />;
}
