FROM ruby:3.4.6-slim AS builder

RUN apt update && \
  apt install -y \
  build-essential \
  libyaml-dev \
  libpq-dev \
  && apt clean && rm -rf /var/lib/apt/lists/*

RUN gem install bundler
COPY Gemfile Gemfile.lock ./
ENV RAILS_ENV=production
RUN RAILS_ENV=${RAILS_ENV} bundle install

FROM ruby:3.4.6-slim AS app

RUN apt update && \
  apt install -y \
  tzdata \
  postgresql-client \
  && apt clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /usr/local/bundle /usr/local/bundle
COPY . .

CMD ["sh", "entrypoint.sh"]
