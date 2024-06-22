import React, { useEffect, useState } from 'react';
import axios from 'axios';
import pic from '../../picturess/Boycott-Israel.webp';
import CurrentSituation from './CurrentSitutaion.jsx';
import DonateCard from './DonateCard.jsx';
import AimToAchieve from './AimToAchieve.jsx';
import ProductCard from './ProductCard.jsx';

const BarcodeReader = () => {
    const [quaggaLoaded, setQuaggaLoaded] = useState(false);
    const [productStatus, setProductStatus] = useState(null);
    const [scanning, setScanning] = useState(false); // State to manage scanning status

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/quagga/0.12.1/quagga.min.js';
        script.async = true;
        script.onload = () => setQuaggaLoaded(true);
        script.onerror = () => console.error('Failed to load QuaggaJS');
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const startLiveScanner = () => {
        if (!quaggaLoaded || !window.Quagga) {
            console.error('QuaggaJS library is not loaded.');
            return;
        }

        if (window.Quagga.CameraAccess.getActiveStreamLabel()) {
            console.log("Scanner is already running");
            return; // Prevent initializing Quagga again if it's already running
        }

        document.getElementById('interactive').style.display = 'block';
        setScanning(true); // Set scanning state to true
setProductStatus(null)
        window.Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#interactive'),
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment"
                },
                area: {
                    top: "10%",
                    right: "10%",
                    left: "10%",
                    bottom: "10%"
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: navigator.hardwareConcurrency,
            decoder: {
                readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader"]
            },
            locate: true
        }, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Initialization finished. Ready to start");
            window.Quagga.start();
        });

        window.Quagga.onProcessed(function (result) {
            var drawingCtx = window.Quagga.canvas.ctx.overlay,
                drawingCanvas = window.Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        window.Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                    });
                }

                if (result.box) {
                    window.Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
                }

                if (result.codeResult && result.codeResult.code) {
                    window.Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                }
            }
        });

        window.Quagga.onDetected(function (data) {
            document.getElementById('result').textContent = "Detected code: " + data.codeResult.code;
            window.Quagga.stop();
            document.getElementById('interactive').style.display = 'none';
            setScanning(false); // Set scanning state to false
            setProductStatus(null);
           console.log(data.codeResult.code)
            fetchProductDetails(data.codeResult.code);
        });
    }

    const handleFileSelect = (event) => {
        if (!quaggaLoaded || !window.Quagga) {
            console.error('QuaggaJS library is not loaded.');
            return;
        }
        setProductStatus(null);
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                window.Quagga.decodeSingle({
                    decoder: {
                        readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader"]
                    },
                    locate: true,
                    src: e.target.result
                }, function (result) {
                    if (result.codeResult) {
                        document.getElementById('result').textContent = "Decoded code: " + result.codeResult.code;
                        alert(`Product code: ${result.codeResult.code}`);
                        fetchProductDetails(result.codeResult.code);
                    } else {
                        setProductStatus('safe')
                        document.getElementById('result').textContent = "Barcode not found or unreadable.";
                    }
                });
            };

            reader.readAsDataURL(file);
        }
    }

    const fetchProductDetails = (barcode) => {
        console.error('Fetching product details for barcode:', barcode);
        const url = `https://www.searchupc.com/handlers/upcsearch.ashx?request_type=3&access_token=89252D0F-F00E-44D8-BE23-F3138319C97F&upc=${barcode}`;
        axios.get(url)
            .then(response => {
                const data = response.data;
                console.log(data);
                if (data && data[0] && data[0].productname) {
                    const productName = data[0].productname;
                    console.error("Product Against Barcode is", productName);
                    fetchProductStatus(productName);
                } else {
                    console.error('No product details found for barcode:', barcode, data);
                    setProductStatus('safe'); // No product details found
                }
            })
            .catch(error => {
                console.error('API Fetch Error:', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                }
                setProductStatus('safe'); // API fetch error
            });
    }
    

    const fetchProductStatus = (productName) => {
        axios.get(`/getProductByName/${productName}`)
            .then(response => {
                const productArray = response.data;
                if (Array.isArray(productArray) && productArray.length > 0) {
                    const product = productArray[0]; 
                    console.log("Barcode Status ", product.status);
                    console.log("Product Name ", product.name);
                    setProductStatus(product.status);
                } else {
                    console.error('Product not found in the response.');
                    setProductStatus('safe');
                }
            })
            .catch(error => {console.error('API Fetch Error:', error);

            setProductStatus('safe');
            })
    }

    const stopLiveScanner = () => {
        window.Quagga.stop();
        document.getElementById('interactive').style.display = 'none';
        setScanning(false); // Set scanning state to false
    }

    return (
        <>
            <div className="pt-10 bg-gray-100 sm:pt-16 lg:pt-24">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">Real humans are here to help you to Check Banned Products</h2>
                        {!scanning && (
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={startLiveScanner}
                                    className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                                >
                                    Open Camera
                                </button>
                            </>
                        )}
                        {scanning && (
                            <button
                                type="button"
                                onClick={stopLiveScanner}
                                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-red-600 border-2 border-red-600 rounded-md hover:bg-red-700 focus:bg-red-700 focus:outline-none"
                            >
                                Cancel Scanning
                            </button>
                        )}
                        {productStatus && productStatus === 'avoid' ? (
                            <div className="bg-red-500 text-white font-bold text-2xl px-1 py-4 rounded-full mt-3">
                               BoyCott
                            </div>
                        ) : (
                            productStatus && (
                                <div className="bg-green-500 text-white font-bold text-2xl px-1 py-4 rounded-full mt-3">
                                    Safe
                                </div>
                            )
                        )}
                    </div>
                </div>
             
                <div className="container mx-auto 2xl:px-12  my-5">
                <div id="interactive" style={{ display:'none' ,position: 'relative', width: '100%', height: 'auto', overflow: 'hidden' }}>
    <video autoPlay={true} preload="auto" src="" muted={true} playsInline={true} style={{ width: '100%' }}></video>
    <canvas className="drawingBuffer" width="412" height="309" style={{ position: 'absolute', top: '0', left: '0', width: '100%' }}></canvas>
    <canvas id="canvas" style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%' }}></canvas>
</div>


                    <ProductCard/>
                </div>
                
              
                <div id="result" className="text-center mt-4"></div>
            </div>

            <CurrentSituation/>
            <DonateCard/>
            <AimToAchieve/>
        </>
    );
}

export default BarcodeReader;
