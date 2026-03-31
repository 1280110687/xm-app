/**
 * home-page
 */
import { useState } from 'react'
import { Stepper, List, Form, Input, Button, Popup } from 'antd-mobile'
import { AddOutline } from 'antd-mobile-icons'
import "./index.less";
import useMyfHook from "./useHook.js";

export default function Home() {
  useMyfHook();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [locaList, setLocaList] = useState(JSON.parse(localStorage.getItem("LocaList")) || []);
  console.warn(locaList, "locaList");

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
  const onFinish = (values) => {
    setLocaList((e) => {
      const newList = [...e, values];
      localStorage.LocaList = JSON.stringify(newList);
      return newList
    });
    setVisible(false);
  }

  return <div className="home-page">
    {/* <Button color="primary" size='large' onClick={() => goPath('bingo')}>🎲 Bingo</Button> */}
    <List>
      {locaList?.map((item, index) => (
        <List.Item key={index}>

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
        // minHeight: '40vh',
      }}
    >
      {formRender()}
    </Popup>
  </div>;
};
