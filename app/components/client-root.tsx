"use client";

import React from "react";
import Navbar from "./navbar";
import AxiosInterceptor from "./axios-interceptor";
import GlobalLoading from "./global-loading";
import { useTokenStore } from "../lib/zustand";

interface Props {
    children: React.ReactNode;
    className: string;
}

export default function ClientRoot({ children, className }: Props) {

    const { token } = useTokenStore();
    const isLoggedIn = token !== null;

    return (
        <html>
            <body>
                {isLoggedIn && <Navbar />}
                <div className="flex flex-col h-screen">
                    <AxiosInterceptor />
                    <GlobalLoading />
                    <div className="flex-1">{children}</div>
                </div>
            </body>
        </html>
    );
}
