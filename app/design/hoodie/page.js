"use client";
import Image from "next/image";
import styles from "./Design.module.css";

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import DragAndDrop from "./../DragAndDrop";

const App = () => {
  const hoodiesUrl = [
    "/assets/hoodies/hoodie-black.png",
    "/assets/hoodies/hoodie-blue.png",
    "/assets/hoodies/hoodie-gray.png",
    "/assets/hoodies/hoodie-red.png",
    "/assets/hoodies/hoodie-white.png",
    "/assets/hoodies/hoodie-yellow.png",
  ];

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
    console.log(data);
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
    e.preventDefault();
    setIsImageFocused(true);

    setFocusedImageIndex(index);

    [...e.target.parentElement.parentElement.children].forEach((element) => {
      element.children[0].children[0].style.outline = "none";
    });

    e.target.children[0].style.outline = "8px solid rgba(199,199,199,0.4)";
    e.target.style.zIndex = +e.target.style.zIndex + 1;

    // console.log(e.target.style.zIndex);

    setTimeout(() => {
      e.target.children[0].style.outline = "none";
    }, 3000);
  }
  function resizeImageByWidth(e) {
    setIsImageFocused(!isImageFocused);
    imgSrc[focusedImageIndex].width = e.target.value;
  }
  function resizeImageByHeight(e) {
    setIsImageFocused(!isImageFocused);
    imgSrc[focusedImageIndex].height = e.target.value;
  }
  async function handleOrder() {
    setIsLoading(true);
    imgSrc.forEach((image) => {
      uploadToCloudinary(image.src);
    });

    printArea.current.style.scale = "2";
    printArea.current.style.transform = "translate(0, 0)";
    printArea.current.style.transformOrigin = "top right";
    const canvaselem = await html2canvas(printArea.current);

    const image = canvaselem.toDataURL();
    const a = document.createElement("a");
    a.href = "data:" + image;
    a.download = "image.png";
    a.click();

    printArea.current.style.scale = "1";
    printArea.current.style.transform = "translate(50%, -50%)";

    //for actual product photo

    const newcanvaselem = await html2canvas(canvas.current);

    const imageWithProduct = newcanvaselem.toDataURL();
    canvas.current.style.scale = "2";

    a.href = "data:" + imageWithProduct;
    a.download = "image-without-background.png";
    a.click();
    canvas.current.style.scale = "1";

    uploadToCloudinary("data:" + imageWithProduct).then((res) => {
      console.log(res);
    });
    console.log("all images uploaded");
    setIsLoading(false);
  }
  const handleHoodieChange = async (e, src) => {
    if (src) {
      canvas.current.style.backgroundImage = `url(${src})`;
    }
  };
  return (
    <>
      <div
        className={styles.main}
        style={{
          opacity: isLoading ? "0.1" : "1",
          touchAction: isImageFocused ? "none" : "auto",
        }}
      >
        <div className={styles.left}>
          <div className={styles.addText}>
            <h4>Customize Your Design</h4>
          </div>
          <div className={styles.addImage}>
            Select Image to upload:{" "}
            <input
              type="file"
              name="image"
              id="add-image"
              onChange={handleImageUpload}
            />
          </div>

          <br />
          <input
            type="range"
            className={styles.rangeForSize}
            min={0}
            max={100}
            onChange={resizeImageByWidth}
          />
          <input
            type="range"
            className={styles.rangeForSize}
            min={0}
            max={100}
            onChange={resizeImageByHeight}
          />
          <h3>More Variations</h3>
          <div className={styles.Hoodiesvariation}>
            {hoodiesUrl.map((Hoodie, index) => {
              return (
                <div
                  key={index}
                  className={styles.Hoodies}
                  onClick={(e) => {
                    handleHoodieChange(e, Hoodie);
                  }}
                >
                  <Image
                    src={Hoodie}
                    alt="No image available"
                    loading="lazy"
                    style={{ pointerEvents: "none" }}
                    width={50}
                    height={50}
                  ></Image>
                </div>
              );
            })}
          </div>
          <button onClick={handleOrder} className={"orderNowButton"}>
            Order Now
          </button>
        </div>
        <div className={styles.right}>
          <div className={styles.editArea}>
            <TransformWrapper disabled={isImageFocused}>
              <TransformComponent>
                <div
                  className={styles.backgroundItem}
                  ref={canvas}
                  onClick={(e) => {
                    setIsImageFocused(
                      !e.target.className.includes("background")
                    );
                  }}
                >
                  <div className={styles.printArea} ref={printArea}>
                    {imgSrc &&
                      imgSrc.map((source, index) => {
                        // console.log(source);
                        return (
                          <DragAndDrop key={index}>
                            <div
                              onPointerDown={(e) => {
                                toggleImageFocus(e, index);
                                setIsImageFocused(true);
                                console.log("clicked");
                                // canvas.current.parentElement.parentElement.style.overflow =
                                //   "hidden";
                              }}
                              onPointerMove={(e) => {
                                setIsImageFocused(true);
                              }}
                              onTouchEnd={(e) => {
                                // e.target.click();
                                setIsImageFocused(false);
                                console.log("done");
                              }}
                              className={styles.imageContainer}
                            >
                              <Image
                                onClick={(e) => {
                                  console.log(e);
                                }}
                                src={source.src}
                                width={200 * 0.02 * source.width || 200}
                                height={200 * 0.02 * source.height || 200}
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
    </>
  );
};

export default App;
