// js/llm.js
import { MOCK_HEALTH_DATA } from './data.js';

export async function generateDashboardLayout(userData, feedbackHistory, interestMap) {

// 1. Get Chart Keys
    const chartKeys = Object.keys(MOCK_HEALTH_DATA.charts);

    // 2. Define User Metric Keys (Must match HTML input names)
    const userMetricKeys = Object.keys(MOCK_HEALTH_DATA.user_stats); // Auto-binds to data

    // 3. Combine them for the AI
    const allAvailableData = [...userMetricKeys, ...chartKeys];


    const metricDescriptions = {
        "today_steps": "Daily step count",
        "today_resting_hr": "Resting heart rate (bpm)",
        "today_walking_hr": "Walking average heart rate",
        "today_hr_variability": "Heart rate variability (HRV)",
        "today_exercise_minutes": "Active exercise time",
        "today_time_sleep": "Sleep duration (hours)",
        "today_climbed_floor": "Floors climbed today",
        "today_breath_frequency": "Breathing rate (breaths/min)",
        "walking_speed": "Walking speed (km/h)",
        "stair_speed": "Stair climbing speed (floors/min)",
        "step_length": "Average step length (cm)",
        "today_asymmetric_walk": "Gait asymmetry score",
        "today_stand_up_time": "Stand hours completed",
        "vo2_max": "Cardio fitness level"
    };




    // Inside generateDashboardLayout
    const likes = new Set();
    const dislikes = new Set();
    if (feedbackHistory && Array.isArray(feedbackHistory)) {
        feedbackHistory.forEach(item => {
            if (item.type === 'widget_preference') {
                if (item.sentiment === 'like') likes.add(item.target_metric);
                if (item.sentiment === 'dislike') dislikes.add(item.target_metric);
            }
        });
    }
    const likedList = Array.from(likes).join(", ");
    const dislikedList = Array.from(dislikes).join(", ");
    let priorityContext = "";

    if (userData.layout && Array.isArray(userData.layout) && userData.layout.length > 0) {
        // 1. Get the top 3 items from their current screen
        const top3Widgets = userData.layout.slice(0, 3).map(w => w.dataSource);

        // 2. Create the prompt context
        priorityContext = `
        OBSERVED BEHAVIOR:
        - The user previously dragged these metrics to the TOP of their dashboard: [${top3Widgets.join(", ")}].
        - IMPLICIT PRIORITY: These are currently the most important metrics to the user.
        - ADAPTATION INSTRUCTION: You should keep these high-priority metrics near the top. You may change their visual style (e.g. from 'stat' to 'chart') to give more detail, but do not bury them.
        `;
    }

    const currentHour = new Date().getHours();
    let timePhase = "";
    let timeInstruction = "";

    if (currentHour >= 5 && currentHour < 11) {
        timePhase = "MORNING (Preparation Phase)";
        timeInstruction = "Focus on READINESS. Prioritize Sleep Quality, HRV, and Today's Goal. Hide 'Calories Burned' (too early).";
    }
    else if (currentHour >= 11 && currentHour < 18) {
        timePhase = "DAY (Active Phase)";
        timeInstruction = "Focus on ACTIVITY. Prioritize Steps, Stress Level, and Hydration. Keep it actionable.";
    }
    else {
        timePhase = "EVENING (Reflection Phase)";
        timeInstruction = "Focus on CLOSURE. Prioritize Daily Totals (Calories/Steps), Recovery Score, and Wind-down suggestions.";
    }

    let interestContext = "";
    if (interestMap && Object.keys(interestMap).length > 0) {
        const interestEntries = Object.entries(interestMap);

        // Sort by duration (Highest first)
        interestEntries.sort((a, b) => b[1] - a[1]);

        // Get the top 3 most "studied" widgets
        const highInterest = interestEntries.slice(0, 3).map(e => `${e[0]} (${Math.round(e[1]/1000)}s)`);

        // Get widgets with ZERO interaction (ignored)
        // (This assumes we passed the full list of rendered widgets,
        //  but for simplicity, let's just focus on what WAS hovered).

        interestContext = `
        OBSERVED MICRO-INTERACTIONS (Dwell Time):
        - The user spent the most time hovering over: [${highInterest.join(", ")}].
        - PSYCHOLOGICAL INTERPRETATION: The user is deeply investigating these metrics. 
        - ADAPTATION INSTRUCTION: These widgets should be expanded to 'wide' size or converted to detailed 'charts' to satisfy the user's need for detail. Do not simplify them.
        `;
    }

// Add ${promptAddon} to your systemPrompt string.
    const systemPrompt = `
        You are an expert UX Designer and health coach. Create the perfect dashboard layout based on the context below, the dashboard needs to have at least 10 elements.

        1. TEMPORAL CONTEXT (Critical):
        - Time of Day: ${timePhase}
        - Strategy: ${timeInstruction}
        
        2. BEHAVIORAL CONTEXT (Observed Actions):
        ${priorityContext || "- No drag-and-drop history available."}
        ${interestContext || "- No dwell/hover history available."}

        3. EXPLICIT FEEDBACK (User Voice):
        - LIKED Metrics (Must Include): [${likedList}]
        - DISLIKED Metrics (Must Remove): [${dislikedList}]

        4. USER PROFILE:
        - Goal: ${userData.goals}
        - Metrics: Weight ${userData.current_weight}kg (Target: ${userData.target_weight}kg)
        - Glasses: ${userData.glasses}
        - Complexity: ${userData.complexity}
        - Stress Level: ${userData.stress_level} 
        - Diet: ${userData.diet_focus}
        - UI Vibe: ${userData.ui_mood}
        - Preferred Data Style: ${userData.chart_pref}


        AVAILABLE DATA SOURCES: 
${Object.keys(metricDescriptions).map(key => `- ${key}: ${metricDescriptions[key]}`).join('\n')}

CHART DATA: ${JSON.stringify(Object.keys(MOCK_HEALTH_DATA.charts))}
⚠️ CRITICAL DATA SOURCE RULES:
- CHART WIDGETS require dataSource from: ${JSON.stringify(Object.keys(MOCK_HEALTH_DATA.charts))}
- STAT/GAUGE WIDGETS require dataSource from: ${JSON.stringify(Object.keys(MOCK_HEALTH_DATA.user_stats))}
- NEVER use type:"chart" with a user_stats dataSource (e.g., today_resting_hr)
- If showing today_steps, today_resting_hr, etc. → use type:"stat", NOT type:"chart"
        AVAILABLE WIDGET LIBRARY:
        - "stat": Simple Number + Trend.
        - "heatmap": Consistency grid (Best for streaks).
        - "gauge": Speedometer (Best for 0-100 scores).
        - "timeline": List of recent events.
        - "stacked_bar": Composition breakdown.
        - "radar": Multi-variable balance.
        - "chart": Line/Bar graphs.

        INSTRUCTIONS:
        1. Prioritize metrics based on BEHAVIORAL CONTEXT first, then TEMPORAL CONTEXT.
        2. Strictly obey EXPLICIT FEEDBACK (Remove dislikes, Highlight likes).
        3. If Goal is 'Weight Loss', ALWAYS show weight stats.
        4. Generate a 'Smart Suggestion' specific to the ${timePhase}.

        OUTPUT JSON SCHEMA:
        {
            "suggestion": {
                "text": "Short, punchy action phrase",
                "nudge": "Scientific, behavioral explanation of WHY this action helps.",
                "explainability": "Meta-explanation: 'I chose this layout because... '" 
            },
            "layout": [
                {
                    "type": "stat|heatmap|gauge|timeline|stacked_bar|radar|chart",
                    "title": "String",
                    "size": "normal|wide",
                    "dataSource": "key_from_data_sources",
                    "chartType": "bar|line"
                }
            ]
        }
    `;

    console.group("🤖 LLM PROMPT DEBUG");
    console.log("sending to model:", "gpt-5-mini-2025-08-07");
    console.log(systemPrompt);
    console.groupEnd();
    try {
        // Call YOUR backend instead of OpenAI directly
        const response = await fetch('http://localhost:3001/api/generate-layout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-5-mini-2025-08-07",
                messages: [{ role: "system", content: systemPrompt }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ API ERROR:", data);
            alert(`API Error: ${data.error?.message || 'Unknown error'}`);
            return { layout: [], suggestion: {} };
        }

        let content = data.choices[0].message.content;

// Remove markdown code blocks if present
        content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

// Try to parse
        try {
            return JSON.parse(content);
        } catch (parseError) {
            console.error("❌ JSON Parse Error:", parseError);
            console.error("Raw content:", content);
            alert("AI returned invalid JSON. Check console for details.");
            return {
                layout: [],
                suggestion: {
                    text: "Error generating suggestion",
                    nudge: "",
                    explainability: ""
                }
            };
        }


    } catch (error) {
        console.error("❌ ERROR:", error);
        alert("Failed to connect. Check console.");
        return { layout: [], suggestion: {} };
    }
}
export async function generateHealthReport(userData, healthData) {
    const systemPrompt = `
You are an expert health analyst and wellness coach. Generate a comprehensive health report.

USER PROFILE:
- Name: ${userData.username}
- Age: ${userData.age}, Gender: ${userData.gender}
- Goal: ${userData.goals}
- Current Weight: ${userData.current_weight}kg (Target: ${userData.target_weight}kg)
- Stress: ${userData.stress_level}, Diet: ${userData.diet_focus}

CURRENT HEALTH METRICS:
${Object.entries(healthData.user_stats).map(([key, data]) =>
        `- ${key}: ${data.value} ${data.unit}`
    ).join('\n')}

WEEKLY TRENDS:
- Steps: ${JSON.stringify(healthData.charts.steps_weekly.values)}
- Sleep: ${JSON.stringify(healthData.charts.sleep_weekly.values)}

OUTPUT JSON:
{
    "summary": "2-3 sentence health overview",
    "key_metrics": [
        {
            "metric": "Metric name",
            "value": "Current value with unit",
            "status": "excellent|good|needs_attention|concerning",
            "insight": "What this means"
        }
    ],
    "recommendations": [
        {
            "title": "Action title",
            "description": "Detailed recommendation",
            "priority": "high|medium|low",
            "impact": "Expected improvement"
        }
    ],
    "explainability": {
        "methodology": "How you analyzed",
        "focus_areas": "Why prioritized",
        "personalization": "How tailored"
    }
}`;

    const response = await fetch('http://localhost:3001/api/generate-layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: systemPrompt }],
            temperature: 0.7
        })
    });

    const data = await response.json();
    let content = data.choices[0].message.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(content);
}

