import React, { useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import {
    Form,
    Input,
    Button,
    Space,
    Dialog,
    Popup,
    TextArea,
    DatePicker,
    Selector,
    Slider,
    Stepper,
    Switch,
} from 'antd-mobile';
import { RedoOutline, FileOutline, SetOutline } from 'antd-mobile-icons'
import { drawnNumbersAtom } from '@/atoms/bingoAtom';

const ALL_NUMBERS = Array.from({ length: 75 }, (_, i) => i + 1);

const BingoDrawer = () => {
    const [drawnNumbers, setDrawnNumbers] = useAtom(drawnNumbersAtom);
    const [visible, setVisible] = useState(false);

    const remainingNumbers = useMemo(() => {
        return ALL_NUMBERS.filter((n) => !drawnNumbers.includes(n));
    }, [drawnNumbers]);


    const speakThaiNumber = (number) => {
        const utterance = new SpeechSynthesisUtterance(number.toString());
        utterance.lang = 'th-TH';
        speechSynthesis.speak(utterance);
    };
    const drawNumber = async () => {
        if (remainingNumbers.length === 0) {
            await Dialog.alert({
                content: 'หมายเลขทั้งหมดถูกจับครบแล้ว!',
                confirmText: "",
                closeOnMaskClick: true,
            });
            return;
        }
        const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
        const newNumber = remainingNumbers[randomIndex];
        setDrawnNumbers([...drawnNumbers, newNumber]);
        speakThaiNumber(newNumber);
        await Dialog.alert({
            content: <div className='flex justify-center items-center h-100px w-full'>
                <div className='text-66px text-red-400 font-bold'>{newNumber}</div>
            </div>,
            confirmText: "",
            closeOnMaskClick: true,
        });
    };
    const reset = async () => {
        await Dialog.confirm({
            content: '🔄 เริ่มใหม่',
            confirmText: '✅ ยืนยัน',
            cancelText: '❌ ยกเลิก',
            onConfirm: () => setDrawnNumbers([]),
        });
    };


    const SettingContent = () => {
        const onFinish = (values) => {
            Dialog.alert({
                content: <pre>{JSON.stringify(values, null, 2)}</pre>,
            })
        }
        return (<div>
            <Form
                layout='horizontal'
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        提交
                    </Button>
                }
            >
                <Form.Header>设置是否自动获取下一个数字</Form.Header>
                <Form.Item
                    name='delivery'
                    label='自动'
                    valuePropName="checked"
                    childElementPosition='right'
                >
                    <Switch />
                </Form.Item>
                <Form.Item name='amount' label='分钟' childElementPosition='right'>
                    <Stepper />
                </Form.Item>
            </Form>
        </div>)
    }

    return (
        <div className="w-full h-full max-w-xl mx-auto p-4 text-center bg-[#121212] text-[#fafafa]">
            <div className='flex justify-between items-start'>
                <h2 className="text-xl font-bold mb-4 text-left">🎲 Bingo</h2>
                <SetOutline onClick={() => setVisible(true)} />
            </div>
            <Space block direction="vertical" className="mb-4">
                <Button color="primary" className="w-100px h-100px" size='large' onClick={drawNumber}>🎲</Button>
            </Space>

            <div className="mt-6">
                <div className='flex justify-between items-center'>
                    <h3 className="text-lg font-semibold mb-2"><FileOutline /></h3>
                    <div onClick={reset}><RedoOutline /></div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {drawnNumbers.map((num) => (
                        <span
                            key={num}
                            className={`
                                flex justify-center items-center w-40px h-40px rounded-full text-sm font-bold
                                ${num <= 15 ? 'bg-red-500' : ''}
                                ${num > 15 && num <= 30 ? 'bg-green-500' : ''}
                                ${num > 30 && num <= 45 ? 'bg-blue-500' : ''}
                                ${num > 45 && num <= 60 ? 'bg-orange-500' : ''}
                                ${num > 60 ? 'bg-yellow-900' : ''}
                            `}
                        >
                            {num}
                        </span>
                    ))}
                </div>
            </div>
            <Popup
                visible={visible}
                onMaskClick={() => {
                    setVisible(false)
                }}
                position='right'
                bodyStyle={{ width: '70vw' }}
            >
                {SettingContent()}
            </Popup>
        </div>
    );
};

export default BingoDrawer;
