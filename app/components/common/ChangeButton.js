import { useEffect, use, useState, useRef } from "react";

export default function ChangeButton({ buttons, defaultNumber = 0, onChange, status }) {
  // 1. 状態管理（今のインデックス）
  const [activeIndex, setActiveIndex] = useState(buttons.findIndex((b) => b.value === status || defaultNumber));

  // 2. 現在のボタン情報を取得
  const currentButton = buttons[activeIndex];

  // 3. クリック時の処理
  const handleClick = (e) => {
    let newIndex; // ← 新しいインデックスを保存する変数

    if (!e.shiftKey) {
      newIndex = (activeIndex + 1) % buttons.length;
    } else {
      newIndex = (activeIndex - 1 + buttons.length) % buttons.length;
    }

    setActiveIndex(newIndex);
    onChange && onChange(buttons[newIndex].value); // ← 新しいインデックスから value を取得！
    console.log(buttons[newIndex].value);
  };

  const animationStyle = {
    strongEase: "transition-all duration-300 ease-[cubic-bezier(0,.70,.70,1)]",
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`aspect-square h-12 cursor-pointer rounded-lg p-2 ${currentButton.bg} text-${currentButton.color} ${animationStyle["strongEase"]}`}
    >
      <div className={`h-full w-full rounded-full border-2 p-2 border-color-${currentButton.color} ${animationStyle["strongEase"]}`}>
        {currentButton.label}
      </div>
    </button>
  );
}
