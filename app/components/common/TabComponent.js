import { useState, useEffect, useRef } from "react";

export function TabComponent({ tabs, children, onTabChange, size = "mid", filterKey }) {
  /* ------------------------------------
      タブ切り替え
    ------------------------------------ */
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || ""); // 現在開いているメモの種類を保存する（デフォルト：予想メモ）
  const tabContainerRef = useRef(null); // CSSが切り替わる要素のコンテナをuseRefで宣言
  const activeElement = useRef(null);

  useEffect(() => {
    if (!tabContainerRef.current) return; // DOMがない場合は強制終了
    const tabButtons = tabContainerRef.current.querySelectorAll("button"); // 変化させる要素を取得

    const activeTabButton = () => {
      tabButtons.forEach((tab) => {
        if (tab.value === activeTab) {
          const rect = tab.getBoundingClientRect();
          const containerRect = tabContainerRef.current.getBoundingClientRect(); // 親の位置も取得して...
          const relativeLeft = rect.left - containerRect.left; // 引き算すると...？
          const relativeTop = rect.top - containerRect.top;
          activeElement.current.style.width = `${rect.width}px`;
          activeElement.current.style.left = `${relativeLeft}px`;
          activeElement.current.style.top = `${relativeTop}px`;
          activeElement.current.style.height = `${rect.height}px`;
        }
      });
    };

    activeTabButton();

    window.addEventListener("resize", activeTabButton);

    return () => {
      window.removeEventListener("resize", activeTabButton);
    };
  }, [activeTab, tabs]); // 表示されているタブの情報が変わるたびにマウントされる

  const containrStyle = {
    sml: "w-auto p-1",
    mld: "w-full p-2",
  };

  const tabStyle = {
    sml: "py-2 w-24",
    mid: "py-4 w-full",
  };

  return (
    <>
      <div className={`relative flex justify-center gap-4 rounded-xl bg-gray-200 p-2 ${containrStyle[size]}`} ref={tabContainerRef}>
        {tabs.map((tab) => (
          <button
            className={`relative z-10 flex items-center justify-center font-bold transition-all duration-300 ease-[cubic-bezier(0,.70,.70,1)] ${tabStyle[size]} ${
              tab.value === activeTab ? "text-gray-900" : "text-gray-400"
            }`}
            type="button"
            key={tab.value}
            value={tab.value}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(e.target.value);
              onTabChange && onTabChange(e.target.value, filterKey);
            }}
          >
            {tab.label}
          </button>
        ))}
        <div
          className="shado-lg absolute z-5 rounded-lg bg-neutral-50 transition-all duration-300 ease-[cubic-bezier(0,.70,.70,1)]"
          ref={activeElement}
        ></div>
      </div>
      {children && (
        <div className="mt-4">
          {Array.isArray(children)
            ? children.find((child) => child.props.tabValue === activeTab)
            : children?.props?.tabValue === activeTab
              ? children
              : null}
        </div>
      )}
    </>
  );
}

export function Tab({ tabValue, children }) {
  return <div>{children}</div>;
}
