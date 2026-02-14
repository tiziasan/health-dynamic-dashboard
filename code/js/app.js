// js/app.js
import { generateDashboardLayout,generateHealthReport } from './llm.js';
import { renderDashboard, renderSuggestion } from './render.js';
import { getUser, createUser, updateUser } from './api.js';
import { MOCK_HEALTH_DATA } from './data.js';


// DOM Elements
const pages = {
    landing: document.getElementById('landing-page'),
    questionnaire: document.getElementById('questionnaire-page'),
    dashboard: document.getElementById('dashboard-page')
};

let currentUser = null;
const sessionInterestMap = {};

window.recordDwellTime = (dataSource, durationMs) => {
    if (!sessionInterestMap[dataSource]) {
        sessionInterestMap[dataSource] = 0;
    }
    // Accumulate total time spent on this metric
    sessionInterestMap[dataSource] += durationMs;

    console.log(`👁️ Dwell recorded: ${dataSource} (+${durationMs}ms) | Total: ${sessionInterestMap[dataSource]}ms`);
};

// 1. Login / Check User
document.getElementById('login-btn').addEventListener('click', async () => {
    const usernameInput = document.getElementById('username-input').value.trim();
    if (!usernameInput) return;

    console.log("🔍 Searching for user:", usernameInput); // Debug 1

    const user = await getUser(usernameInput);

    console.log("✅ User found in DB:", user); // Debug 2

    if (user) {
        currentUser = user;
        // FIX: Pass 'user' directly, not 'currentUser' to avoid scope timing issues
        loadDashboard(user);
    } else {
        console.log("👤 New user. Redirecting to questionnaire.");
        currentUser = { username: usernameInput };
        switchView('questionnaire');
        document.querySelector('#questionnaire-page h2').textContent = "Profile Setup"; // Reset title
        document.querySelector('#submit-btn').textContent = "Generate Dashboard";      // Reset button text

        // HIDE Cancel Button (New users can't cancel!)
        document.getElementById('cancel-btn').classList.add('hidden');
    }
});
document.getElementById('profile-btn').addEventListener('click', () => {
    if (!currentUser) return;

    // Switch to form view
    switchView('questionnaire');

    // Change Title/Button to look like "Editing" mode
    document.querySelector('#questionnaire-page h2').textContent = "Edit Profile";
    document.querySelector('#submit-btn').textContent = "Save & Regenerate";
    document.getElementById('cancel-btn').classList.remove('hidden'); // <--- ADD THIS
    // PRE-FILL INPUTS
    const form = document.getElementById('quest-form');

    // Loop through user data and fill matching inputs
    // (This works because input 'name' attributes match our data keys!)
    Object.keys(currentUser).forEach(key => {
        const input = form.elements[key];
        if (input) {
            input.value = currentUser[key];
        }
    });
});

// Handle Cancel Button
document.getElementById('cancel-btn').addEventListener('click', () => {
    // Just switch back to dashboard view.
    // No data is saved, no AI is called.
    switchView('dashboard');
});

