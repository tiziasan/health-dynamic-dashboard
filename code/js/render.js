// js/render.js
import { MOCK_HEALTH_DATA } from './data.js';
import { enableDragAndDrop } from './drag.js';

// --- MAIN DASHBOARD RENDERER ---
export function renderDashboard(layoutData, userData) {
    const container = document.getElementById('dashboard-grid');
    container.innerHTML = '';

    if (!layoutData || !Array.isArray(layoutData)) {
        console.error("❌ Data Error", layoutData);
        container.innerHTML = '<p>Error loading layout.</p>';
        return;
    }

    layoutData.forEach((widget, index) => {
        const widgetEl = document.createElement('div');
        widgetEl.className = 'widget';
        widgetEl.setAttribute('draggable', 'true');
        widgetEl.dataset.index = index;
        widgetEl.dataset.source = widget.dataSource;
        if (widget.size === 'wide') widgetEl.classList.add('col-span-2');

        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.marginBottom = '10px';

        const title = document.createElement('h3');
        title.style.margin = '0';
        title.style.fontSize = '1.1rem';
        title.textContent = widget.title;

        const controls = document.createElement('div');
        controls.className = 'widget-controls';
        controls.innerHTML = `
            <button class="mini-btn like-btn" onclick="saveWidgetFeedback('${widget.dataSource}', 'like', this)">👍</button>
            <button class="mini-btn dislike-btn" onclick="saveWidgetFeedback('${widget.dataSource}', 'dislike', this)">👎</button>
        `;

        header.appendChild(title);
        header.appendChild(controls);
        widgetEl.appendChild(header);
        const dataKey = widget.dataSource;
        const chartData = MOCK_HEALTH_DATA.charts[dataKey];
        const userValue = userData ? userData[dataKey] : null;

        let enterTime = 0;

        widgetEl.addEventListener('mouseenter', () => {
            enterTime = Date.now();
        });

        widgetEl.addEventListener('mouseleave', () => {
            if (enterTime > 0) {
                const duration = Date.now() - enterTime;
                // Only track "meaningful" dwells (> 500ms) to avoid noise
                if (duration > 500) {
                    // Call a global handler we will define in app.js
                    window.recordDwellTime(widget.dataSource, duration);
                }
            }
            enterTime = 0;
        });

        switch (widget.type) {
            case 'stat':
                let val = undefined;
                let unit = "";

                // Try user_stats first (objects with value/unit)
                if (MOCK_HEALTH_DATA.user_stats[dataKey]) {
                    const statObj = MOCK_HEALTH_DATA.user_stats[dataKey];
                    val = statObj.value;
                    unit = statObj.unit;
                }
                else if (userValue !== null && userValue !== undefined) {
                    val = userValue;
                }
                else if (chartData && chartData.values) {
                    const total = chartData.values.reduce((a, b) => a + b, 0);
                    val = (total / chartData.values.length).toFixed(1);
                    unit = chartData.unit || "";
                }

                if (val === undefined) {
                    val = "--";
                    unit = "";
                }

                renderStat(widgetEl, val, unit, null);
                break;

            case 'heatmap':
                if (chartData) {
                    renderHeatmap(widgetEl, chartData);
                } else {
                    widgetEl.innerHTML += '<p style="color: #999; text-align: center; padding: 20px;">No heatmap data available</p>';
                }
                break;

            case 'gauge':
                // FIX: Check if data exists before accessing
                const statData = MOCK_HEALTH_DATA.user_stats[dataKey];
                const score = statData ? statData.value : 50;
                renderGauge(widgetEl, score, widget.title);
                break;

            case 'timeline':
                const feed = MOCK_HEALTH_DATA.charts[dataKey];
                if (feed && Array.isArray(feed)) {
                    renderTimeline(widgetEl, feed);
                } else {
                    widgetEl.innerHTML += '<p style="color: #999; text-align: center; padding: 20px;">No timeline data available</p>';
                }
                break;

            case 'stacked_bar':
                if (chartData) {
                    renderStackedBar(widgetEl, chartData);
                } else {
                    widgetEl.innerHTML += '<p style="color: #999; text-align: center; padding: 20px;">No breakdown data available</p>';
                }
                break;

            case 'radar':
                if (chartData) {
                    renderChart(widgetEl, chartData, 'radar');
                } else {
                    widgetEl.innerHTML += '<p style="color: #999; text-align: center; padding: 20px;">No radar data available</p>';
                }
                break;

            case 'chart':
            default:
                if (chartData) {
                    // SMART ROUTING: Redirect special chartTypes to dedicated renderers
                    if (widget.chartType === 'stacked_bar') {
                        renderStackedBar(widgetEl, chartData);
                    } else if (widget.chartType === 'radar') {
                        renderChart(widgetEl, chartData, 'radar');
                    } else {
                        // Standard line/bar charts
                        renderChart(widgetEl, chartData, widget.chartType || 'bar');
                    }
                } else {
                    // Fallback for missing data
                    const statData = MOCK_HEALTH_DATA.user_stats[dataKey];
                    if (statData) {
                        renderStat(widgetEl, statData.value, statData.unit, null);
                    } else {
                        widgetEl.innerHTML += '<p style="color: #999; text-align: center; padding: 20px;">No data available</p>';
                    }
                }
                break;

        }

        container.appendChild(widgetEl);
    });

    enableDragAndDrop(container, userData);
}

