/**
 * chart-view-component
 */
import { useState } from "react";
import "./index.less";
import useMyfHook from "./useHook.js";

export default (props) => {
  const { className, ...other } = props
  useMyfHook();
  return (
    <>
      {/* <div className="chart-view-component">ChartView</div> */}
      <iframe {...other} src="/chartiq_9_6/chartiq/index.html" className={`chart-iq-component min-h-100px w-full border-none p-0 m-0 ${className}`}></iframe>
    </>
  );
};
