"use client";
import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import "./MobileNavbar.css"

const MobileNavbar = ({ onCustomClick }: { onCustomClick?: () => void }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const listItems = document.querySelectorAll('.list');
    const indicator = document.querySelector('.indicator') as HTMLElement;

    if (indicator) {
      const activeItem = listItems[activeIndex] as HTMLElement;
      indicator.style.left = `${activeItem.offsetLeft}px`;
      indicator.style.width = `${activeItem.clientWidth}px`;
    }
  }, [activeIndex]);

  return (
    <div className="w-full flex justify-center items-center rounded-md">
      <div className="navigation border-t border-black w-full h-auto flex justify-center items-center bg-white dark:bg-white rounded-md">
        {/* div de la barre d'icons */}
        <ul className="flex justify-center w-4/5 gap-x-4">
          <li
            className={`list ${activeIndex === 0 ? 'active' : ''} flex justify-center items-center relative w-[70px] h-[60px] z-20`}
            onClick={() => handleItemClick(0)}
          >
            <a href="/" className={`flex justify-center items-center w-full text-gray-700`}>
              <span
                className={`icon flex justify-center items-center w-[55px] h-[55px] text-2xl rounded-full transition-transform duration-500`}
                style={{ color: activeIndex === 0 ? '#f44336' : '' }}
              >
                <IonIcon name="home-outline" />
              </span>
            </a>
          </li>
          <li
            className={`list ${activeIndex === 1 ? 'active' : ''} flex justify-center items-center relative w-[70px] h-[60px] z-20`}
            onClick={() => handleItemClick(1)}
          >
            <a href="#" className={`flex justify-center items-center w-full text-gray-700`}>
              <span
                className={`icon flex justify-center items-center w-[55px] h-[55px] text-2xl rounded-full transition-transform duration-500`}
                style={{ color: activeIndex === 1 ? '#ffa117' : '' }}
              >
                <IonIcon name="person-outline" />
              </span>
            </a>
          </li>
          <li
            className={`list ${activeIndex === 2 ? 'active' : ''} flex justify-center items-center relative w-[70px] h-[60px] z-20`}
            onClick={() => handleItemClick(2)}
          >
            <a href="#" className={`flex justify-center items-center w-full text-gray-700`}>
              <span
                className={`icon flex justify-center items-center w-[55px] h-[55px] text-2xl rounded-full transition-transform duration-500`}
                style={{ color: activeIndex === 2 ? '#0fc70f' : '' }}
              >
                <IonIcon name="chatbubble-outline" />
              </span>
            </a>
          </li>
          <li
            className={`list ${activeIndex === 3 ? 'active' : ''} flex justify-center items-center relative w-[70px] h-[60px] z-20`}
            onClick={() => handleItemClick(3)}
          >
            <a href="#" className={`flex justify-center items-center w-full text-gray-700`}>
              <span
                className={`icon flex justify-center items-center w-[55px] h-[55px] text-2xl rounded-full transition-transform duration-500`}
                style={{ color: activeIndex === 3 ? '#2196f3' : '' }}
              >
                <IonIcon name="camera-outline" />
              </span>
            </a>
          </li>
          <li
            className={`list ${activeIndex === 4 ? 'active' : ''} flex justify-center items-center relative w-[70px] h-[60px] z-20`}
            onClick={() => handleItemClick(4)}
          >
            <a href="#" className={`flex justify-center items-center w-full text-gray-700`}>
              <span
                className={`icon flex justify-center items-center w-[55px] h-[55px] text-2xl rounded-full transition-transform duration-500`}
                style={{ color: activeIndex === 4 ? '#b145e9' : '' }}
              >
                <IonIcon name="settings-outline" />
              </span>
            </a>
          </li>
          <div className="indicator absolute left-0 -top-7 w-14 h-14 bg-indigo-500 dark:bg-white shadow-md rounded-full border-t border-yellow-400 z-50 transition-transform duration-500"></div>
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
