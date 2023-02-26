"use client";
import Image from "next/image";
import styles from "./Design.module.css";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useRef, useState, useContext } from "react";
import html2canvas from "html2canvas";
import DragAndDrop from "./../DragAndDrop";
import Context from "@/context/context";
import postOrderToMongodb from "@/utils/postOrderToMongodb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import showToast from "@/utils/showToast";
import Loading from "@/app/Loading";
const PhoneCoverDesign = () => {
  const { userData, isLoggedIn } = useContext(Context);
  let count = 1;
  const Covers = [
    "/assets/phonecovers/pc-black.png",
    "/assets/phonecovers/pc-white.png",
    "/assets/phonecovers/pc1-transparent.png",
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

    showToast("Uploaded Image: " + count, true);
    count++;
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
  function resizeImageByWidth(e) {
    setIsImageFocused(!isImageFocused);
    imgSrc[focusedImageIndex].width = e.target.value;
  }
  function resizeImageByHeight(e) {
    setIsImageFocused(!isImageFocused);
    imgSrc[focusedImageIndex].height = e.target.value;
  }

  async function handleOrder(e) {
    setIsLoading(true);

    e.preventDefault();
    window.scrollTo({ top: 0 });
    const orderSchemaParams = {
      type: "custom",
      category: "phonecover",

      user: userData._id || undefined,
      price: 900,
      imgurls: {
        images: [],
        productSnapShot: "",
        printAreaImage: "",
      },
      description: e.target[3].value,
    };

    imgSrc.forEach(async (image) => {
      await uploadToCloudinary(image.src).then(({ secure_url }) => {
        orderSchemaParams.imgurls.images.push(secure_url);
        console.log(orderSchemaParams);
      });
    });

    printArea.current.style.overflow = "visible";

    // printArea.current.style.scale = "2";
    // printArea.current.style.transform = "translate(0, 0)";

    // printArea.current.style.transformOrigin = "top right";
    const canvaselem = await html2canvas(printArea.current);

    const image = canvaselem.toDataURL();
    // const a = document.createElement("a");
    // a.href = "data:" + image;
    // a.download = "image.png";
    // a.click();

    // printArea.current.style.scale = "1";
    // printArea.current.style.transform = "translate(50%, -50%)";

    //for actual product photo

    const newcanvaselem = await html2canvas(canvas.current);

    const imageWithProduct = newcanvaselem.toDataURL();
    // canvas.current.style.scale = "2";

    // a.href = "data:" + imageWithProduct;
    // a.download = "image-without-background.png";
    // a.click();
    // canvas.current.style.scale = "1";

    await uploadToCloudinary("data:" + imageWithProduct).then((res) => {
      orderSchemaParams.imgurls.productSnapShot = res.secure_url;
    });
    //uploading print area image to cloudinary
    await uploadToCloudinary("data:" + image).then((res) => {
      orderSchemaParams.imgurls.printAreaImage = res.secure_url;
    });
    console.log("final params object", orderSchemaParams);
    let result = await postOrderToMongodb(orderSchemaParams);
    setIsLoading(false);
  }
  const handleCoverChange = async (e, src) => {
    if (e.target.value) {
      canvas.current.style.backgroundColor = e.target.value;
    }
    if (src) {
      canvas.current.style.backgroundImage = `url(${src})`;
    }
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {isLoading ? <Loading /> : null}
      <div
        className={styles.main}
        style={{
          opacity: isLoading ? "0.1" : "1",
          touchAction: isImageFocused ? "none" : "auto",
        }}
      >
        <div className={styles.left}>
          <form onSubmit={handleOrder}>
            <div className={styles.addText}>
              <h2>Customize Your Design</h2>
            </div>
            <div
              className={styles.resizeOptions}
              style={{ display: imgSrc[0] ? "block" : "none" }}
            >
              <h4>Resize Your Image</h4>
              <label htmlFor="width">
                Width:
                <input
                  type="range"
                  className={styles.rangeForSize}
                  min={0}
                  max={100}
                  onChange={resizeImageByWidth}
                  id="width"
                />
              </label>

              <label htmlFor="height">
                Height:
                <input
                  type="range"
                  className={styles.rangeForSize}
                  min={0}
                  max={100}
                  onChange={resizeImageByHeight}
                  id="height"
                />
              </label>
            </div>
            <div className={styles.addImage}>
              Add Your Image
              <input
                type="file"
                name="image"
                id="add-image"
                onChange={handleImageUpload}
              />
            </div>
            <h3>More Variations</h3>
            <div className={styles.Coversvariation}>
              {Covers.map((Cover, index) => {
                return (
                  <div
                    key={index}
                    className={styles.Covers}
                    onClick={(e) => {
                      handleCoverChange(e, Cover);
                    }}
                  >
                    <Image
                      src={Cover}
                      alt=""
                      style={{ pointerEvents: "none" }}
                      width={50}
                      height={100}
                    ></Image>
                  </div>
                );
              })}
            </div>
            Choose your own color:
            <input
              type="color"
              name="color"
              id="colorinput"
              onChange={handleCoverChange}
            />
            <div className={styles.details}>
              <h4>Anything More?</h4>
              <span>(Optional)</span>
              <textarea
                name="details"
                id="details"
                cols="30"
                rows="10"
                placeholder="Tell Us more about how you want your product to be customized. It helps us to better understand your order..."
              ></textarea>
            </div>
            <div className={styles.buttonWrapper}>
              <button
                disabled={!isLoggedIn && !isLoading}
                className={`orderNowButton ${styles.orderNowButton}`}
                type="submit"
              >
                {isLoggedIn ? "Order Now " : "LogIn First"}
              </button>
            </div>
          </form>
        </div>
        <div className={styles.right}>
          <div className={styles.editArea}>
            <TransformWrapper disabled={isImageFocused}>
              <TransformComponent>
                <div
                  className={styles.backgroundItem}
                  onClick={(e) => {
                    setIsImageFocused(
                      !e.target.className.includes("background")
                    );
                  }}
                  ref={canvas}
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
                                height={290 * 0.02 * source.height || 270}
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

export default PhoneCoverDesign;
