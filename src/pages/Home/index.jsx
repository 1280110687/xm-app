/**
 * home-page
 */
import { useState, useRef } from 'react'
import { Stepper, Collapse, Dialog, List, SwipeAction, Toast, Image } from 'antd-mobile'
import "./index.less";
import useMyfHook from "./useHook.js";
import MobileSwipeAction from '@/components/MobileSwipeAction';

export default () => {
  useMyfHook();
  const items = [ 'A', 'B', 'C' ]

  const editCallBack = (item) => {
    Toast.show(`你点击编辑 - ${item}`)
  }


  return <div className="home-page">
    <List>
      {items.map(item => (
        <List.Item key={item}>
          <MobileSwipeAction
            editCallBack={() => editCallBack(item)}
            children={
              <Collapse accordion>
                <Collapse.Panel key={item} title={item}>
                  <Stepper
                    defaultValue={1}
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
