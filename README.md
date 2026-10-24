# Xiosmp Friday Realm

Create a fully responsive, highly interactive, and visually stunning Minecraft server landing page website for "XioSMP" from scratch.



### 1. Branding & Logo Guidelines:

- Server Name: XioSMP

- Server IP: play.xiosmp.my.id

- Server Port: 2005

- WhatsApp Community Link: https://chat.whatsapp.com/LTwApaOweO020WmiUeh9wq

- Logo Styling: Use the uploaded XioSMP logo image. Display it compactly in the header and hero section (max-width 160px - 200px on mobile). DO NOT use a heavy background card/box container around the logo; instead, let it blend naturally with a subtle glowing neon purple drop-shadow.

- Typography Fix: Ensure proper spacing in headings, especially "SMP Terbaik & Paling Seru!" (no merged words).



### 2. Visual & UI Theme (Skeuomorphism Style):

- Style: Skeuomorphism mixed with fantasy Minecraft aesthetics. Use rich 3D textures, bevels, subtle drop shadows, and inner glowing neon effects.

- Color Palette (Strictly matched to the logo):

  * Primary: Electric Neon Purple / Crystal Violet (#9D00FF, #8A2BE2)

  * Secondary: Dark Obsidian Stone (#1A1A24, #12121A)

  * Accent: Emerald / Moss Green details (#2ECC71) & Glowing Cyan.

- Background: Atmospheric dark fantasy sky with floating islands and glowing purple crystals.



### 3. Header & Hero Section:

- Top Navigation: Logo, Quick Nav Links (Home, Status, Players, Rules, Feedback), and a styled WhatsApp community button.

- Hero Content: Subtitle "Petualangan Survival SMP Terbaik & Paling Seru!", description, and an interactive 3D Skeuomorphic IP Box with "CLICK TO COPY IP & PORT" functionality (copying `play.xiosmp.my.id:2005` with instant toast notification).

- BANSOS COUNTDOWN TIMER: An interactive live countdown timer counting down to every Friday at 19:00 WIB (7 PM). *Important: Implement client-side mounting (`useEffect`/`isMounted`) to prevent React Hydration Mismatch errors.*



### 4. REAL-TIME Minecraft Server Status & Player List:

- API Integration: Fetch live server data from reliable public API (`https://api.mcsrvstat.us/3/play.xiosmp.my.id:2005`).

- Auto-Refresh: Implement background polling (every 10 seconds) so online status and online players update in real-time without page reloads.

- Compact Online Player Cards: Display active online players in a clean, compact grid/list layout with small avatars (via Crafatar/Visage), small usernames, and minimal vertical padding so it doesn't take up excessive scrolling space. If 0 players online, show 0 cleanly.



### 5. Server Rules Section:

- Interactive Rules Card/Accordion listing core server rules clearly (e.g., Dilarang Griefing, Dilarang Cheating/X-Ray, Jaga Sopan Santun).



### 6. Supabase Database Integration (No Fake Hardcoded Data):

- Prepare clean Supabase client setup templates (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`).

- Registered Players Counter: Fetch dynamically from Supabase table `registered_players`. Show loader/empty state if unconfigured instead of fake numbers.

- Server Rating & Review System: Interactive 1-5 star rating form and comment submission sending data to Supabase table `reviews`. Display review list.

- Community Feedback & Feature Recommendation ("Keluh Kesah & Rekomendasi Fitur"): Interactive form with category selection ("Keluh Kesah" vs "Rekomendasi Fitur") saving directly to Supabase table `community_feedback`.



### 7. Responsiveness & Performance:

- Fully optimized for Mobile, Tablet, and Desktop screens with smooth animations, neon glow hover effects, a

nd tactile skeuomorphic button states.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://xiosmp-friday-realm.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4ed99037-0769-4819-88a7-b743139b5eb4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
