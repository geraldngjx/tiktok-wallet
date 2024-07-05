"use client";

import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "../ui/separator";

export const AnimatedList = React.memo(({ className, children, delay = 1000 }: { className?: string; children: React.ReactNode; delay?: number }) => {
    const childrenArray = React.Children.toArray(children);
    const length = childrenArray.length;
    // const [index, setIndex] = useState(0);
    const [index, setIndex] = useState(length - 1);

    useEffect(() => {
        const interval = setInterval(() => {
            // if (index === childrenArray.length - 1) {
            //     clearInterval(interval);
            //     return;
            // }
            // setIndex((prevIndex) => prevIndex + 1);

            if (index === 0) {
                clearInterval(interval);
                return;
            }
            setIndex((prevIndex) => prevIndex - 1);
        }, delay);

        return () => clearInterval(interval);
    }, [childrenArray.length, delay, index]);

    // const itemsToShow = useMemo(() => childrenArray.slice(0, index + 1), [index, childrenArray]);
    const itemsToShow = useMemo(() => childrenArray.slice(index, length), [childrenArray, index, length]);

    return (
        <div className={`flex flex-col items-center space-y-1 mb-20 ${className}`}>
            <AnimatePresence>
                {itemsToShow.map((item) => (
                    <AnimatedListItem key={(item as ReactElement).key}>{item}</AnimatedListItem>
                ))}
            </AnimatePresence>
        </div>
    );
});

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
    const animations = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1, originY: 0 },
        exit: { scale: 0, opacity: 0 },
        transition: { type: "spring", stiffness: 350, damping: 40 },
    };

    return (
        <motion.div {...animations} layout className="mx-auto w-full">
            {children}
        </motion.div>
    );
}
