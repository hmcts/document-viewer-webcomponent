export const config = {
    proxies: {
        dmStore: {
            endpoints: ["/documents"],
            target: process.env["DM_STORE_APP_URL"] || "http://localhost:4603"
        },
        annotation: {
            endpoints: ["/em-anno"],
            target: process.env["ANNOTATION_API_URL"] || "http://localhost:4623",
            pathRewrite: {
                "^/em-anno": "/api"
            }
        }
    },
    idam: {
        url: process.env["IDAM_URL"] || "http://localhost:4501",
        client: "webshow",
        secret: process.env["IDAM_SECRET"] || "AAAAAAAAAAAAAAAA",
        redirect: "https://em-show-aat.service.core-compute-aat.internal/oauth2/callback",
    },
    s2s: {
        url: process.env["S2S_URL"] || "http://localhost:4502",
        secret: process.env["S2S_KEY"] || "AAAAAAAAAAAAAAAA",
        microservice: "em_gw"
    },
    port: process.env.PORT || 1337,
    tokenRefreshTime: 60 * 60 * 1000
};
