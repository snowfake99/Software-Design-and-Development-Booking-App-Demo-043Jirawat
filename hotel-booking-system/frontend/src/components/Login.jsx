import React, { useState } from 'react';
// Import useNavigate hook จาก react-router-dom สำหรับการเปลี่ยนหน้าใน React application
// เช่น การ redirect ไปยังหน้าอื่นหลังจาก login สำเร็จ
import { useNavigate } from 'react-router-dom';

// Import axios library สำหรับทำ HTTP requests ไปยัง API
// ใช้สำหรับเรียก API เช่น การส่งข้อมูล login ไปยัง server หรือการดึงข้อมูลจาก server
import axios from 'axios';
import { useAuth } from '../../../../src/contexts/AuthContext';

const Login = () => {
// Hook สำหรับการนำทางไปยังหน้าต่างๆ
const navigate = useNavigate();

// Hook สำหรับการจัดการ Authentication จาก Context
const { login } = useAuth();

// State สำหรับเก็บข้อมูลฟอร์มล็อกอิน
const [formData, setFormData] = useState({
    username: '',
    password: ''
});

// State สำหรับเก็บข้อความ error
const [error, setError] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();  // ป้องกันการ refresh หน้า
    setError('');       // ล้างข้อความ error เดิม
    try {
        // ส่งข้อมูลไปยัง API เพื่อล็อกอิน
        const response = await axios.post('http://localhost:3001/api/login', formData);

        // เก็บข้อมูลผู้ใช้และ token ผ่าน Context
        login(response.data.user, response.data.token);

        // นำทางไปยังหน้า admin
        navigate('/admin');
    } catch (err) {
        // จัดการกรณีเกิดข้อผิดพลาด
        setError(err.response?.data?.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-20">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">เข้าสู่ระบบ</h2>
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">ชื่อผู้ใช้:</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">รหัสผ่าน:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;