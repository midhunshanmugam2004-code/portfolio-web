# Midhun Shanmugam — DevOps Portfolio

A responsive personal portfolio highlighting Midhun's DevOps and AWS experience, technical skills, projects, education, and contact information.

## Features

- Responsive hero and navigation with a mobile menu
- About, DevOps/AWS skills, experience, projects, education, and contact sections
- Resume download and GitHub profile link
- Contact form powered by EmailJS
- Glacier-inspired colors and custom Outfit / Space Grotesk typography

## Docker

Build and run the static site locally:

```sh
docker build -t portfolio-web ./web-app
docker run --rm -p 8080:8080 portfolio-web
```

Then open `http://localhost:8080`.

## Publish with GitHub Actions and Docker

The workflow at `.github/workflows/deploy-web-app.yml` builds the Docker image and publishes it to GitHub Container Registry (GHCR) whenever changes to `web-app/` are pushed to `main`. You can also start it manually from the repository's **Actions** tab.

No custom Actions secrets are needed. The workflow uses GitHub's built-in `GITHUB_TOKEN`; make sure Actions has permission to write packages under **Settings → Actions → General → Workflow permissions**.

The published image is `ghcr.io/<owner>/<repository>:latest` (plus a commit-specific tag). After the first run, you can change package visibility in the repository's **Packages** settings if the image should be public.

To run the published image on a Docker host:

```sh
docker pull ghcr.io/<owner>/<repository>:latest
docker run -d --name portfolio -p 80:8080 --restart unless-stopped ghcr.io/<owner>/<repository>:latest
```

This workflow builds and publishes the image; it does not start or manage a production server. A Docker host is required to run the published container.

## Built with

- HTML
- CSS
- JavaScript and jQuery
- EmailJS
- Font Awesome

## Run locally

Open `index.html` in a browser, or serve this folder with any static web server.

The contact form uses the EmailJS service and template configured in `script.js`. The EmailJS template must be configured to deliver messages to the intended recipient.
