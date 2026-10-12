# Innocent Phiri — ICT251 Activity 3 starter

A responsive personal learning portfolio based on the original Activity 2 website. It keeps the original identity and core topics (welcome, About Me, three hobbies, photos and introduction video) and adds the Activity 3 learning plan/table, brief audio introduction, projects/skills, contact validation/preview and interactive features.

## Project structure

- `index.html` — semantic page content
- `css/styles.css` — responsive design and theme variables
- `js/script.js` — JavaScript features
- `images/` — add the three original photos here
- `videos/` — add the original video and your brief audio recording here

## Add your original media

Copy your Activity 2 files into this project's folders:
- `images/profile.PNG`
- `images/coding.PNG`
- `images/hobby.PNG`
- `videos/introduction.MOV`

Record a short 20–45 second audio introduction and save/export it as:
- `videos/brief-introduction.mp3`

The browser may not play every MOV file. If the video does not play, convert it to MP4 (H.264), then update the `<source>` in `index.html` to `videos/introduction.mp4` with `type="video/mp4"`.

## JavaScript features

1. Contact form validation and on-page preview (compulsory). It validates name, email and message, rejects whitespace-only name/message, and does not send data.
2. Theme switch (dark/light).
3. Project search/filter with reset and no-results message.
4. Gallery Previous/Next viewer with wrap-around behaviour.
5. Mobile navigation menu.

## Test locally

1. Open the project folder in VS Code.
2. Install/use the Live Server extension.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Test at 375px and 1280px widths.
5. Test the contact form with empty fields, spaces-only name/message, invalid email and valid values.
6. Test project search with a matching keyword and a word that matches nothing.
7. Test gallery Previous/Next repeatedly, the theme switch and mobile menu.
8. Check that all three images and both media files load. Open browser Developer Tools > Console and fix any errors.

## GitHub and Render

Push the contents of this folder to the root of your GitHub repository so `index.html` is at the repository root. Update the footer's GitHub link in `index.html` to your actual repository URL before publishing.

For Render Static Site:
- Root Directory: leave blank
- Build Command: `echo "No build required"`
- Publish Directory: `.`
- Auto Deploy: enabled

After deploying, open the public HTTPS Render URL and repeat the tests. Make a small improvement, commit and push it, then confirm Render updates automatically.

## Personalise before submission

Rewrite any wording that does not accurately describe you, add your own media, update the GitHub source link, and make sure you understand the JavaScript you submit. Do not publish student numbers or other private details in a public portfolio.
