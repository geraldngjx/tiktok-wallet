import Image from "next/image";

export default function Balance() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row gap-4 p-4 items-center">
          <div className="flex flex-col items-center">
            <h1>My Balance</h1>
            <h1>$300</h1>
          </div>
          <div className="h-fit w-fit">
            <Image
              src="/credit_card.png"
              alt="Credit Card"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
