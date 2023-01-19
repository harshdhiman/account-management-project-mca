import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const QuickPopup = (props: {
  children: React.ReactNode;
  popup: React.ReactNode;
  offsetTop?: number;
  offsetLeft?: number;
  id: string;
  height?: string;
  onClose?: (data: any) => void;
  noHide?: boolean;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);
  const popupDivRef = React.useRef<HTMLDivElement>(null);

  const [ox, setOx] = useState(0);
  const [oy, setOy] = useState(0);

  React.useEffect(() => {
    const lx = divRef.current?.offsetLeft;
    const ly = divRef.current?.offsetTop;
    const sw = window.innerWidth - 16;
    const w = popupDivRef.current?.clientWidth;
    const pw = divRef.current?.clientWidth;
    const ph = divRef.current?.clientHeight;
    //
    if (lx && w && ly && pw && ph) {
      // let r = lx - w / 2;
      // if (r + w > sw) {
      //   r = sw - w;
      // }
      // setOx(r - 4);
      // setOy(ly - (props.offsetTop ?? 0));
      //
      let transX = w / 2;

      if (lx + transX + 8 > sw) {
        const diff = sw - (lx + transX + 8);
        transX -= diff;
      }

      setOx(transX - (props.offsetLeft ?? 0));
      setOy(ph - (props.offsetTop ?? 0));
    }
  });

  return (
    <motion.div
      className="static"
      ref={divRef}
      onClick={() => {
        setIsVisible(!isVisible);
      }}
      style={{
        height: props.height,
      }}
    >
      <motion.div
        style={{
          height: props.height,
        }}
        layoutId={props.id}
        transition={{ duration: 0.15 }}
      >
        {props.children}
      </motion.div>
      {/* {props.children} */}
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => {
                // setIsVisible(false);
              }}
              className="fixed inset-0 bg-black/20 z-10"
            ></motion.div>
            <motion.div
              ref={popupDivRef}
              style={{
                // left: ox === 0 ? undefined : ox,
                // top: oy === 0 ? undefined : oy,
                translateX: -ox,
                translateY: -oy,
              }}
              className="fixed mx-4 z-[11]"
            >
              <motion.div
                layoutId={props.id}
                transition={{ duration: 0.15 }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="rounded-2xl overflow-clip bg-surfaceVariant20 border border-surfaceVariant40
                      
                "
              >
                {/* pass the hide fn to the popup component */}
                {React.cloneElement(props.popup as React.ReactElement, {
                  hide:
                    props.noHide === true
                      ? undefined
                      : (data?: any) => {
                          setIsVisible(false);
                          if (props.onClose) {
                            props.onClose(data);
                          }
                        },
                })}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
