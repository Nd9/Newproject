document.getElementById('creativeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateCreativeTracker();
});

function generateCreativeTracker() {
    const creativeName = document.getElementById('creativeName').value;
    const mediaType = document.getElementById('mediaType').value;
    const mediaFile = document.getElementById('mediaFile').files[0];
    const clickThroughUrl = document.getElementById('clickThroughUrl').value;

    // Read file as data URL
    const reader = new FileReader();
    reader.onload = function(event) {
        const mediaUrl = event.target.result;
        
        // Generate HTML for the creative tracker
        const generatedHTML = createCreativeTrackerHTML(
            creativeName, 
            mediaType, 
            mediaUrl, 
            clickThroughUrl
        );

        // Display generated HTML
        const generatedCreativeEl = document.getElementById('generatedCreative');
        const generatedContentEl = document.getElementById('generatedCreativeContent');
        generatedContentEl.innerHTML = `<pre>${escapeHtml(generatedHTML)}</pre>`;
        generatedCreativeEl.style.display = 'block';
    };

    reader.readAsDataURL(mediaFile);
}

// Generate Complete HTML for Creative Tracker
function createCreativeTrackerHTML(creativeName, mediaType, mediaUrl, clickThroughUrl) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${creativeName} - Creative Tracker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
            background-color: #f4f4f4;
        }
        .creative-container {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            padding: 20px;
            margin-top: 20px;
        }
        .creative-name {
            font-size: 24px;
            margin-bottom: 15px;
            color: #333;
        }
        .creative-media {
            max-width: 100%;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .creative-media:hover {
            transform: scale(1.02);
        }
        .click-metrics {
            margin-top: 15px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="creative-container">
        <h1 id="creativeName">${creativeName}</h1>
        <div id="mediaContainer">
            ${mediaType === 'image' 
                ? `<img id="creativeMedia" class="creative-media" src="${mediaUrl}" alt="${creativeName}">`
                : `<video id="creativeMedia" class="creative-media" controls src="${mediaUrl}"></video>`
            }
        </div>
        <div class="click-metrics">
            <p>Clicks: <span id="clickCount">0</span> | Impressions: <span id="impressionCount">0</span></p>
        </div>
    </div>

    <script>
        // Creative Configuration
        const creativeConfig = {
            name: "${creativeName}",
            mediaType: "${mediaType}",
            mediaUrl: "${mediaUrl}",
            clickThroughUrl: "${clickThroughUrl}"
        };

        // Metrics Tracking
        let clickCount = 0;
        let impressionCount = 0;

        // DOM Elements
        const creativeMediaEl = document.getElementById('creativeMedia');
        const clickCountEl = document.getElementById('clickCount');
        const impressionCountEl = document.getElementById('impressionCount');

        // Track Impression
        impressionCount++;
        impressionCountEl.textContent = impressionCount;

        // Handle Creative Click
        creativeMediaEl.addEventListener('click', function() {
            clickCount++;
            clickCountEl.textContent = clickCount;
            window.open(creativeConfig.clickThroughUrl, '_blank');
        });
    <\/script>
</body>
</html>
    `;
}

// Copy HTML Code
document.getElementById('copyCodeBtn').addEventListener('click', function() {
    const generatedHTML = document.getElementById('generatedCreativeContent').textContent;
    navigator.clipboard.writeText(generatedHTML).then(() => {
        alert('HTML code copied to clipboard!');
    });
});

// Escape HTML to display in pre tag
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}