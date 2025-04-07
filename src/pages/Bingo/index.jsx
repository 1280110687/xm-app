/**
 * bingo-page
 */
import { useState } from "react";
import "./index.less";
import useMyfHook from "./useHook.js";
import BingoDrawer from './component/BingoDrawer.jsx';

export default () => {
  useMyfHook();
  return (
    <>
      {/* <div className="bingo-page">Bingo</div> */}
      <div className="w-screen h-screen bg-white">
        <BingoDrawer />
      </div>
    </>
  );
};





