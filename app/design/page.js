"use client";
import Image from "next/image";
import styles from "./Design.module.css";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import DragAndDrop from "./DragAndDrop";
import { removeBackgroundFromImageBase64 } from "remove.bg";
async function removeBg(base64img) {
  const result = await removeBackgroundFromImageBase64({
    base64img,
    apiKey: "process.env.REMOVEBG_API_KEY",
    size: "regular",
    type: "auto",
    crop: true,
    scale: "100%",
    outputFile: "/image.png",
  });
  return "successful";
}

const App = () => {
  const [imgSrc, setImgSrc] = useState([]);
  const [isImageFocused, setIsImageFocused] = useState(false);
  let canvas = useRef(),
    printArea = useRef();
  const saveImage = async () => {
    // printArea.current.style.width = "2160px";
    // printArea.current.style.height = "1800px";

    printArea.current.style.transform = "translate(0%, 0%)";
    printArea.current.style.scale = "10";
    printArea.current.style.transformOrigin = "top right";
    const canvaselem = await html2canvas(printArea.current);

    const image = canvaselem.toDataURL();
    const a = document.createElement("a");
    a.href = "data:" + image;
    a.download = "image.png";
    a.click();

    printArea.current.style.scale = "1";
    printArea.current.style.transform = "translate(50%, -50%)";
    // removeBg("data:" + image).then((e) => console.log(e));
    // canvas.current.style.backgroundImage = "none";
    // canvas.current.style.backgroundColor = "transparent";

    // const newcanvaselem = await html2canvas(canvas.current);

    // const imageWithoutBackground = newcanvaselem.toDataURL();
    // canvas.current.style.scale = "2";
    // canvas.current.style.scale = "2";
    // a.href = "data:" + imageWithoutBackground;
    // a.download = "image-without-background.png";
    // a.click();
    // canvas.current.style.backgroundImage = `url("./../../public/assets/tshirt-black.png")`;
    // canvas.current.style.backgroundColor = "royalblue";
  };

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
                          onPointerDown={() => {
                            toggleImageFocus();
                          }}
                          onPointerUp={() => {}}
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
