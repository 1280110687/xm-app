/**
 * home-page
 */
import { useState, useRef } from 'react'
import { Stepper, Collapse, Dialog, List, SwipeAction, Toast, Form, Input, Button, Switch, Popup } from 'antd-mobile'
import { AddOutline } from 'antd-mobile-icons'
import "./index.less";
import useMyfHook from "./useHook.js";
import MobileSwipeAction from '@/components/MobileSwipeAction';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default () => {
  useMyfHook();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [locaList, setLocaList] = useState(JSON.parse(localStorage.getItem("LocaList")) || []);
  console.warn(locaList, "locaList");

  const list = [
    {
      title: "A",
      img: "",
      num: 0,
    },
    {
      title: "遮天",
      img: "",
      num: 3,
    },
    {
      title: "C",
      img: "",
      num: 1,
    },
  ]

  const goPath = (path) => {
    if (typeof path !== 'string' || !path) return;
    navigate(path.startsWith('/') ? path : `/${path}`);
  };

  const formRender = () => {
    return (<>
      <Form
        form={form}
        layout='horizontal'
        onFinish={onFinish}
        initialValues={{ num: 0 }}
        onValuesChange={(changedFields, allFields) => {
          const { conversion, ...params } = allFields;
          console.warn(changedFields, allFields, "changedFields, allFields");
        }}
        footer={
          <Button block type='submit' color='primary' size='large'>
            提交
          </Button>
        }
      >
        {/* <Form.Header>水平布局表单</Form.Header> */}
        <Form.Item
          name='name'
          label='名称'
          rules={[{ required: true, message: '名称不能为空' }]}
        >
          <Input onChange={console.log} placeholder='请输入名称' />
        </Form.Item>
        {/* <Form.Item name='address' label='地址' help='详情地址'>
          <TextArea
            placeholder='请输入地址'
            maxLength={100}
            rows={2}
            showCount
          />
        </Form.Item> */}
        <Form.Item name='num' label='集数' childElementPosition='right'>
          <Stepper defaultValue={0} />
        </Form.Item>
      </Form>
    </>)
  }
  const itemTitleRender = (index) => {
    return (<div className={`flex justify-between items-center pr-16px`}>
      <div className={`text-16px text-black font-bold`}>{locaList[index].name}</div>
      <div className={`text-12px text-gray-400`}>{locaList[index].num}</div>
    </div>)
  }

  const editCallBack = (item) => {
    Toast.show(`编辑 - ${item}`)
  }
  const deleteCallBack = (item) => {
    Toast.show(`删除 - ${item}`)
  }
  const onFinish = (values) => {
    setLocaList((e) => {
      const newList = [...e, values];
      localStorage.LocaList = JSON.stringify(newList);
      return newList
    });
    setVisible(false);
  }

  useEffect(() => {

  }, []);

  return <div className="home-page">
    {/* <Button color="primary" size='large' onClick={() => goPath('bingo')}>🎲 Bingo</Button> */}
    <List>
      {locaList?.map((item, index) => (
        <List.Item key={index}>
          <MobileSwipeAction
            editCallBack={() => editCallBack(item)}
            deleteCallBack={() => deleteCallBack(item)}
            children={
              <Collapse accordion>
                <Collapse.Panel key={index} title={itemTitleRender(index)}>
                  <Stepper
                    value={item.num}
                    onChange={value => {
                      setLocaList((e) => {
                        e[index].num += 1
                        console.log(e)
                        localStorage.LocaList = JSON.stringify(e);
                        return e;
                      })
                    }}
                  />
                </Collapse.Panel>
              </Collapse>
            }
          />
        </List.Item>
      ))}
      <div className='flex justify-center items-center py-16px mx-auto w-120px'>
        <Button className='flex justify-center items-center' block type='button' color='primary' fill='outline' size='middle' onClick={() => setVisible(true)}>
          <AddOutline className='flex justify-center items-center' />
        </Button>
      </div>
    </List>

    <Popup
      visible={visible}
      onMaskClick={() => {
        setVisible(false)
      }}
      bodyStyle={{
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        minHeight: '40vh',
      }}
    >
      {formRender()}
    </Popup>
  </div>;
};
