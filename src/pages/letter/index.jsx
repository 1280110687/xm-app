import React, { useEffect, useRef, useState } from 'react';

const LetterPage = () => {
    // 原始 HTML 内容
    const contentHTML = `
    <div class="tltile">ພວກເຮົາ</div>
    <div class="text">
      <p style="margin: 0;">ສະບາຍດີ,</p>
      <p>
        ຂ້ອຍຍັງເຮັດວ່າທ່ານຊີ້ນໆຈະໄດ້ຮັກສາມີຄວາມທີ່ບໍ່ສົບຕໍ່ກັນ. ຂ້ອຍຍັງໄດ້ຮັກສາວ່າທ່ານມີຄວາມທີ່ຂ້ອຍມີຄວາມອາດຈະຍົກເລີກ. ຄວາມທີ່ຄົບມາໄດ້ຮັກສາຄວາມດີກວ່າຂ້ອຍອອກມາດີ.
      </p>
      <p>
        ຂ້ອຍຍັງເມື່ອສະບາຍດີທ່ານຈະເປັນທ່ານທີ່ມີຄວາມທີ່ສຸດທ່ານທີ່ຍັງບໍ່ເຫັນພຽງພໍ, ຂ້ອຍຈະບໍ່ລົງໄດ້ສະຕິດຕິດກັນຂອງຂ້ອຍ. ຂ້ອຍຍັງໄດ້ຮັກສາວ່າຈະມາຊົງບໍ່ອອກໄດ້ຢູ່ທີ່ທ່ານ.
      </p>
      <p>
        ຂ້ອຍຮັກສາເປັນຄົນທີ່ຍັງມີຄວາມທີ່ສຸດທີ່ຈະທຳການຂອງຂ້ອຍ. ຂ້ອຍດີຂອງທ່ານ, ຂ້ອຍຍັງມີຄວາມຍິນເປັນບໍ່ສຸດທຈານ.
      </p>
      <p>
        ຂ້ອຍຈະສະຫງົບສອບປະກາດໃນການຮັກສາແລະສະແດງຄວາມຍິນສຸດທຈານ.
      </p>
      <p>
        ຂໍຂອບໃຈ,
      </p>
      <p>
      </p >
    <p>
        Ming
    </p>
    </div >`;

    const [displayedHTML, setDisplayedHTML] = useState('');
    const [fadeOut, setFadeOut] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        let progress = 0;
        let lastTimestamp = null;
        const interval = 80; // 每 80 毫秒更新一次

        const animate = (timestamp) => {
            if (!lastTimestamp) {
                lastTimestamp = timestamp;
            }
            const delta = timestamp - lastTimestamp;
            if (delta >= interval) {
                // 如果当前字符为 '<' 则一次性显示完整标签
                if (contentHTML.charAt(progress) === '<') {
                    const closingIndex = contentHTML.indexOf('>', progress);
                    if (closingIndex !== -1) {
                        progress = closingIndex + 1;
                    } else {
                        progress++;
                    }
                } else {
                    progress++;
                }
                // 根据 progress 奇偶性添加下划线效果
                const textToDisplay =
                    contentHTML.substring(0, progress) + (progress % 2 === 1 ? '_' : '');
                setDisplayedHTML(textToDisplay);
                lastTimestamp = timestamp;
            }
            if (progress < contentHTML.length) {
                requestAnimationFrame(animate);
            } else {
                // 打字结束后稍延时启动淡出效果
                setTimeout(() => {
                    // setFadeOut(true);
                }, 500);
            }
        };

        const animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [contentHTML]);

    const handlePlayAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div className={`h-full w-[100vh] p-[16px]`}>
            <div
                className="code"
                dangerouslySetInnerHTML={{ __html: displayedHTML }}
                style={fadeOut ? { opacity: 0, transition: 'opacity 5.2s' } : {}}
            ></div>
        </div>
    );
};

export default LetterPage;
