import React, { useState, useRef, useCallback } from 'react';
import { generateReactHelpers, useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { TbCapture } from "react-icons/tb";
import { FaCamera } from "react-icons/fa";
import { GoFileMedia } from "react-icons/go";
import { MdCameraFront, MdCameraRear } from "react-icons/md";
import Image from 'next/image';

interface BoutonCameraProps {
  setImage: (url: string) => void; 
}

export type OurFileRouter = typeof ourFileRouter;

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

const BoutonCamera: React.FC<BoutonCameraProps> = ({ setImage }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const CaptureRef =useRef<HTMLButtonElement>(null);
  
  const { permittedFileInfo, startUpload } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (res) => {
        console.log("Upload completed:", res);
        setImage(res[0].url);
      },
      onUploadError: (error) => {
        console.error("Error occurred while uploading:", error);
      },
      onUploadBegin: () => {
        console.log("Upload has begun");
      }
    }
  );

  const fileTypes = permittedFileInfo?.config ? Object.keys(permittedFileInfo?.config) : [];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const openCamera = () => {
    setIsCameraOpen(true);
    startCamera();
      if (CaptureRef.current) {
        CaptureRef.current.focus();
      }
  };

  const startCamera = () => {
    const constraints = {
      video: { facingMode: isFrontCamera ? "user" : "environment" }
    };
    
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });
  };

  const switchCamera = () => {
    setIsFrontCamera(!isFrontCamera);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    startCamera();
  };

  const captureImage = async (e:React.MouseEvent<HTMLButtonElement>) => {

    const CaptureButton =e.currentTarget;


    CaptureButton.classList.add('capture');
    
    requestAnimationFrame(()=>{
      if (CaptureButton) {
        setTimeout(()=>{
          CaptureButton.classList.remove('capture')
        }, 300);
      }
    })



    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b)));
      
      if (blob) {
        const file = new File([blob], 'captured-image.png', { type: 'image/png' });
        startUpload([file]);
        setImage(URL.createObjectURL(blob));
      }
    }

   
    // setIsCameraOpen(false);
  };

  // const captureEffect= (e:React.MouseEvent.<HTMLButtonElement>)=>{
  //   e.currentTarget.classList.add('capture');

  // }



  return (
    <div>
      <button onClick={openCamera} className='hover:scale-75 border border-dashed border-white transition rounded-md w-16 h-16 focus:scale-75' style={{
        backgroundImage:`url('/digital-camera.png')`,
        backgroundSize:'contain',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat'
      }} > 
      
      camera 
      
      {/* <Image src="/digital-camera.png" alt='camer-icon' width={40} height={40} /> */}
      
       </button>

      {isCameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-indigo-200 p-4 rounded-lg">
            <video ref={videoRef} style={{ width: '100%', maxWidth: '500px' }}></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <div className="mt-4 flex justify-between">
              <button onClick={switchCamera}>
                {isFrontCamera ? <MdCameraRear /> : <MdCameraFront />}
              </button>
              <button ref={CaptureRef} onClick={captureImage} className='inline-grid place-items-center focus:shadow-sm '><TbCapture /> Take Shot</button>
              <button onClick={() => setIsCameraOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
      <div {...getRootProps()} className='hidden'>
        <input {...getInputProps()} />
        <div >
          {files.length > 0 && (
            <button onClick={() => startUpload(files)}>
              Upload {files.length} files
            </button>
          )}
        </div>
        Drop files here!
        <GoFileMedia />
      </div>
    </div>
  );
};

export default BoutonCamera;