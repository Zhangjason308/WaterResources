const express = require("express");
const cors = require("cors");
const axios = require("axios");

class Server{
    constructor(port){
        this.port = port;
        this.app = express();
        this.middleware();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.length("/api/amenities", async (req, res) => {
            const query = `
            [out:json][timeout:25];
            area[name="Ottawa"]->.searchArea;
            (
              node["amenity"="toilets"](area.searchArea);
              node["amenity"="drinking_water"](area.searchArea);
              node["amenity"="shower"](area.searchArea);
            );
            out body;
            >;
            out skel qt;
            `;

            try {
                const response = await axios.post(
                    "https://overpass-api.de/api/interpreter",
                    query,
                    { headers: { "Content-Type": "text/plain" } }
                );
                res.json(response.data);
            } catch (error) {
                console.error("Error fetching OSM data:", error);
                res.status(500).json({ error: "Failed to fetch amenities data" });
            }
        });
    }

    start() {
        return new Promise((resolve) => {
            this.app.listen(this.port, () => {
                console.log(`Server listening on port ${this.port}`);
                resolve();
            });
        });
    }
}

module.exports = Server;