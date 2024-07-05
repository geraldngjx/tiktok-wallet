"use client";

import { withAuthMagic } from "@/lib/hoc/withAuth";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import qrFrame from "../../../../../public/qr-frame.svg";
import Image from "next/image";
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
        <div className="relative w-[430px] h-screen my-0 mx-auto sm:w-full">
            <video ref={videoRef} className="h-full w-full object-cover" />

            <div ref={qrBoxRef} className="!w-full !left-0">
                <Image
                    src={qrFrame}
                    alt="Qr Frame"
                    width={256}
                    height={256}
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 fill-none"
                />
            </div>
        </div>
    );
}

export default withAuthMagic(Page);
