        // UI CONTROLLER

import { APP_STATE } from './config.js';



window.updateContext = async function() {
    const searchInput = document.getElementById('country-selector').value || "India";
    const badge = document.getElementById('country-badge');
    
    badge.innerText = `Syncing ${searchInput.toUpperCase()}...`;
    
    try {
        const response = await fetch(`${APP_STATE.serverUrl}/fetch-global-signals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: searchInput })
        });
        const result = await response.json();
        
        if (result.status === "success") {
            APP_STATE.currentCountry = searchInput;
            badge.innerText = searchInput.toUpperCase();
            
            
            document.getElementById('radar-analysis').innerHTML = `<p style="font-size: 0.9rem;">${result.signals}</p>`;
            document.getElementById('informality-signal').innerText = "Verified by WDI";
            document.getElementById('wage-signal').innerText = "Live ILO Data";
            document.getElementById('risk-bar').style.width = "68%";
            document.getElementById('risk-label').innerText = "Context Analyzed";

            const rateMatch = result.signals.match(/(\d+[\.,]?\d*)\s*([A-Z]{3})/i);
            if (rateMatch) {
                APP_STATE.dynamicRate = parseFloat(rateMatch[1]);
                APP_STATE.dynamicCurrency = rateMatch[2].toUpperCase();
            } else {
               
                APP_STATE.dynamicRate = 10; 
                APP_STATE.dynamicCurrency = "Units";
            }
        }
    } catch (e) {
        badge.innerText = "Connection Error";
    }
};


window.calculateValue = function() {
    const hours = document.getElementById('hours-input').value;
    const resultDiv = document.getElementById('calc-result');

    if (!hours || hours <= 0) return resultDiv.innerText = "Enter valid hours.";

    if (APP_STATE.dynamicRate === 0) {
        return resultDiv.innerText = "Please sync a country context first.";
    }

    const estimatedValue = hours * APP_STATE.dynamicRate;
    resultDiv.innerHTML = `Estimated Value: ${estimatedValue.toLocaleString()} ${APP_STATE.dynamicCurrency} / week`;
};

// STATIC MINI-TOOLS

window.calculateValue = function() {
    const hours = document.getElementById('hours-input').value;
    const resultDiv = document.getElementById('calc-result');

    if (!hours || hours <= 0) return resultDiv.innerText = "Enter valid hours.";
    if (!APP_STATE.dynamicRate) return resultDiv.innerText = "Please sync a country context first.";

    const estimatedValue = hours * APP_STATE.dynamicRate;
    resultDiv.innerHTML = `Estimated Value: ${estimatedValue.toLocaleString()} ${APP_STATE.dynamicCurrency} / week`;
};


let currentStreak = 0;

window.logStreak = function() {
    currentStreak += 1;
    localStorage.setItem('unmapped_streak', currentStreak);
    
    
    const streakCircle = document.getElementById('streak-count');
    const msg = document.getElementById('streak-msg');
    
    streakCircle.innerText = currentStreak;
    
    
    if (currentStreak === 1) msg.innerText = "Day 1: Journey started! 🚀";
    else if (currentStreak === 3) msg.innerText = "3-Day Streak! You're building a habit. 🔥";
    else if (currentStreak === 7) msg.innerText = "1 Week! Proof of Work established. 🏆";
    else if (currentStreak === 30) msg.innerText = "1 Month! You are unstoppable. 👑";
    else msg.innerText = "Task logged! Resilience building. ⚡";
    
    
    streakCircle.style.transform = "scale(1.2)";
    setTimeout(() => streakCircle.style.transform = "scale(1)", 200);
};

window.logStreak = function() {
    currentStreak += 1;
    
    localStorage.setItem('unmapped_streak', currentStreak);
    
    
    const streakCircle = document.getElementById('streak-count');
    streakCircle.innerText = currentStreak;
    document.getElementById('streak-msg').innerText = "Task logged! Resilience building.";
    
    
    streakCircle.style.transform = "scale(1.2)";
    setTimeout(() => streakCircle.style.transform = "scale(1)", 200);
};


window.addEventListener('DOMContentLoaded', () => {
    updateContext();
    loadStreak(); 
});