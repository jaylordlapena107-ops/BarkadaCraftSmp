async function loadServer() {
  try {
    const res = await fetch("http://barkadacraftsmp.sg1-mczie.fun:4156/server", {
      headers: {
        "Authorization": "Bearer Tzdt6Nwav1Vng2mqakfRTVFo4MmJGHLuteV1JzD0L54cCrO6Le6RYC9I2icTsvJEtucZvivrITIEaFFwMCsJAyy8Eh6PKqZX4h4v"
      }
    });

    const json = await res.json();
    const data = json.data;

    // PLAYERS
    document.getElementById("players").innerText =
      data.players.playerCount.online + "/" +
      data.players.playerCount.max;

    // TPS
    document.getElementById("tps").innerText =
      data.health.tps.oneMinute.toFixed(2);

    // CPU (approx lang)
    document.getElementById("cpu").innerText =
      data.health.cpuCount + " cores";

    // RAM (convert to MB)
    const used = (data.health.memory.totalMemory - data.health.memory.freeMemory) / 1024 / 1024;
    const max = data.health.memory.maxMemory / 1024 / 1024;

    document.getElementById("ram").innerText =
      Math.round(used) + " / " + Math.round(max) + " MB";

    // DIMENSIONS
    document.getElementById("nether").innerText =
      data.dimension.allowNether ? "OPEN" : "CLOSED";

    document.getElementById("end").innerText =
      data.dimension.allowEnd ? "OPEN" : "CLOSED";

  } catch (err) {
    console.log("Error:", err);
  }
}

// auto refresh every 5 sec
setInterval(loadServer, 5000);
loadServer();
