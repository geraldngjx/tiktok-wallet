import NumberTicker from "@/components/magicui/number-ticker";
import { Typography } from "@mui/material";
import Image from "next/image";

export default function Balance() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row gap-4 p-4 items-center">
          <div className="flex flex-col items-center">
            <Typography component="h1" variant="h5">
              My Balance
            </Typography>
            <Typography component="h1" variant="h2">
              $<NumberTicker value={300} direction="up" />
            </Typography>
          </div>
          <div className="h-fit w-fit">
            <Image
              src="/credit_card.png"
              alt="Credit Card"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
