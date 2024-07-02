import { LoginProps } from "@/utils/types";

import EmailOTP from "./email-otp";

export default function Login({ token, setToken }: LoginProps) {
    return (
        <div className="login-page w-full h-fit">
            <div className={`max-w-[100%] grid grid-cols-1 grid-flow-row auto-rows-fr gap-5 p-4 mt-8`}>
                <EmailOTP token={token} setToken={setToken} />
            </div>
        </div>
    );
}
