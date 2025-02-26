import {createContext} from 'react'
import type {IMockData} from '../mockData'
import * as React from "react";

export const ConfigContext = createContext<{
    config: IMockData,
    setConfig: React.Dispatch<React.SetStateAction<IMockData>>
} | null>(null)
