import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const userInfo = {
    name: 'Nguyễn Văn A',
    phone: '0912345678',
    email: 'user@homecare.com',
    address: '123 Nguyễn Văn Cừ, Quận 5, TP.HCM',
    memberSince: 'Tháng 3, 2024',
    totalOrders: 28,
    loyaltyPoints: 1250,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  };

  const menuItems = [
    {
      id: 1,
      title: 'Thông tin cá nhân',
      icon: 'person-outline',
      color: COLORS.primary,
      onPress: () => Alert.alert('Thông báo', 'Tính năng đang được phát triển'),
    },
    {
      id: 2,
      title: 'Lịch sử đơn hàng',
      icon: 'time-outline',
      color: COLORS.info,
      onPress: () => navigation.navigate('Orders'),
    },
    {
      id: 3,
      title: 'Đánh giá của tôi',
      icon: 'star-outline',
      color: COLORS.secondary,
      onPress: () => navigation.navigate('Rating'),
    },
    {
      id: 4,
      title: 'Ưu đãi & Điểm thưởng',
      icon: 'gift-outline',
      color: COLORS.warning,
      onPress: () => Alert.alert('Điểm thưởng', `Bạn có ${userInfo.loyaltyPoints} điểm thưởng`),
    },
    {
      id: 5,
      title: 'Địa chỉ đã lưu',
      icon: 'location-outline',
      color: COLORS.error,
      onPress: () => Alert.alert('Thông báo', 'Tính năng đang được phát triển'),
    },
    {
      id: 6,
      title: 'Phương thức thanh toán',
      icon: 'card-outline',
      color: '#9C27B0',
      onPress: () => Alert.alert('Thông báo', 'Tính năng đang được phát triển'),
    },
  ];

  const supportItems = [
    {
      id: 1,
      title: 'Trung tâm hỗ trợ',
      icon: 'help-circle-outline',
      onPress: () => Alert.alert('Hỗ trợ', 'Hotline: 1900 xxxx'),
    },
    {
      id: 2,
      title: 'Điều khoản sử dụng',
      icon: 'document-text-outline',
      onPress: () => Alert.alert('Thông báo', 'Tính năng đang được phát triển'),
    },
    {
      id: 3,
      title: 'Chính sách bảo mật',
      icon: 'shield-checkmark-outline',
      onPress: () => Alert.alert('Thông báo', 'Tính năng đang được phát triển'),
    },
    {
      id: 4,
      title: 'Về chúng tôi',
      icon: 'information-circle-outline',
      onPress: () => Alert.alert('Home Care', 'Phiên bản 1.0.0\nDịch vụ chỉnh trang và sửa chữa tiện ích tại nhà'),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: () => navigation.replace('Login'),
        },
      ]
    );
  };

  const MenuItem = ({ item, showBorder = true }) => (
    <TouchableOpacity
      style={[styles.menuItem, !showBorder && styles.menuItemNoBorder]}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuItemIcon, { backgroundColor: `${item.color}15` }]}>
          <Ionicons name={item.icon} size={22} color={item.color} />
        </View>
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );

  const StatsCard = ({ title, value, icon, color }) => (
    <View style={styles.statsCard}>
      <View style={[styles.statsIcon, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsLabel}>{title}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with gradient */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={16} color={COLORS.textWhite} />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userPhone}>{userInfo.phone}</Text>
            <Text style={styles.memberSince}>Thành viên từ {userInfo.memberSince}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color={COLORS.textWhite} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <StatsCard
          title="Đơn hoàn thành"
          value={userInfo.totalOrders}
          icon="checkmark-circle"
          color={COLORS.success}
        />
        <StatsCard
          title="Điểm thưởng"
          value={userInfo.loyaltyPoints}
          icon="diamond"
          color={COLORS.secondary}
        />
        <StatsCard
          title="Đánh giá TB"
          value="4.8⭐"
          icon="star"
          color={COLORS.warning}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quản lý tài khoản</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.id}
              item={item}
              showBorder={index < menuItems.length - 1}
            />
          ))}
        </View>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cài đặt</Text>
        <View style={styles.menuContainer}>
          <View style={styles.settingItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuItemIcon, { backgroundColor: `${COLORS.info}15` }]}>
                <Ionicons name="notifications-outline" size={22} color={COLORS.info} />
              </View>
              <Text style={styles.menuItemText}>Thông báo</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: COLORS.gray300, true: COLORS.primaryLight }}
              thumbColor={notificationsEnabled ? COLORS.primary : COLORS.gray500}
            />
          </View>

          <View style={[styles.settingItem, styles.menuItemNoBorder]}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuItemIcon, { backgroundColor: `${COLORS.error}15` }]}>
                <Ionicons name="location-outline" size={22} color={COLORS.error} />
              </View>
              <Text style={styles.menuItemText}>Vị trí</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: COLORS.gray300, true: COLORS.primaryLight }}
              thumbColor={locationEnabled ? COLORS.primary : COLORS.gray500}
            />
          </View>
        </View>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hỗ trợ</Text>
        <View style={styles.menuContainer}>
          {supportItems.map((item, index) => (
            <MenuItem
              key={item.id}
              item={{
                ...item,
                color: COLORS.textSecondary,
              }}
              showBorder={index < supportItems.length - 1}
            />
          ))}
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Home Care v1.0.0</Text>
      </View>

      {/* Bottom Spacer */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: COLORS.textWhite,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.textWhite,
  },
  userInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  userName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textWhite,
  },
  userPhone: {
    fontSize: FONT_SIZES.md,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  memberSince: {
    fontSize: FONT_SIZES.sm,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginTop: -SPACING.lg,
    marginBottom: SPACING.lg,
  },
  statsCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: 4,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  statsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  statsValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statsLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  menuContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  menuItemNoBorder: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  menuItemText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  logoutText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.error,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  versionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});

export default ProfileScreen;