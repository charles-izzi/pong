module.exports = {
    transpileDependencies: ["vuetify"],
    configureWebpack: {
        devtool: "source-map"
    },
    pwa: {
        "name": process.env.VUE_APP_TITLE,
        "short_name": process.env.VUE_APP_TITLE,
        "theme_color": "#4DBA87",
        "icons": [
            {
                "src": "./img/icons/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "./img/icons/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            },
            {
                "src": "./img/icons/android-chrome-maskable-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "./img/icons/android-chrome-maskable-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            }
        ],
        "start_url": ".",
        "display": "standalone",
        "background_color": "#000000",
    }
};
