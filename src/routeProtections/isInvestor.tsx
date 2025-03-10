import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function IsInvestor({ children }: { children: any }) {
  const user = useSelector((state: any) => state.user.user);
  if (user.role != undefined && user.role.includes("investor")) {
    return <>{children}</>;
  }
  return <Navigate to="/" />;
}
