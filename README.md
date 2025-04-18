# Movie API — Mission Backend

REST API sederhana menggunakan Node.js, Express, dan PostgreSQL.

##Endpoint

#GET

- `/api/movies` — Ambil semua movie
- `/api/movie/:id` — Ambil movie by ID

#POST

- `/api/movie` — Tambah movie baru
  ```json
  {
  	"title": "Mariposa",
  	"description": "The story in Mariposa begins when a female character named Natasha Kay Loovi (Acha) meets Iqbal Guanna Freedy (Iqbal) at an Olympic training camp. ",
  	"duration": "02:49:00",
  	"release_date": "2014-11-07",
  	"genre_id": 4,
  	"rating": 8
  }
  ```

#PATCH
/api/movie/:id — Update sebagian data movie
Body:

```json

  {
  "title": "Updated Title"
  }


#GET
/api/movie/:id — Hapus movie by ID



##Setup
1. Clone repo
2. Jalankan npm install
3. Buat .env:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=zainul09
DB_NAME=streaming_service
DATABASE_URL=postgres://postgres:zainul09@localhost:5432/streaming_service
PORT=3000

4. Jalankan npm start


```
