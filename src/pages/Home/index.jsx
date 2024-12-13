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

  // 配合列表使用
  const WithList = () => {
    const items = [ 'A', 'B', 'C' ]
    const edit = () => {
      Toast.show('你点击编辑')
    }
    return (
      <List>
        {items.map(item => (
          <List.Item>
            <MobileSwipeAction
              callBack={
                edit
              }
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
    )
  }

  // 手动控制归位逻辑
  const Manual = () => {
    const ref = useRef(null)
    return (
      <List>
        <SwipeAction
          ref={ref}
          closeOnAction={false}
          closeOnTouchOutside={false}
          rightActions={[
            {
              key: 'delete',
              text: '删除',
              color: 'danger',
              onClick: async () => {
                await Dialog.confirm({
                  content: '确定要删除吗？',
                })
                ref.current?.close()
              },
            },
          ]}
        >
          <List.Item
            onClick={() => {
              Toast.show('你点击了列表项')
            }}
          >
            A
          </List.Item>
        </SwipeAction>
      </List>
    )
  }

  return <div className="home-page">
    <WithList />
  </div>;
};
