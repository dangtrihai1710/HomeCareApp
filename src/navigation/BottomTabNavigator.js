import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import BookingScreen from '../screens/booking/BookingScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import RatingScreen from '../screens/rating/RatingScreen';

// Import constants
import { COLORS, FONT_SIZES, SPACING } from '../constants/theme';

const Tab = createBottomTabNavigator();

// Placeholder screens for demo
const OrdersScreen = () => (
  <View style={styles.placeholderContainer}>
    <Ionicons name="receipt-outline" size={64} color={COLORS.gray400} />
    <Text style={styles.placeholderText}>Đơn hàng</Text>
    <Text style={styles.placeholderSubText}>Theo dõi trạng thái đơn hàng của bạn</Text>
  </View>
);

const SupportScreen = () => (
  <View style={styles.placeholderContainer}>
    <Ionicons name="chatbubbles-outline" size={64} color={COLORS.gray400} />
    <Text style={styles.placeholderText}>Hỗ trợ 24/7</Text>
    <Text style={styles.placeholderSubText}>Chúng tôi luôn sẵn sàng giúp đỡ bạn</Text>
  </View>
);

const NotificationsScreen = () => (
  <View style={styles.placeholderContainer}>
    <Ionicons name="notifications-outline" size={64} color={COLORS.gray400} />
    <Text style={styles.placeholderText}>Thông báo</Text>
    <Text style={styles.placeholderSubText}>Cập nhật mới nhất về dịch vụ</Text>
  </View>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Orders':
              iconName = focused ? 'receipt' : 'receipt-outline';
              break;
            case 'Support':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'Notifications':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return (
            <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
              <Ionicons name={iconName} size={size} color={color} />
              {focused && <View style={styles.focusedIndicator} />}
            </View>
          );
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
          tabBarBadge: null,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: 'Đơn hàng',
          tabBarBadge: 2, // Example badge
        }}
      />
      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          title: 'Hỗ trợ',
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Thông báo',
          tabBarBadge: 5, // Example badge
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Tài khoản',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    height: 65,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    marginTop: 4,
  },
  tabBarItem: {
    paddingVertical: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  focusedIconContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  focusedIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginTop: 2,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.xl,
  },
  placeholderText: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
    textAlign: 'center',
  },
  placeholderSubText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default BottomTabNavigator;