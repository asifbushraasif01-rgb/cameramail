const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const preview = document.getElementById("preview");

const startBtn = document.getElementById("startBtn");
const captureBtn = document.getElementById("captureBtn");
const sendBtn = document.getElementById("sendBtn");
const status = document.getElementById("status");

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbySzu4ybsCPHDnLqrMLGUldxJOZmsUj_NxXZ72il0TiVMb7bK7t4KfPi2cPHG_8XjIS/exec";

let capturedImage = null;
let stream = null;

startBtn.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });

    video.srcObject = stream;

    status.textContent = "✅ Camera Started";

    captureBtn.disabled = false;
    startBtn.disabled = true;

  } catch (e) {
    status.textContent = "❌ Camera Error: " + e.message;
  }
});
.addEventListener("click", () => {

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  capturedImage = canvas.toDataURL("image/png");

  preview.src = capturedImage;
  preview.style.display = "block";

  sendBtn.disabled = false;

  status.textContent = "📷 Photo Captured";

});


.addEventListener("click", async () => {

  if (!capturedImage) {
    alert("Please capture a photo first.");
    return;
  }

  status.textContent = "📤 Sending...";

  sendBtn.disabled = true;

  try {

    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify({
        image: capturedImage
      })
    });

    const result = await response.json();

    if (result.success) {

      status.textContent = "✅ Photo Sent Successfully";

    } else {

      status.textContent = "❌ " + result.error;

    }

  } catch (err) {

    status.textContent = "❌ " + err.message;

  }

  sendBtn.disabled = false;

});
