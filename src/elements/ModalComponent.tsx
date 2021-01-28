import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { CloseIcon } from "./Icons";
import TWButton from "./TWButton";

export enum SlideType {
  LEFT,
  BOTTOM,
}

type Props = {
  children: any;
  inputValues: {
    [key: string]: string | number | boolean;
  };
  visible: boolean;
  toggle: () => null;
  type: SlideType;
};

const Modal: React.FC<Props> = ({ children, visible, toggle, type = SlideType.BOTTOM }) => {
  const [isshowingModal, showModal] = useState(visible);

  const { x: bottom } = useSpring({
    x: isshowingModal ? -40 : 1200,
  });
  const { x: right } = useSpring({
    x: isshowingModal ? 100 : 0,
  });

  const bottomProps = { transform: bottom.interpolate((x: any) => `translate3d(0,${x}px, 0)`) };
  const leftProps = { transform: right.interpolate((x: any) => `translate3d(${x * -1}%, 0,0)`) };
  const props = type === SlideType.BOTTOM ? bottomProps : leftProps;
  console.log(visible, isshowingModal);
  useEffect(() => {
    showModal(visible);
  }, [visible]);
  return (
    <animated.div style={props}>
      <div className="inset-0 flex z-50 bg-gray-800  bg-opacity-50 absolute w-full h-screen">
        <div className="top-0 left-0 right-0 flex  bg-white fixed z-50 shadow-lg rounded pt-1 flex-col  ">
          <div className="flex items-start flex-col h-96">
            <TWButton onClick={toggle} className="w-24 items-center flex">
              Close <CloseIcon></CloseIcon>
            </TWButton>
            {children}
          </div>
        </div>
      </div>
    </animated.div>
  );
};
export default Modal;
