FROM ruby:3.1.2-alpine as builder

RUN apk update && \
  apk add --no-cache \
  build-base \
  postgresql-dev

RUN gem install bundler
COPY Gemfile Gemfile.lock ./
ENV RAILS_ENV=production
RUN RAILS_ENV=${RAILS_ENV} bundle install

FROM ruby:3.1.2-alpine as app

RUN apk update && \
  apk add --no-cache \
  tzdata \
  postgresql-client

WORKDIR /app

COPY --from=builder /usr/local/bundle /usr/local/bundle
COPY . .

CMD ["sh", "entrypoint.sh"]
