"use client";
import Image from "next/image";
import styles from "./Design.module.css";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import DragAndDrop from "./../DragAndDrop";

const PhoneCoverDesign = () => {
  const [imgSrc, setImgSrc] = useState([]);
  const [isImageFocused, setIsImageFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedImageIndex, setFocusedImageIndex] = useState();
  let canvas = useRef(),
    printArea = useRef();

  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "artware");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/ddlejmdqj/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    // console.log(data);
    return data;
  }
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      // setImgSrc([...imgSrc, reader.result]);
      setImgSrc((imgSrc) => [...imgSrc, { src: reader.result }]);
    };
    reader.readAsDataURL(file);
    console.log(imgSrc);
  };

  function toggleImageFocus(e, index) {
    setFocusedImageIndex(index);
    console.log(index);

    [...e.target.parentElement.parentElement.children].forEach((element) => {
      element.children[0].children[0].style.outline = "none";
    });

    e.target.children[0].style.outline = "2px dotted black";
    e.target.style.zIndex = +e.target.style.zIndex + 1;

    // console.log(e.target.style.zIndex);

    setTimeout(() => {
      e.target.children[0].style.outline = "none";
    }, 3000);
    setIsImageFocused(true);
  }
  function resizeImage(e) {
    setIsImageFocused(!isImageFocused);
    imgSrc[focusedImageIndex].width = e.target.value;
    console.log(imgSrc[focusedImageIndex].width);
    setImgSrc(imgSrc);
  }

  async function handleOrder() {
    setIsLoading(true);
    imgSrc.forEach((image) => {
      uploadToCloudinary(image.src);
    });
    printArea.current.style.overflow = "visible";

    // printArea.current.style.scale = "2";
    // printArea.current.style.transform = "translate(0, 0)";

    // printArea.current.style.transformOrigin = "top right";
    const canvaselem = await html2canvas(printArea.current);

    const image = canvaselem.toDataURL();
    const a = document.createElement("a");
    a.href = "data:" + image;
    a.download = "image.png";
    a.click();

    // printArea.current.style.scale = "1";
    // printArea.current.style.transform = "translate(50%, -50%)";

    //for actual product photo

    const newcanvaselem = await html2canvas(canvas.current);

    const imageWithProduct = newcanvaselem.toDataURL();
    // canvas.current.style.scale = "2";

    a.href = "data:" + imageWithProduct;
    a.download = "image-without-background.png";
    a.click();
    // canvas.current.style.scale = "1";

    uploadToCloudinary("data:" + imageWithProduct).then((res) => {
      console.log(res);
    });
    printArea.current.style.overflow = "hidden";

    console.log("all images uploaded");
    setIsLoading(false);
  }

  return (
    <div className={styles.main} style={{ opacity: isLoading ? "0.1" : "1" }}>
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
        <div className={styles.addText}>Add Text</div>
        <button onClick={handleOrder}>Order Now</button>
        <br />
        <input
          type="range"
          className={styles.rangeForSize}
          min={0}
          max={100}
          onChange={resizeImage}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.editArea} ref={canvas}>
          <TransformWrapper disabled={isImageFocused}>
            <TransformComponent>
              <div
                className={styles.backgroundItem}
                onClick={(e) => {
                  setIsImageFocused(!e.target.className.includes("background"));
                }}
              >
                <div className={styles.cameraLens}>
                  <Image
                    src={"/assets/phonecovers/cameralens.png"}
                    fill
                    alt=""
                  ></Image>
                </div>
                <div className={styles.printArea} ref={printArea}>
                  {imgSrc &&
                    imgSrc.map((source, index) => {
                      // console.log(source);
                      return (
                        <DragAndDrop key={index}>
                          <div
                            onPointerDown={(e) => {
                              toggleImageFocus(e, index);
                            }}
                            onTouchEnd={(e) => {
                              toggleImageFocus(e, index);
                            }}
                            className={styles.imageContainer}
                          >
                            <Image
                              onClick={(e) => {
                                console.log(e);
                              }}
                              src={source.src}
                              width={200 * 0.02 * source.width || 200}
                              height={290 * 0.02 * source.width || 270}
                              alt={"could not load image"}
                            ></Image>{" "}
                          </div>
                        </DragAndDrop>
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

export default PhoneCoverDesign;
