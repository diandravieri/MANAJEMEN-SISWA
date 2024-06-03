const { Siswa } = require('../models');
const { errorResponse, successResponse, internalErrorResponse, notFoundResponse } = require('../config/responseJson');
const { Sequelize } = require('sequelize');

async function tambahSiswa(req, res) {
    try {
        const { nama, alamat, kelas, nilai } = req.body;
        const siswaBaru = await Siswa.create({ nama, alamat, kelas, nilai });
        successResponse(res, 'Siswa berhasil ditambahkan', siswaBaru, 201);
    } catch (error) {
        internalErrorResponse(res, error);
    }
}

async function ubahSiswa(req, res) {
    try {
        const { id } = req.params;
        const { nama, alamat, kelas, nilai } = req.body;
        const siswa = await Siswa.findByPk(id);
        if (!siswa) {
            return notFoundResponse(res, 'Siswa tidak ditemukan');
        }
        siswa.nama = nama;
        siswa.alamat = alamat;
        siswa.kelas = kelas;
        siswa.nilai = nilai;
        await siswa.save();

        successResponse(res, 'Data siswa berhasil diubah', { siswa }, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
}

async function hapusSiswa(req, res) {
    try {
        const { id } = req.params;
        const siswa = await Siswa.findByPk(id);
        if (!siswa) {
            return notFoundResponse(res, 'Siswa tidak ditemukan');
        }
        await siswa.destroy();
        successResponse(res, 'Siswa berhasil dihapus', null, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
}

async function cariSiswa(req, res) {
    try {
        const { nama, kelas, id } = req.query;
        let kondisi = {};

        if (id) {
            kondisi.id = id;
        }
        if (nama) {
            kondisi.nama = nama;
        }
        if (kelas) {
            kondisi.kelas = kelas;
        }

        const siswa = await Siswa.findAll({ where: kondisi });

        if (siswa.length === 0) {
            return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan' });
        }

        res.json({ success: true, data: siswa });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Gagal mencari siswa' });
    }
}

async function statistikSiswa(req, res) {
    try {
        const siswaPerKelas = await Siswa.findAll({
            attributes: [
                'kelas',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'jumlahSiswa'],
                [Sequelize.fn('AVG', Sequelize.col('nilai')), 'rataRataNilai']
            ],
            group: ['kelas']
        });

        if (siswaPerKelas.length === 0) {
            return res.status(404).json({ success: false, message: 'Tidak ada data siswa ditemukan' });
        }

        res.json({ success: true, data: siswaPerKelas });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Gagal mengambil data statistik siswa' });
    }
}

async function tampilkanSeluruhSiswa(req, res) {
    try {
        const siswa = await Siswa.findAll();
        if (siswa.length === 0) {
            return res.status(404).json({ success: false, message: 'Tidak ada siswa ditemukan' });
        }
        res.json({ success: true, data: siswa });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Gagal mengambil data siswa' });
    }
}



module.exports = { tambahSiswa, ubahSiswa, hapusSiswa, cariSiswa, statistikSiswa, tampilkanSeluruhSiswa };
