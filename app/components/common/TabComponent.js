import { useState, useEffect, useRef } from "react";

export function TabComponent({ 
  tabs, 
  children, 
  onTabChange, 
  filterKey, 
  defaultNumber = 0, 
  tabStyle = "square",
  size = "mid", 
  className = "",
}) {
  
  /* ------------------------------------
    タブ切り替え
  ------------------------------------ */
  const [activeTab, setActiveTab] = useState(tabs[defaultNumber]?.value || ""); // 受け取った番号を最初にする
  const tabContainerRef = useRef(null); // CSSが切り替わる要素のコンテナをuseRefで宣言
  const activeElement = useRef(null);
  const currentTab = tabs.find((tab) => tab.value === activeTab);

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


  /* ------------------------------------
    タブ切り替え
  ------------------------------------ */
  const animationStyle = {
    strongEase: "transition-all duration-300 ease-[cubic-bezier(0,.70,.70,1)]"
  }

  const btnStyle = {
    sml: "p-2",
    mid: "p-4"
  }

  return (
    <>
      <div
        className={`relative inline-flex justify-center gap-4 p-2 ${className} ${animationStyle["strongEase"]}
          ${ tabStyle === "pill" ? "rounded-full" : "rounded-lg" }
          ${ currentTab && currentTab.activeBg ? currentTab.activeBg : "bg-gray-100"}
          
        `}
        ref={tabContainerRef}
      >
        {tabs.map((tab) => (
      <button
        className={`relative z-10 inline-flex items-center justify-center font-bold ${animationStyle["strongEase"]}
        ${ tab.value === activeTab ? tab.activeColor || "text-gray-900 hover:text-gray-900" : "text-gray-400 hover:text-gray-600" }
        ${ tab.style === "square" ? "aspect-square" : "" }
        ${ btnStyle[size] }
        `}
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
          className={`bg-neutral-50 absolute z-5 shadow-lg ${animationStyle["strongEase"]}
            ${ tabStyle === "pill" ? "rounded-full" : "rounded-lg" }
            `}
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