// 2. Handle Questionnaire (New User)
document.getElementById('quest-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const submittedData = {
        // Basic
        age: formData.get('age'),
        gender: formData.get('gender'),

        // Health (New)
        stress_level: formData.get('stress_level'),
        diet_focus: formData.get('diet_focus'),
        activity: formData.get('activity_level'),
        goals: formData.get('goals'),

        // Metrics
        current_weight: formData.get('current_weight'),
        target_weight: formData.get('target_weight'),
        step_goal: formData.get('step_goal'),
        sleep_goal: formData.get('sleep_goal'),

        // UI (New)
        glasses: formData.get('glasses'),
        complexity: formData.get('complexity'),
        ui_mood: formData.get('ui_mood'),     // professional | friendly | gamified
        chart_pref: formData.get('chart_pref') // charts | stats
    };

    if (currentUser && currentUser.id) {
        // --- EDIT MODE ---
        console.log("📝 Updating existing user...");

        // 1. Update DB
        // IMPORTANT: We set 'layout' and 'suggestion' to null to force a Re-Generation
        await updateUser(currentUser.id, {
            ...submittedData,
            layout: null,     // Force AI to re-think
            suggestion: null  // Force new nudge
        });

        // 2. Update Local State
        currentUser = { ...currentUser, ...submittedData, layout: null, suggestion: null };

    } else {
        // --- NEW USER MODE ---
        console.log("✨ Creating new user...");
        const newUserData = {
            username: currentUser.username, // From login step
            ...submittedData,
            history: []
        };
        currentUser = await createUser(newUserData);
    }

    // 3. Load Dashboard (This will now see 'layout: null' and trigger the AI)
    await loadDashboard(currentUser);
});
// 3. Load & Generate Dashboard
async function loadDashboard(userData) {
    switchView('dashboard');
    document.getElementById('header-username').textContent = userData.username;
    document.getElementById('user-display').classList.remove('hidden');
    document.getElementById('welcome-msg').innerText = `Hello, ${userData.username}`;
    const container = document.getElementById('dashboard-grid');
    const suggestionContainer = document.getElementById('suggestion-banner');

    // 1. CHECK: Does the user already have a saved layout?
    if (userData.layout && userData.suggestion) {
        console.log("📂 Loading saved data...");
        renderSuggestion(userData.suggestion); // New Function
        renderDashboard(userData.layout, userData);
    }
    else {
        // 2. GENERATE NEW
        console.log("🤖 Consulting AI Coach...");
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Analyzing health data...</p>';
        suggestionContainer.innerHTML = '';

        // Expect an object now: { suggestion, layout }
        const aiResponse = await generateDashboardLayout(userData, userData.history);

        // 3. SAVE TO DB (Save the whole AI response structure)
        if (userData.id) {
            await updateUser(userData.id, {
                layout: aiResponse.layout,
                suggestion: aiResponse.suggestion
            });
            // Update local memory
            userData.layout = aiResponse.layout;
            userData.suggestion = aiResponse.suggestion;
        }

        renderSuggestion(aiResponse.suggestion);
        renderDashboard(aiResponse.layout, userData);
    }
}
// 4. Helper: View Switcher
function switchView(viewName) {
    Object.values(pages).forEach(p => p.classList.remove('active', 'view'));
    Object.values(pages).forEach(p => p.classList.add('hidden'));

    pages[viewName].classList.remove('hidden');
    pages[viewName].classList.add('view', 'active');
}

// 5. Feedback Logic (Global scope for HTML onclick)
window.saveFeedback = async (type) => {
    if (!currentUser || !currentUser.id) return;

    // Create new history item
    const newEntry = { date: new Date().toISOString(), feedback: type };

    // Add to local array
    currentUser.history.push(newEntry);

    // Save to DB
    await updateUser(currentUser.id, { history: currentUser.history });

    alert("Feedback saved to database!");
};

window.saveWidgetFeedback = async (dataSource, feedbackType, btnElement) => {
    if (!currentUser || !currentUser.id) return;

    console.log(`📝 User ${feedbackType}d widget: ${dataSource}`);

    // Visual Feedback (Toggle class)
    const parent = btnElement.parentElement;
    // Reset previous selections in this specific widget
    parent.querySelectorAll('.mini-btn').forEach(b => b.style.opacity = '0.3');
    // Highlight clicked button
    btnElement.style.opacity = '1';

    // Construct precise feedback entry
    const newEntry = {
        date: new Date().toISOString(),
        type: 'widget_preference', // Distinct from global feedback
        target_metric: dataSource, // e.g., 'vo2_max'
        sentiment: feedbackType    // 'like' or 'dislike'
    };

    // Add to history and save
    currentUser.history.push(newEntry);
    await updateUser(currentUser.id, { history: currentUser.history });
};

