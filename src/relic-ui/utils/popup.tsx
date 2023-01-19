import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";

const alertAtom = atom({
  popups: [] as React.ReactNode[],
});

///

export function ToastHolder() {
  const [alerts, setAlerts] = useAtom(alertAtom);

  return (
    <AnimatePresence>
      {alerts.popups.length > 0 ? (
        <div className="absolute full z-[120] inset-0">
          {alerts.popups.map((alert, _) => (
            <div className="flex items-center justify-center inset-0 absolute h-full ">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  //
                  setAlerts({
                    popups: alerts.popups.filter((p, i) => i !== _),
                  });
                }}
                className="bg-black/50  absolute inset-0 py-1"
              ></motion.div>
              <RAlert key={_}>{alert}</RAlert>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </AnimatePresence>
  );
}

// export function useRPopup(): (path: string, popup: React.ReactNode) => void {
//   const [alerts, setAlerts] = useRecoilState(alertAtom);

//   return (path: string, popup: React.ReactNode) => {

//     setAlerts({
//       popups: [...alerts.popups, popup],
//     });
//   };
// }

// export function useRClosePopup(): () => void {
//   const [alerts, setAlerts] = useRecoilState(alertAtom);
//   return () => {
//     setAlerts({
//       popups: alerts.popups.slice(0, -1),
//     });
//   };
// }

export function RAlert({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.2,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 1.2,
      }}
      className=" m-8  absolute  max-h-full "
    >
      {children}
    </motion.div>
  );
}

///
/// This is temporary
///

export function PopupMaker(props: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <div className="absolute full z-[800] inset-0">
      <div className="flex items-center justify-center inset-0 absolute h-full ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            navigate(-1);
          }}
          className="bg-black/50  absolute inset-0 py-1"
        ></motion.div>
        <RAlert>{props.children}</RAlert>
      </div>
    </div>
  );
}
