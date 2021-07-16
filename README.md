# Kanban_Apps
Disini saya membuat Web Apps bernama Kanban Apps, yang dimana saya membuatnya secara Fullstack dari :
- Back End :
    - Database (postgres)
    - Server Api
- Front End : 
    - Custom Desain Ant-Design
    - framewrok react js
    - SPA (Single Page Application)

## Framework and Package
### Back End
- express
- pg
- sequelize
- sequelize-cli
- jsonwebtoken
- bcryptjs
- cors
- dotenv

### Front End
- react js
- antd
- moment js
- node-sass
- react-dom
- react-router
- react-router-dom

## Task
Buatlah aplikasi Kanban menggunakan client-server model dengan spesifikasi sebagai berikut :

- Release 0 :
    - Membuat routes sesuai standar REST API

    - Res Status
        - Jika berhasil res.status 201 dan mengembalikan res.body data object
        - Jika gagal karena validasi maka res.status 400, dan respon body nya berupa object yang berisikan validation errors
        - Jika req gagal karena kesalahan server maka res.status sesuaikan dengan kesalahanya masing - masing
    
- Release 1 :
    - Menampilkan semua data dari TODO
        - Jika berhasil kembalikan res.status 200, dan res.body nya array of object dari semua data Kanban
        - Jika gagal, res.status disesuaikan dengan error handling
        - Untuk melihat daftar Task tidak perlu Login dulu, ketika API diakses maka bisa langsung bisa didapatkan semua data

- Release 2 :
    - Menampilkan detail Task KANAN berdasarkan ID 
        - Jika berhasil res.status 200, dan res.body data TODO berdasarkan ID yang diinputkan
        - Jika gagal, res.status disesuaikan dengan error handling

- Release 3 :
    - Add Task
        - Endpoint (WAJIB VALIDASI)
            - title
            - category
            - due_date (tidak bisa melewati hari yg kemarin)
        - Jika berhasil res.status 201
        - Data task didapatkan dari body yang diinputkan
        - Untuk tanggap tidak boleh mengambil tanggal yang telah dilewati hari ini
        - Jika gagal, res.status disesuaikan dengan error handling


- Release 4 :
    - Mengedit data Task Kanban
        - Endpoint (WAJIB VALIDASI)
            - title
            - category
            - due_date (tidak bisa melewati hari yg kemarin)
        
        - Res Status
            - Jika berhasil res.status 201, dan res.body data yang berhasil di update
            - Jika gagal, res.status disesuaikan dengan error handling
        
        - Data task didapatkan dari body yang diinputkan
        - Untuk tanggap tidak boleh mengambil tanggal yang telah dilewati hari ini
    
- Release 5 :
    - Menghapus data Task Kanban
        - Keluarkan notif confirm ketika akan menghapus pesan
        - Jika gagal, res.status disesuaikan dengan error handling

- Release 6 :
    - Buatlah error handling untuk semua error
    - Untuk register akun baru, data password yang dibalikkan ke database sudah harus di `HASH` 

# Getting Started
Hal yang perlu dilakukan untuk memulai Aplikasi Web :

- Pastikan di komputer kamu telah terinstal Postgres
- clone this repository
- cd Fancy-Todo-s
- Back End : 
    - Masuk ke folder server
    - npm install
    - Masuk ke folder config, lalu ubah settingan sesuai dengan di laptop / komputer kamu
        ```JavaScript
            "development": {
                "username": "postgres",
                "password": "postgres",
                "database": "git_kanban_apps",
                "host": "localhost",
                "dialect": "postgres"
            },
        ```
    - npx sequelize db:create
    - npx sequelize db:migrate
    - git checkout -b yourbranch
    - npx nodemon app.js
    - Kamu bisa jalankan program di http://localhost:3000/, untuk testing server bisa menggunakan postman, silahkan pelajarai postman di internet. Jika tidak ingin testing juga tidak masalah.

- Front End :
    - Masuk ke folder Client
    - Yarn install (intall yarn secara global dulu jika baru pertama kali menggunakan YARN, panduan bisa cek di google)
    - Program akan berjalan di port yang telah disesuaikan
    - Selamat menjalankan DEMO Program 