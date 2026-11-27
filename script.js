
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const detectBtn = document.getElementById("detectBtn");
const clearBtn = document.getElementById("clearBtn");
const resultText = document.getElementById("resultText");
const cropType = document.getElementById("cropType");

let model = null;

// Load AI Model
async function loadModel() {
    if (model) return model;

    resultText.innerText = "Loading AI model... Please wait.";
const modelURL = "./model.json";
const metadataURL = "./metadata.json";

    model = await tmImage.load(modelURL, metadataURL);

    return model;
}

// Image Upload and Preview
imageInput.addEventListener("change", function () {
    const file = imageInput.files[0];

    if (file) {
        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            imageInput.value = "";
            return;
        }

        previewImage.src = URL.createObjectURL(file);
        previewImage.style.display = "inline-block";

        resultText.innerText =
            "Image uploaded successfully. Click Detect Disease.";
    }
});

// Detect Crop Disease
detectBtn.addEventListener("click", async function () {

    if (cropType.value === "") {
        resultText.innerText = "Please select a crop type.";
        return;
    }

    if (!imageInput.files.length) {
        resultText.innerText = "Please upload a crop image first.";
        return;
    }

    try {
        detectBtn.disabled = true;

        resultText.innerText = "AI is analyzing your image...";

        // Load trained model
        const loadedModel = await loadModel();

        // Predict image
        const predictions = await loadedModel.predict(previewImage);

        // Get highest prediction from all crops
        const bestPrediction = predictions.reduce((best, current) =>
            current.probability > best.probability ? current : best
        );

        // Selected crop
        const selectedCrop = cropType.value.toLowerCase();

        const predictedCrop =
            bestPrediction.className.toLowerCase();

        // Check selected crop
        const cropNames = {
            cotton: ["cotton"],
            rice: ["paddy", "rice"],
            tomato: ["tomato"]
        };

        const isCorrectCrop = cropNames[selectedCrop].some(name =>
            predictedCrop.includes(name)
        );

        if (!isCorrectCrop) {
            resultText.innerText =
                "Wrong crop selected! Please select the correct crop.";
            return;
        }

        // Calculate confidence
        const confidence =
            (bestPrediction.probability * 100).toFixed(2);

        // Display result
        resultText.innerText =
            "AI Result: " + bestPrediction.className +
            "\nConfidence: " + confidence + "%";

    } catch (error) {
        console.error(error);

        resultText.innerText =
            "Error: " + error.message;

    } finally {
        detectBtn.disabled = false;
    }
});

// Clear Image and Result
clearBtn.addEventListener("click", function () {

    imageInput.value = "";
    previewImage.src = "";
    previewImage.style.display = "none";

    resultText.innerText =
        "Upload a crop image to analyze.";
});

const soilCrop = document.getElementById("soilCrop");
const soilBtn = document.getElementById("soilBtn");
const soilResult = document.getElementById("soilResult");

soilBtn.addEventListener("click", function () {

    const selectedSoilCrop = soilCrop.value;

    if (selectedSoilCrop === "") {
        soilResult.innerText = "Please select a crop.";
        return;
    }

    const soilData = {
        cotton: {
            soil: "Black soil and well-drained loamy soil",
            details: "Cotton grows well in deep, fertile soil with good drainage.",
            ph: "6.0 - 8.0"
        },

        rice: {
            soil: "Clayey soil and clay loam soil",
            details: "Paddy grows well in soil that retains water.",
            ph: "5.5 - 6.5"
        },

        tomato: {
            soil: "Well-drained sandy loam soil",
            details: "Tomato grows well in fertile soil rich in organic matter.",
            ph: "6.0 - 7.0"
        }
    };

    const recommendation = soilData[selectedSoilCrop];

    soilResult.innerHTML =
        "<h3>Recommended Soil</h3>" +
        "<p><strong>Soil Type:</strong> " + recommendation.soil + "</p>" +
        "<p><strong>Soil Details:</strong> " + recommendation.details + "</p>" +
        "<p><strong>Suitable Soil pH:</strong> " + recommendation.ph + "</p>";
});

