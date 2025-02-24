# CodeTimer

**CodeTimer** is a minimalist Pomodoro timer designed for developers. Enjoy a distraction‐free focus experience with a sleek circular progress ring, customizable sessions, keyboard shortcuts and a beautiful dark/light mode.

**Desktop Integration:**\
Built with Tauri, CodeTimer isn’t just a web app—it runs as a native desktop application on macOS and Windows! With a dedicated full-window mode and a compact, draggable mini mode, it integrates seamlessly into your workflow. Native notifications and precise window management ensure you stay on track, whether you're coding or multitasking.

## Features

- Customizable Sessions: Set tailored work, break, and long break intervals.
- Progress Ring: Intuitive, animated circular indicator for session progress.
- Keyboard Shortcuts: Quick controls (Space for Start/Pause, R to reset, S for settings, D for theme, M for mini mode).
- Theme Support: Enjoy seamless dark/light modes with persistent preferences.
- Desktop App: Run as a native app via Tauri with full and mini modes, native notifications, and efficient window management.

## Tech Stack

- **Next.js (with TypeScript & React):** Delivers a fast, modern, and scalable user interface.
- **Tailwind CSS:** Provides a clean, responsive design using utility-first styling.
- **Tauri:** Packages the web app as a lightweight native desktop application, enabling native window controls, notifications, and cross-platform support.

## Getting Started

1. **Clone the Repository**

```bash
git clone git@github.com:FilipsMasolovs/code-timer.git
cd code-timer
```

2. **Install Dependencies**

```bash
npm install
# or
pnpm install
```

3. **Run in Browser**

```bash
npm run dev
# or
pnpm run dev
```

4. **Run as desktop App**

```bash
npm run tauri dev
# or
pnpm run tauri dev
```

You can build the app for production for both browser and desktop, but you may need to go through some bugs.

The production artifacts (installers) will be generated in the Tauri output directory. Test your app on the target platform (macOS or Windows) and enjoy a native productivity experience.