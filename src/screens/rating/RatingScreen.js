import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

const RatingScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const tabs = [
    { title: 'Chưa đánh giá', count: 1 },
    { title: 'Đã đánh giá', count: 0 },
    { title: 'Đánh giá người...', count: 0 },
  ];

  const unratedOrders = [
    {
      id: 1,
      serviceName: 'Chỉnh trang khuôn viên nhà',
      providerName: 'Greenlife around',
      address: '70/268 phường 5 thành phố Thủ Đức',
      phone: '0327162965',
      status: 'Hoàn thành',
      remainingDays: 15,
      rewardPoints: 300,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop&crop=center',
      completedDate: '10/05/2024',
      price: '8.500.000 VND'
    }
  ];

  const ratedOrders = [
    {
      id: 2,
      serviceName: 'Sửa máy lạnh',
      providerName: 'Thợ điện lạnh ABC',
      rating: 5,
      reviewText: 'Dịch vụ rất tốt, thợ đến đúng giờ và làm việc chuyên nghiệp.',
      completedDate: '05/05/2024',
      price: '450.000 VND'
    }
  ];

  const handleRating = (orderId, rating) => {
    if (rating === 0) {
      Alert.alert('Lỗi', 'Vui lòng chọn số sao đánh giá');
      return;
    }

    Alert.alert(
      'Xác nhận đánh giá',
      `Bạn đánh giá ${rating} sao cho dịch vụ này?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xác nhận',
          onPress: () => {
            Alert.alert(
              'Thành công',
              `Cảm ơn bạn đã đánh giá! Bạn được +${unratedOrders[0].rewardPoints} điểm thưởng.`,
              [{ text: 'OK', onPress: () => setSelectedRating(0) }]
            );
          }
        }
      ]
    );
  };

  const StarRating = ({ rating, onRatingPress, size = 24, interactive = true }) => (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => interactive && onRatingPress && onRatingPress(star)}
          disabled={!interactive}
        >
          <Ionicons
            name={star <= rating ? 'star' : 'star-outline'}
            size={size}
            color={star <= rating ? '#FFD700' : COLORS.gray400}
            style={{ marginHorizontal: 2 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const UnratedOrderCard = ({ order }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Image
          source={{ uri: order.image }}
          style={styles.orderImage}
        />
        <View style={styles.orderInfo}>
          <Text style={styles.orderServiceName}>{order.serviceName}</Text>
          <Text style={styles.orderProviderName}>Đơn vị: {order.providerName}</Text>
          <Text style={styles.orderDetail}>Địa chỉ: {order.address}</Text>
          <Text style={styles.orderDetail}>Sdt: {order.phone}</Text>
          <View style={styles.orderStatusContainer}>
            <Text style={styles.orderDetail}>Trạng thái: </Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.remainingTime}>
          Chỉ còn {order.remainingDays} ngày để đánh giá
        </Text>
        <TouchableOpacity style={styles.rateButton}>
          <Text style={styles.rateButtonText}>
            Đánh giá 😊 +{order.rewardPoints}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Rating Section */}
      <View style={styles.ratingSection}>
        <Text style={styles.ratingTitle}>Đánh giá dịch vụ:</Text>
        <StarRating
          rating={selectedRating}
          onRatingPress={setSelectedRating}
          size={32}
        />
        
        <TextInput
          style={styles.reviewInput}
          placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ này..."
          value={reviewText}
          onChangeText={setReviewText}
          multiline
          numberOfLines={3}
          placeholderTextColor={COLORS.textSecondary}
        />

        <TouchableOpacity
          style={[styles.submitButton, selectedRating === 0 && styles.submitButtonDisabled]}
          onPress={() => handleRating(order.id, selectedRating)}
          disabled={selectedRating === 0}
        >
          <Text style={styles.submitButtonText}>
            Gửi đánh giá +{order.rewardPoints} điểm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const RatedOrderCard = ({ order }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.ratedOrderIcon}>
          <Ionicons name="construct" size={24} color={COLORS.primary} />
        </View>
        <View style={styles.orderInfo}>
          <Text style={styles.orderServiceName}>{order.serviceName}</Text>
          <Text style={styles.orderProviderName}>Đơn vị: {order.providerName}</Text>
          <Text style={styles.orderDetail}>Ngày hoàn thành: {order.completedDate}</Text>
          <Text style={styles.orderDetail}>Giá: {order.price}</Text>
        </View>
      </View>

      <View style={styles.ratedSection}>
        <View style={styles.ratedHeader}>
          <Text style={styles.ratedTitle}>Đánh giá của bạn:</Text>
          <StarRating rating={order.rating} interactive={false} size={20} />
        </View>
        <Text style={styles.reviewText}>{order.reviewText}</Text>
      </View>
    </View>
  );

  const TabHeader = () => (
    <View style={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, activeTab === index && styles.activeTab]}
          onPress={() => setActiveTab(index)}
        >
          <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
            {tab.title}
          </Text>
          {tab.count > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{tab.count}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const EmptyState = ({ message }) => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={64} color={COLORS.gray400} />
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 0: // Chưa đánh giá
        return unratedOrders.length > 0 ? (
          unratedOrders.map((order) => (
            <UnratedOrderCard key={order.id} order={order} />
          ))
        ) : (
          <EmptyState message="Không có đánh giá nào cần thực hiện" />
        );
      
      case 1: // Đã đánh giá
        return ratedOrders.length > 0 ? (
          ratedOrders.map((order) => (
            <RatedOrderCard key={order.id} order={order} />
          ))
        ) : (
          <EmptyState message="Bạn chưa đánh giá dịch vụ nào" />
        );
      
      case 2: // Đánh giá người khác
        return <EmptyState message="Tính năng đang được phát triển" />;
      
      default:
        return <EmptyState message="Không có dữ liệu" />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đánh giá của tôi</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tab Navigation */}
      <TabHeader />

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.secondary,
  },
  tabText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  countBadge: {
    backgroundColor: COLORS.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.xs,
  },
  countText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  orderCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  orderHeader: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.md,
  },
  ratedOrderIcon: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  orderInfo: {
    flex: 1,
  },
  orderServiceName: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  orderProviderName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  orderDetail: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  orderStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.primary,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  remainingTime: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  rateButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.xl,
  },
  rateButtonText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
  },
  ratingSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingTop: SPACING.md,
  },
  ratingTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  reviewInput: {
    backgroundColor: COLORS.gray100,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    textAlignVertical: 'top',
    marginBottom: SPACING.md,
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.gray400,
  },
  submitButtonText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  ratedSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingTop: SPACING.md,
  },
  ratedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  ratedTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  reviewText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING['3xl'],
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
});

export default RatingScreen;