// Custom Cyberpunk Chart for Commit Statistics

function createCommitsChart(commitData) {
    const canvas = document.getElementById('commits-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = 400;

    // Chart data
    const labels = Object.keys(commitData);
    const data = Object.values(commitData);
    const maxValue = Math.max(...data, 10); // Minimum 10 for scale

    // Chart dimensions
    const padding = 60;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx, padding, chartWidth, chartHeight, maxValue);

    // Draw line chart
    drawLineChart(ctx, data, labels, padding, chartWidth, chartHeight, maxValue);

    // Draw axes
    drawAxes(ctx, labels, padding, chartWidth, chartHeight, maxValue);
}

function drawGrid(ctx, padding, width, height, maxValue) {
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.1)';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
        const y = padding + (height / gridLines) * i;

        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + width, y);
        ctx.stroke();
    }

    // Vertical grid lines
    const verticalLines = 11; // 12 months
    for (let i = 0; i <= verticalLines; i++) {
        const x = padding + (width / verticalLines) * i;

        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, padding + height);
        ctx.stroke();
    }
}

function drawLineChart(ctx, data, labels, padding, width, height, maxValue) {
    const pointRadius = 5;
    const stepX = width / (data.length - 1 || 1);

    // Create gradient for line
    const gradient = ctx.createLinearGradient(0, padding, 0, padding + height);
    gradient.addColorStop(0, '#00f3ff');
    gradient.addColorStop(0.5, '#b803ff');
    gradient.addColorStop(1, '#ff006e');

    // Draw area under the curve
    ctx.beginPath();
    ctx.moveTo(padding, padding + height);

    data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + height - (value / maxValue) * height;
        ctx.lineTo(x, y);
    });

    ctx.lineTo(padding + width, padding + height);
    ctx.closePath();

    const areaGradient = ctx.createLinearGradient(0, padding, 0, padding + height);
    areaGradient.addColorStop(0, 'rgba(0, 243, 255, 0.2)');
    areaGradient.addColorStop(1, 'rgba(255, 0, 110, 0.05)');

    ctx.fillStyle = areaGradient;
    ctx.fill();

    // Draw the line
    ctx.beginPath();
    data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + height - (value / maxValue) * height;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw glow effect
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw data points
    data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + height - (value / maxValue) * height;

        // Outer glow circle
        ctx.beginPath();
        ctx.arc(x, y, pointRadius + 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 243, 255, 0.3)';
        ctx.fill();

        // Main circle
        ctx.beginPath();
        ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#00f3ff';
        ctx.fill();

        // Inner circle
        ctx.beginPath();
        ctx.arc(x, y, pointRadius - 2, 0, Math.PI * 2);
        ctx.fillStyle = '#0a0e27';
        ctx.fill();

        // Add glow
        ctx.shadowColor = '#00f3ff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#00f3ff';
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    // Add hover effect (store data for interactivity)
    canvas.addEventListener('mousemove', (e) => {
        handleChartHover(e, canvas, ctx, data, labels, padding, width, height, maxValue, stepX);
    });
}

function drawAxes(ctx, labels, padding, width, height, maxValue) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px "Courier New", monospace';

    // Y-axis labels
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
        const value = Math.round((maxValue / ySteps) * (ySteps - i));
        const y = padding + (height / ySteps) * i;

        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(value.toString(), padding - 10, y);
    }

    // X-axis labels
    const stepX = width / (labels.length - 1 || 1);
    labels.forEach((label, index) => {
        const x = padding + stepX * index;

        ctx.save();
        ctx.translate(x, padding + height + 15);
        ctx.rotate(-Math.PI / 4);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, 0, 0);
        ctx.restore();
    });

    // Axis titles
    ctx.fillStyle = '#00f3ff';
    ctx.font = 'bold 14px "Courier New", monospace';

    // Y-axis title
    ctx.save();
    ctx.translate(20, padding + height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('COMMITS', 0, 0);
    ctx.restore();

    // X-axis title
    ctx.textAlign = 'center';
    ctx.fillText('TIMELINE', padding + width / 2, padding + height + 50);
}

function handleChartHover(e, canvas, ctx, data, labels, padding, width, height, maxValue, stepX) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find nearest data point
    let nearestIndex = -1;
    let minDistance = Infinity;

    data.forEach((value, index) => {
        const pointX = padding + stepX * index;
        const pointY = padding + height - (value / maxValue) * height;
        const distance = Math.sqrt(Math.pow(x - pointX, 2) + Math.pow(y - pointY, 2));

        if (distance < minDistance && distance < 20) {
            minDistance = distance;
            nearestIndex = index;
        }
    });

    // Clear previous hover effects and redraw chart
    if (nearestIndex >= 0) {
        canvas.style.cursor = 'pointer';

        // Show tooltip
        const value = data[nearestIndex];
        const label = labels[nearestIndex];
        const pointX = padding + stepX * nearestIndex;
        const pointY = padding + height - (value / maxValue) * height;

        // Draw tooltip
        ctx.fillStyle = 'rgba(10, 14, 39, 0.95)';
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 2;

        const tooltipWidth = 120;
        const tooltipHeight = 50;
        const tooltipX = pointX - tooltipWidth / 2;
        const tooltipY = pointY - tooltipHeight - 15;

        ctx.fillRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);
        ctx.strokeRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);

        // Tooltip text
        ctx.fillStyle = '#e0e7ff';
        ctx.font = '12px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(label, tooltipX + tooltipWidth / 2, tooltipY + 20);
        ctx.fillStyle = '#00f3ff';
        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.fillText(`${value} commits`, tooltipX + tooltipWidth / 2, tooltipY + 38);

    } else {
        canvas.style.cursor = 'default';
    }
}

// Responsive chart resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('commits-chart');
    if (canvas && window.currentCommitData) {
        createCommitsChart(window.currentCommitData);
    }
});

// Store commit data globally for resize
window.currentCommitData = null;

// Override the original function to store data
const originalCreateCommitsChart = createCommitsChart;
createCommitsChart = function(commitData) {
    window.currentCommitData = commitData;
    originalCreateCommitsChart(commitData);
};
