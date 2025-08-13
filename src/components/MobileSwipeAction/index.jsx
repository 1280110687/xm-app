/**
 * mobile-swipe-action-component
 */
import { useState, useRef } from "react";
import { Dialog, SwipeAction, Toast } from 'antd-mobile'
import "./index.less";
import useMyfHook from "./useHook.js";

export default function MobileSwipeAction({ children, editCallBack, deleteCallBack }) {
  useMyfHook();
  const ref = useRef(null);
  const leftActions = [
    {
      key: 'pin',
      text: '置顶',
      color: 'success',
    },
  ];
  const rightActions = [
    {
      key: 'edit',
      text: '编辑',
      color: 'primary',
      onClick: async () => {
        // await Dialog.confirm({
        //   content: '确定要删除吗？',
        //   onConfirm: editCallBack,
        // })
        editCallBack && editCallBack();
        ref.current?.close();
      },
    },
    {
      key: 'delete',
      text: '删除',
      color: 'danger',
      onClick: async () => {
        await Dialog.confirm({
          content: '确定要删除吗？',
          onConfirm: deleteCallBack,
        })
        ref.current?.close()
      },
    },
  ];

  return (
    <>
      {/* <div className="mobile-swipe-action-component">MobileSwipeAction</div> */}
      <SwipeAction
        ref={ref}
        leftActions={leftActions}
        rightActions={rightActions}
        closeOnAction={false}
        closeOnTouchOutside={false}
      >
        {children}
      </SwipeAction>
    </>
  );
};
