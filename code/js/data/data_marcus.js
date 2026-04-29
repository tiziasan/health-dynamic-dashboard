// js/data_marcus.js
// Persona: Marcus, 45, office manager. Sedentary lifestyle, slightly overweight,
// high stress job, tries to walk more but struggles with consistency.

export const MOCK_HEALTH_DATA = {

    // --- SECTION A: SIMULATED SENSOR DATA ---
    user_stats: {
        vo2_max: { value: 38, unit: "ml/kg/min" },
        today_steps: { value: 5421, unit: "steps" },
        today_stand_up_time: { value: 3, unit: "hours" },
        today_resting_hr: { value: 78, unit: "bpm" },
        today_asymmetric_walk: { value: 1.12, unit: "%" },
        step_length: { value: 72, unit: "cm" },
        today_walking_hr: { value: 108, unit: "bpm" },
        today_exercise_minutes: { value: 8, unit: "min" },
        today_time_sleep: { value: 6.10, unit: "hrs" },
        today_hr_variability: { value: 34, unit: "ms" },
        walking_speed: { value: 4.2, unit: "km/h" },
        stair_speed: { value: 0.31, unit: "floors/min" },
        today_climbed_floor: { value: 2, unit: "floors" },
        today_breath_frequency: { value: 16, unit: "breaths/min" }
    },

    charts: {
        steps_weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [4200, 5800, 3900, 6100, 5421, 8200, 2100],
            unit: "steps",
            color: "#4BC0C0"
        },
        sleep_weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [5.5, 6.0, 5.2, 6.5, 6.1, 7.8, 8.2],
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
                68, 67, 66, 66, 65, 65, 64, 64,
                65, 68, 72, 75, 78, 82, 85, 88,
                90, 92, 95, 97, 98, 99, 100, 101,
                102, 103, 102, 104, 105, 106, 106, 107,
                107, 105, 103, 100, 97, 94, 91, 88,
                84, 82, 80, 79, 77, 75, 72, 70
            ],
            unit: "bpm",
            color: "#FF6384"
        },
        calories_burned: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [1800, 2050, 1700, 2100, 1950, 2200, 1600],
            unit: "kcal",
            color: "#FF9F40"
        },
        weight_trend: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            values: [92.1, 92.4, 92.0, 92.3, 91.8, 92.1, 91.9, 92.2, 91.7, 91.5],
            unit: "kg",
            color: "#36A2EB"
        },
        sleep_quality_breakdown: {
            labels: ["Deep", "REM", "Light", "Awake"],
            values: [0.8, 1.2, 3.5, 0.6],
            colors: ["#2c3e50", "#8e44ad", "#3498db", "#ecf0f1"],
            unit: "hrs"
        },
        recent_activities: [
            { icon: "🚶", title: "Lunch Walk", time: "12:30 PM", detail: "1.2km in 15 mins" },
            { icon: "🍔", title: "Lunch", time: "01:00 PM", detail: "850 kcal - High fat" },
            { icon: "☕", title: "Coffee Break", time: "03:30 PM", detail: "3rd coffee of the day" },
            { icon: "📺", title: "Evening rest", time: "09:00 PM", detail: "Sedentary 2hrs" }
        ],
        stress_hourly: {
            labels: ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"],
            values: [35, 60, 75, 80, 70, 55, 40, 30],
            unit: "stress lvl",
            color: "#FF9F40"
        },
        anxiety_heatmap: {
            values: [1,1,2,3,2,1,1, 2,2,3,4,3,1,1, 1,1,2,3,2,1,2, 3,3,2,1,1,1,1, 2,1],
            unit: "lvl",
            color: "#f44336"
        }
    }
};
