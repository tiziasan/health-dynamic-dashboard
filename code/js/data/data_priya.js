// js/data_priya.js
// Persona: Priya, 35, product manager & mother of two.
// Moderate fitness, inconsistent schedule, high stress, tries to squeeze in workouts.

export const MOCK_HEALTH_DATA = {

    // --- SECTION A: SIMULATED SENSOR DATA ---
    user_stats: {
        vo2_max: { value: 46, unit: "ml/kg/min" },
        today_steps: { value: 9340, unit: "steps" },
        today_stand_up_time: { value: 7, unit: "hours" },
        today_resting_hr: { value: 69, unit: "bpm" },
        today_asymmetric_walk: { value: 0.55, unit: "%" },
        step_length: { value: 63, unit: "cm" },
        today_walking_hr: { value: 94, unit: "bpm" },
        today_exercise_minutes: { value: 35, unit: "min" },
        today_time_sleep: { value: 6.25, unit: "hrs" },
        today_hr_variability: { value: 58, unit: "ms" },
        walking_speed: { value: 5.4, unit: "km/h" },
        stair_speed: { value: 0.48, unit: "floors/min" },
        today_climbed_floor: { value: 9, unit: "floors" },
        today_breath_frequency: { value: 17, unit: "breaths/min" }
    },

    charts: {
        steps_weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [7800, 11200, 6500, 9340, 10100, 13500, 5900],
            unit: "steps",
            color: "#4BC0C0"
        },
        sleep_weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [5.8, 6.5, 5.5, 6.25, 7.0, 7.5, 6.8],
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
                60, 59, 59, 58, 58, 57, 57, 58,
                59, 62, 66, 70, 78, 88, 95, 100,
                98, 96, 94, 92, 90, 88, 86, 84,
                85, 86, 84, 82, 80, 79, 130, 142,
                138, 125, 98, 88, 82, 78, 75, 72,
                70, 72, 74, 71, 68, 65, 63, 61
            ],
            unit: "bpm",
            color: "#FF6384"
        },
        calories_burned: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [2000, 2350, 1850, 2200, 2150, 2500, 1700],
            unit: "kcal",
            color: "#FF9F40"
        },
        weight_trend: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            values: [67.5, 67.8, 67.2, 67.6, 67.4, 67.1, 67.3, 66.9, 67.0, 66.8],
            unit: "kg",
            color: "#36A2EB"
        },
        sleep_quality_breakdown: {
            labels: ["Deep", "REM", "Light", "Awake"],
            values: [1.1, 1.5, 3.2, 0.5],
            colors: ["#2c3e50", "#8e44ad", "#3498db", "#ecf0f1"],
            unit: "hrs"
        },
        recent_activities: [
            { icon: "🏃", title: "School Run", time: "07:45 AM", detail: "2km walk/jog" },
            { icon: "💻", title: "Desk Work", time: "09:00 AM", detail: "Seated 3hrs" },
            { icon: "🧘", title: "Lunchtime Yoga", time: "12:30 PM", detail: "35 min flow" },
            { icon: "🍝", title: "Dinner", time: "07:00 PM", detail: "780 kcal - Home cooked" }
        ],
        stress_hourly: {
            labels: ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"],
            values: [40, 65, 50, 72, 68, 45, 55, 30],
            unit: "stress lvl",
            color: "#FF9F40"
        },
        anxiety_heatmap: {
            values: [1,1,2,3,2,1,1, 2,2,3,4,2,1,1, 1,2,3,3,2,1,2, 3,4,3,2,1,1,1, 2,1],
            unit: "lvl",
            color: "#f44336"
        }
    }
};