// 6. Handle "Regenerate Layout" Button
document.getElementById('refresh-btn').addEventListener('click', async () => {
    if (!currentUser || !currentUser.id) return;

    const container = document.getElementById('dashboard-grid');
    const suggestionBanner = document.getElementById('suggestion-banner');

    // 1. Show Loading State (Clear both areas)
    container.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Consulting AI for a new strategy...</p>';
    suggestionBanner.classList.add('hidden'); // Hide old suggestion while loading

    // 2. Force AI Generation
    // Note: We use the same function, which now returns { layout, suggestion }
    const aiResponse = await generateDashboardLayout(
        currentUser,
        currentUser.history,
        sessionInterestMap // <--- Passing the tracked hover data
    );

    // 3. Update Database (Save both fields!)
    await updateUser(currentUser.id, {
        layout: aiResponse.layout,
        suggestion: aiResponse.suggestion
    });

    // 4. Update Local State
    currentUser.layout = aiResponse.layout;
    currentUser.suggestion = aiResponse.suggestion;

    // 5. Render Everything
    renderSuggestion(aiResponse.suggestion);
    renderDashboard(aiResponse.layout, currentUser);
});
document.getElementById('generate-report-btn').addEventListener('click', async () => {
    if (!currentUser || !currentUser.id) return;

    const modal = document.getElementById('report-modal');
    const modalContent = document.getElementById('report-content');

    modal.classList.remove('hidden');
    modalContent.innerHTML = `
        <div class="loading-report">
            <div class="spinner"></div>
            <p>Analyzing your health data...</p>
        </div>
    `;

    try {
        const report = await generateHealthReport(currentUser, MOCK_HEALTH_DATA);
        renderReport(report);
    } catch (error) {
        modalContent.innerHTML = `<div class="error-state">
            <h3>⚠️ Report Generation Failed</h3>
            <button onclick="document.getElementById('report-modal').classList.add('hidden')">Close</button>
        </div>`;
    }
});

document.getElementById('close-report-btn').addEventListener('click', () => {
    document.getElementById('report-modal').classList.add('hidden');
});

function renderReport(report) {
    const statusColors = {
        excellent: '#4caf50', good: '#2196f3',
        needs_attention: '#ff9800', concerning: '#f44336'
    };
    const priorityColors = { high: '#f44336', medium: '#ff9800', low: '#2196f3' };

    document.getElementById('report-content').innerHTML = `
        <div class="report-header">
            <h2>📊 Your Health Report</h2>
            <p class="report-summary">${report.summary}</p>
        </div>
        
        <div class="report-section">
            <h3>🎯 Key Metrics Analysis</h3>
            <div class="metrics-grid">
                ${report.key_metrics.map(m => `
                    <div class="metric-card">
                        <div class="metric-header">
                            <span class="metric-name">${m.metric}</span>
                            <span class="status-badge" style="background:${statusColors[m.status]}">
                                ${m.status.replace('_', ' ')}
                            </span>
                        </div>
                        <div class="metric-value">${m.value}</div>
                        <div class="metric-insight">${m.insight}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="report-section">
            <h3>💡 Recommendations</h3>
            ${report.recommendations.map((r, i) => `
                <div class="recommendation-card">
                    <div class="rec-header">
                        <span class="rec-number">${i + 1}</span>
                        <div class="rec-title-group">
                            <h4>${r.title}</h4>
                            <span class="priority-badge" style="background:${priorityColors[r.priority]}">
                                ${r.priority} priority
                            </span>
                        </div>
                    </div>
                    <p>${r.description}</p>
                    <div class="rec-impact"><strong>Impact:</strong> ${r.impact}</div>
                </div>
            `).join('')}
        </div>
        
        <div class="report-section explainability">
            <h3>🔍 How We Generated This</h3>
            <div class="explain-grid">
                <div class="explain-card">
                    <h4>Methodology</h4>
                    <p>${report.explainability.methodology}</p>
                </div>
                <div class="explain-card">
                    <h4>Focus Areas</h4>
                    <p>${report.explainability.focus_areas}</p>
                </div>
                <div class="explain-card">
                    <h4>Personalization</h4>
                    <p>${report.explainability.personalization}</p>
                </div>
            </div>
        </div>
        
        <div class="report-footer">
            <button id="close-report-btn-bottom" class="primary-btn">Close</button>
        </div>
    `;

    document.getElementById('close-report-btn-bottom').onclick = () => {
        document.getElementById('report-modal').classList.add('hidden');
    };
}
