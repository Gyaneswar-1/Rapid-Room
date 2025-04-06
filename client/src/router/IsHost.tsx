import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import { userStoreType } from "../store/reducers/user.reducers";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface IsHostProps {
  element: ReactElement;
}

function IsHost({ element }: IsHostProps) {
  const { isHost, status,hasDataInStore }: userStoreType = useSelector(
    (state: RootState) => state.userReducer
  );

  console.log("this is",status,isHost);
  if(!hasDataInStore){
    return <></>
  }
  else if (!isHost) {
    return <Navigate to="/host-confirm" />;
  } else if (isHost && status === "PENDING") {
    return <Navigate to="/host-pending" />;
  } else if (isHost && status === "REJECTED") {
    return <Navigate to="/host-rejected" />;
  } else if (isHost && status === "APPROVED") {
    return element;
  } else {
    return <Navigate to="/host-confirm" />;
  }
}

export default IsHost;