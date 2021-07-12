let mix = require("laravel-mix");

// Compile modern JavaScript and copy index.html / assets
mix.jsx("src/index.jsx", "index.jsx").react().setPublicPath("dist");
mix.copy("src/index.html", "dist/index.html");
mix.copy("src/assets/images", "dist/images");

// Disable success notifications
mix.disableSuccessNotifications();
