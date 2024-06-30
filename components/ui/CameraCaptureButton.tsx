import React, { useState, useRef } from 'react';
import { generateReactHelpers } from "@uploadthing/react";

import { auth } from "@clerk/nextjs";
import { UploadThingError } from "uploadthing/server";
import { ourFileRouter } from '@/app/api/uploadthing/core';

interface CameraCaptureButtonProps {
  setImage: (url: string) => void;
}

export type OurFileRouter = typeof ourFileRouter; 

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

const CameraCaptureButton: React.FC<CameraCaptureButtonProps> = ({ setImage }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { startUpload } = useUploadThing(
    "imageUploader", // Utilisez votre endpoint personnalisé ici
    {
      onClientUploadComplete: (res) => {
        console.log("Upload completed:", res);
        setImage(res[0].url); // Mettez à jour l'image avec l'URL du fichier uploadé
      },
      onUploadError: (error) => {
        console.error("Error occurred while uploading:", error);
      },
      onUploadBegin: () => {
        console.log("Upload has begun");
      }
    }
  );

  const openCamera = () => {
    setIsCameraOpen(true);
    navigator.mediaDevices.getUserMedia({ video: true })
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

  const captureImage = async () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b)));
      
      if (blob) {
        const file = new File([blob], 'captured-image.png', { type: 'image/png' });
        
        // Récupérer userId
        const { userId } = auth();

        if (!userId) {
          throw new UploadThingError("Please log in");
        }

        startUpload([file]);

        setImage(URL.createObjectURL(blob));
      }
    }
  };

  return (
    <div>
      <button onClick={openCamera}>Ouvrir la caméra</button>
      {isCameraOpen && (
        <div>
          <video ref={videoRef} style={{ display: isCameraOpen ? 'block' : 'none' }}></video>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          <button onClick={captureImage}>Capturer l'image</button>
        </div>
      )}
    </div>
  );
};

export default CameraCaptureButton;
