import { apiBase } from "./apiBase";

const apiDefinitions = {

    // Get the Astronomy Picture of the Day
    getAPOD: async function () {
        return await apiBase.get(`planetary/apod`,{
            params: {
                api_key: process.env.REACT_APP_NASA_API_KEY,
                // date: "2024-04-21"
            }
        });
    },

    filterAPOD: async function (date) {
        return await apiBase.get(`planetary/apod`,{
            params: {
                api_key: process.env.REACT_APP_NASA_API_KEY,
                date: date
            }
        });
    },

    roverManifest: async function (rover) {
        return await apiBase.get(`mars-photos/api/v1/manifests/${rover}`,{
            params: {
                api_key: process.env.REACT_APP_NASA_API_KEY
            }
        });
    },

    getRoverPhotos: async function (rover, sol, camera) {
        return await apiBase.get(`mars-photos/api/v1/rovers/${rover}/photos`,{
            params: {
                api_key: process.env.REACT_APP_NASA_API_KEY,
                sol: sol,
                camera: camera
            }
        });
    },

};

export default apiDefinitions;