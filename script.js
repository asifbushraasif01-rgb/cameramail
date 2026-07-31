const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const preview = document.getElementById("preview");

const startBtn = document.getElementById("startBtn");
const captureBtn = document.getElementById("captureBtn");
const sendBtn = document.getElementById("sendBtn");
const status = document.getElementById("status");

let capturedImage = null;
let stream = null;

startBtn.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });

    video.srcObject = stream;
    status.textContent = "Camera started.";

    captureBtn.disabled = false;
    startBtn.disabled = true;

  } catch (e) {
    status.textContent = "Unable to access camera: " + e.message;
  }
});

captureBtn.addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  capturedImage = canvas.toDataURL("image/png");

  preview.src = capturedImage;
  preview.style.display = "block";

  sendBtn.disabled = false;

  status.textContent = "Photo captured.";
});

sendBtn.addEventListener("click", () => {
  if (!capturedImage) {
    status.textContent = "Please capture a photo first.";
    return;
  }

  // Next step:
  // Yahan Google Apps Script Web API ko POST request bhejenge.
  status.textContent =
    "Ready to send. Next step is connecting the Apps Script backend.";
});
