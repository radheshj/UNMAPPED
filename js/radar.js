        //AI RESILIENCE RADAR LOGIC

import { APP_STATE } from './config.js';


export async function fetchContextData(countryContext) {
    if (!countryContext) {
        return { status: "error", message: "Context required." };
    }

    try {
        const response = await fetch(`${APP_STATE.serverUrl}/fetch-global-signals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: countryContext })
        });
        
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Radar/Pulse Error:", error);
        return { 
            status: "offline", 
            message: "Unable to fetch live econometric signals. Ensure app.py is running." 
        };
    }
}