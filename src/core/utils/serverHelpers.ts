import 'server-only'

// Next Imports
import { cookies } from "next/headers";

// Type Imports
import { Settings } from '../contexts/settingsContext';
import { SystemMode } from '../types';

// Config imports 
import themeConfig from '@/configs/themeConfig';
import { cp } from 'fs';

export const getSettingsFromCookie = (): Settings => {
    const cookieStore = cookies()

    const cookieName = themeConfig.settingsCookieName

    return JSON.parse(cookieStore.get(cookieName)?.value || '{}')
}

export const getMode = () => {
    const settingsCookie = getSettingsFromCookie()

    //Get Mode from cookie or fallback to theme config
    const _mode =  settingsCookie.mode || themeConfig.mode

    return _mode
}

export const getSystemMode = (): SystemMode => {
    const mode = getMode()

    return mode
}

export const getServerMode = () => {
    const mode = getMode()
  
    return mode
  }