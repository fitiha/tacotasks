"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Player
        autoplay
        loop
        src="/lottie/404-animation.json"
        className="w-96 h-96"
      />

      <h1 className="text-4xl font-bold mt-6">404 - Page Not Found</h1>
      <p className="text-muted-foreground mt-2 text-center">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>

      {/* Back to Home Button */}
      <Link href="/">
        <Button className="mt-6 hover:bg-violet-700 hover:text-white" variant="outline">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
