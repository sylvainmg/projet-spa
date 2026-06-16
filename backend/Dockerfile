FROM php:8.3-cli

# Extensions PHP nécessaires pour Laravel
RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite \
    && apt-get clean

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --optimize-autoloader --no-dev

RUN touch database/database.sqlite

RUN php artisan key:generate --force
RUN php artisan migrate --force

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]