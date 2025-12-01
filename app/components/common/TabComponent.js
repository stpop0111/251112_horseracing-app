import { useState, useEffect, useRef } from "react";

export default function TabComponent({ tabs, children}) {

  /* ------------------------------------
      タブ切り替え
    ------------------------------------ */
  const [activeTab, setActiveTab] = useState(tab[0]?.value || ""); // 現在開いているメモの種類を保存する（デフォルト：予想メモ）
  const tabContainerRef = useRef(null); // CSSが切り替わる要素のコンテナをuseRefで宣言

  useEffect(() => {
    if (!tabContainerRef.current) return; // DOMがない場合は強制終了
    const tabButtons = tabContainerRef.current.querySelectorAll("button"); // 変化させる要素を取得

    tabButtons.forEach((tab) => {
      if (tab.value === activeTab) {
        tab.classList.add("bg-neutral-50", "shadow-lg", "font-bold"); // activeTabに入っている値と押されたボタンの値が一致している場合にクラスを付与する
      } else {
        tab.classList.remove("bg-neutral-50", "shadow-lg", "font-bold");
      }
    });
  }, [activeTab]); // 表示されているタブの情報が変わるたびにマウントされる


  return (
    <>
      <div className="mb-4">
        <div className="flex justify-center gap-4 rounded-xl bg-gray-200 p-2" ref={tabContainerRef}>
          {tabs.map((tab) => (
            <button
              className="tab flex w-full items-center justify-center rounded-lg bg-neutral-50 p-4 font-bold text-gray-600 shadow-lg"
              type="button"
              key={tab.value}
              value={tab.value}
              onClick={(e) => {
                setActiveTab(e.target.value);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        {activeTab === "preMemo" && { children }}
        {activeTab === "recoMemo" && { children }}
      </div>
    </>
  );
}
