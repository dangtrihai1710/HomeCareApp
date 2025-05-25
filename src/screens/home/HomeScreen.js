import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState('Nguyễn Văn A');

  const services = [
    {
      id: 1,
      title: 'Chỉnh trang khuôn viên',
      icon: 'leaf-outline',
      color: '#4CAF50',
      bgColor: '#E8F5E8',
      route: 'ServiceDetail',
      params: { serviceType: 'decor' }
    },
    {
      id: 2,
      title: 'Sửa chữa tại nhà',
      icon: 'construct-outline',
      color: '#FF9800',
      bgColor: '#FFF3E0',
      route: 'ServiceDetail',
      params: { serviceType: 'repair' }
    },
    {
      id: 3,
      title: 'Vệ sinh nhà cửa',
      icon: 'sparkles-outline',
      color: '#2196F3',
      bgColor: '#E3F2FD',
      route: 'ServiceDetail',
      params: { serviceType: 'cleaning' }
    },
    {
      id: 4,
      title: 'Lắp đặt thiết bị',
      icon: 'settings-outline',
      color: '#9C27B0',
      bgColor: '#F3E5F5',
      route: 'ServiceDetail',
      params: { serviceType: 'installation' }
    },
    {
      id: 5,
      title: 'Tư vấn thiết kế',
      icon: 'person-outline',
      color: '#FF5722',
      bgColor: '#FBE9E7',
      route: 'ServiceDetail',
      params: { serviceType: 'consultation' }
    },
    {
      id: 6,
      title: 'Dịch vụ khác',
      icon: 'apps-outline',
      color: '#607D8B',
      bgColor: '#ECEFF1',
      route: 'ServiceDetail',
      params: { serviceType: 'others' }
    }
  ];

  const promotions = [
    {
      id: 1,
      title: '🎉 Khuyến mãi đặc biệt',
      description: 'Giảm 20% cho khách hàng mới. Áp dụng từ nay đến cuối tháng!',
      color: COLORS.secondary,
    },
    {
      id: 2,
      title: '⚡ Flash Sale',
      description: 'Miễn phí vận chuyển cho đơn hàng trên 500.000đ',
      color: COLORS.error,
    },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleServicePress = (service) => {
    if (service.route === 'ServiceDetail') {
      navigation.navigate('Booking', service.params);
    } else {
      Alert.alert('Thông báo', `Bạn đã chọn dịch vụ: ${service.title}`);
    }
  };

  const ServiceCard = ({ service }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => handleServicePress(service)}
      activeOpacity={0.7}
    >
      <View style={[styles.serviceIconContainer, { backgroundColor: service.bgColor }]}>
        <Ionicons name={service.icon} size={32} color={service.color} />
      </View>
      <Text style={styles.serviceTitle}>{service.title}</Text>
    </TouchableOpacity>
  );

  const PromotionCard = ({ promotion }) => (
    <View style={[styles.promotionCard, { backgroundColor: promotion.color }]}>
      <Text style={styles.promotionTitle}>{promotion.title}</Text>
      <Text style={styles.promotionDescription}>{promotion.description}</Text>
      <TouchableOpacity style={styles.promotionButton}>
        <Text style={styles.promotionButtonText}>Xem chi tiết</Text>
        <Ionicons name="arrow-forward" size={16} color={COLORS.textWhite} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.welcomeText}>Chào mừng bạn đến với</Text>
              <Text style={styles.appName}>HOME CARE</Text>
              <Text style={styles.userGreeting}>Xin chào, {userName}!</Text>
            </View>
            <TouchableOpacity style={styles.headerRight}>
              <Ionicons name="camera-outline" size={24} color={COLORS.textWhite} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>Dịch vụ hoàn thành</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Đánh giá trung bình</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15%</Text>
            <Text style={styles.statLabel}>Tiết kiệm chi phí</Text>
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dịch vụ của chúng tôi</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </View>
        </View>

        {/* Promotions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Khuyến mãi hot</Text>
          
          {promotions.map((promotion) => (
            <PromotionCard key={promotion.id} promotion={promotion} />
          ))}
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Đơn hàng gần đây</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recentOrderCard}>
            <View style={styles.orderInfo}>
              <View style={styles.orderIconContainer}>
                <Ionicons name="construct" size={20} color={COLORS.primary} />
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.orderTitle}>Sửa máy lạnh</Text>
                <Text style={styles.orderDate}>15/05/2024 - 14:30</Text>
                <Text style={styles.orderPrice}>450.000đ</Text>
              </View>
            </View>
            <View style={styles.orderStatus}>
              <Text style={styles.statusText}>Hoàn thành</Text>
            </View>
          </View>
        </View>

        {/* Spacer for bottom navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  header: {
    paddingTop: 50,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
  },
  appName: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES['2xl'],
    fontWeight: 'bold',
    marginVertical: 4,
  },
  userGreeting: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: FONT_SIZES.sm,
  },
  headerRight: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: 4,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  statNumber: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  seeAll: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: (width - SPACING.lg * 2 - SPACING.sm) / 2,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  serviceTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 18,
  },
  promotionCard: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  promotionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    marginBottom: SPACING.xs,
  },
  promotionDescription: {
    fontSize: FONT_SIZES.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  promotionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  promotionButtonText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginRight: SPACING.xs,
  },
  recentOrderCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  orderIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  orderDetails: {
    flex: 1,
  },
  orderTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  orderDate: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginVertical: 2,
  },
  orderPrice: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  orderStatus: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default HomeScreen;