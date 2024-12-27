/**
 * home-page
 */
import { useState, useRef } from 'react'
import { Stepper, Collapse, Dialog, List, SwipeAction, Toast, Image, Input } from 'antd-mobile'
import "./index.less";
import useMyfHook from "./useHook.js";
import MobileSwipeAction from '@/components/MobileSwipeAction';

export default () => {
  useMyfHook();
  const items = [
    {
      title: "A",
      img: "",
      num: 0,
    },
    {
      title: "B",
      img: "",
      num: 3,
    },
    {
      title: "C",
      img: "",
      num: 1,
    },
  ]

  const editCallBack = (item) => {
    Toast.show(`编辑 - ${item}`)
  }
  const deleteCallBack = (item) => {
    Toast.show(`删除 - ${item}`)
  }


  return <div className="home-page">
    <List>
      {items.map(item => (
        <List.Item key={item}>
          <MobileSwipeAction
            editCallBack={() => editCallBack(item)}
            deleteCallBack={() => deleteCallBack(item)}
            children={
              <Collapse accordion>
                <Collapse.Panel key={item.title} title={item.title}>
                  <Stepper
                    value={item.num}
                    onChange={value => {
                      console.log(value)
                    }}
                  />
                </Collapse.Panel>
              </Collapse>
            }
          />
        </List.Item>
      ))}
    </List>
  </div>;
};
