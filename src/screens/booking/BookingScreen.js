import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

const BookingScreen = ({ navigation, route }) => {
  const { serviceType = 'repair' } = route?.params || {};
  
  const [selectedService, setSelectedService] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: '',
    time: '',
    notes: '',
  });

  const serviceDetails = {
    decor: {
      title: 'Chỉnh trang khuôn viên',
      icon: 'leaf-outline',
      color: '#4CAF50',
      services: [
        { name: 'Thiết kế sân vườn', price: '10.000.000 VND', time: '3-5 ngày' },
        { name: 'Trồng cây xanh', price: '4.000.000 VND', time: '1-2 ngày' },
        { name: 'Thi công cảnh quan', price: '8.410.000 VND', time: '5-7 ngày' },
        { name: 'Lát đá lối đi', price: '280.000 VND/m²', time: '2-3 ngày' },
      ]
    },
    repair: {
      title: 'Sửa chữa tại nhà',
      icon: 'construct-outline',
      color: '#FF9800',
      services: [
        { name: 'Sửa máy lạnh', price: '900.000 VND', time: '2-3 giờ' },
        { name: 'Vệ sinh máy lạnh', price: '350.000 VND', time: '1-2 giờ' },
        { name: 'Sửa máy giặt', price: '700.000 VND', time: '2-4 giờ' },
        { name: 'Sửa đồ nội thất', price: '300.000 VND', time: '1-3 giờ' },
      ]
    },
    cleaning: {
      title: 'Vệ sinh nhà cửa',
      icon: 'sparkles-outline',
      color: '#2196F3',
      services: [
        { name: 'Dọn dẹp nhà ở', price: '800.000 VND', time: '3-4 giờ' },
        { name: 'Vệ sinh văn phòng', price: '500.000 VND', time: '2-3 giờ' },
        { name: 'Giặt thảm', price: '200.000 VND/m²', time: '1-2 giờ' },
        { name: 'Lau kính', price: '150.000 VND', time: '1 giờ' },
      ]
    },
    installation: {
      title: 'Lắp đặt thiết bị',
      icon: 'settings-outline',
      color: '#9C27B0',
      services: [
        { name: 'Lắp máy lạnh', price: '800.000 VND', time: '2-3 giờ' },
        { name: 'Lắp máy giặt', price: '300.000 VND', time: '1-2 giờ' },
        { name: 'Lắp tivi', price: '200.000 VND', time: '1 giờ' },
        { name: 'Lắp đèn điện', price: '150.000 VND', time: '30 phút' },
      ]
    },
    consultation: {
      title: 'Tư vấn thiết kế',
      icon: 'person-outline',
      color: '#FF5722',
      services: [
        { name: 'Tư vấn thiết kế nội thất', price: '2.000.000 VND', time: '2-3 giờ' },
        { name: 'Tư vấn cảnh quan', price: '1.500.000 VND', time: '1-2 giờ' },
        { name: 'Tư vấn sửa chữa', price: '500.000 VND', time: '1 giờ' },
        { name: 'Báo giá chi tiết', price: 'Miễn phí', time: '30 phút' },
      ]
    },
    others: {
      title: 'Dịch vụ khác',
      icon: 'apps-outline',
      color: '#607D8B',
      services: [
        { name: 'Sơn tường', price: '50.000 VND/m²', time: '1-2 ngày' },
        { name: 'Chống thấm', price: '100.000 VND/m²', time: '2-3 ngày' },
        { name: 'Hàn cửa', price: '500.000 VND', time: '2-4 giờ' },
        { name: 'Thay kính', price: '300.000 VND', time: '1-2 giờ' },
      ]
    }
  };

  const currentService = serviceDetails[serviceType] || serviceDetails.repair;

  const handleBooking = () => {
    if (!customerInfo.name || !customerInfo.address || !customerInfo.phone || !selectedService) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (customerInfo.phone.length < 10) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ!');
      return;
    }

    Alert.alert(
      'Xác nhận đặt dịch vụ',
      `Dịch vụ: ${selectedService.name}\nGiá: ${selectedService.price}\nThời gian: ${selectedService.time}`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đặt ngay',
          onPress: () => {
            Alert.alert('Thành công', 'Đã đặt dịch vụ thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.', [
              { text: 'OK', onPress: () => navigation.goBack() }
            ]);
          }
        }
      ]
    );
  };

  const ServiceItem = ({ service, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.serviceItem,
        isSelected && { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.serviceItemLeft}>
        <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
          {isSelected && <View style={styles.radioButtonInner} />}
        </View>
        <View style={styles.serviceItemContent}>
          <Text style={[styles.serviceItemName, isSelected && { color: COLORS.primary, fontWeight: 'bold' }]}>
            {service.name}
          </Text>
          <Text style={styles.serviceItemPrice}>{service.price}</Text>
          <Text style={styles.serviceItemTime}>⏱️ {service.time}</Text>
        </View>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={isSelected ? COLORS.primary : COLORS.textSecondary}
      />
    </TouchableOpacity>
  );

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
        <View style={styles.headerContent}>
          <Ionicons name={currentService.icon} size={24} color={currentService.color} />
          <Text style={styles.headerTitle}>{currentService.title}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Customer Info Form */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="location" size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Thông tin đặt dịch vụ</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Tên khách hàng *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Nhập tên khách hàng"
                  value={customerInfo.name}
                  onChangeText={(text) => setCustomerInfo({...customerInfo, name: text})}
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Địa chỉ *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Nhập địa chỉ chi tiết"
                  value={customerInfo.address}
                  onChangeText={(text) => setCustomerInfo({...customerInfo, address: text})}
                  placeholderTextColor={COLORS.textSecondary}
                  multiline
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Số điện thoại *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Nhập số điện thoại"
                  value={customerInfo.phone}
                  onChangeText={(text) => setCustomerInfo({...customerInfo, phone: text})}
                  keyboardType="phone-pad"
                  maxLength={11}
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Thời gian mong muốn</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="VD: Sáng mai 8h, Chiều thứ 7..."
                  value={customerInfo.time}
                  onChangeText={(text) => setCustomerInfo({...customerInfo, time: text})}
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Ghi chú thêm</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Mô tả chi tiết vấn đề hoặc yêu cầu đặc biệt..."
                  value={customerInfo.notes}
                  onChangeText={(text) => setCustomerInfo({...customerInfo, notes: text})}
                  multiline
                  numberOfLines={3}
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>
            </View>
          </View>

          {/* Service Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chọn dịch vụ cụ thể *</Text>
            
            <View style={styles.servicesContainer}>
              {currentService.services.map((service, index) => (
                <ServiceItem
                  key={index}
                  service={service}
                  isSelected={selectedService.name === service.name}
                  onPress={() => setSelectedService(service)}
                />
              ))}
            </View>
          </View>

          {/* Important Notes */}
          <View style={styles.section}>
            <View style={styles.notesContainer}>
              <View style={styles.notesHeader}>
                <Ionicons name="information-circle" size={20} color={COLORS.info} />
                <Text style={styles.notesTitle}>Lưu ý quan trọng</Text>
              </View>
              <View style={styles.notesList}>
                <Text style={styles.noteItem}>• Thợ sẽ đến đúng thời gian đã hẹn</Text>
                <Text style={styles.noteItem}>• Vui lòng chuẩn bị đầy đủ không gian làm việc</Text>
                <Text style={styles.noteItem}>• Thanh toán sau khi hoàn thành công việc</Text>
                <Text style={styles.noteItem}>• Bảo hành 6 tháng cho tất cả dịch vụ sửa chữa</Text>
                <Text style={styles.noteItem}>• Miễn phí tư vấn và báo giá</Text>
              </View>
            </View>
          </View>

          {/* Selected Service Summary */}
          {selectedService && (
            <View style={styles.section}>
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Dịch vụ:</Text>
                  <Text style={styles.summaryValue}>{selectedService.name}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Giá:</Text>
                  <Text style={[styles.summaryValue, styles.priceText]}>{selectedService.price}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Thời gian:</Text>
                  <Text style={styles.summaryValue}>{selectedService.time}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Spacer */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>Cần hỗ trợ?</Text>
          <TouchableOpacity>
            <Text style={styles.hotlineText}>📞 Hotline: 1900 xxxx</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.bookingButton, !selectedService && styles.bookingButtonDisabled]}
          onPress={handleBooking}
          disabled={!selectedService}
        >
          <Text style={styles.bookingButtonText}>
            {selectedService ? `Đặt dịch vụ - ${selectedService.price}` : 'Chọn dịch vụ'}
          </Text>
        </TouchableOpacity>
      </View>
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  formContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  textInput: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  servicesContainer: {
    marginTop: SPACING.sm,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.sm,
  },
  serviceItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.gray400,
    marginRight: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: COLORS.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  serviceItemContent: {
    flex: 1,
  },
  serviceItemName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  serviceItemPrice: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  serviceItemTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  notesContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  notesTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.info,
    marginLeft: SPACING.xs,
  },
  notesList: {
    paddingLeft: SPACING.sm,
  },
  noteItem: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 4,
    lineHeight: 20,
  },
  summaryContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  summaryTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  summaryLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  priceText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  bottomContainer: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  helpContainer: {
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  helpText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  hotlineText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: 2,
  },
  bookingButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.xl,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  bookingButtonDisabled: {
    backgroundColor: COLORS.gray400,
  },
  bookingButtonText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
});

export default BookingScreen;