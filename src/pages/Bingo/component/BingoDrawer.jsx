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
import { drawnNumbersAtom, drawnConfigAtom } from '@/atoms/bingoAtom';
import Countdown from '@/components/Countdown';
import { asyncTime, debounce } from '@/utils';

const ALL_NUMBERS = Array.from({ length: 75 }, (_, i) => i + 1);

// BINGO 字母对应的颜色
const BINGO_COLORS = {
    B: { bg: 'from-rose-500 to-red-600', solid: 'bg-rose-500', text: 'B', range: [1, 15] },
    I: { bg: 'from-emerald-500 to-green-600', solid: 'bg-emerald-500', text: 'I', range: [16, 30] },
    N: { bg: 'from-blue-500 to-indigo-600', solid: 'bg-blue-500', text: 'N', range: [31, 45] },
    G: { bg: 'from-amber-500 to-orange-600', solid: 'bg-amber-500', text: 'G', range: [46, 60] },
    O: { bg: 'from-purple-500 to-violet-600', solid: 'bg-purple-500', text: 'O', range: [61, 75] },
};

const getBingoLetter = (num) => {
    if (num <= 15) return 'B';
    if (num <= 30) return 'I';
    if (num <= 45) return 'N';
    if (num <= 60) return 'G';
    return 'O';
};

