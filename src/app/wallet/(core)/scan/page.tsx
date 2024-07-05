"use client";

import { withAuthMagic } from "@/lib/hoc/withAuth";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import qrFrame from "./qr-frame.svg";
import Image from "next/image";
import "./QrStyles.css";
import { useRouter } from "next/navigation";

function Page() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const scannerRef = useRef<QrScanner>();
    const qrBoxRef = useRef<HTMLDivElement>(null);
    const [qrOn, setQrOn] = useState<boolean>(true);

    const [scannedResult, setScannedResult] = useState<string | undefined>("");

    const router = useRouter();

    const onScanSuccess = (result: QrScanner.ScanResult) => {
        setScannedResult(result?.data);
    };

    const onScanFail = (err: string | Error) => {
        // console.log(err);
    };

    useEffect(() => {
        const tempVideoRef = videoRef.current;

        if (videoRef?.current && !scannerRef.current) {
            scannerRef.current = new QrScanner(videoRef?.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,
                overlay: qrBoxRef?.current || undefined,
            });

            scannerRef?.current
                ?.start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    if (err) setQrOn(false);
                });
        }

        return () => {
            if (!tempVideoRef) {
                scannerRef?.current?.stop();
            }
        };
    }, []);

    useEffect(() => {
        const decoded = scannedResult?.split("&")[0].split("=");
        if (!decoded) return;

        if (decoded[0] === "byteSecure" && decoded[1] === "true") {
            router.push(`/wallet/transfer?${scannedResult!}`);
        }
    }, [router, scannedResult]);

    return (
        <div className="qr-reader">
            <video ref={videoRef}></video>

            <div ref={qrBoxRef} className="qr-box">
                <Image src={qrFrame} alt="Qr Frame" width={256} height={256} className="qr-frame" />
            </div>
        </div>
    );
}

export default withAuthMagic(Page);
