// js/data_james.js
// Persona: James, 67, retired teacher. Walks daily, does light gardening.
// Age-appropriate metrics, manages mild hypertension, good for his age.

export const MOCK_HEALTH_DATA = {

    // --- SECTION A: SIMULATED SENSOR DATA ---
    user_stats: {
        vo2_max: { value: 29, unit: "ml/kg/min" },
        today_steps: { value: 7215, unit: "steps" },
        today_stand_up_time: { value: 5, unit: "hours" },
        today_resting_hr: { value: 71, unit: "bpm" },
        today_asymmetric_walk: { value: 1.85, unit: "%" },
        step_length: { value: 55, unit: "cm" },
        today_walking_hr: { value: 98, unit: "bpm" },
        today_exercise_minutes: { value: 42, unit: "min" },
        today_time_sleep: { value: 6.80, unit: "hrs" },
        today_hr_variability: { value: 28, unit: "ms" },
        walking_speed: { value: 3.8, unit: "km/h" },
        stair_speed: { value: 0.22, unit: "floors/min" },
        today_climbed_floor: { value: 4, unit: "floors" },
        today_breath_frequency: { value: 17, unit: "breaths/min" }
    },

    charts: {
        steps_weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [6800, 7500, 8100, 5200, 7215, 9800, 4100],
            unit: "steps",
            color: "#4BC0C0"
        },
        sleep_weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [6.2, 7.0, 6.5, 7.2, 6.8, 7.5, 6.0],
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
                62, 61, 61, 60, 60, 59, 59, 60,
                61, 63, 66, 68, 70, 72, 74, 76,
                78, 80, 82, 85, 88, 91, 95, 98,
                97, 96, 95, 94, 93, 92, 91, 90,
                89, 88, 86, 84, 82, 80, 78, 76,
                74, 73, 72, 71, 70, 69, 68, 65
            ],
            unit: "bpm",
            color: "#FF6384"
        },
        calories_burned: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [1700, 1850, 1950, 1600, 1780, 2100, 1450],
            unit: "kcal",
            color: "#FF9F40"
        },
        weight_trend: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            values: [83.0, 83.2, 82.8, 83.1, 82.9, 83.0, 82.7, 82.8, 82.6, 82.5],
            unit: "kg",
            color: "#36A2EB"
        },
        sleep_quality_breakdown: {
            labels: ["Deep", "REM", "Light", "Awake"],
            values: [0.9, 1.4, 3.8, 0.7],
            colors: ["#2c3e50", "#8e44ad", "#3498db", "#ecf0f1"],
            unit: "hrs"
        },
        recent_activities: [
            { icon: "🌿", title: "Gardening", time: "08:00 AM", detail: "45 mins light work" },
            { icon: "🚶", title: "Morning Walk", time: "10:00 AM", detail: "3km in 48 mins" },
            { icon: "🍲", title: "Lunch", time: "01:00 PM", detail: "650 kcal - Mediterranean" },
            { icon: "📖", title: "Reading Rest", time: "03:00 PM", detail: "Seated 1.5hrs" }
        ],
        stress_hourly: {
            labels: ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"],
            values: [12, 18, 22, 20, 18, 15, 12, 10],
            unit: "stress lvl",
            color: "#FF9F40"
        },
        anxiety_heatmap: {
            values: [0,0,1,1,0,0,0, 0,1,1,2,1,0,0, 0,0,1,1,0,0,0, 1,1,1,0,0,0,0, 0,0],
            unit: "lvl",
            color: "#f44336"
        }
    }
};
