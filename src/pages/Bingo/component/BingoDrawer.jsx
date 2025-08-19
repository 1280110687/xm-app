import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import {
    Form,
    Button,
    Space,
    Dialog,
    Popup,
    CenterPopup,
    Stepper,
    Switch,
} from 'antd-mobile';
import { RedoOutline, FileOutline, SetOutline } from 'antd-mobile-icons'
import { drawnNumbersAtom, drawnConfigAtom } from '@/atoms/bingoAtom';
import Countdown from '@/components/Countdown';
import { asyncTime, debounce } from '@/utils';

const ALL_NUMBERS = Array.from({ length: 75 }, (_, i) => i + 1);


const BingoDrawer = () => {
    const [drawnNumbers, setDrawnNumbers] = useAtom(drawnNumbersAtom);
    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [drawnConfig, setDrawnConfig] = useAtom(drawnConfigAtom);
    const [currentNum, setCurrentNum] = useState("12");

    const colorRanges = [
        { max: 15, color: 'bg-red-500' },
        { max: 30, color: 'bg-green-500' },
        { max: 45, color: 'bg-blue-500' },
        { max: 60, color: 'bg-orange-500' },
        { max: Infinity, color: 'bg-yellow-900' }
    ];


    const remainingNumbers = useMemo(() => {
        return ALL_NUMBERS.filter((n) => !drawnNumbers.includes(n));
    }, [drawnNumbers]);

    const getNumberColor = (num) => colorRanges.find(range => num <= range.max)?.color || '';
    const speakThaiNumber = (number) => {
        const utterance = new SpeechSynthesisUtterance(number.toString());
        utterance.lang = 'th-TH';
        speechSynthesis.speak(utterance);
    };
    const drawNumber = useCallback(async () => {
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
        await asyncTime(1000);
        setDrawnNumbers([...drawnNumbers, newNumber]);
        speakThaiNumber(newNumber);
        setCurrentNum(newNumber);
        setModalVisible(true);
    }, [drawnNumbers]);
    const debouncedDrawNumber = useMemo(() => debounce(drawNumber, 1000), [drawNumber]);
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
            setDrawnConfig(values)
            setVisible(false)
        }
        return (<div>
            <Form
                layout='horizontal'
                onFinish={onFinish}
                initialValues={drawnConfig}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        ส่ง
                    </Button>
                }
            >
                <Form.Header>ตั้งค่าการรับหมายเลขถัดไปโดยอัตโนมัติหรือไม่</Form.Header>
                <Form.Item
                    name='auto'
                    label='อัตโนมัติ'
                    valuePropName="checked"
                    childElementPosition='right'
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    name='second'
                    label='วินาที'
                    childElementPosition='right'
                    initialValue={0}
                    rules={[
                        {
                            max: 60,
                            min: 5,
                            type: 'number',
                        },
                    ]}>
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
                <Button color="primary" className="w-100px h-100px p-0 m-0 bg-transparent border-transparent" size='large' onClick={() => debouncedDrawNumber()}>
                    <div className=' font-bold text-88px'>🎲</div>
                </Button>
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
                            className={`flex justify-center items-center w-40px h-40px rounded-full text-sm font-bold ${getNumberColor(num)}`}
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
            <CenterPopup
                visible={modalVisible}
                destroyOnClose
                onMaskClick={() => {
                    setModalVisible(false)
                }}
            >
                <div className='p-12px'>
                    <div className='flex justify-center items-center gap-8px min-h-100px w-full'>
                        <div className={`flex justify-center items-center text-66px w-100px h-100px rounded-full font-bold ${getNumberColor(currentNum)}`}>{currentNum}</div>
                    </div>
                    {drawnConfig?.auto && <Countdown
                        seconds={drawnConfig?.second}
                        onFinish={() => {
                            console.log("倒计时结束！");
                            setModalVisible(false);
                            debouncedDrawNumber();
                        }}
                    />}
                </div>
            </CenterPopup>
        </div>
    );
};

export default BingoDrawer;
