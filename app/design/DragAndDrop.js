"use client";
import { useEffect, useState } from "react";

const DragAndDrop = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [xTranslate, setXTranslate] = useState(0);
  const [yTranslate, setYTranslate] = useState(0);
  const [initialMousePosition, setInitialMousePosition] = useState({});
  const onPointerDown = (e) => {
    setInitialMousePosition({
      x: e.clientX || e?.touches[0].clientX,
      y: e.clientY || e?.touches[0].clientY,
    });
    console.log(initialMousePosition);
    setIsDragging(true);
  };
  useEffect(() => {
    const onPointerMove = (e) => {
      let x = e.clientX || e?.touches[0].clientX;
      let y = e.clientY || e?.touches[0].clientY;
      setXTranslate(xTranslate + x - initialMousePosition.x);
      setYTranslate(yTranslate + y - initialMousePosition.y);
    };

    if (isDragging) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("touchmove", onPointerMove);
    }
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
    };
  }, [isDragging, initialMousePosition]);
  useEffect(() => {
    const onPointerUp = () => setIsDragging(false);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("touchcancel", onPointerUp);
    return () => {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("touchup", onPointerUp);
    };
  }, []);
  return (
    <div
      style={{ transform: `translate(${xTranslate}px,${yTranslate}px)` }}
      onPointerDown={onPointerDown}
      onTouchStart={onPointerDown}
    >
      {" "}
      {children}
    </div>
  );
};

export default DragAndDrop;
