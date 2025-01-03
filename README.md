<a href="">
  <h1 align="center">EdTech Platform for K-12 & University Students</h1>
</a>

## IMAGES OF PLATFORM

<img alt="EdTech Platform Preview" src="./example_video.png">
<img alt="EdTech Platform Preview" src="./example_home.png">
<img alt="EdTech Platform Preview" src="./landing_page.png">

<p align="center" style="font-family: 'Outfit';">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#design-overview"><strong>Design Overview</strong></a> ·
  <a href="#setup-and-run"><strong>Setup and Run</strong></a>
</p>
<br/>

## NOTES:

- EMAIL CONFIRMATION IS DISABLED FOR THE PURPOSE OF TESTING
- Currently, only youtube links work natively (copy pasting directly from url), others could added, but would need added support, for platforms outside youtube, please provided an embeded url.

## Features

- Intuitive video interface inspired by familiar platforms like YouTube, to allow younger students to have a familar UI/UX while using the platform.
- User-centric design for younger audiences:
  - ESL-friendly navigation with icons
  - Buttons optimized for touch devices
  - Minimalist layout to focus on content
  - Buttons designed to be responsive and engaging for younger audiences
- Responsive design for seamless use across:
  - Desktop and laptops
  - Tablets
  - Smartphones
- Modern and approachable typography using:
  - **Main font:** Atkinson Hyperlegible
  - **Secondary font:** Outfit
- Built using:
  - **Frontend:** Next.js, TailwindCSS
  - **Backend:** FastAPI
- Full Software Capabilities:
  - Fully integrated authentication system
  - Landing page, Profile Page, etc.

## Design Overview

The platform is designed to foster an engaging, professional, and approachable learning environment:

### Visual Design

- **Primary color:** #2D8086 (teal) for a calm and inviting atmosphere
- **Secondary color:** #171717 (black) for clear visual hierarchy
- **Typography:** Simple, modern fonts (Atkinson Hyperlegible and Outfit) with no capital letters, to give the platform a more fun & playful feel for younger students.

### User Interface

- Buttons and navigation elements are positioned for accessibility on touch devices, considering the motor skills of younger students.
- Extensive use of icons to support ESL students and enhance usability.
- Minimalist design reduces distractions and keeps the focus on educational content.

### Responsive Design

The platform adjusts effortlessly to various devices and environments:

- Desktop and laptops for in-class use
- Tablets for interactive learning
- Smartphones for on-the-go access

## Setup and Run

To set up and run the platform locally:

1. Clone the repository to your machine:
   ```bash
   git clone [REPOSITORY_URL]
   ```
2. cd [PROJECT_DIRECTORY]
3. Set up the .env.local file using the information sent via email.
4. npm install & npm run dev
5. cd api & run: uvicorn index:app --reload
6. The platform should now be running locally and accessible at http://localhost:3000.
