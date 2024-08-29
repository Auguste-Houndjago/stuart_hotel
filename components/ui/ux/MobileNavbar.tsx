"use client";
import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import "./MobileNavbar.css"

const MobileNavbar = () => {
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

  const menuItems = [
    { icon: "home-outline", color: '#f44336', link: '/' },
    { icon: "person-outline", color: '#ffa117', link: '#' },
    { icon: "chatbubble-outline", color: '#0fc70f', link: '#' },
    { icon: "camera-outline", color: '#2196f3', link: '#' },
    { icon: "settings-outline", color: '#b145e9', link: '#' },
  ];

  return (
    <div className="w-full static flex justify-center items-center rounded-md ">
      <div className="navigation w-full static flex justify-center items-center bg-white rounded-md">
        <ul className="flex justify-center w-4/5 gap-x-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`list ${index === activeIndex ? 'active' : ''} flex justify-center items-center relative w-[70px] h-[60px] z-20`}
              onClick={() => handleItemClick(index)}
            >
              <a href={item.link} className="flex justify-center items-center w-full h-full text-gray-700">
                <span
                  className="icon bg-white flex justify-center items-center w-[55px] h-[55px] text-2xl rounded-full transition-transform duration-500"
                  style={{
                    color: index === activeIndex ? item.color : '',
                  }}
                >
                  <IonIcon name={item.icon} />
                </span>
              </a>
            </li>
          ))}
          <div className="indicator absolute top-[-35px] w-[70px] h-[70px] bg-white rounded-full z-10 transition-transform duration-500"></div>
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
