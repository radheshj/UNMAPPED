        //SKILL MAPPING LOGIC

import { APP_STATE } from './config.js';


export async function processSkillSignal(skillInput) {
    if (!skillInput) {
        return { status: "error", message: "Please enter a skill." };
    }

    try {
        const response = await fetch(`${APP_STATE.serverUrl}/map-signal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill: skillInput })
        });
        
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Signal Engine Error:", error);
        return { 
            status: "offline", 
            message: "Backend connection lost. Ensure your app.py server is running." 
        };
    }
}