IRONLOG — TWO-PROFILE WORKOUT TRACKER

WHAT'S INCLUDED
- index.html: the complete app (no external libraries or accounts required)
- manifest.webmanifest: installs as a home-screen web app
- sw.js: offline caching once hosted and opened online
- icon-192.png and icon-512.png: app icons for iPhone and Android
- Technique guides: short offline cues for all scheduled exercises
- Video demos: YouTube search links for each exercise (requires internet)

YOUR WORKOUT PROGRAM
Monday: Lower Body A (squats)
Tuesday: Upper Body A (bench press)
Wednesday: Light forearms, wrists and abs (no scheduled cardio)
Thursday: Lower Body B (hack squats)
Friday and Saturday: Rest
Sunday: Upper Body B (overhead press, dumbbell shrugs)
No deadlifts or Romanian deadlifts.

HOW TO INSTALL ON AN IPHONE (RECOMMENDED)
1. Unzip the IronLog-PWA.zip file.
2. Upload the entire contents of the ironlog_app folder to an HTTPS static website
   (for example, use a static web hosting service's drag-and-drop deployment).
   Preserve the file structure so index.html and sw.js remain at the root.
3. Open the resulting https:// website URL in Safari on your iPhone.
4. Tap Share > Add to Home Screen > Add.
5. Launch IronLog from the icon. Once opened online, it should also work offline.

HOW TO INSTALL ON ANDROID
1. Host the folder as described above.
2. Open the HTTPS link in Chrome.
3. Open the Chrome menu and tap Install app or Add to Home screen.

DESKTOP / ANDROID QUICK PREVIEW
You can open index.html directly in a browser. However, local file:// operation,
especially on iOS, may not support installation or reliable long-term data saving.
Hosting over HTTPS is recommended for regular use.

HOW TO UPDATE YOUR ALREADY INSTALLED IRONLOG
1. In your old IronLog, open More > Export backup as a precaution.
2. Deploy the NEW ZIP to the SAME hosting site/URL as the earlier version.
3. Refresh the site, or reopen the home-screen app. It may take an extra refresh
   for the new offline cache to activate.
4. Logs remain if the origin and storage are unchanged; if you instead use a new
   website URL or new installation, More > Import backup restores saved logs.

YOUR DATA
- Your workout logs are stored locally in that browser/app installation.
- They are NOT automatically synced between devices or browsers.
- Open More > Export backup regularly, and keep the .json backup somewhere safe.
- More > Import backup restores a previously exported backup, overwriting the
  current local log.
- Clearing Safari/site data or removing the installed app may delete local logs.

NOTES
- Video buttons search YouTube for exercise demonstrations; they do not open
  one specific vetted video. Online videos may be blocked by mobile network
  restrictions or browser content settings.
- Technique guides are general instruction, not a substitute for coaching.
The app is a Progressive Web App (PWA), not an App Store/iOS .ipa or Android .apk.
For gym training, start with a light, technically controlled weight and increase
load only when all prescribed reps can be done with good technique.


TWO PROFILES (v2.6)
Use the My profile / Girlfriend selector above the workout. Each profile has an independent training program, workout notes, progress charts, and backup file. Your existing data stays under the original ironlog_strength_v1 key. Girlfriend sessions start empty under ironlog_girlfriend_v1. Both use Friday and Saturday rest days.
Girlfriend plan: Monday legs/glutes A; Tuesday chest/back; Wednesday abs/core/cardio; Thursday legs/glutes B; Friday/Saturday rest; Sunday upper body and cardio. No direct shoulder isolation.
Each profile must be backed up separately through More > Export backup. Older IronLog backups without a profile tag belong to My profile. No automatic sync between phones or installed web apps.


SHARED FOUR-DAY PLAN (v2.8)
Both Modestas and Goda train Monday, Wednesday, Thursday and Sunday. Tuesday, Friday and Saturday are rest days.
Modestas: Monday Legs (10 working sets, reduced for recovery); Wednesday Upper Body A (no hammer curls); Thursday Biceps, Forearms & Abs; Sunday Upper Body B (no extra direct biceps/forearm lifts). His strength goal remains unchanged.
Goda: Monday Glutes & Legs A; Wednesday Chest & Back with Dead Bug and a short incline walk; Thursday Glutes & Legs B plus cable crunches; Sunday Upper Body & Cardio. No shoulder isolation; two glute days retained.
Original profile storage keys and both color themes remain unchanged; past workout logs are preserved and can still be exported/imported separately.


ONE-OFF EASY LEGS (v2.9)
Only Friday, November 27, 2026 has a bonus leg workout for Modestas. His weekly Friday rest day remains unchanged on all other dates. This bonus workout is Leg Extension 2x12–15, Seated Leg Curl 2x12–15, Seated Calf Raise 2x12–15, followed by Easy Stationary Bike 10–15 minutes. Light effort with 3–4 reps left in reserve, skip if significantly sore. It is date-bound and individually loggable; past sessions and backups are preserved. Goda's routine and pink theme are untouched.


WEDNESDAY CHEST UPDATE (v3.0)
Modestas Upper Body A (Wednesday) now includes Single-Arm Cable Fly 2 sets of 12–15 repetitions per arm, after Triceps Pushdown. Keep the weight light, train both arms separately for each set, log the resistance on the cable stack, and stop if shoulder pain occurs. Other Modestas days, the one-off Friday 2026-11-27 legs, Goda's routine, localStorage keys, and both profile color themes are unchanged.
