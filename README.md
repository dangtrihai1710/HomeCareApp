# Home Care App 🏠

Ứng dụng di động dành cho dịch vụ chỉnh trang và sửa chữa tiện ích tại nhà, được phát triển bằng React Native và Expo.

## 🎯 Giới thiệu

Home Care là nền tảng kết nối khách hàng với các thợ và đội nhóm thi công nhỏ lẻ, cung cấp đa dạng dịch vụ:
- Chỉnh trang khuôn viên
- Sửa chữa tại nhà
- Vệ sinh nhà cửa
- Lắp đặt thiết bị
- Tư vấn thiết kế

## 🛠 Công nghệ sử dụng

- **React Native** với Expo
- **Redux Toolkit** cho quản lý state
- **React Navigation** cho điều hướng
- **React Native Paper** cho UI components
- **AsyncStorage** cho lưu trữ dữ liệu local

## 📋 Yêu cầu hệ thống

- Node.js (phiên bản 18 trở lên)
- npm hoặc yarn
- Expo CLI
- Android Studio (cho Android) hoặc Xcode (cho iOS)

## 🚀 Hướng dẫn cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd HomeCareApp
```

### 2. Cài đặt dependencies

```bash
npm install
```

Hoặc sử dụng yarn:

```bash
yarn install
```

### 3. Cài đặt Expo CLI (nếu chưa có)

```bash
npm install -g @expo/cli
```

### 4. Khởi chạy ứng dụng

```bash
npm start
```

Hoặc:

```bash
expo start
```

### 5. Chạy trên thiết bị

- **iOS Simulator**: Nhấn `i` trong terminal
- **Android Emulator**: Nhấn `a` trong terminal
- **Web**: Nhấn `w` trong terminal
- **Thiết bị thật**: Quét QR code bằng Expo Go app

## 📦 Thư viện chính được sử dụng

### Dependencies chính

```json
{
  "@expo/vector-icons": "^14.1.0",
  "@react-native-async-storage/async-storage": "^2.1.2",
  "@react-navigation/bottom-tabs": "^7.3.13",
  "@react-navigation/native": "^7.1.9",
  "@react-navigation/stack": "^7.3.2",
  "@reduxjs/toolkit": "^2.8.2",
  "expo": "~53.0.9",
  "expo-linear-gradient": "~14.1.4",
  "react": "19.0.0",
  "react-native": "0.79.2",
  "react-native-paper": "^5.14.5",
  "react-redux": "^9.2.0"
}
```

### Giải thích các thư viện

| Thư viện | Mục đích |
|----------|----------|
| `@expo/vector-icons` | Icons cho ứng dụng |
| `@react-native-async-storage/async-storage` | Lưu trữ dữ liệu local |
| `@react-navigation/*` | Điều hướng giữa các màn hình |
| `@reduxjs/toolkit` | Quản lý state toàn cục |
| `expo-linear-gradient` | Tạo gradient cho UI |
| `react-native-paper` | UI components Material Design |
| `react-redux` | Kết nối Redux với React |

## 🏗 Cấu trúc dự án

```
src/
├── constants/
│   └── theme.js              # Định nghĩa màu sắc, font, spacing
├── navigation/
│   └── BottomTabNavigator.js # Điều hướng tab dưới
├── screens/
│   ├── auth/
│   │   └── LoginScreen.js    # Màn hình đăng nhập
│   ├── booking/
│   │   └── BookingScreen.js  # Màn hình đặt dịch vụ
│   ├── home/
│   │   └── HomeScreen.js     # Màn hình chính
│   ├── profile/
│   │   └── ProfileScreen.js  # Màn hình hồ sơ
│   └── rating/
│       └── RatingScreen.js   # Màn hình đánh giá
└── store/
    ├── index.js              # Cấu hình Redux store
    └── slices/
        ├── authSlice.js      # Quản lý xác thực
        ├── bookingSlice.js   # Quản lý đặt dịch vụ
        └── userSlice.js      # Quản lý thông tin người dùng
```

## 🎨 Màn hình chính

### 1. Màn hình đăng nhập
- Đăng nhập bằng số điện thoại
- Tích hợp đăng nhập social (Facebook, Google)
- Validation form

### 2. Màn hình chính
- Hiển thị dịch vụ
- Thống kê nhanh
- Khuyến mãi
- Đơn hàng gần đây

### 3. Màn hình đặt dịch vụ
- Form thông tin khách hàng
- Chọn dịch vụ cụ thể
- Tóm tắt đơn hàng
- Xác nhận đặt dịch vụ

### 4. Màn hình hồ sơ
- Thông tin cá nhân
- Cài đặt ứng dụng
- Thống kê người dùng
- Đăng xuất

### 5. Màn hình đánh giá
- Đánh giá dịch vụ
- Lịch sử đánh giá
- Hệ thống điểm thưởng

## ⚙️ Cấu hình

### Theme
File `src/constants/theme.js` chứa cấu hình:
- Màu sắc chủ đạo
- Kích thước font
- Spacing
- Border radius
- Shadows

### Redux Store
- **Auth Slice**: Quản lý trạng thái đăng nhập
- **User Slice**: Thông tin và cài đặt người dùng
- **Booking Slice**: Quản lý đặt dịch vụ

## 🔧 Scripts có sẵn

```bash
# Khởi chạy development server
npm start

# Chạy trên Android
npm run android

# Chạy trên iOS
npm run ios

# Chạy trên web
npm run web
```

## 📱 Build ứng dụng

### Development Build
```bash
eas build --profile development
```

### Production Build
```bash
eas build --profile production
```

## 🔒 Bảo mật

- Sử dụng AsyncStorage để lưu token
- Validation form đầu vào
- Xử lý lỗi API
- Bảo vệ các route cần xác thực

## 🐛 Debug và Testing

### Debug
- Sử dụng Flipper cho debug
- React Native Debugger
- Expo Dev Tools

### Logging
```javascript
console.log('Debug info');
console.warn('Warning message');
console.error('Error message');
```

## 📝 Lưu ý quan trọng

1. **Expo SDK**: Ứng dụng sử dụng Expo SDK 53
2. **React Native**: Phiên bản 0.79.2
3. **Node.js**: Yêu cầu Node.js 18+
4. **Platform**: Hỗ trợ iOS, Android và Web

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

Dự án này được phát triển cho mục đích học tập và nghiên cứu.

## 📞 Liên hệ

- **Tên dự án**: HOME CARE
- **Đơn vị**: Viện Khoa học Ứng dụng - HUTECH
- **Cuộc thi**: HUTECH STARTUP WINGS 2025

## 🔄 Changelog

### v1.0.0
- Phiên bản đầu tiên
- Tính năng đăng nhập
- Đặt dịch vụ cơ bản
- Đánh giá dịch vụ
- Quản lý hồ sơ người dùng

---

*Được phát triển với ❤️ bởi nhóm Home Care*