console.log("Harvest section:", document.getElementById("harvest-section"));
console.log("Harvest button:", document.getElementById("harvestBtn"));
console.log("Harvest crop:", document.getElementById("harvestCrop"));
console.log("Harvest result:", document.getElementById("harvestResult"));
harvestBtn.addEventListener("click", function () {

    const selectedCrop = harvestCrop.value;

    if (selectedCrop === "") {
        harvestResult.innerText = "Please select a crop.";
        return;
    }

    const harvestData = {
        cotton: {
            time: "Approximately 150–180 days after sowing.",
            signs: "Cotton bolls open naturally and fluffy white cotton becomes visible.",
            tip: "Harvest when the bolls are sufficiently open and the cotton is dry."
        },

        rice: {
            time: "Approximately 110–150 days after planting, depending on the variety.",
            signs: "Most grains turn golden yellow and become hard.",
            tip: "Harvest when around 80–85% of the grains in the panicles are mature."
        },

        tomato: {
            time: "Approximately 60–90 days after transplanting, depending on the variety.",
            signs: "Fruits develop their mature colour and reach the required size.",
            tip: "Harvest at the suitable colour stage depending on whether the tomatoes are for local use or transport."
        }
    };

    const guide = harvestData[selectedCrop];

    harvestResult.innerHTML =
        "<h3>Harvest Guide</h3>" +
        "<p><strong>Harvesting Time:</strong> " + guide.time + "</p>" +
        "<p><strong>Maturity Signs:</strong> " + guide.signs + "</p>" +
        "<p><strong>Harvesting Tip:</strong> " + guide.tip + "</p>";
});
const careCrop = document.getElementById("careCrop");
const careBtn = document.getElementById("careBtn");
const careResult = document.getElementById("careResult");

careBtn.addEventListener("click", function () {

    const selectedCrop = careCrop.value;

    if (selectedCrop === "") {
        careResult.innerText = "Please select a crop.";
        return;
    }

    const careData = {
        cotton: {
            tips: [
                "Avoid excessive watering.",
                "Check plants regularly for pests like bollworms.",
                "Keep the field free from weeds.",
                "Use balanced fertilizers based on soil testing.",
                "Monitor leaves regularly for disease symptoms."
            ]
        },

        rice: {
            tips: [
                "Maintain proper water levels in the field.",
                "Avoid excessive fertilizer application.",
                "Monitor crops for pests like stem borers.",
                "Remove weeds at the appropriate stage.",
                "Inspect plants regularly for disease symptoms."
            ]
        },

        tomato: {
            tips: [
                "Water plants regularly without waterlogging.",
                "Provide support to tomato plants.",
                "Remove infected leaves carefully.",
                "Monitor for pests like fruit borers and whiteflies.",
                "Ensure proper spacing and sunlight."
            ]
        }
    };

    const recommendation = careData[selectedCrop];

    careResult.innerHTML =
        "<h3>Crop Care Tips</h3>" +
        "<ul>" +
        recommendation.tips.map(tip => "<li>" + tip + "</li>").join("") +
        "</ul>";
});
const weatherBtn = document.getElementById("weatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

weatherBtn.addEventListener("click", function () {

    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.innerText = "Please enter your city name.";
        return;
    }

    weatherResult.innerHTML =
        "<h3>Weather-Based Farming Guide</h3>" +
        "<p><strong>City:</strong> " + city + "</p>" +
        "<p>🌧️ Rainy Weather: Avoid unnecessary irrigation.</p>" +
        "<p>☀️ Hot Weather: Water crops during early morning or evening.</p>" +
        "<p>💧 Humid Weather: Monitor crops for fungal diseases.</p>" +
        "<p>🌬️ Windy Weather: Avoid spraying pesticides during strong winds.</p>";
});