const BingoDrawer = () => {
    const [drawnNumbers, setDrawnNumbers] = useAtom(drawnNumbersAtom);
    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [drawnConfig, setDrawnConfig] = useAtom(drawnConfigAtom);
    const [currentNum, setCurrentNum] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const remainingNumbers = useMemo(() => {
        return ALL_NUMBERS.filter((n) => !drawnNumbers.includes(n));
    }, [drawnNumbers]);

    const getNumberStyle = (num) => {
        const letter = getBingoLetter(num);
        return BINGO_COLORS[letter];
    };

    const speakThaiNumber = (number) => {
        const utterance = new SpeechSynthesisUtterance(number.toString());
        utterance.lang = 'th-TH';
        speechSynthesis.speak(utterance);
    };

    const drawNumber = useCallback(async () => {
        if (remainingNumbers.length === 0) {
            await Dialog.alert({
                content: 'หมายเลขทั้งหมดถูกจับครบแล้ว!',
                confirmText: "ตกลง",
                closeOnMaskClick: true,
            });
            return;
        }
        setIsDrawing(true);
        const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
        const newNumber = remainingNumbers[randomIndex];
        await asyncTime(800);
        setDrawnNumbers([...drawnNumbers, newNumber]);
        speakThaiNumber(newNumber);
        setCurrentNum(newNumber);
        setIsDrawing(false);
        setModalVisible(true);
    }, [drawnNumbers, remainingNumbers, setDrawnNumbers]);

    const debouncedDrawNumber = useMemo(() => debounce(drawNumber, 500), [drawNumber]);

    const reset = async () => {
        await Dialog.confirm({
            content: 'ต้องการเริ่มใหม่หรือไม่?',
            confirmText: 'ยืนยัน',
            cancelText: 'ยกเลิก',
            onConfirm: () => setDrawnNumbers([]),
        });
    };

    // 按 BINGO 字母分组已抽取的号码
    const groupedNumbers = useMemo(() => {
        const groups = { B: [], I: [], N: [], G: [], O: [] };
        drawnNumbers.forEach(num => {
            const letter = getBingoLetter(num);
            groups[letter].push(num);
        });
        // 每组内排序
        Object.keys(groups).forEach(key => {
            groups[key].sort((a, b) => a - b);
        });
        return groups;
    }, [drawnNumbers]);

    const SettingContent = () => {
        const onFinish = (values) => {
            setDrawnConfig(values);
            setVisible(false);
        };
        return (
            <div className="p-4">
                <h3 className="text-lg font-bold mb-4 text-gray-800">ตั้งค่า</h3>
                <Form
                    layout='horizontal'
                    onFinish={onFinish}
                    initialValues={drawnConfig}
                    footer={
                        <Button block type='submit' color='primary' size='large' className="mt-4">
                            บันทึก
                        </Button>
                    }
                >
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
                        initialValue={10}
                        rules={[
                            {
                                max: 60,
                                min: 5,
                                type: 'number',
                            },
                        ]}>
                        <Stepper min={5} max={60} />
                    </Form.Item>
                </Form>
            </div>
        );
    };

    return (
        <div className="w-full h-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
                <div className="max-w-2xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl font-bold shadow-lg shadow-orange-500/30">
                            B
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
                                BINGO
                            </h1>
                            <p className="text-xs text-slate-400">เหลือ {remainingNumbers.length} หมายเลข</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setVisible(true)}
                        className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center transition-all"
                    >
                        <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-4 py-6">
                {/* Draw Button Area */}
                <div className="flex flex-col items-center mb-8">
                    <button
                        onClick={() => debouncedDrawNumber()}
                        disabled={isDrawing || remainingNumbers.length === 0}
                        className={`
                            relative w-36 h-36 rounded-full 
                            bg-gradient-to-br from-amber-400 via-orange-500 to-red-500
                            shadow-2xl shadow-orange-500/40
                            flex items-center justify-center
                            transition-all duration-300 ease-out
                            hover:scale-105 hover:shadow-orange-500/60
                            active:scale-95
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${isDrawing ? 'animate-pulse' : ''}
                        `}
                    >
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 opacity-50" />
                        <span className="relative text-6xl filter drop-shadow-lg">
                            {isDrawing ? '...' : '🎲'}
                        </span>
                    </button>
                    <p className="mt-4 text-slate-400 text-sm">
                        {isDrawing ? 'กำลังจับ...' : 'แตะเพื่อจับหมายเลข'}
                    </p>
                </div>

                {/* BINGO Letters Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-300">หมายเลขที่จับได้</h2>
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sm text-slate-300 transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        เริ่มใหม่
                    </button>
                </div>

                {/* Numbers Grid by BINGO */}
                <div className="space-y-3">
                    {Object.entries(BINGO_COLORS).map(([letter, config]) => (
                        <div 
                            key={letter}
                            className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm"
                        >
                            <div className="flex items-start gap-4">
                                {/* Letter Badge */}
                                <div className={`
                                    w-12 h-12 rounded-xl bg-gradient-to-br ${config.bg}
                                    flex items-center justify-center
                                    text-2xl font-bold text-white
                                    shadow-lg flex-shrink-0
                                `}>
                                    {letter}
                                </div>
                                
                                {/* Numbers */}
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500 mb-2">
                                        {config.range[0]} - {config.range[1]}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {groupedNumbers[letter].length > 0 ? (
                                            groupedNumbers[letter].map((num) => (
                                                <span
                                                    key={num}
                                                    className={`
                                                        w-10 h-10 rounded-full 
                                                        bg-gradient-to-br ${config.bg}
                                                        flex items-center justify-center
                                                        text-sm font-bold text-white
                                                        shadow-md
                                                        animate-in fade-in zoom-in duration-300
                                                    `}
                                                >
                                                    {num}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-slate-600 text-sm">-</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
                        <p className="text-2xl font-bold text-amber-400">{drawnNumbers.length}</p>
                        <p className="text-xs text-slate-500">จับแล้ว</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
                        <p className="text-2xl font-bold text-emerald-400">{remainingNumbers.length}</p>
                        <p className="text-xs text-slate-500">เหลือ</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
                        <p className="text-2xl font-bold text-blue-400">75</p>
                        <p className="text-xs text-slate-500">ทั้งหมด</p>
                    </div>
                </div>
            </div>

            {/* Settings Popup */}
            <Popup
                visible={visible}
                onMaskClick={() => setVisible(false)}
                position='right'
                bodyStyle={{ 
                    width: '80vw', 
                    maxWidth: '320px',
                    background: '#f8fafc',
                    borderTopLeftRadius: '16px',
                    borderBottomLeftRadius: '16px',
                }}
            >
                {SettingContent()}
            </Popup>

            {/* Number Result Popup */}
            <CenterPopup
                visible={modalVisible}
                destroyOnClose
                onMaskClick={() => setModalVisible(false)}
                bodyStyle={{
                    background: 'transparent',
                    boxShadow: 'none',
                }}
            >
                {currentNum && (
                    <div className="flex flex-col items-center p-6">
                        {/* Letter */}
                        <div className={`
                            text-4xl font-bold mb-2
                            bg-gradient-to-r ${getNumberStyle(currentNum).bg} bg-clip-text text-transparent
                        `}>
                            {getBingoLetter(currentNum)}
                        </div>
                        
                        {/* Number Ball */}
                        <div className={`
                            w-32 h-32 rounded-full
                            bg-gradient-to-br ${getNumberStyle(currentNum).bg}
                            flex items-center justify-center
                            shadow-2xl
                            animate-bounce
                        `}>
                            <span className="text-5xl font-bold text-white drop-shadow-lg">
                                {currentNum}
                            </span>
                        </div>

                        {/* Countdown */}
                        {drawnConfig?.auto && (
                            <div className="mt-6">
                                <Countdown
                                    seconds={drawnConfig?.second || 10}
                                    onFinish={() => {
                                        setModalVisible(false);
                                        setTimeout(() => debouncedDrawNumber(), 300);
                                    }}
                                />
                            </div>
                        )}

                        {/* Close hint */}
                        <p className="mt-4 text-white/60 text-sm">แตะเพื่อปิด</p>
                    </div>
                )}
            </CenterPopup>
        </div>
    );
};

export default BingoDrawer;
