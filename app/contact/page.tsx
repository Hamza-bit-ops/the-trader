"use client";

import Lottie from "lottie-react";
import animationData from "../../public/particle_wave (1).json";

export default function Contact() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-[600px]">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </main>
  );
}
