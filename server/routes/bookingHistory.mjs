import express from 'express';
import { getBookingHistory, getBookingHistoryDetail, postReport, postReviwes, updateBookingHistory } from '../controllers/bookingHistory.mjs';
import { protect } from '../middlewares/protect.mjs'; // Middleware สำหรับการ authenticate

const router = express.Router();

router.get('/', [protect], getBookingHistory); // เส้นทางสำหรับดึงข้อมูลการจองทั้งหมด
router.get('/:bookingId', [protect], getBookingHistoryDetail); // เส้นทางสำหรับดึงข้อมูลการจองเฉพาะ bookingId

router.put('/update-booking', [protect], updateBookingHistory);

router.post('/review', postReviwes) //สร้าง review&rating
router.post('/report', postReport) //สร้าง report

export default router;
