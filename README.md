# outsource-service

* server-api - server side
* www-ui - client side

## nginx config

```
upstream  ui {
    server   127.0.0.1:1401;
}

upstream  api {
    server   127.0.0.1:1400;
}

server {
    listen       1480;
    server_name  localhost;

    # Proxy Headers
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;

    # Proxy Settings
    proxy_redirect off;
    proxy_buffering off;

    # UI
    location / {
        proxy_pass http://ui;
    }

    # API
    location /api/ {
        proxy_pass http://api/;
    }
}
```
