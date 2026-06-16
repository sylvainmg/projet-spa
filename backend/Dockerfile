FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite \
    && apt-get clean

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --optimize-autoloader --no-dev

# Créer le .env depuis .env.example
RUN cp .env.example .env

# Mettre à jour les variables nécessaires
RUN sed -i 's/APP_ENV=local/APP_ENV=production/' .env \
    && sed -i 's/APP_DEBUG=true/APP_DEBUG=false/' .env \
    && sed -i 's/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/' .env \
    && sed -i 's/DB_HOST=127.0.0.1/# DB_HOST=/' .env \
    && sed -i 's/DB_PORT=3306/# DB_PORT=/' .env \
    && sed -i 's/DB_DATABASE=projet_spa/# DB_DATABASE=/' .env \
    && sed -i 's/DB_USERNAME=root/# DB_USERNAME=/' .env \
    && sed -i 's/DB_PASSWORD=/# DB_PASSWORD=/' .env

RUN touch database/database.sqlite

RUN php artisan key:generate --force
RUN php artisan migrate --force

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]