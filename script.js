async function loadServer() {
  try {
    const res = await fetch("/api/server"), {
      headers: {
        "Authorization": "Bearer Tzdt6Nwav1Vng2mqakfRTVFo4MmJGHLuteV1JzD0L54cCrO6Le6RYC9I2icTsvJEtucZvivrITIEaFFwMCsJAyy8Eh6PKqZX4h4v"
      }
    });

    if (!res.ok) throw new Error("Server Offline");

    const json = await res.json();
    const data = json.data;

    // ✅ STATUS ONLINE
    const status = document.getElementById("status");
    status.innerText = "• SERVER ONLINE";
    status.className = "online";

    // 👤 PLAYERS
    document.getElementById("players").innerText =
      data.players.playerCount.online + "/" +
      data.players.playerCount.max;

    // ⚡ TPS
    document.getElementById("tps").innerText =
      data.health.tps.oneMinute.toFixed(2);

    // 💻 CPU
    document.getElementById("cpu").innerText =
      data.health.cpuCount + " cores";

    // 🧠 RAM (used vs max)
    const used = (data.health.memory.totalMemory - data.health.memory.freeMemory) / 1024 / 1024;
    const max = data.health.memory.totalMemory / 1024 / 1024;

    document.getElementById("ram").innerText =
      Math.round(used) + " / " + Math.round(max) + " MB";

    // 🔥 NETHER
    document.getElementById("nether").innerText =
      data.dimension.allowNether ? "OPEN" : "CLOSED";

    // 🌌 END
    document.getElementById("end").innerText =
      data.dimension.allowEnd ? "OPEN" : "CLOSED";

  } catch (err) {
    console.log("Error:", err);

    // ❌ STATUS OFFLINE
    const status = document.getElementById("status");
    status.innerText = "• SERVER OFFLINE";
    status.className = "offline";

    // reset values
    document.getElementById("players").innerText = "0/0";
    document.getElementById("tps").innerText = "0";
    document.getElementById("cpu").innerText = "0";
    document.getElementById("ram").innerText = "0";
    document.getElementById("nether").innerText = "OFF";
    document.getElementById("end").innerText = "OFF";
  }
}

// 🔁 refresh every 5 sec
setInterval(loadServer, 5000);
loadServer();
