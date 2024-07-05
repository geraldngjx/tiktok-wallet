"use client";

import { withAuthMagic } from "@/lib/hoc/withAuth";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import qrFrame from "./qr-frame.svg";
import Image from "next/image";
import "./QrStyles.css";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import dayjs from "dayjs";

function Page() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const scannerRef = useRef<QrScanner>();
    const qrBoxRef = useRef<HTMLDivElement>(null);
    const [qrOn, setQrOn] = useState<boolean>(true);

    const { toast } = useToast();

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
        if (!scannedResult) {
            return;
        }

        const received = new URLSearchParams(decodeURIComponent(scannedResult!));

        if (received.has("byteSecure") && received.get("byteSecure") === "true" && received.has("email") && received.get("email") !== "undefined") {
            const time = received.get("time");

            if (dayjs().diff(dayjs(parseInt(time!)), "minute") > 10) {
                toast({
                    title: "QR code has expired",
                    style: {
                        top: "50px",
                    },
                });

                return;
            }

            router.push(`/wallet/transfer?${received.toString()}`);
        } else {
            toast({
                title: "Invalid Tiktok Wallet Payment QR code",
                style: {
                    top: "50px",
                },
            });
        }
    }, [router, scannedResult, toast]);

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
