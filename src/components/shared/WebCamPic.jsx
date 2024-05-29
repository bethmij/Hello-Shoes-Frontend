import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button.jsx";
import PropTypes from "prop-types";

export function WebCamPic(props) {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        props.setImg(imageSrc);
        setIsCameraOn(false);
    }, [webcamRef, props]);

    const retake = () => {
        setImgSrc(null);
        setIsCameraOn(true);
    };

    const startCamera = () => {
        setIsCameraOn(true);
    };

    useEffect(() => {
        if (props.resetForm) {
            setImgSrc(null);
            setIsCameraOn(false);
        }
    }, [props.resetForm]);

    return (
        <div className="w-full h-full flex flex-col mb-20 items-center">
            {imgSrc ? (
                <img src={imgSrc} alt="webcam" />
            ) : (
                isCameraOn && <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
            )}
            <div className="mt-5">
                {imgSrc ? (
                    <Button type="button" onClick={retake}>Retake photo</Button>
                ) : (
                    <Button type="button" onClick={isCameraOn ? capture : startCamera}>
                        {isCameraOn ? "Capture photo" : "Start Camera"}
                    </Button>
                )}
            </div>
        </div>
    );
}

WebCamPic.propTypes = {
    setImg: PropTypes.func.isRequired,
    resetForm: PropTypes.bool,
};
