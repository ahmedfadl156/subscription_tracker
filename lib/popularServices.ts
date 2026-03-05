export interface ServiceInfo {
    cancelUrl: string;
    logo: string;
}

// Google S2 Favicon — reliable, no auth, returns HQ icons up to 128px
const logo = (domain: string, size = 128) =>
    `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;

export const POPULAR_SERVICES: Record<string, ServiceInfo> = {

    // ──────────────── Global Entertainment & Streaming ────────────────
    "netflix": {
        cancelUrl: "https://www.netflix.com/cancelplan",
        logo: logo("netflix.com"),
    },
    "spotify": {
        cancelUrl: "https://www.spotify.com/account/overview/",
        logo: logo("spotify.com"),
    },
    "amazon prime": {
        cancelUrl: "https://www.amazon.com/mc/optOutEligibility",
        logo: logo("amazon.com"),
    },
    "amazon prime video": {
        cancelUrl: "https://www.amazon.com/mc/optOutEligibility",
        logo: logo("primevideo.com"),
    },
    "amazon": {
        cancelUrl: "https://www.amazon.com/mc/optOutEligibility",
        logo: logo("amazon.com"),
    },
    "apple tv": {
        cancelUrl: "https://support.apple.com/en-us/118428",
        logo: logo("apple.com"),
    },
    "apple tv+": {
        cancelUrl: "https://support.apple.com/en-us/118428",
        logo: logo("apple.com"),
    },
    "apple music": {
        cancelUrl: "https://support.apple.com/en-us/118428",
        logo: logo("apple.com"),
    },
    "apple one": {
        cancelUrl: "https://support.apple.com/en-us/118428",
        logo: logo("apple.com"),
    },
    "disney+": {
        cancelUrl: "https://www.disneyplus.com/account/subscription",
        logo: logo("disneyplus.com"),
    },
    "disney plus": {
        cancelUrl: "https://www.disneyplus.com/account/subscription",
        logo: logo("disneyplus.com"),
    },
    "hbo max": {
        cancelUrl: "https://www.max.com/account/subscription-management",
        logo: logo("max.com"),
    },
    "max": {
        cancelUrl: "https://www.max.com/account/subscription-management",
        logo: logo("max.com"),
    },
    "hulu": {
        cancelUrl: "https://secure.hulu.com/account/cancel",
        logo: logo("hulu.com"),
    },
    "youtube premium": {
        cancelUrl: "https://www.youtube.com/paid_memberships",
        logo: logo("youtube.com"),
    },
    "youtube music": {
        cancelUrl: "https://www.youtube.com/paid_memberships",
        logo: logo("youtube.com"),
    },
    "youtube tv": {
        cancelUrl: "https://tv.youtube.com/settings/membership",
        logo: logo("youtube.com"),
    },
    "twitch": {
        cancelUrl: "https://www.twitch.tv/settings/subscriptions",
        logo: logo("twitch.tv"),
    },
    "paramount+": {
        cancelUrl: "https://www.paramountplus.com/account/cancel-subscription",
        logo: logo("paramountplus.com"),
    },
    "paramount plus": {
        cancelUrl: "https://www.paramountplus.com/account/cancel-subscription",
        logo: logo("paramountplus.com"),
    },
    "peacock": {
        cancelUrl: "https://www.peacocktv.com/account/plan",
        logo: logo("peacocktv.com"),
    },
    "crunchyroll": {
        cancelUrl: "https://www.crunchyroll.com/acct/membership",
        logo: logo("crunchyroll.com"),
    },

    // ──────────────── MENA Streaming ──────────────────────────────────
    "shahid": {
        cancelUrl: "https://shahid.mbc.net/en/widgets/manage-subscriptions",
        logo: logo("shahid.com"),
    },
    "shahid vip": {
        cancelUrl: "https://shahid.mbc.net/en/widgets/manage-subscriptions",
        logo: logo("shahid.com"),
    },
    "watch it": {
        cancelUrl: "https://watchit.com/settings/subscription",
        logo: logo("watchit.com"),
    },
    "watchit": {
        cancelUrl: "https://watchit.com/settings/subscription",
        logo: logo("watchit.com"),
    },
    "osn": {
        cancelUrl: "https://osnplus.com/my-account",
        logo: logo("osnplus.com"),
    },
    "osn+": {
        cancelUrl: "https://osnplus.com/my-account",
        logo: logo("osnplus.com"),
    },
    "osn plus": {
        cancelUrl: "https://osnplus.com/my-account",
        logo: logo("osnplus.com"),
    },
    "tod": {
        cancelUrl: "https://www.tod.tv/en/my-account",
        logo: logo("tod.tv"),
    },
    "tod tv": {
        cancelUrl: "https://www.tod.tv/en/my-account",
        logo: logo("tod.tv"),
    },
    "bein connect": {
        cancelUrl: "https://connect.bein.com/my-account",
        logo: logo("bein.com"),
    },
    "starzplay": {
        cancelUrl: "https://starzplay.com/settings/subscription",
        logo: logo("starzplay.com"),
    },
    "starz play": {
        cancelUrl: "https://starzplay.com/settings/subscription",
        logo: logo("starzplay.com"),
    },
    "yango play": {
        cancelUrl: "https://play.yango.com/support/en/subscription-payments/subscribe/cancellation",
        logo: logo("yango.com"),
    },
    "yango": {
        cancelUrl: "https://play.yango.com/support/en/subscription-payments/subscribe/cancellation",
        logo: logo("yango.com"),
    },
    "anghami": {
        cancelUrl: "https://www.anghami.com/manage-account",
        logo: logo("anghami.com"),
    },
    "anghami plus": {
        cancelUrl: "https://www.anghami.com/manage-account",
        logo: logo("anghami.com"),
    },
    "stc tv": {
        cancelUrl: "https://app.stctv.com/settings/subscription",
        logo: logo("stctv.com"),
    },
    "jawwy tv": {
        cancelUrl: "https://app.stctv.com/settings/subscription",
        logo: logo("stctv.com"),
    },
    "viu": {
        cancelUrl: "https://www.viu.com/ott/mena/en/my-account",
        logo: logo("viu.com"),
    },

    // ──────────────── Software, Cloud & Productivity ──────────────────
    "adobe": {
        cancelUrl: "https://account.adobe.com/plans",
        logo: logo("adobe.com"),
    },
    "adobe creative cloud": {
        cancelUrl: "https://account.adobe.com/plans",
        logo: logo("adobe.com"),
    },
    "microsoft 365": {
        cancelUrl: "https://account.microsoft.com/services",
        logo: logo("microsoft.com"),
    },
    "microsoft": {
        cancelUrl: "https://account.microsoft.com/services",
        logo: logo("microsoft.com"),
    },
    "office 365": {
        cancelUrl: "https://account.microsoft.com/services",
        logo: logo("microsoft.com"),
    },
    "github": {
        cancelUrl: "https://github.com/settings/billing",
        logo: logo("github.com"),
    },
    "github copilot": {
        cancelUrl: "https://github.com/settings/billing",
        logo: logo("github.com"),
    },
    "notion": {
        cancelUrl: "https://www.notion.so/profile/billing",
        logo: logo("notion.so"),
    },
    "slack": {
        cancelUrl: "https://app.slack.com/plans",
        logo: logo("slack.com"),
    },
    "zoom": {
        cancelUrl: "https://zoom.us/billing",
        logo: logo("zoom.us"),
    },
    "dropbox": {
        cancelUrl: "https://www.dropbox.com/account/plan",
        logo: logo("dropbox.com"),
    },
    "google one": {
        cancelUrl: "https://one.google.com/storage",
        logo: logo("google.com"),
    },
    "google workspace": {
        cancelUrl: "https://admin.google.com/ac/billing/subscriptions",
        logo: logo("google.com"),
    },
    "icloud": {
        cancelUrl: "https://support.apple.com/en-us/118428",
        logo: logo("apple.com"),
    },
    "icloud+": {
        cancelUrl: "https://support.apple.com/en-us/118428",
        logo: logo("apple.com"),
    },
    "chatgpt": {
        cancelUrl: "https://help.openai.com/en/articles/7232529",
        logo: logo("openai.com"),
    },
    "chat gpt": {
        cancelUrl: "https://help.openai.com/en/articles/7232529",
        logo: logo("openai.com"),
    },
    "openai": {
        cancelUrl: "https://help.openai.com/en/articles/7232529",
        logo: logo("openai.com"),
    },
    "claude": {
        cancelUrl: "https://support.anthropic.com",
        logo: logo("anthropic.com"),
    },
    "canva": {
        cancelUrl: "https://www.canva.com/settings/billing-and-plans",
        logo: logo("canva.com"),
    },
    "figma": {
        cancelUrl: "https://help.figma.com/hc/en-us/articles/360040328273",
        logo: logo("figma.com"),
    },
    "linear": {
        cancelUrl: "https://linear.app/settings/billing",
        logo: logo("linear.app"),
    },
    "vercel": {
        cancelUrl: "https://vercel.com/dashboard/billing",
        logo: logo("vercel.com"),
    },
    "aws": {
        cancelUrl: "https://aws.amazon.com/premiumsupport/knowledge-center/cancel-subscription",
        logo: logo("aws.amazon.com"),
    },
    "digitalocean": {
        cancelUrl: "https://cloud.digitalocean.com/account/billing",
        logo: logo("digitalocean.com"),
    },
    "heroku": {
        cancelUrl: "https://dashboard.heroku.com/account/billing",
        logo: logo("heroku.com"),
    },

    // ──────────────── Gaming ──────────────────────────────────────────
    "gamepass": {
        cancelUrl: "https://account.microsoft.com/services",
        logo: logo("xbox.com"),
    },
    "xbox game pass": {
        cancelUrl: "https://account.microsoft.com/services",
        logo: logo("xbox.com"),
    },
    "psn": {
        cancelUrl: "https://www.playstation.com/en-us/playstation-plus/",
        logo: logo("playstation.com"),
    },
    "playstation plus": {
        cancelUrl: "https://www.playstation.com/en-us/playstation-plus/",
        logo: logo("playstation.com"),
    },
    "nintendo switch online": {
        cancelUrl: "https://accounts.nintendo.com/profile/edit/",
        logo: logo("nintendo.com"),
    },
    "ea play": {
        cancelUrl: "https://www.ea.com/ea-play",
        logo: logo("ea.com"),
    },

    // ──────────────── Utilities & Security ───────────────────────────
    "nordvpn": {
        cancelUrl: "https://my.nordaccount.com/dashboard/nordvpn/",
        logo: logo("nordvpn.com"),
    },
    "expressvpn": {
        cancelUrl: "https://www.expressvpn.com/subscriptions",
        logo: logo("expressvpn.com"),
    },
    "1password": {
        cancelUrl: "https://my.1password.com/profile",
        logo: logo("1password.com"),
    },
    "lastpass": {
        cancelUrl: "https://lastpass.com/my/account.php",
        logo: logo("lastpass.com"),
    },
    "nordpass": {
        cancelUrl: "https://my.nordaccount.com/dashboard/nordpass/",
        logo: logo("nordpass.com"),
    },
    "malwarebytes": {
        cancelUrl: "https://my.malwarebytes.com/subscriptions",
        logo: logo("malwarebytes.com"),
    },
    "dashlane": {
        cancelUrl: "https://app.dashlane.com/settings/billing",
        logo: logo("dashlane.com"),
    },

    // ──────────────── E-commerce, Platforms & Others ─────────────────
    "shopify": {
        cancelUrl: "https://help.shopify.com/en/manual/your-account/pause-deactivate-store",
        logo: logo("shopify.com"),
    },
    "wix": {
        cancelUrl: "https://support.wix.com/en/article/canceling-your-premium-plan",
        logo: logo("wix.com"),
    },
    "squarespace": {
        cancelUrl: "https://account.squarespace.com/billing",
        logo: logo("squarespace.com"),
    },
    "grammarly": {
        cancelUrl: "https://account.grammarly.com/subscription",
        logo: logo("grammarly.com"),
    },
    "duolingo": {
        cancelUrl: "https://support.duolingo.com/hc/en-us/articles/4404745271565",
        logo: logo("duolingo.com"),
    },
    "linkedin premium": {
        cancelUrl: "https://www.linkedin.com/premium/manage",
        logo: logo("linkedin.com"),
    },
    "linkedin": {
        cancelUrl: "https://www.linkedin.com/premium/manage",
        logo: logo("linkedin.com"),
    },
    "deezer": {
        cancelUrl: "https://www.deezer.com/account/subscription",
        logo: logo("deezer.com"),
    },
    "tidal": {
        cancelUrl: "https://tidalhifi.com/account",
        logo: logo("tidal.com"),
    },
    "audible": {
        cancelUrl: "https://www.audible.com/hz/mycdlibrary/marketplaceCancellation",
        logo: logo("audible.com"),
    },
    "kindle unlimited": {
        cancelUrl: "https://www.amazon.com/kindle-dbs/submanager/manage",
        logo: logo("amazon.com"),
    },
    "jasper": {
        cancelUrl: "https://app.jasper.ai/settings/billing",
        logo: logo("jasper.ai"),
    },
    "midjourney": {
        cancelUrl: "https://www.midjourney.com/account",
        logo: logo("midjourney.com"),
    },
    "cursor": {
        cancelUrl: "https://www.cursor.com/settings",
        logo: logo("cursor.com"),
    },
};


export const getServiceInfo = (name: string): ServiceInfo | undefined =>
    POPULAR_SERVICES[name.toLowerCase().trim()];

export const getServiceLogo = (name: string): string | undefined =>
    getServiceInfo(name)?.logo;

export const getServiceCancelUrl = (name: string): string | undefined =>
    getServiceInfo(name)?.cancelUrl;
