/**
 * bingo-page
 */
import useMyfHook from "./useHook.js";
import BingoDrawer from './component/BingoDrawer.jsx';

export default () => {
  useMyfHook();
  return (
    <div className="w-screen h-screen overflow-hidden">
      <BingoDrawer />
    </div>
  );
};





