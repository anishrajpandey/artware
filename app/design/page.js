"use client";
import Image from "next/image";
import styles from "./Design.module.css";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import DragAndDrop from "./DragAndDrop";
const App = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [imgSrc, setImgSrc] = useState([]);
  const [isImageFocused, setIsImageFocused] = useState(false);
  let canvas = useRef(),
    printArea = useRef();
  const saveImage = async () => {
    printArea.current.style.scale = "5";
    printArea.current.style.scale = "5";
    const canvaselem = await html2canvas(printArea.current);

    const image = canvaselem.toDataURL();
    const a = document.createElement("a");
    a.href = "data:" + image;
    a.download = "image.png";
    a.click();
  };
  function handleMove(e) {
    if (isDragging || true) {
      console.log(e.clientX);
    }
  }
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => [setImgSrc([...imgSrc, reader.result])];
    // reader.read(file);
    let url = reader.readAsDataURL(file);

    console.log(imgSrc);
  };

  function toggleImageFocus() {
    setIsImageFocused(true);
  }
  let currentOffset, newXOffset, newYOffset;
  function handlePointerMove(e) {
    const parentElement = e.target.parentElement;

    if (!isDragging) return;

    const rect = parentElement.getBoundingClientRect();
    let xOffset = e.clientX - rect.left;
    let yOffset = e.clientY - rect.top;
    if (newXOffset > xOffset) {
      setX(xOffset);
    } else {
      setX(-xOffset);
    }
    if (newYOffset > yOffset) {
      setY(yOffset);
    } else {
      setY(-yOffset);
    }
    newXOffset = e.clientX - rect.left;
    newYOffset = e.clientY - rect.top;

    if (!Math.abs(currentOffset - e.clientX)) {
      // setX(Math.abs(currentOffset - e.clientX));
      // console.log(x);
    }
    currentOffset = e.clientX;

    // xa = e.clientX;
    // y = e?.clientY;    // console.log("🤔 > handlePointerMove > previousOffset", previousOffset);
    // console.log("🤔 > handlePointerMove > currentOffset", currentOffset);

    setIsImageFocused(!isImageFocused);
  }
  function handleTouchMove(e) {
    if (!isDragging) return;
    let x = e?.touches[0].clientX;
    let y = e.touches[0].clientY;
  }
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <div className={styles.addImage}>
          Select Image to upload:{" "}
          <input
            type="file"
            name="image"
            id="add-image"
            onChange={handleImageUpload}
          />
        </div>
        <div className={styles.addText} onClick={saveImage}>
          Add Text
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.editArea}>
          <TransformWrapper disabled={isImageFocused}>
            <TransformComponent>
              <div
                className={styles.backgroundItem}
                ref={canvas}
                onClick={(e) => {
                  setIsImageFocused(!e.target.className.includes("background"));
                }}
              >
                <div className={styles.printArea} ref={printArea}>
                  {imgSrc &&
                    imgSrc.map((source, index) => {
                      return (
                        <div
                          key={index}
                          style={{}}
                          onPointerMove={handlePointerMove}
                          onTouchMove={handleTouchMove}
                          onPointerDown={() => {
                            toggleImageFocus();
                            setIsDragging(true);
                          }}
                          onPointerUp={() => {
                            setIsDragging(false);
                          }}
                          className={styles.imageContainer}
                        >
                          <DragAndDrop>
                            <Image
                              src={source}
                              width={200}
                              height={200}
                              alt={"hello"}
                            ></Image>{" "}
                          </DragAndDrop>
                        </div>
                      );
                    })}
                </div>
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>
      </div>
    </div>
  );
};

export default App;
