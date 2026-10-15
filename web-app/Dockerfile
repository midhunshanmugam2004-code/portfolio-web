FROM nginxinc/nginx-unprivileged:1.27-alpine

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html style.css script.js ./
COPY images/ ./images/
COPY resume/ ./resume/

EXPOSE 8080
