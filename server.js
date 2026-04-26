import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// API endpoint mo
const API_URL = "http://barkadacraftsmp.sg1-mczie.fun:4156/server";
const API_KEY = "Tzdt6Nwav1Vng2mqakfRTVFo4MmJGHLuteV1JzD0L54cCrO6Le6RYC9I2icTsvJEtucZvivrITIEaFFwMCsJAyy8Eh6PKqZX4h4v";

app.get("/api/server", async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Server fetch failed" });
  }
});

// serve frontend
app.use(express.static("."));

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
