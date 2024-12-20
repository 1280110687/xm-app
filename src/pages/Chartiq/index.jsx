/**
 * chartiq-page
 */
import { useState } from "react";
import "./index.less";
import useMyfHook from "./useHook.js";
import ChartView from '@/components/ChartView';

export default () => {
  useMyfHook();
  return (
    <>
      <div className="chartiq-page flex justify-center">
        <ChartView className='!w-4/5 h-[calc(100vh-360px)] ' />
      </div>
    </>
  );
};
