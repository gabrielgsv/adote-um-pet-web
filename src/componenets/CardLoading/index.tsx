import React from "react";
import Skeleton from "react-loading-skeleton";
import "./style.css"

const CardLoading = () => {
  return (
    <div className="card">
      <Skeleton width={250} height={170} />
      <Skeleton width={150} height={20} style={{ margin: 15 }} />
      <Skeleton width={100} height={20} style={{ margin: 15 }} />
      <Skeleton width={100} height={20} style={{ margin: 15 }} />
      <Skeleton width={200} height={40} style={{ marginTop: 30 }} />
    </div>
  );
};

export default CardLoading;
