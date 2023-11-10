FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/*

ADD nginx.conf /etc/nginx/conf.d/song-list.conf

CMD /usr/sbin/nginx -g 'daemon off;'
