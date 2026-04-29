// js/data_tyler.js
// Persona: Tyler, 22, computer science student.
// Irregular sleep, late nights, bursts of activity (gym, cycling), high screen time.

export const MOCK_HEALTH_DATA = {

    // --- SECTION A: SIMULATED SENSOR DATA ---
    user_stats: {
        vo2_max: { value: 49, unit: "ml/kg/min" },
        today_steps: { value: 7650, unit: "steps" },
        today_stand_up_time: { value: 4, unit: "hours" },
        today_resting_hr: { value: 62, unit: "bpm" },
        today_asymmetric_walk: { value: 0.38, unit: "%" },
        step_length: { value: 80, unit: "cm" },
        today_walking_hr: { value: 88, unit: "bpm" },
        today_exercise_minutes: { value: 55, unit: "min" },
        today_time_sleep: { value: 5.90, unit: "hrs" },
        today_hr_variability: { value: 82, unit: "ms" },
        walking_speed: { value: 5.8, unit: "km/h" },
        stair_speed: { value: 0.70, unit: "floors/min" },
        today_climbed_floor: { value: 11, unit: "floors" },
        today_breath_frequency: { value: 15, unit: "breaths/min" }
    },

    charts: {
        steps_weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [3200, 12100, 4500, 7650, 14500, 11200, 2800],
            unit: "steps",
            color: "#4BC0C0"
        },
        sleep_weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [4.5, 6.0, 3.8, 5.9, 4.2, 9.5, 10.0],
            unit: "hours",
            color: "#9966FF"
        },
        heart_rate_daily: {
            labels: [
                "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
                "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
                "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
                "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
                "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
                "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
            ],
            values: [
                72, 71, 70, 70, 69, 68, 68, 67,
                66, 65, 64, 63, 62, 62, 63, 65,
                68, 70, 72, 74, 75, 76, 76, 75,
                74, 73, 72, 71, 70, 152, 165, 160,
                148, 132, 110, 88, 75, 72, 70, 69,
                76, 80, 84, 88, 90, 88, 82, 76
            ],
            unit: "bpm",
            color: "#FF6384"
        },
        calories_burned: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [1900, 2800, 1750, 2300, 2950, 2600, 1600],
            unit: "kcal",
            color: "#FF9F40"
        },
        weight_trend: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            values: [74.0, 74.5, 73.8, 74.2, 74.6, 73.9, 74.3, 74.0, 73.7, 73.5],
            unit: "kg",
            color: "#36A2EB"
        },
        sleep_quality_breakdown: {
            labels: ["Deep", "REM", "Light", "Awake"],
            values: [1.0, 1.8, 2.6, 0.5],
            colors: ["#2c3e50", "#8e44ad", "#3498db", "#ecf0f1"],
            unit: "hrs"
        },
        recent_activities: [
            { icon: "💪", title: "Gym — Chest Day", time: "02:00 PM", detail: "55 mins, 8 sets" },
            { icon: "🍕", title: "Dinner", time: "07:30 PM", detail: "1100 kcal - Takeaway" },
            { icon: "🎮", title: "Gaming Session", time: "09:00 PM", detail: "Sedentary 3hrs" },
            { icon: "🌙", title: "Late Study", time: "01:00 AM", detail: "Screen time 2hrs" }
        ],
        stress_hourly: {
            labels: ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"],
            values: [20, 30, 25, 35, 30, 40, 55, 65],
            unit: "stress lvl",
            color: "#FF9F40"
        },
        anxiety_heatmap: {
            values: [0,1,1,2,1,1,0, 1,1,2,3,2,1,0, 0,1,1,2,1,1,1, 2,2,2,1,1,0,0, 1,0],
            unit: "lvl",
            color: "#f44336"
        }
    }
};
