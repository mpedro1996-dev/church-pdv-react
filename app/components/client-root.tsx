"use client";

import React, { use, useEffect, useState } from "react";
import Navbar from "./navbar";
import AxiosInterceptor from "./axios-interceptor";
import GlobalLoading from "./global-loading";
import { useTokenStore } from "../lib/zustand";
import Loading from "./loading";


interface Props {
    children: React.ReactNode;
    className: string;
}

export default function ClientRoot({ children, className }: Props) {

    const { token } = useTokenStore();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ready, setReady] = useState(false);



    useEffect(() => {

        setIsLoggedIn(token !== null);
        setReady(true);

    }, [token]);


    if (!ready) {
        return (
            <html>
                <body>
                    <div className="flex flex-col h-screen">
                        <Loading message={"Carregando..."} />
                    </div>
                </body>
            </html>
        );
    }



    return (
        <html>
            <body>

                <div className="flex flex-col h-screen">
                    {isLoggedIn && <Navbar />}
                    <AxiosInterceptor />
                    <GlobalLoading />
                    {children}
                </div>
            </body>
        </html>
    );
}
