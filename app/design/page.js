"use client";
import Image from "next/image";
import styles from "./Design.module.css";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
const App = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState(0);
  const [imgSrc, setImgSrc] = useState([]);
  const [isImageFocused, setIsImageFocused] = useState(false);
  let canvas = useRef(),
    printArea = useRef();
  const saveImage = async () => {
    // printArea.current.style.width = "100vw";
    // printArea.current.style.height = "100vh";
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
  function handlePointerMove(e) {
    if (!isDragging) return;
    let x, y;
    let previousOffset = x ?? 0;

    x = e.clientX;
    y = e?.clientY;
    let currentOffset = x;
    console.log(currentOffset - previousOffset);
    // console.log(x, y);

    setIsImageFocused(!isImageFocused);
  }
  function handleTouchMove(e) {
    if (!isDragging) return;
    let x = e?.touches[0].clientX;
    let y = e.touches[0].clientY;

    console.log("X:", x);
    console.log("Y", y);
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
                    imgSrc.map((source, index) => (
                      <TransformWrapper disabled={true} key={index}>
                        <TransformComponent>
                          <div
                            style={{
                              position: "relative",
                              left: `${0.02 * x}px`,
                            }}
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
                            <Image
                              src={source}
                              width={200}
                              height={200}
                              alt={"hello"}
                            ></Image>
                          </div>
                        </TransformComponent>
                      </TransformWrapper>
                    ))}
                </div>
                {/* <Image src={"/assets/tshirt-black.png"} fill alt="dk" /> */}
                {/* <Image src={"/IPXSM-CS (1).png"} fill alt="dk" /> */}
              </div>
            </TransformComponent>
          </TransformWrapper>
          {/* <Image src={"/anish.png"} width="200" height={200} alt="image3" /> */}
        </div>
      </div>
    </div>
  );
};

export default App;
