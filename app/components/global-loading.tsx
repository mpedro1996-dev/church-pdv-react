"use client";

import Loading from "./loading";
import { useUiStore } from "../lib/zustand";

export default function GlobalLoading() {
    const { loading, message } = useUiStore((s) => ({ loading: s.loading, message: s.message }));

    if (!loading) return null;

    return <Loading message={message ?? "Carregando..."} />;
}
