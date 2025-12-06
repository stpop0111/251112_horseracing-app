import { useEffect, use, useState, useRef } from "react";

export default function ChangeButton({ buttons, defaultNumber = 0 }) {
  // 1. 状態管理（今のインデックス）
  const [activeIndex, setActiveIndex] = useState(defaultNumber);

  // 2. 現在のボタン情報を取得
  const currentButton = buttons[activeIndex];

  // 3. クリック時の処理
  const handleClick = (e) => {
    if (!e.shiftKey) {
      const nextIndex = (activeIndex + 1) % buttons.length;
      setActiveIndex(nextIndex);
    } else {
      const prevIndex = (activeIndex - 1 + buttons.length) % buttons.length;
      setActiveIndex(prevIndex);
    }
  };

  const animationStyle = {
    strongEase: "transition-all duration-300 ease-[cubic-bezier(0,.70,.70,1)]"
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`aspect-square h-12 rounded-lg p-2 ${currentButton.bg} text-${currentButton.color} ${animationStyle["strongEase"]}`}
    >
      <div 
        className={`h-full w-full rounded-full border-2 p-2 border-color-${currentButton.color} ${animationStyle["strongEase"]}`}
      >
        {currentButton.label}
        </div>
    </button>
  );
}
