const express = require('express');
const router = express.Router();
const { tambahSiswa, ubahSiswa, hapusSiswa, cariSiswa } = require('../controller/authController');

// Rute untuk menambahkan siswa baru
router.post('/create', tambahSiswa);

// Rute untuk mengubah data siswa
router.put('/change/:id', ubahSiswa);

// Rute untuk menghapus data siswa
router.delete('/delete/:id', hapusSiswa);

// Rute untuk mencari siswa berdasarkan nama, kelas, atau id
router.get('/search', cariSiswa);

module.exports = router;