import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../Heading.jsx";
import "./hero.css";
import { FaBarcode } from "react-icons/fa6";
import { HiSearch } from "react-icons/hi";
import { BsUpload } from "react-icons/bs";
import Card from "./Card.js";
import { red } from "@mui/material/colors";

const Hero = () => {
  const [quaggaLoaded, setQuaggaLoaded] = useState(false);
  const [productStatus, setProductStatus] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [propData, setPropData] = useState();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/quagga/0.12.1/quagga.min.js";
    script.async = true;
    script.onload = () => setQuaggaLoaded(true);
    script.onerror = () => console.error("Failed to load QuaggaJS");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const startLiveScanner = () => {
    if (!quaggaLoaded || !window.Quagga) {
      console.error("QuaggaJS library is not loaded.");
      return;
    }

    if (window.Quagga.CameraAccess.getActiveStreamLabel()) {
      console.log("Scanner is already running");
      return;
    }

    document.getElementById("interactive").style.display = "block";
    setPropData("");
    setScanning(true);
    setProductStatus(null);

    window.Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#interactive"),
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment",
          },
          area: {
            top: "10%",
            right: "10%",
            left: "10%",
            bottom: "10%",
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: navigator.hardwareConcurrency,
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "upc_reader",
            "upc_e_reader",
          ],
        },
        locate: true,
      },
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        window.Quagga.start();
      }
    );

    window.Quagga.onProcessed(function (result) {
      var drawingCtx = window.Quagga.canvas.ctx.overlay,
        drawingCanvas = window.Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              window.Quagga.ImageDebug.drawPath(
                box,
                { x: 0, y: 1 },
                drawingCtx,
                { color: "green", lineWidth: 2 }
              );
            });
        }

        if (result.box) {
          window.Quagga.ImageDebug.drawPath(
            result.box,
            { x: 0, y: 1 },
            drawingCtx,
            { color: "#00F", lineWidth: 2 }
          );
        }

        if (result.codeResult && result.codeResult.code) {
          window.Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });

    window.Quagga.onDetected(function (data) {
      document.getElementById("result").textContent =
        "Detected code: " + data.codeResult.code;
      window.Quagga.stop();
      document.getElementById("interactive").style.display = "none";
      setScanning(false);

      setProductStatus(null);
      console.log(data.codeResult.code);
      fetchProductDetails(data.codeResult.code);
    });
  };

  const handleFileSelect = (event) => {
    if (!quaggaLoaded || !window.Quagga) {
      console.error("QuaggaJS library is not loaded.");
      return;
    }
    setProductStatus(null);
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        window.Quagga.decodeSingle(
          {
            decoder: {
              readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "upc_reader",
                "upc_e_reader",
              ],
            },
            locate: true,
            src: e.target.result,
          },
          function (result) {
            if (result.codeResult) {
              document.getElementById("result").textContent =
                "Decoded code: " + result.codeResult.code;
              alert(`Product code: ${result.codeResult.code}`);
              fetchProductDetails(result.codeResult.code);
            } else {
              setProductStatus("not found");
              document.getElementById("result").textContent =
                "Barcode not found or unreadable.";
            }
          }
        );
      };

      reader.readAsDataURL(file);
    }
  };

  const fetchProductDetails = (barcode) => {
    console.error("Fetching product details for barcode:", barcode);
    const url = `https://www.searchupc.com/handlers/upcsearch.ashx?request_type=3&access_token=89252D0F-F00E-44D8-BE23-F3138319C97F&upc=${barcode}`;
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data && data[0] && data[0].productname) {
          const productName = data[0].productname;
          console.error("Product Against Barcode is", productName);
          fetchProductStatus(productName);
        } else {
          console.error("No product details found for barcode:", barcode, data);
          setProductStatus("not found");
        }
      })
      .catch((error) => {
        console.error("API Fetch Error:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
        setProductStatus("not found");
      });
  };

  const fetchProductStatus = (productName) => {
    axios
      .get(`/getProductByName/${productName}`)
      .then((response) => {
        const productArray = response.data;
        if (Array.isArray(productArray) && productArray.length > 0) {
          const data = productArray[0];
          setPropData(data);
          console.log("Barcode Status ", data.status);
          console.log("Product Name ", data.name);
          setProductStatus(data.status);
        } else {
          console.error("Product not found in the response.");
          setProductStatus("not found");
        }
      })
      .catch((error) => {
        console.error("API Fetch Error:", error);
        setProductStatus("not found");
      });
  };

  const stopLiveScanner = () => {
    window.Quagga.stop();
    document.getElementById("interactive").style.display = "none";
    setScanning(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPropData("");
    if (searchQuery.trim() === "") return;
    fetchProductStatus(searchQuery);
  };

  return (
    <section className="hero">
      <div className="container ">
        <h1 className="text-center font-bold ">   
         Boycott!!!</h1>
         <p className="text-center font-bold  text-white">
          Search for the boycotted brands or products</p>
        
     
        <form className="flex flex-wrap" onSubmit={handleSearchSubmit}>
          <div className="box search-box">
            <input
              type="text"
              placeholder="Search Product By Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md"
            />
            <button className="btn1 search-btn" type="submit">
              <HiSearch />
            </button>
          </div>
          <div className="upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
            />
          </div>
          <h5 className="or-text">OR</h5>
          <div className="scan-box">
            {!scanning ? (
              <button className="btn2" type="button" onClick={startLiveScanner}>
                <FaBarcode />
                <span className="ml-2">Scan Barcode</span>
              </button>
            ) : (
              <button
                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-red-600 border-2 border-red-600 rounded-md hover:bg-red-700 focus:bg-red-700 focus:outline-none"
                type="button"
                onClick={stopLiveScanner}
              >
                Cancel Scanning
              </button>
            )}
          </div>
        </form>
        {propData ? (
          <Card
            key={propData._id}
            productID={propData._id}
            thumbnail={propData.logo}
            category={propData.categories.join(", ")}
            title={propData.name}
            description={propData.description}
            status={propData.status}
            reasons={propData.reasons}
            countries={propData.countries}
            alternatives={propData.alternatives}
          />
        ) : (
          productStatus === "not found" && (
            <div className="text-center mt-24 text-red-600 text-4xl ">
              Product not found.
            </div>
          )
        )}
        <div className="container mx-auto 2xl:px-12 my-5">
          <div
            id="interactive"
            style={{
              display: "none",
              position: "fixed",
              top: "35%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              height: "70vh",
              zIndex: 1,
              background: "rgba(0, 0, 0, 0.75)",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <button
            style={{
              zIndex: 1000,
            }}
              className="cancel-button"
              type="button"
              onClick={stopLiveScanner}
            >
              Cancel Scanning
            </button>
            <video
              autoPlay={true}
              preload="auto"
              src=""
              muted={true}
              playsInline={true}
              style={{ width: "100%", borderRadius: "10px" }}
            ></video>
            <canvas
              className="drawingBuffer"
              width="412"
              height="309"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                zIndex:-1,
              }}
            ></canvas>
            <canvas
              id="canvas"
              style={{
                position: "absolute",
                zIndex:-1,
              }}
            ></canvas>
          </div>
        </div>
        <div id="result" className="text-center mt-4"></div>
      </div>
    </section>
  );
};

export default Hero;
