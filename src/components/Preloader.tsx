import React from "react";

const HeartPreloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="heart"> <i className="fa fa-heart fa-4x text-red-400"></i></div>
    </div>
  );
};

export default HeartPreloader;
