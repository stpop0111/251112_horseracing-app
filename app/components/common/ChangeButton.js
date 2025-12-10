import { useEffect, use, useState, useRef } from "react";
import gsap from "gsap";

export default function ChangeButton({ buttons, defaultNumber = 0, onChange, status }) {
  const iconRef = useRef(null);

  // 1. 状態管理（今のインデックス）
  const [activeIndex, setActiveIndex] = useState("defaultNumber");

  useEffect(() => {
    const currentIndex = buttons.findIndex((b) => b.value === status);
    setActiveIndex(currentIndex >= 0 ? currentIndex : defaultNumber);
  }, [status, buttons]);

  // 2. 現在のボタン情報を取得
  const currentButton = buttons[activeIndex] || buttons[defaultNumber];

  // 3. クリック時の処理
  const handleClick = (e) => {
    let newIndex; // ← 新しいインデックスを保存する変数

    if (!e.shiftKey) {
      newIndex = (activeIndex + 1) % buttons.length;
    } else {
      newIndex = (activeIndex - 1 + buttons.length) % buttons.length;
    }

    const tl = gsap.timeline();

    tl.to(iconRef.current, {
      scale: 0,
      rotate: 45,
      duration: 0.25,
      ease: "power2.out",
      onComplete: () => {
        setActiveIndex(newIndex);
        onChange && onChange(buttons[newIndex].value);
      },
    }).to(iconRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const animationStyle = {
    strongEase: "transition-all duration-500 ease-[cubic-bezier(0,.70,.70,1)]",
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      type="button"
      className={`aspect-square h-12 cursor-pointer rounded-lg p-2 hover:scale-110 ${currentButton.bg} text-${currentButton.color} ${animationStyle["strongEase"]}`}
    >
      <div className={`h-full w-full rounded-full border-2 p-2 border-color-${currentButton.color} ${animationStyle["strongEase"]}`}>
        <div ref={iconRef}>{currentButton.label}</div>
      </div>
    </button>
  );
}
