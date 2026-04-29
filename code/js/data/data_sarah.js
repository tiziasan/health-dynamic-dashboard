// js/data.js

export const MOCK_HEALTH_DATA = {

    // --- SECTION A: SIMULATED SENSOR DATA (New!) ---
    // These are values the user DOES NOT type in manually.
    // They simulate data coming from a smart watch or ring.
    user_stats: {
        vo2_max: { value: 54, unit: "ml/kg/min" },
        today_steps: { value: 10982, unit: "steps" },
        today_stand_up_time: { value: 6, unit: "hours" },
        today_resting_hr: { value: 66, unit: "bpm" },
        today_asymmetric_walk: { value: 0.42, unit: "%" },
        step_length: { value: 61, unit: "cm" },
        today_walking_hr: { value: 91, unit: "bpm" },
        today_exercise_minutes: { value: 29, unit: "min" },
        today_time_sleep: { value: 7.38, unit: "hrs" },
        today_hr_variability: { value: 73, unit: "ms" },
        walking_speed: { value: 5.1, unit: "km/h" },
        stair_speed: { value: 0.54, unit: "floors/min" },
        today_climbed_floor: { value: 7, unit: "floors" },
        today_breath_frequency: { value: 18, unit: "breaths/min" }
    },


    charts: {
        steps_weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [8500, 10200, 7600, 11000, 12500, 15000, 4300],
            unit: "steps",
            color: "#4BC0C0"
        },
        sleep_weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [6.5, 7.2, 5.8, 7.5, 8.0, 9.1, 7.0],
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
                58, 57, 57, 56, 56, 55, 55, 54,
                55, 57, 60, 62, 64, 67, 69, 71,
                72, 74, 75, 77, 79, 81, 82, 84,
                85, 86, 86, 87, 88, 89, 89, 90,
                90, 87, 84, 81, 78, 74, 71, 68,
                65, 64, 63, 62, 61, 60, 59, 58
            ],
            unit: "bpm",
            color: "#FF6384"
        },

        calories_burned: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [2100, 2400, 1900, 2300, 2600, 2800, 1800],
            unit: "kcal",
            color: "#FF9F40"
        },
        weight_trend: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            values: [80.2, 80.0, 79.8, 79.6, 79.4, 79.3, 79.1, 78.9, 78.7, 78.5],
            unit: "kg",
            color: "#36A2EB"
        },


        sleep_quality_breakdown: {
            labels: ["Deep", "REM", "Light", "Awake"],
            values: [1.5, 2.0, 4.0, 0.5],
            colors: ["#2c3e50", "#8e44ad", "#3498db", "#ecf0f1"],
            unit: "hrs"
        },
        recent_activities: [
            { icon: "🏃", title: "Morning Run", time: "07:30 AM", detail: "5km in 28 mins" },
            { icon: "🥗", title: "Lunch", time: "12:45 PM", detail: "600 kcal - Balanced" },
            { icon: "💧", title: "Hydration", time: "02:00 PM", detail: "500ml Water" },
            { icon: "🧘", title: "Mindfulness", time: "09:00 PM", detail: "15 min session" }
        ],


        stress_hourly: {
            labels: ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"],
            values: [15, 30, 45, 50, 40, 25, 20, 15],
            unit: "stress lvl",
            color: "#FF9F40"
        },


        anxiety_heatmap: {
            values: [0,0,1,2,1,0,0, 1,1,2,3,1,0,0, 0,0,1,1,0,0,1, 2,2,1,0,0,0,0, 1,0],
            unit: "lvl",
            color: "#f44336"
        },



    }
};