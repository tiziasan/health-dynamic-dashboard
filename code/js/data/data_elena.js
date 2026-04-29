// js/data_elena.js
// Persona: Elena, 26, competitive amateur runner & triathlete.
// Exceptional cardiovascular fitness, disciplined sleep, high training volume.

export const MOCK_HEALTH_DATA = {

    // --- SECTION A: SIMULATED SENSOR DATA ---
    user_stats: {
        vo2_max: { value: 68, unit: "ml/kg/min" },
        today_steps: { value: 18430, unit: "steps" },
        today_stand_up_time: { value: 10, unit: "hours" },
        today_resting_hr: { value: 44, unit: "bpm" },
        today_asymmetric_walk: { value: 0.18, unit: "%" },
        step_length: { value: 78, unit: "cm" },
        today_walking_hr: { value: 72, unit: "bpm" },
        today_exercise_minutes: { value: 94, unit: "min" },
        today_time_sleep: { value: 8.45, unit: "hrs" },
        today_hr_variability: { value: 112, unit: "ms" },
        walking_speed: { value: 6.4, unit: "km/h" },
        stair_speed: { value: 0.92, unit: "floors/min" },
        today_climbed_floor: { value: 18, unit: "floors" },
        today_breath_frequency: { value: 13, unit: "breaths/min" }
    },

    charts: {
        steps_weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [14200, 18000, 12500, 20100, 18430, 28000, 9500],
            unit: "steps",
            color: "#4BC0C0"
        },
        sleep_weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [8.0, 8.5, 7.8, 8.2, 8.45, 9.2, 9.5],
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
                42, 41, 41, 40, 40, 39, 39, 40,
                41, 43, 45, 47, 50, 54, 58, 62,
                68, 145, 162, 168, 158, 152, 148, 142,
                72, 65, 62, 60, 58, 57, 56, 55,
                54, 53, 80, 95, 110, 118, 112, 98,
                72, 65, 58, 54, 50, 47, 45, 43
            ],
            unit: "bpm",
            color: "#FF6384"
        },
        calories_burned: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [2700, 3200, 2400, 3500, 3100, 4200, 2100],
            unit: "kcal",
            color: "#FF9F40"
        },
        weight_trend: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            values: [58.1, 58.0, 57.9, 57.8, 57.9, 57.7, 57.6, 57.5, 57.6, 57.4],
            unit: "kg",
            color: "#36A2EB"
        },
        sleep_quality_breakdown: {
            labels: ["Deep", "REM", "Light", "Awake"],
            values: [2.5, 2.8, 3.0, 0.2],
            colors: ["#2c3e50", "#8e44ad", "#3498db", "#ecf0f1"],
            unit: "hrs"
        },
        recent_activities: [
            { icon: "🏊", title: "Pool Training", time: "06:00 AM", detail: "2.4km in 48 mins" },
            { icon: "🚴", title: "Cycling", time: "09:00 AM", detail: "35km in 72 mins" },
            { icon: "🥑", title: "Lunch", time: "12:00 PM", detail: "920 kcal - High protein" },
            { icon: "🏃", title: "Brick Run", time: "05:00 PM", detail: "8km in 38 mins" }
        ],
        stress_hourly: {
            labels: ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"],
            values: [10, 20, 25, 20, 22, 15, 10, 8],
            unit: "stress lvl",
            color: "#FF9F40"
        },
        anxiety_heatmap: {
            values: [0,0,0,1,0,0,0, 0,0,1,1,0,0,0, 0,0,0,1,0,0,0, 1,1,0,0,0,0,0, 0,0],
            unit: "lvl",
            color: "#f44336"
        }
    }
};
