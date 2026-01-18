'use client';

import NavMenu from "@/app/components/admin/navmenu";

export default function Ministries() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <aside className="w-72 flex flex-col border rounded m-1">
                    <NavMenu selected="ministries" />
                </aside>
                <main className="flex-1 flex flex-col border rounded m-1">
                    <h1>Ministérios</h1>
                </main>
            </div>
        </div>
    );
}