// --- SUGGESTION RENDERER (The Missing Piece!) ---
export function renderSuggestion(suggestionData) {
    const banner = document.getElementById('suggestion-banner');
    if (!suggestionData) return;
    const explainText = suggestionData.explainability || "AI reasoning not available for this session.";

    banner.classList.remove('hidden');
    banner.innerHTML = `
        <div class="suggestion-content">
            <span class="icon">💡</span>
            <div class="text">
                <span class="label">AI COACH:</span>
                <strong>${suggestionData.text}</strong>
            </div>
            <button class="nudge-btn" title="Why this suggestion?">?</button>
        </div>
        <div class="nudge-popup hidden">
            <div style="margin-bottom: 12px;">
                <p style="margin: 0; font-size: 0.85rem; text-transform: uppercase; opacity: 0.7; letter-spacing: 1px;">The Science</p>
                <p style="margin-top: 4px;">${suggestionData.nudge}</p>
            </div>

            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.2); margin: 10px 0;">

            <div>
                <p style="margin: 0; font-size: 0.85rem; text-transform: uppercase; opacity: 0.7; letter-spacing: 1px;">Why this Interface?</p>
                <p style="margin-top: 4px; font-style: italic;">"${explainText}"</p>
            </div>
        </div>
    `;

    // Add Interaction
    const btn = banner.querySelector('.nudge-btn');
    const popup = banner.querySelector('.nudge-popup');

    if (btn && popup) {
        btn.addEventListener('click', () => {
            popup.classList.toggle('hidden');
        });
    }
}

// --- HELPER RENDERERS ---

function renderStat(container, value, unit, trend) {
    if(value === undefined) value = "--";
    let trendHtml = '';
    if (trend) {
        const color = trend > 0 ? '#4caf50' : '#f44336';
        const arrow = trend > 0 ? '⬆' : '⬇';
        trendHtml = `<span style="color:${color}; font-size: 0.8rem; margin-left: 10px; font-weight:bold;">${arrow} ${Math.abs(trend)}%</span>`;
    }
    container.innerHTML += `<div class="stat-value">${value}</div><div class="stat-label">${trendHtml}</div>`;
}

function renderHeatmap(container, data) {
    const grid = document.createElement('div');
    grid.className = 'heatmap-grid';

    // Generate cells
    data.values.forEach(intensity => {
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';
        // Opacity based on intensity (0 to 4)
        cell.style.backgroundColor = data.color;
        cell.style.opacity = intensity === 0 ? 0.1 : 0.2 + (intensity * 0.2);
        cell.title = `Intensity: ${intensity}`;
        grid.appendChild(cell);
    });
    container.appendChild(grid);
}

function renderTimeline(container, items) {
    const list = document.createElement('div');
    list.className = 'timeline-container';

    if(!Array.isArray(items)) return;

    items.forEach(item => {
        list.innerHTML += `
            <div class="timeline-item">
                <div class="timeline-icon">${item.icon}</div>
                <div class="timeline-content">
                    <h4>${item.title} <span style="float:right">${item.time}</span></h4>
                    <p>${item.detail}</p>
                </div>
            </div>
        `;
    });
    container.appendChild(list);
}

function renderGauge(container, score, label) {
    container.style.position = 'relative';
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    // 1. Define Scale
    let maxVal = 100; // Now we will actually use this!
    let isInverse = false;

    const lowerLabel = label.toLowerCase();

    // Detect metric type
    if (lowerLabel.includes('heart rate') || lowerLabel.includes('stress')) {
        isInverse = true;
    }

    // 2. Calculate Visual Percentage
    let visualScore = score;

    if (isInverse) {
        // Use maxVal here instead of hardcoded 100
        visualScore = Math.max(0, maxVal - score);
    }

    // 3. Determine Color Logic
    let color = '#f44336'; // Red
    if (visualScore > 40) color = '#ff9800'; // Orange
    if (visualScore > 70) color = '#4caf50'; // Green

    // Draw semi-circle
    new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ["Current", "Remaining"],
            datasets: [{
                // Use maxVal here for the "empty" part of the doughnut
                data: [visualScore, maxVal - visualScore],
                backgroundColor: [color, '#eee'],
                borderWidth: 0,
                circumference: 180,
                rotation: 270
            }]
        },
        options: {
            responsive: true,
            aspectRatio: 1.5,
            cutout: '80%',
            plugins: { legend: { display: false }, tooltip: { enabled: false } }
        }
    });

    // Add Text Overlay
    const text = document.createElement('div');
    text.className = 'gauge-value';
    text.innerHTML = `<div class="gauge-number">${score}</div><div class="gauge-label">${label}</div>`;
    container.appendChild(text);
}function renderStackedBar(container, data) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ["Breakdown"], // Single bar
            datasets: data.labels.map((label, i) => ({
                label: label,
                data: [data.values[i]], // Single value per dataset
                backgroundColor: data.colors[i]
            }))
        },
        options: {
            indexAxis: 'y', // Horizontal
            responsive: true,
            scales: { x: { stacked: true }, y: { stacked: true, display: false } },
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

// Standard Chart
function renderChart(container, data, type) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    new Chart(canvas, {
        type: type,
        data: {
            labels: data.labels,
            datasets: [{
                label: data.unit,
                data: data.values,
                backgroundColor: data.color || 'rgba(54, 162, 235, 0.2)',
                borderColor: data.color || 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: { responsive: true }
    });
}