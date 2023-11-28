import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";

export default function ProjectItem({ writer, title}) {
    
    
        return (
            <>
                <div className="group relative mx-auto gap-x-1 flex h-48 w-80 xl:h-48 xl:w-96 flex-col rounded-xl shadow-xl ring-gray-400 sm:mx-auto sm:max-w-lg bg-gray-600 cursor-pointer">
                <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <div className="flex">
                        <h1 className="md:text-xl text-md font-bold text-white bg-black bg-opacity-30 rounded-md ps-1 pr-1">{title}</h1>
                    </div>
                        <div className="flex items-start mt-1">
                        </div>
                        <div className="flex">
                            <h1 className="px-1 text-sm text-red-500 dark:text-red-500 font-bold mt-1 bg-black bg-opacity-30 rounded-md">{writer}</h1>
                        </div>
                    </div>
                </div>
            </>
        )
    }
