const { Siswa } = require('../models');
const generateToken = require('../config/generateToken');
const { users } = require('../models');
const { errorResponse, successResponse, internalErrorResponse, notFoundResponse } = require('../config/responseJson');

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
        successResponse(res, 'Data siswa berhasil diubah', siswa, 200);

        const token = generateToken(users);
        successResponse(res, 'Logged in successfully', {
            user: userResponse,
            token
        }, 200);
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

// Fungsi untuk mencari siswa berdasarkan nama, kelas, atau id
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

module.exports = { tambahSiswa, ubahSiswa, hapusSiswa, cariSiswa };
