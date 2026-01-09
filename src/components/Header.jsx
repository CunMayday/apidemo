import React from 'react';

export default function Header() {
    return (
        <header className="bg-purdue-black text-white p-4 shadow-md border-b-4 border-purdue-campusGold">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-purdue-campusGold text-purdue-black font-bold p-2 rounded">
                        API Demo
                    </div>
                    <h1 className="text-xl font-bold tracking-wide">
                        OpenAI & Gemini Showcase
                    </h1>
                </div>
            </div>
        </header>
    );
}
