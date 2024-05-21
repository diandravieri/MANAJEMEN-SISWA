const { Siswa } = require('../models/siswa');
// Contoh controller untuk membuat siswa baru
async function tambahSiswa(req, res) {
    console.log(req.body);
    try {
        const { nama, alamat, kelas, nilai } = req.body;
        const siswaBaru = await Siswa.create({ nama, alamat, kelas, nilai });
        res.status(201).json({ success: true, data: siswaBaru });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Gagal menambahkan siswa' });
    }
}

// Contoh controller untuk mengubah data siswa
async function ubahSiswa(req, res) {
    try {
        const { id } = req.params;
        const { nama, alamat, kelas, nilai } = req.body;
        const siswa = await Siswa.findByPk(id);
        if (!siswa) {
            return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan' });
        }
        siswa.nama = nama;
        siswa.alamat = alamat;
        siswa.kelas = kelas;
        siswa.nilai = nilai;
        await siswa.save();
        res.json({ success: true, data: siswa });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Gagal mengubah siswa' });
    }
}

// Contoh controller untuk menghapus data siswa
async function hapusSiswa(req, res) {
    try {
        const { id } = req.params;
        const siswa = await Siswa.findByPk(id);
        if (!siswa) {
            return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan' });
        }
        await siswa.destroy();
        res.json({ success: true, message: 'Siswa berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Gagal menghapus siswa' });
    }
}

module.exports = { tambahSiswa, ubahSiswa, hapusSiswa };